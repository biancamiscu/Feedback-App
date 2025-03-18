const Professor=require('./Professor')
const Activity=require('./Activity')
const sequelize=require('../config')
const Feedback = require('./Feedback')
const Student = require('./Student')

Professor.hasMany(Activity,{foreignKey:'professorId'})
Activity.belongsTo(Professor,{foreignKey:'professorId'})
Feedback.belongsTo(Student,{foreignKey:'studentId'})
Student.hasMany(Feedback,{foreignKey:'studentId'})
Feedback.belongsTo(Professor, { foreignKey: 'professorId' });
Professor.hasMany(Feedback, { foreignKey: 'professorId' });

Activity.hasMany(Feedback, {
    foreignKey: 'activityId',
    as: 'feedbacks', 
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE',
  });
  Feedback.belongsTo(Activity, {
    foreignKey: 'activityId',
    as: 'activity', 
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });


module.exports={Professor,Activity,Feedback,Student}