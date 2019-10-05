import React, { Component } from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import AdminLayout from '../../../layouts/AdminLayout';
import { encodeForm } from '../../../utils/api-utils';
import { Input, Select, message, Upload, Icon, Modal } from 'antd';
import Link from "next/link"

const { TextArea } = Input;
const moment = require('moment');
const newDate = moment(new Date()).format('DD.MM.YYYY HH:mm');

class ShowMessage extends React.Component {

	static async getInitialProps({ req, res, query }) {

		let session = await NextAuth.init({ req });
		if (res && session && !session.user) {
			res.redirect('/auth/sign-in');
		}
		if (res && session && session.csrfToken) {
		}

		return {
			namespacesRequired: [],
			session: session,
			linkedAccounts: await NextAuth.linked({ req }),
			providers: await NextAuth.providers({ req }),
			query: query
		};
	}

	constructor(props) {
		super(props);
		this.state = {

			message: ''
		};
	}

	async componentDidMount() {

		console.log(this.props.query)
		// FETCH Message-ID  
		const formData = {
			_csrf: this.props.session.csrfToken,
			_id: this.props.query.id,
			action: 'getOne',
		};

		const encodedForm = await encodeForm(formData);

		let pages = await fetch(`${siteUrl}/api/v1/contact`, {
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
					message: response.data ? response.data : [],
				});
			}
		}, 10);
	}


	render() {
		const message = this.state.message ? this.state.message : "";

		return (

			<AdminLayout {...this.props}>

				<ol className="breadcrumb breadcrumb-quirk">
					<li><a href={siteUrl + "/admin/messages"}><i className="fa fa-home mr5"></i> Home > Messages</a></li>
					<li className="active">Show Message</li>
				</ol>

				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12 people-list">

						<div className="people-options clearfix">
							<div className="btn-toolbar pull-left">
								<Link href="/admin/messages">
									<button type="button" className="btn btn-success btn-quirk">All messages</button>
								</Link>
							</div>
						</div>

						{/* CENTER _CHILD CONTENT */}

						<div className="panel" style={{ padding: '30px', width: '100%', minHeight: "576px" }}>
							{message.firstName && message.firstName.length > 1 ?
								<Input
									style={{ margin: "0px 0px 5px 0px", width: "100%" }}
									disabled
									addonBefore="First name:"
									type='text'
									size="large"
									className="mb-2"
									value={this.state.firstName}
									placeholder="First Name"
								/>
								: null}

							{message.lastName && message.lastName.length > 1 ?
								<Input
									style={{ margin: "0px 0px 5px 0px", width: "100%" }}
									disabled
									addonBefore="Last name:"
									type='text'
									size="large"
									className="mb-2"
									value={message.lastName}
									placeholder="Last Name"
								/>
								: null}

							{message.name && message.name.length > 1 ?
								<Input
									style={{ margin: "0px 0px 5px 0px", width: "100%" }}
									disabled
									addonBefore="Name:"
									type='text'
									size="large"
									className="mb-2"
									value={message.name}
									placeholder="Name"
								/>
								: null}

							{message.dateOfBirth && message.dateOfBirth.length > 1 ?
								<Input
									style={{ margin: "0px 0px 5px 0px", width: "100%" }}
									disabled
									addonBefore="Date of birth:"
									type='text'
									size="large"
									className="mb-2"
									value={message.dateOfBirth}
									placeholder="Date Of Birth"
								/>
								: null}

							{message.email && message.email.length > 1 ?
								<Input
									style={{ margin: "0px 0px 5px 0px", width: "100%" }}
									disabled
									addonBefore="Email:"
									type='text'
									size="large"
									className="mb-2"
									value={message.email}
									placeholder="Email"
								/>
								: null}

							{message.phone && message.phone.length > 1 ?
								<Input
									style={{ margin: "0px 0px 5px 0px", width: "100%" }}
									disabled
									addonBefore="Phone:"
									type='text'
									size="large"
									className="mb-2"
									value={message.phone}
									placeholder="Phone"
								/>
								: null}

							{message.subject && message.subject.length > 1 ?
								<Input
									style={{ margin: "0px 0px 5px 0px", width: "100%" }}
									disabled
									addonBefore="Subject:"
									type='text'
									size="large"
									className="mb-2"
									value={message.subject}
									placeholder="Subject"
								/>
								: null}

							<TextArea
								style={{ margin: "0px 0px 5px 0px", width: "100%" }}
								disabled
								type='text'
								size="large"
								placeholder="Message"
								value={message.message}
								autosize={{ minRows: 2, maxRows: 6 }}
							/>

							<Input
								style={{ margin: "0px 0px 5px 0px", width: "100%" }}
								disabled
								addonBefore="Time sent:"
								type='text'
								size="large"
								className="mb-2"
								value={message.createdAt}
								placeholder="Time"
							/>

						</div>
					</div>
					{/* CENTER END */}

				</div>
			</AdminLayout >
		);
	}
}

export default ShowMessage;

