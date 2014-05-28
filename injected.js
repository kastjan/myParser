(function () {
  function searchBigElements(minChildrenNumber, element) {
    var elements = [].slice.apply(element.querySelectorAll("div,tbody,tr,td"));
    return bigElements = elements.filter(function(element) {
      if (element.children.length > minChildrenNumber) return element;
    });
  } 

  function searchMaxElement(myElement) {
    var elements = [].slice.apply(myElement.querySelectorAll("div,tbody,tr,td"));
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
    var epicElements = [];
    var temp = 0;
    var index = 0;
    for (var i = 0; i < bigElements.length; i++) {
      epicElements.push(searchMaxElement(bigElements[i]))
    }

    for (var i = 0; i < epicElements.length; i++) {
      if (epicElements[i] > temp) {temp = epicElements[i]; index = i;}
    }
  console.log(epicElements)
  console.log(index);
  return index;
  }

  bElements = searchBigElements(15, document);
  console.log(bElements);
  var index = searchEpicElement(bElements);

  var goods = [].slice.apply(bElements[index].getElementsByTagName("a"));
  goods = goods.map(function(element) {
  var href = element.href;
    var hashIndex = href.indexOf('#');
    if (hashIndex >= 0) {
      href = href.substr(0, hashIndex);
    }
    return href;
  });

  console.log(goods);

  chrome.extension.sendRequest(goods);
}) ();
