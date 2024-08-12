const express=require('express');
const app=express();
const dotenv=require('dotenv');
const  routes  = require('./API/Routes/routes');
const bodyParser=require('body-parser');
const firebaseApp = require('./Constants/firebaseConfig');
const cors= require('cors')
dotenv.config();

const PORT=process.env.PORT
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with the address of your React app
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // If you need to send cookies or authentication tokens
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',routes)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT,()=>{
    console.log("Server Runing At "+PORT)
    firebaseApp
})
