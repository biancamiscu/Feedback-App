const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
const {Professor,Activity,Feedback}=require('../database/models')
const crypto=require('crypto')
const router=express.Router();
const secretKey=require('./secret')


router.post('/create', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password and name are required' });
        }

        const existingProfessor = await Professor.findOne({ where: { email } });
        if (existingProfessor) {
            return res.status(400).json({ error: 'Professor already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

    
        const professor = await Professor.create({
            email,
            password: hashedPassword,
            name
        });

        const token = jwt.sign(
            { id: professor.id, email: professor.email }, 
            secretKey, 
            { expiresIn: '5h' } 
        );


        res.status(200).json({ message: 'Success!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const professor = await Professor.findOne({ where: { email } });
        if (!professor) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, professor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generam un token JWT
        const token = jwt.sign(
            { id: professor.id, email: professor.email },
            secretKey,
            { expiresIn: '5h' }  
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/professor',async(req,res)=>{
    // professorId=req.user.id
    const activities=await Professor.findAll({});
    res.json(activities)
});                  

const authenticate = require('../middleware/auth');
const { error } = require('console')

router.post('/activities', authenticate, async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const professorId = req.user.id; 
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();

        const activity = await Activity.create({
            title,
            description,
            date,
            code,
            professorId,
        });

        res.status(200).json(activity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/activities', authenticate, async (req, res) => {
    try {
        const professorId = req.user.id; 
        const activities = await Activity.findAll({ where: { professorId } });
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Ruta GET pentru a obtine activitatile viitoare
router.get('/activities', authenticate, async (req, res) => {
    try {
        const professorId = req.user.id;
        const currentDate = new Date();

        const activities = await Activity.findAll({
            where: {
                professorId,
                date: {
                    [Op.gt]: currentDate, // Compara cu data curenta
                },
            },
        });
        res.json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Ruta PUT pentru a edita o activitate
router.put('/activities/:id', authenticate, async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const { id } = req.params;
        const professorId = req.user.id;
        const currentDate = new Date();

        const activity = await Activity.findOne({
            where: {
                id,
                professorId,
            },
        });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found or not authorized to update this activity' });
        }

        if (new Date(activity.date) < currentDate) {
            return res.status(400).json({ error: 'You cannot edit past activities' });
        }

        activity.title = title || activity.title;
        activity.description = description || activity.description;
        activity.date = date || activity.date;

        await activity.save();
        res.status(200).json({ message: 'Activity updated successfully', activity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Ruta DELETE pentru a sterge o activitate
router.delete('/activities/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const professorId = req.user.id;
        const currentDate = new Date();

        const activity = await Activity.findOne({
            where: {
                id,
                professorId,
            },
        });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found or not authorized to delete this activity' });
        }

        if (new Date(activity.date) < currentDate) {
            return res.status(400).json({ error: 'You cannot delete past activities' });
        }

        // stergem activitatea
        await activity.destroy();
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.post('/loginT', async (req, res) => {
    const { id } = req.body; 

    const professor = await Professor.findOne({ where: { id } });

    if (!professor) {
        return res.status(404).json({ error: 'Professor not found' });
    }


    const token = jwt.sign({ id: professor.id, email: professor.email }, secretKey, { expiresIn: '5h' });

    res.status(200).json({ message: 'Login successful', token });
});

router.get('/courses/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Activity.findByPk(id); 

        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        res.status(200).json(course); 
    } catch (err) {
        console.error('Error fetching course:', err);
        res.status(500).json({ error: 'An error occurred while fetching the course.' });
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

router.get('/feedback/list', authenticate, async (req, res) => {
    try {
        const activities = await Activity.findAll({
            where: { professorId: req.user.id }, 
            include: {
                model: Feedback, 
                as: 'feedbacks', 
                attributes: ['id', 'feedback', 'comment', 'timestamp', 'createdAt', 'updatedAt', 'studentId', 'activityId'], 
                order: [['timestamp', 'DESC']],
            },
        });
        
        if (!activities || activities.length === 0) {
            return res.status(404).json({ message: 'No activities found for this professor' });
        }

        res.json(activities);
    } catch (error) {
        console.error('Error fetching feedbacks for activities:', error);
        res.status(500).json({ error: 'An error occurred while fetching feedbacks' });
    }
});


module.exports=router;