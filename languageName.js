const visit = require('unist-util-visit')

const nameRegex = /\bkaoscript\b/ig

export default function() {
	return ast => visit(ast, 'paragraph', visitor)

	function visitor(node) { // {{{
		for(let c = 0; c < node.children.length; c++) {
			const child = node.children[c]

			if(child.type === 'text' && nameRegex.test(child.value)) {
				node.children.splice(c, 1)

				const parts = child.value.split(nameRegex)

				for(let p = 0, l = parts.length - 1; p < l; p++) {
					if(parts[p].length !== 0) {
						node.children.splice(c++, 0, {
							type: 'text',
							value: parts[p]
						})
					}

					node.children.splice(c++, 0, {
						type: 'html',
						value: '<span class="language-name">kaoscript</span>'
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
}