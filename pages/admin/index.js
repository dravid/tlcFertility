import React, { Component } from 'react';
import { NextAuth } from 'next-auth/client';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl } = publicRuntimeConfig;

import AdminLayout from '../../layouts/AdminLayout';

// const Component = () => <Calendar onPanelChange={onPanelChange}/>;

class Admin extends React.Component {

	static async getInitialProps({ req, res, query }) {

		let session = await NextAuth.init({ req });

		// if (res && session && session.user) {
		// 	res.redirect('/auth/sign-in');
		// }

		if (res && session && !session.user) {
			res.redirect('/auth/sign-in');
		}

		return {
			session: session,
			linkedAccounts: await NextAuth.linked({ req }),
			providers: await NextAuth.providers({ req })
		};
	}

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {

		return (
			<React.Fragment>
				<AdminLayout {...this.props}>

					<div className="container-fluid text-center"
						style={{ height: 'calc(100vh - 110px)' }}>

						<h2 className="  ">  ADMIN MENU </h2>

					</div>

				</AdminLayout>
			</React.Fragment>
		);
	}
}

export default Admin;