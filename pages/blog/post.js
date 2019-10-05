import React from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import fetch from 'isomorphic-fetch';
import Layout from "../../layouts/TlcfertilityLayout"
import { encodeForm } from '../../utils/api-utils';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import Head from "next/head";


//COMMENT CONTROL-----------
const TextArea = Input.TextArea;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment  {...props}
    />}
  />
);
const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
      </Button>
      </Form.Item>
    </div>
  );

//END COMMENTS CONTROLS-----------

export default class Post extends React.Component {

  static async getInitialProps({ req, res, query }) {
    let session = await NextAuth.init({ req });


    // Get post data
    let post = {};
    let postResponse = await fetch(`${siteUrl}/api/v1/posts/${query.uri}?${noCache}`);
    if (postResponse.status === 200) {
      post = await postResponse.json();
    }


    if (res && session && session.csrfToken) {
    }

    return {
      post: post,
      session: session,
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      post: this.props.post,
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

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  }

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            // author: this.state.user.firstName,
            // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
            // actions: [<span>
            //   <Tooltip title="Like">
            //     <Icon
            //       type="like"
            //       theme={this.state.action === 'liked' ? 'filled' : 'outlined'}
            //       onClick={this.like}
            //     />
            //   </Tooltip>
            //   <span style={{ paddingLeft: 8, cursor: 'auto' }}>
            //     {this.state.likes}
            //   </span>
            // </span>,
            // <span>
            //   <Tooltip title="Dislike">
            //     <Icon
            //       type="dislike"
            //       theme={this.state.action === 'disliked' ? 'filled' : 'outlined'}
            //       onClick={this.dislike}
            //     />
            //   </Tooltip>
            //   <span style={{ paddingLeft: 8, cursor: 'auto' }}>
            //     {this.state.dislikes}
            //   </span>
            // </span>,
            // ],
          },
          ...this.state.comments,
        ],
      });
    }, 500);
  }
  // ---------END OF COMMENT HANDLERS----------


  render() {
    const fullName = this.state.user ? this.state.user.firstName + " " + this.state.user.lastName : "";
    const { comments, submitting, value, likes, dislikes, action } = this.state;

    let post = this.props.post ? this.props.post : "";
    let featuredImage = post.featuredImage && post.featuredImage[0] ? post.featuredImage[0].thumbUrl : "";


    const pageContent = () => {
      return { __html: `${post.content}` }
    }


    return (
      <Layout {...this.props}>

        <Head>
          <link rel="stylesheet" href={siteUrl + "/static/styles/admin/antd.min.css"} />
          <title>{this.props.post.title}</title>
          <meta name="description" content={`${this.props.post.googleDescription}`} />
          <meta name="keywords" content={`${this.props.post.keywords}`} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${this.props.post.title}`} />
          <meta property="og:description" content={`${this.props.post.googleDescription}`} />
          <meta property="og:url" content={"https://tlcfertility.com/blog/" + this.props.post.uri} />
          <meta property="og:site_name" content="Tree of Life Center" />
          <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />


        </Head>



        <div className="container-fluid p-0 page" style={{ marginTop: '10px', minHeight: 700 }}>

          <div className="row m-0 page">

            <div className="header" style={{
              backgroundImage: 'url(' + featuredImage + ')',
              backgroundColor: '#f5f5f4'
            }}>
              <p className="header-button"><a href="/">Tree of Life Center</a> / <span>{post.title}</span></p>
            </div>
          </div>

          {/* CONTENT  */}
          <div className="col-lg-12 col-md-12 mx-auto text-center">

            {/* POST */}
            <div className="">


              <div
                className=" container text-left mt-5"
              >
                {/* <img src={post.featuredImage} alt="featured image" style={{ height: 550, width: '100%' }} /> */}


                <div id="page_content" dangerouslySetInnerHTML={pageContent()} />

              </div>
            </div>
            {/* ---------END POST----- */}



            {/* COMENTS */}
            {/* <div className="comments mt-4 d-block ">
              <h4>COMMENTS:</h4>
 */}

            {/* comments post      */}
            {/* <div className="w-75 mx-auto"> */}
            {/* {comments.length > 0 && <CommentList comments={comments} />} */}
            {/* <CommentList
                  comments={comments}
                />
                <Comment
                  // actions={actions}
                  // author={<a>{fullName}</a>}
                  // avatar={(
                  // <Avatar
                  //   // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  //   // alt={fullName}
                  // />
                  // )}
                  content={(
                    <Editor
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  )}
                />
              </div> */}
            {/* ------end comment post--------- */}



            {/* </div> */}
            {/* -------COMENTS END----------- */}



          </div>
          {/* ---------------CENTER END-------------- */}




          {/* --------------------- */}

        </div>

      </Layout>
    );
  }
}