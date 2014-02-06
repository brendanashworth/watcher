// array-functions.js
module.exports = {
	// inArray checks if an object is in an array
	inArray : function(array, object) {
		var inside = false;
		// iterate over objects
		for(var i = 0; i < array.length; i++) {
			if(array[i] === object) {
				inside = true;
			}
		}

		return inside;
	},

	// inArrayAsKey checks if an object is in an array as a key.
	inArrayAsKey: function(array, object) {
		console.log(array.length);

		var inside = false;
		// iterate over objects
		for(var i = 0; i < array.length; i++) {
			console.log('@21, check '+array[i]+' as '+object);
			if(array[i].key === object) {
				inside = true;
			}
		}

		return inside;
	}

};