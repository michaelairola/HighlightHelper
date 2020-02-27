import { html, property } from "hybrids";
import { 
    changeProps, 
    method 
} from "./utils.js";
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
	changeProps(host, { left, top })
	host[`BoxTail-${oldCorner}-transition`] = ""
	host[`BoxTail-${oldCorner}`] = 0
	host[`BoxTail-${corner}-transition`] = "opacity .3s linear"
	host[`BoxTail-${corner}`] = 1
}

const createTailStyleProps = () => {
	let x = {};
	["bottom", "top"].forEach(i => ["right", "left"].forEach(j => {
		x[`BoxTail-${i}-${j}`] = 0
		x[`BoxTail-${i}-${j}-transition`] = "";
	}))
	return x
}
const TailStyleProps = createTailStyleProps();

const Pages = [ { width: 200, height: 100 }, { width: 300, height: 200 } ]
export const HighlightHelper = {
	text: "",
	opacity: 0,
	top: 0,
	left: 0,
	width: 0,
	height: 0,
	page: 0,
	
	HelperBoxTransition: "",
	PageWrapperTransition: "",

	...TailStyleProps,
	position: getPosition,
	text: {
		get: (_, v) => v,
		set: (host, text) => {
			if(text) {
				// show helper
				host.width =  200;
				host.height = 100;
				const { corner, left, top } = host.position;
				host.left = left;
				host.top = top
				host[`BoxTail-${corner}`] = 1;
				host.HelperBoxTransition = "opacity .5s linear"
				host.opacity = 1;
			} else {
				// hide helper
				changeProps(host, { opacity: 0, top: 0, left: 0, width: 0, height: 0, page: 0 })
				host.HelperBoxTransition = "";
				host.PageWrapperTransition = "";
				Object.keys(TailStyleProps).forEach(k => {
					if (k.includes('transition')) {
						host[k] = "";
					} else {
						host[k] = 0;
					}
				})
			}
			return text
		}
	},
	render: (host) => {
		const { 
			top, left, width, height, opacity, page, 
			HelperBoxTransition, PageWrapperTransition, 
			text
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
			${["bottom", "top"].map(i => html`
				${["right", "left"].map(j => {
					const key = `BoxTail-${i}-${j}`
					return html`
						<span id="${key}-border" style="${{ opacity: host[key], transition: host[`${key}-transition`] }}"></span>
						<span id="${key}" style="${{ opacity: host[key], transition: host[`${key}-transition`] }}"></span>
			`})}`)}
		</div>		
	`}
}
