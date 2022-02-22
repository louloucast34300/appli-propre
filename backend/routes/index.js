const router = require('express').Router();

router.use('/api/user', (req,res)=>{
    res.send("ok");
});

module.exports =router;