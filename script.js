// import customExport from '/modules/customExport.js';
// console.log(customExport());
//<div class="weekdays">Sun</div>

const dt = new Date();

/**
 * Render Calendar main function
 */
function render_calendar(){

	console.log("calendar");
}
render_calendar();

display_date_information();
function display_date_information(){
	const date_display = document.querySelector('#date_display');
	date_display.innerHTML = dt.toDateString();
}

highlight_today();
function highlight_today(){
	const calendar_grid_days = document.querySelectorAll('#calendar_grid .days');
	calendar_grid_days.forEach((day)=>{
		if(day.innerText == dt.getDate()){
			day.classList.add('today');
		}
	})
}

document.querySelector('#calendar_wrapper #header_wrapper .next_month').addEventListener('click', get_next_month);

// get Next Month
function get_next_month(){
	dt.setMonth(dt.getMonth()+1);
	display_date_information();
}

// get previous month

document.querySelector('#calendar_wrapper #header_wrapper .prev_month').addEventListener('click', get_prev_month);
function get_prev_month(){
	dt.setMonth(dt.getMonth()-1);
	display_date_information();
}