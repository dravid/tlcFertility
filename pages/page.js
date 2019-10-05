import React from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import fetch from 'isomorphic-fetch';
import Layout from "../layouts/TlcfertilityLayout"

import Head from 'next/head';


export default class Page extends React.Component {

  static async getInitialProps({ req, res, query }) {
    let session = await NextAuth.init({ req });

    // if (res && session && !session.user) {
    //   res.redirect('/auth/sign-in');
    // }


    let uri = '';

    if (req && req.url) {
      uri = req.url.substring(1);
    }

    // Get page data
    let page = {};
    let pageResponse = await fetch(`${siteUrl}/api/v1/pages/${uri}?${noCache}`);
    if (pageResponse.status === 200) {
      page = await pageResponse.json();
    }

    if (res && session && session.csrfToken) {
    }

    return {
      page: page,
      session: session,
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      page: this.props.page,
      user: this.props.session.user,
      commentName: "",
      commentContent: "",

      //comments
      comments: [],
      submitting: false,
      author: '',
      value: '',
      likes: 0,
      dislikes: 0,
      action: null,
    }
  }

  async componentDidMount() {

  }

  // COMMENTS CONTROL


  render() {
    const fullName = this.state.user ? this.state.user.firstName + " " + this.state.user.lastName : "";

    let page = this.props.page ? this.props.page : "";
    let featuredImage = page.featuredImage && page.featuredImage[0] ? page.featuredImage[0].thumbUrl : "";

    const pageContent = () => {
      return { __html: `${page.content}` }
    }


    return (

      <React.Fragment>

        <Layout {...this.props}>

          <Head>
            <title>{this.props.page.title}</title>
            <meta name="description" content={`${this.props.page.googleDescription}`} />
            <meta name="keywords" content={`${this.props.page.keywords}`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${this.props.page.title}`} />
            <meta property="og:description" content={`${this.props.page.googleDescription}`} />
            <meta property="og:url" content={"https://tlcfertility.com/" + this.props.page.uri} />
            <meta property="og:site_name" content="Tree of Life Center" />
            <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />
          </Head>


          <div className="container-fluid p-0 page" style={{ marginTop: '10px', minHeight: 700 }}>

            <h1 style={{ display: 'none' }}>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center, {this.props.page.title}</h1>

            <div className="row m-0 page">

              <div className="header" style={{
                backgroundImage: 'url(' + featuredImage + ')',
                backgroundColor: '#f5f5f4'
              }}>
                <p className="header-button"><a href="/">Tree of Life Center</a> / <span>{page.title}</span></p>
              </div>
            </div>
            {/* CONTENT  */}
            <div className="col-lg-12 col-md-12 mx-auto text-center">

              {/* PAGE */}
              <div className="">

                <div
                  className=" container text-left mt-5"
                >

                  {/* <img src={featuredImage} alt="featured image" style={{ height: 550, width: '100%' }} /> */}

                  <div id="page_content" dangerouslySetInnerHTML={pageContent()} />

                </div>
              </div>
              {/* ---------END PAGE----- */}


            </div>
            {/* ---------------CENTER END-------------- */}


            {/* RIGHT SIDE */}
            {/* <div className="col-lg-4 col-md-2">


          {/* --------------------- */}
          </div>
          {/* <style jsx>{`

#page_content p, .page .content h5 {
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  line-height: 29px;
  letter-spacing: 0px;
  font-weight: 400;
  font-style: normal;
  text-transform: none;
  color: #818181;
  margin: 10px 0;
}

.page h2 {
    font-size: 33px;
    line-height: 50px;
    letter-spacing: 0px;
}


.page h1, .page h2, .page h3 {
    margin: 20px 0;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    text-transform: uppercase;
    color: #17A2B4;
    font-weight: 800;
}

.page .featured {
  background-color: #111;
  background-size: cover;
  overflow: hidden;
  background-position: center center;
  height: 50vh;
  width: 95%;
}

#page_content p {
    font-family: Raleway, sans-serif;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;
    font-weight: 400;
    font-style: normal;
    text-transform: none;
    color: #818181;

}

          `}</style> */}




          {/* <FrontendUniversalStyles /> */}

        </Layout>

      </React.Fragment>
    );
  }
}