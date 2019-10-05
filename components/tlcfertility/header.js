import React from 'react';
import Link from 'next/link'

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scrolled: '',
      active: this.props.section ? this.props.section : '',
    }
  }

  componentDidMount = async () => {

    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (!isTop) {
        this.setState({ scrolled: 'scrolled' });
      } else {
        this.setState({ scrolled: '' });
      }
    });
  }

  componentWillUnmount = () => {

    document.removeEventListener('scroll', () => { });
  }


  render() {

    let active = this.state.active;

    return (

      <header id="header" className={this.state.scrolled}>

        <div className="row m-0 above-nav">

          <div className="d-flex above-nav-left">
            <div className="above-nav-social">
              <a title="facebook" href="https://facebook.com/TLCfertility">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a title="twitter" href="https://twitter.com/vukytw">
                <i className="fab fa-twitter"></i>
              </a>
              <a title="youtube" href="https://www.youtube.com/channel/UCLlShFndstG6S52uC_yoWxA">
                <i className="fab fa-youtube"></i>
              </a>
              <a title="instagram" href="https://www.instagram.com/tlcfertility/">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="above-nav-text">
              <p>Tree of life center turns fifteen - we are celebrating 15 years of successful fertility care and women's wellness</p>
            </div>
          </div>

          <div className="d-flex justify-content-end above-nav-right">
            <div className="above-nav-phone"><a title="phone" href="tel:+1 818 344 8522" ><i className="fas fa-phone"></i></a><span>appointments (818) 344 - 8522</span></div>
            <div className="above-nav-mail"><a title="mail" href="mailto:contact@tlcfertility.com"><i className="fas fa-envelope"></i></a></div>
          </div>

        </div>

        <nav className="navbar navbar-expand-lg d-flex justify-content-between" role="navigation">
          <div className="logo-container">
            <Link href="/">
              <a title="brand" className="navbar-brand"><img className="" alt="logo" src={require("../../static/images/logo.png?webp")} /></a>
            </Link>
          </div>

          <div className="nav-container">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <div></div>
              <div></div>
              <div></div>
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">

              <ul className="navbar-nav">

                <li className="nav-item">
                  <Link href="/" >
                    <a title="home" className={active === 'home' ? "nav-link active" : "nav-link "}>Home<span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                <li className="nav-item" >
                  <Link href="/heterosexual-couples" >
                    <a title="heterosexual" className={active === 'heterosexual' ? "nav-link active" : "nav-link "}>Heterosexual couples<span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/lgbt" >
                    <a title="lgbt" className={active === 'lgbt' ? "nav-link active" : "nav-link "}>lgbt <span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/singles" >
                    <a title="singles" className={active === 'singles' ? "nav-link active" : "nav-link "}>Singles<span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/international-patients" >
                    <a title="international" className={active === 'international' ? "nav-link active" : "nav-link "}>International<span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/treatments" >
                    <a title="treatments" className={active === 'treatments' ? "nav-link active" : "nav-link "}>Treatments<span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/our-clinic" >
                    <a title="doctors" className={active === 'doctors' ? "nav-link active" : "nav-link "}>Doctors<span className="sr-only">(current)</span></a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact" >
                    <a title="contact" className={active === 'contact' ? "nav-link active" : "nav-link "}>Contact<span className="sr-only">(current)</span></a>
                  </Link>
                </li>

              </ul>

            </div>

          </div>

        </nav>

      </header>
    )
  }
}

export default Header;