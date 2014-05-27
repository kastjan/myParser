alert("injected");
/*var goods = [].slice.apply(document.getElementsByTagName('a'));
goods = goods.map(function(element) {
  // Return an anchor's href attributse, stripping any URL fragment (hash '#').
  // If the html specifies a relative path, chrome converts it to an absolute
  // URL.
  var href = element.href;
  var hashIndex = href.indexOf('#');
  if (hashIndex >= 0) {
    href = href.substr(0, hashIndex);
  }
  return href;
});*/

var elements = document.getElementsByTagName("*");
var maxElement = elements[0];
for (i = 0; i < elements.length; i++) {
	if (maxElement.childNodes.length < elements[i].childNodes.length) {
			maxElement = elements[i]
	}
}
//console.log(maxElement.childNodes.length);
//console.log(maxElement);

var goods = [].slice.apply(maxElement.getElementsByTagName("a"));
goods = goods.map(function(element) {
  // Return an anchor's href attributse, stripping any URL fragment (hash '#').
  // If the html specifies a relative path, chrome converts it to an absolute
  // URL.
  var href = element.href;
  var hashIndex = href.indexOf('#');
  if (hashIndex >= 0) {
    href = href.substr(0, hashIndex);
  }
  return href;
});

console.log(goods);


chrome.extension.sendRequest(goods);
//alert("all good");
