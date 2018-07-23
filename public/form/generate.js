(function(){
	function setLoading(loading) {
		var container = document.querySelector("#classpex-container");
		container.classList.toggle("loading", loading);
	}

	function createQueryString(map) {
		return Object.keys(map).map(function (key) { return "" + key + "=" + map[key] }).join("&")
	}
	
	function setTextAreaContents(queryString="") {
		var textarea = document.querySelector(".classpex-src");
		textarea.innerText = "<img src='" + window.location.origin + queryString + "' />'";
	}
	
	document.querySelector("#classpex-form").addEventListener("submit", function(e){
		e.preventDefault();
		var heroValue = document.querySelector("#hero-field").value;
		var aspectValue = document.querySelector("#aspect-field").value;
		var strokeValue = document.querySelector("[name='stroke']:checked").value;
		var symbolValue = document.querySelector("[name='symbol']:checked").value;
		var src = "/?" + createQueryString({"class": heroValue, aspect: aspectValue, stroke: strokeValue, symbol: symbolValue})
		document.querySelector("#classpex-image").src = src;
		setLoading(true)
		setTextAreaContents(src);
	})
	
	document.querySelector(".classpex-src").addEventListener("click", function(e) {
		this.focus();
		this.select();
	})
	
	const image = document.querySelector("#classpex-image");
	function removeLoading() { setLoading(false) }
	image.addEventListener("load", removeLoading);
	image.addEventListener("error", removeLoading);
	

	setTextAreaContents();
	
})();
