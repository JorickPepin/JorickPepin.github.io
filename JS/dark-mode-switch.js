const darkSwitch=document.getElementById("darkSwitch");
const cloudsContainer = document.getElementById("clouds-container");
const shootingStarsContainer = document.getElementById("shooting-star-container");

function initTheme(){
	const e=null!==localStorage.getItem("darkSwitch")&&"dark"===localStorage.getItem("darkSwitch");
darkSwitch.checked=e,
e?shootingStarsContainer.style.display = "block":shootingStarsContainer.style.display = "none",
e?document.body.setAttribute("data-theme","dark"):document.body.removeAttribute("data-theme"),
e?cloudsContainer.style.display = "none":cloudsContainer.style.display = "block";
}

function resetTheme(){
	darkSwitch.checked?(document.body.setAttribute("data-theme","dark"), 
		localStorage.setItem("darkSwitch","dark")):
	(document.body.removeAttribute("data-theme"),
		localStorage.removeItem("darkSwitch"))
}

	window.addEventListener("load",()=>{
			darkSwitch&&(initTheme(),
			darkSwitch.addEventListener("change",()=>{resetTheme()}))});
