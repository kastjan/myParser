(function () {
  var reg = new RegExp("price", "i");
  var regPrice = new RegExp("\\d+(.+)\\d+\\s+(\\S+)", "i");
  var allgoods = [];


  function searchBigElements(minChildrenNumber, element) {
    var elements = [].slice.apply(element.querySelectorAll("div,tbody,tr,td,ul"));
    return bigElements = elements.filter(function(element) {
      if (element.children.length > minChildrenNumber) return element;
    });
  } 

  function searchMaxElement(myElement) {
    var elements = [].slice.apply(myElement.querySelectorAll("div,tbody,tr,td,ul"));
    var currentMax = elements[0];

    if (typeof currentMax === "undefined") 
      return 0;

    elements.filter(function(element) {
      if (element.childElementCount > currentMax.childElementCount && element.parentNode == myElement) {
          currentMax = element;
        }
    });
    return currentMax.childElementCount;
  } 

  function searchEpicElement(bigElements) {
    var temp = 0;
    var index = 0;
    for (var i = 0; i < bigElements.length; i++) {
      var area = bigElements[i].offsetWidth * bigElements[i].offsetHeight;
      if (area > temp) {temp = area; index = i;
      }
    }
  console.log(bigElements[index]);
  return bigElements[index];
  }

  bElements = searchBigElements(10, document);
  console.log(bElements);
  var epicElement= searchEpicElement(bElements);

  var prices = [];
  var goods = [].slice.apply(epicElement.getElementsByTagName("img"));

  goods = goods.map(function(element) {
  if (element.offsetHeight > 40) var alt = element.alt;
  if (typeof alt != "undefined" && alt != "") {
    while (element.parentNode != epicElement) element = element.parentNode;
    var str = element.innerHTML;
    var matches = reg.exec(str);
    if (matches != null) {
      str = str.substring(matches.index, matches.index + 200);
      matches = regPrice.exec(str);
        if (matches != null)
          prices.push(matches[0]);
        else  prices.push("undefined");
    }
    return alt + ": ";
  }
  });

  console.log(prices);
  var j = 0;
  for (i = 0; i < goods.length; i++) {
    if (typeof goods[i] != "undefined") {
      goods[i] += prices[j];
      j++;
    }
  }
  for(i = goods.length; i >= 0; i--) {
    if (typeof goods[i] == "undefined") goods.splice(i, 1);
  }
  
  chrome.extension.sendRequest(goods);
}) ();
