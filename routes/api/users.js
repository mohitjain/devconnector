const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
// User registration route
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		console.log(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email: email });
			if (user) {
				console.log('User Exists');
				res.type('application/json');
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}
			console.log("User doesn't exists");

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new User({
				name,
				email,
				avatar,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);
			await user.save();

			res.send('User Router');
		} catch (error) {
			console.error(error.message);
			res.sendStatus(500).send('Server Error');
		}
	}
);

module.exports = router;
