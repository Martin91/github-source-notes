(function(){
  var extractNumberFromString = function(str) {
    return parseInt(str.replace(/\D+/, ''));
  };

  var lineNumsColumnContainer = document.getElementsByClassName('blob-line-nums')[0];

  lineNumsColumnContainer.addEventListener('click', function(event){
    var codeBody = document.getElementsByClassName('code-body')[0];
    var lines = codeBody.getElementsByClassName('line');

    var selectedLines = [];
    for(var i = 0; i < lines.length -1; i++) {
      // Lines selected with style attribute for background-color
      var style = lines[i].attributes.style;
      if(style && style.value.search(/background-color:/) != -1 ) {
        selectedLines.push(lines[i]);
      }
    }

    var startLine = extractNumberFromString(selectedLines[0].id);
    var endLine = extractNumberFromString(selectedLines[selectedLines.length - 1].id);

    if(startLine === endLine) {
      alert("Selected line is:" + startLine);
    } else {
      alert("Selected lines is from " + startLine + ' to ' + endLine);
    }
  });
})();
