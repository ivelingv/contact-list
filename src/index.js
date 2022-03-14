const express = require('express');
const contactRouter = require('./routes/contact');
const userRouter = require('./routes/user');


const PORT_NUMBER = process.env.PORT_NUMBER || 3000;
const app = express();

// Connection to database
require('./database/mongoose');;

app.use(express.json());
app.use('/contacts', contactRouter);
app.use('/users', userRouter);

app.get('/help', (req, res) => {

    res.status(200).send({
        title: "This is a help page",
        details: "This is some realy long text..",
        index: 1,
        date: new Date()
    });
});

app.get('*', (req, res) => {

    res.status(404).send({
        error: "Page could not be found.",
        date: new Date()
    });
});

app.listen(PORT_NUMBER, () => {
    console.log(`Server is listening on port ${PORT_NUMBER}`);
});