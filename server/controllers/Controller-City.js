import * as axios from "axios";
import Mongoose from "server/db/Mongoose";
import Minter from "server/lib/Minter";

const passportLib = require('server/lib/passport');
const passport = require('passport');
const logger = require('logat');
const moment = require('moment');

function parseAddresses(res) {
    const data = {list: []};
    if (res.data.status !== "OK") return {error: res.data.status}
    for (const addr of res.data.results) {
        if (!addr.types.includes("political")) continue;
        const obj = addr.address_components.find(t => t.types.includes('country'))
        const obj2 = addr.address_components.find(t => t.types.includes('locality'))
        const obl = addr.address_components.find(t => t.types.includes('administrative_area_level_1'))
        const postal = addr.address_components.find(t => t.types.includes('postal_code'))
        if (!obj || !obj2) continue;
        for (const x of addr.address_components) {
            console.log(x.types, x)
        }
        const district = obl && obl.short_name;
        const code = postal && postal.short_name;
        const name = obj2.long_name;
        const country = obj.short_name;
        const lat = addr.geometry.location.lat;
        const lng = addr.geometry.location.lng;
        const bounds = addr.geometry.bounds;
        data.list.push({name, country, lat, lng, district, code, bounds})
    }
    return data;

}

//Mongoose.City.deleteMany(console.log);

module.exports.controller = function (app) {

    app.post('/api/city/google-chart', (req, res) => {
        Mongoose.City.find({count: {$gt: 0}})
            .then(cities => {
                const data = [['City', 'Count', 'Area']];
                let sum = 0;
                for (const city of cities) {
                    sum += city.count;
                }
                for (const city of cities) {
                    data.push([`${city.name} ${city.district}, ${city.code}`, city.count, city.count / sum * 100])
                }
                res.send({key: process.env.GOOGLE_API, data})
            })
    });

    app.post('/api/city/inc/:id', (req, res) => {
        Mongoose.City.findById(req.params.id)
            .then(city => {
                city.count++;
                city.save()
                    .then(r => res.send(r))
            })
    });

    app.post('/api/search/:query', (req, res) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.query}&key=${process.env.GOOGLE_API}`;
        axios.get(url)
            .then(async found => {
                const data = parseAddresses(found)
                if (data.error) {
                    logger.info(data.error)
                    return res.send([])
                }
                const ret = [];
                for (const city of data.list) {
                    const {bounds, district, lat, lng, ...rest} = city;
                    //console.log(district, bounds)
                    let cityDb = await Mongoose.City.findOne(rest);
                    if (!cityDb) {

                        const wallet = Minter.generateWallet();
                        city.address = wallet.address;
                        city.seed = wallet.seed;
                        cityDb = await Mongoose.City.create(city);
                    }
                    cityDb.seed = null;
                    ret.push(cityDb);
                }
                return res.send(ret);
            })

    });

};
