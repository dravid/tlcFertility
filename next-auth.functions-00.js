/**
 * next-auth.functions.js Example
 *
 * This file defines functions NextAuth to look up, add and update users.
 *
 * It returns a Promise with the functions matching these signatures:
 *
 * {
 *   find: ({
 *     id,
 *     email,
 *     emailToken,
 *     provider,
 *     poviderToken
 *   } = {}) => {},
 *   update: (user) => {},
 *   insert: (user) => {},
 *   remove: (id) => {},
 *   serialize: (user) => {},
 *   deserialize: (id) => {}
 * }
 *
 * Each function returns Promise.resolve() - or Promise.reject() on error.
 *
 * This specific example supports both MongoDB and NeDB, but can be refactored
 * to work with any database.
 *
 * Environment variables for this example:
 *
 * MONGO_URI=mongodb://localhost:27017/my-database
 * EMAIL_FROM=username@gmail.com
 * EMAIL_SERVER=smtp.gmail.com
 * EMAIL_PORT=465
 * EMAIL_USERNAME=username@gmail.com
 * EMAIL_PASSWORD=p4ssw0rd
 *
 * If you wish, you can put these in a `.env` to seperate your environment
 * specific configuration from your code.
 **/

// Load environment variables from a .env file if one exists
require('dotenv').load();
const uuid = require('uuid/v4');
const nextConfig = require('./next.config');

// This config file uses MongoDB for User accounts, as well as session storage.
// This config includes options for NeDB, which it defaults to if no DB URI 
// is specified. NeDB is an in-memory only database intended here for testing.
const MongoClient = require('mongodb').MongoClient;
const NeDB = require('nedb');
const MongoObjectId = (process.env.MONGO_URI) ? require('mongodb').ObjectId : (id) => { return id; };

// Use Node Mailer for email sign in
const nodemailer = require('nodemailer');
const nodemailerSmtpTransport = require('nodemailer-smtp-transport');
const nodemailerDirectTransport = require('nodemailer-direct-transport');

// Send email direct from localhost if no mail server configured
let nodemailerTransport = nodemailerDirectTransport();
if (process.env.EMAIL_SERVER && process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
	nodemailerTransport = nodemailerSmtpTransport({
		host: process.env.EMAIL_SERVER,
		port: process.env.EMAIL_PORT || 25,
		secure: true,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});
}

module.exports = () => {
	return new Promise((resolve, reject) => {
		if (process.env.MONGO_URI) {
			// Connect to MongoDB Database and return user connection
			MongoClient.connect(process.env.MONGO_URI, (err, mongoClient) => {
				if (err) {
					return reject(err);
				}
				const dbName = process.env.MONGO_URI.split('/').pop().split('?').shift();
				const db = mongoClient.db(dbName);
				return resolve(db.collection('users'));
			});
		}
		else {
			// If no MongoDB URI string specified, use NeDB, an in-memory work-a-like.
			// NeDB is not persistant and is intended for testing only.
			let collection = new NeDB({autoload: true});
			collection.loadDatabase(err => {
				if (err) {
					return reject(err);
				}
				resolve(collection);
			});
		}
	}).then(usersCollection => {
		return Promise.resolve({
			// If a user is not found find() should return null (with no error).
			find: ({id, email, emailToken, provider} = {}) => {
				let query = {};

				// Find needs to support looking up a user by ID, Email, Email Token,
				// and Provider Name + Users ID for that Provider
				if (id) {
					query = {_id: MongoObjectId(id)};
				}
				else if (email) {
					query = {email: email};
				}
				else if (emailToken) {
					query = {emailToken: emailToken};
				}
				else if (provider) {
					query = {[`${provider.name}.id`]: provider.id};
				}

				return new Promise((resolve, reject) => {
					usersCollection.findOne(query, (err, user) => {
						if (err) {
							return reject(err);
						}
						return resolve(user);
					});
				});
			},
			// The user parameter contains a basic user object to be added to the DB.
			// The oAuthProfile parameter is passed when signing in via oAuth.
			//
			// The optional oAuthProfile parameter contains all properties associated
			// with the users account on the oAuth service they are signing in with.
			//
			// You can use this to capture profile.avatar, profile.location, etc.
			insert: (user, oAuthProfile) => {
				return new Promise((resolve, reject) => {
					usersCollection.insert(user, (err, response) => {
						if (err) {
							return reject(err);
						}

						// Mongo Client automatically adds an id to an inserted object, but
						// if using a work-a-like we may need to add it from the response.
						if (!user._id && response._id) {
							user._id = response._id;
						}

						return resolve(user);
					});
				});
			},
			// The user parameter contains a basic user object to be added to the DB.
			// The oAuthProfile parameter is passed when signing in via oAuth.
			//
			// The optional oAuthProfile parameter contains all properties associated
			// with the users account on the oAuth service they are signing in with.
			//
			// You can use this to capture profile.avatar, profile.location, etc.
			update: (user, profile) => {
				return new Promise((resolve, reject) => {
					usersCollection.update({_id: MongoObjectId(user._id)}, user, {}, (err) => {
						if (err) {
							return reject(err);
						}
						return resolve(user);
					});
				});
			},
			// The remove parameter is passed the ID of a user account to delete.
			//
			// This method is not used in the current version of next-auth but will
			// be in a future release, to provide an endpoint for account deletion.
			remove: (id) => {
				return new Promise((resolve, reject) => {
					usersCollection.remove({_id: MongoObjectId(id)}, (err) => {
						if (err) {
							return reject(err);
						}
						return resolve(true);
					});
				});
			},
			// Seralize turns the value of the ID key from a User object
			serialize: (user) => {
				// Supports serialization from Mongo Object *and* deserialize() object
				if (user.id) {
					// Handle responses from deserialize()
					return Promise.resolve(user.id);
				}
				else if (user._id) {
					// Handle responses from find(), insert(), update()
					return Promise.resolve(user._id);
				}
				else {
					return Promise.reject(new Error("Unable to serialise user"));
				}
			},
			// Deseralize turns a User ID into a normalized User object that is
			// exported to clients. It should not return private/sensitive fields,
			// only fields you want to expose via the user interface.
			deserialize: (id) => {
				return new Promise((resolve, reject) => {
					usersCollection.findOne({_id: MongoObjectId(id)}, (err, user) => {
						if (err) {
							return reject(err);
						}

						// If user not found (e.g. account deleted) return null object
						if (!user) {
							return resolve(null);
						}

						return resolve({
							id: user._id,
							name: user.name,
							email: user.email,
							emailVerified: user.emailVerified,
							admin: user.admin || false
						});
					});
				});
			},

			signIn: ({form, req}) => {
				return new Promise((resolve, reject) => {
					// Should validate credentials (e.g. hash password, compare 2FA token
					// etc) and return a valid user object from a database.

					console.log("form");
					console.log(form);

					return usersCollection.findOne({
						email: form.email
					}, (err, user) => {

						if (err) {
							return reject(err);
						}

						console.log("user");
						console.log(user);

						return resolve(user);

						/*
						if (!user) {
							return resolve(null);
						}

						// Check credentials - e.g. compare bcrypt password hashes
						if (form.password === "test1234") {
							// If valid, return user object - e.g. { id, name, email }
							return resolve(user);
						}
						else {
							// If invalid, return null
							return resolve(null);
						}
						*/

					});
				});
			},

			// Define method for sending links for signing in over email.
			/*
			sendSignInEmail: ({
				                  email = null,
				                  url = null
			                  } = {}) => {
				nodemailer.createTransport(nodemailerTransport).sendMail({
					to: email,
					from: process.env.EMAIL_FROM,
					subject: 'Sign in link',
					text: `Use the link below to sign in:\n\n${url}\n\n`,
					html: `<p>Use the link below to sign in:</p><p>${url}</p>`
				}, (err) => {
					if (err) {
						console.error('Error sending email to ' + email, err);
					}
				});
				if (process.env.NODE_ENV === 'development') {
					console.log('Generated sign in link ' + url + ' for ' + email)
				}
			},
			*/

			// Credentials Sign In
			//
			// If you use this you will need to define your own way to validate
			// credentials. Unlike with oAuth or Email Sign In, accounts are not
			// created automatically so you will need to provide a way to create them.
			//
			// This feature is intended for strategies like Two Factor Authentication.
			//
			// To disable this option, do not set signin (or set it to null).

			// signIn: ({form, req}) => {
			// 	return new Promise((resolve, reject) => {
			//
			// 		console.log("form");
			// 		console.log(form);
			//
			// 		let actionType = form.actionType;
			//
			// 		// Should validate credentials (e.g. hash password, compare 2FA token
			// 		// etc) and return a valid user object from a database.
			// 		return usersCollection.findOne({
			// 			email: form.email
			// 		}, (err, user) => {
			// 			if (err) {
			// 				// return reject(err);
			// 				resolve({status: 'error'});
			// 			}
			//
			// 			if (actionType === 'sign_up') {
			//
			// 				/**
			// 				 * Sign up action
			// 				 */
			//
			// 				if (!user) {
			// 					/**
			// 					 * New user
			// 					 * - Persist to the database
			// 					 * - Send verification email
			// 					 * - Return message that verification email has been sent
			// 					 */
			//
			// 					const emailVerificationToken = uuid();
			// 					const emailVerificationUrl = process.env.SERVER_URL + process.env.EMAIL_VERIFICATION_PATH + '/' + emailVerificationToken;
			//
			// 					usersCollection.insertOne({
			// 						email: form.email,
			// 						password: form.password,
			// 						emailVerificationFinished: false,
			// 						emailVerificationToken: emailVerificationToken
			// 					}, (err, newUser) => {
			//
			// 						if (err) {
			// 							return reject(err);
			// 						}
			//
			// 						let transporter = nodemailer.createTransport({
			// 							service: process.env.EMAIL_SERVICE,
			// 							auth: {
			// 								user: process.env.EMAIL_FROM,
			// 								pass: process.env.EMAIL_PASSWORD
			// 							}
			// 						});
			//
			// 						let emailMessage = `
			// 							Thank you for your registration!<br><br>
			// 							Use the link below to verify your email:<br>
			// 							${emailVerificationUrl}
			// 						`;
			//
			// 						const mailOptions = {
			// 							from: process.env.EMAIL_FROM,
			// 							to: process.env.EMAIL_FROM,
			// 							subject: 'Verify your account',
			// 							html: emailMessage
			// 						};
			//
			// 						transporter.sendMail(mailOptions, function(err, info) {
			// 							if (err) {
			// 								console.log(err);
			// 							}
			// 							else {
			// 								// console.log(info);
			//
			// 								resolve({
			// 									status: nextConfig.publicRuntimeConfig.constants.signUp.verificationEmailSent
			// 								});
			// 							}
			//
			// 						});
			//
			// 					});
			// 				}
			// 				else {
			//
			// 					/**
			// 					 * Existing user
			// 					 * - Return message that user already exists
			// 					 */
			//
			// 					resolve({
			// 						status: nextConfig.publicRuntimeConfig.constants.signUp.userExists
			// 					});
			//
			// 				}
			//
			// 			}
			// 			else if (actionType === 'sign_in') {
			//
			// 				/**
			// 				 * Sign in action
			// 				 */
			//
			// 				resolve({status: 'sign_in_action'});
			//
			// 			}
			// 			else {
			//
			// 				/**
			// 				 * Unknown action
			// 				 */
			//
			// 				resolve({status: 'unknown_action'});
			//
			// 			}
			//
			// 			resolve({status: 'nothing'});
			//
			// 			/*
			// 			// Check credentials - e.g. compare bcrypt password hashes
			// 			if (form.password === "test1234") {
			// 				// If valid, return user object - e.g. { id, name, email }
			// 				return resolve(user);
			// 			}
			// 			else {
			// 				// If invalid, return null
			// 				return resolve(null);
			// 			}
			// 			*/
			//
			// 		});
			// 	});
			// },

		});
	});
};