const db = require('..\\config\\db.config.js');
const Reviews = db.reviews;

exports.findAll = (req, res) => {
    Reviews.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(reviews => {
            res.json(reviews);
            console.log(res.json(reviews));
        })
        .catch(error => res.status(400).send(error))

};

exports.findById = (req, res) => {
    return Reviews.findAll({
        where: {
            id_user: req.params.id_user
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(reviews => {
                if(!reviews){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(reviews)
            }
        )
        .catch(error => res.status(400).send(error));
}

exports.create = (req, res) => {

    // Save to MariaDB database
    Reviews.create({
        review: req.body.review,
        id_user: req.body.id_user
    })
        .then(reviews => {
            // Send created customer to clients
            res.json(reviews);
        })
        .catch(error => res.status(400).send(error))

};