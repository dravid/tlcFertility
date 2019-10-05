import React from 'react';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import OnlyOnClient from '../../components/common/OnlyOnClient.js';
import Layout from "../../layouts/TlcfertilityLayout"



export default class Pages extends React.Component {

  static async getInitialProps({ req, res, query }) {

    let session = await NextAuth.init({ req });

    // if (res) {
    // 	res.redirect('/admin');
    // }

    //Get pages
    let pages = [];
    let pagesResponse = await fetch(`${siteUrl}/api/v1/pages?${noCache}`);
    if (pagesResponse.status === 200) {
      pages = await pagesResponse.json();
    }
    if (res && session && session.csrfToken) {
    }

    if (res && session && session.csrfToken) {
    }

    return {
      pages: pages,
      session: session,
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      session: this.props.session,
      pages: this.props.pages,
      categories: this.props.categories,
      selectedCategory: '',

    }
  }

  async componentDidMount() {

  }

  selectCategory = (name) => {
    this.setState({ selectedCategory: name })
  }


  render() {

    let pages = this.state.pages ? this.state.pages : "";

    return (

      <Layout {...this.props}>
        <div className="container-fluid " id="pages">
          <div className="row mt-4 main">

            {/* CONTENT  */}

            {/* CENTER */}
            <div className="col-lg-10 col-md-10 col-sm-12 wrapper">
              <div >

                {/* {pages
                filter((item) =>
                  (item && item.categories ? item.categories.includes(this.state.selectedCategory) : '') //Filter by Category
                ) */}
                {pages.map((post, index) => {
                  const title = post.title ? post.title : '';
                  const createdAt = post.createdAt ? post.createdAt : '';
                  const content = post.content ? post.content : "";
                  const fullName = (post.authorFirstName ? post.authorFirstName : '') + " " + (post.authorLastName ? post.authorLastName : '');
                  const featuredImage = post.imageNames ? post.imageNames[0] : "";
                  const categories = post.categories ? post.categories : "Uncategories";
                  const postUrl = "/" + post.uri;
                  return (
                    <div key={index}
                      className="border-bottom text-left p-2 row page "
                    >
                      {/* PAGES TEXT */}
                      <div className="col-lg-7 col-md-7 col-sm-8 p-2">
                        <Link href={postUrl}>
                          <h1>{title.length > 45 ? `${title.slice(0, 45)}...` : title}</h1>
                        </Link>
                        <OnlyOnClient
                          placeholder={
                            <div className="page_content">
                            </div>
                          }
                          html={content && content.length > 120 ? `${content.slice(0, 120)}...` : content} // this won't re-render
                        />
                        <small >{createdAt} by {fullName}</small>
                      </div>

                      {/* // PAGES featured image */}
                      <Link href={postUrl}>
                        <div className="col-lg-5 col-md-5 col-sm-4 p-3 shadow featured_image rounded"
                          style={{
                            backgroundImage: 'url(' + featuredImage + ')',
                            backgroundColor: '#111',
                            backgroundSize: 'cover',
                            overflow: 'hidden',
                            backgroundPosition: "center center",
                          }}
                        >
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

            </div>
            {/* ---------------CENTER END-------------- */}


            {/* RIGHT SIDE */}
            <div className="col-lg-2 col-md-2 col-sm-12">

              {/* RECENT PAGES */}
              <div>

                <h5>RECENT PAGES</h5>

                {this.props.pages.slice((this.props.pages.length > 0 ? (this.props.pages.length - 3) : ''), (this.props.pages.length ? this.props.pages.length : 'There are no pages'))
                  .map((post, index) => {
                    const title = post.title ? post.title : '';
                    const postUrl = "/" + post._id;

                    return (
                      <div key={index} className="border-bottom border-light mt-3 mb-3">
                        <a href={postUrl} style={{ fontSize: '15px' }}>{title}</a>
                      </div>
                    );
                  })}

              </div>
              {/* -------------------- */}


            </div>
            {/* --------------------- */}

          </div>
          <style jsx>{` 

          #pages {
            display: flex;
          }
          #pages .main {
            margin: 0px auto;
          }

          #pages .wrapper {
            background: '#fff';
            padding: 20px;
          }
          #pages .page {
            padding: 5px;
            height: 40vh;
          }

          #pages .page h1 {
            margin: 20px 0;
            font-family: 'Raleway', sans-serif;
            font-style: normal;
            text-transform: uppercase;
            color: #17A2B4;
            font-weight: 800;
            font-size: 24px;
          }

          #pages page_content {
            font-size: 16px !important;
          }

          #pages .featured_image {
            position: relative;
            margin: auto;
            height: 90%;
          }
            

            `} </style>

        </div>
      </Layout>
    );
  }
}