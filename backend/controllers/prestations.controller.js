
exports.prestaCreate = async (req, res, next) => {
    try{
        res.send("prestaCreate OK");
    }catch(e){
        next(e);
    }
}
exports.prestaList = async (req, res, next) => {
    try{
        res.send("prestaList OK");
    }catch(e){
        next(e);
    }
}
exports.prestaEdit = async (req, res, next) => {
    try{
        res.send("prestaEdit OK");
    }catch(e){
        next(e);
    }
}

exports.prestaUpdate = async (req, res, next) => {
    try{
        res.send("prestaUpdate OK");
    }catch(e){
        next(e);
    }
}

exports.prestaDetail = async (req, res, next) => {
    try{
        res.send("prestaDetail OK");
    }catch(e){
        next(e);
    }
}

exports.prestaDelete = async (req, res, next) => {
    try{
        res.send("prestaDelete OK");
    }catch(e){
        next(e);
    }
}