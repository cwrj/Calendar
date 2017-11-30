/*
    general structure of socket script file :

        *** on page load ***
        1. show banner status element
        2. upgrade connection with server to websocket
        3. receive query (retrieve rows) of events for current month
        4. fillCalendar()

        *** on save of NEW event ***
        1. show banner status element
        2. append event to database tables
        3. fillCalendar()

        *** on EDIT of event data ***
        1. show banner status element
        2. update event to database tables
        3. fillCalendar()

        *** on DELETE of an event ***
        1. show banner status element
        2. delete event in database tables
        3. fillCalendar()
*/

function statusBanner(showORhide, msg) {
    var sB = document.getElementById("statusBanner");

    if (showORhide = 'show') {
        sB.innerHTML = msg;
        sB.style.display = 'block';
    } else {
        sB.style.display = 'none';
    }
}

function wsOpen() {
    //open a websocket to server
    var socket = new WebSocket('ws://http.localhost:9999/ws');
    socket.onopen = function() {
    
    }
}
