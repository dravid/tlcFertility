import React from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import fetch from 'isomorphic-fetch';
import OnlyOnClient from '../../components/common/OnlyOnClient';
import UniversalLayout from "../../layouts/UniversalLayout"
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';


//COMMENT CONTROL-----------
// const TextArea = Input.TextArea;
// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={props => <Comment  {...props}
//     />}
//   />
// );
// const Editor = ({
//   onChange, onSubmit, submitting, value,
// }) => (
//     <div>
//       <Form.Item>
//         <TextArea rows={4} onChange={onChange} value={value} />
//       </Form.Item>
//       <Form.Item>
//         <Button
//           htmlType="submit"
//           loading={submitting}
//           onClick={onSubmit}
//           type="primary"
//         >
//           Add Comment
//       </Button>
//       </Form.Item>
//     </div>
//   );

//END COMMENTS CONTROLS-----------

export default class Page extends React.Component {

  static async getInitialProps({ req, res, query }) {
    let session = await NextAuth.init({ req });

    if (res && session && !session.user) {
      res.redirect('/auth/sign-in');
    }

    // Get page data
    let page = {};
    let pageResponse = await fetch(`${siteUrl}/api/v1/pages/${query.uri}?${noCache}`);
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



  render() {
    const fullName = this.state.user ? this.state.user.firstName + " " + this.state.user.lastName : "";
    const { comments, submitting, value, likes, dislikes, action } = this.state;

    let page = this.props.page ? this.props.page : "";
    let image = page && page.imageNames ? page.imageNames[0] : '';
    const pageContent = () => {
      return { __html: `${page.content}` }
    }

    return (
      <UniversalLayout {...this.props}>


        <div className="row " style={{ marginTop: '60px' }}>

          {/* CONTENT  */}
          <div className="col-lg-12 col-md-12 mx-auto text-center">

            {/* PAGE */}
            <div className="page_style">
              <div className='container page_image'
                style={{
                  backgroundColor: '#111',
                  backgroundImage: 'url(../' + image + ')',
                  backgroundSize: 'cover',
                  overflow: 'hidden',
                  backgroundPosition: "center center",
                  height: '40vh',
                  width: '95%'
                }}
              >
                <h1>{page.title}</h1>
              </div>

              <div
                className=" page_content  text-left mt-10"
              >
                {/* <img src={page.featuredImage} alt="featured image" style={{ height: 550, width: '100%' }} /> */}

                {/* <OnlyOnClient
                  placeholder={
                    <div  >
                    </div>
                  }
                  html={page.content} // this won't re-render
                /> */}

                <div dangerouslySetInnerHTML={pageContent()} />

              </div>
            </div>
            {/* ---------END PAGE----- */}


            {/* COMENTS */}
            {/* <div className="comments mt-4 d-block ">
              <h4>COMMENTS:</h4> */}
            {/* <div className="comments-list">
                <div className="media">
                  <p className="pull-right"><small>5 days ago</small></p>
                  <a className="media-left" href="#">
                    <img src="http://lorempixel.com/40/40/people/1/" />
                  </a>
                  <div className="media-body">
                    <h4 className="media-heading user_name">Johny Bravo</h4>
                    Wow! this is really great.
                        <p><small><a href="">Like</a> - <a href="">Share</a></small></p>
                  </div>
                </div>
              </div> */}


            {/* comments post      */}
            {/* <div className="w-75 mx-auto"> */}
            {/* {comments.length > 0 && <CommentList comments={comments} />} */}
            {/* <CommentList
                  comments={comments}
                />
                <Comment
                  // actions={actions}
                  author={<a>{fullName}</a>}
                  avatar={(
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt={fullName}
                    />
                  )}
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


          {/* RIGHT SIDE */}
          {/* <div className="col-lg-4 col-md-2">


          {/* --------------------- */}

        </div>

        {/* <FrontendUniversalStyles /> */}

      </UniversalLayout>
    );
  }
}