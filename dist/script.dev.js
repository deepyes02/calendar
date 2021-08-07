"use strict";

// import customExport from '/modules/customExport.js';
// console.log(customExport());
//<div class="weekdays">Sun</div>
var dt = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/**
 * Render Calendar main function
 */

function render_calendar() {
  var year = dt.getFullYear();
  var month = dt.getMonth();
  var date = dt.getDate();
  var day = dt.getDay(); // console.log(year,month,date,day);

  var calendar_grid = document.querySelector('#calendar_grid'); //clear the calendar grid before rendering

  calendar_grid.innerHTML = ""; //previous month last day and no of days(last_date) grabber

  var previous_month_object = new Date(year, month, 0);
  var previous_month_last_date = previous_month_object.getDay();
  var previous_month_last_day = previous_month_object.getDate(); // console.log(previous_month_last_date, previous_month_last_day);
  //loop over last months padding and add empty elements

  var padding_day_start_index = previous_month_last_day - previous_month_last_date; // console.log(padding_day_start_index);

  for (var y = padding_day_start_index; y <= previous_month_last_day; y++) {
    calendar_grid.innerHTML += "<div class=\"padding_days\">".concat(y, "</div>");
  } //current month last day and no of days grabber


  var currentMonthObject = new Date(year, month + 1, 0);
  var no_of_days_current_month = currentMonthObject.getDate();
  var last_day_of_current_month = currentMonthObject.getDay(); //loop over days to render all days in the calendar

  for (var x = 1; x <= no_of_days_current_month; x++) {
    calendar_grid.innerHTML += "<div class=\"days\">".concat(x, "</div>");
  } // loop over and pad next month days
  // console.log(no_of_days_current_month, last_day_of_current_month);


  var remaining_padding_space = 6 - last_day_of_current_month;

  for (var z = 1; z <= remaining_padding_space; z++) {
    calendar_grid.innerHTML += "<div class=\"padding_days\">".concat(z, "</div>");
  }

  display_date_information();
  highlight_today();
  document.querySelector('#calendar_wrapper #header_wrapper .next_month').addEventListener('click', get_next_month);
  document.querySelector('#calendar_wrapper #header_wrapper .prev_month').addEventListener('click', get_prev_month);

  function highlight_today() {
    var calendar_grid_days = document.querySelectorAll('#calendar_grid .days'); //grab current month index to check equality with month in the calendar

    var current_month = new Date().getMonth();
    calendar_grid_days.forEach(function (day) {
      if (day.innerText == dt.getDate() && current_month == dt.getMonth()) {
        day.classList.add('today');
      }

      day.addEventListener('click', function (e) {
        e.target.classList.toggle('selected'); //set a state and add it to event

        e.target.toggleAttribute('selection');

        if (e.target.hasAttribute('selection')) {
          console.log('save local storage');
        } else console.log('no');
      });
    });
  }
}

function display_date_information() {
  var date_display = document.querySelector('#date_display');
  date_display.innerHTML = "".concat(months[dt.getMonth()], " ").concat(dt.getFullYear());
} // get Next Month


function get_next_month() {
  dt.setMonth(dt.getMonth() + 1);
  render_calendar();
} // get previous month


function get_prev_month() {
  dt.setMonth(dt.getMonth() - 1);
  render_calendar();
} //render the calendar on init


render_calendar();
var data = [{
  'year': '2021',
  'month': '7',
  'date': '8'
}, {
  'year': '2021',
  'month': '8',
  'date': '9'
}];
var stringifiedData = JSON.stringify(data);
localStorage.setItem('booking', stringifiedData);
var getDataFromLocalStorage = localStorage.getItem('booking');
var localStorageArray = JSON.parse(getDataFromLocalStorage);
console.log(localStorageArray);