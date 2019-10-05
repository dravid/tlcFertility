import React from 'react';
import Layout from '../../layouts/TlcfertilityLayout'
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;

import Head from 'next/head';

const Singles = () => {
  return (

    <React.Fragment>
      <Layout section="singles">

        <Head>
          <title>Singles Tree of Life Center</title>
          <meta name="description" content="In our modern society, there can be many reasons that affect your decision to have a child without a partner." />
          <meta name="keywords" content="singles, intended parents, tree of life, fertility, family building, california, ivf, egg donor, sperm donor, top doctor, reproductive medicine, single mothers, single fathers" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Singles Tree of Life Center" />
          <meta property="og:description" content="In our modern society, there can be many reasons that affect your decision to have a child without a partner. " />
          <meta property="og:url" content="https://www.tlcfertility.com/singles" />
          <meta property="og:site_name" content="Tree of Life Center" />
          <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />
        </Head>

        <div className="row m-0 page" id="singles">

          <div className="header" style={{ backgroundImage: 'url(/static/images/tlcfertility/kevin-liang-header.jpg?webp)' }}>

            <p className="header-button"><a href="/">Tree of Life Center</a> / <span>Singles – Ready for your Donor Sperm or Eggs?</span></p>

          </div>

          <div className="container">

            <h1 style={{ display: 'none' }}>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center, singles</h1>

            <section>

              <div className="col-12 headline p-0"><h2>Singles</h2></div>

              <div className="content d-flex flex-md-row flex-column">
                <div className="col-12 text-section">
                  <p>
                    In our modern society, there can be many reasons that affect your decision to have a child without
                    a partner. Perhaps you want a child by a certain age, regardless of having a partner or not.
                    Perhaps you’re divorced but still longing for a child. Perhaps you picture yourself as a mother or
                    farther but not a wife or husband.Some individuals are focused on their career and having a baby
                    seems impossible. Some individuals simple choose to be single or are not in a partnership that
                    shares the same goals of parenthood. Maybe your life has been difficult to endure, and you have
                    lost hope to build a family. No matter the reason for single motherhood or single fatherhood, only
                    you can determine when — or even why you choose to build a family as a single parent.
              </p>
                </div>

              </div>

            </section>

            <section>

              <div className="col-12 headline p-0 text-center"><h5>Tree Of Life Fertility is here to help your dreams of motherhood or fatherhood come true.</h5></div>

              <div className="content d-flex flex-md-row flex-column">
                <div className="col-md-6 mr-md-2 text-section border-none">
                  <p>
                    There are many treatment options available to single women, whether using donor sperm or a known donor, or using more advanced
                    treatment options if your physician discovers infertility. For single men, becoming a father through surrogacy requires an egg
                    donor and a gestational carrier. In addition to clinical resources to help you become pregnant, our supportive team is there to
                    help you every step of the way!
              </p>
                  <div className="headline"> <h2>single motherhood</h2> </div>
                  <p>
                    TLC combines personalized care with innovative fertility treatments to fit your unique circumstances.
              </p>
                </div>

                <div className="col-md-6 ml-md-2 image-section" style={{ backgroundImage: 'url(/static/images/tlcfertility/kevin-liang.jpg?webp)' }}>

                </div>
              </div>

            </section>

            <section>

              <div className="col-12 headline p-0"><h2>treatment options</h2></div>

              <div className="content d-flex flex-md-row flex-column">
                <div className="col-md-6 mr-md-2 text-section border-none">
                  <h5>BASIC:</h5>

                  <p>Timed Intercourse</p>

                  <p>
                    The most basic form of treatment, which assists patients’ timing of intercourse around their most fertility
                    days of the month. Find out more about this important element of conception.
              </p>

                  <p>Ovulation Induction</p>

                  <p>
                    Some women experience inconsistent ovulation, which can make conception difficult.
                    Learn how ovulation induction can help you on your journey.
              </p>

                  <h5>Intrauterine Insemination <span>(IUI)</span></h5>

                  <p>
                    IUI increases the number of sperm that reach the Fallopian tube, subsequently increasing the chance of fertilization.
                    This treatment offers sperm an advantage by giving it a head start.
              </p>

                </div>

                <div className="col-md-6 ml-md-2 image-section" style={{ backgroundImage: 'url(/static/images/tlcfertility/Five-annual-exams-every-woman-should-have.jpg?webp)' }}>

                </div>
              </div>

            </section>

            <section>

              <div className="content">
                <div className="col-12 text-section border-none">

                  <h5>ADVANCED:</h5>

                  <h5>Supraovulation</h5>

                  <p>
                    Aka controlled ovarian hyperstimulation. The process of inducing a woman to release more than one egg in a month.
                    It’s different from ovulation induction, where the goal is to release one egg a month.
            </p>

                  <h5>In Vitro Fertilization <span>(IVF)</span></h5>

                  <p>
                    A more advanced procedure, in vitro fertilization (IVF) refers to when a physician will remove eggs from your ovaries.
                    These eggs are fertilized by sperm inside the lab. IVF has the highest success rate of treatments that use your own
                    eggs or sperm.
            </p>

                  <h5>Intracytoplasmic Sperm Injection <span>(ICSI)</span></h5>

                  <p>
                    This treatment involves the direct injection of sperm into eggs obtained during in vitro fertilization (IVF).
                    Once the steps of ICSI have been completed and fertilization has succeeded, the embryo is transferred to the woman’s
                    uterus.
            </p>

                  <h5>Frozen Embryo Transfer <span>(FET</span>)</h5>

                  <p>
                    A frozen embryo transfer is a type of IVF treatment where a cryopreserved embryo (created during a full IVF cycle)
                    is thawed and transferred to a woman’s uterus. The cryopreserved embryo can be from a woman’s previous conventional
                    IVF cycle or it can be a donor embryo.
            </p>

                  <h5>Elective single embryo transfer <span>(eSet)</span></h5>

                  <p>
                    This treatment involves identifying an embryo with a strong chance of successful pregnancy, then transferring that
                    single embryo to the uterus. The lab “freezes” any additional healthy embryos for future use.
            </p>

                  <h5>Mini IVF</h5>

                  <p>
                    Aka micro or minimal stimulation (IVF). Similar to conventional IVF in the procedures used during treatment.
                    What’s different is how much medication is used to stimulate the ovaries to produce eggs. While typical IVF aims to
                    produce several eggs for retrieval, mini-IVF uses weaker medications or lower doses of medications to produce only a
                    few eggs. It may also be done without any ovarian stimulating drugs.
            </p>

                  <h5>Natural IVF</h5>

                  <p>
                    Natural cycle IVF is a treatment similar to traditional, or stimulated, IVF, but without the use of medications to
                    stimulate the ovaries to produce multiple eggs. It may appeal to those who dislike medications.
            </p>

                  <h5>Genetic Testing</h5>

                  <p>
                    Genetic testing is a type of medical test that identifies changes in chromosomes, genes, or proteins.
                    The results of a genetic test can confirm or rule out a suspected genetic condition or help determine a person’s
                    chance of developing or passing on a genetic disorder. More than 1,000 genetic tests are currently in use, and
                    more are being developed.
            </p>

                  <h5>Gender Selection (PGS)</h5>

                  <p>
                    This is a process where embryos are selected by their sex chromosomes during an IVF cycle in order to produce a
                    male or female offspring, according to the wishes of the parents. This may be considered when possible medical issues
                    arise that are linked to x chromosome disorders.
            </p>

                  <h5>Fertility Preservation</h5>

                  <p>
                    The process of saving or protecting eggs, sperm, or reproductive tissue so that a person can use them to
                    have biological children in the future. The first step is for a woman to see her fertility doctor for an
                    ultrasound and physical exam. On ultrasound the ovaries are measured and the number of follicles determined.
                    A treatment calendar with a schedule of injectable fertility drugs is initiated.
            </p>

                  <p>
                    Using fertility medications for approximately ten days, multiple eggs begin to mature in the ovaries.
                    Under sedation, the eggs are retrieved, a process that takes about 10-15 minutes. The eggs are then cryopreserved
                    and placed in frozen storage.
            </p>

                  <p>
                    At a later time, the eggs can be thawed, inseminated with sperm (ICSI is recommended),
                    and the embryo(s) created transferred back into the uterus to develop into a pregnancy.
            </p>

                  <h5>Preimplantation Genetic Diagnosis for single Gene disorders</h5>

                  <p>
                    This test allows patients who are carriers or who are affected by genetic diseases to select unaffected embryos
                    for transfer before becoming pregnant.
            </p>

                  <h5>Preconceptional Genetic Testing</h5>

                  <p>
                    Aka carrier screening – this test is a way for a paent to get a glimpse at their own genetic
                    makeup and see what they may pass on to future children. A future parent may determine their risk of
                    having a child with a genetic disorder. Being a carrier means you don’t present with any symptoms but
                    that you have the gene and could potentially pass it along to your offspring.
            </p>

                  <h5>Tubal Reversal Surgery after Tubal Sterilization</h5>

                  <p>
                    This is a procedure to restore fertility after a woman has had a tubal ligation — a process that cuts or blocks
                    the fallopian tubes to prevent pregnancy. During reversal, a surgeon will reopen, untie, or reconnect your fallopian tubes.
            </p>

                </div>

              </div>

            </section>

            <section>

              <div className="col-12 headline p-0"><h2><a href="/eggfreezing">EGG FREEZING</a></h2></div>

              <div className="content">

                <div className="col-12 text-section">
                  <p>
                    Women <a href="/eggfreezing" className="links-inline">freeze their eggs</a> in order to proactively plan for their future as potential mothers.
              <a href="/eggfreezing" className="links-inline">&nbsp;Egg freezing</a> has quickly become the next logical step for women who wish to hold on
                                                      to the dream of motherhood, but aren’t in the right situation to have children or are unsure.  When you are ready
                                                      to take the next step in becoming a mother, whether it be through sperm donation or you and a partner find difficulty
                                                      conceiving, your frozen eggs provide a backup option.
              </p>
                </div>

              </div>

            </section>

            <section>

              <div className="content d-flex flex-md-row flex-column">

                <div className="col-md-4 mr-md-2 image-section" style={{ backgroundImage: 'url(/static/images/tlcfertility/caleb-jones.jpg?webp)' }}>

                </div>

                <div className="col-md-8 ml-md-2 text-section border-none">

                  <h2>OPTIONS FOR SINGLE FATHERHOOD</h2>

                  <p className="border-bottom">
                    Single dads are becoming increasingly common. Many men, like their female counterparts, spend their twenties
                    and early thirties focused on education and career. As the years pass, and the search for the right partner marches on,
                    you may find yourself exploring the possibility of having a child on your own. The method by which you become a dad is
                    entirely up to you!
              </p>

                  <h2>TREATMENT OPTIONS</h2>

                  <h5>Egg Donation & Surrogacy Services</h5>

                  <p>
                    Egg donation and surrogacy are necessary to create and grow your family. During gestational surrogacy,
                    the surrogate carries a child conceived of your sperm and a donated egg (in some cases, donor sperm may be used instead).
                     The sperm of you or your sperm donor, as well as the egg from an egg donor, are fertilized and transferred via IVF
                     into the gestational carrier.
              </p>

                </div>

              </div>

            </section>

          </div>

        </div>

      </Layout>

    </React.Fragment>


  )
};

export default Singles;