import Mongoose from "server/db/Mongoose";

const logger = require('logat');

module.exports.controller = function (app) {

    app.post('/api/chat/all', (req, res) => {
        Mongoose.Chat.find()
            .populate('transactions')
            .sort({createdAt: -1})
            .limit(50)
            .then(r =>{
                res.send(r.reverse())
            })
    });


};
