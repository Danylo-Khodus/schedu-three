const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
const Homework = require('./models/Homework.js');
const Schedule = require('./models/Schedule');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const { scheduler } = require('timers/promises');

const salt = bcrypt.genSaltSync(10);
const secret = 'ad7as6fa8f7sa8f6sfdsfaa6f796af7d6a9f7da6f9d7a6f9';

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://danylokhodus:LOatJ5bsGiWcMYBj@cluster0.h0hwlgk.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req,res) => {
    const {userData} = req.body;
    const username = userData.username;
    const password = userData.password;
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const group = userData.group;
    const image = userData.image;

    try{
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password,salt),
            image,
            firstName,
            lastName,
            group,
        });
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    if (!userDoc) {
        res.status(400).json('wrong credentials');
    } else {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id:userDoc._id,
                    username,
                });
            });
        } else {
            res.status(400).json('wrong credentials');
        }
    }
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
});

app.get('/profile', async (req,res) => {

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

app.put('/profile', async (req,res) => {
    // let newPath = null;
    // if (req.file) {
    //     const {originalname, path} =  req.file;
    //     const parts = originalname.split('.');
    //     const ext = parts[parts.length - 1];
    //     newPath = path + '.' + ext;
    //     fs.renameSync(path, newPath);
    // }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;

        const username = info.username;
        const {firstName, lastName, group} = req.body;
        const profileDoc = await User.findOne({username});
        
        await profileDoc.updateOne({
            // image: newPath ? newPath : profileDoc.image,
            firstName,
            lastName,
            group,
        });

        res.json(profileDoc);
    });
});

app.post('/create-schedule', async (req, res) => {
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

app.get('/schedule', async (req, res) => {
    const today = new Date();
    const rawScheduleData = await Schedule.find();
    res.json(rawScheduleData);
});

app.delete('/schedule', async (req, res)=> {

});

app.post('/homework', async (req, res) => {
    const {group, subject, homework} = req.body;
    const homeworkDoc = await Homework.create({
        group,
        subject,
        homework,
    });
    res.json(homeworkDoc);
});

app.get('/homework', async (req, res) => {
    res.json(await Homework.find());
});

app.listen(4000);