export function sortElements(array: any[]) {
  var sortedArray = [];

  var length = array.length;
  for (var i = 0; i < length; i++) {
	var biggest : null | number = null;
	var index : null | number = null;

	for (var itemIndex in array) {

	  var el = array[itemIndex]
	  if (biggest === null || el.height > biggest) {
		biggest = el.height;
		index = Number(itemIndex);
	  }
	}

	sortedArray.push(array[index!]);
	array.splice(index!, 1);
  }

  return sortedArray;
}
