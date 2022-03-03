const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clientSchema = schema ({
    username:{type:String},
    lastname:{type:String},
    email:{type:String},
    address:{type:String},
    phone:{type:Number},
    n_siret:{type:String}
},{
    timestamp:true,
});

const Client = mongoose.model('client',clientSchema);

module.exports = Client