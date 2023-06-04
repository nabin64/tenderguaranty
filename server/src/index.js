const express = require('express')
const cors = require('cors')
const dbConnect = require('./connection/dbConnect')
const userRoute = require('./routes/user')


const app = express()
require('dotenv').config()
const port = process.env.PORT || 4000
dbConnect()
app.use(express.json({ limit: '50mb' }))

app.use(cors())



app.use('/', userRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(cors()); // Enable CORS for all routes
// app.use(express.json());


// const userSchema = new mongoose.Schema({
//     fullName: { type: String, required: true, unique: false },
//     phoneNumber: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     user_type: { type: String, enum: ['ADMIN', 'MUN', 'CAO', 'ACCOUNT', 'ENGINEER'], default: 'ADMIN' },

// });

// // Create a Mongoose model based on the schema
// const User = mongoose.model('User', userSchema);

// // Connect to MongoDB and start the server
// mongoose
//     .connect('mongodb://localhost/tenderGuaranteeDb', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         app.listen(4000, () => {
//             console.log('Server started on port 4000');
//         });
//     })
//     .catch((err) => console.error(err));


// app.post('/register', async (req, res) => {
//     console.log(req.body)
//     try {
//         const data = await User.findOne({ phoneNumber: req.body.phoneNumber });
//         if (data) {
//             return res.json({
//                 msg: 'User Already Exists',
//                 success: false,
//             });
//         } else {
//             const hash = await bcrypt.hash(req.body.password, 10);
//             if (hash) {
//                 req.body.password = hash;
//                 const user = await User.create(req.body);
//                 if (user) {
//                     return res.json({
//                         msg: 'Registration success',
//                         success: true,
//                     });
//                 }
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: 'Internal Server Error', success: false });
//     }
// });


// app.post('/login', async (req, res) => {

//     try {
//         const data = await User.findOne({ phoneNumber: req.body.phoneNumber });


//         if (data) {

//             const isMatched = await bcrypt.compare(req.body.password, data.password);
//             if (isMatched) {
//                 const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, 'nabin');
//                 return res.json({ message: 'Login Success', success: true });
//             } else {
//                 return res.json({ message: 'Login Failed', success: false });
//             }
//         } else {
//             return res.json({ message: 'User does not exist', success: false });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: 'Internal Server Error', success: false });
//     }
// });
