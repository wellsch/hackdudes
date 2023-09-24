// clickPieChart.js
import { ChartInterface } from "./chartInterface.js";
import { receiveJSON } from "./test.js";

const jsonData = {
    "discretionary": {
        "misc": 8649.0
    },
    "necessities": {
        "food": 250,
        "misc": 0,
        "transportation": 250
    },
    "overall": {
        "discretionary": 8649.0,
        "necessities": 500,
        "rent": 820.0,
        "savings": 0,
        "utilities": 31.0
    },
    "utilities": {
        "electricity": 10.333333333333334,
        "gas": 10.333333333333334,
        "water": 10.333333333333334
    }
}

const jsonData2 = {
    "discretionary": {
        "misc": 8649.0
    },
    "necessities": {
        "food": 250,
        "misc": 50,
        "transportation": 250,
        "books": 30
    },
    "overall": {
        "discretionary": 8649.0,
        "necessities": 580,
        "rent": 820.0,
        "savings": 0,
        "utilities": 41.0
    },
    "utilities": {
        "electricity": 10.333333333333334,
        "gas": 10.333333333333334,
        "water": 10.333333333333334,
        "wifi": 10
    }
}

document.addEventListener('DOMContentLoaded', function () {

    receiveJSON(JSON.parse(localStorage.getItem('logindata')));
    // Function to close the popup
    function closePopup() {
        var popup = document.getElementById('popup');
        popup.style.display = 'none';
    }

    // Function to handle the 'Esc' key press
    function handleEscKey(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            closePopup();
        }
        else if (event.key === 'l') {
            receiveJSON(JSON.parse(localStorage.getItem('logindata')));
        }
        else if (event.key == 'r') {
            receiveJSON(jsonData2);
        }
    }

    // Add a 'keydown' event listener to the document to handle 'Esc' key press
    document.addEventListener('keydown', handleEscKey);
});
