//alert('Hello');
//alert(chrome.extension.getURL(""));
//alert(location.href);

/*get(chrome.extension.getURL('/injected.js'), 
    function(data) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = data;
        document.getElementsByTagName("head")[0].appendChild(script);
        document.getElementsByTagName("body")[0].setAttribute("onLoad", "injected_main();");
    }
);*/



/*function(){
	$('#starter').click(NewTab);
});
function NewTab () {
	chrome.tabs.executeScript(null, {file: "injected.js"})
	var win = window.open('main.html');
	win.focus();
}*/
