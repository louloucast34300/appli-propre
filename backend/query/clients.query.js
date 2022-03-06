const Client = require('../BDD/clients.model');

exports.createDoctor = (body) =>{
    const newClient = new Client({
        username : body.username,
        lastname : body.lastname,
        email : body.email,
        address : body.address,
        phone: body.phone,
        n_siret: body.n_siret,
        infos : body.infos
    });
    return newClient.save();
};

exports.listDoctor = () =>{
    return Client.find().exec();
}