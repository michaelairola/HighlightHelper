export const HelperStyles = {
	position: "absolute",
	overflow: "hidden",
	border: "solid 2px grey",
	borderRadius: "5px",
	background: "#bbb",
}
export const hideStyles = {
	top: 0, left: 0, width: 0, height: 0, opacity: 0,
}
export const showStyles = ({ left, top }) => ({
	top, left, opacity: 1,
})
