(function () {
  var reg = new RegExp("price", "i");
  var regPrice = new RegExp("\\d+(.+)\\d+\\s+(\\S+)", "i");

  Array.prototype.max = function () {return Math.max.apply(Math, this)}

  function searchEpicElement() {
    var elements = [].slice.apply(document.querySelectorAll("div,tbody,tr,td,ul"));
    elements = elements.filter(function(x) {if (x.children.length > 10) return x});
    var areas = elements.map(function (x) {return x.offsetWidth * x.offsetHeight});
    return elements[areas.indexOf(areas.max())];
  } 

  function getGoods(item) {
    var alt = item.alt;
    while (item.parentNode != epicElement) item = item.parentNode;
    var str = item.innerHTML;
    if (matches = reg.exec(str)) {
      matches = regPrice.exec(str.substring(matches.index, matches.index + 200));
      alt += (matches) ? ": " + matches[0] : ": Is not on sale.";
      }
    return alt;
  }

  var epicElement = searchEpicElement();
  var goods = [].slice.apply(epicElement.getElementsByTagName("img"));
  goods = goods.filter(function(x) {if (x.offsetHeight > 40) return x});
  goods = goods.map(getGoods);
  goods.push(window.location.href);
  chrome.extension.sendRequest(goods);
}) ();
