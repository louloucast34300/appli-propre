
exports.orderCreate = async (req, res, next) => {
    try{
        res.send('orderCreate OK');
    }catch(e){
        next(e);
    }
}

exports.orderList = async (req, res, next) => {
    try{
        res.send('orderList OK');
    }catch(e){
        next(e);
    }
}

exports.orderEdit = async (req, res, next) => {
    try{
        res.send('orderEdit OK');
    }catch(e){
        next(e);
    }
}

exports.orderUpdate= async (req, res, next) => {
    try{
        res.send('orderUpdate OK');
    }catch(e){
        next(e);
    }
}
exports.orderDetail = async (req, res, next) => {
    try{
        res.send('orderDetail OK');
    }catch(e){
        next(e);
    }
}

exports.orderDelete = async (req, res, next) => {
    try{
        res.send('orderDelete OK');
    }catch(e){
        next(e);
    }
}