const router = require('express').Router();

// link vers ici : /api/order/...
router.get('/', (req,res)=>{
    res.send('order ok');
});
module.exports = router;