// clickPieChart.js

document.addEventListener('DOMContentLoaded', function () {
    // Get a reference to the canvas element
    var ctx = document.getElementById('myPieChart').getContext('2d');

    // Define your data for the pie chart
    var data = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
            data: [30, 40, 30], // Values for each segment
            backgroundColor: ['red', 'green', 'blue'], // Colors for each segment
        }],
    };

    // Configure the pie chart
    var options = {
        responsive: true,
        maintainAspectRatio: true,
    };

    // Create the pie chart
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
    });

    // Add a click event listener to the chart elements
    ctx.canvas.addEventListener('click', function (event) {
        var activeElements = myPieChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (activeElements.length > 0) {
            // Get the index of the clicked segment
            var clickedIndex = activeElements[0].index;

            // myPieChart.data.datasets[0].data[clickedIndex] += 10

            // set popup attribute to be used later
            var popup = document.getElementById('popup');
            popup.setAttribute("clickedIndex", clickedIndex);
            
            // Position the popup next to the clicked segment
            popup.style.left = event.clientX / 2 + 'px';
            popup.style.top = event.clientY / 2 + 'px';
            popup.style.display = 'block';
        }
    });

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
        myPieChart.data.datasets[0].data[index] = newValue;
        myPieChart.update();
    }
});
