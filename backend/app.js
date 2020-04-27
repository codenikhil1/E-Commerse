require('dotenv').config();
const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')

//DB CONNECTION
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB CONNECTED')
}).catch((error)=>{
    if(error){
      console.log('DB CONNECTION ERROR')
    }
});
//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use('/',authRoutes);
app.use('/',userRoutes);
//Starting server
app.listen(port,()=>{
    console.log(`server is up and running on ${port}`)
})