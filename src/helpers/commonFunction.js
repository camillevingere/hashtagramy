const fromStrToArray = (strString) => {
  var array = strString.split(" ");
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    var hashtags = array[i];
    newArray.push(hashtags);
  }

  return array;
};

export default fromStrToArray;
