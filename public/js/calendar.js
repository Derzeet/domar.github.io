// import dayjs from "dayjs";
const dayjs = require("dayjs");
import css from "./styles.css";
css = require("public/styles/calendar.css")
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);


const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");
const daysOfWeekElement = document.getElementById("days-of-week");

WEEKDAYS.forEach(weekday => {
    const weekDayElement = document.createElement("li");
    daysOfWeekElement.appendChild(weekDayElement);
    weekDayElement.innerText = weekday;
});
let currentMonthDays = createDaysForCurrentMonth(INITIAL_YEAR, INITIAL_MONTH);
let previousMonthDays = createDaysForPreviousMonth(INITIAL_YEAR, INITIAL_MONTH, currentMonthDays[0]);
let nextMonthDays = createDaysForNextMonth(INITIAL_YEAR, INITIAL_MONTH);

let days = [previousMonthDays, currentMonthDays, nextMonthDays];

console.log(days)

function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth()
}

function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
        return {
            date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: true
        };
    });
}
function createDaysForPreviousMonth(year, month) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    // Account for first day of the month on a Sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6

    const previousMonthLastMondayDayOfMonth = dayjs(
        currentMonthDays[0].date
    ).subtract(visibleNumberOfDaysFromPreviousMonth, "day").date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
        return {
            date: dayjs(
                `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
            ).format("YYYY-MM-DD"),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false
        };
    });
}
function createDaysForNextMonth(year, month) {
    const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${currentMonthDays.length}`)

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
            date: dayjs(`${year}-${Number(month) + 1}-${index + 1}`).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: false
        }
    })
}
function getWeekday(date) {
    return dayjs(date).weekday()
}

const calendarDaysElement = document.getElementById("calendar-days");

function appendDay(day, calendarDaysElement) {
    const dayElement = document.createElement("li");
    const dayElementClassList = dayElement.classList;

    // Generic calendar day class
    dayElementClassList.add("calendar-day");

    // Container for day of month number
    const dayOfMonthElement = document.createElement("span");

    // Content
    dayOfMonthElement.innerText = day.dayOfMonth;

    // Add an extra class to differentiate current month days from prev/next month days
    if (!day.isCurrentMonth) {
        dayElementClassList.add("calendar-day--not-current");
    }

    // Append the element to the container element
    dayElement.appendChild(dayOfMonthElement);
    calendarDaysElement.appendChild(dayElement);
}
document.getElementById("date").innerHTML = 'APRIL';

document.getElementById("app").innerHTML = `
    <div class="calendar-month">
        <ul
                id="days-of-week"
                class="day-of-week">
        </ul>
        <ul id="calendar-days" class="date-grid">
        </ul>
    </div>
   
`;