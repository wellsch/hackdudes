// script.js

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

            myPieChart.data.datasets[0].data[clickedIndex]++

            // Perform an action based on the clicked segment
            // alert('You clicked on segment ' + clickedIndex);

            // update the chart
            myPieChart.update();
        }
    });
});
