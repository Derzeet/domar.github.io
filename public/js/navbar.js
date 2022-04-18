date = new Date();
year = date.getFullYear();
month = date.getMonth() + 1;
day = date.getDate();
document.getElementsByClassName("currentdate").innerHTML = month + "/" + day + "/" + year;