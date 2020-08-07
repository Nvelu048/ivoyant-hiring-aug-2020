const payment = require('express').Router();

payment.post('/', (req, res) => {
    // TODO: Do Payment
    res.json({
        "status": "success"
    })
})

module.exports = payment;