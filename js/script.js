
//1. form events section

			 $(document).ready(function () {
				doOnLoad();
				$('#optin').click(function () {
					doOnClick(this)
				});
				$('#mylink').click(function () {
					doOnClick(this)
				});
				$('#mypara').mouseenter(function () {
					doOnMouseOver(this)
				});
				$('#mypara').mouseleave(function () {
					doOnMouseOut(this)
				});
				$('#myform').submit(function () {
					doOnSubmit(this)
				});
				$('#myname').focus(function () {
					doOnFocus(this)
				});
				$('#myname').blur(function () {
					doOnBlur(this)
				});
				$('#mydirection').change(function () {
					doOnChange(this)
				});
		//Local storage section.				
				var regOrnot = document.getElementById('regOrnot');
				$("#saveAll").click(function(e) {
								
					var x=document.forms["myform"]["myname"].value;
					if (x==null || x=="")
						{
						alert("Your name must be filled out !");
						return false;
						}
					else
						{
						regOrnot.innerHTML = "<strong>Your are Registered! Get Directions on Map. </strong> ";
						localStorage.setItem('storageItem', regOrnot.innerHTML);
						}
					});
				$("#clearAll").click(function(e) {
					
					localStorage.clear();
					location.reload();
				});
				
				loadToDo();
				
				function loadToDo() {
				  if ( localStorage.getItem('storageItem') ) {
					regOrnot.innerHTML = localStorage.getItem('storageItem'); 
				  }
				}
				
			});	


			function doOnClick(myObj) {
				updateStatusBox("images/click.png", "<strong>Ok This will be epic !</strong>");
			}
			function doOnLoad() {
				updateStatusBox("images/load.png", "<strong>Lets get this done !</strong>");
			}
			function doOnSubmit(myObj) {
				updateStatusBox("images/submit.png", "<strong>submit</strong> event occured");
				return false;
			}
			function doOnChange(myObj) {
				var selectdir = document.getElementById('mydirection');
				var direction = selectdir.options[selectdir.selectedIndex].value;
				var lcdirection = direction.toLowerCase();
				updateStatusBox("images/"+ lcdirection + ".png", "<strong>D.J. Kool is taking notes </strong> ");		
			}
			function doOnBlur(myObj) {
				updateStatusBox("images/blur.png", "<strong>Contact Info : </strong> Sorry, this is needed too.");
			}
			function doOnFocus(myObj) {
				updateStatusBox("images/focus.png", "<strong>Ok Sunshine, whats that name of yours ! </strong>");
			}
			function updateStatusBox(img, msg) {
				document.getElementById('statuscaption').innerHTML = msg;
				document.getElementById('event_image').src = img;
			}
			
		   
//2.Google maps section	.

	   
		   var directionsDisplay;
		   var directionsService = new google.maps.DirectionsService();
		   var map;
		   
				   function initialize() {
				   directionsDisplay = new google.maps.DirectionsRenderer();
				   var cambridge = new google.maps.LatLng(42.3736,-71.1106);
					   var mapOptions = {
					   zoom:7,
					   center: cambridge
					   }
				   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				   directionsDisplay.setMap(map);
				   }
				   

				function calcRoute() {
				  var start = document.getElementById('start').value;
				  var end = document.getElementById('end').value;
				  var request = {
					  origin:start,
					  destination:end,
					  travelMode: google.maps.TravelMode.DRIVING
				  };
				  directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
					  directionsDisplay.setDirections(response);
					}
				  });
				}


			google.maps.event.addDomListener(window, 'load', initialize);
			
			
			
