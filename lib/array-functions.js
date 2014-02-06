// basic function for checking if an object exists in the array.
function inArray(array, object) {
	var inside = false;
	// iterate over objects
	for(var i = 0; i < array.length; i++) {
		if(array[i] == object) {
			inside = true;
		}
	}

	return inside;
}