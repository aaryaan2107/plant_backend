const express = require('express')
const app = express()
const DB  = require('./connect/db');
const port = 3000
const Api = require('./routes/api.js');
const Apis = require('./routes/auth.js');
const admin = require('./routes/admin.js');
const cors = require('cors')
const cookie = require('cookie-parser');
const sessiondata = require('express-session');
const bodyparser = require('body-parser');


app.use(cors());
app.use(bodyparser.json());
app.use(cookie());
app.use(sessiondata({
    secret:'userdata',
    resave:false,
    saveuninitialized:true
}));

DB();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Method', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
  next();
});
app.use('/Api',Api);
app.use('/Apis',Apis);
app.use('/admin',admin)



app.listen(port, () => {
  console.log(`started.... http://localhost:${port}`)
})