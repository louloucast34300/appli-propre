const Facture = require('../BDD/facture.model');
const Order = require ('../BDD/orders.model');

exports.factuCreate = (body) =>{
    const newFacture = new Facture({
        type: body[0].type,
        doctor:body[0].doctor,
        definitive: body.definitive?true:false,
        date_of_creation: "une date à générer",
        flux: body[0].flux,
        canceled:false,
    });
    return newFacture.save();
};

exports.factuList = () =>{
    return Facture.find({}).exec();
}

exports.changeInPro = (id) =>{
    Facture.findByIdAndUpdate(id, {definitive : false}).exec();
    return Facture.find({_id : id}).exec();
}

exports.changeInFacture = (id) =>{

    Facture.findByIdAndUpdate(id, {definitive : true}).exec();
    return Facture.find({_id : id}).exec();

}

exports.cloture_bon_de_livraison =(id) =>{
    return Order.findByIdAndUpdate(id, {inside_facture : true }).exec();
}

exports.reinject_bon_de_livraison = (id) =>{
    return Order.findByIdAndUpdate(id, {inside_facture : false }).exec();
}