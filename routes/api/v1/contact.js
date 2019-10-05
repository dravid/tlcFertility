'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const nodemailer = require('nodemailer');
require('dotenv').load();

const moment = require('moment');
const apiUrl = '/api/v1';
let db;
let contact;
const mongoUrl = process.env.MONGO_HOST + '/' + process.env.MONGO_DB;


function validRequest(query) {
  return (query[process.env.CACHE_BUSTER_RANDOM] && process.env.CACHE_BUSTER && query[process.env.CACHE_BUSTER_RANDOM] === process.env.CACHE_BUSTER);
}

MongoClient.connect(mongoUrl, (err, mongoClient) => {

  if (err) {
    throw new Error(err);
  }

  db = mongoClient.db(process.env.MONGO_DB);
  contact = db.collection('contact');
});

module.exports = (expressApp) => {

  if (expressApp === null) {
    throw new Error('Error: expressApp option must be an express server instance');
  }

  //fetch all contacts
  expressApp.get(apiUrl + '/contact', (req, res) => {

    if (validRequest(req.query)) {

      contact.find({}).sort({}).toArray(function (error, items) {
        if (error) {
          console.log(apiUrl + '/contact: ', error);
          return res.status(500).json({ error: 'db_error' });
        }
        return res.status(200).json(items);
      });

    }
    else {
      return res.status(403).json({ error: 'forbidden' });
    }

  });
  // -------------------------------



  expressApp.post(apiUrl + '/contact', (req, res) => {

    let now = moment(new Date()).utc().format('DD.MM.YYYY HH:mm');
    let postData = req.body;

    // Parameters for `get`
    let filters = {};
    let sort = {};

    // Parameters for `set`
    let update = {};
    let options = {};

    switch (postData.action) {

      case 'add':
        let newItem = {
          firstName: postData.firstName ? postData.firstName : '',
          lastName: postData.lastName ? postData.lastName : '',
          name: postData.name ? postData.name : '',
          dateOfBirth: postData.dateOfBirth ? postData.dateOfBirth : '',
          email: postData.email ? postData.email : '',
          phone: postData.phone ? postData.phone : '',
          subject: postData.subject ? postData.subject : '',
          message: postData.message ? postData.message : '',
          createdAt: now
        };

        contact.insertOne(newItem, (error, results) => {

          if (error) {
            console.log('api :: error :: /contact :: set :: ', error);

            return res.json({
              status: 'database_error'
            });
          }


          //SENDING MAIL 

          // Create a SMTP transport object
          var transport = nodemailer.createTransport({
            service: "Gmail",
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_FROM,
              pass: process.env.EMAIL_PASSWORD
            }
          });

          // Message object
          var message = {
            // sender info
            from: process.env.EMAIL_FROM,

            // Comma separated list of recipients
            to: 'contact@tlcfertility.com',
            // to: '064sms@gmail.com',

            // Subject of the message. Nodemailer is unicode friendly ✔
            subject: postData.subject ? postData.subject : "Not specified",

            // HTML body
            html: `You just got new message from ${postData.firstName ? postData.firstName : postData.email}.<br />
             <br />
             Date of birth: ${postData.dateOfBirth ? postData.dateOfBirth : "Not specified"}
             <br />
             Phone: ${postData.phone ? postData.phone : "Not specified"}
             <br />
             Email: ${postData.email ? postData.email : "Not specified"}
             <br />
            Message:
            <br />
             ${postData.message ? postData.message : ""}`

            // plaintext body
            //text: req.query.text //'Hello to myself!'
          };

          transport.sendMail(message, function (error) {
            if (error) {
              transport.close();

              console.log('Error occured:');
              console.log(error);

              return res.json({
                status: 'send_email_error'
              });
            }

            else {
              transport.close();

              return res.json({
                status: 'sucess',
                return: null,
                data: null
              });
            }
          });

          return res.json({
            status: 'item_added',
            return: 'result',
            data: newItem
          });

        });

        break;

      case 'get':

        filters = postData.filters ? postData.filters : {};
        sort = postData.sort ? postData.sort : {};

        contact.find(filters).sort(sort).toArray(function (error, items) {

          if (error) {
            console.log('api :: error :: /contact :: get :: ', error);

            return res.json({
              status: 'database_error'
            });
          }
          else {
            if (items.length > 0) {
              return res.json({
                status: 'items_fetched',
                return: 'contacts',
                data: items
              });
            }
            else {
              return res.json({
                status: 'no_items',
                return: 'contacts',
                data: []
              });
            }
          }
        });

        break;


      case 'remove':

        contact.deleteOne({
          _id: ObjectID(postData._id)
        }, (error, result) => {

          if (error) {
            console.log('api :: error :: /contact :: remove :: ', error);

            return res.json({
              status: 'database_error'
            });
          }

          return res.json({
            status: 'item_deleted',
            return: 'result',
            data: result
          });

        });

        break;

      case 'getOne':

        contact.findOne({
          _id: ObjectID(postData._id)
        }, function (error, item) {

          if (error) {
            console.log('api :: error :: /contact :: get :: ', error);

            return res.json({
              status: 'database_error'
            });
          }
          else {
            if (item) {
              return res.json({
                status: 'item_fetched',
                return: 'contact',
                data: item
              });
            }
            else {
              return res.json({
                status: 'no_item',
                return: 'contact',
                data: {}
              });
            }
          }
        });

        break;
    }

  });

};