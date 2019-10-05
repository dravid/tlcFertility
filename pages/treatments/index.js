import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../layouts/TlcfertilityLayout';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
const ThankYouModal = dynamic(() => import('../../components/modals/ThankYouModal'));


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

        this.setState({ modalMessage: false });

      });

    }
  }

  render() {
    return (

      <React.Fragment>

        <Head>
          <title>TREATMENTS Tree of Life Center</title>
          <meta name="description" content="We always attempt to restore your natural fertility first and aim to avoid complex fertility treatments." />
          <meta name="keywords" content="treatments ivf patients, tree of life center, california, fertility care, fertility tourism, infertility, ivf journey, egg donor program, treatment center,surrogacy program" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="TREATMENTS Tree of Life Center" />
          <meta property="og:description" content="We always attempt to restore your natural fertility first and aim to avoid complex fertility treatments." />
          <meta property="og:url" content="https://www.tlcfertility.com/treatments" />
          <meta property="og:site_name" content="Tree of Life Center" />
          <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />
        </Head>

        <Layout section="treatments">

          <div className="row m-0 page" id="international-couples">

            <div className="header" style={{ backgroundImage: 'url(/static/images/tlcfertility/nov.jpg?webp)' }}>

              <p className="header-button"><a href="/">Tree of Life Center</a> / <span>Treatments</span></p>

            </div>

            <div className="container">

              <h1 style={{ display: 'none' }}>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center, treatments</h1>

              <section>

                <div className="col-12 headline p-0"><h2>Fertility treatments at TLC LA</h2></div>

                <div className="content">
                  <div className="col-md-12 text-section">
                    <h3>Minimal treatments:</h3>
                    <p>
                      Our philosophy is to provide you with a treatment plan tailored to your situation. We always attempt to restore your
                      natural fertility first and aim to avoid complex fertility treatments. We like to perform a monitoring cycle and
                      check if there is a hormonal imbalance that can be easily fixed. Especially in cases of irregular periods, simple
                      treatments can create miracles. We also typically evaluate your partner with a semen analysis and hormonal workup.
                  </p>

                    <h3><a href="/amh99" className="links-headline">AMH testing and consultation</a></h3>

                    <p>
                      MH testing provides insight about the number of remaining eggs in the ovary. It is a valuable tool for women at any age.
                      It can help determine the risk for premature ovarian failure. We strongly recommend this test to every woman who plans
                      to reproduce in the future. We are happy to provide you with our special offer for an AMH test and consultation.
                      You can get tested across the United States regardless where you live.
                  </p>

                    <p><a href="/amh99" className="links-inline">AMH special</a></p>

                  </div>

                </div>

              </section>

              <section>

                <div className="content">
                  <div className="col-md-12 text-section">
                    <h3>Timed Intercourse</h3>
                    <p>
                      The most basic form of treatment, which assists patients’ timing of intercourse around their most fertility
                      days of the month. Find out more about this important element of conception. We determine your ovulation with
                      monitoring your ovulation and help you identify your most fertile days. The ultrasound evaluation provides
                      more insight than any other fertility app. We can ensure your follicle ruptures and your egg is released.
                      In rare cases you might be diagnosed with LUF (luteinized unruptred follicles) or luteal phase insufficiency.
                  </p>

                    {/* <h3><a href="/clomid" className="links-headline">Ovulation Induction</a></h3> */}

                    <p>
                      Some women experience inconsistent ovulation, which can make conception difficult. They suffer
                      from irregular or complete absence of menstrual periods. In many cases, simple fertility treatments
                      with oral medication (Clomid, Letrozole, Tamoxifen) can fully restore the natural ovulation process.
                      The effects can be quite impressive and once the ovulatory dysfunction is fixed, patients can mature
                      eggs again and get pregnant naturally.
                  </p>

                    <p><a href="/clomid" className="links-inline">Clomid FAQ</a></p>

                  </div>

                </div>

              </section>

              <section>

                <div className="content">
                  <div className="col-md-12 text-section">
                    <h3>Intrauterine Insemination (IUI)</h3>
                    <p>
                      IUI increases the number of sperm that can reach the Fallopian tube, subsequently increasing the chance of
                      fertilization. This treatment offers sperm an advantage by giving it a head start. Sperm also bypasses the
                      cervical mucus that in some cases inhibits the sperm progression. Best results are achieved when the IUI is
                      performed exactly at the time of spontaneous ovulation. An artificial ovulation trigger in form of hCG
                      (pregnancy hormone) can further optimize insemination timing.
                  </p>
                  </div>

                </div>

              </section>

              <section>

                <div className="col-12 headline p-0"><h2>Advanced fertility treatments</h2></div>

                <div className="content">
                  <div className="col-md-12 text-section border-none">
                    <h3>Supraovulation with gonadotropins</h3>
                    <p>
                      Aka controlled ovarian hyperstimulation. The process of inducing a woman to release more than one egg in a month.
                      It’s different from ovulation induction, where the goal is to release one egg a month.
                  </p>

                    <h3><a href="/ivficsila" className="links-headline">In Vitro Fertilization (IVF)</a></h3>

                    <p>
                      A more advanced procedure, in vitro fertilization (IVF) refers to when a physician will remove eggs from
                      your ovaries. These eggs are fertilized by sperm inside the lab. IVF has the highest success rate of treatments
                      that use your own eggs or sperm.
                  </p>

                    <p><a href="/ivficsila" className="links-inline"> Read More </a></p>

                    <h3><a href="/ivficsila" className="links-headline">Intracytoplasmic Sperm Injection (ICSI)</a></h3>

                    <p>
                      This treatment involves the direct injection of sperm into eggs obtained during in vitro fertilization (IVF).
                      Once the steps of ICSI have been completed and fertilization has succeeded, the embryo is transferred to the
                      woman’s uterus.
                  </p>

                    <p><a href="/ivficsila" className="links-inline"> Read More </a></p>

                    <h3>Frozen Embryo Transfer (FET)</h3>

                    <p>
                      A frozen embryo transfer is a type of IVF treatment where a cryopreserved embryo
                      (created during a full IVF cycle) is thawed and transferred to a woman’s uterus.
                      The cryopreserved embryo can be from a woman’s previous conventional IVF cycle or
                      it can be a donor embryo.
                  </p>

                    <h3>Elective single embryo transfer (eSet)</h3>

                    <p>
                      This treatment involves identifying an embryo with a strong chance of successful pregnancy, then transferring
                      that single embryo to the uterus. The lab “freezes” any additional healthy embryos for future use.
                  </p>

                    <h3>Mini IVF</h3>

                    <p>
                      Aka micro or minimal stimulation IVF. Similar to conventional IVF in the creation of the embryo happens outside
                      of the body during treatment. What’s different is how much medication is used to stimulate the ovaries to
                      produce eggs. While typical IVF aims to produce a higher number of eggs for retrieval, mini-IVF uses weaker
                      medications or lower doses of medications to produce only a few eggs. It may also be done without any ovarian
                      stimulating drugs and then it becomes natural IVF.
                  </p>

                    <h3>Natural IVF</h3>

                    <p>
                      Natural cycle IVF is a treatment similar to traditional, or stimulated, IVF, but without the use of
                      medications to stimulate the ovaries to produce multiple eggs. It may appeal to those who dislike medications
                  </p>

                    <h3>Gender Selection (PGS)</h3>

                    <p>
                      This is a process where embryos are selected by their sex chromosomes during an IVF cycle in order to
                      produce a male or female offspring, according to the wishes of the parents. This may be considered when
                      possible medical issues arise that are linked to x chromosome disorders
                  </p>

                    <h3><a href="/treatments" className="links-headline">Egg Freezing & Fertility Preservation </a></h3>

                    <p>
                      The process of saving or protecting eggs, sperm, or reproductive tissue so that a person can use
                  them to have biological children in the future. <a href="/eggfreezing" className="links-inline">
                        Women freeze their eggs</a> in order to proactively plan for their future as potential mothers.
                  Social <a href="/eggfreezing" className="links-inline">egg freezing</a> has quickly become the
                                                                                                                                                                              next logical step for women who wish to hold on to the dream of motherhood, but aren’t in the
                                                                                                                                                                              right situation to have children or are unsure.  When you are ready to take the next step in
                                                                                                                                                                              becoming a mother, whether it be through sperm donation or you and a partner find difficulty
                                                                                                                                                                              conceiving, your frozen eggs provide a backup option. The first step is for a woman to see her
                                                                                                                                                                              fertility doctor for an ultrasound and physical exam. On ultrasound the ovaries are measured and
                                                                                                                                                                              the number of follicles determined. A treatment calendar with a schedule of injectable fertility
                                                                                                                                                                              drugs is initiated. Using fertility medications for approximately ten days, multiple eggs begin to
                                                                                                                                                                              mature in the ovaries. Under sedation, the eggs are retrieved, a process that takes about 10-15
                                                                                                                                                                              minutes. The eggs are then cryopreserved and placed in frozen storage. At a later time, the eggs
                                                                                                                                                                              can be thawed, inseminated with sperm (ICSI is recommended), and the embryo(s) created transferred
                  back into the uterus to develop into a pregnancy. <a href="/treatments" className="links-inline">
                        Egg Freezing FAQ</a>
                    </p>

                    <h3>Preimplantation Genetic Diagnosis for single Gene disorders</h3>

                    <p>
                      This test allows patients who are carriers or who are affected by genetic diseases to select
                      unaffected embryos for transfer before becoming pregnant.
                  </p>

                    <h3>Preconceptional Genetic Testing</h3>

                    <p>
                      Aka carrier screening – this test is a way for a paent to get a glimpse at their own genetic makeup and
                      see what they may pass on to future children. A future parent may determine their risk of having a
                      child with a genetic disorder. Being a carrier means you don’t present with any symptoms but that you
                      have the gene and could potentially pass it along to your offspring.
                  </p>

                    <h3><a href="/tubal-reversal-surgery" className="links-headline">Tubal Reversal Surgery after Tubal Sterilization</a></h3>

                    <p>
                      This is a surgical procedure to restore fertility after a woman has had a tubal ligation — a process that
                  cuts or blocks the fallopian tubes to prevent pregnancy. During <a href="/tubal-reversal-surgery" className="links-inline">
                        reversal</a>, a surgeon will reopen, untie, or reconnect your fallopian tubes.
                  </p>

                    <p><a href="/tubal-reversal-surgery" className="links-inline">Tubal Reversal Info</a></p>

                    <h5>Please give us a call at (818) 344-8522 or contact us using the form below:</h5>

                    <div className="form-section">

                      <span>
                        <input type="text" value={this.state.firstName} onChange={(event) =>
                          this.setState({ firstName: event.target.value })} placeholder="First Name*" />
                      </span>
                      <span>
                        <input type="text" value={this.state.lastName} onChange={(event) =>
                          this.setState({ lastName: event.target.value })} placeholder="LastName*" />
                      </span>
                      <span>
                        <input type="text" value={this.state.dateOfBirth} onChange={(event) =>
                          this.setState({ dateOfBirth: event.target.value })} placeholder="Date of Birth*" />
                      </span>
                      <span>
                        <input type="text" value={this.state.email} onChange={(event) =>
                          this.setState({ email: event.target.value })} placeholder="E-mail*" />
                      </span>
                      <span>
                        <input type="text" value={this.state.phone} onChange={(event) =>
                          this.setState({ phone: event.target.value })} placeholder="Phone*" />
                      </span>
                      <span>
                        <input type="text" value={this.state.subject} onChange={(event) =>
                          this.setState({ subject: event.target.value })} placeholder="Subject" />
                      </span>
                      <span>
                        <textarea type="text" value={this.state.message} onChange={(event) =>
                          this.setState({ message: event.target.value })} placeholder="Message*" cols="40" rows="10"></textarea>
                      </span>

                      <button onClick={this.submitForm}>contact us</button>

                    </div>
                    <ThankYouModal modalMessage={this.state.modalMessage} firstName={this.state.firstName} lastName={this.state.lastName} />
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

