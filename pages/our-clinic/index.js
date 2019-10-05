import React from 'react';
import Layout from '../../layouts/TlcfertilityLayout';
import LazyLoad from 'react-lazy-load';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;

import Head from 'next/head';

const OurClinic = () => {
  return (

    <React.Fragment>
      <Layout section="doctors">

        <Head>
          <title>OUR CLINIC Tree of Life Center</title>
          <meta name="description" content="Our philosophiy is to provide individualized treatment and not only assign premade protocols to different groups of patients. " />
          <meta name="keywords" content="treatments ivf patients, tree of life center, california, fertility care, fertility doctors, infertility doctors, ivf clinic, egg donor program, treatment center,surrogacy program" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="OUR CLINIC Tree of Life Center" />
          <meta property="og:description" content="Our philosophiy is to provide individualized treatment and not only assign premade protocols to different groups of patients. " />
          <meta property="og:url" content="https://www.tlcfertility.com/our-clinic" />
          <meta property="og:site_name" content="Tree of Life Center" />
          <meta property="og:image" content={siteUrl + "/static/images/logo.png"} />
        </Head>

        <div className="row m-0 page" id="doctors">

          <div className="full-width-content">

            <h1 style={{ display: 'none' }}>Top ❤ Fertility Center in Los Angeles, CA - Tree of Life Center, doctors, our clinic</h1>


            <div className="doctor-text-section">

              <div className="logo-container">
                <div></div>
                <img src="/static/images/tlcfertility/white-tlc-150x87.png" alt="tlfertility logo" />
                <div></div>
              </div>

              <h2>Dr. Snunit Ben-Ozer</h2>

              <h4>Tree of Life Center Founder</h4>

              <h5>Board Certified in Reproductive Endocrinology & Infertility (REI) and Obstetrics & Gynecology</h5>

              <p>Fellowship: <span>University of California, San Diego, CA</span></p>
              <p>Residency: <span>Case Western Reserve University, Cleveland, OH</span></p>

              <a title="snunit" href="https://www.yelp.com/biz/snunit-ben-ozer-md-tree-of-life-tarzana" className="review-img" alt="yelp.com doctor reviews" target="blank">
                <img src="/static/images/tlcfertility/RpROmEb98J9jKGL4FG3W5g.png" alt="doctor reviews" />
              </a>

              <ul className="social-icons-list">
                <li><a title="twitter" href="http://twitter.com/vukytw" alt="twitter" target="blank"><i className="fab fa-twitter"></i></a></li>
                <li><a title="dribble" href="http://dribbble.com" alt="dribbble" target="blank"><i className="fab fa-dribbble"></i></a></li>
                <li><a title="instagram" href="http://instagram.com/tlcfertility" alt="instagram" target="blank"><i className="fab fa-instagram"></i></a></li>
              </ul>
            </div>

            <div className="doctor-image-section" style={{ backgroundImage: 'url(/static/images/tlcfertility/QQ1A0735-2-min.jpg)' }}>

            </div>

          </div>

          <div className="full-width-content">

            <div className="doctor-image-section" style={{ backgroundImage: 'url(/static/images/tlcfertility/QQ1A0582-2-min.jpg)' }}>

            </div>

            <div className="doctor-text-section">

              <div className="logo-container">
                <div></div>
                <img src="/static/images/tlcfertility/white-tlc-150x87.png" alt="tlfertility logo" />
                <div></div>
              </div>

              <h2><a href="/drjovanovic" alt="Dr. Vuk Jovanovic">Dr. Vuk Jovanovic</a></h2>

              <h4>Tree of Life Center, Medical Director</h4>

              <h5>Board Certified in Reproductive Endocrinology & Infertility (REI) and Obstetrics & Gynecology</h5>

              <p>Fellowship: <span>Columbia University Medical Center, New York, NY</span></p>

              <p>Residency: <span>Duke University Medical Center, Durham, NC</span></p>

              <div className="rating-container">
                <a href="https://www.yelp.com/biz/vuk-jovanovic-md-facog-tree-of-life-tarzana" alt="yelp.com doctor reviews" target="blank">
                  <img src="/static/images/tlcfertility/CLJTcNeu0u2yLIv1UHx8pw.png" alt="doctor reviews" />
                </a>

                <div className="rater8">
                  <iframe src=" https://reviews.rater8.com/WebWidget/api/ratingsummary/a52b4311?format=htmlphysicianrating" frameBorder="0"></iframe>
                </div>
                {/* <button className="btn show-reviews" type="button" data-toggle="modal" data-target="#exampleModal" data-whatever="DR. VUK JOVANOVIC">My Reviews</button> */}

                <ul className="social-icons-list">
                  <li><a href="http://twitter.com/vukytw" alt="twitter" target="blank"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="http://dribbble.com" alt="dribbble" target="blank"><i className="fab fa-dribbble"></i></a></li>
                  <li><a href="http://instagram.com/tlcfertility" alt="instagram" target="blank"><i className="fab fa-instagram"></i></a></li>
                </ul>

              </div>

            </div>

          </div>


          <LazyLoad height={400} width='100%' offsetVertical={150}>
            <div className="video-container w-100" style={{ backgroundImage: 'url(/static/images/tlcfertility/TLCinnerbanner1-e1523304327788.jpg)' }}>
              <div className="container d-flex flex-md-row flex-column justify-content-around">

                <div className="col-md-6 text-center">
                  <iframe className="youtube-player" type="text/html"
                    src="https://www.youtube.com/embed/YGZO30Td6RU?version=3&amp;rel=1&amp;fs=1&amp;autohide=2&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent"
                    allowFullScreen={true} style={{ border: 0 }}></iframe>
                </div>

                <div className="col-md-6 text-center">
                  <iframe className="youtube-player" type="text/html" width="100%" height="auto"
                    src="https://www.youtube.com/embed/xwHuWoVHIOY?version=3&amp;rel=1&amp;fs=1&amp;autohide=2&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent"
                    allowFullScreen={true} style={{ border: 0 }}></iframe>
                </div>
              </div>
            </div>
          </LazyLoad>


          {/* <LazyLoad height={630} width='100%' offsetVertical={150}> */}
          <div className="gallery-section w-100 text-center">

            <div className="gallery-section-logo-container">
              <div></div>
              <img src="/static/images/tlcfertility/logo_tp2-1.png" alt="logo" />
              <div></div>
            </div>

            <div className="gallery-images">
              <div className="image-wrapper">
                <a href="#">
                  <img src={require("../../static/images/tlcfertility/QQ1A0614-min-e1524239359665.jpg?webp")} />
                </a>
              </div>

              <div className="image-wrapper">
                <a href="#">
                  <img src={require("../../static/images/tlcfertility/QQ1A0780-min-e1524239077522.jpg?webp")} />
                </a>
              </div>

              <div className="image-wrapper">
                <a href="#">
                  <img src={require("../../static/images/tlcfertility/QQ1A0936-min-e1524239127481.jpg?webp")} />
                </a>
              </div>

              <div className="image-wrapper">
                <a href="#">
                  <img src={require("../../static/images/tlcfertility/QQ1A1097-min-e1524238921730.jpg?webp")} />
                </a>
              </div>

            </div>

          </div>
          {/* </LazyLoad> */}

          <div className="container">

            <section>

              <div className="col-12 headline p-0 text-center"><h2>Why are our doctors unique?</h2></div>

              <div className="content">
                <div className="col-12 text-center text-section border-none">
                  <p>
                    Dr. Jovanovic and Dr. Ben-Ozer have an outstanding academic track record. Dr. Jovanovic completed both his
                    residency and fellowship at Ivy League schools and is double board certified in Reproductive endocrinology
                    and infertility. Dr. Ben-Ozer has been providing exceptional care for over 15 years and is a highly valued
                    physician in Los Angeles. Both doctors have dedicated their entire careers to treat patients who have fertility problems.
                    </p>
                  <p>
                    Our philosophiy is to provide individualized treatment and not only assign premade protocols to different groups of patients.
                    We strongly believe that while we want to restore the ability to reproduce, we want to do this with minimal intervention.
                    This means that we take special care not to over prescribe medication or drugs and we always maintain a rationale to justify
                    why a patient is receiving the medication and whatever trying to achieve. What we do rely on help from our nurses, our
                    doctors are going to be involved in every little step of your treatment.
                    </p>
                </div>

              </div>

            </section>

          </div>

          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">DR. VUK JOVANOVIC</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <iframe src="https://reviews.rater8.com/doctor/dr-vuk-jovanovic-md-tarzana-ca-a52b4311" frameBorder="0"></iframe>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </Layout>
    </React.Fragment>
  )
};

export default OurClinic;