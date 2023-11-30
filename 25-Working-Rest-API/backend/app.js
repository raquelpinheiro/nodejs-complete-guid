const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) =>{
        cb(null, uuidv4());
    }
});

const fileFilter = (req, file, cb) =>{
    if (file.mimeType == 'image/png' ||
    file.mimeType == 'image/jpg' ||
    file.mimeType == 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

app.use(bodyparser.json());
app.use(multer({
    fileStorage: fileStorage,
    fileFilter: fileFilter
}).single('images'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

mongoose.connect('mongodb://shopnodejs:shopapp@localhost:27017').then(c => {
    app.listen(3005);
}).catch(err => console.error(err));
