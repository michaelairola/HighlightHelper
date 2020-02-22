const getSelectionPos = () => {try{
	const { width, height, left, top, right, bottom } = document.getSelection().getRangeAt(0).getBoundingClientRect();
	return { found: true, width, height, left, top, right, bottom };
} catch(e) {
	return { found: false }
}}

const getAbsolutePosition = () => {try{
	const boundingRect = getSelectionPos();
	const { found, width, height } = boundingRect;
	const baseRect = document.body.getBoundingClientRect();
	const left = boundingRect.left - baseRect.left;
	const right = left + width;
	const top = boundingRect.top - baseRect.top;
	const bottom = top + height;
	return { found, left, top, width, height, right, bottom, };
} catch(e) {
	console.log("highlight-helper: error getting position:", e)
	return { found: false };
}}

const postionOfCorner = (position, { width: helperWidth, height: helperHeight }) => {
	const map = { 
		"bottom-right": [ 0, 0 ],
		"bottom-center":[ 0, 1 ],
		"bottom-left":  [ 0, 2 ],
		"top-right":    [ 1, 0 ],
		"top-center":   [ 1, 1 ],
		"top-left":     [ 1, 2 ],
	}

	let { found, right, bottom, width, height } = getAbsolutePosition()
	if(!found) return

	const [ lat, long ] = map[position];
	let left = right - long * (helperWidth + width) / 2;
	const offSet = long == 1 ? width/10 : width/5;
	left += long ? offSet : -1 * offSet; 
	let top = bottom - lat * (helperHeight + height);
	top += lat ? 0 : 10;
	return { position, top, left }
}

export const getPosition = (helper) => {
	const { right, width, height } = getAbsolutePosition();
	const { top } = getSelectionPos();
	const vertical = (0 <= top - helper.height) ? "top" : "bottom";
	const horizontal = 
		(0 <= document.body.clientWidth - right - helper.width) ? "right" : 
		(50 <= document.body.clientWidth - width) ? "left" : "center";
	return postionOfCorner(`${vertical}-${horizontal}`, helper)
}
