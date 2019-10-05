import React from 'react';
import Layout from '../../layouts/TlcfertilityLayout';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;

import { NextAuth } from 'next-auth/client';

import Head from 'next/head';

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

      session: this.props.session
    };
    this.submitForm = this.submitForm.bind(this);


  }

  async submitForm(event) {
    event.preventDefault();

    const formData = {
      _csrf: await NextAuth.csrfToken(),
      firstName: this.state.firstName,
      email: this.state.email,
      phone: this.state.phone,
      action: 'add',
    };

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
  }

  render() {
    return (

      <React.Fragment>
        <Layout section="international">

          <Head>
            <title>International Patients Tree of Life Center</title>
            <meta name="description" content="Here at TLC, we offer flexible travels plans, an elite egg donor and surrogacy program — as well as a streamlined, effective treatment process." />
            <meta name="keywords" content="international ivf patients, tree of life center, california, fertility care, fertility tourism, international travel, infertility, ivf journey, egg donor program, surrogacy program" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="International Patients Tree of Life Center" />
            <meta property="og:description" content="Here at TLC, we offer flexible travels plans, an elite egg donor and surrogacy program — as well as a streamlined, effective treatment process." />
            <meta property="og:url" content="https://www.tlcfertility.com/international-patients" />
            <meta property="og:site_name" content="Tree of Life Center" />
            <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />
          </Head>

          <div className="row m-0 page" id="international-couples">

            <div className="header" style={{ backgroundImage: 'url(/static/images/tlcfertility/tlcredo-min.jpg?webp)' }}>

              <p className="header-button"><a href="/">Tree of Life Center</a> / <span>International Patients</span></p>

            </div>

            <div className="container">

              <h1 style={{ display: 'none' }}>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center, international patients</h1>

              <div className="row">

                <div className="col-md-9 main-section">

                  <section>

                    <div className="content">

                      <div className="col-12 text-section">
                        <p>
                          For the past 15 years, men and women from over 10 countries have traveled to Tree of Life Center to participate
                          in our renowned International Fertility Program. Here at TLC, we offer flexible travels plans, an elite egg donor
                          and surrogacy program — as well as a streamlined, effective treatment process.
                      </p>
                      </div>

                    </div>

                  </section>

                  <section>

                    <div className="content">
                      <div className="col-12 text-section">

                        <div className="d-flex justify-content-between">
                          <i style={{ marginRight: 10 }} className="fas fa-quote-right fa-3x"> </i>
                          <h4 className="blockquote-text">
                            We work relentlessly, alongside our loving patients, to help them build the family they've always dreamed of.
                            Earning their trust and knowing that many recommend us to others is extremely fulfilling.
                        </h4>
                        </div>

                        <h3>
                          Why IVF in California?
                      </h3>

                        <p>
                          Every day we successfully accommodate our international patients, working as an unswerving network of caring professionals
                          to modernize your journey to parenthood. From treatment plans to long-distance communication — we have simplified the
                          logistics involved in coordinating international care on your behalf. At the leading fertility center in California, we strive
                          to make this journey as stress-free as possible, so you can focus your energy on achieving your fertility goals on a natural timeline.
                      </p>

                      </div>

                    </div>

                  </section>

                  <section>

                    <div className="content">
                      <div className="col-12 text-section">

                        <h3>
                          Success with Tree of Life
                      </h3>

                        <p>
                          Our high success rates, personalized service, and affordable treatment options set TLC apart as a fertility tourism destination.
                          Some additional services that appeal to our international patients include:
                      </p>

                        <ul className="list-section">
                          <li>comprehensive array of fertility treatments</li>
                          <li>convenient initial consultations via phone or Skype</li>
                          <li>thorough review of your medical records</li>
                          <li>fertility treatment plans that work around your schedule</li>
                          <li>coordinated care with your OB/GYN at home</li>
                        </ul>

                      </div>

                    </div>

                  </section>

                  <section>

                    <div className="content">
                      <div className="col-12 text-section border-none">

                        <h3>
                          Success with Tree of Life
                      </h3>

                        <p>
                          In order to coordinate all aspects of your treatment to minimize your travel time, the leading fertility center in
                          California is dedicated to collaborative communication with your local doctor. We coordinate with centers from all
                          around the world to ensure the treatment plan progresses each step of the way.
                      </p>

                        <p>
                          Never worry about a language barrier — as our team will provide you assistance or an interpreter to help guide your journey at Tree of Life Center.
                      </p>

                      </div>

                    </div>

                  </section>

                </div>

                <div className="col-md-3 side-section">
                  <div className="form-section d-flex flex-column">

                    <h3> Connect With Us</h3>

                    <p>Planting Seeds of Love.</p>

                    <input type="text" value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} placeholder="Name" />
                    <input type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} placeholder="Phone" />
                    <input type="text" value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} placeholder="Email" />

                    <button
                      onClick={this.submitForm}
                    >SEND</button>

                  </div>

                  <div className="banner-section">
                    <img src={require("../../static/images/tlcfertility/TLCIG4-2.jpg?webp")} alt="Dr. Vuk Jovanovic" />
                  </div>

                  <div className="banner-section">
                    <img src={require("../../static/images/tlcfertility/TLCIG5-e1523380622155.jpg?webp")} alt="Dr. Snunit Ben-Ozer" />
                  </div>

                </div>

              </div>

            </div>

          </div>
        </Layout>
      </React.Fragment>
    )
  }
};
