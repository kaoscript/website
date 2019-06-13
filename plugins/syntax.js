const visit = require('unist-util-visit')

export default function(eat, value, silent) {
	const that = this

	return ast => visit(ast, 'code', visitor)

	function visitor(node) { // {{{
		let {lang, data} = node

		if(lang !== 'syntax') {
			return
		}

		const value = node.value
			.replace(/\[/g, '\\[')
			.replace(/\t/g, '%%TAB%%')

		if(!data) {
			node.data = data = {}
		}

		if(!data.hProperties) {
			data.hProperties = {}
		}

		data.hProperties.className = [
			...(data.hProperties.className || []),
			`syntax`
		]

		node.type = 'blockquote'

		node.children = that.parse(value).children

		visit(node, 'paragraph', tabVisitor)
	} // }}}

	function tabVisitor(node) { // {{{
		for(let c = 0; c < node.children.length; c++) {
			const child = node.children[c]

			if(child.type === 'text') {
				const parts = child.value.split('%%TAB%%')

				if(parts.length > 1) {
					node.children.splice(c, 1)

					for(let p = 0, l = parts.length - 1; p < l; p++) {
						if(parts[p].length !== 0) {
							node.children.splice(c++, 0, {
								type: 'text',
								value: parts[p]
							})
						}

						node.children.splice(c++, 0, {
							type: 'html',
							value: '<span class="tab"></span>'
						})
					}

					if(parts[parts.length - 1].length !== 0) {
						node.children.splice(c++, 0, {
							type: 'text',
							value: parts[parts.length - 1]
						})
					}
				}
			}
		}
	} // }}}
}