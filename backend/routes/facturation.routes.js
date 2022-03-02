const router = require('express').Router();

// link vers ici : /api/factu/...
router.get('/', (req,res)=>{
    res.send('factu ok');
});
module.exports = router;