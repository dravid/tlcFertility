import React from 'react';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import Head from 'next/head';


import Layout from "../../layouts/TlcfertilityLayout";




export default class Posts extends React.Component {

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

    //Get categories
    let categories = [];
    let categoriesResponse = await fetch(`${siteUrl}/api/v1/categories?${noCache}`);
    if (categoriesResponse.status === 200) {
      categories = await categoriesResponse.json();
    }


    if (res && session && session.csrfToken) {
    }

    return {
      categories: categories,
      posts: posts,
      session: session,
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      session: this.props.session,
      posts: this.props.posts,
      categories: this.props.categories,
      selectedCategory: '',

      //pagination

      minValue: 0,
      maxValue: 5,

    }
  }

  async componentDidMount() {

  }

  selectCategory = (name) => {
    this.setState({ selectedCategory: name })
  }

  // handleChangeNext = () => {
  //   let postsTotal = this.state.posts.length;
  //   if (this.state.maxValue < postsTotal - 1) {

  //     this.setState({
  //       minValue: this.state.minValue + 5,
  //       maxValue: this.state.maxValue + 5
  //     });

  //   }
  // };
  // handleChangePrev = () => {
  //   let postsTotal = this.state.posts.length;
  //   if (this.state.maxValue > 5) {

  //     this.setState({
  //       minValue: this.state.minValue - 5,
  //       maxValue: this.state.maxValue - 5
  //     });

  //   }
  // };


  render() {



    let posts = this.state.posts ? this.state.posts : "";
    let categories = this.state.categories ? this.state.categories : "";

    const pageContent = (content) => {
      return { __html: `${content}` }
    }

    return (

      <Layout {...this.props}>

        <Head>
          <title>Tree of Life Center - Blog page</title>
          <meta name="description" content="Welcome at Tree of Life Fertility Center (TLC), Blog page" />
          <meta name="keywords" content="ivf, tree of life center, california, fertility care, fertility tourism, blog page, infertility, blog" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Blog page" />
          <meta property="og:description" content="Welcome at Tree of Life Fertility Center (TLC), Blog page" />
          <meta property="og:url" content="https://tlcfertility.com/blog" />
          <meta property="og:site_name" content="Tree of Life Center" />
          <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />
        </Head>

        <div className="row m-0 page">

          <div className="header" style={{
            backgroundColor: '#f5f5f4'
          }}>
            <p className="header-button"><a href="/">Tree of Life Center</a> / <span>Blog</span></p>
          </div>
        </div>

        <div className="container">

          <div className="row" style={{ margin: '40px 0px' }}>

            {/* CONTENT  */}

            {/* CENTER */}
            <div className="col-lg-9 justify-content-center bg-light" id="left-side"
              style={{ minWidth: "40vw", minHeight: "60vh" }}
            >

              <div>

                {posts
                  // .filter((item) =>
                  //   (item ? item.categories.includes(this.state.selectedCategory) : '')) //Filter by Category
                  .slice(this.state.minValue, this.state.maxValue)
                  .map((post, index) => {
                    const title = post.title ? post.title : '';
                    const createdAt = post.createdAt ? post.createdAt : '';
                    const content = post.content ? post.content : "";
                    const fullName = (post.authorFirstName ? post.authorFirstName : '') + " " + (post.authorLastName ? post.authorLastName : '');
                    const featuredImage = post.featuredImage && post.featuredImage[0] ? post.featuredImage[0].thumbUrl : "/static/images/logo.png?webp";
                    const categories = post.categories ? post.categories : "Uncategories";
                    const postUrl = "/blog/" + post.uri;
                    return (
                      <div key={index}
                        style={{
                          margin: "20px 0px",
                          paddingBottom: "20px"
                        }}
                        className="border-bottom text-left posts_style d-inline-flex w-100"
                      >

                        {/* POSTS Text */}
                        <div className="col-8 single_post">
                          <Link href={postUrl}>
                            <a> <h1>{title.length > 45 ? `${title.slice(0, 45)}...` : title}</h1></a>
                          </Link>
                          {/* <OnlyOnClient
                            placeholder={
                              <div>

                              </div>
                            }
                            html={content && content.length > 120 ? `${content.slice(0, 120)}...` : content} // this won't re-render
                          /> */}

                          {/* <div><p>{content && content.length > 120 ? `${content.slice(0, 120)}...` : content}</p></div> */}

                          {/* <div style={{ fontSize: '15px' }} className="post_content" dangerouslySetInnerHTML={pageContent(content && content.length > 120 ? `${content.slice(0, 120)}...` : content)} /> */}

                          <div className="post_content"><p>{post.googleDescription && post.googleDescription.length > 120 ? `${post.googleDescription.slice(0, 120)}...` : post.googleDescription}</p></div>

                          <div>
                            <small>Category: {categories}</small>
                            <small >{createdAt} by {fullName}</small>
                          </div>
                        </div>

                        {/* // POSTS featured image */}
                        <Link href={postUrl}>
                          <div className="col-4 featured_image"
                            style={{
                              backgroundImage: 'url(' + featuredImage + ')',
                              backgroundColor: '#f0f0f0',
                              backgroundSize: '100% auto',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: "center center",
                              cursor: 'pointer',
                              boxShadow: 'none',
                              filter: 'grayscale(0)',
                              transition: 'all .1s'
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
            <div className="col-lg-3" id="right-side">

              {/* RECENT POSTS */}
              <div className="recent_posts">

                <h5>RECENT POSTS</h5>

                {this.props.posts.slice((this.props.posts && this.props.posts.length > 0 ? (this.props.posts.length - 3) : ''), (this.props.posts.length ? this.props.posts.length : 'There are no posts'))
                  .map((post, index) => {
                    const title = post.title ? post.title : '';
                    const postUrl = "/blog/" + post.uri;

                    return (
                      <div key={index} className="recent_post border-bottom border-light mt-3 mb-3 pb-2">
                        <a href={postUrl} style={{ fontSize: '15px' }}>{title}</a>
                      </div>
                    );
                  })}

              </div>
              {/* -------------------- */}

              {/* CATEGORIES */}

              {/* <h5>CATEGORIES</h5>

              {categories.map((category, index) => {
                let name = category.categoryName ? category.categoryName : '';
                // const postUrl = "/post/" + category._id;
                return (
                  <div key={index} className="front_categories border border-light m-1 text-center">
                    <p onClick={() => this.selectCategory(name)}>{name}</p>
                  </div>
                );
              })} */}

              {/* ------------------------- */}

            </div>
            {/* --------------------- */}

          </div>

          {/* <FrontendUniversalStyles /> */}

        </div>

        <style jsx>{`

.featured_image:hover{
  filter: grayscale(70%) !important;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
}

.single_post{
  min-height: 155px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.single_post h1{
  text-transform: uppercase;
  font-size: 23px;
  line-height: 28px;
  margin: 0;
}

.single_post .post_content{
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  line-height: 23px;
  letter-spacing: 0px;
  font-weight: 400;
  font-style: normal;
  text-transform: none;
  color: #818181;
  margin: 10px 0;
}

.single_post .post_content p{
  margin: 0;
  line-height: 21px;
}

.single_post .post_content h2{
  display: none;
}

.single_post small{
  font-size: 12px;
  margin: 0;
  display: block;
  font-weight: 400;
  color: #ccc;
}

.single_post small:first-of-type{
  margin-bottom: 5px;
}

@media (max-width: 991px) {
  #left-side{
    order: 2;
  }

  #right-side{
    order: 1;
  }
}

@media (max-width: 478px) {

  .single_post{
    max-width: 100%;
    flex: 0 0 100%;
  }
  .featured_image{
    display: none;
  }
}
          `}</style>

      </Layout >
    );
  }
}