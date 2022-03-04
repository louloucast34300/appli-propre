
exports.doctorCreate = async (req, res, next) =>{
    try{
        res.send('doctorCreate OK')
    }catch(e){
        next(e);
    }
}

exports.doctorList = async (req, res, next) =>{
    try{
        res.send('doctorList OK')
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