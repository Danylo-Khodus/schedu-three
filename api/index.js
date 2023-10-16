const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const User = require('./models/User');
const Homework = require('./models/Homework.js');
const Notification = require('./models/Notification.js');
const Lesson = require('./models/Lesson');
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
    const {email, password, firstName, lastName, group, perm} = req.body;
    try{
        const userDoc = await User.create({
            email,
            password: bcrypt.hashSync(password,salt),
            firstName,
            lastName,
            group,
            perm,
        });
        res.json(userDoc);
    } catch(e) {
        res.status(400).json("User wasn't created.");
    }
});

app.post('/api/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (!userDoc) {
        res.status(400).json('User was not found');
    } else {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        const fullName = `${userDoc.lastName} ${userDoc.firstName}`;
        if (passOk) {
            jwt.sign({id:userDoc._id, group:userDoc.group, fullName, perm:userDoc.perm}, secret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id: userDoc._id,
                    firstName: userDoc.firstName,
                    lastName: userDoc.lastName,
                    group: userDoc.group,
                    perm: userDoc.perm,
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

    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;
            const _id = info.id;
            const userDoc = await User.findOne({_id});
            res.json({
                id: userDoc._id,
                firstName: userDoc.firstName,
                lastName: userDoc.lastName,
                group: userDoc.group,
                perm: userDoc.perm,
            });
        });
    } else {
        res.json(null);
    }
});

app.put('/api/profile', async (req,res) => {

    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;

            const _id = info.id;
            const {firstName, lastName} = req.body;
            const profileDoc = await User.findOne({_id});
            
            await profileDoc.updateOne({
                firstName,
                lastName,
            });

            res.json(profileDoc);
        });
    } else {
        res.status(401).json(null);
    }
});

app.post('/api/create-schedule', async (req, res) => {
    const {date, group, lessonOne, lessonTwo, lessonThree, lessonFour, lessonFive, lessonSix} = req.body;
    if (lessonOne.subject !== '') {
        const firstDoc = await Lesson.create({
            date,
            group,
            beginTime: date + 'T06:00:00.388Z',
            endTime: date + 'T06:40:00.388Z',
            teacher: lessonOne.teacher,
            subject: lessonOne.subject,
            theme: lessonOne.theme,
            presentation: lessonOne.presentation,
            additional: lessonOne.additional,
            link: lessonOne.link,
            homework: lessonOne.homework,
        });
    }
    if (lessonTwo.subject !== '') {
        const secondDoc = await Lesson.create({
            date,
            group,
            beginTime: date + 'T06:50:00.388Z',
            endTime: date + 'T07:30:00.388Z',
            teacher: lessonTwo.teacher,
            subject: lessonTwo.subject,
            theme: lessonTwo.theme,
            presentation: lessonTwo.presentation,
            additional: lessonTwo.additional,
            link: lessonTwo.link,
            homework: lessonTwo.homework,
        });
    }
    if (lessonThree.subject !== '') {
        const thirdDoc = await Lesson.create({
            date,
            group,
            beginTime: date + 'T07:40:00.388Z',
            endTime: date + 'T08:20:00.388Z',
            teacher: lessonThree.teacher,
            subject: lessonThree.subject,
            theme: lessonThree.theme,
            presentation: lessonThree.presentation,
            additional: lessonThree.additional,
            link: lessonThree.link,
            homework: lessonThree.homework,
        });
    }
    if (lessonFour.subject !== '') {
        const fourthDoc = await Lesson.create({
            date,
            group,
            beginTime: date + 'T08:30:00.388Z',
            endTime: date + 'T09:10:00.388Z',
            teacher: lessonFour.teacher,
            subject: lessonFour.subject,
            theme: lessonFour.theme,
            presentation: lessonFour.presentation,
            additional: lessonFour.additional,
            link: lessonFour.link,
            homework: lessonFour.homework,
        });
    }
    if (lessonFive.subject !== '') {
        const fifthDoc = await Lesson.create({
            date,
            group,
            beginTime: date + 'T09:20:00.388Z',
            endTime: date + 'T10:00:00.388Z',
            teacher: lessonFive.teacher,
            subject: lessonFive.subject,
            theme: lessonFive.theme,
            presentation: lessonFive.presentation,
            additional: lessonFive.additional,
            link: lessonFive.link,
            homework: lessonFive.homework,
        });
    }
    if (lessonSix.subject !== '') {
        const sixthDoc = await Lesson.create({
            date,
            group,
            beginTime: date + 'T10:10:00.388Z',
            endTime: date + 'T10:50:00.388Z',
            teacher: lessonSix.teacher,
            subject: lessonSix.subject,
            theme: lessonSix.theme,
            presentation: lessonSix.presentation,
            additional: lessonSix.additional,
            link: lessonSix.link,
            homework: lessonSix.homework,
        });
    }
    res.json('ok');
});

app.get('/api/schedule', async (req, res) => {

    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;
            const perm = info.perm;
            if (perm === 'teacher') {
                const teacher = info.fullName;
                const lessons = await Lesson.find({teacher});
                res.json(lessons);
            } else {
                const group = info.group;
                const lessons = await Lesson.find({group});
                res.json(lessons);
            }
        });
    } else {
        res.json(null);
    }
});

app.post('/api/homework', async (req, res) => {
    const {status, student_id, student_fullName, group, teacher, subject, homework} = req.body;
    const homeworkDoc = await Homework.create({
        status,
        student_id,
        student_fullName,
        group,
        teacher,
        subject,
        homework,
        link: '',
    });
    res.json(homeworkDoc);
});

app.get('/api/homework', async (req, res) => {
    const homeworkList = await Homework.find();
    res.json(homeworkList);
});

app.put('/api/homework', async (req, res) => {

    const {_id, stat, newLink} = req.body;
    const homeworkDoc = await Homework.findOne({_id});
    
    await homeworkDoc.updateOne({
        student_id: homeworkDoc.student_id,
        student_fullName: homeworkDoc.student_fullName,
        group: homeworkDoc.group,
        teacher: homeworkDoc.teacher,
        subject: homeworkDoc.subject,
        homework: homeworkDoc.homework,
        status: stat,
        link: newLink,
    });

    res.json(homeworkDoc);

});

app.delete('/api/homework', async (req, res) => {

    const {_id} = req.body;
    const homeworkDoc = await Homework.findOne({_id});
    
    await homeworkDoc.deleteOne({});

    res.status(200).json('success');

});

app.post('/api/notifications', async (req, res) => {
    const {user_id, seen, subject, message, time, link} = req.body;
    const notification = await Notification.create({
        user_id,
        seen,
        subject,
        message,
        time,
        link,
    });
    res.json(notification);
});

app.get('/api/notifications', async (req, res) => {

    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;

            const user_id = info.id;
            const notifications = await Notification.find({user_id}).sort({createdAt: -1});
            res.json(notifications);
        });
    }
});

app.put('/api/notifications', async (req, res) => {

    const {_id} = req.body;
    const notification = await Notification.findOne({_id});
    
    await notification.updateOne({
        user_id: notification.user_id,
        seen: 'true',
        subject: notification.subject,
        message: notification.message,
        time: notification.time,
        link: notification.link,
    });

    res.json(notification);

});

app.delete('/api/notifications', async (req, res) => {

    const {user_id} = req.body;
    const notifications = await Homework.find({user_id});
    
    await notifications.deleteMany({});

    res.status(200).json('success');

});

app.listen(4000);