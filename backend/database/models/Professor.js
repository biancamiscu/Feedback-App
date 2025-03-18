const {DataTypes}=require('sequelize')
const sequelize=require('../config')

const Professor=sequelize.define('Professor',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
      
}, {
    timestamps: false,  
  });

  
module.exports=Professor;