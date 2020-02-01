import { html } from './html-template';

export const HighlighHelperStyleSheet = Id => {
	const trans = `opacity .5s linear`
	return html`
	#${Id}.show { 
		opacity: 1;
		transition: ${trans};
		-webkit-transition: ${trans};
		-moz-transition: ${trans};
		-ms-transition: ${trans};
		-o-transition: ${trans};
	}
	#${Id}.hide {
		opacity: 0;
		top: 0!IMPORTANT;
		left: 0!IMPORTANT;
		width: 0!IMPORTANT;
		height: 0!IMPORTANT;
	}`
}

export const InitHelperStyles = {
	position: "absolute",
	border: "solid 2px grey",
	borderRadius: "5px",
	width: "200px",
	height: "100px",
	background: "#bbb",
}

export const helperTemplate = html`
	<div>Hello World!</div>
`
