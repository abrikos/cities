import moment from "moment";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const modelSchema = new Schema({
        name: {type: Object, required: true},
        country: {type: String, required: true},
        address: {type: String, required: true},
        seed: {type: String, required: true},
        district: {type: String},
        code: {type: String, default: ''},
        bounds: {type: Object},
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
        count: {type: Number, default: 0}
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });


modelSchema.virtual('balance')
    .get(function () {
        let sum = 0;
        for(const tx of this.transactions){
            sum+=tx.value;
        }
        return sum;
    });

modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    });

modelSchema.virtual('updated')
    .get(function () {
        return moment(this.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    });

modelSchema.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'city',
    justOne: false // set true for one-to-one relationship
});


const City = mongoose.model("City", modelSchema);
export default City

