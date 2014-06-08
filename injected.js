(function () {
  var reg = new RegExp("price", "i");
  var regPrice = new RegExp("\\d+(.+)\\d+\\s+(\\S+)", "i");

  Array.prototype.max = function () {return Math.max.apply(Math, this)}

  function searchEpicElement(minChildrenNumber, element) {
    var elements = [].slice.apply(element.querySelectorAll("div,tbody,tr,td,ul"));
    bigElements = elements.filter(function(element) {
      if (element.children.length > minChildrenNumber) return element;
    });
    var areas = bigElements.map(function (x) {return x.offsetWidth * x.offsetHeight});
    return bigElements[areas.indexOf(areas.max())];
  } 

  var epicElement = searchEpicElement(10, document);

  var goods = [].slice.apply(epicElement.getElementsByTagName("img"));
  goods = goods.map(function(element) {
  if (element.offsetHeight > 40) var alt = element.alt;
  if (alt) {
    while (element.parentNode != epicElement) element = element.parentNode;
    var str = element.innerHTML;
    var matches = reg.exec(str);
    if (matches) {
      str = str.substring(matches.index, matches.index + 200);
      matches = regPrice.exec(str);
        if (matches) alt += ": " + matches[0];
        else  alt += ": Is not on sale.";
    }
    return alt;
  }
  });

  goods = goods.filter( function(x) { if (x) return x});
  goods[goods.length] = window.location.href;
  chrome.extension.sendRequest(goods);
}) ();
