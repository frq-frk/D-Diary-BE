
function getCurrentDate(separator = '') {
    
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthNames = ["January","February", "March", "April", "May", "June", "July", "August", "September", "Octobar", "Novembar", "December"]

const d = new Date();

let day = weekday[d.getDay()];

function getCurrentYear(){
    return d.getFullYear();
}

function getCurrentMonthName(){
    let month = d.getMonth()
    return monthNames[month];
}

module.exports = {getCurrentDate, day, getCurrentMonthName, getCurrentYear}