const db = require('..\\config\\db.config.js');
const booking = db.booking;

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox162ee767c20e4730a494abf60eb7f08e.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});



exports.findAll = (req, res) => {
    booking.findAll({
        attributes: {exclude: ["createdAt", "updatedAt"]}
    })
        .then(booking => {
            res.json(booking);
            console.log(res.json(booking));
        })
        .catch(error => res.status(400).send(error))

};

exports.create = (req, res) => {
    const from=req.body.from_address;
    const to=req.body.to_address;
    const pret=req.body.price;
    const plata=req.body.payment_method;

    
    // Save to MariaDB database
    booking.create({
        id_user: req.body.id_user,
        from_address: req.body.from_address,
        to_address: req.body.to_address,
        distance: req.body.distance,
        price: req.body.price,
        payment_method: req.body.payment_method,
        passenger: req.body.passenger
    })
        .then(booking => {
            // Send created customer to clients
            res.json(booking);
        })
        .catch(error => res.status(400).send(error))

        // const data = {
        //     from: 'noreply@hello.com',
        //     to: 'nicu.iulian999@gmail.com',
        //     subject: 'Inregistrare Confirmata',
        //     html: `<h1> From: ${from} <br>
        //     <h1> To: ${to} <br>
        //     <h1> Price: ${pret} lei<br>
        //     <h1> Paymenth_method: ${plata} <br>
        //   `
            
            
            
            
        // };
        // mg.messages().send(data, function (error, body) {
        //     if(error) {
        //         return  res.json({
        //             error: err.message
        //         })
        //     }
        //     return res.json({message: 'Email transmis cu succes!'})
        // });
};


exports.findById = (req, res) => {
    return booking.findAll({
        where: {
            id_user: req.params.id_user
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
