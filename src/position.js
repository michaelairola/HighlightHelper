import { html } from "hybrids"
const getSelectionPos = () => {try{
	const { width, height, left, top, right, bottom } = document.getSelection().getRangeAt(0).getBoundingClientRect();
	return { found: true, width, height, left, top, right, bottom };
} catch(e) {
	return { found: false }
}}

const getAbsolutePosition = () => {try{
	const boundingRect = getSelectionPos();
	const { found, width, height } = boundingRect;
	const left = boundingRect.left + window.pageXOffset
	const right = left + width;
	const top = boundingRect.top + window.pageYOffset
	const bottom = top + height;
	return { found, left, top, width, height, right, bottom, };
} catch(e) {
	console.log("highlight-helper: error getting position:", e)
	return { found: false };
}}

const getCorner = ({ height, width: helperWidth }) => {
	const { right, width } = getAbsolutePosition();
	const { top } = getSelectionPos();
	const vertical = (0 <= top - height) ? "top" : "bottom";
	const horizontal = 
		(0 <= document.body.clientWidth - right - helperWidth) ? "right" : 
		(50 <= document.body.clientWidth - width) ? "left" : "center";
	return `${vertical}-${horizontal}`	
}

export const getPosition = (host) => {
	const { width: helperWidth, height: helperHeight } = host;
	const { found, right, bottom, width, height } = getAbsolutePosition();
	const map = { 
		"bottom-right": [ 0, 0 ],
		"bottom-center":[ 0, 1 ],
		"bottom-left":  [ 0, 2 ],
		"top-right":    [ 1, 0 ],
		"top-center":   [ 1, 1 ],
		"top-left":     [ 1, 2 ],
	}
	if(!found) return { corner: "", top: 0, left: 0 };
	const corner = getCorner(host)
	const [ lat, long ] = map[corner];
	let left = right - long * (helperWidth + width) / 2;
	const offSet = long == 1 ? width/10 : width/5;
	left += long ? offSet : -1 * offSet; 
	let top = bottom - lat * (helperHeight + height);
	top += lat ? 0 : 10;
	top -= lat ? 10 : 0;
	return { corner: corner.replace("center", "right"), top, left }
}

export const positionDebugger = {
	show: false,
	render: ({ show, }) => {
		const { width, height, top, left } = getAbsolutePosition();
		return show ? html`
			<style>
				:host {
					position: absolute;
					width: ${width}px;
					height: ${height}px;
					top: ${top/*+95*/}px;
					left: ${left}px;
					border: 3px solid blue;
					z-index: 100;
				}
			</style>` : html``
	},
}

