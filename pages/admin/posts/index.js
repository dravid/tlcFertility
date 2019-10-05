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
			'Post successfully deleted.',
		duration: 1,
		placement: "bottomRight"
	});
};


class Posts extends React.Component {
	static async getInitialProps({ req, res, query }) {
		let session = await NextAuth.init({ req });

		let posts = [];
		let postsResponse = await fetch(`${siteUrl}/api/v1/posts?${noCache}`);
		if (postsResponse.status === 200) {
			posts = await postsResponse.json();
		}

		if (res && session && !session.user) {
			res.redirect('/auth/sign-in');
		}
		if (res && session && session.csrfToken) {
		}

		return {
			posts: posts,
			session: session,
			linkedAccounts: await NextAuth.linked({ req }),
			providers: await NextAuth.providers({ req }),
		};
	}
	constructor(props) {
		super(props);
		this.state = {
			posts: this.props.posts,
			filterName: '',
			filterTitle: '',
			filterCategorie: ''
		};
		this.deletePostHandler = this.deletePostHandler.bind(this);
		this.addPost = this.addPost.bind(this);
	}

	async componentDidMount() {

		await setTimeout(function () {
			$('#example').DataTable();
		}, 500);
	}

	async addPost(event) {
		event.preventDefault();
		Router.push('/admin/posts/new');
	}

	async deletePostHandler(_id, uri) {
		const formData = {
			_csrf: this.props.session.csrfToken,
			uri: uri,
			_id: _id,
			type: "posts",
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
				notificationDeleteSuccess('success')
				console.log("removed");
				setTimeout(function () {
					window.location.reload();
				}, 1500)
			}
		});
	}

	render() {
		const textConfirm = 'This action will delete post, are you sure?';
		return (
			<div style={{ position: 'relative' }}>
				<AdminLayout {...this.props}>

					<ol className="breadcrumb breadcrumb-quirk">
						<li><a href="/"><i className="fa fa-home mr5"></i> Home</a></li>
						<li className="active">Posts</li>
					</ol>

					<div className="row">
						<div className="col-sm-8 col-md-9 col-lg-10 people-list">

							<div className="people-options clearfix">

								<div className="btn-toolbar pull-left">
									<button type="button" className="btn btn-success btn-quirk" onClick={this.addPost}>Add post</button>
								</div>

								<span className="people-count pull-right">Showing <strong>1-10</strong> of <strong>{this.state.posts ? this.state.posts.length : ''}</strong> posts</span>
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
													<th>Categories</th>
													<th>Created at</th>
													<th>Last Update</th>
													<th>Action</th>
												</tr>

											</thead>
											<tbody>

												{/* RENDER POSTS */}

												{this.props.posts.map((post, index) => {
													const title = post.title ? post.title : '';
													const createdAt = post.createdAt ? post.createdAt : '';
													const updatedAt = post.updatedAt ? post.updatedAt : '';
													const firstName = post.authorFirstName ? post.authorFirstName : '';
													const lastName = post.authorLastName ? post.authorLastName : '';
													const postUrl = "/admin/posts/" + post._id;
													const showPostUrl = "/blog/" + post.uri;
													const categories = post.categories ? post.categories : '';

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
															<td> {title.length > 0 ? title : 'Invalid title'}</td>
															<td>{fullName}</td>
															<td>{categories}</td>
															<td >{createdAt}</td>
															<td >{updatedAt}</td>
															<td className="text-info">

																{/* Show post */}
																<Link href={showPostUrl}>
																	<i className="glyphicon glyphicon-eye-open controls" />
																</Link>

																{/* Edit post */}
																<Link href={postUrl}>
																	<i className="glyphicon glyphicon-edit controls" />
																</Link>

																{/* Delete post */}
																<Popconfirm placement="left" title={textConfirm}
																	onConfirm={() => this.deletePostHandler(post._id, post.uri)} okText="Yes"
																	cancelText="No">
																	<i className="glyphicon glyphicon-trash controls" />
																</Popconfirm>

															</td>
														</tr>
													);
												})}
												{/* --------END RENDER POSTS----------- */}

											</tbody>
										</table>

									</div>
								</div>
							</div>
						</div>

						{/* END CENTER CONTENT */}


						{/* SIDE PANEL   */}

						<div className="col-sm-4 col-md-3 col-lg-2"    >
							<div className="panel">

								<div className="panel panel-primary list-announcement">

									<div className="panel-heading">
										<h4 className="panel-title">Latest Posts</h4>
									</div>

									<div className="panel-body">

										<ul className="list-unstyled mb20">

											{/* RENDER 3 LAST POSTS */}
											{this.state.posts.slice((this.state.posts.length ? (this.state.posts.length - 3) : ''), (this.state.posts.length ? this.state.posts.length : ''))
												.map((post, index) => {
													const title = post.title ? post.title : '';
													const createdAt = post.createdAt ? post.createdAt : '';
													const postUrl = "/admin/posts/" + post._id;
													return (
														<li key={index}>
															<a href={postUrl}><h5 style={{ fontSize: '15px', color: '#259dab' }}>{title.length > 40 ? `${title.slice(0, 40).toUpperCase()}...` : title.toUpperCase()}</h5></a>
															<p>{post.googleDescription ? post.googleDescription : ""}</p>
															<small >{createdAt}</small>
														</li>
													);
												})}
											{/* -----------END RENDEL LAST POSTS-------- */}

										</ul>
									</div>

								</div>
								{/* <div className="panel-body">

									<div className="form-group">
										<Input
											addonBefore="Title:"
											value={this.state.filterTitle}
											onChange={(event) => this.setState({ filterTitle: event.target.value })}
											placeholder="Title" />
									</div>

									<div className="form-group">
										<Input
											addonBefore="Published by:"
											value={this.state.filterFirstName}
											onChange={(event) => this.setState({ filterName: event.target.value })}
											placeholder="Name" />
									</div>

								</div> */}

							</div>
						</div>

						{/* --------END SIDE PANEL---------- */}
					</div>

				</AdminLayout>
			</div>
		);
	}
}
export default Posts;