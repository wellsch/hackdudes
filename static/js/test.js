import { ChartInterface } from "./chartInterface.js";

const idToChartInterface = new Map();

// Options for all pie charts
var options = {
    responsive: true,
    maintainAspectRatio: true,
};

export function receiveJSON(jsonData) {

    var changeLog = [];

    // TODO: change this to just 'container'
    var container = document.getElementById('card-container');

    console.log(jsonData);

    // for (chartName of jsonData) {
    //     console.log(chartName);
    // }
    
    for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {

            var value = jsonData[key];

            var newInterface;
    
            if (typeof value === "object" && !Array.isArray(value)) {

                if (!container.querySelector("."+key)) {
                    /*
                    TODO here:
                        - apend newDiv with class = "card <key>" to container
                        - append canvas to newDiv:
                            - id = "key"
                            - build pie chart
                        - append popupDiv to newDiv
                            - append popup subelements
                        - append card-body div to newDiv (if we keep this)
                            - add subelements
        
                    */
                    var newDiv = document.createElement("div");
                    newDiv.className = 'card ' + key;
        
                    var canvas = document.createElement("canvas");
                    canvas.id = key;
                    newDiv.appendChild(canvas);
        
                    container.appendChild(newDiv);

                    // Empty data for new pie chart
                    var data = {
                        labels: [],
                        datasets: [{
                            data: [], 
                            backgroundColor: []
                        }],
                    };

                    // Create the pie chart
                    var myPieChart = new Chart(canvas.getContext('2d'), {
                        type: 'pie',
                        data: data,
                        options: options,
                    });

                    newInterface = new ChartInterface(myPieChart);

                    idToChartInterface.set(`${key}`, newInterface);

                    addClickListener(canvas, newInterface);

                    for (var nestedKey in value) {
                        if (value.hasOwnProperty(nestedKey)) {
                            var nestedValue = value[nestedKey];
                            console.log(key + "." + nestedKey + ": " + nestedValue);
    
                            newInterface.addData(nestedKey, nestedValue);
                        }
                    }
                } else {
                    console.log()
                    var pieInterface = idToChartInterface.get(key);

                    for (var nestedKey in value) {
                        if (value.hasOwnProperty(nestedKey)) {
                            var nestedValue = value[nestedKey];
                            console.log(key + "." + nestedKey + ": " + nestedValue);

                            if (pieInterface.doesLabelExist(nestedKey)) {
                                pieInterface.setLabelValue(nestedKey, nestedValue);
                            } else {
                                pieInterface.addData(nestedKey, nestedValue);
                            }
                        }
                    }
                }
            } else {
                console.log(key + ": " + value);
            }
        }
    }    
}

function addClickListener(canvas, pieInterface) {
    // Add a click event listener to the chart elements
    canvas.getContext('2d').canvas.addEventListener('click', function (event) {
        var activeElements = pieInterface.getChart().getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (activeElements.length > 0) {
            // Get the index of the clicked segment
            var clickedIndex = activeElements[0].index;

            // myPieChart.data.datasets[0].data[clickedIndex] += 10

            // set popup attribute to be used later
            var popup = document.getElementById('popup');
            popup.setAttribute("clickedIndex", clickedIndex);
            popup.setAttribute("canvasId", canvas.id);

            // sets the background color but it looks terrible, could maybe be used to modify color
            // popup.style.backgroundColor = myPieChart.data.datasets[0].backgroundColor[clickedIndex];

            var newValueInput = popup.querySelector('input');
            newValueInput.value = pieInterface.getValue(clickedIndex);

            var label = popup.querySelector('label');
            label.textContent = "New value for " + pieInterface.getLabel[clickedIndex] + ":";

            // Position the popup next to the clicked segment
            // popup.style.left = event.clientX + 'px';
            // popup.style.top = event.clientY + 'px';
            popup.style.display = 'block';

            // Focus on the "Update Value" input field
            var inputField = document.getElementById('newValue');
            inputField.focus();
            inputField.select();

            // Add a keydown event listener to the input field
            inputField.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    // Simulate a click event on the "Update" button
                    document.getElementById('updateValue').click();
                }
            });
        }
    });
}

// Handle the "Update" button click
document.getElementById('updateValue').addEventListener('click', handlePopupUpdate);

function handlePopupUpdate(event) {
    var popup = document.getElementById('popup');
    var newValue = parseFloat(document.getElementById('newValue').value);
    if (!isNaN(newValue)) {
        // Update the chart data with the new value
        updateChartData(parseInt(popup.getAttribute("clickedIndex")), newValue);
    }
    popup.style.display = 'none'; // Hide the popup
}

function updateChartData(index, newValue) {
    var pieInterface = idToChartInterface.get(document.getElementById('popup').getAttribute("canvasId"));
    pieInterface.setValue(index, newValue);
}

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
}

// Add a 'keydown' event listener to the document to handle 'Esc' key press
document.addEventListener('keydown', handleEscKey);

// recursive JSON iterator, most likely won't use
function iterateJSON(jsonData, parentKey="") {
    for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            var value = jsonData[key];
            var fullKey = parentKey ? parentKey + "." + key : key;

            if (typeof value === "object" && !Array.isArray(value)) {
                iterateJSON(value, fullKey);
            } else {
                console.log(fullKey + ": " + value);
            }
        }
    }
}