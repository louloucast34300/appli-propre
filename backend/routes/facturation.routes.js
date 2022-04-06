const router = require('express').Router();
const {
    createFactu,
    listFactu,
    pro_to_facture,
    facture_to_pro
} = require('../controllers/facturation.controller');

// link vers ici : /api/factu/...
router.get('/', (req,res)=>{
    res.send('factu ok');
});
router.post('/create-factu',createFactu);
router.get('/get-factu', listFactu);
router.get('/factu-def/:factuId', pro_to_facture);
router.get('/pro-format/:factuId', facture_to_pro);
module.exports = router;

