require('kaoscript/register')

import breaks from 'remark-breaks'
import emoji from 'remark-emoji'
import externalLinks from 'remark-external-links'
import taskList from 'remark-task-list'

import highlight from './plugins/highlight.js'
import languageName from './plugins/languageName.js'
import syntax from './plugins/syntax.js'

import * as path from 'path'

const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')

export default {
	title: 'kaoscript',
	description: 'A chaotic programming language',
	repository: 'https://github.com/kaoscript/kaoscript',
	src: 'src',
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
			]
		},
		{
			name: 'Guide',
			menu: [
				'Comments',
				'Variable Declarations',
				'Basic Types',
				'Basic Operators',
				'Flow Statements',
				'Flow Expressions',
				'Functions',
				'Advanced Types',
				'Advanced Operators',
				'Destructuring',
				'Classes',
				'Enums',
				'Namespaces',
				'Structs & Tuples',
				'Variants',
				'Augmentations',
				'Error Handling',
				'Attributes',
				'Dependencies',
				'Import & Export',
				'File Inclusion',
				'Macro',
				'Utils',
				'Keywords',
			]
		},
		{
			name: 'Technical',
			menu: [
				'FAQ',
				'Object Creation',
				'Compilation',
				'Cache',
				'Known Issues',
			]
		},
		{
			name: 'Tools',
			menu: [
				'CLI',
				'awesome-kaoscript',
			]
		},
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
	},
	mdPlugins: [
		breaks,
		emoji,
		externalLinks,
		taskList,
		highlight,
		languageName,
		syntax,
	],
	onCreateWebpackChain: config => {
		config.resolve.alias
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
