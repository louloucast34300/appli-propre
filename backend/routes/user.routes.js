const router = require('express').Router();

// link vers ici : /api/user/...
router.get('/', (req,res)=>{
    res.send('user ok');
});
module.exports = router;