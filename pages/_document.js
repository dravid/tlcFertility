import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { siteUrl } = publicRuntimeConfig;
import { seoStructured } from '../seo-config';

import { GA_TRACKING_ID } from '../utils/gtag'

export default class DefaultDocument extends Document {
	static async getInitialProps(props) {
		return await Document.getInitialProps(props);
	}

	render() {
		return (
			<html lang={this.props.__NEXT_DATA__.props.lang || 'en'}>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<script defer src={siteUrl + "/static/styles/admin/jquery.min.js"}></script>
					<script defer src={siteUrl + "/static/styles/admin/bootstrap/bootstrap.min.js"}></script>
					{/* GOOGLE ANALITICS */}
					<script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `
						}}
					/>
					{/* ------------------------- */}

					<script type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: seoStructured }}
					/>

				</Head>
				<body itemScope itemType="http://schema.org/WebPage">
					<meta itemProp="url" content="https://www.tlcfertility.com/" />

					<Main />
					<NextScript />

				</body>

				{/* <script defer src={siteUrl + "/static/styles/admin/jquery.min.js"}></script>
				<script defer src={siteUrl + "/static/styles/admin/bootstrap/bootstrap.min.js"}></script> */}
				<script defer src={siteUrl + "/static/styles/admin/jquery.dataTables.min.js"}></script>
			</html>
		);
	}
}

