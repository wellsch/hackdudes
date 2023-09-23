// Define a ChartInterface object
var ChartInterface = {
    chart: null, // Stores the Chart.js chart instance

    // Initialize the ChartInterface with a pie chart
    init: function (canvasId, data, options) {
        var ctx = document.getElementById(canvasId).getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options,
        });
    },

    // Get the current chart data
    getData: function () {
        if (this.chart) {
            return this.chart.data;
        } else {
            console.error('Chart is not initialized.');
            return null;
        }
    },

    // Change the name of a label
    changeLabelName: function (oldLabelName, newLabelName) {
        if (this.chart) {
            var labelIndex = this.chart.labels.indexOf(oldLabelName);
            if (labelIndex !== -1) {
                this.chart.data.labels[labelIndex] = newLabelName;
            } else {
                console.error('Label not found in chart data.');
            }
        } else {
            console.error('Chart is not initialized.');
        }
    },

    // Set the data for a label in the chart
    setLabelData: function (label, value) {
        if (this.chart) {
            var labelIndex = this.chart.data.labels.indexOf(label);
            if (labelIndex !== -1) {
                this.chart.data.datasets[0].data[labelIndex] = value;
            } else {
                console.error('Label not found in chart data.');
            }
        } else {
            console.error('Chart is not initialized.');
        }
    },

    // Add data to the chart
    addData: function (label, value) {
        if (this.chart) {
            this.chart.data.labels.push(label);
            this.chart.data.datasets[0].data.push(value);
            this.chart.update();
        } else {
            console.error('Chart is not initialized.');
        }
    },

    // Remove data from the chart by label
    removeData: function (label) {
        if (this.chart) {
            var labelIndex = this.chart.data.labels.indexOf(label);
            if (labelIndex !== -1) {
                this.chart.data.labels.splice(labelIndex, 1);
                this.chart.data.datasets[0].data.splice(labelIndex, 1);
                this.chart.update();
            } else {
                console.error('Label not found in chart data.');
            }
        } else {
            console.error('Chart is not initialized.');
        }
    },

    // Reset the chart (clear all data)
    resetChart: function () {
        if (this.chart) {
            this.chart.data.labels = [];
            this.chart.data.datasets[0].data = [];
            this.chart.update();
        } else {
            console.error('Chart is not initialized.');
        }
    },
};

// Export the ChartInterface object
module.exports = ChartInterface;
