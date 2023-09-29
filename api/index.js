const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const User = require('./models/User');
const Homework = require('./models/Homework.js');
const Schedule = require('./models/Schedule');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'ad7as6fa8f7sa8f6sfdsfaa6f796af7d6a9f7da6f9d7a6f9';

dotenv.config();
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.post('/api/register', async (req,res) => {
    const {email, password, firstName, lastName, group} = req.body;
    try{
        const userDoc = await User.create({
            email,
            password: bcrypt.hashSync(password,salt),
            firstName,
            lastName,
            group,
        });
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
});

app.post('/api/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (!userDoc) {
        res.status(400).json('User was not found');
    } else {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({email,id:userDoc._id}, secret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id:userDoc._id,
                    email,
                });
            });
        } else {
            res.status(400).json('Password issue.');
        }
    }
});

app.post('/api/logout', (req,res) => {
    res.cookie('token', '').json('ok');
});

app.get('/api/profile', async (req,res) => {

    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;
            const username = info.username;
            const userDoc = await User.findOne({username});
            res.json(userDoc);
        });
    } else {
        res.status(401).json(null);
    }
});

app.put('/api/profile', async (req,res) => {

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;

        const username = info.username;
        const {firstName, lastName, group} = req.body;
        const profileDoc = await User.findOne({username});
        
        await profileDoc.updateOne({
            firstName,
            lastName,
            group,
        });

        res.json(profileDoc);
    });
});

app.post('/api/create-schedule', async (req, res) => {
    const {group, date, lessonOne, lessonTwo, lessonThree, lessonFour, lessonFive, lessonSix} = req.body;
    const scheduleDoc = await Schedule.create({
        group,
        date,
        lessonOne: {
            subject: lessonOne.subject,
            presentation: lessonOne.presentation,
            link: lessonOne.link,
            homework: lessonOne.homework,
        },
        lessonTwo: {
            subject: lessonTwo.subject,
            presentation: lessonTwo.presentation,
            link: lessonTwo.link,
            homework: lessonTwo.homework,
        },
        lessonThree: {
            subject: lessonThree.subject,
            presentation: lessonThree.presentation,
            link: lessonThree.link,
            homework: lessonThree.homework,
        },
        lessonFour: {
            subject: lessonFour.subject,
            presentation: lessonFour.presentation,
            link: lessonFour.link,
            homework: lessonFour.homework,
        },
        lessonFive: {
            subject: lessonFive.subject,
            presentation: lessonFive.presentation,
            link: lessonFive.link,
            homework: lessonFive.homework,
        },
        lessonSix: {
            subject: lessonSix.subject,
            presentation: lessonSix.presentation,
            link: lessonSix.link,
            homework: lessonSix.homework,
        },
    });
    res.json(scheduleDoc);
});

app.get('/api/schedule', async (req, res) => {
    const today = new Date();
    const rawScheduleData = await Schedule.find();
    res.json(rawScheduleData);
});

app.delete('/api/schedule', async (req, res)=> {

});

app.post('/api/homework', async (req, res) => {
    const {group, subject, homework} = req.body;
    const homeworkDoc = await Homework.create({
        group,
        subject,
        homework,
    });
    res.json(homeworkDoc);
});

app.get('/api/homework', async (req, res) => {
    res.json(await Homework.find());
});

app.listen(4000);