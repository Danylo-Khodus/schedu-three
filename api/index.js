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
        const createUserDoc = await User.create({
            email,
            password: bcrypt.hashSync(password,salt),
            firstName,
            lastName,
            group,
            perm,
        });
        try {
            const findUserDoc = await User.findOne({email});
            const fullName = `${lastName} ${firstName}`;
            const id = findUserDoc._id;
            jwt.sign({id, group, fullName, perm}, secret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id,
                    firstName,
                    lastName,
                    group,
                    perm,
                });
            });
        } catch(e) {
            res.status(400).json("User wasn't found.");
        }
    } catch(e) {
        res.status(400).json("User wasn't created.");
    }
});

app.post('/api/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (!userDoc) {
        res.status(400).json('Користувача з наведеною електронною адресою не зареєстровано');
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
            res.status(400).json('Невірний пароль');
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
        const teacher = await User.findOne({ _id: lessonOne.teacher_id });

        const presentation = lessonOne.presentation !== '' ? 
            (lessonOne.presentation.includes('https://') ? lessonOne.presentation : 'https://' + lessonOne.presentation) 
            : 
            lessonOne.presentation
        ;

        const link = lessonOne.link !== '' ? 
            (lessonOne.link.includes('https://') ? lessonOne.link : 'https://' + lessonOne.link) 
            : 
            lessonOne.link
        ;

        await Lesson.create({
            date,
            group,
            beginTime: date + 'T07:00:00.388Z',
            endTime: date + 'T07:40:00.388Z',
            teacher_id: lessonOne.teacher_id,
            teacher: `${teacher.lastName} ${teacher.firstName}`,
            subject: lessonOne.subject,
            theme: lessonOne.theme,
            presentation,
            additional: lessonOne.additional,
            link,
            homework: lessonOne.homework,
        });
    }
    if (lessonTwo.subject !== '') {
        const teacher = await User.findOne({ _id: lessonTwo.teacher_id });

        const presentation = lessonTwo.presentation !== '' ? 
            (lessonTwo.presentation.includes('https://') ? lessonTwo.presentation : 'https://' + lessonTwo.presentation) 
            : 
            lessonTwo.presentation
        ;

        const link = lessonTwo.link !== '' ? 
            (lessonTwo.link.includes('https://') ? lessonTwo.link : 'https://' + lessonTwo.link) 
            : 
            lessonTwo.link
        ;

        await Lesson.create({
            date,
            group,
            beginTime: date + 'T07:50:00.388Z',
            endTime: date + 'T08:30:00.388Z',
            teacher_id: lessonTwo.teacher_id,
            teacher: `${teacher.lastName} ${teacher.firstName}`,
            subject: lessonTwo.subject,
            theme: lessonTwo.theme,
            presentation,
            additional: lessonTwo.additional,
            link,
            homework: lessonTwo.homework,
        });
    }
    if (lessonThree.subject !== '') {
        const teacher = await User.findOne({ _id: lessonThree.teacher_id });

        const presentation = lessonThree.presentation !== '' ? 
            (lessonThree.presentation.includes('https://') ? lessonThree.presentation : 'https://' + lessonThree.presentation) 
            : 
            lessonThree.presentation
        ;

        const link = lessonThree.link !== '' ? 
            (lessonThree.link.includes('https://') ? lessonThree.link : 'https://' + lessonThree.link) 
            : 
            lessonThree.link
        ;

        await Lesson.create({
            date,
            group,
            beginTime: date + 'T08:40:00.388Z',
            endTime: date + 'T09:20:00.388Z',
            teacher_id: lessonThree.teacher_id,
            teacher: `${teacher.lastName} ${teacher.firstName}`,
            subject: lessonThree.subject,
            theme: lessonThree.theme,
            presentation,
            additional: lessonThree.additional,
            link,
            homework: lessonThree.homework,
        });
    }
    if (lessonFour.subject !== '') {
        const teacher = await User.findOne({ _id: lessonFour.teacher_id });

        const presentation = lessonFour.presentation !== '' ? 
            (lessonFour.presentation.includes('https://') ? lessonFour.presentation : 'https://' + lessonFour.presentation) 
            : 
            lessonFour.presentation
        ;

        const link = lessonFour.link !== '' ? 
            (lessonFour.link.includes('https://') ? lessonFour.link : 'https://' + lessonFour.link) 
            : 
            lessonFour.link
        ;

        await Lesson.create({
            date,
            group,
            beginTime: date + 'T09:30:00.388Z',
            endTime: date + 'T10:10:00.388Z',
            teacher_id: lessonFour.teacher_id,
            teacher: `${teacher.lastName} ${teacher.firstName}`,
            subject: lessonFour.subject,
            theme: lessonFour.theme,
            presentation,
            additional: lessonFour.additional,
            link,
            homework: lessonFour.homework,
        });
    }
    if (lessonFive.subject !== '') {
        const teacher = await User.findOne({ _id: lessonFive.teacher_id });

        const presentation = lessonFive.presentation !== '' ? 
            (lessonFive.presentation.includes('https://') ? lessonFive.presentation : 'https://' + lessonFive.presentation) 
            : 
            lessonFive.presentation
        ;

        const link = lessonFive.link !== '' ? 
            (lessonFive.link.includes('https://') ? lessonFive.link : 'https://' + lessonFive.link) 
            : 
            lessonFive.link
        ;

        await Lesson.create({
            date,
            group,
            beginTime: date + 'T10:20:00.388Z',
            endTime: date + 'T11:00:00.388Z',
            teacher_id: lessonFive.teacher_id,
            teacher: `${teacher.lastName} ${teacher.firstName}`,
            subject: lessonFive.subject,
            theme: lessonFive.theme,
            presentation,
            additional: lessonFive.additional,
            link,
            homework: lessonFive.homework,
        });
    }
    if (lessonSix.subject !== '') {
        const teacher = await User.findOne({ _id: lessonSix.teacher_id });

        const presentation = lessonSix.presentation !== '' ? 
            (lessonSix.presentation.includes('https://') ? lessonSix.presentation : 'https://' + lessonSix.presentation) 
            : 
            lessonSix.presentation
        ;

        const link = lessonSix.link !== '' ? 
            (lessonSix.link.includes('https://') ? lessonSix.link : 'https://' + lessonSix.link) 
            : 
            lessonSix.link
        ;

        await Lesson.create({
            date,
            group,
            beginTime: date + 'T11:10:00.388Z',
            endTime: date + 'T11:50:00.388Z',
            teacher_id: lessonSix.teacher_id,
            teacher: `${teacher.lastName} ${teacher.firstName}`,
            subject: lessonSix.subject,
            theme: lessonSix.theme,
            presentation,
            additional: lessonSix.additional,
            link,
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
                const teacher_id = info.id;
                const lessons = await Lesson.find({teacher_id});
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

app.put('/api/schedule', async (req,res) => {

    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;

            const perm = (info.perm === 'teacher');
            if (perm) {

                const lesson = req.body;

                const _id = lesson._id;
                const lessonDoc = await Lesson.findOne({_id});

                const presentation = 
                    lesson.presentation !== '' ? 
                        ((lesson.presentation.includes('https://') || lesson.presentation.includes('http://')) ? lesson.presentation : 'https://' + lesson.presentation) 
                        : 
                        lesson.presentation
                ;

                const link = 
                    lesson.link !== '' ? 
                        ((lesson.link.includes('https://') || lesson.link.includes('http://')) ? lesson.link : 'https://' + lesson.link) 
                        : 
                        lesson.link
                ;
            
                await lessonDoc.updateOne({
                    theme: lesson.theme,
                    presentation,
                    link,
                    homework: lesson.homework,
                });
    
                res.json(lessonDoc);
            } else {
                res.json('No permission');
            }
        });
    } else {
        res.status(401).json(null);
    }
});

app.post('/api/homework', async (req, res) => {
    const {status, group, student_id, student, teacher_id, teacher, subject, homework} = req.body;
    const exists = await Homework.findOne({homework, student_id});
    if (!exists) {
        const homeworkDoc = await Homework.create({
            status,
            group,
            student_id,
            student,
            teacher_id,
            teacher,
            subject,
            homework,
            link: '',
        });
        res.status(201).json(homeworkDoc);
    } else {
        res.status(200).json('exists');
    }
});

app.get('/api/homework', async (req, res) => {

    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;
            const perm = info.perm;
            if (perm === 'teacher') {
                const teacher_id = info.id;
                const homework = await Homework.find({teacher_id, status:'sent'});
                res.json(homework);
            } else {
                const student_id = info.id;
                const homework = await Homework.find({student_id});
                res.json(homework);
            }
        });
    } else {
        res.json(null);
    }
});

app.put('/api/homework', async (req, res) => {

    const {_id, stat, newLink} = req.body;
    const homeworkDoc = await Homework.findOne({_id});
    
    await homeworkDoc.updateOne({
        status: stat,
        group: homeworkDoc.group,
        student_id: homeworkDoc.student_id,
        student: homeworkDoc.student,
        teacher_id: homeworkDoc.teacher_id,
        teacher: homeworkDoc.teacher,
        subject: homeworkDoc.subject,
        homework: homeworkDoc.homework,
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
    const {caller_id, user_id, seen, message, link} = req.body;
    const exists = await Notification.findOne({caller_id, user_id});
    if (!exists) {
        const notification = await Notification.create({
            caller_id,
            user_id,
            seen,
            message,
            link,
        });
        res.status(201).json(notification);
    } else {
        res.status(200).json('exists');
    }
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
        caller_id: notification.caller_id,
        user_id: notification.user_id,
        seen: 'true',
        message: notification.message,
        link: notification.link,
    });

    res.json(notification);

});

app.delete('/api/notifications', async (req, res) => {

    const {user_id} = req.body;
    
    await Notification.deleteMany({user_id});

    res.status(200).json('success');

});

app.get('/api/schedule_test', async (req, res) => {
    const lessons = await Lesson.find({});
    res.json(lessons);
});

app.listen(4000);
