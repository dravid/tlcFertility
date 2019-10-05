import React from 'react';
import { NextAuth } from 'next-auth/client';

import Header from '../components/frontendUniversal/header'
import Footer from '../components/frontendUniversal/footer'

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;

import Head from 'next/head';


export default class UniversalLayout extends React.Component {

  static async getInitialProps({ req, res, query }) {
    let session = await NextAuth.init({ req });

    // if (res && session && !session.user) {
    //   res.redirect('/auth/sign-in');
    // }

    return {
      session: session,
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      session: this.props.session,

    }
  }

  render() {

    return (

      <div style={{ backgroundColor: "#d8dce3" }}>

        <Head>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"></link>
          <link rel="stylesheet" href={siteUrl + "/static/styles/universal/bootstrap/bootstrap.min.css"} />
          <link rel="stylesheet" href={siteUrl + "/static/styles/universal/universal.css"} />
          <link rel="stylesheet" href={siteUrl + "/static/styles/universal/antd.min.css"} />
        </Head>


        <Header />


        <div className="container" style={{ fontFamily: "Lora,'Times New Roman',serif" }}>
          <div className="row">

            {/* CONTENT  */}
            {this.props.children}
            {/* --------------------- */}

          </div>

        </div>

        <Footer />

      </div >
    );
  }
}