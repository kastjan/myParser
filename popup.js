var allgoods = [];
var visiblegoods = [];

// Display all visible goods.
function showGoods() {
  var linksTable = document.getElementById('goods');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }
  for (var i = 0; i < visiblegoods.length; ++i) {
    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    var col1 = document.createElement('td');
    var checkbox = document.createElement('input');
    checkbox.checked = true;
    checkbox.type = 'checkbox';
    checkbox.id = 'check' + i;
    col0.appendChild(checkbox);
    col1.innerText = visiblegoods[i];
    col1.style.whiteSpace = 'nowrap';
    col1.onclick = function() {
      checkbox.checked = !checkbox.checked;
    }
    row.appendChild(col0);
    row.appendChild(col1);
    linksTable.appendChild(row);
  }
}

// Toggle the checked state of all visible goods.
function toggleAll() {
  var checked = document.getElementById('toggle_all').checked;
  for (var i = 0; i < visiblegoods.length; ++i) {
    document.getElementById('check' + i).checked = checked;
  }
}

// Download all visible checked goods.
function dovnloadGoods() {
  /*for (var i = 0; i < visiblegoods.length; ++i) {
    if (document.getElementById('check' + i).checked) {
      chrome.downloads.download({file: visiblegoods[i]},
                                             function(id) {
      });
    }
  }
  window.close();*/
}

// Re-filter allgoods into visiblegoods and reshow visiblegoods.
function filterLinks() {
  var filterValue = document.getElementById('filter').value;
  if (document.getElementById('regex').checked) {
    visiblegoods = allgoods.filter(function(link) {
      return link.match(filterValue);
    });
  } else {
    var terms = filterValue.split(' ');
    visiblegoods = allgoods.filter(function(link) {
      for (var termI = 0; termI < terms.length; ++termI) {
        var term = terms[termI];
        if (term.length != 0) {
          var expected = (term[0] != '-');
          if (!expected) {
            term = term.substr(1);
            if (term.length == 0) {
              continue;
            }
          }
          var found = (-1 !== link.indexOf(term));
          if (found != expected) {
            return false;
          }
        }
      }
      return true;
    });
  }
  showGoods();
}

// Add goods to allgoods and visiblegoods, sort and show them.  injected.js is
// injected into all frames of the active tab, so this listener may be called
// multiple times.
chrome.extension.onRequest.addListener(function(goods) {
  for (var index in goods) {
    allgoods.push(goods[index]);
  }
  //allgoods.sort();
  visiblegoods = allgoods;
  showGoods();
});

// Set up event handlers and inject injected.js into all frames in the active
// tab.
window.onload = function() {
  document.getElementById('filter').onkeyup = filterLinks;
  document.getElementById('regex').onchange = filterLinks;
  document.getElementById('toggle_all').onchange = toggleAll;
  document.getElementById('download0').onclick = dovnloadGoods;
  document.getElementById('download1').onclick = dovnloadGoods;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'injected.js'});
    });
  });
};
