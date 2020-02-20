import { html } from "hybrids";

const trans = `opacity .5s linear`;
const HelperStyle = ({ left, top }) => html`
	<style>
		:host {
			position: absolute;
			border: solid 2px grey;
			border-radius: 5px;
			background: #bbb;
			opacity: 0;
			top: 0;
			left: 0;
			width: 0;
			height: 0;
		}
		:host(.show) { 
			opacity: 1;
			transition: ${trans};
			-webkit-transition: ${trans};
			-moz-transition: ${trans};
			-ms-transition: ${trans};
			-o-transition: ${trans};
			top: ${top}px;
			left: ${left}px;
			width: 200px;
			height: 100px;
		}
		.captcha {
			width: 90%;
			height: 70%;
		}
	</style>
`;

export const HighlightHelper = {
	left: 0,
	top: 0,
	style: host => HelperStyle(host), 
	render:  ({ style }) => html`
		${style}
		<div>This uses Hybrid!!!</div>
	`
}
