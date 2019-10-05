import React from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;

import dynamic from 'next/dynamic'
const Header = dynamic(() => import('../components/tlcfertility/header'));
const Footer = dynamic(() => import('../components/tlcfertility/footer'));
import LazyLoad from 'react-lazy-load';

// import { Trans, withNamespaces, i18n, Link } from '../utils/i18n';
// const MobileDetect = require('mobile-detect');

import { withRouter } from 'next/router';

import Head from 'next/head';


class TlcfertilityLayout extends React.Component {

  static async getInitialProps({ req, res, query }) {
    let session = await NextAuth.init({ req });

    //Get posts
    let posts = [];
    let postsResponse = await fetch(`${siteUrl}/api/v1/posts?${noCache}`);
    if (postsResponse.status === 200) {
      posts = await postsResponse.json();
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
      session: this.props.session,
      posts: [],

    }
  }

  // async componentDidMount() {

  //   let posts = [];
  //   let postsResponse = await fetch(`${siteUrl}/api/v1/posts?${noCache}`);
  //   if (postsResponse.status === 200) {
  //     posts = await postsResponse.json();
  //   }

  //   return this.setState({ posts: posts })

  // }


  render() {
    // const { t } = this.props
    let section = this.props.section ? this.props.section : 'home';


    // console.log(this.props.router.query.isMobile);

    return (

      <div>

        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content="Modern Fertility Clinic in Los Angeles California - Board Certified Reproductive Endocrinology &amp; Infertility Subspecialists." />
          <meta name="twitter:title" content="Top ❤ Fertility Center in Los Angeles, CA | Tree of Life Center Homepage" />
          <meta name="twitter:image" content={siteUrl + "/static/images/tlcfertility/2018/10/twitter.jpg"} />
          <meta name="twitter:site" content="https://twitter.com/vukytw"></meta>
          {/* CSS PRELOAD*/}
          <link defer rel="stylesheet" href={siteUrl + "/static/styles/tlcfertility/bootstrap-styles.min.css"} />
          {/* <link rel="stylesheet" href={siteUrl + "/static/styles/tlcfertility/styles.min.css"} /> */}
          {/* ----------------- */}
        </Head>

        <Header section={section} />

        {/* CONTENT  */}
        <div>

          {/* <h1 style={{ display: 'none' }}>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center</h1> */}
          <h2 style={{ display: 'none' }}>Modern Fertility Clinic in Los Angeles California - Board Certified Reproductive Endocrinology - Infertility Subspecialists.</h2>

          {this.props.children}

        </div>
        {/* --------------------- */}



        <LazyLoad height={400} offsetVertical={300}>
          <Footer {...this.state.posts} />
        </LazyLoad>

        <style jsx global>{`

    `}</style>

        {/* FONTS POSTLOAD */}
        {/* <link defer href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" /> */}
        {/* <link defer rel="stylesheet" href={siteUrl + "/static/styles/bootstrap/bootstrap.min.css"} /> */}
        {/* BOOTSTRAP + STYLES */}
        {/* <link defer rel="stylesheet" href={siteUrl + "/static/styles/tlcfertility/bootstrap-styles.min.css"} /> */}
        {/* <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js" integrity="sha384-SlE991lGASHoBfWbelyBPLsUlwY1GwNDJo3jSJO04KZ33K2bwfV9YBauFfnzvynJ" crossOrigin="anonymous"></script> */}
        {/* MODIFIED FONT AWESOME ^ ICONS ONLY */}
        <script defer src={siteUrl + "/static/styles/tlcfertility/fontawesome-all.min.js"}></script>
        {/* FAVICONS */}
        <link defer rel="apple-touch-icon" sizes="180x180" href={siteUrl + "/static/favicon/apple-touch-icon.png"} />
        <link defer rel="icon" type="image/png" sizes="32x32" href={siteUrl + "/static/favicon/favicon-32x32.png"} />
        {/* <link defer rel="icon" type="image/png" sizes="16x16" href={siteUrl + "/static/favicon/favicon-16x16.png"} /> */}
        {/* <link defer rel="manifest" href={siteUrl + "/static/favicon/site.webmanifest"} /> */}
        {/* ----------- */}

      </div >

    );
  }
}


export default withRouter(TlcfertilityLayout);