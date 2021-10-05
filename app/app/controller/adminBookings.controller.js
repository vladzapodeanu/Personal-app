const db = require('../config/db.config.js');
const e = require('express');
const { booking } = require('../config/db.config.js');
const adminBook = db.booking;

exports.findAll = (req, res) => {
    adminBook.findAll({
        attributes: {exclude: ["createdAt", "updatedAt"]}
    })
        .then(booking => {
            res.json(booking);
            console.log(res.json(booking));
        })
        .catch(error => res.status(400).send(error))

};

exports.findById = (req, res) => {
    return adminBook.findAll({
        where: {
            id_booking: req.params.id_booking
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(booking => {
                if(!booking){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(booking)
            }
        )
        .catch(error => res.status(400).send(error));
}

exports.delete = (req, res) => {
    console.log('req.params.id_user', req.params.id_booking)
    return adminBook.findOne({
        where: {
             id_booking: req.params.id_booking
        }
        })
            .then(booking => {
            //   if(JSON.stringify(user) === '{}') {
            //     return res.status(400).json({
            //       message: 'user Not Found',
            //     });
            //   }
   
              return booking.destroy()
            })
  };