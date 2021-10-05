const db = require('..\\config\\db.config.js');
const User = db.user;
const bcrypt = require('bcrypt');

const mailgun = require("mailgun-js");
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
const DOMAIN = 'sandbox162ee767c20e4730a494abf60eb7f08e.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


exports.findAll = (req, res) => {
    User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
            res.json(user);
            console.log(res.json(user));
        })
        .catch(error => res.status(400).send(error))

};

async function create (req, res) {
    const emaill=req.body.email;
    // Save to MariaDB database
    try {
        const occurences = await User.count({
            where: {
                email: req.body.email
            }
        });
          
        if(occurences === 0) {

            // const data = {
            //     from: 'noreply@hello.com',
            //     to: emaill,
            //     subject: 'Activare Cont',
            //     html: `<h2>Contul a fost activat cu succes! Va multumim!`,
            // };
            // mg.messages().send(data, function (error, body) {
            //     if(error) {
            //         return  res.json({
            //             error: err.message
            //         })
            //     }
                //return res.json({message: 'Email transmis cu succes!'})
            //});

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    console.log(hash);
                    User.create({
                        id_user: req.body.id_user,
                        name: req.body.name,
                        email: req.body.email,
                        phone_number: req.body.phone_number,
                        password: hash,
                        address: req.body.address
                    })
                    .then(user => {
                        // Send created user to client
                        res.json(user);
                    })
                    .catch(error => res.status(400).send(error))
                });
            });

            
            }  else {
                if (occurences !== 0) {
                 return res.json({message: 'Emailul exista'});  
            }
            res.json(user);
        }
    } catch(e) {
       res.status(400).send(e)
    }
};

// exports.activateAccount = (req, res) => {
//     const emaill=req.body.email;

//     const {token} = req.body;
//     if(token){
//         jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken) {
//             if(err) {
//                 return res.status(400).json({error: 'Link incorect sau expirat!'})
//             }
//             const {emaill} = decodedToken
//         })

//     } else{
//         return res.json({error: "Eroare!!"})
//     }
// }

exports.findByEmail = (req, res) => {
    console.log("findByEmail");
    
    return User.findOne({
        where: {
            email: req.params.email
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    
        .then(user => {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result) {
                    return res.status(200).json([user]);
                }

                if(err) {
                    console.log(err);
                    return null;
                }

                if(!result) {
                    return res.status(404).json({message: "Invalid credentials"})
                }
                return null;
            });
            
            console.log(req.body);
                if(!user){
                    return res.status(404).json({message: "user Not Found"})
                }
                
            }
        )
        .catch(error => res.status(400).send(error));
}

exports.findById = (req, res) => {
    return User.findAll({
        where: {
            id_user: req.params.id_user
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
                if(!user){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(user)
            }
        )
        .catch(error => res.status(400).send(error));
}


exports.update = (req, res) => {
    let updateValues =
        {
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone_number: req.body.phoneNumber
        };
    User.update(updateValues, {where: {id_user: req.params.id_user}}).then((result) => {
        console.log(req.body);
    });
};

module.exports.create = create;
