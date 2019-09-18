const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Home router');
});

router.get('/test', (req, res, next) => {
    res.send('Test route');
});

router.get("/hello/:msg", (req, res, next) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});


module.exports = router;