import moment from "moment";
const logger = require('logat');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const modelSchema = new Schema({
        hash: {type: String, required: true, unique: true},
        from: {type: String, required: true, index: true},
        to: {type: String, required: true, index: true},
        message: {type: Object},
        //type: {type: String, enum: ['fromUser', 'toUser', 'toLottery', 'toOwner', 'toReferral'],},
        timestamp: {type: Number, required: true},
        value: {type: Number, default: 0},
        city: {type: mongoose.Schema.Types.ObjectId, ref: 'City'},
        //txToReferralHash: {type: String},
        //txToLotteryHash: {type: String},
    },
    {
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        //toJSON: {virtuals: true}
    });


modelSchema.virtual('date')
    .get(function () {
        return moment(this.timestamp).format('YYYY-MM-DD HH:mm')
    });



const Transaction = mongoose.model("Transaction", modelSchema)
export default Transaction;


