const path = require('path')
const app = require('../../index');
const {
    createDoctor,
    listDoctor
} = require('../query/clients.query');


exports.doctorCreate = async (req, res, next) =>{
    const body = req.body
    try{
        console.log(body)
        const client = await createDoctor(body);
        let filePath ="./frontend/build:index.html";
        let resolvedPath = path.resolve(filePath);
        res.sendFile(resolvedPath);
      /* res.redirect(`client?message=${encodeURIComponent('Nouveau client enregistré.')}`);*/
       
    }catch(e){
        next(e);
    }
}

exports.doctorList = async (req, res, next) =>{
    console.log("test ok")
    try{
        const client = await listDoctor();
        res.send(client)
    }catch(e){
        next(e);
    }
}

exports.doctorEdit = async (req, res, next) =>{
    try{
        res.send('doctorEdit OK')
    }catch(e){
        next(e);
    }
}

exports.doctorUpdate = async (req, res, next) =>{
    try{
        res.send('doctorUpdate OK')
    }catch(e){
        next(e);
    }
}

exports.doctorDelete = async (req, res, next) =>{
    try{
        res.send('doctorDelete OK')
    }catch(e){
        next(e);
    }
}

exports.doctorDetail = async (req, res, next) =>{
    try{
        res.send('doctorDetail OK')
    }catch(e){
        next(e);
    }
};