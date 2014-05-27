var allgoods = [ ];

function showgoods() {
  var linksTable = document.getElementById('goods');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }
  for (var i = 0; i < allgoods.length; ++i) {
    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    var col1 = document.createElement('td');
    /*var checkbox = document.createElement('input');
    checkbox.checked = true;
    checkbox.type = 'checkbox';
    checkbox.id = 'check' + i;
    col0.appendChild(checkbox);*/
    col1.innerText = allgoods[i];
    col1.style.whiteSpace = 'nowrap';
    /*col1.onclick = function() {
      checkbox.checked = !checkbox.checked;
    }*/
    row.appendChild(col0);
    row.appendChild(col1);
    linksTable.appendChild(row);
  }
}

chrome.extension.onRequest.addListener(function(goods) {
  for (var index in goods) {
    allgoods.push(goods[index]);
  }
 // allLinks.sort();
  /*visibleLinks = allLinks;*/
  showgoods();
});

window.onload = function() {
 
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'injected.js'/*, allFrames: true*/});
    });
  });
};