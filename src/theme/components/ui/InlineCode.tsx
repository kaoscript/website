import styled from 'styled-components'
import { get } from '@utils/theme'

export const InlineCode = styled.code`
	margin: 0 3px;
    padding: .2em .4em;
	border-radius: 3px;
	background: ${get('colors.codeBg')};
	color: ${get('colors.codeColor')};
	${get('styles.code')};
`