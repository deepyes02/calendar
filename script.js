// import customExport from '/modules/customExport.js';
// console.log(customExport());
//<div class="weekdays">Sun</div>

const dt = new Date();

/**
 * Render Calendar main function
 */
function render_calendar(){
	const year = dt.getFullYear();
	const month = dt.getMonth();
	const date = dt.getDate();
	const day = dt.getDay();
	// console.log(year,month,date,day);
	//grab the calendar grid
	const calendar_grid = document.querySelector('#calendar_grid');
	//clear the calendar grid before rendering
	calendar_grid.innerHTML = "";
	
	//previous month last day and no of days(last_date) grabber
	const previous_month_object = new Date(year, month, 0);
	const previous_month_last_date = previous_month_object.getDay();
	const previous_month_last_day = previous_month_object.getDate();
	// console.log(previous_month_last_date, previous_month_last_day);


	//loop over last months padding and add empty elements
	const padding_day_start_index = previous_month_last_day - previous_month_last_date;
	// console.log(padding_day_start_index);
	for(let y=padding_day_start_index; y<= previous_month_last_day; y++){
		calendar_grid.innerHTML += `<div class="padding_days">${y}</div>`;
	}

	//current month last day and no of days grabber
	const currentMonthObject = new Date(year, month+1, 0);
	let no_of_days_current_month = currentMonthObject.getDate();
	let last_day_of_current_month = currentMonthObject.getDay();
	
	//loop over days to render all days in the calendar
	for(let x = 1; x<=no_of_days_current_month; x++){
		calendar_grid.innerHTML += `<div class="days">${x}</div>`;
	}
	
	// loop over and pad next month days
	console.log(no_of_days_current_month, last_day_of_current_month);
	const remaining_padding_space = 6 - last_day_of_current_month;
	for(let z = 1; z<=remaining_padding_space; z++){
		calendar_grid.innerHTML += `<div class="padding_days">${z}</div>`;
	}


	highlight_today();
	display_date_information();
	document.querySelector('#calendar_wrapper #header_wrapper .next_month').addEventListener('click', get_next_month);
	document.querySelector('#calendar_wrapper #header_wrapper .prev_month').addEventListener('click', get_prev_month);
}
render_calendar();

function display_date_information(){
	const date_display = document.querySelector('#date_display');
	date_display.innerHTML = dt.toDateString();
}


function highlight_today(){
	const calendar_grid_days = document.querySelectorAll('#calendar_grid .days');
	//grab current month index to check equality with month in the calendar
	let current_month = new Date().getMonth();
	calendar_grid_days.forEach((day)=>{
		if(day.innerText == dt.getDate() && current_month == dt.getMonth()){
			day.classList.add('today');
		}
	})
}


// get Next Month
function get_next_month(){
	dt.setMonth(dt.getMonth()+1);
	render_calendar();
}

// get previous month

function get_prev_month(){
	dt.setMonth(dt.getMonth()-1);
	render_calendar();
}