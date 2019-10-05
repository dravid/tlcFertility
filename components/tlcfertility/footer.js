import React from 'react';
import Link from 'next/link'
import { NextAuth } from 'next-auth/client';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { siteUrl, noCache } = publicRuntimeConfig;
import { encodeForm } from '../../utils/api-utils.js';



class Footer extends React.Component {

	static async getInitialProps({ req, res, query }) {

		let session = await NextAuth.init({ req });


		if (res && session && session.csrfToken) {
		}

		return {
			session: session,
			linkedAccounts: await NextAuth.linked({ req }),
			providers: await NextAuth.providers({ req })
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			posts: this.props.posts,

		}
	}

	// fetchCategories = async () => {
	// 	let posts = [];
	// 	let postsResponse = await fetch(`${siteUrl}/api/v1/posts?${noCache}`);
	// 	if (postsResponse.status === 200) {
	// 		posts = await postsResponse.json();
	// 	}
	// 	this.setState({ posts: posts })
	// }







	render() {


		// console.log('=============FOOTER POST===============');
		// console.log(this.props);
		// console.log('====================================');

		return (
			<div className="container-fluid" style={{ maxWidth: "100vw", overflow: 'hidden' }}>

				<footer className="footer_border_columns ">
					<div className="footer_inner clearfix">
						<div className="footer_top_holder">
							<div className="footer_top footer_top_full ">
								<div className="four_columns clearfix">
									<div className="eltd_column column1 col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3" style={{ minHeight: '684px' }}>
										<div className="column_inner">
											<div className="widget_text widget widget_custom_html" id="custom_html-2">
												<h4>Tree of Life Center</h4>
												<div className="textwidget custom-html-widget">
													<div className="separator  small left  " style={{ borderColor: '#e5735c', borderBottomWidth: '2px', width: '25px', marginTop: '0px', marginBottom: '19px', borderStyle: 'solid' }} />
													Tree of Life Center (TLC) is a leading fertility center in California offering patients individualized care, innovative treatment options, and high pregnancy success rates. TLC has successfully provided fertility care to patients for 15 years. Led by renowned fertility specialists, Dr. Snunit Ben-Ozer and Dr. Vuk Jovanovic, the TLC team offers treatments options for advanced fertility care and women's wellness.
										<div className="separator  transparent center  " style={{ marginTop: '50px', marginBottom: '0px' }} />
													<span className="social_icons"><a title="facebook" href="https://www.facebook.com/TLCfertility" ><i className="fab fa-facebook fa-3x"></i></a></span>
													<span className="social_icons"><a title="twitter-link" href="https://twitter.com/vukytw" ><i className="fab fa-twitter-square fa-3x"></i></a></span>
													<span className="social_icons"><a title="instagram-link" href="https://www.instagram.com/tlcfertility/" ><i className="fab fa-instagram fa-3x"></i></a></span>
													<span className="social_icons"><a title="youtube-link" href="https://www.youtube.com/channel/UCLlShFndstG6S52uC_yoWxA" ><i className="fab fa-youtube-square fa-3x"></i></a></span>
												</div>
											</div>
										</div>
									</div>

									<div className="eltd_column column2 col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3" style={{ minHeight: '684px' }}>
										<div className="column_inner">
											<div className="widget widget_text" id="text-7">
												<h4>Trying to Conceive</h4>
												<div className="textwidget">
													<div className="separator  small left" style={{ borderColor: '#e5735c', borderBottomWidth: '2px', width: '25px', marginTop: '0px', marginBottom: '19px', borderStyle: 'solid' }} />
												</div>
											</div>
											<div className="widget widget_nav_menu" id="nav_menu-7">
												<div className="menu-trying-to-conceive-container">
													<ul className="menu" id="menu-trying-to-conceive">
														<li>
															<Link href="/heterosexual-couples">
																<a className="nav-link" >Heterosexual couples<span className="sr-only">(current)</span></a>
															</Link>
														</li>
														<li>
															<Link href="/lgbt">
																<a className="nav-link">lgbt <span className="sr-only">(current)</span></a>
															</Link>
														</li>
														<li>
															<Link href="/singles">
																<a className="nav-link">Singles<span className="sr-only">(current)</span></a>
															</Link>
														</li>
														<li>
															<Link href="/eggfreezing">
																<a className="nav-link">Egg freezing<span className="sr-only">(current)</span></a>
															</Link>
														</li>
														<li>
															<Link href="/international-patients">
																<a className="nav-link">International<span className="sr-only">(current)</span></a>
															</Link>
														</li>
														<li>
															<Link href="/our-clinic">
																<a className="nav-link" >Doctors<span className="sr-only">(current)</span></a>
															</Link>
														</li>
														<li>
															<Link href="/treatments">
																<a className="nav-link" >Treatments<span className="sr-only">(current)</span></a>
															</Link>
														</li>
														<li>
															<Link href="/contact">
																<a className="nav-link">Contact<span className="sr-only">(current)</span></a>
															</Link>
														</li>
													</ul>
												</div>
											</div>
											{/* <div className="widget widget_text" id="text-11">
											<h4>News Blog</h4>
											<div className="textwidget">
												<div className="separator  small left  " style={{ borderColor: '#e5735c', borderBottomWidth: '2px', width: '25px', marginTop: '0px', marginBottom: '19px', borderStyle: 'solid' }} />
											</div>
										</div>
										<div className="widget widget_eltd_latest_posts_menu_widget">
											<div className="flexslider widget_flexslider">
												<div className="flex-viewport" style={{ overflow: 'hidden', position: 'relative', width: '194px', display: 'block' }}>
													<a title="freezing-presentation" href="/eggfreezing">
														<h3 style={{ fontSize: 13 }}> Egg Freezing Seminar in Encino / Los Angeles on March 27th 2019 </h3>
														<span className="menu_recent_post_text">
															Posted in
														</span>
														<img draggable="false" src={require("../../static/images/tlcfertility/eggfreezingseminar.jpg?webp")} type="image/webp" alt="eggfreezingseminar" />
													</a>
												</div>
											</div>
										</div> */}
										</div>
									</div>

									<div className="eltd_column column3 col-12 col-sm-6 col-md-6 col-lg-3  col-xl-3" style={{ minHeight: '684px' }}>

										<div className="column_inner">
											<div className="widget widget_text" id="text-11">
												<a id="blog-header-link" href="/blog"><h4>Blog</h4></a>
												<div className="textwidget">
													<div className="separator  small left  " style={{ borderColor: '#e5735c', borderBottomWidth: '2px', width: '25px', marginTop: '0px', marginBottom: '19px', borderStyle: 'solid' }} />
												</div>
											</div>
											<div className="widget widget_eltd_latest_posts_menu_widget">
												<div className="flexslider widget_flexslider">





													<div className="flex-viewport" style={{ overflow: 'hidden', position: 'relative', display: 'block' }}>
														<a id="posts-container" title="freezing-presentation" href="/eggfreezing">
															<img draggable="false" src={require("../../static/images/tlcfertility/eggfreezingseminar.jpg?webp")} type="image/webp" alt="eggfreezingseminar" />
															<h3> Egg Freezing Seminar in Encino / Los Angeles on March 27th 2019 </h3>
														</a>
													</div>



													{/* {this.props
														// .slice((this.state.posts && this.state.posts.length > 0 ? (this.state.posts.length - 3) : ''), (this.state.posts.length ? this.state.posts.length : 'There are no posts'))
														.map((post, index) => { 

															const title = post.title ? post.title : '';
															const postUrl = "/blog/" + post.uri;

															return (

																<div key={index} className="flex-viewport" style={{ overflow: 'hidden', position: 'relative', display: 'block' }}>
																	<a id="posts-container" title="freezing-presentation" href="/eggfreezing">
																		<img draggable="false" src={require("../../static/images/tlcfertility/eggfreezingseminar.jpg?webp")} type="image/webp" alt="eggfreezingseminar" />
																		<h3> Egg Freezing Seminar in Encino / Los Angeles on March 27th 2019 </h3>
																	</a>
																</div>

															);
														})
													} */}



												</div>
											</div>
										</div>

									</div>

									<div className="eltd_column column4 col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 pr-4" style={{ minHeight: '684px' }}>
										<div className="column_inner">
											<div className="widget widget_text" id="text-17">
												<h4>Appointment Hours</h4>
												<div className="textwidget">
													<div className="separator  small left  " style={{ borderColor: '#e5735c', borderBottomWidth: '2px', width: '25px', marginTop: '0px', marginBottom: '19px', borderStyle: 'solid' }} />
													<p>Mo-Fr: 8 am – 5 pm</p>
													<p>Sat-Sun: 9 am-10 am</p>
													<p><em>Additional times and evening consultations available upon request</em></p>
												</div>
											</div>

											<div className="widget widget_text" id="text-70">
												<h4>Main Office</h4>
												<div className="textwidget">
													<div className="separator  small left" style={{ borderColor: '#e5735c', borderBottomWidth: '2px', width: '25px', marginTop: '0px', marginBottom: '19px', borderStyle: 'solid' }} />
													<p>18370 Burbank Blvd.</p>
													<p>Suite 511</p>
													<p>Tarzana, CA 91364, USA</p>
													<p>Phone: <a title="phone-contact" href="tel:+1-818-344-8522">+1 (818) 344-8522</a></p>
													<p>Email: <a title="email-contact" href="mailto:contact@tlcfertility.com">Email us</a></p>
													<p>&nbsp;</p>
												</div>
											</div>
										</div>
										<div className="column_inner">
											<div className="widget widget_text" id="text-17">
												<h4>Instagram Gallery</h4>
												<div className="textwidget">
													<div className="separator  small left  " style={{ borderColor: '#e5735c', borderBottomWidth: '2px', width: '25px', marginTop: '0px', marginBottom: '19px', borderStyle: 'solid' }} />
													<a className="sbi_header_link" href="https://www.instagram.com/tlcfertility" target="_blank" rel="noopener">
														<p className="sbi_bio">
															<img className="emoji" draggable="false" alt="✨" src="https://s.w.org/images/core/emoji/11.2.0/svg/2728.svg" />Dream Fertility Doctor Duo
																<img className="emoji" draggable="false" alt="✨" src="https://s.w.org/images/core/emoji/11.2.0/svg/2728.svg" />
															Dr Vuk Jovanovic ＋ Dr Snunit Ben-Ozer
															#WeMakeCuteBabies
																#PlantingSeedsOfLife
													</p>
													</a>
												</div>
											</div>

											<div className="widget widget_text" id="text-70">
												<a title="instagram-tlcfertility" href="https://www.instagram.com/tlcfertility" target="_blank" ><button className="btn btn-primary w-100"> Follow on Instagram </button></a>
											</div>

										</div>
									</div>

								</div>
							</div>
						</div>
						<div className="footer_bottom_holder">
							<div className="footer_bottom_holder_inner">
								<div className="two_columns_50_50 clearfix">
									<div className="eltd_column column1">
										<div className="column_inner">
											<div className="textwidget">
												<a title="logo" href="/">
													<img width={150} className="jetpack-lazy-image jetpack-lazy-image--handled" style={{ verticalAlign: 'middle' }} alt="logo" src={require("../../static/images/logo.png?webp")} type="image/webp" data-lazy-loaded={1} />
												</a>
												<span style={{ marginLeft: '20px' }}> © Copyright 2018 Tree of Life Center
										<a title="ssl" style={{ marginLeft: '20px' }} href="https://www.ssl.com/team/a4d-1dmftqo/site_seals/1577df84-5b67f758/site_report">
														<img width={130} className="jetpack-lazy-image jetpack-lazy-image--handled" alt="Ssl seal 1 ev" src={require("../../static/images/ssl.png?webp")} type="image/webp" data-lazy-loaded={1} />
													</a>
												</span>
											</div>
										</div>
									</div>
									<div className="eltd_column column2">
										<div className="column_inner">
											<div className="textwidget" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>

				<style jsx>{`


.social_icons{
    background-color: rgba(255,255,255,0.01)!important;
    border-color: #ffffff!important;
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 5px;
    margin-left: 0px;
    margin-top: 0px;
    margin-bottom: 5px;
	color: #ffffff;
	font-size: 15px;
	transition: transform .2s ease,color .15s ease-out;
	font-style: normal!important;
	font-weight: normal;
    font-variant: normal;
	text-transform: none;
	background-color: rgba(255, 255, 255, 0.01)!important;
	border-color: rgba(255, 255, 255, 0.2)!important;
}

.social_icons a {
	font-family: Raleway, sans-serif;
    font-size: 11px;
    line-height: 30px;
    letter-spacing: 1px;
    font-weight: 700;
    font-style: normal;
    text-transform: uppercase;
}

.widget_text {
	margin: 10px 0px;
}

#text-69 {
	margin: auto;
	width: 75%;
}

.footer_top .widget h4 {
  font-family: Raleway,sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
  color: #ffffff;
}
h3, h3 a {
color: #17a2b5;
}
img.wp-smiley, img.emoji {
display: inline !important;
border: none !important;
box-shadow: none !important;
height: 1em !important;
width: 1em !important;
margin: 0 .07em !important;
vertical-align: -0.1em !important;
background: none !important;
padding: 0 !important;
}
.footer_top a {
font-family: Raleway,sans-serif;
font-size: 11px;
line-height: 30px;
letter-spacing: 1px;
font-weight: 700;
font-style: normal;
text-transform: uppercase;
color: #b1b1b1;
}

/* Webkit */
::selection {
background: #81d742;
}
/* Gecko/Mozilla */
::-moz-selection {
background: #81d742;
}

footer.footer_border_columns .footer_top .eltd_column{
  border-color:rgba(255,255,255,0.2);
  }
  
.footer_top.footer_top_full{
padding-top: 75px;        
	padding-bottom: 30px;        
}
    @media only screen and (min-width: 600px){
  .footer_top .eltd_column{
  text-align:  left    }
  }
  
  .footer_top .widget.widget_nav_menu li{
  line-height: 24px;
  }
    .footer_top,
  .footer_top p:not(.eltd_icon_list_text),
  .footer_top span:not(.eltd_social_icon_holder):not(.fa-stack):not(.social_icon):not(.eltd_icon_shortcode):not(.eltd_icon_list_item_icon):not(.eltd_icon_font_elegant):not(.text_wrap),
  .footer_top li,
  .footer_top .textwidget,
  .footer_top .widget_recent_entries>ul>li>span{
  font-family: Raleway, sans-serif;font-size: 14px;line-height: 24px;letter-spacing: 0px;font-weight: 400;font-style: normal;text-transform: none;color: #b1b1b1    }
  
  .footer_top a{
  font-family: Raleway, sans-serif;font-size: 11px;line-height: 30px;letter-spacing: 1px;font-weight: 700;font-style: normal;text-transform: uppercase;color: #b1b1b1    }
  
  .footer_top a:hover{
  color: #ffffff;
  }
  
  .footer_bottom_holder{
  background-color:#2b2b2b;
  }
  
  
  .footer_bottom_holder_inner{
  padding-top: 30px;     padding-bottom: 30px;     }
  
  
  .footer_bottom_holder_inner,
  .footer_bottom_holder_inner ul li a,
  .footer_bottom_holder_inner p,
  .footer_bottom_holder_inner span,
  .footer_bottom span:not(.eltd_social_icon_holder):not(.fa-stack):not(.social_icon){
  font-family: Raleway, sans-serif;font-size: 14px;letter-spacing: 0px;font-weight: 400;font-style: normal;text-transform: none;color: #b8b8b8    }
  
  .footer_bottom_holder_inner a,
  .footer_bottom_holder_inner ul li a{
  font-family: Raleway, sans-serif;font-size: 12px;letter-spacing: 1px;font-weight: 800;font-style: normal;text-transform: uppercase;color: #ffffff    }
  
  .footer_bottom_holder_inner a:hover,
  .footer_bottom_holder_inner ul li a:hover{
  color:#81d742; !important;
  }
  .footer_top .widget h4 {
  font-family: Raleway, sans-serif;font-size: 16px;letter-spacing: 1px;font-weight: 700;font-style: normal;text-transform: uppercase;color: #ffffff    }
  
  .footer_bottom_holder { height: 100px; }


  @media only screen and (min-width: 1921px){
    section.parallax_section_holder,
    .title.has_background,
    .title.has_fixed_background{
        background-size: 100% auto !important;
    }
}


@media only screen and (max-width: 1400px){

    .full_width .eltd_masonry_blog article{
        width: 23%;
    }

	.blog_holder.masonry_full_width.five_columns article,
	.blog_holder.masonry_full_width.five_columns .blog_holder_grid_sizer {
		width: 24%;
	}

	.blog_holder.masonry_full_width.five_columns .blog_holder_grid_gutter {
		width: 1.33%;
	}
	
	.blog_holder.blog_masonry_gallery.five_columns article.square_big,
	.blog_holder.blog_masonry_gallery.five_columns article.rectangle_landscape{
		width: 50%;
	}



	.full_width .projects_holder.hover_text.v2 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v3 article .image_holder.standard_hover .icons_holder{
		bottom: 50px;
		left: 60px;
	}

	.full_width .projects_holder.hover_text.v4 article .image_holder.standard_hover .icons_holder{
		bottom: 40px;
		left: 50px;
	}

	.full_width .projects_holder.hover_text.v5 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v6 article .image_holder.standard_hover .icons_holder, 
	.full_width .projects_masonry_holder article .image_holder.standard_hover .icons_holder{
		bottom: 20px;
		left: 30px;
	}

	.full_width .projects_holder.v2 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v3 article .image_holder.standard_hover .text_holder{
		padding: 50px 60px 85px;
	}

	.full_width .projects_holder.v4 article .image_holder.standard_hover .text_holder{
		padding: 40px 50px 75px;
	}

	.full_width .projects_holder.v5 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v6 article .image_holder.standard_hover .text_holder,
	.full_width .projects_masonry_holder article .image_holder.standard_hover .text_holder{
		padding: 20px 30px 55px;
	}

    .full_screen_navigation_holder{
        bottom: 10px;
    }

    .carousel-control {
        width: 12%;
    }

    .no_image_carousel_title  h3 {
        font-size:26px;
        line-height:30px;
    }
    .no_image_carousel_content p {
        font-size:17px;
        line-height:29px;
    }
	
	.header-widget.widget_text.header-left-widget:last-child {
		display: none;
	}
}

@media only screen and (max-width: 1300px){

	.projects_holder.v6.standard_no_space .mix,
	.projects_holder.v6.standard_no_space .filler,
	.projects_holder.v6.hover_text.no_space .mix,
	.projects_holder.v6.hover_text.no_space .filler{
		width: 19.99%;
	}

	.safari_browser .projects_holder.v6.standard_no_space .mix,
	.safari_browser .projects_holder.v6.hover_text.no_space .mix,
	.safari_browser .projects_holder.v6.standard_no_space .filler,
	.safari_browser .projects_holder.v6.hover_text.no_space .filler,
    .firefox_mac_browser .projects_holder.v6.standard_no_space .mix,
    .firefox_mac_browser .projects_holder.v6.hover_text.no_space .mix,
    .firefox_mac_browser .projects_holder.v6.standard_no_space .filler,
    .firefox_mac_browser .projects_holder.v6.hover_text.no_space .filler{
		width: 19.93%;
	}

	.masonry_with_space .projects_holder.v6 .portfolio_masonry_grid_sizer {
		width: 20%;
	}

    .masonry_with_space .projects_holder.v6 .mix{
        width: 20%;
    }

	.touch footer.uncover{
		position: relative;
		top: 0;
		-webkit-transition: none;
		-moz-transition: none;
		-o-transition: none;
		-ms-transition: none;
		transition: none;
	}

    .touch .content{
        margin-bottom: 0 !important;
    }

	.full_width .projects_masonry_holder .portfolio_masonry_item,
	.full_width .projects_masonry_holder .portfolio_masonry_item.large_height{
		width: 33.333%;
	}

	.full_width .projects_masonry_holder .portfolio_masonry_item.large_width,
	.full_width  .projects_masonry_holder .portfolio_masonry_item.large_width_height{
		width: 66.666%;
	}

    .vertical_menu_enabled .title_outer.with_image .title{
        padding: 0 !important;
    }

    .vertical_menu_enabled .title.has_fixed_background,
    .vertical_menu_enabled .title.has_background	{
        background: none !important;
        height: auto !important;
        padding: 0 !important;
    }

    .vertical_menu_enabled .title_outer.animate_title_area{
        height: auto !important;
        opacity: 1 !important;
    }

    .vertical_menu_enabled .title .not_responsive{
        display: block;
    }
    .vertical_menu_enabled .title_outer.with_image .title .title_subtitle_holder,
    .vertical_menu_enabled .title .title_holder{
        padding: 0 !important;
    }

    .vertical_menu_enabled .title:not(.breadcrumbs_title) .title_holder {
        height: 100% !important;
    }

    .vertical_menu_enabled .title_outer.with_image .title .title_subtitle_holder{
        padding: 0 !important;
    }

    .vertical_menu_enabled .title .title_holder{
        padding: 0 !important;
    }

    .vertical_menu_enabled .title:not(.breadcrumbs_title) .title_holder {
        height: 100% !important;
    }
	.eltd_elements_holder.responsive_mode_from_1300.two_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_1300.three_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_1300.four_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_1300.five_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_1300.six_columns .eltd_elements_item
	{
		width: 100%;
		display: inline-block;
		height: auto;
	}
	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_1300 .eltd_elements_item .eltd_elements_item_content{
		text-align: left !important;
	}
	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_1300 .eltd_elements_item .eltd_elements_item_content{
		text-align: center !important;
	}
	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_1300 .eltd_elements_item .eltd_elements_item_content{
		text-align: right !important;
	}

	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_1300 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px 0;
	}

	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_1300 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px auto 20px auto;
	}

	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_1300 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px auto;
	}

	.full_width .projects_masonry_holder .portfolio_masonry_grid_sizer {
		width: 33.33333333%;
	}

	.no_image_carousel_title  h3 {
        font-size:26px;
        line-height:30px;
    }
    .no_image_carousel_content p {
        font-size:17px;
        line-height:22px;
    }

    /*magnified image*/

    .eltd_magnified_image_holder .overlay_holder {    
    	width: 80%;    
      	left: -85%;
    }

    .eltd_magnified_image_holder .overlay_holder {    
      	padding-top: 20% !important;
    }

    .eltd_magnified_image_holder .magnifier_holder {    
      	-webkit-transition: -webkit-transform 0.18s ease-in-out;    
      	transition: transform 0.18s ease-in-out;    
      	top: -15%;
    }

    .eltd_magnified_image_holder:hover .magnifier_holder {    
      	-webkit-transform: translateX(60%);    
        -ms-transform: translateX(60%);    
       	transform: translateX(60%);    
        -webkit-transition: -webkit-transform 0.22s ease-in-out .1s;    
        transition: transform 0.22s ease-in-out .1s;
    }

    .eltd_magnified_image_holder .overlay_holder .title_hodler {    
      	margin-bottom: 10px !important;
    }

    .eltd_magnified_image_holder .title_hodler * {    
      	letter-spacing: .1px;
    }
    
    .eltd_magnified_image_holder .title_hodler {    
      	display: none;
    }

    /*end magnified image*/
}

@media only screen and (max-width: 1200px){
	body.boxed:not(.has_general_padding):not(.grid_800) .wrapper_inner,
	body.boxed.has_general_padding:not(.grid_800) .wrapper_inner,
	body.boxed footer,
	body.boxed .header_inner,
	body.boxed:not(.has_general_padding) .full_width .parallax_content,
	body.boxed .carousel-inner,
	body.boxed .footer_inner,
    body.boxed .footer_top_border_holder.in_grid,
    body.boxed .footer_bottom_border_holder.in_grid,
    body.boxed .content_wrapper{
		width: 1000px;
	}

	body.boxed footer.uncover{
		width: 100%;
	}

	.container_inner,
	body.has_general_padding .title_holder .container_inner,
	.boxed div.section .section_inner,
	div.grid_section .section_inner,
    .parallax_grid_section .parallax_section_inner,
	.carousel-inner .slider_content_outer,
	nav.content_menu ul,
    .container_inner nav.content_menu,
    .footer_top_border_holder.in_grid,
    .footer_bottom_border_holder.in_grid,
    .grid_1300 .header_top_bottom_holder .container_inner,
    .grid_1300 footer .container_inner,
    .grid_1300 .drop_down .wide .second > .inner > ul,
    .grid_1200 .header_top_bottom_holder .container_inner,
    .grid_1200 footer .container_inner,
    .grid_1200 .drop_down .wide .second > .inner > ul,
    .drop_down .wide .second > .inner > ul{
		width: 950px;
	}

    .paspartu_enabled .container_inner,
    .paspartu_enabled.boxed div.section .section_inner,
    .paspartu_enabled div.grid_section .section_inner,
    .paspartu_enabled .parallax_grid_section .parallax_section_inner,
    .paspartu_enabled .carousel-inner .slider_content_outer,
    .paspartu_enabled nav.content_menu ul,
    .paspartu_enabled .container_inner nav.content_menu,
    .paspartu_enabled .footer_top_border_holder.in_grid,
    .paspartu_enabled .footer_bottom_border_holder.in_grid{
        width: 900px;
    }
	
	.eltd_search_form_2 input,
    .eltd_search_form_2 input:focus,
	.eltd_search_form_3 input, 
	.eltd_search_form_3 input:focus{
        width: 80%;
    }

    .drop_down .wide .second .inner > ul > li > a {
        line-height: 1.4em;
    }
	
	.projects_holder.v6 .mix,
	.projects_holder.v6.hover_text .mix{
		width: 18.5%;
		margin: 0 0 1.7%;
	}

	.projects_holder.v6 .filler,
	.projects_holder.v6.hover_text .filler{
		width: 18.5%;
	}

	.full_width .projects_masonry_holder .portfolio_masonry_grid_sizer,
	.full_width .projects_masonry_holder.gs3 .portfolio_masonry_grid_sizer {
		width: 50%;
	}

	.full_width .projects_masonry_holder.gs4 .portfolio_masonry_item,
	.full_width .projects_masonry_holder.gs4 .portfolio_masonry_item.large_height{
		width: 50%;
	}

	.full_width .projects_masonry_holder.gs4 .portfolio_masonry_item.large_width,
	.full_width .projects_masonry_holder.gs4 .portfolio_masonry_item.large_width_height{
		width: 100%;
	}

	.projects_masonry_holder .portfolio_masonry_item,
	.projects_masonry_holder .portfolio_masonry_item.large_height,
	.full_width .section_inner .projects_masonry_holder .portfolio_masonry_item,
	.full_width .section_inner .projects_masonry_holder .portfolio_masonry_item.large_height{
		width: 50%;
	}

	.projects_masonry_holder .portfolio_masonry_item.large_width,
	.projects_masonry_holder .portfolio_masonry_item.large_width_height,
	.full_width .section_inner .projects_masonry_holder .portfolio_masonry_item.large_width,
	.full_width .section_inner .projects_masonry_holder .portfolio_masonry_item.large_width_height{
		width: 100%;
	}


	.full_width .projects_holder_outer.v6 .hover_text:not(.no_space),
	.full_width .projects_holder_outer.v6:not(.masonry_with_space) .standard{
		width: 97%;
	}

	.cover_boxes ul li,
	.cover_boxes ul li .box .thumb{
		width: 227px;
	}

	.cover_boxes ul li.act,
	.cover_boxes ul li .box{
		width: 455px;
	}

	.cover_boxes ul li .box .box_content{
		left:247px;
		width: 207px;
	}

	body.boxed .cover_boxes ul li,
	body.boxed .cover_boxes ul li .box .thumb{
		width: 240px;
	}

	body.boxed .cover_boxes ul li.act,
	body.boxed .cover_boxes ul li .box{
		width: 480px;
	}

    body.boxed .cover_boxes ul li .box .box_content{
		left:260px;
		width: 220px;
	}

	.cover_boxes.boxes_two ul li,
	.cover_boxes.boxes_two ul li .box .thumb{
		width: 310px;
	}

	.cover_boxes.boxes_two ul li.act,
	.cover_boxes.boxes_two ul li .box{
		width: 620px;
	}

	.cover_boxes.boxes_two ul li .box .box_content{
		left:330px;
		width: 290px;
	}

	body.boxed .cover_boxes.boxes_two ul li,
	body.boxed .cover_boxes.boxes_two ul li .box .thumb{
		width: 326px;
	}

	body.boxed .cover_boxes.boxes_two ul li.act,
	body.boxed .cover_boxes.boxes_two ul li .box{
		width: 652px;
	}

    body.boxed .cover_boxes.boxes_two ul li .box .box_content{
		left:346px;
		width: 306px;
	}

	.paspartu_enabled .cover_boxes.boxes_two ul li,
	.paspartu_enabled .cover_boxes.boxes_two ul li .box .thumb{
		width: 290px;
	}

	.paspartu_enabled .cover_boxes.boxes_two ul li.act,
	.paspartu_enabled .cover_boxes.boxes_two ul li .box{
		width: 580px;
	}

	.paspartu_enabled .cover_boxes.boxes_two ul li .box .box_content{
		left:310px;
		width: 270px;
	}


	.flexslider .flex-next,
	.portfolio_slider .caroufredsel-next,
	.blog_slider .caroufredsel-next,
	.full_width .section_inner .portfolio_slider .caroufredsel-next,
	.full_width .section_inner .blog_slider .caroufredsel-next,
	.eltd_carousels .caroufredsel-direction-nav .eltd_carousel_next,
	.full_width .section_inner .eltd_carousels .caroufredsel-direction-nav .eltd_carousel_next{
		right: 20px;
	}

	.flexslider .flex-prev,
	.portfolio_slider .caroufredsel-prev,
	.blog_slider .caroufredsel-prev,
	.full_width .section_inner .portfolio_slider .caroufredsel-prev,
	.full_width .section_inner .blog_slider .caroufredsel-prev,
	.eltd_carousels .caroufredsel-direction-nav .eltd_carousel_prev,
	.full_width .section_inner .eltd_carousels .caroufredsel-direction-nav .eltd_carousel_prev{
		left: 20px;
	}

	.full_width .projects_masonry_holder.gs4 .portfolio_masonry_grid_sizer{
		width:50%;
	}
	
	footer.footer_border_columns .eltd_column > .column_inner {
		padding: 0 30px;
	}

	/* ==========================================================================
	   #Image Stack
	   ========================================================================== */

	.image_stack {    
		height: 600px !important;
	}

	.image_stack .image.image_3of5 {    
		height: 600px !important;    
		width: 50% !important;
	}

	.image_stack .image.inner {    
		width: 50% !important;    
		height: 550px !important;
	}

	.image_stack.stacked .image.image_2of5 {    
		left: 0 !important;    
		-webkit-transform: translate(0) !important;    
	    -ms-transform: translate(0) !important;    
	    transform: translate(0) !important;
	}

	.image_stack.stacked .image.image_4of5 {    
		right: 0% !important;    
		-webkit-transform: translate(0) !important;    
	    -ms-transform: translate(0) !important;    
        transform: translate(0) !important;
	}

	.image_stack .image.outer {    
		opacity:0 !important;
	}

	.image_stack .pop_up_image_holder {    
		-webkit-transform: translate(-50%,-50%) translateZ(0) scale(0.75) !important;    
	    transform: translate(-50%,-50%) translateZ(0) scale(0.75) !important;
	}

	.image_stack .slide_out_image_holder .image_3of5 {
		opacity: .88;
		left: 50%;
		-webkit-transform: translateX(-50%);
		    -ms-transform: translateX(-50%);
		        transform: translateX(-50%);
	    -webkit-transition: -webkit-transform .5s ease .22s, opacity .3s ease .1s, box-shadow .3s ease 1s, box-shadow .2s ease .4s;
	            transition: transform .5s ease .22s, opacity .3s ease .1s, box-shadow .2s ease .4s;
	}

	.image_stack.stacked .slide_out_image_holder .image.inner {
		-webkit-transition: left .4s ease .2s, right .4s ease .2s, -webkit-transform .4s ease-out .15s, opacity .5s ease-in-out .15s !important;
		transition: left .4s ease .2s, right .4s ease .2s, transform .4s ease-out .15s, opacity .5s ease-in-out .15s !important;
	}

	.pop_up_image_holder {
    	-webkit-transition: opacity .3s ease-out .65s, -webkit-transform .4s ease-out;
        transition: opacity .3s ease-out .65s, transform .4s ease-out;
	}

	.image_stack .pop_up_image_holder .shader {
		-webkit-transition: left .2s ease .8s, top .2s ease .8s,  -webkit-transform .22s ease;
		transition: left .2s ease .8s, top .2s ease .8s,  transform .22s ease;
	}
	
	/* ==========================================================================
	 #End Image Stack
	 ========================================================================== */
}

@media only screen and (min-width: 1000px) and (max-width: 1200px) {

    .eltd_pricing_tables.four_columns .price_in_table .price { 
    	font-size: 60px; 
    }
	
	.blog_holder.masonry_full_width .mejs-container .mejs-controls .mejs-time span {
		font-size: 12px;
	}

	.full_width .projects_holder.hover_text.v4 article .image_holder.standard_hover .icons_holder{
		bottom: 25px;
		left: 35px;
	}

	.full_width .projects_holder.hover_text.v5 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v6 article .image_holder.standard_hover .icons_holder, 
	.full_width .projects_masonry_holder article .image_holder.standard_hover .icons_holder{
		bottom: 10px;
		left: 20px;
	}

	.full_width .projects_holder.v4 article .image_holder.standard_hover .text_holder{
		padding: 25px 35px 60px;
	}

	.full_width .projects_holder.v5 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v6 article .image_holder.standard_hover .text_holder,
	.full_width .projects_masonry_holder article .image_holder.standard_hover .text_holder{
		padding: 10px 20px 45px;
	}

    .cover_boxes ul li .box .box_content p{
        max-height: 120px;
        overflow: hidden;
    }

    .carousel-control {
        width: 16%;
    }
}

@media only screen and (min-width: 1000px) {
    .light:not(.sticky):not(.scrolled) .side_menu_button > a,
    .light.header_style_on_scroll .side_menu_button > a{
        color:#fff;
    }

    .dark:not(.sticky):not(.scrolled) .side_menu_button > a,
    .dark.header_style_on_scroll .side_menu_button > a{
        color:#000;
    }

    .stick_with_left_right_menu .logo_wrapper { overflow: hidden; }

	.slider_thumbs .carousel-control.left:hover .thumb_holder{
		left: 0;
	}

	.carousel:not(.in_progress).slider_thumbs .carousel-control.left:hover .prev_nav{
		left: -200px;
	}

	.slider_thumbs .carousel-control.right:hover .thumb_holder{
		right: 0;
	}

	.carousel:not(.in_progress).slider_thumbs .carousel-control.right:hover .next_nav{
		right: -200px;
	}


	.info_section_title {    
	  width: 50%;    
	  float: left;
	}
	.info_section_title ~ p {    
	  width: 50%;    
	  float: right;
	}

	.portfolio_single.gallery .portfolio_social_section {    
	  padding-top: 30px;
	}

	.no_image_carousel_info_holder {    
	   box-sizing: border-box;    
	   float: left;    
	   width: 28%;    
	   padding-left: 50px;    
	   padding-right: 20px;
	 }

	.controls.no_image_carousel_navigation {    
	   /*position: absolute;*/
	   /*bottom: 0;*/
	   /*margin-bottom: 15px;*/
	   margin-top:20px;
	 }




	nav.mobile_menu{
		display: block;
	}
	
	.mobile_menu_button{
		display: table;
	}
	
	nav.mobile_menu > ul{
		margin: 0px auto;
	}
	.no-touch body.side_menu_slide_with_content.side_menu_open .carousel-inner:not(.relative_position),
    .no-touch body.side_menu_slide_with_content.width_270.side_menu_open .carousel-inner:not(.relative_position),
    .no-touch body.side_menu_slide_with_content.width_370.side_menu_open .carousel-inner:not(.relative_position){
		 left:0px !important;
	}
	
	.logo_wrapper{
        display: table;
        left: 50%;
        position: absolute;
	}

    .eltd_logo {
        display: table-cell;
        position: relative;
        top: auto;
        vertical-align: middle;
    }

    .eltd_logo a{
        left: -50%;
        width: auto !important;
    }

    .eltd_logo img{
        top: 0px;
        left: 0px;
    }
	
	
	nav.content_menu{
		position: relative !important;
		top: 0px !important;
		margin: 0px auto;
	}
	
	nav.content_menu ul.menu{
		display: none;
	}
	
	nav.content_menu .nav_select_menu{
		display: block;
	}
	
	nav.content_menu .back_outer{
		display: none;
	}
	
	nav.content_menu .logo,
	nav.content_menu .custom_widget_area{
		height: 42px;
	}
	
	nav.content_menu .logo,
	nav.content_menu .grid_section .section_inner .logo{
		padding-left: 15px;
	}
	
	nav.content_menu .grid_section .section_inner .custom_widget_area{
		padding-right: 40px;
	}
	
	nav.content_menu ul li i{
		float: left;
		line-height: inherit;
		margin: 0px;
		padding: 0 5px 0 0;
		width: 25px !important;
	}
	
	.content .container .container_inner.default_template_holder{
		padding: 44px 0 0;
	}

	.carousel-control .thumb_holder{
		margin-top: 0!important;
	}


	body:not(.has_general_padding) .full_width .projects_holder_outer.v4:not(.portfolio_full_width_on_portfolio) .hover_text:not(.no_space):not(.force_full_width),
	body:not(.has_general_padding) .full_width .projects_holder_outer.v4:not(.masonry_with_space):not(.portfolio_full_width_on_portfolio) .standard:not(.force_full_width),
	body:not(.has_general_padding) .full_width .projects_holder_outer.v5:not(.portfolio_full_width_on_portfolio) .hover_text:not(.no_space):not(.force_full_width),
	body:not(.has_general_padding) .full_width .projects_holder_outer.v5:not(.masonry_with_space):not(.portfolio_full_width_on_portfolio) .standard:not(.force_full_width),
	body:not(.has_general_padding) .full_width .projects_holder_outer.v6:not(.portfolio_full_width_on_portfolio) .hover_text:not(.no_space):not(.force_full_width),
	body:not(.has_general_padding) .full_width .projects_holder_outer.v6:not(.masonry_with_space):not(.portfolio_full_width_on_portfolio) .standard:not(.force_full_width){
		width:94%;
	}

    .projects_masonry_holder .portfolio_masonry_item,
    .projects_masonry_holder .portfolio_masonry_item.large_height{
        width: 50%;
    }

    .projects_masonry_holder .portfolio_masonry_item.large_width,
    .projects_masonry_holder .portfolio_masonry_item.large_width_height{
        width: 100%;
    }

	.blog_holder.masonry.three_columns article,
	.blog_holder.masonry.three_columns .blog_holder_grid_sizer {
		width: 49%;
	}
	
	.blog_holder.blog_masonry_gallery.three_columns article.square_big,
	.blog_holder.blog_masonry_gallery.three_columns article.rectangle_landscape{
		width: 100%;
	}

	.blog_holder.blog_masonry_gallery.three_columns article.square_small,
	.blog_holder.blog_masonry_gallery.three_columns article.rectangle_portrait {
		width:  50%;
	}
	.blog_holder.blog_masonry_gallery.three_columns .blog_holder_grid_sizer {
		width: 50%;
	}

    .eltd_masonry_blog article{
		width: 47%;
	}

	.latest_post_holder.masonry .blog-list-masonry-grid-sizer,
	.latest_post_holder.masonry .blog-list-masonry-item {
		width: 49%;
	}

	.blog_holder.masonry.three_columns .blog_holder_grid_gutter,
	.latest_post_holder.masonry .blog-list-masonry-grid-sizer-gutter {
		width: 2%;
	}

	.blog_holder.masonry_full_width.five_columns article,
	.blog_holder.masonry_full_width.four_columns article,
	.blog_holder.masonry_full_width.five_columns .blog_holder_grid_sizer,
	.blog_holder.masonry_full_width.four_columns .blog_holder_grid_sizer {
		width: 32%;
	}

	.blog_holder.masonry_full_width.five_columns .blog_holder_grid_gutter,
	.blog_holder.masonry_full_width.four_columns .blog_holder_grid_gutter {
		width: 2%;
	}
	
	.blog_holder.blog_masonry_gallery.four_columns article.square_big,
	.blog_holder.blog_masonry_gallery.four_columns article.rectangle_landscape,
	.blog_holder.blog_masonry_gallery.five_columns article.square_big,
	.blog_holder.blog_masonry_gallery.five_columns article.rectangle_landscape{
		width: 66.666%;
	}

	.blog_holder.blog_masonry_gallery.four_columns article.square_small,
	.blog_holder.blog_masonry_gallery.four_columns article.rectangle_portrait,
	.blog_holder.blog_masonry_gallery.five_columns article.square_small,
	.blog_holder.blog_masonry_gallery.five_columns article.rectangle_portrait{
		width:  33.33%;
	}
	.blog_holder.blog_masonry_gallery.four_columns .blog_holder_grid_sizer,
	.blog_holder.blog_masonry_gallery.five_columns .blog_holder_grid_sizer{
		width: 33.33%;
	}
	
	.blog_holder.blog_split_column .post_content_column{
		display: inline-block;
		width: 100%;
		vertical-align: middle;
	}
	
	.blog_holder ul.flex-direction-nav {
		display:none;
	}

	.grid-sizer{
		width:50%;
	}

    .full_width .eltd_masonry_blog article{
        width: 30.5%;
    }

	.box_image_holder .box_icon .fa-stack {
		font-size: 3em;
	}

	.header_top .left .inner > div:last-child,
	header .eltd_social_icon_holder,
	.header_top .right .inner > div {
		border-right: 0;
	}

	.header_top .left .inner > div,
	.header_top .right .inner > div:first-child {
		border-left: 0;
	}
	

	.eltd_clients.six_columns .eltd_client_holder,
	.eltd_clients.five_columns .eltd_client_holder,
	.eltd_clients.four_columns .eltd_client_holder{
		width: 33.33333333333333%;
	}

	.eltd_clients.six_columns .eltd_client_holder:nth-child(6n) .eltd_client_holder_inner:before ,
	.eltd_clients.five_columns .eltd_client_holder:nth-child(5n) .eltd_client_holder_inner:before,
	.eltd_clients.four_columns .eltd_client_holder:nth-child(4n) .eltd_client_holder_inner:before{
		border-right-width:1px;
	}

	.eltd_clients.six_columns .eltd_client_holder:nth-child(3n) .eltd_client_holder_inner:before ,
	.eltd_clients.five_columns .eltd_client_holder:nth-child(3n) .eltd_client_holder_inner:before ,
	.eltd_clients.four_columns .eltd_client_holder:nth-child(3n) .eltd_client_holder_inner:before {
		border-right-width: 0;
	}

	.cover_boxes ul{
		margin: 0 -8px 0 0;
	}

	.cover_boxes ul li{
		margin-right: 8px;
	}

	.cover_boxes ul li,
    .cover_boxes ul li .box .thumb{
    	width: 187px;
    }

    .cover_boxes ul li.act,
    .cover_boxes ul li .box{
		width: 374px;
	}

    .cover_boxes ul li .box .box_content{
		left:197px;
		width: 177px;
	}

	body.boxed .cover_boxes ul li,
	body.boxed .cover_boxes ul li .box .thumb{
		width: 199px;
	}

	body.boxed .cover_boxes ul li.act,
	body.boxed .cover_boxes ul li .box{
		width: 400px;
	}

    body.boxed .cover_boxes ul li .box .box_content{
		left: 209px;
		width: 189px;
	}

	.cover_boxes.boxes_two ul li,
    .cover_boxes.boxes_two ul li .box .thumb{
    	width: 256px;
    }

    .cover_boxes.boxes_two ul li.act,
    .cover_boxes.boxes_two ul li .box{
		width: 512px;
	}

    .cover_boxes.boxes_two ul li .box .box_content{
		left:266px;
		width: 246px;
	}

	body.boxed .cover_boxes.boxes_two ul li,
	body.boxed .cover_boxes.boxes_two ul li .box .thumb{
		width: 270px;
	}

	body.boxed .cover_boxes.boxes_two ul li.act,
	body.boxed .cover_boxes.boxes_two ul li .box{
		width: 540px;
	}

    body.boxed .cover_boxes.boxes_two ul li .box .box_content{
		left: 290px;
		width: 250px;
	}

	.paspartu_enabled .cover_boxes.boxes_two ul li,
	.paspartu_enabled .cover_boxes.boxes_two ul li .box .thumb{
		width: 240px;
	}

	.paspartu_enabled .cover_boxes.boxes_two ul li.act,
	.paspartu_enabled .cover_boxes.boxes_two ul li .box{
		width: 480px;
	}

	.paspartu_enabled .cover_boxes.boxes_two ul li .box .box_content{
		left: 250px;
		width: 230px;
	}


	.cover_boxes ul li .box .box_content p{
		max-height: 105px;
		overflow: hidden;
	}

	.cover_boxes ul li .box .cover_box_title{
		margin: 0 0 5px;
	}

	.cover_boxes ul li .box .qbutton,
	.cover_boxes ul li .box h5{
		margin: 8px 0 0;
	}

	/*portfolio single gallery padding due to flexslider*/
	.portfolio_single.gallery .portfolio_social_section {    
	  padding-top: 40px;
	}

	.controls.no_image_carousel_navigation {    
	    box-sizing: border-box;    
	    float: left;    
	    width: 25%;    
	    text-align: right;    
	    padding-right: 5px;
	 }

	.no_image_carousel_decription_holder {    
		box-sizing: border-box;    
		width: 75%;    
		float: left;    
		padding-left: 10px;
		margin-top:0;
	}

	.no_image_carousel_content {
		width: 100%;
		margin-bottom: 20px;
	}

	.no_image_carousel_slides_holder {
		float:none;
		width:100%;
		display: inline-block;
	}

	.no_image_carousel_inner {
	    position: relative;
	    padding: 20px 10px 25px;
	}

	.no_image_carousel_inner,
	.no_image_carousel_info_holder {
		height:inherit !important;
	}	

	/* latest post responsive*/
	.latest_post_holder.boxes.four_columns > ul > li{
		width: 49%;
		margin: 0 2% 25px 0 !important;
	}

	.latest_post_holder.boxes.four_columns > ul > li:nth-child(2n){
		margin: 0 0 25px !important;
	}

	.latest_post_holder.boxes.four_columns ul.post_list li:nth-child(2n+1){
		clear:both;
	}


	/* latest post responsive*/

	.price_table_inner ul li.table_title {
		padding: 18px 15px 17px;
	}

	.price_table_inner ul li {
		padding: 11px 10px;
	}

	/*this has to have body so it can override styles from style_dynamic*/
	body .content,  body .content.content_top_margin {
		margin-top:0 !important;
	}
	
	.eltd_counter_holder.center {
		padding: 20px 30px;
	}
	
	.wpb_flexslider_custom.flexslider.have_frame{
		width: 566px;
	}

	.wpb_flexslider_custom.flexslider.have_frame.frame4 {
		width: 708px;
	}

	.frame_holder > .wpb_wrapper {
		padding: 30px 0 66px 0;
	}

	.frame_holder.frame_holder2 > .wpb_wrapper {
		padding: 42px 0 66px 0;
	}

	.frame_holder.frame_holder4 > .wpb_wrapper {
		padding: 29px 0 140px 0;
	}
	.wpb_gallery.frame_holder.frame_holder4{
		padding-bottom: 70px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame4 .flex-control-nav {
		bottom: -190px;
	}
    .eltd_pricing_tables.four_columns .eltd_price_table {
        width: 48.75%;
        margin-bottom: 45px;
    }

    .eltd_pricing_tables.four_columns .eltd_price_table:nth-child(2n+1) {
        margin-left: 0;
        clear: both;
    }
	

    .gallery_holder ul.gallery_without_space.v5 li,
    .wpb_gallery_slides .gallery_holder ul.gallery_without_space.v5 li {
        width: 25%;
    }

     .gallery_holder ul.gallery_with_space.v5 li,
    .wpb_gallery_slides .gallery_holder ul.gallery_with_space.v5 li {
        width: 23.5%;
    }

    .gallery_holder ul.gallery_with_space.v5 li:nth-child(4n),
    .wpb_gallery_slides .gallery_holder ul.gallery_with_space.v5 li:nth-child(4n) {
        margin-right: 0;
    }

     .gallery_holder ul.gallery_with_space.v5 li:nth-child(5n),
    .wpb_gallery_slides .gallery_holder ul.gallery_with_space.v5 li:nth-child(5n) {
        margin-right: 2%;
    }

	.google_map_ovrlay{
		display: block;
	}

	.full_width .projects_holder.hover_text.v2 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v3 article .image_holder.standard_hover .icons_holder{
		bottom: 30px;
		left: 40px;
	}

	.full_width .projects_holder.hover_text.v4 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v5 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v6 article .image_holder.standard_hover .icons_holder, 
	.full_width .projects_masonry_holder article .image_holder.standard_hover .icons_holder{
		bottom: 15px;
		left: 25px;
	}

	.full_width .projects_holder.v2 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v3 article .image_holder.standard_hover .text_holder{
		padding: 30px 40px 65px;
	}

	.full_width .projects_holder.v4 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v5 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v6 article .image_holder.standard_hover .text_holder,
	.full_width .projects_masonry_holder article .image_holder.standard_hover .text_holder{
		padding: 15px 25px 50px;
	}

    .full_screen_navigation_holder{
        bottom: 0 !important;
    }

    .content.content_top_margin .fp-controlArrow{
        margin-top: -28px;
    }
	.eltd_elements_holder.responsive_mode_from_1000.two_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_1000.three_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_1000.four_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_1000.five_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_1000.six_columns .eltd_elements_item
	{
		width: 100%;
		display: inline-block;
		height: auto;
	}
	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_1000 .eltd_elements_item .eltd_elements_item_content{
		text-align: left !important;
	}
	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_1000 .eltd_elements_item .eltd_elements_item_content{
		text-align: center !important;
	}
	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_1000 .eltd_elements_item .eltd_elements_item_content{
		text-align: right !important;
	}

	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_1000 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px 0;
	}

	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_1000 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px auto 20px auto;
	}

	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_1000 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px auto;
	}

	.wpb_gallery .wpb_flexslider_custom.have_frame .flex-control-nav {
		bottom: -100px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame2 .flex-control-nav {
		bottom: -90px;
	}
	.full_width .projects_masonry_holder .portfolio_masonry_item,
	.full_width .projects_masonry_holder .portfolio_masonry_item.large_height{
		width: 50%;
	}

	.full_width .projects_masonry_holder .portfolio_masonry_item.large_width,
	.full_width  .projects_masonry_holder .portfolio_masonry_item.large_width_height{
		width: 100%;
	}

	.full_width .projects_masonry_holder .portfolio_masonry_grid_sizer {
		width: 50%;
	}

	.masonry_gallery_item.square_big,
	.masonry_gallery_item.rectangle_landscape,
	.masonry_gallery_holder.three_columns .masonry_gallery_item.square_big,
	.masonry_gallery_holder.three_columns .masonry_gallery_item.rectangle_landscape,
	.masonry_three_columns .masonry_gallery_item.square_big,
	.masonry_three_columns .masonry_gallery_item.rectangle_landscape {
		width: 100%;
	}

	.masonry_gallery_item.rectangle_portrait,
	.masonry_gallery_item.square_small,
	.masonry_gallery_holder.three_columns .masonry_gallery_item.square_small,
	.masonry_gallery_holder.three_columns .masonry_gallery_item.rectangle_portrait,
	.masonry_gallery_holder.three_columns .grid-sizer,
	.masonry_three_columns .masonry_gallery_item.square_small,
	.masonry_three_columns .masonry_gallery_item.rectangle_portrait,
	.masonry_three_columns .grid-sizer {
		width:50%;
	}

    .eltd_instagram_feed.col_9 li {
        width: 33.33%;
    }
	
	.call_to_action_row_75_25  {
		padding-left:30px !important;
		padding-right:30px !important;
	}

	/*magnified image*/

	.eltd_magnified_image_holder .overlay_holder {    
	  	width: 100%;    
	  	left: -105%;
	}

	.eltd_magnified_image_holder .overlay_holder {    
	  	padding-top: 20% !important;
	}

	.eltd_magnified_image_holder .overlay_holder {    
	  	background-color: rgba(255,255,255,.95) !important;
	}

	.eltd_magnified_image_holder:hover .magnifier_holder {    
	  	-webkit-transform: translateX(100%);    
	    -ms-transform: translateX(100%);    
	    transform: translateX(100%);    
	  	-webkit-transition: -webkit-transform 0.22s ease-in-out .1s;    
	    transition: transform 0.22s ease-in-out .1s;
	}

	/*end magnified image*/
	
	/* Start header top styles */
	
	.header_top .right .inner > div:first-child {
		display: none;
	}	
	
	header.light .header_top .left .inner > div.header-widget,
	.header_top .right .inner > div.header-widget:not(:last-child),
	.header-widget.widget_text.header-left-widget {
		border-right: 1px solid rgba(223,223,223,1);
	}
	
	.header_top .left {
		display: inline-block;
		width: 33%;
	}
	
	.header_top .right {
		display: inline-block;
		width: 66%;
	}
	
	.header-widget.widget_search.header-right-widget,
	.header-widget.widget_text.header-right-widget	{
		mergin: 5px 0px;
		display: inline-block;
		width: 49%;
		vertical-align: middle;
	}
	
	.header_top .right .inner #lang_sel,
	header.light .header_top .right .inner #lang_sel {
		border-right: 0;
		margin-right: 0;
	}
	
	.header_top .textwidget .eltd_icon_shortcode {
		height: 30px;
		line-height: 30px;
	}
	
	.header_top #lang_sel {
		height: 28px;
	}

	.header_top .inner {
		display: block;
	}

	header.light:not(.sticky) .textwidget span {
    	color: #464646 !important;
	}

	header.light .header_top ::-webkit-input-placeholder {
	   color: #464646;
	}

	header.light .header_top :-moz-placeholder { /* Firefox 18- */
	   color: #464646;  
	}

	header.light .header_top ::-moz-placeholder {  /* Firefox 19+ */
	   color: #464646;  
	}

	header.light .header_top :-ms-input-placeholder {  
	   color: #464646;  
	}

	header.light .header_top .header-widget #searchform input[type="submit"] {
		color: #464646;
	}

	header.light:not(.sticky) #lang_sel > ul > li > a {
		color: #464646 !important;
	}
	
	/* End header top styles */
}
@media only screen and (min-width: 768px) and (max-width: 1200px) {

	.vc_row:not(.grid_section) .blog-list-masonry-grid-sizer,
	.vc_row:not(.grid_section) .blog-list-masonry-item {
		width: 24%;
	}

	.vc_row:not(.grid_section) .blog-list-masonry-grid-sizer-gutter {
		width: 1.33%;
	}

}

@media only screen and (min-width: 768px) and (max-width: 1100px){

	.portfolio_gallery a.v4{
		width: 32%;
		margin: 0 2% 2% 0 !important;
	}

	.portfolio_gallery a.v4:nth-child(3n){
		margin: 0px 0px 2% 0px !important;
	}

    .eltd_percentage canvas,
    .eltd_percentage_with_icon canvas{
        width: 100% !important;
        height: 100% !important;
    }
	
	.eltd_pie_chart_holder .outer_border, 
	.eltd_percentage_with_icon .outer_border{
		width: 100% !important;
        height: 100% !important;
	}

    .filter_holder ul li span{
    	padding: 0 20px;
    }

    .portfolio_single.big-slider .portfolio_container, 
    .portfolio_single.big-images .portfolio_container, 
    .portfolio_single.gallery .portfolio_container{
    	padding: 36px 35px;
    }
}

@media only screen and (min-width: 600px) and (max-width: 1200px) {
	.eltd_tabs.with_borders.horizontal.enable_margin .tabs-nav li,
	.eltd_tabs.border_arround_active_tab.horizontal .tabs-nav li{
		margin-bottom: 8px;
	}

	.two_columns_form_with_space input.wpcf7-form-control.wpcf7-submit{
		padding: 0 10px;
	}
}

@media only screen and (min-width: 768px) and (max-width: 1000px) {
	.grid2 .blog_holder.masonry .blog_share {
			margin-left: 0;
	}

	.grid2.two_columns_66_33 .blog_holder.blog_single article .post_comments {
			margin-left: 0
	}

	.grid2.two_columns_66_33 .blog_holder.blog_single article .post_description .post_description_left,
	.grid2.two_columns_66_33 .blog_holder.blog_single article .post_description .post_description_right {
			float: none;
    }

	.projects_holder article .icons_holder a,
	.projects_holder.hover_text article .icons_holder a, 
	.portfolio_slides .icons_holder a{
		margin: 0 10px 0 0;
	}

	.projects_holder article .icons_holder a:last-child{
		margin: 0;
	}

	.projects_holder.hover_text article .icons_holder,
	.projects_holder.hover_text.v3 article .icons_holder{
		bottom: 20px;
		left: 20px;
	}

	.projects_holder.hover_text.v2 article .icons_holder,
	.portfolio_slides .icons_holder{
		bottom: 30px;
		left: 30px;
	}

	.projects_holder article .image_holder .text_holder,
	.projects_holder.v3 article .image_holder .text_holder{
		padding: 15px 20px 50px;
	}

	.projects_holder article .image_holder.elegant_hover .text_holder,
	.projects_holder.v3 article .image_holder.elegant_hover .text_holder{
		padding: 15px 20px;
	}

	.projects_holder.v2 article .image_holder .text_holder,
	.portfolio_slides .image_holder .text_holder{
		padding: 25px 30px 60px;
	}

	.projects_holder.v2 article .image_holder.elegant_hover .text_holder{
		padding: 25px 30px;
	}


    .eltd_team_social .eltd_social_icon_holder {
        margin: 0 5px 5px !important;
    }
    .eltd_team .eltd_team_social_holder .fa-stack{
		width: 30px;
		height: 30px;
		line-height: 30px;
	}

    .cover_boxes ul li .box .box_content p{
        max-height: 80px;
        overflow: hidden;
    }
    
	.vc_col-sm-3 .eltd_percentage_with_icon,
	.vc_col-sm-3 .eltd_pie_chart_holder .eltd_percentage {
		width: 100%!important;
		height: auto !important;
		padding-top: 100%;
	}

	.vc_col-sm-3 .eltd_percentage_with_icon canvas,
	.vc_col-sm-3 .eltd_pie_chart_holder .eltd_percentage canvas {
		width: 100%!important;
		height: auto !important;
	}

	.vc_col-sm-3 .eltd_percentage_with_icon i,
	.vc_col-sm-3 .eltd_percentage_with_icon .eltd_icon_font_elegant,
	.vc_col-sm-3 .eltd_pie_chart_holder .eltd_percentage i,
	.vc_col-sm-3 .eltd_pie_chart_holder .eltd_percentage .tocounter,
	.vc_col-sm-3 .eltd_pie_chart_holder .eltd_percentage .pie_title{
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translateX(-50%) translateY(-50%);
		-moz-transform: translateX(-50%) translateY(-50%);
		-o-transform: translateX(-50%) translateY(-50%);
		-ms-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
	}
	
	.testimonials.carousel .testimonial_content_inner .testimonial_icon_holder {
		width:19%;
	}
	
	.testimonials.carousel .testimonial_content_inner .testimonial_author_holder {
		width:81%;
	}

    .carousel-control {
        width: 19%;
    }

    /*magnified image*/

    .eltd_magnified_image_holder .title_hodler, 
    .eltd_magnified_image_holder .overlay_holder .text_hodler {    
      	display: none !important;
    }
}

@media only screen and (min-width: 600px) and (max-width: 1000px) {
    .page-template-full_screen .content{
        top: -90px !important;
    }

	.sidebar .eltd-latest-posts-widget .latest_post_image{
		width: 100%;
		margin-right: 0;
	}

	.sidebar .eltd-latest-posts-widget .latest_post_holder.image_in_box .latest_post_text{
		float: left;
		padding: 0 0 10px 0;
		margin-top: 10px;
	}
}

@media only screen and (max-width: 783px){
    .full_width .eltd_masonry_blog article{
        width: 46.5%;
	}

	.blog_holder.masonry_full_width.five_columns article,
	.blog_holder.masonry_full_width.four_columns article,
	.blog_holder.masonry_full_width.three_columns article,
	.blog_holder.masonry_full_width.five_columns .blog_holder_grid_sizer,
	.blog_holder.masonry_full_width.four_columns .blog_holder_grid_sizer,
	.blog_holder.masonry_full_width.three_columns .blog_holder_grid_sizer {
		width: 49%;
	}

	.blog_holder.masonry_full_width.five_columns .blog_holder_grid_gutter,
	.blog_holder.masonry_full_width.four_columns .blog_holder_grid_gutter,
	.blog_holder.masonry_full_width.three_columns .blog_holder_grid_gutter {
		width: 2%;
	}
		.blog_holder.blog_masonry_gallery.four_columns article.square_big,
	.blog_holder.blog_masonry_gallery.four_columns article.rectangle_landscape,
	.blog_holder.blog_masonry_gallery.five_columns article.square_big,
	.blog_holder.blog_masonry_gallery.five_columns article.rectangle_landscape{
		width: 100%;
	}

	.blog_holder.blog_masonry_gallery.four_columns article.square_small,
	.blog_holder.blog_masonry_gallery.four_columns article.rectangle_portrait,
	.blog_holder.blog_masonry_gallery.five_columns article.square_small,
	.blog_holder.blog_masonry_gallery.five_columns article.rectangle_portrait{
		width:  50%;
	}
	.blog_holder.blog_masonry_gallery.four_columns .blog_holder_grid_sizer,
	.blog_holder.blog_masonry_gallery.five_columns .blog_holder_grid_sizer{
		width: 50%;
	}
}


@media only screen and (min-width: 768px) and (max-width: 820px) {
     .blog_holder.blog_single{
         width: 95%;
         margin: 0 auto;
     }
}
@media only screen and (min-width: 600px) and (max-width: 670px) {
    .blog_holder.blog_single{
        width: 93%;
        margin: 0 auto;
    }
}
@media only screen and (max-width: 768px){

    body.boxed:not(.has_general_padding) .wrapper .wrapper_inner,
    body.boxed.has_general_padding .wrapper .wrapper_inner,
    body.boxed footer,
    body.boxed .header_inner,
    body.boxed:not(.has_general_padding) .full_width .parallax_content,
    body.boxed .carousel-inner,
    body.boxed .footer_inner,
    body.boxed .footer_top_border_holder.in_grid,
    body.boxed .footer_bottom_border_holder.in_grid,
    body.boxed .content_wrapper{
        width: 650px;
	}
	
	.container_inner,
	body.has_general_padding .title_holder .container_inner,
	.boxed div.section .section_inner,
	div.grid_section .section_inner,
    .parallax_grid_section .parallax_section_inner,
	.carousel-inner .slider_content_outer,
    nav.content_menu ul,
    .container_inner nav.content_menu,
    .footer_top_border_holder.in_grid,
    .footer_bottom_border_holder.in_grid,
    .grid_1300 .header_top_bottom_holder .container_inner,
    .grid_1300 footer .container_inner,
    .grid_1200 .header_top_bottom_holder .container_inner,
    .grid_1200 footer .container_inner,
    .grid_1000 .header_top_bottom_holder .container_inner,
    .grid_1000 footer .container_inner,
    .grid_800 .header_top_bottom_holder .container_inner,
    .grid_800 footer .container_inner{
		width: 600px;
	}

    .paspartu_enabled .container_inner,
    .paspartu_enabled.boxed div.section .section_inner,
    .paspartu_enabled div.grid_section .section_inner,
    .paspartu_enabled .parallax_grid_section .parallax_section_inner,
    .paspartu_enabled .carousel-inner .slider_content_outer,
	.paspartu_enabled nav.content_menu ul,
    .paspartu_enabled .container_inner nav.content_menu,
    .paspartu_enabled .footer_top_border_holder.in_grid,
    .paspartu_enabled .footer_bottom_border_holder.in_grid{
        width: 550px;
    }

	.blog_holder.masonry.three_columns article,
	.blog_holder.masonry.three_columns .blog_holder_grid_sizer {
		width: 49%;
	}

	.blog_holder.masonry.three_columns .blog_holder_grid_gutter {
		width: 2%;
	}

    .eltd_masonry_blog article,
    .full_width .grid_section .eltd_masonry_blog article,
	.blog_holder.masonry_full_width article{
		width: 46.5%;
	}
	
	.blog_holder.blog_split_column .post_content_column{
		width: 100%;
	}

	.comment_holder .comment_number {
		display: none;
	}
	
	.comment_holder .comments {
		width: 100%;
	}

	.single-post .comment-form .three_columns .column_inner {
		margin-right:0;
	}	

	.two_columns_75_25 .blog_holder.masonry article,
	.two_columns_66_33 .blog_holder.masonry article,
	.two_columns_33_66 .blog_holder.masonry article,
	.two_columns_25_75 .blog_holder.masonry article,
    .two_columns_75_25 .eltd_masonry_blog article,
    .two_columns_66_33 .eltd_masonry_blog article,
    .two_columns_33_66 .eltd_masonry_blog article,
    .two_columns_25_75 .eltd_masonry_blog article,
    .full_width .eltd_masonry_blog article,
	.blog_holder.masonry_full_width article{
		width:100%;
	}

	.blog_holder.masonry_full_width.five_columns article,
	.blog_holder.masonry_full_width.four_columns article,
	.blog_holder.masonry_full_width.three_columns article,
	.blog_holder.masonry_full_width.five_columns .blog_holder_grid_sizer,
	.blog_holder.masonry_full_width.four_columns .blog_holder_grid_sizer,
	.blog_holder.masonry_full_width.three_columns .blog_holder_grid_sizer {
		width: 100%;
	}

	.blog_holder.masonry_full_width.five_columns .blog_holder_grid_gutter,
	.blog_holder.masonry_full_width.four_columns .blog_holder_grid_gutter,
	.blog_holder.masonry_full_width.three_columns .blog_holder_grid_gutter{
		width: 0;
	}


	.two_columns_75_25 .blog_holder.masonry .blog_holder_grid_sizer,
	.two_columns_66_33 .blog_holder.masonry .blog_holder_grid_sizer,
	.two_columns_33_66 .blog_holder.masonry .blog_holder_grid_sizer,
	.two_columns_25_75 .blog_holder.masonry .blog_holder_grid_sizer {
		width: 100%;
	}

	.two_columns_75_25 .blog_holder.masonry .blog_holder_grid_gutter,
	.two_columns_66_33 .blog_holder.masonry .blog_holder_grid_gutter,
	.two_columns_33_66 .blog_holder.masonry .blog_holder_grid_gutter,
	.two_columns_25_75 .blog_holder.masonry .blog_holder_grid_gutter {
		width: 0;
	}

	.vc_row:not(.grid_section) .blog-list-masonry-grid-sizer,
	.vc_row:not(.grid_section) .blog-list-masonry-item{
		width: 48%;
	}

	.vc_row:not(.grid_section) .blog-list-masonry-grid-sizer-gutter {
		width: 2%;
	}

    .full_width .projects_masonry_holder.gs3 .portfolio_masonry_grid_sizer{
        width: 50%;
    }

    .full_width .projects_masonry_holder.gs3 .portfolio_masonry_item,
    .full_width .projects_masonry_holder.gs3 .portfolio_masonry_item.large_height{
        width: 50%;
    }

    .full_width .projects_masonry_holder.gs3 .portfolio_masonry_item.large_width,
    .full_width .projects_masonry_holder.gs3 .portfolio_masonry_item.large_width_height{
        width: 100%;
    }

	div.comment_form {
		padding-top: 40px;
		border-top: 1px solid #ddd;
	}

    .subtitle{
        font-size: 20px;
    }

	.title_graphics img{
		opacity: 0;
	}

	.header_bottom_right_widget_holder{
		display: none;
	}
	
	.fixed_top_header .header_bottom_right_widget_holder{
		display: table-cell;
	}

	.eltd_line_graf{
		margin: 0 0 25px;
		width: 100%;
	}

	.eltd_pie_graf{
		margin: 0 auto 25px;
		float: none;
	}

	.eltd_line_graf canvas,
	.eltd_line_graf_legend,
	.eltd_pie_graf canvas,
	.eltd_pie_graf_legend{
		width: 100% !important;
		height: auto !important;
	}

	.eltd_icon_list p,
	.eltd_list.number.circle_number li{
		line-height: 37px;
	}

	.eltd_list.number.circle_number ul>li:before{
		top: 0;
	}
	
	.eltd_icon_list i{
		line-height: 35px;
		height: 35px;
		width: 35px;
	}

	.grid2 .blog_holder article .post_description .post_description_left,
	.grid2 .post_info_left,
	.grid2 .blog_holder article .post_description .post_description_right {
		float: none;
	}

	.grid2 .blog_holder article .post_description .post_description_left,
	.grid2 .post_info_left {
		margin-top: 10px;
	}

	.grid2 .blog_holder article .post_comments {
		margin-left: 0;
	}

	.cover_boxes ul{
		width: 100% !important;
	}

	.cover_boxes ul li{
		width: 100% !important;
		margin: 0 0 20px !important;
	}

	.cover_boxes ul li, 
	.cover_boxes ul li .box .thumb,
	.cover_boxes.boxes_two ul li, 
	.cover_boxes.boxes_two ul li .box .thumb,
	body.boxed .cover_boxes ul li, 
	body.boxed .cover_boxes ul li .box .thumb,
	body.boxed .cover_boxes.boxes_two ul li, 
	body.boxed .cover_boxes.boxes_two ul li .box .thumb{
		width: 270px;
	}

    .cover_boxes ul li.act,
    .cover_boxes ul li .box,
    .cover_boxes.boxes_two ul li.act,
    .cover_boxes.boxes_two ul li .box,
    body.boxed .cover_boxes ul li.act,
    body.boxed .cover_boxes ul li .box,
    body.boxed .cover_boxes.boxes_two ul li.act,
    body.boxed .cover_boxes.boxes_two ul li .box,
    .paspartu_enabled .cover_boxes.boxes_two ul li.act,
    .paspartu_enabled .cover_boxes.boxes_two ul li .box{
        width: 100%;
    }

	.cover_boxes ul li .box .box_content,
	.cover_boxes.boxes_two ul li .box .box_content,
	body.boxed .cover_boxes ul li .box .box_content,
	body.boxed .cover_boxes.boxes_two ul li .box .box_content{
        position: static;
        left: 0;
        float: right;
		width: 310px;
	}

	.paspartu_enabled .cover_boxes.boxes_two ul li,
	.paspartu_enabled .cover_boxes.boxes_two ul li .box .thumb{
		width: 240px;
	}

	.paspartu_enabled .cover_boxes.boxes_two ul li .box .box_content{
        position: static;
        left: 0;
        float: right;
		width: 290px;
	}

    .cover_boxes ul li .box .box_content p {
        height: auto;
        max-height: none;
        overflow: visible;
    }

	.latest_post_holder.boxes:not(.three_columns) > ul > li{
		margin: 0 2% 25px 0 !important;
	}

	.latest_post_holder.boxes.two_columns > ul > li,
	.latest_post_holder.boxes.four_columns > ul > li{
		width: 49%;
	}

	.latest_post_holder.boxes:not(.three_columns) > ul > li:nth-child(2n){
		margin: 0 0 25px !important;
	}

	.latest_post_holder.boxes .post_list .boxes_shader .qbutton[class*='icon'] .text_holder {    
	  display: none;
	}
	.latest_post_holder.boxes .post_list .boxes_shader .qbutton[class*='icon'] .icon_holder {    
	  border-left: none;
	}

	.eltd_circles_holder .eltd_circle_outer{
		width: 50% !important;
		margin: 0 0 60px;
	}

	.eltd_circles_holder:before{
		display: none;
		width: 0;
		height: 0;
		border: 0;
	}

	.eltd_social_icon_holder .fa-stack{
		margin: 0.1407692307692308em;
	}

	.wpb_flexslider_custom.flexslider.have_frame{
		width: 442px;
	}

	.wpb_flexslider_custom.flexslider.have_frame.frame4 {
		width: 554px;
	}
	.wpb_gallery.frame_holder.frame_holder4{
		padding-bottom: 50px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame4 .flex-control-nav {
		bottom: -165px;
	}
	.frame_holder > .wpb_wrapper {
		padding: 24px 0 58px 0;
	}

	.frame_holder.frame_holder2 > .wpb_wrapper {
		padding: 33px 0 58px 0;
	}

	.frame_holder.frame_holder4 > .wpb_wrapper {
		padding: 23px 0 120px 0;
	}

    .touch .content{
        margin: 0 !important;
    }

    nav.popup_menu ul li a, nav.popup_menu ul li h6{
        line-height: 1.3em !important;
    }

    nav.popup_menu ul li a span, nav.popup_menu ul li h6 span{
        font-size: 0.7em;
    }

	.eltd_carousels_holder .caroufredsel-direction-nav {
		display: none;
	}

    .eltd_circles_holder.with_lines .circle_line_holder {
        display: none;
    }

	.eltd_tabs .tabs-nav li a {
		font-size: 12px;
	}

	.filter_outer.filter_portfolio .filter_holder ul li {    
	    width: 48%;    
	    box-sizing: border-box;    
	    margin: -1px 1%;
	}
  
  	.filter_outer.filter_portfolio .filter_holder ul li span {    
	    display: block;    
	    padding: 0;
  	}

  	.filter_outer.filter_portfolio .filter_holder.without_separator ul li.filter {
  	    margin: 1px 1px !important;
  	}

  	.filter_outer.filter_portfolio .filter_holder.without_separator ul li.filter:before {
  	    width: calc(100% + 4px) !important;
  	    height: 2px !important;
  	    left: -2px !important;
  	}

  	.filter_outer.filter_portfolio .filter_holder.without_separator ul li.filter:after {
  	    width: calc(100% + 4px) !important;
  	    left: -2px !important;
  	}

  	.filter_outer.filter_portfolio .filter_holder.without_separator ul li.filter span:before {
  	    left: auto !important;
  	    right: -2px;
  	}

    .portfolio_single h2.portfolio_single_text_title{
    	line-height: 1em;
    }

    .portfolio_single h2.portfolio_single_text_title span{
    	font-size: 68%;
    }

    .portfolio_single.big-slider .portfolio_container, 
    .portfolio_single.big-images .portfolio_container, 
    .portfolio_single.gallery .portfolio_container{
    	padding: 26px 30px;
    }

    .portfolio_social_section {
    	padding: 20px 0;
    }

    .portfolio_single.gallery .portfolio_social_section {    
      	padding-top: 10px;
     	margin-bottom: 10px;
    }

    .single-portfolio_page .portfolio_detail {
    	margin-top: 30px;
    }

    .portfolio_single.small-slider .portfolio_detail  {
    	margin-top: 0;
    }

    .portfolio_detail .info p {    
      margin-bottom: 20px;
    }
    .portfolio_single_text_title, .portfolio_detail {    
      margin-top: 24px;
    }

    .vc_text_separator.full .separator_content{
    	padding: 15px 50px;
    }

    .full_width .projects_holder.hover_text.v2 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v3 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v4 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v5 article .image_holder.standard_hover .icons_holder,
	.full_width .projects_holder.hover_text.v6 article .image_holder.standard_hover .icons_holder, 
	.full_width .projects_masonry_holder article .image_holder.standard_hover .icons_holder{
		bottom: 25px;
		left: 35px;
	}

	.full_width .projects_holder.v2 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v3 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v4 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v5 article .image_holder.standard_hover .text_holder,
	.full_width .projects_holder.v6 article .image_holder.standard_hover .text_holder,
	.full_width .projects_masonry_holder article .image_holder.standard_hover .text_holder{
		padding: 30px 35px 60px;
	}

    body.page-template-blog-masonry-full-width-php .content .full_width .full_width_inner {
        padding: 44px 45px 25px;
    }

    .blog_holder article .post_info{
        margin: 0 0 20px;
    }

    .service_table_holder{
		margin-bottom: 20px !important;
	}
	
	.service_table_holder.active{
		padding-top:38px;
	}

	.latest_post_holder.boxes.three_columns > ul > li{
		width: 49%;
		margin: 0 2% 25px 0 !important;
	}

	.latest_post_holder.boxes.three_columns > ul > li:nth-child(2n){
		margin: 0 0 25px !important;
	}

	.latest_post_holder.boxes.three_columns ul.post_list li:nth-child(3n+1){
		clear:none;
	}

	.latest_post_holder.boxes.three_columns ul.post_list li:nth-child(2n+1){
		clear:both;
	}


	body.vertical_menu_hidden.page-template-blog-masonry-full-width-php.vertical_menu_enabled .content .full_width,
	body.vertical_menu_hidden.page-template-blog-masonry-full-width-php.vertical_menu_enabled.vertical_menu_right .content .full_width,
	body.vertical_menu_hidden.vertical_menu_hidden_with_logo.page-template-blog-masonry-full-width-php.vertical_menu_enabled .content .full_width,
	body.vertical_menu_hidden.vertical_menu_hidden_with_logo.page-template-blog-masonry-full-width-php.vertical_menu_enabled.vertical_menu_right .content .full_width{
		padding-left: 45px !important;
		padding-right: 45px !important;
	}

	.eltd_elements_holder.responsive_mode_from_768.two_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_768.three_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_768.four_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_768.five_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_768.six_columns .eltd_elements_item
	{
		width: 100%;
		display: inline-block;
		height: auto;
	}
	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_768 .eltd_elements_item .eltd_elements_item_content{
		text-align: left !important;
	}
	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_768 .eltd_elements_item .eltd_elements_item_content{
		text-align: center !important;
	}
	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_768 .eltd_elements_item .eltd_elements_item_content{
		text-align: right !important;
	}

	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_768 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px 0;
	}

	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_768 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px auto 20px auto;
	}

	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_768 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px auto;
	}

	.eltd_elements_holder .eltd_elements_item_content{
		padding-left:10px !important;
		padding-right:10px !important;
	}

	.breadcrumb {
        position:relative;
    }

	.blog_holder.blog_split_column .post_content_column.text-wrapper .post_text{
		padding-left: 0;
	}

	.wpb_gallery .wpb_flexslider_custom.have_frame .flex-control-nav {
		bottom: -90px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame2 .flex-control-nav {
		bottom: -80px;
	}
	.wpb_gallery.frame_holder.frame_holder2 {
		padding-bottom: 40px;
	}
	.masonry_with_space_btn .item_inner_shadow {
		margin-bottom: 65px;
	}

    .eltd_instagram_feed.col_4 li {
        width: 50%;
    }

    .eltd_instagram_feed.col_6 li {
        width: 33.33%;
    }

    .eltd_icon_with_title.right .icon_text_holder{
		float:right;
	}
	
	.testimonials.carousel ul li .testimonials_carousel_holder.carousel_three {
		width:100%;
		padding-top: 40px;
	}
	
	.testimonials.carousel ul li .testimonials_carousel_holder.carousel_three .testimonial_content_inner{
		width:95%;
		margin: 0 auto;
	}

	.carousel-control .prev_nav .numbers,
	.carousel-control .next_nav .numbers {
		display: none;
	}

	.carousel-control {
		width: 8%;
	}
	
	.blog_holder .post_info > div:not(:first-child):before {
		display:none;
	}
	
	.blog_holder article .post_info > div {
		display:block;
		margin:5px 10px;
	}
	
	footer .eltd_column,
    footer.footer_border_columns .eltd_column{
		border: none;
		min-height: 0 !important;
		text-align: center;
	}
	
	.two_columns_50_50 .column1, .two_columns_50_50 .column2,
	.three_columns .column1, .three_columns .column2, .three_columns .column3,
	.two_columns_66_33 .column1, .two_columns_66_33 .column2,
	.two_columns_33_66 .column1, .two_columns_33_66 .column2,
	.two_columns_75_25 .column1, .two_columns_75_25 .column2,
	.two_columns_25_75 .column1, .two_columns_25_75 .column2{
		width: 100%;
	}
	
	footer .three_columns>.column1,
	footer .three_columns>.column2,
	footer .three_columns>.column3{
		display: block;
	}
	
	footer .three_columns>.column1 .column_inner,
	footer .three_columns>.column2 .column_inner,
	footer .three_columns>.column3 .column_inner{
		padding: 10px 0;
	}
	
	.two_columns_50_50 .column1 .column_inner, .two_columns_50_50 .column2 .column_inner,
	.three_columns .column1 .column_inner, .three_columns .column2 .column_inner, .three_columns .column3 .column_inner,
	.two_columns_66_33 .column1 .column_inner, .two_columns_66_33 .column2 .column_inner,
	.two_columns_33_66 .column1 .column_inner, .two_columns_33_66 .column2 .column_inner,
	.two_columns_75_25 .column1 .column_inner, .two_columns_75_25 .column2 .column_inner,
	.two_columns_25_75 .column1 .column_inner, .two_columns_25_75 .column2 .column_inner,
	.two_columns_66_33.grid2 .column1 .column_inner, .two_columns_66_33.grid2 .column2 .column_inner,
	.two_columns_33_66.grid2 .column1 .column_inner, .two_columns_33_66.grid2 .column2 .column_inner,
	.two_columns_75_25.grid2 .column1 .column_inner, .two_columns_75_25.grid2 .column2 .column_inner,
	.two_columns_25_75.grid2 .column1 .column_inner, .two_columns_25_75.grid2 .column2 .column_inner{
		padding: 0px;
	}
	
	footer.footer_border_columns .footer_bottom_holder .eltd_column .column_inner {
		padding: 0;
	}
	
	.footer_bottom_holder .three_columns .column1 .column_inner,
    .footer_bottom_holder .three_columns .column2 .column_inner,
    .footer_bottom_holder .three_columns .column3 .column_inner,
    .footer_bottom_holder .two_columns_50_50 .column1 .column_inner,
    .footer_bottom_holder .two_columns_50_50 .column2 .column_inner{
        text-align: center;
    }
}

@media only screen and (min-width: 600px) and (max-width: 768px){

	.portfolio_gallery a.v3,
	.portfolio_gallery a.v4{
		width: 49% !important;
		margin: 0 2% 2% 0 !important;
	}

	.portfolio_gallery a.v3:nth-child(2n),
	.portfolio_gallery a.v4:nth-child(2n){
		margin: 0px 0px 2% 0px !important;
	}

    .gallery_holder ul.gallery_without_space.v4 li {
        width: 50% !important;
    }

	.gallery_holder ul.gallery_without_space.v5 li,
	.gallery_holder ul.gallery_without_space.v3 li{
		width: 33.33333% !important;

	}


	.gallery_holder ul.gallery_with_space.v4 li {
        width: 49% !important;
    }

    .gallery_holder ul.gallery_with_space.v4 li:nth-child(2n) {
        margin-right: 0;
    }

	.gallery_holder ul.gallery_with_space.v5 li,
	.gallery_holder ul.gallery_with_space.v3 li{
		width: 32% !important;

	}

	.gallery_holder ul.gallery_with_space.v5 li:nth-child(3n){
		margin-right: 0;
	}

	.gallery_holder ul.gallery_with_space.v5 li:nth-child(5n),
	.wpb_gallery_slides .gallery_holder ul.gallery_with_space.v5 li:nth-child(4n),
	.gallery_holder ul.gallery_with_space.v5 li:nth-child(4n){
		margin-right: 2%;
	}

	.blog_holder article .post_info .inner {
		padding: 0 10px 0 0;
	}

    .eltd_percentage canvas,
	.eltd_percentage_with_icon canvas{
		width: 100% !important;
		height: 100% !important;
	}

	.eltd_counter_holder.center {
		padding: 20px 15px;
	}

    .price_in_table .price { 
    	font-size: 60px; 
    }

    .service_table_title_holder .service_title{
        word-break: break-all;
    }

    .projects_holder article .icons_holder a,
	.projects_holder.hover_text article .icons_holder a, 
	.portfolio_slides .icons_holder a{
		margin: 0 10px 0 0;
	}

	.projects_holder article .icons_holder a:last-child{
		margin: 0;
	}

	.projects_holder.hover_text article .icons_holder,
	.projects_holder.hover_text.v3 article .icons_holder,
	.projects_holder.hover_text.v2 article .icons_holder,
	.portfolio_slides .icons_holder{
		bottom: 25px;
		left: 25px;
	}

	.projects_holder article .image_holder .text_holder,
	.projects_holder.v3 article .image_holder .text_holder,
	.projects_holder.v2 article .image_holder .text_holder,
	.portfolio_slides .image_holder .text_holder{
		padding: 20px 25px 55px;
	}

	.projects_holder article .image_holder.elegant_hover .text_holder,
	.projects_holder.v3 article .image_holder.elegant_hover .text_holder,
	.projects_holder.v2 article .image_holder.elegant_hover .text_holder{
		padding: 20px 25px;
	}

    .blog_holder article.format-quote .post_text .post_text_inner .post_title a span,
    .blog_holder article.format-link .post_text .post_text_inner .post_title a span{
        font-size: 20px;
        line-height: 28px;
    }
    .call_to_action .call_to_action_row_75_25> .to_action_column1{
        width: 65%;
    }
    .call_to_action .call_to_action_row_75_25> .to_action_column2{
        width: 35%;
    }

    .eltd_pie_graf{
		width: 50%;
	}
		
	.blog_holder.blog_masonry_gallery article.square_big,
	.blog_holder.blog_masonry_gallery article.rectangle_landscape{
		width: 100%;
	}

	.blog_holder.blog_masonry_gallery article.square_small,
	.blog_holder.blog_masonry_gallery article.rectangle_portrait {
		width:  50%;
	}
	.blog_holder.blog_masonry_gallery .blog_holder_grid_sizer {
		width: 50%;
	}

    .eltd_pricing_tables.three_columns .eltd_price_table{
        width: 100%;
        margin-left: 0;
        margin-bottom: 30px;
    }
	
	.footer_top .four_columns .column1, 
	.footer_top .four_columns .column2, 
	.footer_top .four_columns .column3, 
	.footer_top .four_columns .column4 {
		width: 49%;
		text-align: center;
		margin: 0;
		min-height: 0 !important;
		border-left: 0 !important;
		display: inline-block;
		vertical-align: top;
		float: none;
	}
	
	.footer_top .four_columns .column1, 
	.footer_top .four_columns .column2 {
		margin-bottom: 25px;
	}
	
	footer.footer_border_columns .footer_top .four_columns .eltd_column:nth-child(2n+2) > .column_inner {
		padding-right: 0;
	}
	
	footer.footer_border_columns .footer_top .four_columns .eltd_column:nth-child(2n+1) > .column_inner {
		padding-left: 0;
	}
	
	footer .footer_top .four_columns .separator.small.left,
	footer .footer_top .four_columns .separator.small.right {
		margin-left: auto;
		margin-right: auto;
	}
	
	aside.sidebar .widget.eltd-latest-posts-widget li {
		float: left;
		display: inline-block;
		width: 32.66%;
		padding-top: 0;
		margin-right: 1%;
	}
	
	aside.sidebar .widget.eltd-latest-posts-widget li:nth-child(3n+3) {
		    margin-right: 0;
	}
	
	aside.sidebar .widget.eltd-latest-posts-widget .latest_post_holder > ul > li {
		padding-top: 0;
	}
	
	.side_menu_button a.side_menu_button_link {
		margin-right: 2px;
	}
	
}

@media only screen and (min-width: 600px) {

	  .portfolio_single.small-slider .portfolio_social_section, 
	  .portfolio_single.small-images .portfolio_social_section {    
	    padding: 30px 20px 30px 0;    
	    border-bottom: none;
	  }

}

@media only screen and (max-width: 600px){

    .content.content_top_margin_negative{
        top:0 !important;
    }

    .enable_full_screen_sections_on_small_screens.page-template-full_screen .content{
        top: -90px !important;
    }

    .title.disable_title_in_grid .title_subtitle_holder_inner{
        display: block;
    }

	body.side_menu_slide_with_content .side_menu,
    body.side_menu_slide_with_content.width_270 .side_menu,
    body.side_menu_slide_with_content.width_370 .side_menu{
		width: 100%;
		right: -100%;
	}

	body.side_menu_slide_with_content.side_menu_open header.fixed,
	body.side_menu_slide_with_content.side_menu_open header.fixed_hiding,
	body.side_menu_slide_with_content.side_menu_open header.sticky,
	body.side_menu_slide_with_content.side_menu_open .wrapper,
    body.side_menu_slide_with_content.width_270.side_menu_open header.fixed,
    body.side_menu_slide_with_content.width_270.side_menu_open header.fixed_hiding,
    body.side_menu_slide_with_content.width_270.side_menu_open header.sticky,
    body.side_menu_slide_with_content.width_270.side_menu_open .wrapper,
    body.side_menu_slide_with_content.width_370.side_menu_open header.fixed,
    body.side_menu_slide_with_content.width_370.side_menu_open header.fixed_hiding,
    body.side_menu_slide_with_content.width_370.side_menu_open header.sticky,
    body.side_menu_slide_with_content.width_370.side_menu_open .wrapper{
		left: -100%;
	}

	.eltd_pie_graf{
		width: 70%;
	}
	
	.eltd_search_form_2 input, 
	.eltd_search_form_3 input,
	.eltd_search_form_2 input:focus, 
	.eltd_search_form_3 input:focus{
        width: 50%;
    }

    .mejs-controls .mejs-playpause-button button {
        margin: 19px 10px;
    }
    .mejs-container .mejs-controls .mejs-currenttime-container{
        margin: 0 5px 0 0px;
    }
    .mejs-controls div.mejs-horizontal-volume-slider{
        margin-right: 10px;
    }

    .mejs-controls .mejs-volume-button button{
        margin: 18px 6px 18px 10px;
    }

   	body.boxed:not(.has_general_padding) .wrapper .wrapper_inner,
    body.boxed.has_general_padding .wrapper .wrapper_inner,
    body.boxed footer,
    body.boxed .header_inner,
    body.boxed:not(.has_general_padding) .full_width .parallax_content,
    body.boxed .carousel-inner,
    body.boxed .footer_inner,
    body.boxed .footer_top_border_holder.in_grid,
    body.boxed .footer_bottom_border_holder.in_grid,
    body.boxed .content_wrapper{
		width: 470px;
	}

	.carousel-inner .slider_content .text.custom_slide_padding{
		padding-left: 10px !important;
		padding-right: 10px !important;
	}
	
	
	.container_inner,
	body.has_general_padding .title_holder .container_inner,
	.boxed div.section .section_inner,
	div.grid_section .section_inner,
	div.column1 .grid_section .section_inner,
	div.column2 .grid_section .section_inner,
    .parallax_grid_section .parallax_section_inner,
	.carousel-inner .slider_content_outer,
    nav.content_menu ul,
    .container_inner nav.content_menu,
    .footer_top_border_holder.in_grid,
    .footer_bottom_border_holder.in_grid,
    .grid_1300 .header_top_bottom_holder .container_inner,
    .grid_1300 footer .container_inner,
    .grid_1200 .header_top_bottom_holder .container_inner,
    .grid_1200 footer .container_inner,
    .grid_1000 .header_top_bottom_holder .container_inner,
    .grid_1000 footer .container_inner,
    .grid_800 .header_top_bottom_holder .container_inner,
    .grid_800 footer .container_inner{
		width: 420px;
	}

    .paspartu_enabled .container_inner,
    .paspartu_enabled.boxed div.section .section_inner,
    .paspartu_enabled div.grid_section .section_inner,
    .paspartu_enabled div.column1 .grid_section .section_inner,
    .paspartu_enabled div.column2 .grid_section .section_inner,
    .paspartu_enabled .parallax_grid_section .parallax_section_inner,
    .paspartu_enabled .carousel-inner .slider_content_outer,
	.paspartu_enabled nav.content_menu ul,
    .paspartu_enabled .container_inner nav.content_menu,
    .paspartu_enabled .footer_top_border_holder.in_grid,
    .paspartu_enabled .footer_bottom_border_holder.in_grid{
        width: 400px;
    }

	.projects_holder .mix,
	.projects_holder .filler,
	.masonry_with_space .projects_holder .mix,
	.masonry_with_space .projects_holder .filler,
	/*.full_width .projects_masonry_holder .portfolio_masonry_item,*/
    /*.full_width .projects_masonry_holder .portfolio_masonry_item.large_height,*/
    .full_width .projects_masonry_holder .portfolio_masonry_item.large_width,
    .full_width .projects_masonry_holder .portfolio_masonry_item.large_width_height,
    /*.projects_masonry_holder .portfolio_masonry_item,*/
    /*.projects_masonry_holder .portfolio_masonry_item.large_height,*/
    .projects_masonry_holder .portfolio_masonry_item.large_width,
    .projects_masonry_holder .portfolio_masonry_item.large_width_height,
    .full_width .projects_holder_outer.v6 .hover_text, 
    .full_width .projects_holder_outer.v5 .hover_text, 
    .full_width .projects_holder_outer.v4 .hover_text, 
    .full_width .projects_holder_outer.v5 .standard, 
    .full_width .projects_holder_outer.v6 .standard, 
    .full_width .projects_holder_outer.v4 .standard{
		width: 100% !important;
	}

	.masonry_with_space .projects_holder.v6 .portfolio_masonry_grid_sizer,
	.masonry_with_space .projects_holder.v5 .portfolio_masonry_grid_sizer,
	.masonry_with_space .projects_holder.v4 .portfolio_masonry_grid_sizer,
	.masonry_with_space .projects_holder.v3 .portfolio_masonry_grid_sizer{
		width: 100%;
	}

	
	.full_width .masonry_with_space .projects_holder.v6,
	.full_width .masonry_with_space .projects_holder.v5,
	.full_width .masonry_with_space .projects_holder.v4,
	.full_width .masonry_with_space .projects_holder.v3{
		width: auto !important;
	}

	.full_width .projects_masonry_holder .portfolio_masonry_item.default,
	.full_width .projects_masonry_holder .portfolio_masonry_item.large_height {
		width: 50%;
	}

	.projects_holder.hover_text .mix{
		margin: 0 0 5% !important;
	}

	.projects_holder.hover_text.with_btn .mix{
		margin: 0 0 14% !important;
	}

	.portfolio_gallery a.v2,
	.portfolio_gallery a.v3,
	.portfolio_gallery a.v4{
		width: 100%;
		margin: 0px 0px 4% 0px !important;
	}

	.portfolio_gallery a.v3:nth-child(2n),
	.portfolio_gallery a.v4:nth-child(2n){
		margin: 0 0 4% !important;
	}

	.portfolio_single.gallery .portfolio_container{
		margin: -4% 0 0;
	}

	/*important due to single no follow margin-top via JS*/
	.single-portfolio_page .portfolio_detail {
		margin-top: 30px !important;
	}

	.portfolio_navigation .portfolio_prev_label,
	.portfolio_navigation .portfolio_next_label {
		display: none;
	}
	
	.eltd_clients.with_borders .eltd_client_holder_inner:before{
		border-right-width:0px !important;
	}

    .eltd_tabs.horizontal .tabs-nav{
        display: block;
    }
	
	.eltd_tabs.vertical .tabs-nav{
        display: block;
		width: 100%;
    }

    .eltd_tabs.vertical.left .tabs-nav,
    .eltd_tabs.vertical.right .tabs-nav{
        float: none;
    }

    .eltd_tabs .tabs-nav li {
        margin: 0;
        overflow: hidden;
        position: relative;
        display: block;
        float: none;        
    }
	
	.eltd_tabs.tab_with_icon.default .tabs-nav li{
		float: left;
	}
	
	.eltd_tabs.vertical.border_arround_element .tabs-nav li a,
	.eltd_tabs.vertical.border_arround_active_tab .tabs-nav li a,
	.eltd_tabs.vertical.default .tabs-nav li a{
		display: block;
		line-height: 51px;
		min-width: 0 !important;
	}
	
	.eltd_tabs:not(.vertical) .tabs-nav li {
		margin-bottom: 8px;
	}
	

    .eltd_tabs.with_borders .tabs-nav li{
        margin-bottom: 0;
		width: 100%;	
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
    }
	.eltd_tabs.horizontal .tabs-nav li{
		margin: 0;
		width: 100%;	
	}
	
	.eltd_tabs.enable_margin .tabs-nav li{
		margin-bottom: 10px;
	}
	
	.eltd_tabs.horizontal.default.left .tabs-nav li a,
	.eltd_tabs.horizontal.default.center .tabs-nav li a{
		display: block;
		padding-left: 0;
		border-right: 0;
	}
	
	.eltd_tabs.horizontal.default.right .tabs-nav li a {
		display: block;
		padding-right: 0;
		border-right: 0;
	}

    .eltd_tabs.boxed .tabs-container,
    .eltd_tabs .tabs-container{
        padding: 10px 30px;
    }

    .eltd_tabs.vertical .tabs-container,
	.eltd_tabs.vertical.default .tabs-container,
	.eltd_tabs.tab_with_icon.vertical .tabs-container{
        width: 100%;
        padding: 10px 30px !important;		
    }	

    .eltd_tabs .tabs-nav li a{
        padding: 0 20px;
    }
	
	.eltd_tabs.horizontal.border_arround_active_tab .tabs-container,
	.eltd_tabs.vertical.border_arround_active_tab .tabs-container{
		border-top: 0;
	}
	
	.eltd_tabs.border_arround_element.horizontal:not(.border_arround_element).tabs-nav li:not(:last-child){
		border-right: 2px solid #dadada;
		border-bottom: 0;
	}
	.eltd_tabs.border_arround_element.horizontal.enable_margin .tabs-nav li:not(:last-child){
		border-bottom: 0;
	}
	
	.eltd_tabs.border_arround_element.horizontal.disable_margin .tabs-nav li:not(:last-child) a{		
		border-bottom: 0;
		border-right: 2px solid #dadada;
		box-sizing: border-box;
	}
	
	.eltd_tabs.border_arround_element.horizontal.disable_margin .tabs-nav li:not(:last-child) a:after{
		display: none;
	}
	
	.eltd_tabs.vertical.with_borders .tabs-container{
		top:-1px;	
	}
	
	.eltd_tabs.vertical.with_borders.left .tabs-container{
		left: 0;
	}
	
	.eltd_tabs.vertical.right.border_arround_active_tab .tabs-container{
		border-right: 0;
	}
	
	.eltd_tabs.vertical.border_arround_active_tab.left .tabs-container{
		border-left: 0;
	}

	.eltd_tabs.vertical.with_borders.right .tabs-container{
		right: 0;		
	}

    .eltd_tabs.tab_with_text_and_icon .tabs-nav li a {
        padding: 0 !important;
        width: 100%;
		box-sizing: border-box;
    }

    .eltd_tabs.tab_with_text_and_icon .tabs-nav li a span {
        float: none !important;
    }
	
    .gallery_holder ul.gallery_without_space.v5 li,
	.gallery_holder ul.gallery_without_space.v4 li,
	.gallery_holder ul.gallery_without_space.v3 li,
	.gallery_holder ul.gallery_without_space.v2 li{
		width: 50% !important;
	}

	.gallery_holder ul.gallery_with_space.v5 li,
	.gallery_holder ul.gallery_with_space.v4 li,
	.gallery_holder ul.gallery_with_space.v3 li,
	.gallery_holder ul.gallery_with_space.v2 li{
		width: 49% !important;
	}

	.gallery_holder ul.gallery_with_space.v5 li:nth-child(2n),
	.gallery_holder ul.gallery_with_space.v4 li:nth-child(2n),
	.gallery_holder ul.gallery_with_space.v3 li:nth-child(2n),
	.gallery_holder ul.gallery_with_space.v2 li{
		margin-right: 0 !important;
	}

	.gallery_holder ul.gallery_with_space.v5 li:nth-child(3n),
	.gallery_holder .gallery_inner.gallery_with_space.v3 li:nth-child(3n){
		margin-right: 2%;
	}

	#respond textarea{
		padding: 13px;
	}

	.comment_holder .comment-list li ul.children{
		padding: 0 0 0 30px;
	}
	
	.blog_holder.masonry article,
	.two_columns_75_25 .blog_holder.masonry article,
	.two_columns_66_33 .blog_holder.masonry article,
	.two_columns_33_66 .blog_holder.masonry article,
	.two_columns_25_75 .blog_holder.masonry article,
    .two_columns_75_25 .eltd_masonry_blog article,
    .two_columns_66_33 .eltd_masonry_blog article,
    .two_columns_33_66 .eltd_masonry_blog article,
    .two_columns_25_75 .eltd_masonry_blog article,
    .eltd_masonry_blog article{
		width: 100%;
	}

	.blog_holder.masonry.three_columns article,
	.blog_holder.masonry.two_columns article,
	.blog_holder.masonry.three_columns .blog_holder_grid_sizer,
	.blog_holder.masonry.two_columns .blog_holder_grid_sizer {
		width: 100%;
	}

	

	.blog_holder.masonry.three_columns .blog_holder_grid_gutter,
	.blog_holder.masonry.two_columns .blog_holder_grid_gutter {
		width: 0;
	}
	
	.blog_holder.blog_masonry_gallery.two_columns article.square_big,
	.blog_holder.blog_masonry_gallery.two_columns article.rectangle_landscape,
	.blog_holder.blog_masonry_gallery.three_columns article.square_big,
	.blog_holder.blog_masonry_gallery.three_columns article.rectangle_landscape,
	.blog_holder.blog_masonry_gallery.four_columns article.square_big,
	.blog_holder.blog_masonry_gallery.four_columns article.rectangle_landscape,
	.blog_holder.blog_masonry_gallery.five_columns article.square_big,
	.blog_holder.blog_masonry_gallery.five_columns article.rectangle_landscape{
		width: 100%;
	}
	
	.blog_holder.blog_masonry_gallery.two_columns article.square_small,
	.blog_holder.blog_masonry_gallery.two_columns article.rectangle_portrait,
	.blog_holder.blog_masonry_gallery.three_columns article.square_small,
	.blog_holder.blog_masonry_gallery.three_columns article.rectangle_portrait,
	.blog_holder.blog_masonry_gallery.four_columns article.square_small,
	.blog_holder.blog_masonry_gallery.four_columns article.rectangle_portrait,
	.blog_holder.blog_masonry_gallery.five_columns article.square_small,
	.blog_holder.blog_masonry_gallery.five_columns article.rectangle_portrait{
		width:  100%;
	}
	
	.blog_holder.blog_masonry_gallery.two_columns .blog_holder_grid_sizer,
	.blog_holder.blog_masonry_gallery.three_columns .blog_holder_grid_sizer,
	.blog_holder.blog_masonry_gallery.four_columns .blog_holder_grid_sizer,
	.blog_holder.blog_masonry_gallery.five_columns .blog_holder_grid_sizer{
		width: 100%;
	}

	.blog_holder.blog_vertical_loop_type article .post_image_title h2,
	.blog_vertical_loop article:not(.next_post) h2 a{
	    font-size:inherit;
	    line-height:inherit;
	}

	.vc_row:not(.grid_section) .blog-list-masonry-grid-sizer,
	.latest_post_holder.masonry .blog-list-masonry-grid-sizer,
	.latest_post_holder.masonry .blog-list-masonry-item {
		width: 100%;
	}

	.vc_row:not(.grid_section) .blog-list-masonry-grid-sizer-gutter,
	.latest_post_holder.masonry .blog-list-masonry-grid-sizer-gutter {
		width: 0;
	}

    .call_to_action_button_wrapper.right {
        text-align: center !important;
        margin-top: 15px;
    }

    .title h1,
    .title.position_center h1{
        float:none;
        line-height: 1em;
    }

	.title .separator {
		margin-bottom: 5px;
		margin-top: 5px;
	}

	.subtitle{
        display:none;
    }

    .title_subtitle_holder h1 > span{
        padding-bottom: 0;
    }    

    .blog_holder article .post_comments {
        margin-left: 0;
    }

	footer.footer_border_columns .footer_top .eltd_column{
		border-left:none;
	}    

	footer .separator.small.left,
	footer .separator.small.right{
		margin-left: auto;
		margin-right: auto;
	}

		
	.testimonials.image_above.with_arrows{
		padding: 0 50px;
	}
	
	.testimonials.with_icon .testimonial_with_icon_holder .testimonial_icon_holder{
		width: 13%;
	}

	.three_columns_form_with_space > div,
    .three_columns_form_without_space > div{
        width: 100%!important;
        display: block!important;
        text-align: center;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
	
	/* ==========================================================================
	Grid
	========================================================================== */
	.vc_row-fluid [class*='vc_span'] {
		width: 100% !important;
		margin-left: 0 !important;
	}      

	.eltd_image_with_text_over.one_half,
	.eltd_image_with_text_over.one_third,
	.eltd_image_with_text_over.one_fourth{
		width: 100%;
	}

	.call_to_action .to_action_cell{
		display: block;
		text-align: center !important;
		width: 100% !important;
	}

	.call_to_action .text_wrapper .call_to_action_icon_holder{
		position: relative;
		width: 100%;
		text-align: center;
	}
	.call_to_action .text_wrapper .call_to_action_icon{
		display: inline-block;
	}

	.call_to_action.with_custom_icon .text_wrapper .call_to_action_text,
	.call_to_action.with_icon .text_wrapper .call_to_action_text{
		padding: 0;
	}

	.cover_boxes ul li .box .thumb{
		width: 100% !important;
	}

    .cover_boxes ul li.act,
    .cover_boxes ul li .box,
    .cover_boxes.boxes_two ul li.act,
    .cover_boxes.boxes_two ul li .box,
    body.boxed .cover_boxes ul li.act,
    body.boxed .cover_boxes ul li .box,
    body.boxed .cover_boxes.boxes_two ul li.act,
    body.boxed .cover_boxes.boxes_two ul li .box{
        width: 100%;
    }

    .cover_boxes ul li.act,
    .cover_boxes ul li .box a.thumb,
    .cover_boxes.boxes_two ul li.act,
    .cover_boxes.boxes_two ul li .box a.thumb,
    body.boxed .cover_boxes ul li.act,
    body.boxed .cover_boxes ul li .box a.thumb,
    body.boxed .cover_boxes.boxes_two ul li.act,
    body.boxed .cover_boxes.boxes_two ul li .box a.thumb,
    .paspartu_enabled .cover_boxes ul li.act,
    .paspartu_enabled .cover_boxes ul li .box a.thumb,
    .paspartu_enabled .cover_boxes.boxes_two ul li.act,
    .paspartu_enabled .cover_boxes.boxes_two ul li .box a.thumb{
        float: none;
        margin: 0 !important;
    }

    .cover_boxes ul li .box .box_content,
    .cover_boxes.boxes_two ul li .box .box_content,
    body.boxed .cover_boxes ul li .box .box_content,
    body.boxed .cover_boxes.boxes_two ul li .box .box_content,
    .paspartu_enabled .cover_boxes ul li .box .box_content,
    .paspartu_enabled .cover_boxes.boxes_two ul li .box .box_content{
        position: static;
        width: 100%;
    }

    .cover_boxes ul li .box .box_content .box_content_inner{
        z-index:10;
        background-color:rgb(255,255,255);
        opacity:0;
        height:100%;
        padding-left:10px;
        padding-top:15px;
        -webkit-transition: opacity 0.2s ease-in;
        transition: opacity 0.2s ease-in;
    }

    .cover_boxes ul li .box:hover .box_content .box_content_inner{
		opacity:1;
	}

    .cover_boxes ul li.act {
        margin-bottom: 35px !important;
    }

    .cover_boxes ul li .box .thumb img {
        width: 100%;
    }	

	.eltd_circles_holder .eltd_circle_outer{
		width: 100% !important;
	}
	
	.four_columns .column1, .four_columns .column2, .four_columns .column3, .four_columns .column4{
		width: 100%;
	}
	
	.four_columns .column1 .column_inner, .four_columns .column2 .column_inner, .four_columns .column3 .column_inner, .four_columns .column4 .column_inner{
		padding: 0px;
	}

	.footer_top .four_columns .column2 .column_inner > div, 
	.footer_top .three_columns .column2 .column_inner > div, 
	.footer_top .two_columns_50_50 .column2 .column_inner > div,
    .footer_top .four_columns .column3 .column_inner > div,
    .footer_top .three_columns .column3 .column_inner > div,
    .footer_top .four_columns .column4 .column_inner > div,
    footer:not(.footer_border_columns) .footer_top .four_columns .column2 .column_inner > div,
    footer:not(.footer_border_columns) .footer_top .three_columns .column2 .column_inner > div,
    footer:not(.footer_border_columns) .footer_top .two_columns_50_50 .column2 .column_inner > div{
		margin: 0;
	}

	.footer_top .four_columns .column1,
	.footer_top .four_columns .column2,
	.footer_top .four_columns .column3,
	.footer_top .three_columns .column1,
	.footer_top .three_columns .column2, 
	.footer_top .two_columns_50_50 .column1{
		margin: 0 0 25px;
	}

	.wpb_flexslider_custom.flexslider.have_frame{
		width: 307px;
	}

	.wpb_flexslider_custom.flexslider.have_frame.frame3 {
		width: 408px;
	}

	.wpb_flexslider_custom.flexslider.have_frame.frame4 {
		width: 388px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame4 .flex-control-nav {
		bottom: -130px;
	}
	.frame_holder.frame_holder3 .gallery_frame{
		left: 6px;
	}

	.frame_holder > .wpb_wrapper {
		padding: 18px 0 42px 0;
	}

	.frame_holder.frame_holder2 > .wpb_wrapper {
		padding: 23px 0 40px 0;
	}

	.frame_holder.frame_holder3 > .wpb_wrapper {
		padding: 15px 0 140px;
	}

	.frame_holder.frame_holder4 > .wpb_wrapper {
		padding: 16px 0 85px 0;
	}

    .eltd_pricing_tables .eltd_price_table {
        width: 100% !important;
        margin-left: 0;
        margin-bottom: 30px;
    }

    .eltd_pricing_tables .eltd_price_table.active {
        margin-top: 20px;
        margin-bottom: 45px;
    }

    .call_to_action .text_wrapper .call_to_action_text {
        text-align: center;
        margin-bottom: 10px;
    }

    .portfolio_single h2.portfolio_single_text_title span{
    	font-size: 60%;
    }

    .portfolio_single.big-slider .portfolio_container, 
    .portfolio_single.big-images .portfolio_container, 
    .portfolio_single.gallery .portfolio_container{
    	padding: 21px 25px;
    }

    .footer_bottom{
    	height: auto !important;
		padding: 4% 0 !important;
    }

    .vc_text_separator.full .separator_content{
    	padding: 15px 40px;
    }

    .blog_holder article.format-link .post_text .post_text_inner,
    .blog_holder article.format-quote .post_text .post_text_inner{
       padding: 35px 25px;
    }
    .blog_single.blog_holder article.format-link .post_text .post_text_inner,
    .blog_single.blog_holder article.format-quote .post_text .post_text_inner {
        padding: 20px 30px;
    }

	.blog_single.blog_holder.blog_standard_type article.format-link .post_text .post_text_inner,
	.blog_single.blog_holder.blog_standard_type article.format-quote .post_text .post_text_inner{
		padding: 20px 30px 20px 90px;
	}

    .blog_single.blog_holder article.format-link .post_text .post_text_inner .post_info,
    .blog_single.blog_holder article.format-quote .post_text .post_text_inner .post_info,
    .blog_holder article .post_info,
    .blog_holder article h2{
        margin: 0 0 20px;
    }

    .blog_single.blog_holder article.format-link .post_content,
    .blog_single.blog_holder article.format-quote .post_content,
    .blog_holder.blog_single article .post_text .post_text_inner{
        padding: 30px;
    }

    .blog_holder article .post_info>span{
        padding: 0 6px 0 0;
        margin: 0 6px 0 0;
    }

    .blog_holder article .post_info>span:before{
        left: -6px;
    }
    
    .blog_holder article.format-quote .post_text .post_text_inner .post_title a span,
    .blog_holder article.format-link .post_text .post_text_inner .post_title a span{
        font-size: 18px;
        line-height: 28px;
    }
	
    .blog_holder article.format-quote .post_text .quote_author{
        margin: 0;
    }


    body.page-template-full_screen-php:not(.enable_full_screen_sections_on_small_screens){
        font-size: inherit !important;
        height: auto !important;
    }

    body:not(.enable_full_screen_sections_on_small_screens) .full_screen_navigation_holder,
    body:not(.enable_full_screen_sections_on_small_screens) .full_screen_preloader,
    body:not(.enable_full_screen_sections_on_small_screens) .slimScrollBar{
        display: none !important;
        visibility: hidden !important;
    }

    body:not(.enable_full_screen_sections_on_small_screens) .full_screen_inner{
        visibility: visible !important;
        top: auto !important;
        -ms-touch-action: inherit !important;
		touch-action: inherit !important;
    }

    body:not(.enable_full_screen_sections_on_small_screens) .fp-section.fp-table,
    body:not(.enable_full_screen_sections_on_small_screens) .fp-slide.fp-table,
    body:not(.enable_full_screen_sections_on_small_screens) .fp-tableCell,
    body:not(.enable_full_screen_sections_on_small_screens) .slimScrollDiv,
    body:not(.enable_full_screen_sections_on_small_screens) .fp-scrollable{
        height: auto !important;
    }

    body:not(.enable_full_screen_sections_on_small_screens) .vc_row.full_screen_section,
    body:not(.enable_full_screen_sections_on_small_screens) .full_screen_section_slide{
        padding: 30px 0;
    }

    body:not(.enable_full_screen_sections_on_small_screens) .vc_row.full_screen_section.full_screen_section_slides{
        padding: 0;
    }

	.latest_post_holder.boxes.four_columns > ul > li,
    .latest_post_holder.boxes.three_columns > ul > li,
    .latest_post_holder.boxes.two_columns > ul > li
	{
		width: 100%;
        margin: 0 0 25px !important;
    }
	
	.eltd_elements_holder.responsive_mode_from_600.two_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_600.three_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_600.four_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_600.five_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_600.six_columns .eltd_elements_item
	{
		width: 100%;
		display: inline-block;
		height: auto;
	}
	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_600 .eltd_elements_item .eltd_elements_item_content{
		text-align: left !important;
	}
	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_600 .eltd_elements_item .eltd_elements_item_content{
		text-align: center !important;
	}
	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_600 .eltd_elements_item .eltd_elements_item_content{
		text-align: right !important;
	}

	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_600 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px 0;
	}

	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_600 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px auto 20px auto;
	}

	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_600 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px auto;
	}
	
  	.wpb_gallery .wpb_flexslider_custom.have_frame .flex-control-nav {
		bottom: -75px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame2 .flex-control-nav {
		bottom: -70px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame3 .flex-control-nav {
		bottom: -130px;
	}

	.pagination.arrows_on_sides ul li.prev a,
	.pagination.arrows_on_sides ul li.first a,
	.pagination.arrows_on_sides ul li.next a,
	.pagination.arrows_on_sides ul li.last a,
	.comment_pager.arrows_on_sides .prev.page-numbers,
	.comment_pager.arrows_on_sides .next.page-numbers{
		position: relative;
	}
	.pagination.arrows_on_sides ul li.prev.prev_first a{
		left: 0;
	}
	.pagination.arrows_on_sides ul li.next.next_last a {
		right: 0;
	}
	.pagination.arrows_on_sides ul li.prev,
	.pagination.arrows_on_sides ul li.first,
	.pagination.arrows_on_sides ul li.prev.prev_first,
	.pagination.arrows_on_sides ul li.last,
	.pagination.arrows_on_sides ul li.next,
	.pagination.arrows_on_sides ul li.next.next_last,
	.comment_pager .prev.page-numbers,
	.comment_pager .next.page-numbers,
	.comment_pager.arrows_on_sides a:first-child,
	.single_links_pages .single_links_pages_inner > span:first-child,
	.single_links_pages .single_links_pages_inner a:last-child a,
	.single_links_pages .single_links_pages_inner a:first-child span {
		margin: 0 2px 4px 2px;
	}
	.grid-sizer,
	.masonry_gallery_holder.two_columns .grid-sizer,
	.masonry_gallery_holder.three_columns .grid-sizer,
	.masonry_three_columns .grid-sizer {
		width:100%;
	}
	
	.masonry_gallery_item.rectangle_portrait,
	.masonry_gallery_item.square_small,
	.masonry_gallery_holder.two_columns .masonry_gallery_item.square_small,
	.masonry_gallery_holder.two_columns .masonry_gallery_item.rectangle_portrait,
	.masonry_gallery_holder.three_columns .masonry_gallery_item.square_big,
	.masonry_gallery_holder.three_columns .masonry_gallery_item.rectangle_landscape,
	.masonry_gallery_holder.three_columns .masonry_gallery_item.square_small,
	.masonry_gallery_holder.three_columns .masonry_gallery_item.rectangle_portrait,
	.masonry_three_columns .masonry_gallery_item.square_small,
	.masonry_three_columns .masonry_gallery_item.rectangle_portrait {
		width:100%;
	}	
	

	.filter_holder ul li.filter_title{
		width: 100%;
	}

	.filter_holder.without_separator ul li.filter_title span{
		padding: 0 15px;
	}
	
	.blog_slider_simple_holder .blog_text_holder_inner2{
		width: 70%;
	}

	.eltd_slide_subtitle .separator{
		display: none;
	}

	.eltd-info-card-slider-item .front-side {
		padding: 25px 10px 10px;
	}

	.eltd-info-card-slider-item .eltd-info-card-icon {
		font-size: 45px;
	}

	.eltd-info-card-slider-item .back-side .back-side-inner {
		padding: 0 5px;
	}

	.blog_holder.blog_masonry_gallery article.rectangle_landscape .post_image_wrapper {
		vertical-align:middle;
	}
	
	.blog_holder.blog_masonry_gallery article.rectangle_landscape .post_image_wrapper img {
		height:auto;
	}

	.eltd_parallax_layers_holder .image.responsive{
		background-size:100%;
	}

	/*magnified image*/

	.eltd_magnified_image_holder .title_hodler, 
	.eltd_magnified_image_holder .overlay_holder .text_hodler {    
	  	display: none !important;
	}

	/* ==========================================================================
	   #Image Stack
	 ========================================================================== */
	.image_stack .image.inner {    
		display: none;
	}
	.image_stack .image.image_3of5 {    
		width: 100% !important;
	}
	.image_stack .pop_up_image_holder {    
		left: 50% !important;
	}
	.responsive_overlay {
		opacity: 1;
		filter: alpha(opacity=100);
	}

	.pop_up_image_holder {
    	-webkit-transition: opacity .3s ease-out .5s, -webkit-transform .4s ease-out;
        transition: opacity .3s ease-out .5s, transform .4s ease-out;
	}

	.image_stack .pop_up_image_holder .shader {
		-webkit-transition: left .2s ease .85s, top .2s ease .85s,  -webkit-transform .22s ease;
		transition: left .2s ease .85s, top .2s ease .85s,  transform .22s ease;
	}
	/* ==========================================================================
	 #End Image Stack
	 ========================================================================== */
}

@media only screen and (max-width: 480px){

	body.boxed:not(.has_general_padding) .wrapper .wrapper_inner,
	body.boxed.has_general_padding .wrapper .wrapper_inner,
	body.boxed footer,
	body.boxed .header_inner,
	body.boxed:not(.has_general_padding) .full_width .parallax_content,
	body.boxed .carousel-inner,
    body.boxed .content_wrapper{
		width: 350px;
	}

	body.boxed .footer_inner,
    body.boxed .footer_top_border_holder.in_grid,
    body.boxed .footer_bottom_border_holder.in_grid{
		width: 100%;
	}
	
	.eltd_search_form_2 .container_inner,
	.eltd_search_form_3 .container_inner,
	.eltd_search_form_2 .form_holder,
	.eltd_search_form_3 .form_holder{
		width: auto;
		padding: 0 15px;
	}
	

	.eltd_search_form_2 .container_inner input[type="submit"],
	.eltd_search_form_3 .container_inner .eltd_search_close,
	.eltd_search_form_2  input[type="submit"],
	.eltd_search_form_3  .eltd_search_close{
		right:15px;
	}
	
	.container_inner,
	body.has_general_padding .title_holder .container_inner,
	.boxed div.section .section_inner,
	div.grid_section .section_inner,
	div.column1 .grid_section .section_inner,
	div.column2 .grid_section .section_inner,
    .parallax_grid_section .parallax_section_inner,
	.carousel-inner .slider_content_outer,
	nav.content_menu ul,
    .container_inner nav.content_menu,
    .footer_top_border_holder.in_grid,
    .footer_bottom_border_holder.in_grid,
    .grid_1300 .header_top_bottom_holder .container_inner,
    .grid_1300 footer .container_inner,
    .grid_1200 .header_top_bottom_holder .container_inner,
    .grid_1200 footer .container_inner,
    .grid_1000 .header_top_bottom_holder .container_inner,
    .grid_1000 footer .container_inner,
    .grid_800 .header_top_bottom_holder .container_inner,
    .grid_800 footer .container_inner{
		width: 300px;
	}

    .paspartu_enabled .container_inner,
    .paspartu_enabled.boxed div.section .section_inner,
    .paspartu_enabled div.grid_section .section_inner,
    .paspartu_enabled div.column1 .grid_section .section_inner,
    .paspartu_enabled div.column2 .grid_section .section_inner,
    .paspartu_enabled .parallax_grid_section .parallax_section_inner,
    .paspartu_enabled .carousel-inner .slider_content_outer,
	.paspartu_enabled nav.content_menu ul,
    .paspartu_enabled .container_inner nav.content_menu,
    .paspartu_enabled .footer_top_border_holder.in_grid,
    .paspartu_enabled .footer_bottom_border_holder.in_grid{
        width: 300px;
    }

	.blog_holder.masonry{
		width: 300px !important;
	}
	
	.fixed_top_header .header_bottom_right_widget_holder{
		display: none;
	}
	
	.header_bottom,
	footer .container_inner{
		padding: 0px 25px;
	}

    .side_menu .close_side_menu_holder{
        right: 18px;
    }

    .footer_top.footer_top_full{
        padding: 82px 25px 76px;
    }

    footer .container_inner{
		width: auto;
	}
	
	nav.mobile_menu > ul{
		width: auto;
	}
	
	.projects_holder.hover_text .mix{
		margin: 0 0 7.4% !important;
	}

	.projects_holder.hover_text.with_btn .mix{
		margin: 0 0 18.4% !important;
	}

    .projects_holder.hover_text article .icons_holder,
	.projects_holder.hover_text.v3 article .icons_holder,
	.projects_holder.hover_text.v2 article .icons_holder,
	.portfolio_slides .icons_holder{
		bottom: 30px;
		left: 30px;
	}

	.projects_holder article .image_holder .text_holder,
	.projects_holder.v3 article .image_holder .text_holder,
	.projects_holder.v2 article .image_holder .text_holder,
	.portfolio_slides .image_holder .text_holder{
		padding: 25px 30px 60px;
	}
	
	.projects_holder article .image_holder.elegant_hover .text_holder,
	.projects_holder.v3 article .image_holder.elegant_hover .text_holder,
	.projects_holder.v2 article .image_holder.elegant_hover .text_holder{
		padding: 25px 30px;
	}

	.single_tags {
    	margin: 35px 0 0 19%;
	}	

	.eltd_tabs .tabs-nav li a{
		padding: 0 5px;
	}

    .eltd_tabs.icon .tabs-nav li a{
        padding: 0;
    }
	.gallery_holder ul.gallery_without_space.v5 li,
	.gallery_holder ul.gallery_without_space.v4 li,
	.gallery_holder ul.gallery_without_space.v3 li,
	.gallery_holder ul.gallery_without_space.v2 li,
	.gallery_holder ul.gallery_with_space.v5 li,
	.gallery_holder ul.gallery_with_space.v4 li,
	.gallery_holder ul.gallery_with_space.v3 li,
	.gallery_holder ul.gallery_with_space.v2 li{
		width: 100% !important;
		margin-right: 0 !important;
	}


	.comment_holder .comment-list li ul.children{
		padding: 0 0 0 15px;
	}

	.box_image_with_border{
		margin: 0px 0px 30px 0px;
	}
        
	.box_image_holder .box_icon .fa-stack {
		font-size: 4em;
	}
    
    .blog_holder article .post_description .post_description_left{
		display: inline-block;
		float: none;
		margin: 0 0 5px;
		width: 100%;
    }

	.blog_holder article .post_description .post_description_right{
		float: none;
	}

	.blog_holder .blog_vertical_loop_clapper .post_info div{
        margin-right:10px;
    }
    .blog_vertical_loop article .post_image{
        margin-bottom:40px!important;
    }
    .blog_holder.blog_vertical_loop_type article .post_info {
        margin: 5px 0 20px;
    }
    .blog_vertical_loop_type .post_image_inner .post-subtitle h4{
        margin-bottom:20px;
    }
    .blog_holder.blog_vertical_loop_type article.next_post .post_info{
        text-align:left;
    }

	.author_description_inner .image{
		float:none;
	}

	.author_text_holder{
		padding: 0 20px;
	}

	.single_tags {
			margin-left: 0;
	}

	.footer_top .column_inner > div{
		margin: 0 0 25px !important;
	}

	.footer_top .column_inner{
		border: 0;
	}

    .side_menu_button > a,
    .side_menu_button a.search_covers_header,
    .side_menu_button a.search_slides_from_header_bottom,
    .side_menu_button a.fullscreen_search,
    .side_menu_button a.fullscreen_search_close {
        padding: 0 0 0 5px;
    }

    .side_menu_button a + .side_menu_button_link{
        margin-left: 0;
    }

	
	.eltd_counter_holder.center {
		padding: 20px;
	}
	
	.eltd_clients.six_columns .eltd_client_holder,
	.eltd_clients.five_columns .eltd_client_holder,
	.eltd_clients.four_columns .eltd_client_holder,
	.eltd_clients.three_columns .eltd_client_holder,
	.eltd_clients.two_columns .eltd_client_holder{
		width:100%;
	}

	.eltd_clients.six_columns .eltd_client_holder:nth-child(3n) .eltd_client_holder_inner:before,
	.eltd_clients.five_columns .eltd_client_holder:nth-child(3n) .eltd_client_holder_inner:before,
	.eltd_clients.four_columns .eltd_client_holder:nth-child(3n) .eltd_client_holder_inner:before,
	.eltd_clients.three_columns .eltd_client_holder:nth-child(3n) .eltd_client_holder_inner:before,
	.eltd_clients.six_columns .eltd_client_holder .eltd_client_holder_inner:before,
	.eltd_clients.five_columns .eltd_client_holder .eltd_client_holder_inner:before,
	.eltd_clients.four_columns .eltd_client_holder .eltd_client_holder_inner:before,
	.eltd_clients.three_columns .eltd_client_holder .eltd_client_holder_inner:before,
	.eltd_clients.two_columns .eltd_client_holder .eltd_client_holder_inner:before{
		border-right-width:0;
	}

	.eltd_accordion_holder,
	.eltd_tabs,
	.testimonials.testimonials_carousel{
		visibility: visible !important;
	}

	.eltd_accordion_holder.accordion:not(.boxed) div.accordion_content{
		padding: 0;
	}

	.eltd_accordion_holder.accordion:not(.boxed) div.accordion_content_inner{
		padding: 20px 0 0;
	}

	.eltd_accordion_holder.accordion:not(.boxed) .ui-accordion-header span.tab-title {
		padding: 0 0 0 58px;
	}

	.title.title_size_large h1 {
		font-size: 28px;
        line-height: 30px;
	}

	.wpb_flexslider_custom.flexslider.have_frame{
		width: 220px;
	}

	.wpb_flexslider_custom.flexslider.have_frame.frame3 {
		width: 292px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame4 .flex-control-nav {
		bottom: -105px;
	}
	.wpb_flexslider_custom.flexslider.have_frame.frame4 {
		width: 276px;
	}

	.frame_holder.frame_holder3 .gallery_frame{
		left: 4px;
	}

	.frame_holder > .wpb_wrapper {
		padding: 12px 0 30px 0;
	}

	.frame_holder.frame_holder2 > .wpb_wrapper {
		padding: 17px 0 28px 0;
	}

	.frame_holder.frame_holder3 > .wpb_wrapper {
		padding: 10px 0 110px;
	}

	.frame_holder.frame_holder4 > .wpb_wrapper {
		padding: 11px 0 60px 0;
	}

    div.pp_pic_holder{
        width: 100% !important;
        left: 0 !important;
    }
    .pp_content {
        width: 100% !important;
        height: 300px !important;
    }
    .pp_hoverContainer {
        width: 100% !important;
        height: 250px !important;
    }
    #pp_full_res > img{
        width: 100% !important;
        height: auto !important;
    }
    div.pp_default .pp_details{
        width: 98% !important;
    }
    div.ppt{
        width:100% !important;
    }

    .filter_holder ul li span,
    .filter_holder.without_separator ul li span{
    	padding: 0 10px;
    }

    .filter_holder.without_separator ul li.filter_title span{
		padding: 0 10px;
	}

    .vc_text_separator.full .separator_content{
    	padding: 12px 35px;
    }
    
    .blog_single.blog_holder article.format-link .post_text .post_text_inner,
    .blog_single.blog_holder article.format-quote .post_text .post_text_inner {
        padding: 20px 25px;
    }

    .blog_single.blog_holder article.format-link .post_text .post_text_inner .post_info,
    .blog_single.blog_holder article.format-quote .post_text .post_text_inner .post_info,
    .blog_holder article .post_info,
    .blog_holder article h2{
        margin: 0 0 15px;
    }

    .blog_single.blog_holder article.format-link .post_content,
    .blog_single.blog_holder article.format-quote .post_content,
    .blog_holder.blog_single article .post_text .post_text_inner{
        padding: 25px;
    }

    body.page-template-blog-masonry-full-width-php .content .full_width .full_width_inner {
        padding: 44px 25px 25px;
    }

    .mejs-controls div.mejs-horizontal-volume-slider{
        width: 55px;
    }
    .mejs-controls .mejs-horizontal-volume-slider .mejs-horizontal-volume-total{
        width: 55px;
    }

    .blog_holder article.format-link .post_text .post_text_inner,
    .blog_holder article.format-quote .post_text .post_text_inner{
        padding: 20px;
    }

    .blog_holder article.format-quote .post_text .quote_image .post_text_inner .post_title a span.quote_author{
        margin: 10px 0 0;
    }
    .blog_holder article.format-quote .post_text .post_text_inner .post_info,
    .blog_holder article.format-link .post_text .post_text_inner .post_info{
        margin: 5px 0 0;
    }
    .blog_holder.blog_large_centered_icon article.format-quote .post_content_holder .post_text .post_text_inner{
        padding: 25px 15px 40px 15px;
    }
	.title.standard_title .breadcrumb{
		margin-top:10px;
	}

	.breadcrumb a,
	.breadcrumb span{
		font-size:14px;
	}
	.eltd_elements_holder.responsive_mode_from_480.two_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_480.three_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_480.four_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_480.five_columns .eltd_elements_item,
	.eltd_elements_holder.responsive_mode_from_480.six_columns .eltd_elements_item
	{
		width: 100%;
		display: inline-block;
		height: auto;
	}
	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_480 .eltd_elements_item .eltd_elements_item_content{
		text-align: left !important;
	}
	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_480 .eltd_elements_item .eltd_elements_item_content{
		text-align: center !important;
	}
	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_480 .eltd_elements_item .eltd_elements_item_content{
		text-align: right !important;
	}

	.eltd_elements_holder.alignment_one_column_left.responsive_mode_from_480 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px 0;
	}

	.eltd_elements_holder.alignment_one_column_center.responsive_mode_from_480 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px auto 20px auto;
	}

	.eltd_elements_holder.alignment_one_column_right.responsive_mode_from_480 .eltd_elements_item_content .separator.small.inherit{
		margin: 10px 0 20px auto;
	}

	.wpb_gallery .wpb_flexslider_custom.have_frame .flex-control-nav {
		bottom: -65px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame2 .flex-control-nav{
		bottom: -60px;
	}
	.wpb_gallery .wpb_flexslider_custom.have_frame.frame3 .flex-control-nav {
		bottom: -100px;
	}
	
	.blog_holder.blog_masonry_gallery .blog_holder_grid_sizer{
		width: 50%;
	}

	.blog_holder.blog_masonry_gallery article.square_big,
	.blog_holder.blog_masonry_gallery article.rectangle_landscape{
		width: 100%;
	}

	.blog_holder.blog_masonry_gallery article.rectangle_portrait,
	.blog_holder.blog_masonry_gallery article.square_small{
		width: 50%;
	}

	.full_width .projects_masonry_holder .portfolio_masonry_grid_sizer,
	.full_width .projects_masonry_holder.gs4 .portfolio_masonry_grid_sizer,
    .full_width .projects_masonry_holder.gs3 .portfolio_masonry_grid_sizer{
		width: 100%;
	}

	.full_width .projects_masonry_holder .portfolio_masonry_item.default,
	.full_width .projects_masonry_holder .portfolio_masonry_item.large_width,
	.full_width .projects_masonry_holder .portfolio_masonry_item.large_height,
	.full_width .projects_masonry_holder .portfolio_masonry_item.large_width_height {
		width: 100% !important;
	}

	.projects_masonry_holder .portfolio_masonry_grid_sizer {
		width: 100%;
	}

	.projects_masonry_holder .portfolio_masonry_item.default,
	.projects_masonry_holder .portfolio_masonry_item.large_width,
	.projects_masonry_holder .portfolio_masonry_item.large_height,
	.projects_masonry_holder .portfolio_masonry_item.large_width_height {
		width: 100%;
	}


	.title_holder .vc_text_separator.full .separator_wrapper{
		padding:0;
	}
	
	.title_holder .vc_text_separator .eltd_line_before,
	.title_holder .vc_text_separator .eltd_line_after{
		display: none;
	}
	.title .title_content_background{
		padding: 0 25px !important;
	}
	.title_subtitle_holder h1 > span{
		padding: 10px !important;
	}
	
	.side_menu_button_wrapper .side_menu_button a.search_covers_header, 
	.side_menu_button_wrapper .side_menu_button a.search_slides_from_header_bottom, 
	.side_menu_button_wrapper .side_menu_button a.fullscreen_search,
	.side_menu_button_wrapper .side_menu_button a.search_covers_header:hover, 
	.side_menu_button_wrapper .side_menu_button a.search_slides_from_header_bottom:hover, 
	.side_menu_button_wrapper .side_menu_button a.fullscreen_search:hover{
		background-color: transparent !important;
	}

    .eltd_instagram_feed.col_4 li,
    .eltd_instagram_feed.col_3 li,
    .eltd_instagram_feed.col_6 li,
    .eltd_instagram_feed.col_9 li {
        width: 100%;
    }

    .two_columns_form_with_space > div,
    .two_columns_form_without_space > div{
        width: 100%!important;
        display: block!important;
        text-align: center;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
	
	.testimonials.carousel .testimonial_content_inner .testimonial_icon_holder {
		width:25%;
	}
	
	.testimonials.carousel .testimonial_content_inner .testimonial_author_holder {
		width:75%;
	}

	.no_image_carousel_navigation a:first-child {
		border-top-width:2px;
		border-left-width:2px;
		border-right-width:2px;
		border-bottom-width:1px;
	}

	.no_image_carousel_navigation a:last-child {
		border-top-width:1px;
		border-left-width:2px;
		border-right-width:2px;
		border-bottom-width:2px;
	}	

	.portfolio_social_section > div[class^='portfolio'] {    
	  display: block !important;    
	  margin: 10px 20px;    
	  text-align: left;
	}
	
	.portfolio_social_section > div[class^='portfolio']:before {    
	  display: none !important;
	}
	
	.latest_post_holder.boxes .post_info_section > div {
		padding: 0 10px;
	}
	
	.latest_post_holder.boxes .post_info_section > div:first-child {
		padding: 0 10px 0 0;
	}

	/*magnified image*/

	.eltd_magnified_image_holder .overlay_holder {    
	  	padding: 15% 5px 0px;
	}

	.eltd_magnified_image_holder .overlay_holder .subtitle_hodler {    
	  	margin-bottom: 5px;
	}
	
	/* header top*/
	
	.header-widget.widget_search.header-right-widget {
		display: none;
	}

	.header_top .left,
	.header_top .right {
		width: 49%;
	}
	
	aside .widget #lang_sel > ul > li > a:after, 
	aside .widget #lang_sel_click > ul > li > a:after, 
	section.side_menu #lang_sel > ul > li > a:after, 
	section.side_menu #lang_sel_click > ul > li > a:after, 
	footer #lang_sel > ul > li > a:after, 
	footer #lang_sel_click > ul > li > a:after, 
	.header_top #lang_sel > ul > li > a:after, 
	.header_top #lang_sel_click > ul > li > a:after, 
	.header_bottom #lang_sel > ul > li > a:after, 
	.header_bottom #lang_sel_click > ul > li > a:after {
		right: 0;
	}

	.search.search-results .post .blog_title_post_info_holder .post_text {    
	  margin-top: -20px !important;    
	  padding-left: 30px !important;    
	  margin-right: -20px;
	}
	
	.search.search-results .post .blog_title_post_info_holder .post_text * {    
	  line-height: 15px !important;
	}

}

@media only screen and (max-width: 420px){
	
	body.boxed:not(.has_general_padding) .wrapper .wrapper_inner,
	body.boxed.has_general_padding .wrapper .wrapper_inner,
	body.boxed footer,
	body.boxed .header_inner,
	body.boxed:not(.has_general_padding) .full_width .parallax_content,
	body.boxed .carousel-inner,
    body.boxed .content_wrapper{
		width: 320px;
	}
	
	.header_bottom,
	footer .container_inner,
	nav.content_menu{
		padding: 0 15px;
	}

	.footer_top .container_inner{
		padding-left: 15px;
		padding-right: 15px;
	}

    .side_menu .close_side_menu_holder{
        right: 12px;
    }

    .pp_content {
        height: 250px !important;
    }
    .pp_hoverContainer{
        height: 200px !important;
    }
    nav.content_menu .nav_select_menu{
        border: none;
    }
	
	.qbutton.animate_button .text_holder,
	.qbutton.icon_right .text_holder,
	.load_more.icon_right a .text_holder,
	.load_more.animate_button a{
		padding: 0 10px;
	}
	

}

@media only screen and (max-width: 350px) {   

    body:not(.has_general_padding) .section_inner_margin,
	.parallax_section_inner_margin{ 
		margin: 0; 
	}

	.blog_holder.blog_masonry_gallery .blog_holder_grid_sizer{
		width: 100%;
	}

	.blog_holder.blog_masonry_gallery article.square_big,
	.blog_holder.blog_masonry_gallery article.rectangle_landscape,
	.blog_holder.blog_masonry_gallery article.rectangle_portrait,
	.blog_holder.blog_masonry_gallery article.square_small{
		width: 100%;
	}

	.side_menu_button > a > .search_icon_text{
        display: none!important;
    }

    .side_menu_button > a > .fa-search{
        margin-right: 3px;
    }
	.title_subtitle_holder h1 > span{
		padding: 5px !important;
	}
	.header_bottom .container_inner{
		width:290px;
	}
	
	.eltd_counter_holder span.counter {
		font-size: 60px !important;
	}

}
@media only screen and (max-width: 300px) {
	.container_inner,
    body.has_general_padding .title_holder .container_inner,
    .boxed div.section .section_inner,
    div.grid_section .section_inner,
	div.column1 .grid_section .section_inner,
	div.column2 .grid_section .section_inner,
    .full_width .parallax_content,
    .carousel-inner .slider_content_outer, nav.content_menu,
    .grid_1300 .header_top_bottom_holder .container_inner,
    .grid_1300 footer .container_inner,
    .grid_1200 .header_top_bottom_holder .container_inner,
    .grid_1200 footer .container_inner,
    .grid_1000 .header_top_bottom_holder .container_inner,
    .grid_1000 footer .container_inner,
    .grid_800 .header_top_bottom_holder .container_inner,
    .grid_800 footer .container_inner{
        width: 95%;
    }
}


/* ==========================================================================
   1. Reset default styles
   ========================================================================== */
html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,
ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{
	background: transparent;
	border: 0;
	margin: 0;
	padding: 0;
	vertical-align: baseline;
	outline: none;
}

article, aside, details, figcaption, figure, footer, header, hgroup, nav, section {
	display: block;
}

blockquote {
	quotes: none;
}

blockquote:before,blockquote:after {
	content: '';
	content: none;
}

del {
	text-decoration: line-through;
}

/* tables still need 'cellspacing="0"' in the markup */
table {
	border-collapse: collapse;
	border-spacing: 0;
	border: medium none;
	vertical-align: middle;
}

table th{
	border: 0;
	padding: 5px 7px;
	text-align: center;
}

table td {
	padding: 5px 10px;
	text-align: center;
}

a img {
	border: none;
}

img,.wp-caption{
	max-width: 100%;
	height: auto;
}
/* ==========================================================================
   End of reset styles
   ========================================================================== */

/* ==========================================================================
   Grid system styles
   ========================================================================== */
/**
 * Here are defined styles for grid system that is used outside Visual Composer
 */



.four_columns{
	width: 100%;
}

.four_columns>.column1,
.four_columns>.column2,
.four_columns>.column3,
.four_columns>.column4{
	width: 50%;
	float: left;
}

.four_columns>.column1>.column_inner{
	padding: 0 15px 0 0;
}

.four_columns>.column2>.column_inner{
	padding: 0 10px 0 5px;
}

.four_columns>.column3>.column_inner{
	padding: 0 5px 0 10px;
}

.four_columns>.column4>.column_inner{
	padding: 0 0 0 15px;
}

/* ==========================================================================
   End of grid system styles
   ========================================================================== */


/* ==========================================================================
   Footer styles
   ========================================================================== */
/**
 * Here are defined footer styles for all it's types, typography and widgets
 */
footer{
	display: block;
	width: 100%;
	margin: 0px auto;
	z-index: 100;
	position: relative;
	box-sizing:border-box;
	-moz-box-sizing:border-box; /* Firefox */
}

footer.footer_overlapped{
    z-index: 99; /* overlapping content over footer, content's z-index needs to be higher than footer's */
}

footer.uncover{
	position: fixed;
	bottom: 0px;
	left: 0px;
	z-index: 99;
	-webkit-transition: left 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1);
	-moz-transition: left 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1);
	-o-transition: left 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1);
	-ms-transition: left 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1);
	transition: left 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1);
	/* -webkit-backface-visibility: hidden; disabled because of parallax sections with 0 speed */
}


footer.uncover .cf7_custom_style_2 input.wpcf7-form-control.wpcf7-text,
footer.uncover .cf7_custom_style_2 input.wpcf7-form-control.wpcf7-number,
footer.uncover .cf7_custom_style_2 input.wpcf7-form-control.wpcf7-date,
footer.uncover .cf7_custom_style_2 textarea.wpcf7-form-control.wpcf7-textarea,
footer.uncover .cf7_custom_style_2 select.wpcf7-form-control.wpcf7-select,
footer.uncover .cf7_custom_style_2 input.wpcf7-form-control.wpcf7-quiz{
	transform: none;
}

.boxed footer{
	width: 100% !important;
	box-sizing:border-box;
	-moz-box-sizing:border-box; /* Firefox */
}

footer.disable_footer{
    display: none;
}

.right_side_menu_opened footer.uncover{
	left: -270px;
}

footer .footer_inner{
	position: relative; /* for triangle back to top and ajax transitions */
}

footer .container{
	background-color: inherit;
}

footer .container_inner{
	position: relative;
}

footer .container_inner > .widget{
	text-align: center;
}

footer a{
    text-decoration: none;
}

.footer_top_border_holder,
.footer_bottom_border_holder{
    position: relative;
    display: block;
    width: 100%;
}

.footer_top_border_holder.in_grid,
.footer_bottom_border_holder.in_grid{
    width: 1100px;
    margin: 0 auto;
}

.footer_top_holder{
	display: block;
	background-color: #393939;
    position:relative;
    background-position:center center;
	background-size: cover;
}

.footer_ingrid_border_holder_outer{
	background-color: #393939;
}

.footer_top .container_inner{
	padding: 82px 0px 76px;
}

.footer_top .widget h4{
	color: #fff;
	margin: 0 0 15px;
}

.footer_top ul{
	list-style: none;
}

.footer_top a,
.footer_top p,
.footer_top li,
.footer_top .textwidget,
.footer_top .widget_recent_entries > ul > li > span{
	color: #a2a2a2;
	word-wrap: break-word;
}

.footer_top a:hover{
	color: #fff;
}

.footer_top a img{
	vertical-align: middle;
}

footer.footer_border_columns .footer_top .eltd_column {
	border-left: 1px solid #444;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

footer.footer_border_columns .eltd_column:first-child {
	border: none;
}

footer.footer_border_columns .eltd_column > .column_inner {
	padding: 0 20px;
}


@media only screen and (max-width: 768px){
	footer.footer_border_columns .eltd_column > .column_inner {
		padding: 0 10px;
	}
}

//paddddddddddddd


.footer_top  .widget.widget_rss li a.rsswidget, 
.footer_top #wp-calendar caption{
	color: #8d8d8d;
}

.footer_top .widget_recent_entries > ul > li,
.footer_top .widget_recent_comments > ul > li,
.footer_top .widget_meta > ul > li,
.footer_top .widget_nav_menu ul li,
.footer_top .widget_pages ul li {
	padding: 0px;
	position: relative;
}

.footer_top .widget_nav_menu ul li ul,
.footer_top .widget_pages ul li ul{
	padding: 0 0 0 10px;
}

.footer_top .widget_recent_entries > ul > li > a,
.footer_top .widget_pages > ul > li > a,
.footer_top .widget_meta > ul > li > a,
.footer_top .widget_nav_menu ul li  a,
.footer_top .widget_recent_comments > ul > li > a,
.footer_top .widget_recent_entries > ul > li > span{
	display: inline-block;
}

.footer_bottom_holder{
    display: table;
    width: 100%;
	background-color: #f6f6f6;
    vertical-align: middle;
    text-align: center;
    height: 65px;
    box-sizing: border-box;
}

.footer_bottom_holder_inner{
    display: table-cell;
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

.footer_bottom_holder .column_inner{
    text-align: center;
    vertical-align: middle;
}

.footer_bottom_holder .three_columns .column1 .column_inner{
    text-align: left;
}

.footer_bottom_holder .three_columns .column2 .column_inner{
    text-align: center;
}

.footer_bottom_holder .three_columns .column3 .column_inner{
    text-align: right;
}

.footer_bottom_holder .two_columns_50_50 .column1 .column_inner{
    text-align: left;
}

.footer_bottom_holder .two_columns_50_50 .column2 .column_inner{
    text-align: right;
}

.footer_bottom_border_bottom_holder{
    clear: both;
}

.footer_bottom_holder p,
.footer_bottom_holder span,
.footer_bottom_holder ul li a{
	margin: 0px;
	color: #393939;
}

.footer_bottom_holder .qbutton .text_holder > span, 
.footer_bottom_holder .qbutton .icon_holder > span {
	color: #fff;
}

.footer_bottom_holder ul li a{
	line-height: 44px;
}

footer .widget_calendar table thead tr, footer .widget_calendar table tbody tr, footer #wp-calendar tbody td {
	border-color: #a2a2a2;
}

.footer_bottom_holder ul {
	list-style: none;
}

.footer_bottom_holder ul .sub-menu {
	display: none;
}

.footer_bottom_holder ul li {
	display: inline-block;
	margin-right: 30px;
}

.footer_bottom_holder ul li:last-child {
	margin-right: 0;
}

.eltd_font_elegant_icon {
    font-family: 'ElegantIcons' !important;
}

.eltd_icon_shortcode .fa{
    font-family: 'fontawesome' !important;
}

.eltd_instagram_feed {
    list-style-type: none;
    margin-left: -5px;
    margin-right: -5px;
}

.eltd_instagram_feed li {
    float: left;
    padding: 0 5px;
    margin-bottom: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.eltd_instagram_feed li img {
    display: block;
}

.eltd_instagram_feed.col_9 li {
    width: 11.11111111111111%;
}

.eltd_instagram_feed.col_6 li {
    width: 16.66666666666667%;
}

.eltd_instagram_feed.col_4 li {
    width: 25%;
}

.eltd_instagram_feed.col_3 li {
    width: 33.33%;
}

.eltd_instagram_feed.col_2 li {
    width: 50%;
}


/* ==========================================================================
   End of footer styles
   ========================================================================== */




      `}</style>

			</div>


		)
	}
};


export default Footer;