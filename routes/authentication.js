const express     = require("express");
const router      = express.Router();
const createuser  = require("./middleware/create_user");
const createtoken = require("./middleware/create_token");
const loginuser   = require("./middleware/login_user");
const verifyToken = require('./middleware/verify_token');

router.post('/register',createuser,createtoken);
router.post('/login',loginuser,createtoken);
router.get('/verify',verifyToken,(req,res,next)=>{
    if(req.decoded){
        res.status(200).send({verified: true});
    }else{
        res.status(400).send({verified: false});
    }
});

module.exports = router;