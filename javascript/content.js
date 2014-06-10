(function(){
  var startLine, endLine;
  var addNoteNode = function() {
    var _addNoteNode = document.createElement('a');
    _addNoteNode.className = 'add-note';

    var addNoteImageNode = document.createElement('img');
    // https://developer.chrome.com/extensions/i18n#overview-predefined
    addNoteImageNode.src = 'chrome-extension://__MSG_@@extension_id__/images/note_add.png';

    _addNoteNode.appendChild(addNoteImageNode);

    return _addNoteNode;
  };

  var extractNumberFromString = function(str) {
    return parseInt(str.replace(/\D+/, ''));
  };
  var analysisSelectedLines = function() {
    // href is something like https://github.com/.../.../jscii.js#L12-L15
    var href = location.href;
    var lineRange = href.split('#')[1];

    if(lineRange === undefined) {
      return [];
    }

    var lines = [];
    lineRange = lineRange.split('-');
    while(lineRange.length) {
      lines.push(extractNumberFromString(lineRange.pop()));
    }

    return lines.reverse();
  }
  var lastSelectedLine = function() {
    return document.getElementById("L" + endLine);
  }
  var prependAddNoteNode = function() {
    var targetLine = lastSelectedLine();
    targetLine.insertBefore(addNoteNode(), targetLine.childNodes[0]);
  }
  var clearAddNoteNode = function() {
    var targetLine = lastSelectedLine();
    targetLine.removeChild(targetLine.childNodes[0]);
  }

  var lineNumsColumnContainer = document.getElementsByClassName('blob-line-nums')[0];

  lineNumsColumnContainer.addEventListener('click', function(event){
    if(endLine) { clearAddNoteNode(); }

    var selectedLines = analysisSelectedLines();

    if(selectedLines.length === 0) { return; }

    startLine = selectedLines[0];
    endLine = selectedLines[selectedLines.length - 1];

    if(startLine === endLine) {
      alert("Selected line is:" + startLine);
    } else {
      alert("Selected lines is from " + startLine + ' to ' + endLine);
    }

    prependAddNoteNode();
  });
})();
