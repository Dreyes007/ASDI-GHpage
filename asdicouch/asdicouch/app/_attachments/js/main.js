$('#home').on('pageinit', function (){
	console.log("Main page loaded!!");
	
	$.ajax({
		"url": "_view/schedules",
		"dataType": "json",
		"success": function(data) {
			console.log(data);
			$.each(data.rows, function(index, schedule){
				var fname = schedule.value.fname;
				var lname = schedule.value.lname;
				var ate = schedule.value.date;
				var position = schedule.value.position;
				var hours = schedule.value.hours;
				var rest = schedule.value.rest;
				$('#schedulelist').append(
					$('<li>').append(
						$('<a>').attr("href", "#")
							.text(fname)
					)
				);
			});
			
		}
	});
});