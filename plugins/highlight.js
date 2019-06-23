const fs = require('fs')
const path = require('path')
const jsonc = require('jsonc-parser')
const { Registry } = require('vscode-textmate')
const visit = require('unist-util-visit')

const registry = new Registry()

// {{{ theme
let defaultTheme
const name2theme = {}
const css = []

function loadTheme(name, filename, language) {
	const theme = jsonc.parse(fs.readFileSync(filename, 'utf8'))

	registry.setTheme({
		name: name,
		settings: theme.tokenColors
	})

	if(language) {
		name2theme[language] = {
			name: name,
			settings: theme.tokenColors
		}
	}
	else {
		defaultTheme = {
			name: name,
			settings: theme.tokenColors
		}
	}

	const attrFilter = language ? `class~="language-${language}"` : `class*="language-"`

	const foreground = theme.colors['editor.foreground'] || theme.colors['foreground']
	const ruler = (theme.colors['editorRuler.foreground'] || foreground).substr(0, 7)

	css.push(`
		code[${attrFilter}] {
			color: ${foreground};
			background-color: ${theme.colors['editor.background'] || theme.colors['background']};
		}

		code[${attrFilter}] .code-lines {
			border-left: 1px solid ${ruler};
		}

		code[${attrFilter}] .code-lines .line:before {
			color: ${ruler};
		}
	`)

	const colors = registry.getColorMap()
	for(let i = 2; i < colors.length; i++) {
		css.push(`
			code[${attrFilter}] .code-lines .fg${i} {
				color: ${colors[i]};
			}
		`)
	}
}

function registerTheme(extension, theme, language) {
	const metadata = JSON.parse(fs.readFileSync(`./vscode_extensions/${extension}/package.json`, 'utf8'))
	const themes = metadata.contributes.themes

	for(let i = 0; i < themes.length; i++) {
		if(themes[i].label === theme) {
			loadTheme(themes[i].label, path.join(`./vscode_extensions/${extension}`, themes[i].path), language)
		}
	}
}

registerTheme('theme-zokugun', 'Zokugun')
registerTheme('theme-horizon', 'Horizon Bright', 'javascript')
registerTheme('theme-test', 'Ysgrifennwr', 'sh')

fs.writeFileSync('./src/theme/styles/code.themed.css', css.join(''), 'utf8')
// }}}

// {{{ languages
const name2scope = {}
const type2scope = {}
const scope2name = {}

function loadGrammar(name, filename) {
	const grammar = registry.loadGrammarFromPathSync(filename)

	name2scope[name] = grammar._grammar.scopeName
	scope2name[grammar._grammar.scopeName] = name
	for(const type of grammar._grammar.fileTypes) {
		type2scope[type] = grammar._grammar.scopeName
	}
}

function registerLanguage(name) {
	const metadata = JSON.parse(fs.readFileSync(`./vscode_extensions/${name}/package.json`, 'utf8'))
	const grammars = metadata.contributes.grammars

	for(let i = 0; i < grammars.length; i++) {
		if(grammars[i].language) {
			loadGrammar(grammars[i].language, path.join(`./vscode_extensions/${name}`, grammars[i].path))
		}
	}
}

registerLanguage('language-kaoscript')
registerLanguage('language-javascript')
// }}}

export default function({include, exclude} = {}) {
	return ast => visit(ast, 'code', visitor)

	function visitor(node) { // {{{
		let {lang, data} = node

		if(!lang) {
			return
		}

		let scope
		if(name2scope[lang]) {
			scope = name2scope[lang]
		}
		else if(type2scope[lang]) {
			scope = type2scope[lang]
			lang = scope2name[scope]
		}
		else {
			return
		}

		if((include && include.indexOf(lang) === -1) || (exclude && exclude.indexOf(lang) !== -1)) {
			return
		}

		if(!data) {
			node.data = data = {}
		}

		if(!data.hProperties) {
			data.hProperties = {}
		}

		data.hProperties.className = [
			...(data.hProperties.className || []),
			`language-${lang}`,
			'line-numbers'
		]

		registry.setTheme(name2theme[lang] || defaultTheme)

		const grammar = registry.grammarForScopeName(scope)
		const lines = node.value.split(/\n/g)

		const hLines = []

		let ruleStack = null

		for(const line of lines) {
			const hLine = {
				type: 'element',
				tagName: 'div',
				properties: {
					className: ['line']
				},
				children: [],
			}

			const result = grammar.tokenizeLine2(line, ruleStack)
			const tokens = result.tokens
			ruleStack = result.ruleStack

			const l = tokens.length - 2
			for(let i = 0; i < l; i += 2) {
				hLine.children.push({
					type: 'element',
					tagName: 'span',
					properties: {
						className: [
							`fg${(tokens[i + 1] & 8372224) >> 14}`,
							// `bg${(tokens[i + 1] & 4286578688) >> 23}`,
							// `st${(tokens[i + 1] & 14336) >> 11}`
						],
					},
					children: [{
						type: 'text',
						value: line.substring(tokens[i], tokens[i + 2])
					}],
				})
			}

			hLine.children.push({
				type: 'element',
				tagName: 'span',
				properties: {
					className: [
						`fg${(tokens[l + 1] & 8372224) >> 14}`,
						// `bg${(tokens[l + 1] & 4286578688) >> 23}`,
						// `st${(tokens[l + 1] & 14336) >> 11}`
					],
				},
				children: [{
					type: 'text',
					value: line.substring(tokens[l]) + '\n'
				}],
			})

			hLines.push(hLine)
		}

		data.hChildren = [{
			type: 'element',
			tagName: 'div',
			properties: {
				className: ['code-lines']
			},
			children: hLines
		}]
	} // }}}
}