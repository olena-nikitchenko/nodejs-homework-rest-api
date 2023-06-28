const mongoose = require('mongoose');
const app = require('./app');

const DB_HOST =
    'mongodb+srv://Olena:T8Jk9YqtSyEmydLk@cluster0.v75hzhv.mongodb.net/contacts_reader?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(3001);
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
