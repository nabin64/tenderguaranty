const Users = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const registerUser = async (req, res) => {

    try {
        const data = await Users.findOne({ phoneNumber: req.body.phoneNumber });
        if (data) {
            return res.json({
                msg: 'User Already Exists',
                success: false,
            });
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            if (hash) {
                req.body.password = hash;
                const user = await Users.create(req.body);
                if (user) {
                    return res.json({
                        msg: 'Registration success',
                        success: true,
                    });
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error', success: false });
    }

}

const loginUser = async (req, res) => {
    try {
        const data = await Users.findOne({ phoneNumber: req.body.phoneNumber });
        if (data) {
            const isMatched = await bcrypt.compare(req.body.password, data.password);
            console.log(isMatched)
            if (isMatched) {
                const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, 'nabin');
                return res.json({ message: 'Login Success', success: true });
            } else {
                return res.json({ message: 'Login Failed', success: false });
            }
        } else {
            return res.json({ message: 'User does not exist', success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error', success: false });
    }

}

module.exports = { registerUser, loginUser }