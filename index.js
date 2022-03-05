const express = require('express');
const app = express();
const path = require('path');
const routing = require('./backend/routes');
const port = process.env.PORT || 5001;
require('./backend/BDD/connexion');

exports.app= app;



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.use(routing);
app.get("*",function(_, res){
    res.sendFile(
        path.join(__dirname, "./frontend/build:index.html"),
        function(err){
            if(err){
                res.status(500).send(err);
            }
        }
    )
});

app.listen(port, ()=>console.log(`Server Runing on port ${port}`));

module.exports = app;