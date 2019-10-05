import React, { Component } from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import Link from "next/link";
import Router from 'next/router';
import { Input, notification, Popconfirm, Upload, Modal, Icon } from 'antd';
import AdminLayout from './../../../layouts/AdminLayout.js';
import { encodeForm } from './../../../utils/api-utils.js';
import { transliterate as tr, slugify } from 'transliteration';


const notificationAddSuccess = type => {
	notification[type]({
		message: 'Success',
		description:
			'Category successfully created.',
		duration: 1,
		placement: "bottomRight"
	});
};

const notificationUpdateSuccess = type => {
	notification[type]({
		message: 'Success',
		description:
			'Category successfully updated.',
		duration: 1,
		placement: "bottomRight"
	});
};

const notificationDeleteSuccess = type => {
	notification[type]({
		message: 'Success',
		description:
			'Category successfully deleted.',
		duration: 1,
		placement: "bottomRight"
	});
};



class Categories extends React.Component {

	static async getInitialProps({ req, res, query }) {

		let session = await NextAuth.init({ req });

		if (res && session && !session.user) {
			res.redirect('/auth/sign-in');
		}

		if (res && session && session.csrfToken) {
		}

		//Fetch categories
		let categories = [];
		let categoriesResponse = await fetch(`${siteUrl}/api/v1/categories?${noCache}`);
		if (categoriesResponse.status === 200) {
			categories = await categoriesResponse.json();
		}

		return {
			session: session,
			categories: categories,
			linkedAccounts: await NextAuth.linked({ req }),
			providers: await NextAuth.providers({ req }),
			query: query
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			categories: this.props.categories,

			categoryName: '',
			uri: '',
			googleDescription: '',
			keywords: '',
			createdAt: '',

			//featured image
			previewVisible: false,
			previewImage: '',
			fileList: [],

		};
		this.addNewCategory = this.addNewCategory.bind(this);

	}

	//FEATURED IMAGE HANDLERS
	imageHandleCancel = () => this.setState({ previewVisible: false })

	imageHandlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}

	imageHandleChange = ({ fileList }) => this.setState({ fileList })

	beforeUpload = (file) => {
		if (file.type == "") {
			if (file.name.indexOf(".jpg") == -1
				&& file.name.indexOf(".jpeg") == -1
				&& file.name.indexOf(".png") == -1) {
				message.error('not image');
				return false;
			} else {
				return true;
			}
		} else {
			const valid = file.type.indexOf('jpg') != -1;
			if (!valid) {
				message.error('error！');
			}
			return valid;
		}
	}
	//-----------------------//

	async addNewCategory(event) {
		event.preventDefault();
		Router.push('/admin/categories/new');
	}


	async componentDidMount() {

		if (this.props.query._id && this.props.query._id !== "new" && this.props.query._id.length === 24) {

			// Fetch Category-ID for edit unless request is for NEW category
			const formData = {
				_csrf: this.props.session.csrfToken,
				_id: this.props.query._id,
				action: 'getOne',
			};

			const encodedForm = await encodeForm(formData);

			let pages = await fetch(`${siteUrl}/api/v1/categories`, {
				credentials: 'include',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: encodedForm
			}).then(async res => {

				let response = await res.json();
				if (response.status === 'item_fetched') {
					this.setState({
						categoryName: response.data.categoryName ? response.data.categoryName : '',
						uri: response.data.uri ? response.data.uri : '',
						googleDescription: response.data.googleDescription ? response.data.googleDescription : '',
						keywords: response.data.keywords ? response.data.keywords : '',
						fileList: response.data.featuredImage ? response.data.featuredImage : [],
						createdAt: response.data.createdAt
					});
				}
			});

		}

		setTimeout(function () {
			$('#example').DataTable();
		}, 700);

	}

	addCategory = async () => {

		// Name is required
		if (!this.state.categoryName || this.state.categoryName.trim().length <= 0) {
			alert('Please insert name for category!');
			return false;
		}

		// Name must be unique
		let uniqueCheck = this.state.categories.filter((item) => (item.categoryName.toLowerCase() === this.state.categoryName.toLowerCase()));
		if (uniqueCheck.length >= 1) {
			alert('Category with same name already exists, name must be unique!');
			return false;
		}


		const formData = {
			_csrf: await NextAuth.csrfToken(),
			categoryName: this.state.categoryName,
			uri: this.state.uri,
			keywords: this.state.keywords,
			googleDescription: this.state.googleDescription,
			featuredImage: JSON.stringify(this.state.fileList),
			action: 'add',
		};

		const encodedForm = Object.keys(formData).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
		}).join('&');

		fetch('/api/v1/categories', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: encodedForm
		}).then(async res => {

			//return await res.json();
			let response = await res.json();

			if (response.status === 'database_error') {
				console.log('database_error');
			}
			else if (response.status === 'item_added') {
				notificationAddSuccess('success');
				console.log('item_added');
			}
			else {
				console.log('unknown_status');
			}
			//refresh after add
			setTimeout(function () {
				window.location.reload();
			}, 700)
		});
	}

	updateCategory = async () => {

		const formData = {
			_csrf: await NextAuth.csrfToken(),
			_id: this.props.query._id,
			categoryName: this.state.categoryName,
			uri: this.state.uri,
			googleDescription: this.state.googleDescription,
			keywords: this.state.keywords,
			featuredImage: JSON.stringify(this.state.fileList),
			createdAt: this.state.createdAt,
			action: 'set',
		};

		const encodedForm = Object.keys(formData).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
		}).join('&');

		fetch('/api/v1/categories', {
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
			else if (response.status === 'items_updated') {
				notificationUpdateSuccess('success');
				console.log('items_updated');
			}
			else {
				console.log('unknown_status');
			}

			//refresh after update
			setTimeout(function () {
				window.location.href = '/admin/categories/new';
			}, 700)
		});
	}

	// DELETE CATEGORIES
	async deleteCategoryHandler(_id) {
		const formData = {
			_csrf: this.props.session.csrfToken,
			_id: _id,
			action: "remove"
		};

		const encodedForm = await encodeForm(formData);
		let posts = await fetch(`${siteUrl}/api/v1/categories`, {
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
			if (response.status === 'item_deleted') {
				notificationDeleteSuccess('success')
				console.log("removed");
			}
			else {
				console.log('unknown_status');
			}
			setTimeout(function () {
				window.location.reload();
			}, 700)
		});

	}

	render() {

		const textConfirm = 'This action will delete category, are you sure?';

		const isNew = this.props.query._id === "new" ? true : false;

		//image control
		const { previewVisible, previewImage, fileList } = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">Upload</div>
			</div>
		);

		return (
			<div style={{ position: 'relative' }}>
				<AdminLayout {...this.props}>

					<ol className="breadcrumb breadcrumb-quirk">
						<li><a href="/"><i className="fa fa-home mr5"></i> Home</a></li>
						<li className="active">Categories</li>
					</ol>

					<div className="row">

						{/* LEFT */}
						<div className="col-sm-7 col-md-7 col-lg-8 people-list">

							<div className="people-options clearfix">

								<div className="btn-toolbar pull-left">
									<button type="button" className="btn btn-success btn-quirk" onClick={this.addNewCategory}>Add category</button>
								</div>

								<span className="people-count pull-right">Showing <strong>1-10</strong> of <strong>{this.state.categories ? this.state.categories.length : ''}</strong> categories</span>
							</div>


							{/* START CATEGORY CONTENT */}

							<div className="panel">
								<div className="panel-body">
									<div className="table-responsive">
										<table id="example" className="table table-bordered table-striped-col">
											<thead>
												<tr>
													<th>Category</th>
													<th>Description</th>
													<th>Keywords</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>

												{/* RENDER CATEGORIES */}
												{this.state.categories.map((category, index) => {
													const name = category.categoryName ? category.categoryName : '';
													const googleDescription = category.googleDescription ? category.googleDescription : '';
													const keywords = category.keywords ? category.keywords : '';
													const categoryEdit = "/admin/categories/" + category._id;

													return (
														<tr key={index}>
															<td>{name}</td>
															<td>{googleDescription}</td>
															<td >{keywords}</td>
															<td className="text-info">


																{/* Edit post */}
																<Link href={categoryEdit}>
																	<i className="glyphicon glyphicon-edit controls" />
																</Link>

																{/* Delete category */}
																<Popconfirm placement="left" title={textConfirm}
																	onConfirm={() => this.deleteCategoryHandler(category._id)} okText="Yes"
																	cancelText="No">
																	<i className="glyphicon glyphicon-trash controls" />
																</Popconfirm>

															</td>
														</tr>
													);
												})}

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						{/* END CATEGORY LIST */}

						{/*RIGHT */}

						<div className="col-sm-5 col-md-5 col-lg-4">

							<div className="panel panel-primary">

								<div className="panel-heading">
									<h4 className="panel-title">Add new category</h4>
								</div>
								<div className="panel-body">
									<div className="form-group">
										{isNew ?
											<Input
												addonBefore="Category name"
												value={this.state.categoryName}
												onChange={(event) => { this.setState({ categoryName: event.target.value, uri: slugify(event.target.value) }) }}
											/>
											:
											<Input
												addonBefore="Category name"
												value={this.state.categoryName}
												onChange={(event) => { this.setState({ categoryName: event.target.value }) }}
											/>}

									</div>
									<div className="form-group">
										<Input
											addonBefore="Uri"
											value={this.state.uri}
											disabled
										/>
									</div>
									<div className="form-group">
										<Input
											addonBefore="Google description"
											value={this.state.googleDescription}
											onChange={(event) => { this.setState({ googleDescription: event.target.value }); }}
										/>
									</div>
									<div className="form-group">
										<Input
											addonBefore="Keywords"
											value={this.state.keywords}
											onChange={(event) => { this.setState({ keywords: event.target.value }) }}
										/>
									</div>

									{/* IMAGE UPLOAD */}
									<div className="clearfix" style={{ margin: "20px 0px" }}>
										<Upload
											action="/api/v1/imageupload"
											accept=".jpg,.jpeg,.png,.bmp"
											name="myFile"
											headers={{
												uri: slugify(this.state.uri),
												path: "categories",
												type: "category",
												'X-CSRF-TOKEN': this.props.session.csrfToken,
											}}
											listType="picture-card"
											fileList={fileList}
											onPreview={this.imageHandlePreview}
											onChange={this.imageHandleChange}
										>
											{fileList.length >= 1 ? null : uploadButton}
										</Upload>
										<Modal visible={previewVisible} footer={null} onCancel={this.imageHandleCancel}>
											<img alt="example" style={{ width: '100%' }} src={previewImage} />
										</Modal>
									</div>
									{/* -------------------------------- */}

									{isNew
										? <button className="btn btn-success btn-quirk btn-block" onClick={this.addCategory}>SAVE</button>
										: <button className="btn btn-success btn-quirk btn-block" onClick={this.updateCategory}>UPDATE</button>
									}

								</div>
							</div>


						</div>

					</div>

				</AdminLayout>
			</div>
		);
	}
}

export default Categories;