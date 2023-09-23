// script.js

document.addEventListener('DOMContentLoaded', function () {

    // $( function() {
    //     $("#spinner").spinner();
    // } );

    const wheel = document.getElementById('wheel');
    let selectedNumber = 0;

    wheel.addEventListener('wheel', (event) => {
        // Determine the direction of the scroll
        var delta = event.deltaY;

        console.log("Delta base:", delta);

        const delta_sign = Math.sign(event.deltaY);

        delta = Math.min(Math.abs(delta / 4), 4);

        delta = delta * delta_sign;

        console.log("Delta:", delta);

        // const dampingFactor = 2.4;
        // const adjustedDelta = delta / dampingFactor;
        
        // Update the selected number
        selectedNumber += delta;
        console.log("selectedNumber:", selectedNumber);
        selectedNumber = Math.round(selectedNumber);
        console.log("selectedNumber rounded:", selectedNumber);
        if (selectedNumber < 0) selectedNumber = 9;
        if (selectedNumber > 9) selectedNumber = 0;
        
        // Update the wheel position
        wheel.style.transform = `translateY(-${selectedNumber * 50}px)`;
        
        // Prevent the default scroll behavior
        event.preventDefault();
    });

    
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
            
            console.log(myPieChart.getDatasetMeta(0).data[clickedIndex]);
            console.log(myPieChart.chartArea);
            const angle = myPieChart.getDatasetMeta(0).data[clickedIndex].startAngle + (myPieChart.getDatasetMeta(0).data[clickedIndex].circumference / 2);
            const radius = myPieChart.getDatasetMeta(0).data[clickedIndex].outerRadius;
            const x = radius * Math.cos(angle) + myPieChart.chartArea.left + radius;
            const y = radius * Math.sin(angle) + myPieChart.chartArea.top + radius;

            // myPieChart.data.datasets[0].data[clickedIndex] += 10

            var popup = document.getElementById('popup');
            
            // Position the popup next to the clicked segment
            popup.style.left = x + 'px';
            popup.style.top = y + 'px';
            popup.style.display = 'block';

            // Handle the "Update" button click
            document.getElementById('updateValue').addEventListener('click', function () {
                var newValue = parseFloat(document.getElementById('newValue').value);
                if (!isNaN(newValue)) {
                    console.log(myPieChart.data.datasets[0]);
                    // Update the chart data with the new value
                    myPieChart.data.datasets[0].data[clickedIndex] = newValue;
                    myPieChart.update();
                }
                popup.style.display = 'none'; // Hide the popup
            });

            // Perform an action based on the clicked segment
            // alert('You clicked on segment ' + clickedIndex);

            // update the chart
            // myPieChart.update();
        }
    });
});
