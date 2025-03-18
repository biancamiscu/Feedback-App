const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
const {Student,Feedback,Activity,Professor}=require('../database/models')
const crypto=require('crypto')
const router=express.Router();
const secretKey=require('./secret')
const authenticate = require('../middleware/auth');



router.post('/createS', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password and name are required' });
        }
        

        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            return res.status(400).json({ error: 'Student already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

    
        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
           
        });

        const token = jwt.sign(
            { id: student.id, email: student.email }, 
            secretKey, 
            { expiresIn: '5h' } 
        );


        res.status(200).json({ message: 'Success!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/loginS', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const student = await Student.findOne({ where: { email } });
        if (!student) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: student.id, email: student.email },
            secretKey,
            { expiresIn: '5h' } 
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/access-activity', async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'Activity code is required.' });
        }

      
        const activity = await Activity.findOne({ where: { code: code } });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

      
        res.status(200).json({
            message: 'Access granted.',
            activity: {
                id: activity.id,
                title: activity.title,
                description: activity.description,
                date: activity.date,
                code: activity.code,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/submit-feedback', async (req, res) => {
    try {
        const { activityId, feedback, comment } = req.body; 

        
        if (!activityId || !feedback) {
            return res.status(400).json({ error: 'Activity ID and feedback are required.' });
        }

      
        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' });
        }

      
        const feedbackEntry = await Feedback.create({
            activityId,
            feedback, 
            comment,
            timestamp: new Date(),
        });

        res.status(200).json({ message: 'Feedback submitted successfully!', feedbackEntry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/activity/:id/feedback', authenticate, async (req, res) => {
    console.log("Received request for feedback");
    try {
        const { id } = req.params;
        const activity = await Activity.findOne({
            where: { id, professorId: req.user.id },
        });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found or not authorized.' });
        }

        const feedbacks = await Feedback.findAll({
            where: { activityId: id },
            attributes: ['feedback', 'comment', 'timestamp'],
            order: [['timestamp', 'DESC']],
        });

        res.status(200).json({ activity: activity.title, feedbacks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/loginTokenStud', async (req, res) => {
    const { id } = req.body; 

    const student = await Student.findOne({ where: { id } });

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const token = jwt.sign({ id: student.id, email: student.email }, secretKey, { expiresIn: '5h' });

    res.status(200).json({ message: 'Login successful', token });
});
router.get('/activities', authenticate, async (req, res) => {
    try {
        const { code } = req.query;
        if (code) {
       
            const activity = await Activity.findOne({ where: { code } });
            if (activity) {
                return res.status(200).json(activity);
            } else {
                return res.status(404).json({ error: 'Activity not found' });
            }
        }

       
        const activities = await Activity.findAll();
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports=router;