const Order = require('../BDD/orders.model');

exports.createOrder = (body, total_price) =>{
    console.log(body)
    const newOrder = new Order({
       flux : body.flux_de_prod,
       doctor:body.doctor,
       patient:body.patient,
       price:total_price,
       date_of_creation:body.date,

    });
    return newOrder.save();
};

exports.listOrder = () =>{
   return Order.find().exec()
}