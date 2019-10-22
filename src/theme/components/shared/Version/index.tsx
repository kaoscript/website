import * as React from 'react'
import styled from 'styled-components'

import { get } from '@utils/theme'

interface WrapperProps {
  theme?: any
}

const Wrapper = styled.div<WrapperProps>`
  ${get('styles.version')};
`

export const Version: React.SFC = () => {
  return (
	  <Wrapper>v0.10.0</Wrapper>
  )
}
