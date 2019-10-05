import React, { Component } from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import AdminLayout from './../../../layouts/AdminLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import Router from 'next/router';
import { Select } from 'antd';


const Option = Select.Option;

class Users extends React.Component {

	static async getInitialProps({ req, res, query }) {

		let session = await NextAuth.init({ req });

		if (res && session && !session.user) {
			res.redirect('/auth/sign-in');
		}

		let usersResponse = await fetch(`${siteUrl}/api/v1/users?${noCache}`);
		let users = await usersResponse.json();
		users = users.error ? [] : users;

		return {
			users: users,
			session: session,
			linkedAccounts: await NextAuth.linked({ req }),
			providers: await NextAuth.providers({ req })
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			users: this.props.users,
			filteredUsers: this.props.users,
			filterFirstName: '',
			filterCountry: '',
			filterCity: '',
			filterAge: '',
			filterAdds: '',
			filterRevenue: '',
			filterBlockedValue: '',
			filterMailValue: '',
			filterGender: '',

		};

		this.addUser = this.addUser.bind(this);


	}

	//Filter handlers

	handleChangeGender = (value) => {
		this.setState({ filterGender: value });
	}

	handleChangeBlocked = (value) => {
		this.setState({ filterBlockedValue: value });
	}

	handleChangeMail = (value) => {
		this.setState({ filterMailValue: value });
	}


	addUser(e) {
		e.preventDefault();

		Router.push('/admin/users/new');
	}

	async componentDidMount() {

	}


	render() {


		let usersCount = this.state.users ? this.state.users.length : 0;

		return (
			<div style={{ position: 'relative' }}>

				<AdminLayout {...this.props}>

					{/*{this.state.users.length === 0 ?*/}
					{/*<Loader />*/}
					{/*:*/}
					{/*null*/}
					{/*}*/}

					<ol className="breadcrumb breadcrumb-quirk">
						<li><a href="index.html"><i className="fa fa-home mr5"></i> Home</a></li>
						{/*<li><a href="buttons.html">Pages</a></li>*/}
						<li className="active">Users</li>
					</ol>

					<div className="row">
						<div className="col-sm-8 col-md-9 col-lg-10 people-list">

							<div className="people-options clearfix">
								<div className="btn-toolbar pull-left">
									{/*<button type="button" className="btn btn-success btn-quirk">Add user</button>*/}
									{/*<button type="button" className="btn btn-success btn-quirk">Add to Group</button>*/}
									{/*<button type="button" className="btn btn-default"><i className="fa fa-trash"></i></button>*/}
								</div>

								<div className="btn-toolbar pull-left">
									<button type="button" className="btn btn-success btn-quirk" onClick={this.addUser}>Add User</button>
								</div>

								{/*<div className="btn-group pull-right people-pager">*/}
								{/*<a href="people-directory-grid.html" className="btn btn-default"><i className="fa fa-th"></i></a>*/}
								{/*<button type="button" className="btn btn-default-active"><i className="fa fa-th-list"></i></button>*/}
								{/*</div>*/}

								{/* <div className="btn-group pull-right people-pager">
									<button type="button" className="btn btn-default"><i className="fa fa-chevron-left"></i></button>
									<button type="button" className="btn btn-default"><i className="fa fa-chevron-right"></i></button>
								</div> */}

								<span className="people-count pull-right">Showing <strong>1-{usersCount}</strong> of <strong>{usersCount}</strong> users</span>
							</div>

							{this.props.users.filter((item) =>
								((item && item.firstName ? item.firstName.toUpperCase().includes(this.state.filterFirstName.toUpperCase()) : '')
									|| //Filter by name 
									(item && item.lastName ? item.lastName.toUpperCase().includes(this.state.filterFirstName.toUpperCase()) : ''))
								&&
								(item && item.country ? item.country.toUpperCase().includes(this.state.filterCountry.toUpperCase()) : '') //Filter by Country
								&&
								(item && item.city ? item.city.toUpperCase().includes(this.state.filterCity.toUpperCase()) : '')		//Filter by City
								// &&
								// (item && item.gender ? (this.state.filterGender === "" ? (item.gender.includes("")) : item.gender === this.state.filterGender) : '')
								// &&
								// (item ? (this.state.filterMailValue === '' ? true : (this.state.filterMailValue === 'confirmed' ? item.emailVerified === true : item.emailVerified === false)) : '')
								// &&
								// (item ? (this.state.filterBlockedValue === '' ? true : (this.state.filterBlockedValue === 'mail' ? true : item.blockedByIpAddress === true)) : '')   //blocked Ip filter
								// &&
								// (item ? (this.state.filterBlockedValue === '' ? true : (this.state.filterBlockedValue === 'ip' ? true : item.blockedByEmail === true)) : '')		//blocked Email filter
								// &&
								// (item && (item.role === "admin" || item.role === "user") ? true : false)		//Show user

							)
								.map((user, index) => {
									const browser = user.browser ? user.browser : 'Chrome';
									const os = user.os ? user.os : 'Windows';
									const firstName = user.firstName ? user.firstName : '';
									const lastName = user.lastName ? user.lastName : '';
									const email = user.email ? user.email : '';
									const phone = user.phone ? user.phone : '';
									const jobTitle = user.jobTitle ? user.jobTitle : '';
									const userUrl = "/admin/users/" + user._id;

									// Prepare full name
									let fullName = '';

									if (firstName.trim().length > 0 && lastName.trim().length > 0) {
										fullName = firstName + ' ' + lastName;
									}

									// Get location data
									const city = user.city ? user.city : '';
									const state = user.state ? user.state : '';
									const country = user.country ? user.country : '';

									// Build location string
									let locationArray = [];
									if (city.trim().length > 0) { locationArray.push(city); }
									if (state.trim().length > 0) { locationArray.push(state); }
									if (country.trim().length > 0) { locationArray.push(country); }
									let location = locationArray.join(', ');

									return (

										<div className="panel panel-profile list-view" key={index}>
											<div className="panel-heading">
												<div className="media">
													<div className="media-left">
														<Link href={userUrl}>
															<a href="">
																<img className="media-object img-circle" src="/static/images/common/photos/user1.png" alt="" />
															</a>
														</Link>
													</div>
													<div className="media-body">
														<h4 className="media-heading">{fullName.length > 0 ? fullName : user.email}</h4>
														<p className="media-usermeta"><i className="glyphicon glyphicon-briefcase"></i> {jobTitle}</p>
													</div>
												</div>

												<ul className="panel-options">
													<li><a className="tooltips" href="" data-toggle="tooltip" title="View Options"><i className="glyphicon glyphicon-option-vertical"></i></a></li>
												</ul>
											</div>

											<div className="panel-body people-info">
												<div className="row">
													<div className="col-sm-4">
														<div className="info-group">
															<label>Location</label>
															{location.length > 0 ? location : <span>&nbsp;</span>}
														</div>
													</div>
													<div className="col-sm-4">
														<div className="info-group">
															<label>Email</label>
															{email}
														</div>
													</div>
													<div className="col-sm-4">
														<div className="info-group">
															<label>Phone</label>
															{phone.length > 0 ? phone : <span>&nbsp;</span>}
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-sm-4">
														<div className="info-group">
															<label>Operating System</label>
															<h4>{os}</h4>
														</div>
													</div>
													<div className="col-sm-4">
														<div className="info-group">
															<label>Browser</label>
															<h4>{browser}</h4>
														</div>
													</div>
													<div className="col-sm-4">
														<div className="info-group">
															<label>Social</label>
															<div className="social-account-list">
																<i className="fa fa-facebook-official"></i>
																<i className="fa fa-twitter"></i>
																<i className="fa fa-dribbble"></i>
															</div>
														</div>
													</div>
												</div>

											</div>
										</div>

									);
								})}


						</div>

						<div className="col-sm-4 col-md-3 col-lg-2">

							<div className="panel">
								{/* HEADING */}
								<div className="panel-heading">
									<h4 className="panel-title">Filter Users</h4>
								</div>

								{/* Body */}
								<div className="panel-body">

									{/* Filter by name */}
									<div className="form-group">
										<label className="control-label center-block">Name:</label>
										<input value={this.state.filterFirstName} onChange={(event) => this.setState({ filterFirstName: event.target.value })} type="text" className="form-control" placeholder="Name" />
									</div>

									{/* Filter by country */}
									<div className="form-group">
										<label className="control-label center-block">Country:</label>
										<input value={this.state.filterCountry} onChange={(event) => this.setState({ filterCountry: event.target.value })} type="text" className="form-control" placeholder="Country" />
									</div>

									{/* Filter by city */}
									<div className="form-group">
										<label className="control-label center-block">City:</label>
										<input value={this.state.filterCity} onChange={(event) => this.setState({ filterCity: event.target.value })} type="text" className="form-control" placeholder="City" />
									</div>



									{/* Filter Mail */}
									{/* <div className="form-group">
										<label className="control-label center-block">E-Mail status:</label>
										<Select
											mode="default"
											placeholder="Email status"
											value={this.state.filterMailValue}
											onChange={this.handleChangeMail}
											style={{ width: '100%', height: 'auto' }}
											filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
										>
											<Option value="">Show All</Option>
											<Option value="confirmed">Email confirmed</Option>
											<Option value="not">Email not confirmed</Option>
										</Select>
									</div> */}


									{/* Filter Blocked */}
									{/* <div className="form-group">
										<label className="control-label center-block">Blocked Users:</label>
										<Select
											mode="default"
											placeholder="Blocked Users"
											value={this.state.filterBlockedValue}
											onChange={this.handleChangeBlocked}
											style={{ width: '100%', height: 'auto' }}
											filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
										>
											<Option value="">Show All</Option>
											<Option value="mail">Blocked E-Mail</Option>
											<Option value="ip">Blocked IP</Option>
										</Select>
									</div> */}



									{/* Filter by gender */}
									{/* <div className="form-group">
										<label className="control-label center-block">Gender:</label>
										<Select
											mode="default"
											placeholder="Select gender"
											value={this.state.filterGender}
											onChange={this.handleChangeGender}
											style={{ width: '100%', height: 'auto' }}
											filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
										>
											<Option value="">Show All</Option>
											<Option value="male">Show Males</Option>
											<Option value="female">Show Females</Option>
										</Select>
									</div> */}



								</div>
							</div>


						</div>
					</div>


				</AdminLayout>


			</div>
		);
	}
}

export default Users;