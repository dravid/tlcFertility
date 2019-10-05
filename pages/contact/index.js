import React from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;

import Head from 'next/head';

import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../../layouts/TlcfertilityLayout'));
const ThankYouModal = dynamic(() => import('../../components/modals/ThankYouModal'));
const Marker = dynamic(() => import('../../components/maps/Marker'));


export default class extends React.Component {

  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ req }),
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      subject: '',
      message: '',

      modalMessage: false,

      session: this.props.session
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

    if (!this.state.firstName || !this.state.lastName ||
      !this.state.dateOfBirth || !this.state.email ||
      !this.state.phone || !this.state.message) {

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

        //return await res.json();
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


    return (

      <React.Fragment>
        <Layout section='contact'>

          <Head>
            <title>Contact Us Tree of Life Center</title>
            <meta name="description" content="Here at Tree of Life Fertility Center (TLC), contact us via phone mail or send us message and we will respond promptly." />
            <meta name="keywords" content="treatments ivf patients, tree of life center, california, fertility care, fertility contact, contact doctors, ivf contact, egg donor program, treatment center,surrogacy program" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Contact Us Tree of Life Center" />
            <meta property="og:description" content="Here at Tree of Life Fertility Center (TLC), we have been helping individuals and couples face these frustrating circumstances and ultimately plant seeds of hope, love and life." />
            <meta property="og:url" content="https://www.tlcfertility.com/heterosexual-couples" />
            <meta property="og:site_name" content="Tree of Life Center" />
            <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />
          </Head>


          <div className="row m-0 page" id="contact">

            <div className="container">
              <h1 style={{ display: 'none' }}>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center, contact us</h1>

              <div className="form-section">
                <div className="content d-flex flex-md-row flex-column">
                  <div className="col-md-6 text-section border-none">

                    <div className="form-section">

                      <span className="add-icons">
                        <input type="text" value={this.state.firstName} onChange={(event) =>
                          this.setState({ firstName: event.target.value })} placeholder="First Name*" />
                      </span>
                      <span className="add-icons">
                        <input type="text" value={this.state.lastName} onChange={(event) =>
                          this.setState({ lastName: event.target.value })} placeholder="Last Name*" />
                      </span>
                      <span className="add-icons">
                        <input type="text" value={this.state.dateOfBirth} onChange={(event) =>
                          this.setState({ dateOfBirth: event.target.value })} placeholder="Date of Birth*" />
                      </span>
                      <span className="add-icons">
                        <input type="text" value={this.state.email} onChange={(event) =>
                          this.setState({ email: event.target.value })} placeholder="E-mail*" />
                      </span>
                      <span className="add-icons">
                        <input type="text" value={this.state.phone} onChange={(event) =>
                          this.setState({ phone: event.target.value })} placeholder="Phone*" />
                      </span>
                      <span className="add-icons">
                        <input type="text" value={this.state.subject} onChange={(event) =>
                          this.setState({ subject: event.target.value })} placeholder="Subject" />
                      </span>
                      <span className="add-icons">
                        <textarea type="text" value={this.state.message} onChange={(event) =>
                          this.setState({ message: event.target.value })} placeholder="Message*" cols="40" rows="10"></textarea>
                      </span>

                      <button onClick={this.submitForm} type="button" className="btn btn-primary" data-toggle='modal' data-target="#thankYouModal">
                        contact us
                    </button>

                      <ThankYouModal modalMessage={this.state.modalMessage} firstName={this.state.firstName} lastName={this.state.lastName} />


                      <h5 className="font-weight-bold">Main Office</h5>
                      <p>18370 Burbank Blvd, Suite 511</p>
                      <p>Tarzana, California 91356</p>
                      <p>United States of America</p>
                      <p><span className="font-weight-bold">Phone: </span><a href="tel:+1 818 344 8522" className="links-inline">+1 (818) 344-8522</a></p>
                      <p><span className="font-weight-bold">Fax: </span><a href="tel:+1 818 344 8522" className="links-inline">+1 (818) 344-8521</a></p>
                      <p><span className="font-weight-bold">E-mail: </span><a href="mailto:contact@tlcfertility.com" className="links-inline">email us</a></p>
                      <p><span className="font-weight-bold">Skype: </span>drvukjovanovic</p>
                      <p><span className="font-weight-bold">WeChat: </span>USExpert16</p>

                    </div>

                  </div>

                  <div className="col-md-6 pl-0 pr-0">

                    {/* Goole map */}
                    <div style={{ height: '620px', width: "100%" }}>

                      <iframe frameBorder="0" style={{ width: "100%", height: "100%" }}
                        allowFullScreen
                        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJmVJAgKeZwoARcPhQO3YUaqc&key=AIzaSyAfmyYRsoBFB-U-ctBcXQ-M2LUK3GDTp_k">
                      </iframe>

                    </div>
                    {/* -------------------------------- */}


                  </div>

                </div>
              </div>

              <section>


                <div className="content">
                  <div className="col-md-12 text-section border-none">
                    <p>
                      We are not only the to go center for fertility in Tarzana, we provide &nbsp;
                    <a title="contact_treatments" href="/treatments" className="links-inline"> IVF </a> to the Los Angeles Metro Area
                                                                                          and have patients commuting from the entire Southern California region to visit our &nbsp;
                    <a title="contact_ourclinic" href="/our-clinic" className="links-inline"> infertility specialists</a>.
                                                                                          While you might feel the best fertility doctors are too far from where you live, modern technology will
                                                                                          connect you right away to our &nbsp;
                    <a title="contact_ourclinic" href="/our-clinic" className="links-inline"> reproductive endocrinologists </a>
                      &nbsp;regardless how far away you are from Los Angeles. Our &nbsp;
                    <a title="contact_ourclinic" href="/our-clinic" className="links-inline"> infertility specialists </a> are looking forward to connect to our
                                                                                          patients and prospective parents seeking fertility treatments via Phone, Email, Skype, WhatsApp, WeChat and
                                                                                          Facetime. We will respond to your inquiries within 24 hours and we will try our best to find the easiest way to
                                                                                          communicate with you. This way you can establish a relationship to our &nbsp;
                    <a title="contact_ourclinic" href="/our-clinic" className="links-inline"> physicians </a> and staff and have an initial consultation
                                                                                          online. We maintain an electronic medical record with a patient portal, so this way you will be able to
                                                                                          login-in at your leisure and download all relevant labs, ultrasounds and embryology results, regardless where you live.
                                                                                          We are able to order labs for you at your closest LabCorp location for patients across the United States.
                                                                                          For our international patients, we maintain relationships with colleagues across the world that will help
                                                                                          you initiate the required testing.
                    </p>
                  </div>
                </div>

              </section>

            </div> {/* CONTAINER */}
          </div> {/* ROW */}

        </Layout>
      </React.Fragment>

    )
  }
}

