import breaks from 'remark-breaks'
import emoji from 'remark-emoji'
import externalLinks from 'remark-external-links'
import taskList from 'remark-task-list'

import highlight from './highlight.js'
import languageName from './languageName.js'

import * as path from 'path'
const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')

export default {
	title: 'kaoscript',
	description: 'A chaotic programming language',
	repository: 'https://github.com/kaoscript/kaoscript',
	indexHtml: 'src/docs/index.html',
	theme: 'src/theme/index',
	typescript: true,
	propsParser: false,
	ignore: ['readme.md', 'src/theme/**'],
	public: 'public',
	htmlContext: {
		favicon: '/public/favicons/favicon.ico',
	},
	menu: [
		{
			name: 'Welcome',
			menu: [
				'About kaoscript',
				'Getting Started',
				'Quick Overview',
			]
		},
		{
			name: 'Guide',
			menu: [
				'Comments',
				'Variable Declarations',
				'Basic Types',
				'Basic Operators',
				'Control Flow Statements',
				'Control Flow Expressions',
				'Functions',
				'Typing',
				'Classes',
				'Enums',
				'Namespaces',
				'Error Handling',
				'Modules',
				'Dependencies',
				'Attributes',
				'Macro',
				'Keywords',
			]
		}
	],
	themeConfig: {
		mode: 'light',
		logo: {
			src: '/public/images/kaoscript-logo-title-horizontal.png',
			width: 200,
		},
		colors: {
			sidebarPrimary: '#342780',
			githubLink: {
				icon: '#342780',
				background: '#F2E30E'
			}
		},
		fonts: {
			// ui: 'Fira Code'
		},
	},
	mdPlugins: [
		breaks,
		emoji,
		externalLinks,
		taskList,
		highlight,
		languageName,
	],
	onCreateWebpackChain: config => {
		config.resolve.alias
			// .set('@fonts', `${PUBLIC}/fonts`)
			.set('@images', `${PUBLIC}/images`)
			.set('@components', `${SRC}/theme/components`)
			.set('@styles', `${SRC}/theme/styles`)
			.set('@utils', `${SRC}/theme/utils`)
			.set('~', path.resolve(__dirname))

		config.module
			.rule('css')
				.test(/\.css$/)
				.use('style-loader').loader('style-loader').end()
				.use('css-loader').loader('css-loader').end()

		return config
	},
	// debug: true
}
