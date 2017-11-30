var date = new Date();

function fillCalendar() {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = document.getElementById("month");
    month.innerHTML = monthNames[date.getMonth()];

    var year = document.getElementById("year");
    year.innerHTML = date.getUTCFullYear();

    var lastDay = new Date(date.getUTCFullYear(), date.getMonth() + 1, 0).getDate();

    var main = document.querySelector("main");

    //first element in grid is a week number
    var weekNo = getWeek(date.getUTCFullYear(), date.getMonth(), 1);
    var day = document.createElement('div');
    day.className = "day";
    day.innerHTML = weekNo;
    day.style.gridColumn = 0;
    main.appendChild(day);

    for (var dayNumber = 1; dayNumber <= lastDay; dayNumber++) {
        var day = document.createElement('div');
        day.className = "day";
        day.innerHTML = dayNumber;

        if (dayNumber == 1)
            day.style.gridColumn = new Date(date.getUTCFullYear(), date.getMonth(), 1).getDay() + 2;

        if (new Date(date.getUTCFullYear(), date.getMonth(), dayNumber).getDay() == 0) {
            //first thing, add week number
            weekNo++
            if (dayNumber != 1) {
                day.innerHTML = weekNo;
                day.style.gridColumn = 0;
                main.appendChild(day);
            } else {
                weekNo--
            }
        
            //next, code for a Sunday
            var day = document.createElement('div');
            day.className = "day";
            day.innerHTML = dayNumber;
    
            day.className += " red";
        }

        var today = new Date();
        if (dayNumber == today.getDate() && date.getUTCFullYear() == today.getUTCFullYear() && date.getMonth() == today.getMonth())
            day.className += " today";

        // display some content for current day
        if (dayNumber === 12) {

            var s="<br>";
            s += "&nbsp &nbsp &nbsp google";
            s += "<br>";
            s += "&nbsp &nbsp &nbsp " + date.getUTCFullYear() + date.getMonth() + dayNumber;
            day.innerHTML += s;
        }

        if (dayNumber === 4) {
            //try to code event grid elements in day container
            var link = document.createElement('div');
            link.className='link';
            var paid = document.createElement('div');
            paid.className='paid';
            //paid.id=date.getUTCFullYear() + date.getMonth() + dayNumber

            var url="https://www.google.com/";
            var bT="super long desc";
            link.innerHTML="<a href="+url+" target='_blank'>"+bT+"</a>";
            paid.innerHTML="U";

            day.appendChild(link);
            day.appendChild(paid);
            paid.addEventListener('click', function () {
                updateDatabase(this);
            });
            link = document.createElement('div');
            bT='second big desc';
            link.innerHTML="<a href="+url+" target='_blank'>"+bT+"</a>";
            paid = document.createElement('div');
            paid.className='paid';
            paid.innerHTML="P";

            day.appendChild(link);
            day.appendChild(paid);
            paid.addEventListener('click', function () {
                updateDatabase(this);
            });
        }
    
        main.appendChild(day);
        
    } //end of going through days of the month
} //end of fill calendar


function updateDatabase(id) {
    alert("object id passed into function is : " + id);
}

function getWeek(year,month,day){
    //Find JulianDay 
    month += 1; //use 1-12
    var a = Math.floor((14-(month))/12);
    var y = year+4800-a;
    var m = (month)+(12*a)-3;
    var jd = day + Math.floor(((153*m)+2)/5) + 
                 (365*y) + Math.floor(y/4) - Math.floor(y/100) + 
                 Math.floor(y/400) - 32045;// (gregorian calendar)
    
    //now calc weeknumber according to JD
    var d4 = (jd+31741-(jd%7))%146097%36524%1461;
    var L = Math.floor(d4/1460);
    var d1 = ((d4-L)%365)+L;
    NumberOfWeek = Math.floor(d1/7) + 1;
    return NumberOfWeek;        
}

function removeDays() {
    var main = document.querySelector("main");
    main.innerHTML = "";
}

function prev() {
    removeDays();

    date = new Date(date.getUTCFullYear(), date.getMonth(), 0);

    fillCalendar();
}

function next() {
    removeDays();

    date = new Date(date.getUTCFullYear(), date.getMonth() + 1, 2);

    fillCalendar();
}

function interactions(strAction) {
    var modalHeader = document.getElementById('headerTxt');
    modalHeader.innerHTML='Perform ' + strAction + ' Action';

    switch (strAction) {
        case "new":
            alert('You clicked on the NEW Interactions button !!!');
            break;
        case "edit":
            alert('You clicked on the EDIT Interactions button !!!');
            break;
        case "Delete":
            alert('You clicked on the DELETE Interactions button !!!');
            break;
        default :
            alert(strAction);
    }

    // Get the modal and hide the interactions bar
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
    document.getElementById('interactionsBar').style.zIndex = "1";

    // Assign correct Save routine
    var footerModal = document.getElementsByClassName('modal-footer')[0];
    footerModal.onclick = function() {
        formSave(strAction);
    }

    // Close the modal
    var closeModal = document.getElementsByClassName('close')[0];
    closeModal.onclick = function() {
        modal.style.display = "none";
        document.getElementById('interactionsBar').style.zIndex = "99999";
    }
    
} //end of interactions function

function intervalSelected(selected) {
    var interval = document.getElementById('interval');
    interval.innerHTML = selected;

    var sI = document.getElementsByClassName('scheduleInterval')[0];
    sI.style.display = "none";

    document.getElementById("interval").addEventListener("click", function(){
        sI.style.display = "block"
    });

    var dC = document.getElementsByClassName('dailyContainer')[0]
    var wC = document.getElementsByClassName('weeklyContainer')[0]
    var mC = document.getElementsByClassName('monthlyContainer')[0]
    var yC = document.getElementsByClassName('yearlyContainer')[0]
    
    switch (selected) {
        case "Daily":
            dC.style.display = "grid"
            wC.style.display = "none"
            mC.style.display = "none"
            yC.style.display = "none"
            break;
        case "Weekly":
            dC.style.display = "none"
            wC.style.display = "grid"
            mC.style.display = "none"
            yC.style.display = "none"
            break;
        case "Monthly":
            dC.style.display = "none"
            wC.style.display = "none"
            mC.style.display = "grid"
            yC.style.display = "none"
            break;
        case "Yearly":
            dC.style.display = "none"
            wC.style.display = "none"
            mC.style.display = "none"
            yC.style.display = "grid"
            break;
        default :
            alert(selected);
    }
}

function formSave(strAction) {
    switch (strAction) {
        case "new":
            alert('Saving a NEW Interaction !!!');
            break;
        case "edit":
            alert('Saving an EDIT Interaction !!!');
            break;
        case "Delete":
            alert('Saving a DELETE Interaction !!!');
            break;
        default :
            alert(strAction);
    }
    // Close the modal
    document.getElementById('myModal').style.display = "none";
    document.getElementById('interactionsBar').style.zIndex = "99999";
}