import { ChartInterface } from "./chartInterface.js";

// Options for all pie charts
var options = {
    responsive: true,
    maintainAspectRatio: true,
};

export function receiveJSON(jsonData) {
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
                    canvas.id = "key";
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
                }

                for (var nestedKey in value) {
                    if (value.hasOwnProperty(nestedKey)) {
                        var nestedValue = value[nestedKey];
                        console.log(key + "." + nestedKey + ": " + nestedValue);

                        newInterface.addData(nestedKey, nestedValue);
                    }
                }
            } else {
                console.log(key + ": " + value);
            }
        }
    }    
}

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