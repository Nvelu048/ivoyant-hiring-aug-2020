const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Server reachable")
})

module.exports = router;