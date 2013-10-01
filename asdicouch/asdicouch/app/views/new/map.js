function (doc) {
	if(doc.type.substr(0, 3) === "New") {
		emit(doc._id.substr(3), {
			"fname": doc.fname,
			"lname": doc.lname,
			"open": doc.open		
		});
	}
};