import React from 'react';
import { NextAuth } from 'next-auth/client';
import OnVisible, { setDefaultProps } from 'react-on-visible';
// import Typing from 'react-typing-animation';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import { withRouter } from 'next/router';
import LazyLoad from 'react-lazy-load';

import Head from 'next/head';

//Dynamic imports
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../layouts/TlcfertilityLayout'));
const ThankYouModal = dynamic(() => import('../components/modals/ThankYouModal'));
const Marker = dynamic(() => import('../components/maps/Marker'));
// const GoogleMap = dynamic(() => import('../components/maps/GoogleMaps'));


class Fertility extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let session = await NextAuth.init({ req });
    return {
      session: session,
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    };
  }
  constructor(props) {
    super(props);
    setDefaultProps({
      bounce: true,
      visibleClassName: 'appear',
      percent: 30
    });
    this.state = {
      session: this.props.session,
      scrolled: false,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      modalMessage: false
    };
    this.submitForm = this.submitForm.bind(this);
  }


  async submitForm(event) {
    event.preventDefault();
    const formData = {
      _csrf: await NextAuth.csrfToken(),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.dateOfBirth,
      email: this.state.email,
      phone: this.state.phone,
      subject: this.state.subject,
      message: this.state.message,
      action: 'add',
    };
    if (!this.state.firstName || !this.state.email || !this.state.message) {
      this.setState({ modalMessage: true });
    } else {
      const encodedForm = Object.keys(formData).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
      }).join('&');

      fetch('/api/v1/contact', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodedForm
      }).then(async res => {
        let response = await res.json();
        if (response.status === 'database_error') {
          console.log('database_error');
        }
        else if (response.status === 'item_added') {
          console.log('item_added');
        }
        else {
          console.log('unknown_status');
        }
      });

      this.setState({ modalMessage: false });
    }
  }

  render() {

    // let firstSentence = 'Welcome to tlc',
    // secondSentence = 'Tree of life center';

    return (

      <React.Fragment>

        <Layout {...this.props} section="home">

          <Head>
            <title>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center</title>
            <meta name="description" content="Modern Fertility Clinic in Los Angeles California - Board Certified Reproductive Endocrinology &amp; Infertility Subspecialists." />
            <meta name="keywords" content="treatments ivf, tree of life center, california, fertility los angeles, infertility, fertility care, fertility contact, fertility doctors, ivf clinic, egg donor program, treatment center,surrogacy program" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Top ❤ Fertility Center in Los Angeles, CA | Tree of Life Center Homepage" />
            <meta property="og:description" content="Modern Fertility Clinic in Los Angeles California - Board Certified Reproductive Endocrinology &amp; Infertility Subspecialists." />
            <meta property="og:url" content="https://www.tlcfertility.com/" />
            <meta property="og:site_name" content="Tree of Life Center" />
            <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />
          </Head>

          <h1 style={{ display: 'none' }}>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center, Infertility Clinic</h1>

          <section className="video-banner">
            <div className="overlay"></div>
            {/* <video playsInline={true} autoPlay={true} muted={true} loop={true}> */}
            {/* Desktop version */}
            {/* {/* <source src="/static/images/tlcfertility/TLCintrohead.mp4" type="video/mp4" media="screen and (min-width:800px)" />  */}
            {this.props.router.query.isMobile ? null :
              <video playsInline={true} autoPlay={true} muted={true} loop={true}>
                <source src="/static/images/tlcfertility/TLCintroheadDesk.webm" type="video/webm" />
              </video>
            }
            {/* Mobile version   */}
            {/* <source src="/static/images/tlcfertility/TLCintroheadOptimised.mp4" type="video/mp4" media="screen and (max-width:799px)" /> */}
            {/* < source src="/static/images/tlcfertility/TLCintroheadMob.webm" type="video/webm" className="video-mobile"/> */}

            {/* </video> */}
            <div className="container h-100">
              <div className="header-content d-flex h-100 text-center align-items-center">
                <div className="w-100 text-white">
                  <div className="header-image">
                    <img src={require("../static/images/tlcfertility/logo-sl-150x150.png?webp")} type="image/webp" alt="tlcfertility logo" />
                  </div>
                  <h3><span>T</span>ree <span>o</span>f <span>l</span>ife <span>c</span>enter</h3>
                  <h2>FERTILITY CENTER IN LOS ANGELES </h2>
                  <a title="contact" href="/contact">contact us</a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="row homepage fertility-success">

                <div className="headline col-12"><h2>Fertility & Success for Everyone</h2></div>
                <div className="col-lg-3 box">

                  <div className="box-image-outer">
                    <LazyLoad height={200} offsetVertical={150}>
                      <div className="box-image-inner" style={{ backgroundImage: 'url(/static/images/tlcfertility/pexels-photo-254069.jpeg)' }}>
                        <div className="image-hover-content">
                          <h5><a title="heterosexual-couples" href="/heterosexual-couples">get <br />started</a></h5>
                        </div>
                      </div>
                    </LazyLoad>
                  </div>


                  <div className="box-content">
                    <a title="heterosexual-couples" href="/heterosexual-couples">heterosexual couples</a>
                    <div className="under-header-line"></div>
                    <p>You are not alone. 1 in 8 couples will experience infertility. TLC provides hope, protection and support.</p>
                  </div>


                </div>


                <div className="col-lg-3 box">

                  <div className="box-image-outer">
                    <LazyLoad height={200} offsetVertical={150}>
                      <div className="box-image-inner" style={{ backgroundImage: 'url(/static/images/tlcfertility/pexels-photo-936006.jpeg)' }}>
                        <div className="image-hover-content">
                          <h5><a title="same-sex-couples" href="/lgbt">get <br />started</a></h5>
                        </div>
                      </div>
                    </LazyLoad>
                  </div>

                  <div className="box-content">
                    <a href="/lgbt" title="Same-sex couples">Same-Sex Couples</a>
                    <div className="under-header-line"></div>
                    <p>Proud to offer family-building options to deserving same-sex couples on their journey to parenthood.</p>
                  </div>
                </div>


                <div className="col-lg-3 box">

                  <div className="box-image-outer">
                    <LazyLoad height={200} offsetVertical={150}>
                      <div className="box-image-inner" style={{ backgroundImage: 'url(/static/images/tlcfertility/pexels-photo-979599.jpeg)' }}>
                        <div className="image-hover-content">
                          <h5><a title="singles" href="/singles">get <br />started</a></h5>
                        </div>
                      </div>
                    </LazyLoad>
                  </div>

                  <div className="box-content">
                    <a href="/singles" title="Singles">Singles</a>
                    <div className="under-header-line"></div>
                    <p>here are many reasons that you may decide to have a child without a partner. We are here to help. Visit out center in Los Angeles.</p>
                  </div>

                </div>

                <div className="col-lg-3 box">

                  <div className="box-image-outer">
                    <LazyLoad height={200} offsetVertical={150}>
                      <div className="box-image-inner" style={{ backgroundImage: 'url(/static/images/tlcfertility/pexels-photo-412263.jpeg)' }}>
                        <div className="image-hover-content">
                          <h5><a title="international" href="/international-patients">get <br />started</a></h5>
                        </div>
                      </div>
                    </LazyLoad>
                  </div>

                  <div className="box-content">
                    <a href="/international-patients" title="International patients">international</a>
                    <div className="under-header-line"></div>
                    <p>Our streamlined process and prominent international program is helping couples achieve parenthood.</p>
                  </div>

                </div>

              </div>
            </div>
          </section>


          <section className="tree-of-life"
          // style={{ backgroundImage: 'url(/static/images/tlcfertility/background3-min.jpg?webp)' }}
          >
            <div className="container">
              <div className="row homepage" >

                <div className="col-md-7 text-content">

                  <div className="above-header">
                    <h4>Hello</h4>
                    <div className="line"></div>
                  </div>

                  {/* <div className="headline">
                    <h2>Tree of life center</h2>
                  </div> */}

                  {/* <Typing speed={.2} loop={true} startDelay={1000} className="headlineContainer">

                    <div className="headlineTyped">
                      {firstSentence}
                      <Typing.Delay ms={2000} />
                      <Typing.Backspace count={firstSentence.length + 1} />
                      <Typing.Delay ms={500} />
                      {secondSentence}
                      <Typing.Delay ms={2000} />
                      <Typing.Backspace count={secondSentence.length + 1} />
                      <Typing.Delay ms={500} />
                    </div>

                  </Typing> */}


                  <div className="headlineContainer">

                    <div className="headlineTyped">
                      <h2>Welcome to tlc Tree of life center</h2>
                    </div>

                  </div>

                  <p>
                    <a title="drjovanovic" href="/drjovanovic/">Dr. Vuk Jovanovic</a> and Dr. Snunit Ben-Ozer provide top fertility care including
                    <a title="ivficsila" href="/ivficsila/"> IVF in Los Angeles</a> since 2004. Many of our patients travel from all parts of Los Angeles
                      and California to get the TLC they deserve. It does not matter if you need simple treatments for PCOS or advanced in vitro
                      fertilization with PGD or PGS – every patient will be given the full attention they deserve. While most patients visit us due
                      to infertility, we are experiencing increasing demand for gender selection and egg freezing.
                  </p>

                  <p>
                    We celebrate our 15th year anniversary with lots of REPRODUCTIVE TREATMENT SPECIALS. Please contact us to find out more.&nbsp;
                    <a title="our-clinic" href="/our-clinic">Our physicians</a> put together over 30 years of experience in reproductive medicine. This provides
                      you with high success rates regardless what fertility therapy we agree to pursue. While residents of Los Angeles can take
                      advantage of a booming fertility industry bringing new clinics and plenty of choice, many will value us for consistently
                      meeting high standards over many years. Tree of Life center has always been a proud member of the &nbsp;

                    <a title="sart" href="https://www.sart.org/patients/what-is-sart/">Society of Assisted Reproductive Technology (SART)</a>&nbsp;We have&nbsp;
                    <a title="sartcorsonline" href="https://www.sartcorsonline.com/Report/ClinicSummaryReportPublic?ClinicPKID=2188">publicly reported IVF pregnancy success rates since 2004</a>.
                    We have always been only staffed by physicians fully <a title="abog" href="https://www.abog.org/verify-physician?name=Vuk%20Jovanovic&amp;state=CA">board certified in reproductive endocrinology
                    &amp; infertility</a>. We are conveniently located in the San Fernando Valley and the airports in Burbank and Los Angeles serve as easy hubs. This way,
                      regardless where you live, you can always get your fertility treatment from our fertility doctors. While you are here, you can enjoy Calabasas, Malibu and Santa Monica and make
                      your fertility journey become a memorable trip to Southern California.
                  </p>

                  <a title="our-clinic" href="/our-clinic" className="link-button">learn more<span><i className="fas fa-info-circle"></i></span></a>

                </div>


                <OnVisible className="col-md-5 image-content slide-in-right">
                  {/* <LazyLoad height={500} offsetVertical={150}> */}
                  {this.props.router.query.isMobile
                    ? null
                    // <img src={require("../static/images/tlcfertility/transparent-image-min-e1524238673819mob.png?webp")} />
                    : <img src={require("../static/images/tlcfertility/transparent-image-min-e1524238673819.png?webp")} />
                  }
                  {/* </LazyLoad> */}
                </OnVisible>


              </div>
            </div>
          </section>



          <section>
            <div className="container">
              <div className="row homepage find-more" id="cards">

                <OnVisible className="col-12 logo-container">

                  <div></div>
                  <img src={require("../static/images/tlcfertility/logo_tp2-1.png?webp")} type="image/webp" alt="logo" />
                  <div></div>

                </OnVisible>

                <OnVisible className="col-md-4 find-more-box flip-in-ver-left">
                  <i className="far fa-file"></i>
                  <h5>treatments offered</h5>
                  <div className="line-grey"></div>
                  <p>Advanced Fertility Care | Women's Wellness</p>
                  <div className="find-more-button">
                    <a title="treatments" href="treatments" className="link-button">find out more<span><i className="fas fa-chevron-right"></i></span></a>
                  </div>
                </OnVisible>

                <OnVisible className="col-md-4 find-more-box flip-in-ver-left">
                  <i className="far fa-heart"></i>
                  <h5>Why choose tlc</h5>
                  <div className="line"></div>
                  <p>PLanting Seeds of Hope, Love and Life</p>
                  <div className="find-more-button">
                    <a title="clinic" href="/our-clinic" className="link-button">find out more<span><i className="fas fa-chevron-right"></i></span></a>
                  </div>

                </OnVisible>

                <OnVisible className="col-md-4 find-more-box flip-in-ver-left">
                  <i className="far fa-question-circle"></i>
                  <h5>Have questions</h5>
                  <div className="line"></div>
                  <p>Connect with us</p>
                  <div className="find-more-button">
                    <a title="clinic" href="/our-clinic" className="link-button">find out more<span><i className="fas fa-chevron-right"></i></span></a>
                  </div>
                </OnVisible>

              </div>
            </div>
          </section>

          <p style={{ display: 'none' }}>top, fertility, center, los, angeles,, -, tree, life, center</p>


          <section>
            <div className="container">
              <div className="row homepage connect">

                <div className="col-12 above-connect-image">
                  {this.props.router.query.isMobile
                    ? null
                    : <img src={require("../static/images/tlcfertility/above-connect.jpg?webp")} type="image/webp" alt="connect with us" />
                  }
                </div>

              </div>
            </div>


            <div className="row m-0 page homepage connect" id="contact">

              <div className="container">

                {/* <div className="form-section"> */}
                <div className="content col-12">

                  <div className="col-md-6 map-section">

                    {/* Goole map */}
                    {this.props.router.query.isMobile ? null :
                      <div id="map-container" style={{ height: '737px', width: "100%" }}>

                        <iframe frameBorder="0" style={{ width: "100%", height: "100%" }}
                          allowFullScreen
                          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJmVJAgKeZwoARcPhQO3YUaqc&key=AIzaSyAfmyYRsoBFB-U-ctBcXQ-M2LUK3GDTp_k">
                        </iframe>

                      </div>
                    }

                    {/* -------------------------------- */}


                  </div>

                  <div className="col-md-6 text-section border-none m-1">

                    <div className="form-section">

                      <div className="text-center">
                        <img src={require("../static/images/tlcfertility/logo_tp2-1.png?webp")} type="image/webp" alt="logo" />
                      </div>

                      <h2 className="font-weight-bold text-center">Connect with us</h2>
                      <p><span className="font-weight-bold">Address: </span>18370 Burbank Blvd, Suite 511, Tarzana, CA 91356, United States</p>
                      <p><span className="font-weight-bold">Phone: </span><a title="phone" href="tel:+1 818 344 8522" className="links-inline">+1 (818) 344-8522</a></p>
                      <p><span className="font-weight-bold">E-mail: </span><a title="mail" href="mailto:contact@tlcfertility.com" className="links-inline">email us</a></p>
                      <p style={{ display: 'none' }}>Top fertility center in Los Angeles</p>


                      <div className="inputs-inline">
                        <span className="add-icons">
                          <input type="text" value={this.state.firstName} onChange={(event) =>
                            this.setState({ firstName: event.target.value })} placeholder="First Name*" />
                        </span>

                        <span className="add-icons">
                          <input type="text" value={this.state.email} onChange={(event) =>
                            this.setState({ email: event.target.value })} placeholder="E-mail*" />
                        </span>
                      </div>

                      <span className="add-icons">
                        <input type="text" value={this.state.subject} onChange={(event) =>
                          this.setState({ subject: event.target.value })} placeholder="Subject" />
                      </span>
                      <span className="add-icons">
                        <textarea type="text" value={this.state.message} onChange={(event) =>
                          this.setState({ message: event.target.value })} placeholder="Message*" cols="40" rows="10"></textarea>
                      </span>

                      {/* <button onClick={this.submitForm}>contact us</button> */}
                      <button onClick={this.submitForm} type="button" className="btn btn-primary" data-toggle="modal" data-target="#thankYouModal">
                        contact us
                      </button>

                      <ThankYouModal modalMessage={this.state.modalMessage} firstName={this.state.firstName} lastName='' />

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}

            <p style={{ display: 'none' }}>top, fertility, center, los, angeles,, -, tree, life, center</p>

            <div className="container">
              <div className="row homepage connect">

                <div className="col-12 above-connect-image">
                  {this.props.router.query.isMobile
                    ? null
                    : <img src={require("../static/images/tlcfertility/picsea-3570401-unsplash.jpg?webp")} type="image/webp" alt="connect with us" />
                  }

                </div>

              </div>
            </div>

          </section>


        </Layout>

      </React.Fragment >
    );
  }
}


export default withRouter(Fertility)