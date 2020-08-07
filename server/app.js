const { vendors, invoices } = require('./datasources');

const express = require('express');
const router = require('./routes');
const { config, credit, payment } = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV == 'production') {
    app.use('/', express.static(path.join(__dirname, '../client/build')))
}
app.use('/payment', payment);
app.use('/credit', credit);
app.use('/app', config);
app.get('/alive', (req, res) => {
    res.json({ "status": "You are connected" })
})
/* For development */
app.get("/invoices", (req, res) => {
    res.json(invoices)
});
app.get("/vendors", (req, res) => {
    res.json(vendors)
})
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on Port : ${process.env.PORT || 4000}`)
})

