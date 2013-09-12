// Daniel Reyes
// ASDI 1309
// javaScript for MySchedule app

$('#home').on('pageinit', function (){
	console.log("Main Page Loaded!!");
	
	
	//Loads JSON Data
	$('#loadData').on('pageinit', function (){
		
		$.ajax({
			url: "xhr/JSON.php",
			type: "GET",
			dataType: "json",
			success: function(response){
				for(var i=0, j=response.schedule.length; i<j; i++){
					var sched = response.schedule[i];
					$(''+
						'<div class="data">'+
							
							'<p><strong>'+ "First Name:"+ '<br />'+ sched.fname +'</strong></p>'+
							'<p><strong>'+ "Last Name:"+ '<br />'+ sched.lname +'</strong></p>'+							
							'<p><strong>'+ "Date:"+ '<br />'+ sched.date +'</strong></p>'+
							'<p><strong>'+ "Position:"+ '<br />'+ sched.position +'</strong></p>'+
							'<p><strong>'+ "Hours:"+ '<br />'+ sched.hours +'</strong></p>'+
							'<p><strong>'+ "Break:"+ '<br />'+ sched.break +'</strong></p>'+
						'</div>'
					).appendTo('#loadData');
					
				};

			}
			
		});
		
	});
	
	//Store Data Function
	$('#schedule').on('pageinit', function (e){
		console.log("Schedule Page Loaded!!");
		
	e.preventDefault();
	function validateInfo(key){
		var myForm = $('form');
		    myForm.validate({
			invalidHandler: function(form, validator){},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data,key);
		}
		})
	};
	
	$('#submit').on('click', function(){
		validateInfo();
	});
		
	function storeData(data,key){
		//If there's no key, then its a brand new item and needs a new key
		if(!key){
			var id			= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here into the storeData function.
			id = key;
		}
		var item = {};
		item.fname = ["First Name:", $('#fname').val()];
		item.lname = ["Last Name:", $('#lname').val()];
		item.date = ["Date:", $('#date').val()];
		item.spot = ["Position:", $('input:checked').val()];
		item.hours = ["Hours:", $('#hours').val()];
		item.brake = ["Break:", $('#brake').val()];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Information Saved!");
		$.mobile.changePage("#home", null, true, true);
		
	};
		
		
		
		
	});
	
		//Display Local Storage data	
	    $("#display").on('pageinit', function(){
		    console.log("Display information loaded!!");
		    var getData = function(){
				if(localStorage.length === 0){
					alert("There is no data in local storage");
				}
			};
				for(var i=0; i < localStorage.length; i++){
			
					var key = localStorage.key(i);
					var value = localStorage.getItem(key);
					var obj = JSON.parse(value);
			
					for (var n in obj){
						var optSubText = obj[n][0] +" "+ obj[n][1];
						$('#display').append(optSubText + "<br />");
					}
					$('#display').append(key + " " + "<br />");
					$('#display').append('<a href="#schedule" id="editLink">Edit</a> | <a href="#" id="deleteLink">Delete</a>')
			
				};
				
			//Edit Link
			$('#editLink').on('click', function(){
				console.log("Im working!!");
				validateInfo(key);
			});
		
			//Delete Link
			$('#deleteLink').on('click', function(){
				var ask = confirm("Are you sure you want to delete this information?");
				if(ask){
					localStorage.removeItem(key);
					alert("Information has been deleted");				
					$.mobile.changePage("#home", null, true, true);	
				}else{
					alert("Information was not deleted!");				
				}
			});

		//Grab the data for an item on local storage
		function editItem(key){
		$.mobile.changePage("#home", null, true, true);
			var value = localStorage.getItem(key);
			var item = JSON.parse(value);
		
		//Populate form with current local storage values.
			$('#fname').val(item.fname[1]);
			$('#lname').val(item.lname[1]);
			$('#date').val(item.date[1]);
			$('input:checked').val(item.spot[1]);
			$('#hours').val(item.hours[1]);
			$('#brake').val(item.brake[1]);
		
		//Remove the initial listener from the input 'Submit Order' button.
		//Change Submit Button value to Edit Button
			$('#submit').val("Edit");
			var submit = $("#submit");
	
			$('#submit').on('click', function (){
				submit.key = this.key;
				validateInfo(key);
			});
	
	
		};
				       
		});
	
	$('#option').on('pageinit', function(){
		console.log("Clear local page loaded!!");
		$('#clear').on('click', function(){
			localStorage.clear()
			alert("All information has been deleted!")
			$.mobile.changePage("#home", null, true, true);
		});
	
	});
		
});

