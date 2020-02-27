import { html, property } from "hybrids";
import { changeProps } from "./utils.js";
import { getPosition } from './position.js';
import { Styles } from './styles.js';
const goToPage = page => host => {
	const { corner: oldCorner } = host.position;
	const transition = ".3s linear";
	const props = Pages[page];
	const HelperBoxTransition = ["width", "height", "top", "left"].map(k => `${k} ${transition}`).join(", ")
	const PageWrapperTransition = `right ${transition}`;
	changeProps(host, { ...props, page, HelperBoxTransition, PageWrapperTransition });
	const { corner, left, top } = host.position;
	changeProps(host, { left, top, corner })
}
const Pages = [ { width: 200, height: 100 }, { width: 300, height: 200 } ]
export const HighlightHelper = {
	// options
	setOptions: { set: (host, opts) => changeProps(host, opts) },
	debug: false,

	// properties of the component
	text: "",
	opacity: 0,
	top: 0,
	left: 0,
	width: 0,
	height: 0,
	page: 0,
	corner: "top-right",
	
	HelperBoxTransition: "",
	PageWrapperTransition: "",

	position: getPosition,
	text: {
		get: (_, v) => v,
		set: (host, text) => {
			if(text) {
				// show helper
				const props = Pages[0]
				changeProps(host, props)
				const opacity = 1;
				const { corner, left, top } = host.position;
				changeProps(host, { opacity, left, top, corner, HelperBoxTransition: `opacity .5s linear` })
			} else {
				// hide helper
				changeProps(host, { 
					opacity: 0, top: 0, left: 0, width: 0, height: 0, page: 0,
					HelperBoxTransition: "", PageWrapperTransition: "", 
				})
			}
			return text
		}
	},
	render: (host) => {
		const { 
			top, left, width, height, opacity, page, 
			HelperBoxTransition, PageWrapperTransition, 
			text, corner,
		} = host;
		return html`
		${Styles}
		<div id="HelperBox" style="${{ top, left, width, height, opacity, transition: HelperBoxTransition }}">
			<div class="No-Overflow">
				<div id="PageWrapper" style="${{ right: `${page * 100}%`, transition: PageWrapperTransition }}">
					<div id="Page-1">
						<div class="page">This is a popup widget!</div>
						<button onclick="${goToPage(1)}">Change Page!</button>
					</div>
					<div id="Page-2">
						<div class="page">Another page! Select text should go here. Brought to you by <a href="https://github.com/hybridsjs/hybrids">Hybrid</a></div>
						<button onclick="${goToPage(0)}">Go back</button>
						<h1><q>${text}</q></h1>
					</div>
				</div>
			</div>
			<span id="BoxTail-${corner}-border"></span>
			<span id="BoxTail-${corner}"></span>
		</div>		
	`}
}
