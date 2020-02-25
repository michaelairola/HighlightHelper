import { html, property } from "hybrids";
import { 
	initialize, setStyle,
	styleProperty, changeProps, 
	getter, method 
} from "./utils.js";
import { getPosition } from './position.js';
import { Styles } from './styles.js';
const goToPage = index => host => {
	const transition = ".3s linear";
	const props = Pages[index];
	const { corner: oldCorner } = host.position;	
	changeProps(host, { ...props, page: `${index * 100}%` }, transition);
	const { corner, left, top } = host.position;
	changeProps(host, { [`BoxTail-${oldCorner}`]: 0 })
	changeProps(host, {left, top, [`BoxTail-${corner}`]: 1 }, transition);
}

const createTailStyleProps = () => {
	let x = {};
	["bottom", "top"].forEach(i => ["right", "left"].forEach(j => {
		x[`BoxTail-${i}-${j}`] = styleProperty(`[id|=BoxTail-${i}-${j}]`, "opacity", 0)
	}))
	return x
}
const TailStyleProps = createTailStyleProps();

const Pages = [ { width: 200, height: 100 }, { width: 300, height: 200 } ]
export const HighlightHelper = {
	text: "",
	opacity: styleProperty(":host", "opacity", 0),
	top: styleProperty(":host", "top", 0),
	left: styleProperty(":host", "left", 0),
	width: styleProperty("#HelperBox", "width", 0),
	height: styleProperty("#HelperBox", "height", 0),
	page: styleProperty("#PageWrapper", "right", 0),
	
	...TailStyleProps,
	position: getPosition,
	show: method((host, text) => {
			// host.text = text
			changeProps(host, { width: 200, height: 100 })
			const { corner, left, top } = host.position;
			console.log('corner:', corner)
			changeProps(host, { left, top, })
			changeProps(host, { [`BoxTail-${corner}`]: 1, opacity: 1 }, ".5s linear" )
	}),
	hide: method(host => changeProps(host, { opacity: 0, top: 0, left: 0, width: 0, height: 0, page: 0, ...Object.keys(TailStyleProps).reduce((acc, v)=>({ ...acc, [v]: 0 }),{}) })),
	render: ({ text, corner }) => {
		return html`
		${Styles}
		<div id="HelperBox">
			<div id="PageWrapper">
				<div id="Page-1">
					<div class="page">This is a popup widget!</div>
					<button onclick="${goToPage(1)}">Change Page!</button>
				</div>
				<div id="Page-2">
					<div class="page">Another page! Ideally, the selected text will go here. Currently waiting on a PR issued to be accepted at <a href="https://github.com/hybridsjs/hybrids">Hybrid</a>...</div>
						<button onclick="${goToPage(0)}">Go back</button>
						<h1><q>${text}</q></h1>
					</div>
				</div>
			</div>
			${["bottom", "top"].map(i => html`
				${["right", "left"].map(j => html`
					<span id="BoxTail-${i}-${j}-border"></span>
					<span id="BoxTail-${i}-${j}"></span>
			`)}`)}
		</div>		
	`}
}
