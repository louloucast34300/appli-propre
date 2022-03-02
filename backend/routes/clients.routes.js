const router = require('express').Router();

// link vers ici : /api/clients/...
router.get('/', (req,res)=>{
    res.send('client ok');
});

module.exports = router;