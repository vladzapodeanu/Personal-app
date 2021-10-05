var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');
var cors = require('cors');


require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( rootPath + '/app'));
app.use(cors());

const db = require('../app/config/db.config.js');
const { response } = require('express');


require('../app/controller/user.route.js')(app);
require('../app/controller/booking.route.js')(app);
require('../app/controller/admin.route.js')(app);
require('../app/controller/adminUser.route.js')(app);
require('../app/controller/adminEdit.route.js')(app);
require('../app/controller/reviews.route.js')(app);
require('../app/controller/adminBookings.route.js')(app);

// Create a Server
var server = app.listen(3000, function () {

    var host = 'localhost';
    var port = '3000';

    console.log("App listening at http://%s:%s", host, port);
})
