import React, { Component } from 'react';
import { NextAuth } from 'next-auth/client';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;

import Link from "next/link";
import Router from 'next/router';

import AdminLayout from './../../../layouts/AdminLayout.js';
import { encodeForm } from './../../../utils/api-utils.js';
import { Input, Popconfirm, notification } from 'antd';

const notificationDeleteSuccess = type => {
	notification[type]({
		message: 'Success',
		description:
			'Page successfully deleted.',
		duration: 1,
		placement: "bottomRight"
	});
};


class Pages extends React.Component {
	static async getInitialProps({ req, res, query }) {
		let session = await NextAuth.init({ req });

		let pages = [];
		let pagesResponse = await fetch(`${siteUrl}/api/v1/pages?${noCache}`);
		if (pagesResponse.status === 200) {
			pages = await pagesResponse.json();
			// console.log('pages FETCHED:', pages);
		}

		if (res && session && !session.user) {
			res.redirect('/auth/sign-in');
		}
		if (res && session && session.csrfToken) {
		}

		return {
			pages: pages,
			session: session,
			linkedAccounts: await NextAuth.linked({ req }),
			providers: await NextAuth.providers({ req }),
		};
	}
	constructor(props) {
		super(props);
		this.state = {
			pages: this.props.pages,
			filterFirstName: '',
			filterTitle: '',
		};

		this.deletePageHandler = this.deletePageHandler.bind(this);
		this.addPage = this.addPage.bind(this);
	}


	async componentDidMount() {

		await setTimeout(function () {
			$('#example').DataTable();
		}, 500);
	}

	async addPage(event) {
		event.preventDefault();
		Router.push('/admin/pages/new');
	}

	async deletePageHandler(_id, uri) {
		const formData = {
			_csrf: this.props.session.csrfToken,
			_id: _id,
			uri: uri,
			type: "pages",
			action: "remove"
		};

		const encodedForm = await encodeForm(formData);

		let pages = await fetch(`${siteUrl}/api/v1/pages`, {
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
				notificationDeleteSuccess('success')
				console.log("removed");
				setTimeout(function () {
					window.location.reload();
				}, 1500)
			}
		});

	}

	render() {
		const textConfirm = 'This action will delete page, are you sure?';

		return (
			<div style={{ position: 'relative' }}>
				<AdminLayout {...this.props}>

					<ol className="breadcrumb breadcrumb-quirk">
						<li><a href="/"><i className="fa fa-home mr5"></i> Home</a></li>
						<li className="active">Pages</li>
					</ol>

					<div className="row">
						<div className="col-sm-8 col-md-9 col-lg-10 people-list">

							<div className="people-options clearfix">

								<div className="btn-toolbar pull-left">
									<button type="button" className="btn btn-success btn-quirk" onClick={this.addPage}>Add page</button>
								</div>

								<span className="people-count pull-right">Showing <strong>1-10</strong> of <strong>{this.state.pages ? this.state.pages.length : ''}</strong> pages</span>
							</div>


							{/* START CENTER CONTENT */}

							<div className="panel">
								<div className="panel-body">
									<div className="table-responsive">

										<table id="example" className="table table-bordered table-striped-col">

											<thead>

												<tr>
													<th>Title</th>
													<th>User</th>
													<th>Created at</th>
													<th>Last Update</th>
													<th>Action</th>
												</tr>

											</thead>

											<tbody>

												{/* RENDER PAGES */}

												{this.props.pages.map((page, index) => {
													const title = page.title ? page.title : '';
													const createdAt = page.createdAt ? page.createdAt : '';
													const updatedAt = page.updatedAt ? page.updatedAt : '';
													const firstName = page.authorFirstName ? page.authorFirstName : '';
													const lastName = page.authorLastName ? page.authorLastName : '';
													const pageUrl = "/admin/pages/" + page._id;
													const showPageUrl = siteUrl + "/" + page.uri;

													// Full name
													let fullName = '';
													if (firstName && firstName !== 'undefined' && firstName.trim().length > 0) {
														fullName += firstName + ' ';
													}
													if (lastName && lastName !== 'undefined' && lastName.trim().length > 0) {
														fullName += lastName;
													}
													//------------

													return (
														<tr key={index}>
															<td>{title.length > 0 ? title : 'Invalid title'}</td>
															<td>{fullName}</td>
															<td >{createdAt}</td>
															<td >{updatedAt}</td>
															<td className="text-info">

																{/* Show page */}
																<Link href={showPageUrl}>
																	<i className="glyphicon glyphicon-eye-open controls" />
																</Link>

																{/* Edit page */}
																<Link href={pageUrl}>
																	<i className="glyphicon glyphicon-edit controls" />
																</Link>

																{/* Delete page */}
																<Popconfirm placement="left" title={textConfirm}
																	onConfirm={() => this.deletePageHandler(page._id, page.uri)} okText="Yes"
																	cancelText="No">
																	<i className="glyphicon glyphicon-trash controls" />
																</Popconfirm>


															</td>
														</tr>
													);
												})}

												{/* -----------END RENDER PAGES-------- */}

											</tbody>
										</table>

									</div>
								</div>
							</div>
						</div>


						{/* END CENTER CONTENT */}


						{/* SIDE PANEL		 */}

						<div className="col-sm-4 col-md-3 col-lg-2">
							<div className="panel">

								<div className="panel panel-primary list-announcement">

									<div className="panel-heading">
										<h4 className="panel-title">Latest pages</h4>
									</div>

									<div className="panel-body">

										<ul className="list-unstyled mb20">

											{/* LAST 3 PAGES */}
											{this.state.pages.slice((this.state.pages.length ? (this.state.pages.length - 3) : ''), (this.state.pages.length ? this.state.pages.length : ''))
												.map((page, index) => {
													const title = page.title ? page.title : '';
													const createdAt = page.createdAt ? page.createdAt : '';
													const pageUrl = "/admin/pages/" + page._id;

													return (
														<li key={index}>
															<a href={pageUrl}> <h5 style={{ fontSize: '15px', color: '#259dab' }}>{title.length > 40 ? `${title.slice(0, 40).toUpperCase()}...` : title.toUpperCase()}</h5></a>
															<p>{page.googleDescription ? page.googleDescription : ""}</p>
															<small >{createdAt}</small>
														</li>
													);
												})}
											{/* ----------END LAST PAGES--------- */}

										</ul>
									</div>

								</div>

							</div>
						</div>

						{/* --------END SIDE PANEL---------- */}
					</div>

				</AdminLayout>
			</div>
		);
	}
}

export default Pages;