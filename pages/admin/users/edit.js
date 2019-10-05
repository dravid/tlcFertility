import React, { Component } from 'react';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;

import AdminLayout from './../../../layouts/AdminLayout.js';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { encodeForm } from './../../../utils/api-utils.js';
import { isValidEmail, isValidPassword } from './../../../utils/form-utils.js';
import OnlyOnClient from "../../../components/common/OnlyOnClient";

const moment = require('moment');

class NewPage extends React.Component {

	static async getInitialProps({ req, res, query }) {
		let session = await NextAuth.init({ req });

		if (res && session && !session.user) {
			res.redirect('/auth/sign-in');
		}

		// Get user data
		let user = {};
		let userResponse = await fetch(`${siteUrl}/api/v1/users/${query._id}?${noCache}`);
		if (userResponse.status === 200) {
			user = await userResponse.json();
		}

		// Get user's logs (query params: action', entity, ownerId)
		let logs = [];
		let logsResponse = await fetch(`${siteUrl}/api/v1/logs?${noCache}&ownerId=${user._id}`);
		if (logsResponse.status === 200) {
			logs = await logsResponse.json();
		}

		// Get user's posts (query params: action', entity, userId)
		let posts = [];
		let postsResponse = await fetch(`${siteUrl}/api/v1/posts?${noCache}&authorId=${query._id}`);
		// let postsResponse = await fetch(`${siteUrl}/api/v1/posts/${query._id}?${noCache}`);
		if (postsResponse.status === 200) {
			posts = await postsResponse.json();
			console.log(query._id)
		}

		// Get conversation rooms (query params: action', entity, get all)
		// let conversationsRooms = [];
		// let conversationsRoomsResponse = await fetch(`${siteUrl}/api/v1/conversations?${noCache}&conversationRoomId`);
		// if (conversationsRoomsResponse.status === 200) {
		// 	conversationsRooms = await conversationsRoomsResponse.json();
		// }

		// Get participant for message system (query params: action', entity, participant_Id=user_id)
		// let conversationsParticipants = [];
		// let conversationsParticipantsResponse = await fetch(`${siteUrl}/api/v1/conversations?${noCache}&participantId=${user._id}`);
		// if (conversationsParticipantsResponse.status === 200) {
		// 	conversationsParticipants = await conversationsParticipantsResponse.json();
		// }

		return {
			// conversationsRooms: conversationsRooms,
			// conversationsParticipants: conversationsParticipants,
			reqq: query._id,
			posts: posts,
			ip: req.ip ? req.ip : '',
			user: user,
			logs: logs,
			session: session,
			linkedAccounts: await NextAuth.linked({ req }),
			providers: await NextAuth.providers({ req }),
			query: query
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			session: this.props.session,
			ip: this.props.ip,
			user: this.props.user,
			logs: this.props.logs,
			posts: this.props.posts,
			userBlockByEmail: this.props.user.blockedByEmail,
			userBlockByIpAddress: this.props.user.blockedByIpAddress,
			userFullName: this.props.user.firstName + ' ' + this.props.user.lastName,
			// userShow: false,

			//user post controls
			postSliceControl: 60,

			//user messages controls
			selectedConversationRoom: '',
		};

		this.updateProfile = this.updateProfile.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.deletePostHandler = this.deletePostHandler.bind(this);
		this.showPostControl = this.showPostControl.bind(this);
	}

	async componentDidMount() {


		// Fetch user
		const formData = {
			_csrf: this.props.session.csrfToken,
			_id: this.props.query._id,
			action: 'getOne'
		};

		await fetch(`${siteUrl}/api/v1/users`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(formData)
		}).then(async res => {

			if (res.status === 200) {
				this.setState({ user: await res.json() });
			}
			else {
				this.setState({ user: {} });
			}

		});
	}

	async sendMessage(e) {
		e.preventDefault();

		let self = this;

		const formData = {
			_csrf: await NextAuth.csrfToken(),
			conversationRoomId: this.state.selectedConversationRoom,
			conversationParticipantId: this.props.query._id,
			createdBy: this.state.userFullName,
			messageContent: this.state.messageContent,
			action: 'add_message',
		};

		const encodedForm = Object.keys(formData).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
		}).join('&');

		fetch('/api/v1/conversations', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: encodedForm
		}).then(async res => {
			let response = await res.json();

			if (response.status === 'database_error') {
				console.log('database_error');
			}
			else if (response.status === 'message_sent') {
				console.log('message_sent');
				console.log(response.data);

			}
			else {
				console.log('unknown_status');
			}
		});
	}

	async updateProfile(e) {
		e.preventDefault();

		if (!isValidEmail($('#userEmail').val())) {
			alert('Please insert valid e-mail!');
			return false;
		}

		let self = this;

		// console.log(this.props.session);

		let moderatorId = '';
		let moderatorFirstName = '';
		let moderatorLastName = '';

		if (self.props.session && self.props.session.user) {
			let moderator = self.props.session.user;

			moderatorId = moderator.id ? moderator.id : '';
			moderatorFirstName = moderator.firstName ? moderator.firstName : '';
			moderatorLastName = moderator.lastName ? moderator.lastName : '';
		}

		let firstName = $('#userFirstName').val();
		let lastName = $('#userLastName').val();
		let agency = $('#userAgency').val();
		let email = $('#userEmail').val();
		let password = $('#userPassword').val();
		let role = $('#userRole').val();

		let phone = $('#userPhone').val();
		let city = $('#userCity').val();
		let site = $('#userSite').val();
		let state = $('#userState').val();
		let country = $('#userCountry').val();
		let company = $('#userCompany').val();
		let description = $('#userDescription').val();

		let jobTitle = $('#userJobTitle').val();
		let gender = $('#userGender').val();
		let facebookUrl = $('#userFacebookUrl').val();
		let twitterUrl = $('#userTwitterUrl').val();
		// let userShow = $('#userBlockByEmail').is(':checked');

		let blockedByEmail = $('#userBlockByEmail').is(':checked');
		let blockedByIpAddress = $('#userBlockByIpAddress').is(':checked');

		const formData = {
			_csrf: await NextAuth.csrfToken(),
			_id: this.props.query._id,
			firstName: firstName,
			lastName: lastName,
			agency: agency,
			email: email,
			password: password,
			role: role,

			phone: phone,
			city: city,
			site: site,
			state: state,
			country: country,
			company: company,
			description: description,

			jobTitle: jobTitle,
			gender: gender,
			facebookUrl: facebookUrl,
			twitterUrl: twitterUrl,
			// userShow: userShow,

			blockedByEmail: blockedByEmail,
			blockedByIpAddress: blockedByIpAddress,

			ip: self.state.user && self.state.user.ip ? self.state.user.ip : '',

			moderatorId: moderatorId,
			moderatorFirstName: moderatorFirstName,
			moderatorLastName: moderatorLastName,

			action: 'set'
		};

		const encodedForm = Object.keys(formData).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
		}).join('&');

		fetch('/api/v1/users', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: encodedForm
		}).then(async response => {

			console.log(response);

			if (response.status === 200) {

				let updatedUser = await response.json();

				setTimeout(function () {
					window.location.href = '/admin/users/' + self.props.session.user.id;
				}, 500);

			}
			else {

				// self.setState({
				// 	user: {}
				// });

				alert('We have technical difficulties! Please try later.');

				setTimeout(function () {
					window.location.href = '/admin/users';
				}, 300);

			}
			//return await res.json();
			// let response = await res.json();
			//
			// if (response.status === 'database_error') {
			// 	console.log('database_error');
			// }
			// else if (response.status === 'item_set') {
			// 	console.log('item_updated');
			// }
			// else {
			// 	console.log('unknown_status');
			// }
			//
			// setTimeout(function () {
			// 	window.location.href = '/admin/users/' + self.props.query._id;
			// }, 500);

		});

	}

	async addUser(e) {
		e.preventDefault();

		if (!isValidEmail($('#userEmail').val())) {
			alert('Please insert valid e-mail!');
			return false;
		}

		let self = this;

		let firstName = $('#userFirstName').val();
		let lastName = $('#userLastName').val();
		let agency = $('#userAgency').val();
		let email = $('#userEmail').val();
		let password = $('#userPassword').val();
		let role = $('#userRole').val();

		let phone = $('#userPhone').val();
		let city = $('#userCity').val();
		let site = $('#userSite').val();
		let state = $('#userState').val();
		let country = $('#userCountry').val();
		let company = $('#userCompany').val();
		let description = $('#userDescription').val();

		let jobTitle = $('#userJobTitle').val();
		let gender = $('#userGender').val();
		let facebookUrl = $('#userFacebookUrl').val();
		let twitterUrl = $('#userTwitterUrl').val();
		// let userShow = $('#userBlockByEmail').is(':checked');

		let blockedByEmail = $('#userBlockByEmail').is(':checked');
		let blockedByIpAddress = $('#userBlockByIpAddress').is(':checked');


		const formData = {
			_csrf: await NextAuth.csrfToken(),
			firstName: firstName,
			lastName: lastName,
			agency: agency,
			email: email,
			password: password,
			role: role,
			phone: phone,
			city: city,
			site: site,
			state: state,
			country: country,
			company: company,
			description: description,
			jobTitle: jobTitle,
			gender: gender,
			facebookUrl: facebookUrl,
			twitterUrl: twitterUrl,
			// userShow: userShow,
			blockedByEmail: blockedByEmail,
			blockedByIpAddress: blockedByIpAddress,
			// ip: this.state.ip ? this.state.ip : "",
			action: 'add',
		};

		const encodedForm = Object.keys(formData).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
		}).join('&');

		fetch('/api/v1/users', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: encodedForm
		}).then(async response => {

			if (response.status === 200) {

				let newUser = await response.json();

				setTimeout(function () {
					window.location.href = '/admin/users/' + newUser._id;
				}, 500);

			}
			else {

				// self.setState({
				// 	user: {}
				// });

				alert('We have technical difficulties! Please try later.');

			}

		});

	}

	userBlockByEmailHandler = () => {
		this.setState({ userBlockByEmail: !this.state.userBlockByEmail });
	}

	userBlockByIpAddressHandler = () => {
		this.setState({ userBlockByIpAddress: !this.state.userBlockByIpAddress });
	}

	// userShowHandler = () => {
	// 	this.setState({ userShow: !this.state.userShow });
	// }

	//USER POSTS CONTROLS
	async deletePostHandler(_id, uri) {
		const formData = {
			_csrf: this.props.session.csrfToken,
			_id: _id,
			uri: uri,
			action: "remove"
		};

		const encodedForm = await encodeForm(formData);

		let posts = await fetch(`${siteUrl}/api/v1/posts`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: encodedForm
		}).then(async res => {

			let response = await res.json();
			console.log(response);

			if (response.status === 'item_deleted') {
				console.log("removed");
				window.location.reload();
				// window.location.href = '/admin/posts';
			}
		});
	}

	showPostControl() {
		if (this.state.postSliceControl === 60) {
			this.setState({ postSliceControl: 999999 });
			console.log(this.state.postSliceControl);
		}
		else {
			this.setState({ postSliceControl: 60 });
			console.log(this.state.postSliceControl);
		}
	}

	//END OF USER POSTS CONTROLS

	//SELECT CONVERSATION ROOM HANDLERS
	// conversationsRoomsHandleChange(selectedConversationRoom) {
	// 	this.setState({selectedConversationRoom});
	// 	console.log("Selected Room: ", this.state.selectedConversationRoom);
	// }

	render() {
		// let user = this.state.user ? this.state.user : null;
		// console.log('*************');
		// console.log(user);
		//let email = this.state.user ? this.state.user.email : '';

		// console.log(this.state.logs);

		let firstName = this.state.user && this.state.user.firstName ? this.state.user.firstName : '';
		let lastName = this.state.user && this.state.user.lastName ? this.state.user.lastName : '';
		let agency = this.state.user && this.state.user.agency ? this.state.user.agency : '';
		let email = this.state.user && this.state.user.email ? this.state.user.email : '';
		// let password = this.state.user && this.state.user.password ? this.state.user.email : '';
		let role = this.state.user && this.state.user.role ? this.state.user.role : 'user';

		let phone = this.state.user && this.state.user.phone ? this.state.user.phone : '';
		let site = this.state.user && this.state.user.site ? this.state.user.site : '';
		let city = this.state.user && this.state.user.city ? this.state.user.city : '';
		let state = this.state.user && this.state.user.state ? this.state.user.state : '';
		let country = this.state.user && this.state.user.country ? this.state.user.country : '';
		let company = this.state.user && this.state.user.company ? this.state.user.company : '';
		let description = this.state.user && this.state.user.description ? this.state.user.description : '';

		let jobTitle = this.state.user && this.state.user.jobTitle ? this.state.user.jobTitle : '';
		let gender = this.state.user && this.state.user.gender ? this.state.user.gender : '';
		let facebookUrl = this.state.user && this.state.user.facebookUrl ? this.state.user.facebookUrl : '';
		let twitterUrl = this.state.user && this.state.user.twitterUrl ? this.state.user.twitterUrl : '';
		let ipAddress = this.state.user && this.state.user.ip ? '(' + this.state.user.ip + ')' : '';

		let blockedByEmail = this.state.user && this.state.user.blockedByEmail ? this.state.user.blockedByEmail : false;
		let blockedByIpAddress = this.state.user && this.state.user.blockedByIpAddress ? this.state.user.blockedByIpAddress : false;

		// Build location string
		let locationArray = [];
		let location = '';

		if (city.trim().length > 0) { locationArray.push(city); }
		if (state.trim().length > 0) { locationArray.push(state); }
		if (country.trim().length > 0) { locationArray.push(country); }

		location = locationArray.join(', ');

		//Posts
		const posts = this.state.posts ? this.state.posts : [];

		// let location =

		// Check if new user
		let newUser = !email.length;

		//filter conversationsRooms select
		// const conversationsRooms = this.props.conversationsRooms ? this.props.conversationsRooms : "";
		const selectedConversationRoom = this.state.selectedConversationRoom ? this.state.selectedConversationRoom : [];

		return (
			<AdminLayout {...this.props}>

				<div className="row profile-wrapper">
					<div className="col-xs-12 col-md-3 col-lg-2 profile-left">
						<div className="profile-left-heading">
							<ul className="panel-options">
								<li><a><i className="glyphicon glyphicon-option-vertical"></i></a></li>
							</ul>
							<a href="" className="profile-photo"><img className="img-circle img-responsive" src="../../../static/images/common/photos/profilepic.png" alt="" /></a>
							<h2 className="profile-name" style={{ margin: '10px 0 6px 0' }}>{firstName} {lastName}</h2>
							<h4 className="profile-designation">{email}</h4>
							<h4 className="profile-designation">{agency}</h4>


							<ul className="list-group">
								<li className="list-group-item">Posts <a href="#">1,333</a></li>
								{/*<li className="list-group-item">Following <a href="people-directory.html">541</a></li>*/}
								{/*<li className="list-group-item">Followers <a href="people-directory-grid.html">32,434</a></li>*/}
							</ul>

							{/*<button className="btn btn-danger btn-quirk btn-block profile-btn-follow">Follow</button>*/}

						</div>
						<div className="profile-left-body">
							<h4 className="panel-title">About Me</h4>
							{description}
							{/*<p>Social media ninja. Pop culture enthusiast. Zombie fanatic. General tv evangelist.</p>*/}
							{/*<p>Alcohol fanatic. Explorer. Passionate reader. Entrepreneur. Lifelong coffee advocate. Avid bacon aficionado. Travel evangelist.</p>*/}

							<hr className="fadeout" />

							<h4 className="panel-title">Location</h4>
							<p><i className="glyphicon glyphicon-map-marker mr5"></i> {location}</p>

							<hr className="fadeout" />

							<h4 className="panel-title">Company</h4>
							<p><i className="glyphicon glyphicon-briefcase mr5"></i> {company}</p>

							<hr className="fadeout" />

							<h4 className="panel-title">Contacts</h4>
							<p><i className="glyphicon glyphicon-phone mr5"></i> {phone}</p>

							<hr className="fadeout" />

							<h4 className="panel-title">Social</h4>
							<ul className="list-inline profile-social">
								<li><a href=""><i className="fa fa-facebook-official"></i></a></li>
								<li><a href=""><i className="fa fa-twitter"></i></a></li>
								<li><a href=""><i className="fa fa-dribbble"></i></a></li>
								<li><a href=""><i className="fa fa-linkedin"></i></a></li>
							</ul>

						</div>
					</div>
					<div className="col-md-6 col-lg-8 profile-right">
						<div className="profile-right-body">


							{newUser ?
								<ul className="nav nav-tabs nav-justified nav-line">
									<li className="active" style={{ width: '1%' }}>
										<a href="#edit_profile" data-toggle="tab">
											<strong>New User</strong>
										</a>
									</li>
								</ul>
								:
								<ul className="nav nav-tabs nav-justified nav-line">
									<li className="active">
										<a href="#edit_profile" data-toggle="tab">
											<strong>Edit Profile</strong>
										</a>
									</li>
									<li><a href="#activity" data-toggle="tab"><strong>Activity</strong></a></li>
									<li><a href="#logs" data-toggle="tab"><strong>Logs</strong></a></li>
									<li><a href="#posts" data-toggle="tab"><strong>Posts</strong></a></li>
									<li><a href="#messages" data-toggle="tab"><strong>Messages</strong></a></li>
									{/*<li><a href="#places" data-toggle="tab"><strong>Places</strong></a></li>*/}
								</ul>
							}


							<div className="tab-content">

								<div className="tab-pane active" id="edit_profile">

									{newUser ?
										<h4 className="panel-title">New User</h4>
										:
										<h4 className="panel-title">Edit Profile</h4>
									}

									<hr style={{ visibility: 'hidden' }} />

									<form id="basicForm" action="form-validation.html" className="form-horizontal" noValidate="novalidate">

										<div className="form-group">
											<label className="col-sm-3 control-label">First Name</label>
											<div className="col-sm-8">
												<input id="userFirstName" defaultValue={firstName} type="text" name="name" className="form-control uni-input" placeholder="First Name" required=""
													aria-required="true" aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Last Name</label>
											<div className="col-sm-8">
												<input id="userLastName" defaultValue={lastName} type="text" name="name" className="form-control uni-input" placeholder="Last Name" required=""
													aria-required="true" aria-invalid="true" />
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Agency</label>
											<div className="col-sm-8">
												<input id="userAgency" defaultValue={agency} type="text" name="name" className="form-control uni-input" placeholder="Agency name" required=""
													aria-required="true" aria-invalid="true" />
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Email</label>
											<div className="col-sm-8">
												<input id="userEmail" defaultValue={email} type="email" name="email" className="form-control uni-input" placeholder="E-mail" required=""
													aria-required="true" />
												{/*<label id="email-error" className="error" htmlFor="email">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Password</label>
											<div className="col-sm-8">
												<input id="userPassword" defaultValue="" type="password" name="password" className="form-control uni-input" placeholder="Password" required=""
													aria-required="true" />
												{/*<label id="email-error" className="error" htmlFor="email">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Role</label>
											<div className="col-sm-8">

												<div className="form-group">
													<select id="userRole" defaultValue={role} className="form-control" style={{ width: '100%', marginTop: '-14px' }} data-placeholder="User Role...">
														<option value="admin">Admin</option>
														<option value="user">User</option>
														<option value="agency">Agency</option>
													</select>
												</div>

											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Phone</label>
											<div className="col-sm-8">
												<input id="userPhone" defaultValue={phone} type="text" name="name" className="form-control uni-input" placeholder="Phone" required="" aria-required="true"
													aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Site</label>
											<div className="col-sm-8">
												<input id="userSite" defaultValue={site} type="text" name="name" className="form-control uni-input" placeholder="Site" required="" aria-required="true"
													aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">City</label>
											<div className="col-sm-8">
												<input id="userCity" defaultValue={city} type="text" name="name" className="form-control uni-input" placeholder="City" required="" aria-required="true"
													aria-invalid="true" />
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">State</label>
											<div className="col-sm-8">
												<input id="userState" defaultValue={state} type="text" name="name" className="form-control uni-input" placeholder="State" required="" aria-required="true"
													aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Country</label>
											<div className="col-sm-8">
												<input id="userCountry" defaultValue={country} type="text" name="name" className="form-control uni-input" placeholder="Country" required=""
													aria-required="true" aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Company</label>
											<div className="col-sm-8">
												<input id="userCompany" defaultValue={company} type="text" name="name" className="form-control uni-input" placeholder="Company" required=""
													aria-required="true" aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>


										<div className="form-group">
											<label className="col-sm-3 control-label">Description</label>
											<div className="col-sm-8">

												<textarea id="userDescription" defaultValue={description} className="form-control" rows="3" placeholder="About me" data-autosize-on="true"
													style={{ overflow: 'hidden', overflowWrap: 'break-word', resize: 'horizontal', height: '100px' }}></textarea>

											</div>
										</div>


										<div className="form-group">
											<label className="col-sm-3 control-label">Job Title</label>
											<div className="col-sm-8">
												<input id="userJobTitle" defaultValue={jobTitle} type="text" name="name" className="form-control uni-input" placeholder="Job Title" required=""
													aria-required="true" aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Gender</label>
											<div className="col-sm-8">

												<div className="form-group">
													<select id="userGender" defaultValue={gender} className="form-control" style={{ width: '100%', marginTop: '-14px' }} data-placeholder="Gender...">
														<option value="">Choose gender</option>
														<option value="male">Male</option>
														<option value="female">Female</option>
													</select>
												</div>

											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Facebook URL</label>
											<div className="col-sm-8">
												<input id="userFacebookUrl" defaultValue={facebookUrl} type="text" name="name" className="form-control uni-input" placeholder="Facebook URL" required=""
													aria-required="true" aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-3 control-label">Twitter URL</label>
											<div className="col-sm-8">
												<input id="userTwitterUrl" defaultValue={twitterUrl} type="text" name="name" className="form-control uni-input" placeholder="Twitter URL" required=""
													aria-required="true" aria-invalid="true" />
												{/*<label id="name-error" className="error" htmlFor="name">This field is required.</label>*/}
											</div>
										</div>


										{/* <div className="form-group">
											<label className="col-sm-3 control-label">Show in user list</label>
											<div className="col-sm-8" style={{ marginTop: '10px' }}>

												<label className="ckbox ckbox-success">
													<input id="userShow" type="checkbox" checked={this.state.userShow} onChange={this.userShowHandler} /><span>Check for user role only</span>
												</label>

											</div>
										</div> */}


										<div className="form-group">
											<label className="col-sm-3 control-label">Block User</label>
											<div className="col-sm-8" style={{ marginTop: '10px' }}>

												<label className="ckbox ckbox-success">
													<input id="userBlockByEmail" type="checkbox" checked={this.state.userBlockByEmail} onChange={this.userBlockByEmailHandler} /><span>By E-mail</span>
												</label>

												<label className="ckbox ckbox-success">
													<input id="userBlockByIpAddress" type="checkbox" checked={this.state.userBlockByIpAddress} onChange={this.userBlockByIpAddressHandler} /><span>By IP address {ipAddress}</span>
												</label>

											</div>
										</div>


										<hr style={{ visibility: 'hidden' }} />


										<hr style={{ visibility: 'hidden' }} />


										<div className="row">
											<div className="col-sm-9 col-sm-offset-3">

												{newUser ?
													<button className="btn btn-success btn-quirk btn-wide mr5" onClick={this.addUser}>Add New User</button>
													:
													<button className="btn btn-success btn-quirk btn-wide mr5" onClick={this.updateProfile}>Update Profile</button>
												}

												{/*<button type="reset" className="btn btn-quirk btn-wide btn-default">Reset</button>*/}
											</div>
										</div>

									</form>


								</div>


								{/* ACTIVITY TAB */}
								<div className="tab-pane" id="activity" style={{ visibility: newUser ? 'hidden' : 'visible' }}>

									<div className="panel panel-post-item">
										<div className="panel-heading">
											<div className="media">
												<div className="media-left">
													<a href="#">
														<img alt="" src="../../../static/images/common/photos/profilepic.png" className="media-object img-circle" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading">Barbara Balashova</h4>
													<p className="media-usermeta">
														<span className="media-time">July 06, 2015 8:30am</span>
													</p>
												</div>
											</div>

										</div>

										<div className="panel-body">
											<p>As a web designer it’s your job to help users find their way to what they’re looking for. It can be easy to put the needs of your users to one side, but
												knowing your users, understanding their roles, goals, motives and behavior will confirm how you structure your navigation model. <a
													href="http://goo.gl/QTccRE" target="_blank">#information</a> <a href="http://goo.gl/QTccRE" target="_blank">#design</a></p>
											<p>Source: <a href="http://goo.gl/QTccRE" target="_blank">http://goo.gl/QTccRE</a></p>

										</div>
										<div className="panel-footer">
											<ul className="list-inline">
												<li><a href=""><i className="glyphicon glyphicon-heart"></i> Like</a></li>
												<li><a><i className="glyphicon glyphicon-comment"></i> Comments (0)</a></li>
												<li className="pull-right">5 liked this</li>
											</ul>
										</div>
										<div className="form-group">
											<input type="text" className="form-control" placeholder="Write some comments" />
										</div>
									</div>


									<div className="panel panel-post-item">
										<div className="panel-heading">
											<div className="media">
												<div className="media-left">
													<a href="#">
														<img alt="" src="../../../static/images/common/photos/profilepic.png" className="media-object img-circle" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading">Barbara Balashova</h4>
													<p className="media-usermeta">
														<span className="media-time">July 05, 2015 11:33pm</span>
													</p>
												</div>
											</div>

										</div>

										<div className="panel-body">
											<p>Improving the trustworthiness of a website can help improve its conversion rate, whether we’re talking about buying a product, downloading an ebook or
												subscribing to a newsletter. <a href="">#trust</a> <a href="">#security</a></p>
											<p>Source: <a href="http://goo.gl/LxDM8K" target="_blank">http://goo.gl/LxDM8K</a></p>
										</div>
										<div className="panel-footer">
											<ul className="list-inline">
												<li><a href=""><i className="glyphicon glyphicon-heart"></i> Like</a></li>
												<li><a><i className="glyphicon glyphicon-comment"></i> Comments (0)</a></li>
												<li className="pull-right">0 liked this</li>
											</ul>
										</div>
										<div className="form-group">
											<input type="text" className="form-control" placeholder="Write some comments" />
										</div>
									</div>


									<div className="panel panel-post-item">
										<div className="panel-heading">
											<div className="media">
												<div className="media-left">
													<a href="#">
														<img alt="" src="../../../static/images/common/photos/profilepic.png" className="media-object img-circle" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading">Barbara Balashova <span>scheduled a meeting with</span> Elen Adarna</h4>
													<p className="media-usermeta">
														<span className="media-time">July 06, 2015 8:30am</span>
													</p>
												</div>
											</div>

										</div>

										<div className="panel-body nopaddingbottom">
											<div className="media">
												<div className="media-left">
													<a href="#">
														<img className="media-object width80" src="../../../static/images/common/photos/image.png" alt="" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading"><a href="">Telling Your Life Story: Memoir Workshop Series</a></h4>
													<p>Monday, July 06, 2015 - Tuesday, July 07, 2015 <br />
														SF Bay Theater <br />
														San Francisco, California, USA
													</p>
												</div>
											</div>
										</div>

									</div>


									<div className="panel panel-post-item">
										<div className="panel-heading">
											<div className="media">
												<div className="media-left">
													<a href="#">
														<img alt="" src="../../../static/images/common/photos/profilepic.png" className="media-object img-circle" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading">Barbara Balashova <span>added new article from category</span> UI Workflow</h4>
													<p className="media-usermeta">
														<span className="media-time">July 06, 2015 8:30am</span>
													</p>
												</div>
											</div>

										</div>

										<div className="panel-body nopaddingbottom">
											<div className="media">
												<div className="media-left">
													<a href="#">
														<img className="media-object width80" src="../../../static/images/common/photos/image.png" alt="" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading"><a href="">Tips for Designing in the Browser</a></h4>
													<p>It's often thought that designing in the browser is a modern approach to web design. In fact, before the advent of tools such as Photoshop, there was
														little other choice --- <a href="http://goo.gl/SGfFJd" target="_blank">http://goo.gl/SGfFJd</a></p>
												</div>
											</div>
										</div>

									</div>


								</div>


								<div className="tab-pane" id="logs">


									{this.state.logs.map((log, index) => {

										let logDate = log.createdAt ? moment(log.createdAt).utc().format('DD.MM.YYYY HH:mm') : '';
										let subTitle = '';
										subTitle = log.action === 'update' ? 'Changed by: ' : '';
										subTitle = log.action === 'sign_in' ? 'Sign in: ' : '';

										return (

											<div className="panel panel-post-item" key={index}>

												<div className="panel-heading">
													<div className="media">
														{/*<div className="media-left">*/}
														{/*<a href="#">*/}
														{/*<img alt="" src="../../../static/images/common/photos/profilepic.png" className="media-object img-circle"/>*/}
														{/*</a>*/}
														{/*</div>*/}
														<div className="media-body">
															<h4 className="media-heading">{subTitle}{log.moderator.firstName} {log.moderator.lastName}</h4>
															<p className="media-usermeta">
																<span className="media-time">{logDate}</span>
															</p>
														</div>
													</div>
												</div>

												{log.changes.length > 0 ?
													(
														<div className="panel-body">
															<p>Data changed:</p>
															{log.changes.map((change, changeIndex) => {
																let previousValue = change.previousValue === true ? 'true' : change.previousValue;
																let currentValue = change.currentValue === false ? 'false' : change.currentValue;

																return (
																	<div style={{ width: '100%' }} key={changeIndex}>
																		<span style={{ fontWeight: 'bold' }}>{change.field}</span> from <span style={{ fontWeight: 'bold' }}>{previousValue}</span> to <span
																			style={{ fontWeight: 'bold' }}>{currentValue}</span></div>
																);
															})}
														</div>
													)
													:
													null
												}

											</div>
										);

									})}

								</div>


								{/* USER POSTS */}
								<div className="tab-pane" id="posts" style={{ visibility: newUser ? 'hidden' : 'visible' }}>

									{posts.slice((this.state.posts ? (this.state.posts.length - 5) : ''), (this.state.posts ? this.state.posts.length : '')).map((post, index) => {
										const title = post.title ? post.title : '';
										const createdAt = post.createdAt ? post.createdAt : '';
										const content = post.content ? post.content.slice(0, this.state.postSliceControl) : "";
										const categories = post.categories ? post.categories : "Uncategories";
										const postUrl = "/posts/" + post._id;
										const editUrl = "/admin/posts/" + post._id;

										return (
											<div className="panel panel-post-item" key={index}>
												<div className="panel-heading">
													<div className="media">
														<div className="media-left">
															<a href="#">
																<img alt="" src="../../../static/images/common/photos/profilepic.png" className="media-object img-circle" />
															</a>
														</div>
														<div className="media-body">
															<h4 className="media-heading">{firstName} {lastName}</h4>
															<p className="media-usermeta">
																<span className="media-time">{createdAt}</span>
															</p>
														</div>
													</div>
												</div>


												<div className="panel-body" style={{ border: "1px solid #ccc", padding: "20px" }}>


													<h3>{title.length > 60 ? `${title.toUpperCase().slice(0, 60)}...` : title.toUpperCase()}</h3>

													<OnlyOnClient
														placeholder={
															<div style={{ fontSize: 14 }}></div>
														}
														html={content && content.length > 150 ? `${content.slice(0, 150)}...` : content} // this won't re-render
													/>
													<p style={{ fontSize: "11px" }}>Category: {categories}</p>

													{/* POST CONTROLS */}
													<div style={{ float: 'right' }} className="text-info">

														{/* Show post */}
														<Link href={postUrl}>
															<i className="glyphicon glyphicon-eye-open controls" />
														</Link>

														{/* Edit post */}
														<Link href={editUrl}>
															<i className="glyphicon glyphicon-edit controls" />
														</Link>

														{/* Delete post */}
														<i className="glyphicon glyphicon-trash controls" onClick={() => this.deletePostHandler(page._id, page.uri)} />


													</div>

												</div>

											</div>

										);
									})}

								</div>

								{/* ----------END USER POSTS---------------- */}


								{/* USER MESSAGES */}
								<div className="tab-pane" id="messages" style={{ visibility: newUser ? 'hidden' : 'visible' }}>

									<h4 className="panel-title">Messages</h4>

									{/* SELECT CONVERATION ROOM */}
									{/*<Select*/}
									{/*mode="default"*/}
									{/*placeholder="Select Room"*/}
									{/*value={selectedConversationRoom}*/}
									{/*onChange={this.conversationsRoomsHandleChange}*/}
									{/*style={{width: '20%', height: 'auto', margin: "20px 0px"}}*/}
									{/*>*/}
									{/*{conversationsRooms.map(item => (*/}
									{/*<Select.Option key={item._id} value={item._id}>*/}
									{/*{item.conversationRoomTitle}*/}
									{/*</Select.Option>*/}
									{/*))}*/}
									{/*</Select>*/}

									<hr style={{ visibility: 'hidden' }} />

									<div id="chat-container">
										<div className="col-md-12 conversation-container" id="conversation-container">
											<div className="col-md-12">
												<div className="col-md-6 conversation-box other-conversation box-shadow">
													<div className="conversation-info"><span className="bold">Milan Nikolić </span><span className="small">16.02.2019 13:09h</span></div>
													<div className="margin-left-5">Hello my friend
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="col-md-6 conversation-box user-conversation pull-right box-shadow">
													<div className="conversation-info"><span className="bold">Denis Stupar </span><span className="small">16.02.2019 13:10h</span><span
														style={{ float: 'right', cursor: 'pointer' }}><i className="fa fa-lg fa-times-circle chat-remove-icon" title="Remove message"></i></span></div>
													<div className="margin-left-5">Hi man!</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="col-md-6 conversation-box user-conversation pull-right box-shadow">
													<div className="conversation-info"><span className="bold">Denis Stupar </span><span className="small">28.02.2019 14:52h</span><span
														style={{ float: 'right', cursor: 'pointer' }}><i className="fa fa-lg fa-times-circle chat-remove-icon" title="Remove message"></i></span></div>
													<div className="margin-left-5">hey</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="col-md-6 conversation-box user-conversation pull-right box-shadow">
													<div className="conversation-info"><span className="bold">Denis Stupar </span><span className="small">28.02.2019 15:41h</span><span
														style={{ float: 'right', cursor: 'pointer' }}><i className="fa fa-lg fa-times-circle chat-remove-icon" title="Remove message"></i></span></div>
													<div className="margin-left-5">Call me!</div>
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="col-md-12 comment-box">
												<textarea
													placeholder="Write message"
													value={this.state.messageContent}
													onChange={(event) => this.setState({ messageContent: event.target.value })}
												></textarea>
												<div className="pull-right">
													<button className="btn btn-success btn-quirk btn-wide mr5"
														onClick={this.sendMessage}>Send message
													</button>
												</div>
											</div>
										</div>
									</div>


								</div>
								{/* ----------END MESSAGES----------------- */}


							</div>
						</div>

					</div>
					<div className="col-md-3 col-lg-2 profile-sidebar">
						<div className="row">
							<div className="col-sm-6 col-md-12">
								<div className="panel">
									<div className="panel-heading">
										<h4 className="panel-title">People You May Know</h4>
									</div>
									<div className="panel-body">
										<ul className="media-list user-list">
											<li className="media">
												<div className="media-left">
													<a href="#">
														<img className="media-object img-circle" src="../../../static/images/common/photos/user9.png" alt="" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading"><a href="">Ashley T. Brewington</a></h4>
													<span>5,323</span> Followers
												</div>
											</li>
											<li className="media">
												<div className="media-left">
													<a href="#">
														<img className="media-object img-circle" src="../../../static/images/common/photos/user10.png" alt="" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading"><a href="">Roberta F. Horn</a></h4>
													<span>4,100</span> Followers
												</div>
											</li>
											<li className="media">
												<div className="media-left">
													<a href="#">
														<img className="media-object img-circle" src="../../../static/images/common/photos/user3.png" alt="" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading"><a href="">Jennie S. Gray</a></h4>
													<span>3,508</span> Followers
												</div>
											</li>
											<li className="media">
												<div className="media-left">
													<a href="#">
														<img className="media-object img-circle" src="../../../static/images/common/photos/user4.png" alt="" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading"><a href="">Alia J. Locher</a></h4>
													<span>3,508</span> Followers
												</div>
											</li>
											<li className="media">
												<div className="media-left">
													<a href="#">
														<img className="media-object img-circle" src="../../../static/images/common/photos/user6.png" alt="" />
													</a>
												</div>
												<div className="media-body">
													<h4 className="media-heading"><a href="">Jamie W. Bradford</a></h4>
													<span>2,001</span> Followers
												</div>
											</li>
										</ul>
									</div>
								</div>

							</div>


							{/*<div className="col-sm-6 col-md-12">*/}
							{/*<div className="panel">*/}
							{/*<div className="panel-heading">*/}
							{/*<h4 className="panel-title">Following Activity</h4>*/}
							{/*</div>*/}
							{/*<div className="panel-body">*/}
							{/*<ul className="media-list user-list">*/}
							{/*<li className="media">*/}
							{/*<div className="media-left">*/}
							{/*<a href="#">*/}
							{/*<img className="media-object img-circle" src="../../../static/images/common/photos/user2.png" alt=""/>*/}
							{/*</a>*/}
							{/*</div>*/}
							{/*<div className="media-body">*/}
							{/*<h4 className="media-heading nomargin"><a href="">Floyd M. Romero</a></h4>*/}
							{/*is now following <a href="">Christina R. Hill</a>*/}
							{/*<small className="date"><i className="glyphicon glyphicon-time"></i> Just now</small>*/}
							{/*</div>*/}
							{/*</li>*/}
							{/*<li className="media">*/}
							{/*<div className="media-left">*/}
							{/*<a href="#">*/}
							{/*<img className="media-object img-circle" src="../../../static/images/common/photos/user10.png" alt=""/>*/}
							{/*</a>*/}
							{/*</div>*/}
							{/*<div className="media-body">*/}
							{/*<h4 className="media-heading nomargin"><a href="">Roberta F. Horn</a></h4>*/}
							{/*commented on <a href="">HTML5 Tutorial</a>*/}
							{/*<small className="date"><i className="glyphicon glyphicon-time"></i> Yesterday</small>*/}
							{/*</div>*/}
							{/*</li>*/}
							{/*<li className="media">*/}
							{/*<div className="media-left">*/}
							{/*<a href="#">*/}
							{/*<img className="media-object img-circle" src="../../../static/images/common/photos/user3.png" alt=""/>*/}
							{/*</a>*/}
							{/*</div>*/}
							{/*<div className="media-body">*/}
							{/*<h4 className="media-heading nomargin"><a href="">Jennie S. Gray</a></h4>*/}
							{/*posted a video on <a href="">The Discovery</a>*/}
							{/*<small className="date"><i className="glyphicon glyphicon-time"></i> June 25, 2015</small>*/}
							{/*</div>*/}
							{/*</li>*/}
							{/*<li className="media">*/}
							{/*<div className="media-left">*/}
							{/*<a href="#">*/}
							{/*<img className="media-object img-circle" src="../../../static/images/common/photos/user5.png" alt=""/>*/}
							{/*</a>*/}
							{/*</div>*/}
							{/*<div className="media-body">*/}
							{/*<h4 className="media-heading nomargin"><a href="">Nicholas T. Hinkle</a></h4>*/}
							{/*liked your video on <a href="">The Discovery</a>*/}
							{/*<small className="date"><i className="glyphicon glyphicon-time"></i> June 24, 2015</small>*/}
							{/*</div>*/}
							{/*</li>*/}
							{/*<li className="media">*/}
							{/*<div className="media-left">*/}
							{/*<a href="#">*/}
							{/*<img className="media-object img-circle" src="../../../static/images/common/photos/user2.png" alt=""/>*/}
							{/*</a>*/}
							{/*</div>*/}
							{/*<div className="media-body">*/}
							{/*<h4 className="media-heading nomargin"><a href="">Floyd M. Romero</a></h4>*/}
							{/*liked your photo on <a href="">My Life Adventure</a>*/}
							{/*<small className="date"><i className="glyphicon glyphicon-time"></i> June 24, 2015</small>*/}
							{/*</div>*/}
							{/*</li>*/}
							{/*</ul>*/}
							{/*</div>*/}
							{/*</div>*/}

							{/*</div>*/}


						</div>


					</div>
				</div>


			</AdminLayout>
		);
	}
}

export default NewPage;