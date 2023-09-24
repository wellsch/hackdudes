// Wrapper around an instance of Chart
export class ChartInterface {
    chart = null;

    constructor(chartInstance) {
        this.chart = chartInstance;
    }

    // show updates of chart
    updateChart() {
        this.chart.update();
    }

    // Getter for the chart
    getChart() {
        if (this.chart) {
            return this.chart;
        } else {
            console.error('Chart is not initialized.');
            return null;
        }
    }

    // Getter for the chart data
    getData() {
        if (this.chart) {
            return this.chart.data;
        } else {
            console.error('Chart is not initialized.');
            return null;
        }
    }

    // Get the value corresponding to index
    getValue(index) {
        if (this.chart) {
            if (index >= 0 && index < this.chart.data.labels.length) {
                return this.chart.data.datasets[0].data[index];
            } else {
                console.error(`Index ${index} is out of bounds.`);
                return null;
            }
        } else {
            console.error('Chart is not initialized.');
            return error;
        }
    }

    // Get the total of all values in the pie chart
    getTotal() {
        if (this.chart) {
            return this.chart.data.datasets[0].data.reduce((partialSum, a) => partialSum + a, 0);
        } else {
            console.error('Chart is not initialized.');
            return 0;
        }
    }

    // Set the value corresponding to index
    setValue(index, value) {
        if (this.chart) {
            if (index >= 0 && index < this.chart.data.labels.length) {
                this.chart.data.datasets[0].data[index] = value;
                this.chart.update();
            } else {
                console.error(`Index ${index} is out of bounds.`);
            }
        } else {
            console.error('Chart is not initialized.');
        }
    }

    // Get the label corresponding to index
    getLabel(index) {
        if (this.chart) {
            if (index >= 0 && index < this.chart.data.labels.length) {
                return this.chart.data.labels[index];
            } else {
                console.error(`Index ${index} is out of bounds.`);
            }
        } else {
            console.error('Chart is not initialized.');
            return error;
        }
    }

    // Change the name of a label
    changeLabelName(oldLabelName, newLabelName) {
        if (this.chart) {
            var labelIndex = this.chart.labels.indexOf(oldLabelName);
            if (labelIndex !== -1) {
                this.chart.data.labels[labelIndex] = newLabelName;
                this.chart.update();
            } else {
                console.error(`Label \'${oldLabelName}\'not found in chart data.`);
            }
        } else {
            console.error('Chart is not initialized.');
        }
    }

    // Set the value of a certain label
    setLabelValue(label, value) {
        if (this.chart) {
            var labelIndex = this.chart.data.labels.indexOf(label);
            if (labelIndex !== -1) {
                this.chart.data.datasets[0].data[labelIndex] = value;
                this.chart.update();
            } else {
                console.error(`Label \'${label}\' not found in chart data.`);
            }
        } else {
            console.error('Chart is not initialized.');
        }
    }

    // Check whether a label name exists or not
    doesLabelExist(label) {
        if (this.chart) {
            return this.chart.data.labels.indexOf(label) !== -1;
        } else {
            console.error('Chart is not initialized.');
            return false;
        }
    }

    // Add a label and its corresponding value
    addData(label, value) {
        if (this.chart) {
            this.chart.data.labels.push(label);
            this.chart.data.datasets[0].data.push(value);
            this.chart.data.datasets[0].backgroundColor.push(`rgb(${Math.floor(Math.random() * 256)},
                                                                ${Math.floor(Math.random() * 256)},
                                                                ${Math.floor(Math.random() * 256)})`);
            this.chart.update();
        } else {
            console.error('Chart is not initialized.');
        }
    }

    // Remove a label
    removeData(label) {
        if (this.chart) {
            var labelIndex = this.chart.data.labels.indexOf(label);
            if (labelIndex !== -1) {
                this.chart.data.labels.splice(labelIndex, 1);
                this.chart.data.datasets[0].data.splice(labelIndex, 1);
                this.chart.update();
            } else {
                console.error(`Label \'${label}\' not found in chart data.`);
            }
        } else {
            console.error('Chart is not initialized.');
        }
    }

    // Reset the entire chart
    resetChart() {
        if (this.chart) {
            this.chart.data.labels = [];
            this.chart.data.datasets[0].data = [];
            this.chart.update();
        } else {
            console.error('Chart is not initialized.');
        }
    }
}
