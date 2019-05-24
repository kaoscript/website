import { css } from 'styled-components'
import { get } from '@utils/theme'

export const styles = {
  body: css`
    font-family: ${get('fonts.ui')};
    font-size: 18px;
    line-height: 1.6;
  `,
  h1: css`
    margin: 40px 0px 30px;
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: -0.02em;
	position: relative;
	display: table;

	&:before {
		position: absolute;
		content: "";
		bottom: 5%;
		left: 0px;
		width: 35%;
		height: 2px;
		background: #342780;
	}
  `,
  h2: css`
    margin: 30px 0 15px;
    line-height: 1.4em;
    font-family: Poppins, serif;
    font-weight: 400;
    font-size: 2rem;
    letter-spacing: -0.02em;
	margin: 40px 0px 30px;
	border-bottom: 1px dashed rgb(206, 212, 222);
  `,
  h3: css`
    margin: 25px 0 10px;
    font-size: 20px;
    font-weight: 400;
  `,
  h4: css`
    margin: 25px 0 10px;
    font-size: 16px;
    font-weight: 400;
  `,
  h5: css`
    margin: 20px 0 10px;
    font-size: 16px;
    font-weight: 400;
  `,
  h6: css`
    margin: 20px 0 10px;
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;
  `,
  ol: css`
    padding: 0;
    margin: 10px 0 10px;
  `,
  ul: css`
    padding: 0;
    margin: 10px 0 10px;
  `,
  playground: css`
    padding: 40px;
  `,
  code: css`
    margin: 0 3px;
    border-radius: 3px;
    font-family: ${get('fonts.mono')};
    padding: 2px 5px;
	font-size: 0.9em;
    border: '1px solid rgba(0, 0, 0, 0.02)';
  `,
  pre: css`
    font-family: ${get('fonts.mono')};
    font-size: 1em;
    line-height: 1.8;
  `,
  paragraph: css`
    margin: 10px 0 20px 0;
  `,
  table: css`
    overflow-y: hidden;
    width: 100%;
    font-family: ${get('fonts.mono')};
    font-size: 16px;
    overflow-x: initial;
    display: block;
  `,
  blockquote: css`
	padding: 10px 30px 10px 30px;
	margin: 30px 0;
	border-radius: 3px;
	border-left: 4px solid ${get('colors.primary')};
	background: ${get('colors.grayExtraLight')};
	color: ${get('colors.grayDark')};
    font-size: 1.125rem;
  `,
}
