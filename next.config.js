if (typeof require !== 'undefined') {
	require.extensions['.less'] = file => { };
}

const devUrl = 'http://localhost:3300';
const prodUrl = 'https://www.tlcfertility.com';
const cacheBusterRandom = 'Forbiden info';
const cacheBuster = 'Forbiden info';
const TerserPlugin = require('terser-webpack-plugin');

//Image optimiser
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const withLess = require('@zeit/next-less'),
	nextConfig = {
		publicRuntimeConfig: {
			weatherApi: '',
			mapBoxApi: '',
			devUrl: devUrl,
			prodUrl: prodUrl,
			siteUrl: (process.env.NODE_ENV !== 'production') ? devUrl : prodUrl,
			cacheBusterRandom: 'Forbiden info',
			cacheBuster: 'Forbiden info',
			noCache: cacheBusterRandom + '=' + cacheBuster,
			constants: {
				signUp: {
					userExists: 'user_exists',
					verificationEmailSent: 'verification_email_sent'
				}
			}
		},
		webpack: (config, { dev }) => {
			if (!dev) {
				config.optimization.minimizer = [
					new TerserPlugin({
						parallel: true,
						cache: true,
						sourceMap: true,
						terserOptions: {
							safari10: true,
							// keep_fnames: true
							keep_fnames: /^Jodit/
						},
					}),
				];
				return config;
			}
			else {
				return config
			}
		},
		// optimization: { minimizer: [new TerserPlugin({ terserOptions: { ecma: undefined, warnings: false, parse: {}, compress: {}, mangle: true, module: false, output: null, toplevel: false, nameCache: null, ie8: false, keep_classnames: undefined, keep_fnames: true, safari10: false } })] },
		onDemandEntries: {
			maxInactiveAge: 1000 * 60 * 60,
			pagesBufferLength: 5
		},
		lessLoaderOptions: {
			modifyVars: {
				siteUrl: 'https://www.tlcfertility.com'
			},
			javascriptEnabled: true
		}
		// webpack: config => config
	};


module.exports = withPlugins([
	[optimizedImages, {
		// these are the default values so you don't have to provide them if they are good enough for your use-case.
		// but you can overwrite them here with any valid value you want.
		inlineImageLimit: 32768,
		imagesFolder: 'images',
		imagesName: '[name]-[hash].[ext]',
		handleImages: ['jpeg', 'png', 'svg', 'webp'],
		optimizeImages: true,
		optimizeImagesInDev: true,
		mozjpeg: {
			quality: 60,
		},
		optipng: {
			optimizationLevel: 3,
		},
		webp: {
			preset: 'default',
			quality: 60,
		},
	}],
	withLess,
], nextConfig);

// module.exports = withLess(nextConfig, );
