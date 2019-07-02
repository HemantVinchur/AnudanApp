const router = require('express').Router();
const validators = require('../validators');
const Admin_validator = require('../Admin_validator');
const Donation_validator = require('../Donation_validator');
const functions = require('../functions');
const celebrate = require('celebrate');
const UserModel = require('../models/Donar');
const AdminModel = require('../models/Admin');
const DonationModel = require('../models/Donation');
const mongodb = require('mongodb');
//Donar_register
router.post('/donar_register', validators.userValidator.registerReqValidator, (req, res) => {
    

        let payload = req.body;
        UserModel.findOne({ Email: payload.Email })
            .then((donardata) => {
                if (donardata) {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "user already exists",
                        data: {}
                    })
                }
                let hashObj = functions.hashPassword(payload.Password);
                console.log(hashObj);
                delete payload.password
                payload.salt = hashObj.salt;
                payload.Password = hashObj.hash;

                UserModel.create(payload)
                    .then((data) => {
                        return res.status(200).json({
                            statusCode: 200,
                            message: "Sucess",
                            data:data
                        })
                    }).catch((err) => {

                        console.error(err);
                        return res.status(200).json({
                            statusCode: 400,
                            message: "Something went wrong",
                            data: {}
                        })
                    })

            }).catch((err) => {
                console.err(err);
                return res.status(200).json({
                    statusCode: 400,
                    message: "Something went wrong",
                    data: {}
                })
            })

});
//Donar login
router.post('/login', (req, res) => {
    try {
        let payload = req.body;
        UserModel.findOne({ Email: payload.Email }, (err, data) => {
            if (err) {
                console.error(err);
                return res.json({
                    statusCode: 400,
                    message: "Something went wrong",
                    data: {}
                });
            }
            if (!data) {
                return res.status(200).json({
                    statusCode: 404,
                    message: "User not found",
                    data: {}
                });
            }

            let isPasswordValid = functions.validatePassword(data.salt, payload.Password, data.Password);

            console.log(isPasswordValid)
            if (!isPasswordValid) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "Invalid EmailId or password",
                    data: {}
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "Ok",
                data: data
            });

        });
    } catch (err) {
        console.error(err);
        res.json({
            statusCode: 400,
            message: "Something went wrong",
            data: {}
        });
    }
});

//Admin register
router.post('/admin_register', Admin_validator.adminValidator.registerAdminValidator, (req, res) => {
    try {

        let payload = req.body;
        AdminModel.findOne({ Email: payload.Email }, (err, data) => {
            if (err) {
                return res.json({
                    statusCode: 400,
                    message: "Something went wrong",
                    data: {}
                });
            }
            if (data) {
                return res.status(200).json({
                    statusCode: 404,
                    message: "User already exists",
                    data: {}
                })
            }
            let hashObj = functions.hashPassword(payload.Password);
            console.log(hashObj);
            delete payload.password;
            payload.salt = hashObj.salt;
            payload.Password = hashObj.hash;
            console.log("Sign-up block executed");
            console.log('0000000')
            AdminModel.create(payload, (err, data) => {
                console.log('111111111')

                if (!data) {
                    console.log('222222222')
                    res.status(200).json({
                        statusCode: 400,
                        message: "Something went wrong",
                        data: {}
                    });
                }
                res.status(200).json({
                    statusCode: 201,
                    message: "Success",
                    data: data
                })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            statusCode: 400,
            message: "Something went wrong",
            data: {}
        })
    }
})

//Admin_login
router.post('/admin_login', (req, res) => {
    try {
        let payload = req.body;
        AdminModel.findOne({ Email: payload.Email }, (err, data) => {
            if (err) {
                console.error(err);
                return res.json({
                    statusCode: 400,
                    message: "Something went wrong",
                    data: {}
                });
            }
            if (!data) {
                return res.status(200).json({
                    statusCode: 404,
                    message: "User not found",
                    data: {}
                });
                console.log(Email);
            }


            let isPasswordValid = functions.validatePassword(data.salt, payload.Password, data.Password);

            console.log(isPasswordValid)
            if (!isPasswordValid) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "Invalid EmailId or password",
                    data: {}
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "Ok",
                data: data
            });

        });
    } catch (err) {
        console.error(err);
        res.json({
            statusCode: 400,
            message: "Something went wrong",
            data: {}
        });
    }
});


//Create_donation
router.post('/donation', Donation_validator.donationValidator.registerDoationValidator, (req, res) => {
    try {

        let payload = req.body;
        DonationModel.findOne({ Email: payload.Email }, (err, data) => {
            if (err) {
                return res.json({
                    statusCode: 400,
                    message: "Something went wrong",
                    data: {}
                });
            }
            if (data) {
                return res.status(200).json({
                    statusCode: 404,
                    message: "User already exists",
                    data: {}
                })
            }
            // let hashObj = functions.hashPassword(payload.Password);
            // payload.salt = hashObj.salt;
            // payload.Password = hashObj.hash;
            DonationModel.create(payload, (err, data) => {
                if (!data) {
                    res.status(200).json({
                        statusCode: 400,
                        message: "Something went wrong",
                        data: {}
                    });
                }
                res.status(200).json({
                    statusCode: 201,
                    message: "Success",
                    data: data
                })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            statusCode: 400,
            message: "Something went wrong",
            data: {}
        })
    }
})



//Update Donation

router.put('/update-donar/:id', (req, res) => {
    let payload = req.body;
    console.log(payload);
    try {
        DonationModel.findOne({ Email: payload.Email }, (err, data) => {
            console.log("1111111111111111111")
            DonationModel.updateOne({
                Email: payload.Email
            },

                {
                    donarName: payload.donarName,
                    Email: payload.Email,
                    Contact: payload.Contact,
                    Address: payload.Address,
                    Amount: payload.Amount
                },

                (error, data) => {
                    if (error) {
                        res.status(200).json({
                            statusCode: 400,
                            message: "user not found",


                        })
                    }
                    return res.status(200).json({
                        statusCode: 200,
                        message: "sucess",
                        data: data
                    })
                })
        })
    } catch (err) {
        console.error(err)
        res.status(200).json({
            statusCode: 400,
            message: "somthing is going wrong"
        })

    }

})


router.get('/profile/:Email', (req, res) => {

    DonationModel.findOne({ Email: req.params.Email }, (err, data) => {
        console.log('created', data)
        res.send(data)
    })
})


router.get('/profileAll', (req, res) => {

    console.log("111111111111111111")
    DonationModel.find({}, (err, data) => {
        console.log("222222222222222222222")
        console.log('created', data)
        res.send(data)
    })
})

module.exports = router;