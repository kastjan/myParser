(function () {
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
  return bigElements[index];
  }

  bElements = searchBigElements(10, document);
  console.log(bElements);
  var epicElement= searchEpicElement(bElements);

  var goods = [].slice.apply(epicElement.getElementsByTagName("img"));
  goods = goods.map(function(element) {
  var alt = element.alt;
    if (typeof alt != "undefined") return alt;
  });

  chrome.extension.sendRequest(goods);
}) ();
