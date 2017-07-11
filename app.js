var myApp = angular.module('inputFormatApp', [])
  .controller('InputFormatCtrl', InputFormatCtrl);

function InputFormatCtrl($scope) {
  $scope.input = {
    text: "",
    leadingSpaces: {
      'width': '0px'
    },
    middleContent: {
      'width': '170px'
    },
    trailingSpaces: {
      'width': '0px'
    }
  };
  $scope.inputChanged = function() {
    formatInputField($scope.input);
  }
}

function formatInputField(input) {
  input.leadingSpaces.width = emptySpaceWidth(input.text);
  input.middleContent.width = textWidth(input.text.trim());
  if (/\S/.test(input.text)) { //check from http://stackoverflow.com/a/2031143
    input.trailingSpaces.width = emptySpaceWidth(input.text, true);
  } else {
    input.trailingSpaces.width = 0 + "px"; //if middle content is empty all spaces should be leading
  }
}

function emptySpaceWidth(ct, reverse) {
  var content = reverse ? ct.split("").reverse().join("") : ct,
    emptySpaces = ""
  for (var i = 0; i < content.search(/\S|$/); i++) {
    emptySpaces += " "; //spaces string
  }
  return textWidth(emptySpaces);
}

// Following code taken and modified from from http://stackoverflow.com/a/15302051 & http://stackoverflow.com/a/18109656
function textWidth(text) {
  var element = $('<span>').appendTo(document.body),
    htmlText = text,
    width;
  htmlText = element.text(htmlText).html(); //encode to Html
  htmlText = htmlText.replace(/\s/g, "&nbsp;"); //replace trailing and leading spaces
  element.html(htmlText).css({
    "font-family": "Arial",
    "font-size": "12px",
    "line-height": "13px"
  });
  width = Math.ceil(element.width());
  element.remove();
  return width + 'px';
};
