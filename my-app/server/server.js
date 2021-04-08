const { json } = require('express');
const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const port = 3001;


app.use(express.json());
app.use(session({
    secret : 'helloworld',
    resave : false,
    saveUninitialized : true
}))

app.get('/api/user', (req, res) => {
    let sess = req.session;
    console.log(sess.user);
    if(sess.user !== undefined){
        res.json(sess.user);
    } 
});

app.post('/api/account/login', (req, res) => {
    let post_data = {id:req.body.id, pw:req.body.pw};
    let sess = req.session;
    if(post_data.id === "tree96" && post_data.pw === "1234"){
        let user = fs.readFileSync('./resources/user.json','utf-8');
        sess.user = JSON.parse(user);
        res.json({result : true});
    }
    else{
        res.json({result : false});
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});