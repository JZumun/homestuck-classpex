function createQueryString(map) {
	return Object.keys(map).map(function (key) { return "" + key + "=" + map[key] }).join("&")
}

document.querySelector("#classpex-form").addEventListener("submit", function(e){
	e.preventDefault();
	var heroValue = document.querySelector("#hero-field").value;
	var aspectValue = document.querySelector("#aspect-field").value;
	var strokeValue = document.querySelector("[name='stroke']:checked").value;
	var symbolValue = document.querySelector("[name='symbol']:checked").value;
	var src = "/?" + createQueryString({"class": heroValue, aspect: aspectValue, stroke: strokeValue, symbol: symbolValue})
	document.querySelector("#classpex-image").src = src;
})
