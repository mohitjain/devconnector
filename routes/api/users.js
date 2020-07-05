const express = require('express');
const router = express.Router();

// User registration route
router.post('/', (req, res) => {
	console.log(req.body);
	res.send('User Router');
});

module.exports = router;
