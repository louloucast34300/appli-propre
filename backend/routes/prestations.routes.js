const router = require('express').Router();

// link vers ici : /api/prestations/...
router.get('/', (req,res)=>{
    res.send('prestations ok');
});
module.exports = router;