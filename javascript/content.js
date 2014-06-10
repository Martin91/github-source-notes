(function(){
  var startLine, endLine;
  var addNoteNode = function() {
    var _addNoteNode = document.createElement('a');
    _addNoteNode.className = 'add-note';
    _addNoteNode.innerText = ' + ';

    _addNoteNode.addEventListener('click', function(event){
      // 2. get codes between start and end
      // 3. get location
      // 4. post data to the backend
      var selectedLineCodes = [];

      for(i = startLine; i <= endLine; i++) {
        var line = document.getElementById('LC'+i);
        selectedLineCodes.push(line);
      }

      var currentLocation = location.href.split('#')[0];

      // Post datas here

      console.log(selectedLineCodes);

      event.preventDefault();
    });

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

    prependAddNoteNode();
  });
})();
