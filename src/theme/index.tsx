import './styles/code.css'
import './styles/code.themed.css'

import * as React from 'react'
import { theme, ComponentsProvider } from 'docz'
import { Global } from './styles/global'
import { config } from './config'
import * as components from '@components/ui'
const map = {
  page: components.Page,
  loading: components.Loading,
  h1: components.H1,
  h2: components.H2,
  h3: components.H3,
  h4: components.H4,
  h5: components.H5,
  h6: components.H6,
  hr: components.Hr,
//   pre: components.Pre,
  inlineCode: components.InlineCode,
  blockquote: components.Blockquote,
}

import { SFC } from 'react'
import * as modes from './styles/modes'
import get from 'lodash/get'
import { ThemeProvider } from './utils/theme'

const Theme: SFC = ({ children }) => (
  <ThemeProvider>
    <Global />
    <ComponentsProvider components={map}>{children}</ComponentsProvider>
  </ThemeProvider>
)

export const enhance = theme(
  config,
  ({ mode, ...config }) => ({
    ...config,
    mode,
    colors: {
      ...get(modes, mode),
      ...config.colors,
    },
  })
)

export default enhance(Theme)