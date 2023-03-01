const express = require('express');

const app = express();

app.use("/", (req, res, next) =>{
    console.log('Midleware');
    res.status(200);
    res.send('Ola');
});

app.use("/users", (req, res, next) => {
    console.log('Users');
    res.send('Index page');
    res.status(200);
});

app.listen(3000);