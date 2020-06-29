// constant starts

var mockData = [
	{
		id: 0,
		name: 'Rahul gupta',
		from: 'Kormangala',
		to: 'Whitefield',
		carName: 'Swift',
		seatsAvailable: 3,
		rating: 4,
		arrivalTime: 14,
		lat: 12.9352,
		lng: 77.6245
	},
	{
		id: 1,
		name: 'Rini meher',
		from: 'Kormangala',
		to: 'Whitefield',
		carName: 'Sedan',
		seatsAvailable: 2,
		rating: 3.5,
		arrivalTime: 8,
		lat: 12.9352,
		lng: 77.6245
	},
	{
		id: 2,
		name: 'pinky agarwal',
		from: 'Kormangala',
		to: 'Whitefield',
		carName: 'Xuv',
		seatsAvailable: 5,
		rating: 4.8,
		arrivalTime: 3,
		lat: 12.9352,
		lng: 77.6245
	},
	{
		id: 3,
		name: 'Priya Mehta',
		from: 'Bellandur',
		to: 'Hebbal',
		carName: 'Indica',
		seatsAvailable: 5,
		rating: 4.5,
		arrivalTime: 10,
		lat: 12.9304,
		lng: 77.6784
	},
	{
		id: 4,
		name: 'Abhishek kumar',
		from: 'Bellandur',
		to: 'Hebbal',
		carName: 'Alto',
		seatsAvailable: 2,
		rating: 3.5,
		arrivalTime: 1,
		lat: 12.9304,
		lng: 77.6784
	},
	{
		id: 5,
		name: 'Chandan Saxena',
		from: 'Bellandur',
		to: 'Hebbal',
		carName: 'Indica',
		seatsAvailable: 1,
		rating: 5,
		arrivalTime: 12,
		lat: 12.9304,
		lng: 77.6784
	},
	{
		id: 6,
		name: 'Gopi Kishan',
		from: 'Bellandur',
		to: 'Hebbal',
		carName: 'Scorpio',
		seatsAvailable: 4,
		rating: 4.2,
		arrivalTime: 22,
		lat: 12.9304,
		lng: 77.6784
	},
	{
		id: 7,
		name: 'Venkatesh N.',
		from: 'Basavanagudi',
		to: 'Airport',
		carName: 'Nano',
		seatsAvailable: 2,
		rating: 5,
		arrivalTime: 25,
		lat: 12.9406,
		lng: 77.5738
	},
	{
		id: 8,
		name: 'K. Prabhu',
		from: 'Basavanagudi',
		to: 'Airport',
		carName: 'Skoda',
		seatsAvailable: 3,
		rating: 3.8,
		arrivalTime: 15,
		lat: 12.9406,
		lng: 77.5738
	},
	{
		id: 9,
		name: 'Sunaina Mishra',
		from: 'Basavanagudi',
		to: 'Airport',
		carName: 'Jipsy',
		seatsAvailable: 1,
		rating: 4.9,
		arrivalTime: 30,
		lat: 12.9406,
		lng: 77.5738
	},
	{
		id: 10,
		name: 'Amit khanna',
		from: 'Basavanagudi',
		to: 'Airport',
		carName: 'Maruti',
		seatsAvailable: 1,
		rating: 4.4,
		arrivalTime: 32,
		lat: 12.9406,
		lng: 77.5738
	},
	{
		id: 11,
		name: 'Pankaj Udas',
		from: 'Basavanagudi',
		to: 'Airport',
		carName: 'Innova',
		seatsAvailable: 4,
		rating: 4.9,
		arrivalTime: 14,
		lat: 12.9406,
		lng: 77.5738
	}
];

var position, map, marker, carOwnnerSelected;

var note = `<br /><br />
			NOTE: for demo purpose locations available are<br />
			<b>Kormangala</b> => <b>Whitefield</b> or <br /> <b>Bellandur</b> => <b>Hebbal</b> or <br /> <b>Basavanagudi</b> => <b>Airport</b><br />
			Also Search will check for whether input string are substring of locations.<br />
			For example :<br/> <b>B</b> or <b>b</b> will match both <b>Bellandur</b> and <b>Basavanagudi</b><br />
			<b>H</b> or <b>h</b> will match both <b>Hebbal</b> and <b>Whitefield</b>`;
			
var noFiltersPresentMsg = `<b>Please enter locations to filter available cars.</b>`;
var noCarsMsg = `<b>Sorry no cars available for selected routes</b>`;

var confirmButtonElem = document.getElementById("confirmRide");
// constant ends

/*
 * intent to capture the Start and destination values entered by user and 
 * filter out cars which can be displayed then use helper methods to display filtered data
*/
var handleLocationInput = function() {
	var from = (document.getElementById("from").value || '').toLowerCase();
	var to = (document.getElementById("to").value || '').toLowerCase();
	var carDataToBeRendered = [];

	if (!from && !to) {
		populateCarOwners(carDataToBeRendered, true);
		return;
	}

	for (var i = 0; i < mockData.length; i++) {
		
		// user entered both Start (from) and Destination (to)
		// match data where entered value for Start is substring of 'from' of owner and also
		// entered value for Destination is substring of 'to' of owner
		if(from && to &&
			mockData[i].from.toLowerCase().includes(from) &&
			mockData[i].to.toLowerCase().includes(to)) {

			carDataToBeRendered.push(mockData[i]);

		} else if((!from && to) || (from && !to)) {
			
			if(from && mockData[i].from.toLowerCase().includes(from))
				carDataToBeRendered.push(mockData[i]);
			
			if(to && mockData[i].to.toLowerCase().includes(to))
				carDataToBeRendered.push(mockData[i]);
			
		}

	}
	populateCarOwners(carDataToBeRendered);
}



/*
 * param filteredData (array) - cars which can be displayed based on inputs by user on locations
 * param noFilters (boolean) - Start and Destinations both are empty then true
 * intent to modify dom to append cars available based on filters or display message
*/
var populateCarOwners = function(filteredData, noFilters) {
	
	// getting container to display car based on filters or display a info MSG inside it
	var container = document.getElementsByClassName('grid-container')[1];
	container.innerHTML = '';
	
	// disabling the confirm button on list refresh
	confirmButtonElem.classList.add("disabled");

	if (!filteredData.length) {
		// Display a Msg to tell whether no filters are selected or we don't have data for selected filter
		// Along with some Note to increase ease of use
		var helptext = noFilters ? noFiltersPresentMsg : noCarsMsg;
		helptext = helptext + note;
		
		var helptextElem = `<span class="helptext">${helptext}</span>`;
			
		var divElem = document.createElement('div');
		divElem.setAttribute('class', 'grid-child no-border');
		divElem.innerHTML = helptextElem;
		container.appendChild(divElem);
		return;
	}
	// Add the cars which are available based on filters
	for(var i = 0 ; i < filteredData.length; i++) {
		var personData = filteredData[i];
		var divElem = document.createElement('div');
		divElem.setAttribute('class', 'grid-child');
		var carDisplayElem = `
			<input type="radio" name="rGroup" value="${i+1}" id="${personData.id}" onchange="onSelectionOfCar(${personData.id})" />
			<label class="radio" for="${personData.id}">
				<div class="user-details">
					<div class="user-pic">
						<i class="material-icons md-48 header-icon light">person</i>
					</div>
					<div class="user-info">
						<p><span class="bold">${personData.name}<span> <span class="helptext">${personData.arrivalTime} min(s) away</p>
						<p>route: <span class="bold">${personData.from}</span> to <span class="bold">${personData.to}</span> </p>
						<p>car: <span class="bold">${personData.carName}</span> seats available: <span class="bold">${personData.seatsAvailable}</span> </p>
					</div>
					<div class="user-rating">
						<div class="rating">${personData.rating}</div> <i class="material-icons md-24 light">star</i>
					</div>
				</div>
			</label>
		`;
		divElem.innerHTML = carDisplayElem;
		container.appendChild(divElem);
	}
};

// initialize on page load with empty data
populateCarOwners([], true);


/* when user selects a particular car
 * param id - element clicked
 * intent to perform actions when a car is selected with helper methods
*/
var onSelectionOfCar = function(id) {
	// To revert the changes if there was any previously selected car owner
	var previousCarOwnerSelected = carOwnnerSelected;
	if( previousCarOwnerSelected) {
		updateCarList(previousCarOwnerSelected, false, parseInt(previousCarOwnerSelected.id));	
	}
	// update the view of Car owner selected
	carOwnnerSelected = document.getElementById(id);
	updateCarList(carOwnnerSelected, true, id);

	// enabling confirmButton
	confirmButtonElem.classList.remove("disabled");
	
	// placing marker at latitude and longitude of user selected
	updateMap(id);
	
}


/* helper method to update the elems of rendered car list items
 * param elem (Node) - element of rendered car list
 * param selected (boolean) - whether the element was selected
 * param index (integer) - index of element in mockData array
 * intent - to update the item selcted in car list, also to revert any previous selected element
*/
var updateCarList = function(elem, selected, index) {
	var label = null;
	if (selected) {
		elem.parentNode.style.backgroundColor = "lightskyblue";
		elem.parentNode.style.color = "white";
		label = elem.nextSibling;
		userDetails = label.nextSibling.children[0];
		userDetails.firstChild.nextSibling.innerHTML = `<i class="material-icons md-48 header-icon select-icon">done</i>`;
		userDetails.lastChild.previousSibling.innerHTML = `<i class="material-icons md-48 header-icon phone-color">phone</i>`;		
	} else {
		elem.parentNode.style.backgroundColor = "white";
		elem.parentNode.style.color = "black";
		label = elem.nextSibling;
		userDetails = label.nextSibling.children[0];
		userDetails.firstChild.nextSibling.innerHTML = `<i class="material-icons md-48 header-icon light">person</i>`;
		userDetails.lastChild.previousSibling.innerHTML = `<div class="rating">${mockData[index].rating}</div> <i class="material-icons md-24 light">star</i>`;
	}
	
}


/*
 * method to show success msg once user selects a Car owner and clicks CONFIRM RIDE button
 */
var confirmRide = function() {
	if (!confirmButtonElem.classList.contains('disabled'))
		alert("Ride booked successfully.");
}

/*
 * initializes the map to display current city
*/
function initMap() {
  // The location of Car
  position = {lat: 12.9716, lng: 77.5946};
  // The map, centered at Car
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 12, center: position});
  // The marker, positioned at Car
  marker = new google.maps.Marker({position: position, map: map});
}

/*
 * param id - id of user selected
 * intent - placing marker in map at latitude and longitude of user selected
 */
function updateMap(id) {
	//update map marker
	position = {lat: mockData[id].lat, lng: mockData[id].lng};
	// The map, centered at Car
	var map = new google.maps.Map(
		document.getElementById('map'), {zoom: 12, center: position});
	// The marker, positioned at Car
	var marker = new google.maps.Marker({position: position, map: map});
}