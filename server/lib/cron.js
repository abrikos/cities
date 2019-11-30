import Mongoose from "server/db/Mongoose";
import config from "server/config";
import Minter from "server/lib/Minter"

const logger = require('logat');
const CronJob = require('cron').CronJob;
const jobs = {};

export default function cron(){
    jobs.checkBalances = new CronJob('*/5 * * * * *', async () => {
        Mongoose.City.find()
            .populate('transactions')
            .then(async cities => {
                const minter = Minter.init(config.networks[process.env.NETWORK]);

                for (const city of cities) {
                    const transactions = await minter.loadTransactions(city.address);
                    for (const tx of transactions.filter(t => !city.transactions.map(ct => ct.hash).includes(t.hash))) {
                        tx.city = city;
                        console.log(tx.hash)
                        Mongoose.Transaction.create(tx);
                    }
                }
            })


    }, null, true, 'America/Los_Angeles');

    for (const key of Object.keys(jobs)) {
        if (!jobs[key].running) {
            jobs[key].start();
        } else {
            logger.info(`JOB ${key} already running`)
        }
    }

}
