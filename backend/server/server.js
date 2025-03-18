require('dotenv').config();
const express=require('express')
const app=express()
const professorRoutes=require('../routes/ProfessorRoutes')
const authenticate=require('../middleware/auth')
const cors=require('cors')
const bodyParser=require('body-parser')
const sequelize=require('../database/config')
const studentRoutes=require('../routes/StudentRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())
app.use('/api/students', studentRoutes);  
app.use('/api/professors', professorRoutes);
app.use('/api/create', professorRoutes);  
app.use('/api', professorRoutes);

sequelize.sync().then(()=>console.log('The database is synchronized'))
.catch((err)=>console.log('Error synchronizing the database',err))

const port=3000;

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})


app.use(express.json());
