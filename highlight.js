const fs = require('fs')
const path = require('path')
const jsonc = require('jsonc-parser')
const { Registry } = require('vscode-textmate')
const visit = require('unist-util-visit')

const registry = new Registry()

// {{{ theme
const theme = jsonc.parse(fs.readFileSync('./themes/zokugun.json', 'utf8'))

registry.setTheme({
	name: 'zokugun',
	settings: theme.tokenColors
})

const css = [`
code[class*="language-"] {
	color: ${theme.colors['editor.foreground']};
	background-color: ${theme.colors['editor.background']};
}

.code-lines {
	border-left: 1px solid ${theme.colors['editorRuler.foreground']};
}

.code-lines .line:before {
	color: ${theme.colors['editorRuler.foreground']};
}
`]

const colors = registry.getColorMap()
for(let i = 2; i < colors.length; i++) {
	css.push(`
.code-lines .fg${i} {
	color: ${colors[i]};
}
`)
}

fs.writeFileSync('./src/theme/styles/code.themed.css', css.join(''), 'utf8')
// }}}

// {{{ languages
const name2scope = {}
const type2scope = {}
const scope2name = {}

const grammar = registry.loadGrammarFromPathSync('./syntaxes/kaoscript.tmLanguage')

name2scope[grammar._grammar.name] = grammar._grammar.scopeName
scope2name[grammar._grammar.scopeName] = grammar._grammar.name
for(const type of grammar._grammar.fileTypes) {
	type2scope[type] = grammar._grammar.scopeName
}
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
							`fg${(tokens[i + 1] & 8372224) >>> 14}`,
							// `bg${(tokens[i + 1] & 4286578688) >>> 23}`,
							// `st${(tokens[i + 1] & 14336) >>> 11}`
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
						`fg${(tokens[l + 1] & 8372224) >>> 14}`,
						// `bg${(tokens[l + 1] & 4286578688) >>> 23}`,
						// `st${(tokens[l + 1] & 14336) >>> 11}`
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