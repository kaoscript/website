import * as React from 'react'

import { createGlobalStyle } from 'styled-components'
import { get } from '@utils/theme'

const BaseStyle = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
	@import url('https://fonts.googleapis.com/css?family=Inconsolata');

	.icon-link {
		display: none;
	}

	body {
		margin: 0;
		padding: 0;
		${get('styles.body')};
	}

	.with-overlay {
		overflow: hidden;
	}

	html,
	body,
	#root {
		height: 100%;
		min-height: 100%;
	}

	.language-name {
		font-family: Ubuntu;
		color: #342780;
		text-transform: lowercase;
    	padding: 0 0.2em;
		font-size: 0.95em;
	}
`

export const Global = () => (
	<React.Fragment>
		<BaseStyle />
	</React.Fragment>
)
