import styled from 'styled-components'
import { get } from '@utils/theme'

export const Blockquote = styled.blockquote`
  ${get('styles.blockquote')};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 22px;
    margin: 15px 0;
  }

  p {
    margin: 5px 0 10px;
  }
`
