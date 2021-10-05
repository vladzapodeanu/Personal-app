const db = require('../config/db.config.js');
const e = require('express');
const adminUser = db.user;

exports.findAll = (req, res) => {
    
    adminUser.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
            res.json(user);
            console.log(res.json(user));
        })
        .catch(error => res.status(400).send(error))

};

exports.findById = (req, res) => {
    return adminUser.findAll({
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

exports.delete = (req, res) => {
    console.log('req.params.id_user', req.params.id_user)
    return adminUser.findOne({
        where: {
             id_user: req.params.id_user
        }
        })
            .then(user => {
            //   if(JSON.stringify(user) === '{}') {
            //     return res.status(400).json({
            //       message: 'user Not Found',
            //     });
            //   }
   
              return user.destroy()
            })
  };