import styled from 'styled-components'
import { get } from '@utils/theme'

export const InlineCode = styled.code`
 margin: 0 3px;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 16px;
  background: ${get('colors.codeBg')};
  color: ${get('colors.codeColor')};
  ${get('styles.code')};
`