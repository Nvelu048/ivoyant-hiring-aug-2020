const express = require('express');
const router = require('./routes');
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV == 'production') {
    app.use('/', express.static(path.join(__dirname, '../client/build')))
}
// populate with your routes
app.use('/home', router);
app.get('/alive', (req, res) => {
    res.json({ "status": "You can connected" })
})
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on Port : ${process.env.PORT}`)
})

