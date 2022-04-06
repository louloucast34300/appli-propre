const {factuCreate,factuList, changeInPro, changeInFacture,cloture_bon_de_livraison,reinject_bon_de_livraison} = require('../query/facturation.query')


exports.createFactu = async (req, res, next) =>{
    const body = req.body;
    console.log(body[0].type)
    try{
        const facture = await factuCreate(body);
        res.redirect(`/facturation`);
    }catch(e){
        next(e);
    }
};

exports.listFactu = async (req, res, next) =>{
    try{
        const facture = await factuList();
        res.send(facture);
    }catch(e){
        next(e);
    }
}

exports.pro_to_facture = async (req,res, next) =>{
    const id = req.params.factuId;
    console.log(id)
    try{
        const facture = await changeInFacture(id);

        console.log(facture[0].flux)
        facture[0].flux.forEach((el)=>{
                const id = el._id;
                cloture_bon_de_livraison(id)
        })
        res.end()
    }catch(e){
        next(e);
    }
}

exports.facture_to_pro = async (req,res, next) =>{
    const id = req.params.factuId;
    console.log(id)
    try{
        const facture = await changeInPro(id);
        facture[0].flux.forEach((el)=>{
            const id = el._id;
            reinject_bon_de_livraison(id)
    })
        res.end()
    }catch(e){
        next(e);
    }
}