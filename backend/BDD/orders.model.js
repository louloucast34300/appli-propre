const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const orderSchema = schema ({
    doctor_username:{type:String},
    doctor_lastname:{type:String},
    doctorID:{type:String},
    patient_info:{type:String},
    patientID:{type:String},
    prestation:{type:Array, "default":[]},
    price_total_prestation:{type:Number,required:true},
    num_teeth:{type:Array},
    n_siret_doctor:{type:String},
    shipping:{type:String},
},{
    timestamp:true,
});

UserSchema.plugin(AutoIncrement, {inc_field: 'number_order'});

const Order = mongoose.model('order',orderSchema);

module.exports = Order