const db = require('..\\config\\db.config.js');
const Admin = db.admin;

exports.findAll = (req, res) => {
    Admin.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(admin => {
            res.json(admin);
            console.log(res.json(admin));
        })
        .catch(error => res.status(400).send(error))

};

exports.findByName = (req, res) => {
    console.log("findByName");
    return Admin.findAll({
        where: {
            name: req.params.name
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(admin => {
            console.log(req.body);
                if(!admin){
                    return res.status(404).json({message: "admin Not Found"})
                }
                return res.status(200).json(admin)
            }
        )
        .catch(error => res.status(400).send(error));
};

