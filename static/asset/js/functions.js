function getAmount(data) {
	data = parseInt(data);

	// go through
	if(data > 1024 * 10) {
		if(data / 1024 > 1024 * 10) {
			if(data / Math.pow(1024, 2) > 1024 * 10) {
				return Math.round(data / Math.pow(1024, 3)) + '<span class="data-calm">GB</span>';
			} else {
				return Math.round(data / Math.pow(1024, 2)) + '<span class="data-calm">MB</span>';
			}
		} else {
			return Math.round(data / 1024) + '<span class="data-calm">KB</span>';
		}
	} else {
		return data + ' <span class="data-calm">bytes</span>';
	}
}

function getAmountInTime(data) {
	data = parseInt(data);

	if(data > 60) {
		if(data / 60 > 60) {
			if(data / Math.pow(60, 2) > 60) {
				return Math.round(data / (Math.pow(60, 2) * 24)) + ' days';
			} else {
				return Math.round(data / Math.pow(60, 2)) + ' hours';
			}
		} else {
			return Math.round(data / 60) + ' minutes';
		}
	} else {
		return data + ' seconds';
	}
}

function addAlert(title, alert) {
	$(".alert")
		.html('<b>'+title+':</b> '+alert)
		.show();
}

function hideAlert() {
	$(".alert")
		.hide();
}