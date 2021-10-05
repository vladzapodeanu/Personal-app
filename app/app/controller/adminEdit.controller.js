const db = require('../config/db.config.js');
const adminEdit = db.user;

exports.findAll = (req, res) => {
    adminEdit.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
            res.json(user);
            console.log(res.json(user));
        })
        .catch(error => res.status(400).send(error))

};

exports.findById = (req, res) => {
    return adminEdit.findAll({
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
    adminEdit.update(updateValues, {where: {id_user: req.params.id_user}}).then((result) => {
        console.log(req.body);
    });
};