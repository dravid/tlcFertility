import React from 'react';


const Header = () => (

	<header className="header-login-signup">

		<div className="header-limiter">

			<h1><a href="#">Company<span>logo</span></a></h1>

			<nav>
				<a href="#">Home</a>
				<a href="#" className="selected">Blog</a>
				<a href="#">Pricing</a>
			</nav>

			<ul>
				<li><a href="#">Login</a></li>
				<li><a href="#">Sign up</a></li>
			</ul>

		</div>

	</header>

)

export default Header;