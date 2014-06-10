(function(){
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

  var lineNumsColumnContainer = document.getElementsByClassName('blob-line-nums')[0];

  lineNumsColumnContainer.addEventListener('click', function(event){
    var selectedLines = analysisSelectedLines();

    if(selectedLines.length === 0) { return; }

    var startLine = selectedLines[0];
    var endLine = selectedLines[selectedLines.length - 1];

    if(startLine === endLine) {
      alert("Selected line is:" + startLine);
    } else {
      alert("Selected lines is from " + startLine + ' to ' + endLine);
    }
  });
})();
