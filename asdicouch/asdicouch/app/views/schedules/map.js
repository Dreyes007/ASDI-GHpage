function (doc) {
	if(doc._id.substr(0, 9) === "schedule:") {
		emit(doc._id.substr(9), {
			"fname": doc.fname,
			"lname": doc.lname,
			"date": doc.date,
			"position": doc.position,
			"hours": doc.hours,
			"rest": doc.rest
		});
	}
};