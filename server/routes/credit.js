const credit = require('express').Router();

credit.post('/', (req, res) => {
    res.json({
        "status": "success"
    })
})

credit.post('/apply', (req, res) => {
    // TODO:  Apply Credit 
    res.json({
        "status": "credit successfully applied"
    })
})


module.exports = credit;