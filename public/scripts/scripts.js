// choose an icon to display in the navbar
function setNavIcon(atmPress, rain) {
    let icon;

    if (atmPress < 982) {
        if (rain > 0) {
            icon = '<i class="fas fa-cloud-rain"></i>';
        } else {
            icon = '<i class="fas fa-cloud"></i>';
        }
    } else if (atmPress < 1015) {
        if (rain > 0) {
            icon = '<i class="fas fa-cloud-sun-rain"></i>';
        } else {
            icon = '<i class="fas fa-cloud-sun"></i>';
        }
    } else {
        if (rain > 0) {
            icon = '<i class="fas fa-cloud-sun-rain"></i>';
        } else {
            icon = '<i class="fas fa-sun"></i>';
        }
    }

    return icon;
}

// build the rain/pressure chart
function chartRain() {
    const ctx = document.getElementById('rain');
    const chartData = {
        canvas: ctx,
        category: arguments[0],
        datasets: [{
            title: 'Rain Total',
            points: arguments[1],
            units: '"',
            color: 'rgba(128, 64, 0, 1)'
        }, {
            title: 'Barometric Pressure',
            points: arguments[2],
            units: 'mb',
            color: 'rgba(64, 128, 0, 1)'
        }]
    }

    const rainChart = make2sChart(chartData);
}

// build the humidity/Dew Pointchart
function chartHumid() {
    const x_data = arguments[0];
    const cty = document.getElementById('humid');
    const chartData = {
        canvas: cty,
        category: arguments[0],
        datasets: [{
            title: 'Relative Humidity',
            points: arguments[1],
            units: '%',
            color: 'rgba(0, 128, 128, 1)'
        }, {
            title: 'Wind Speed',
            points: arguments[2],
            units: 'mph',
            color: 'rgba(128, 0, 128, 1)'
        }]
    }

    const humidChart = make2sChart(chartData);
}

// chart options
chartOptions = {
    tooltips: {
        mode: 'nearest'
    }
}

// chart legend options
legendOptions = {
    display: true,
    fontFamily: 'Manrope',
    position: 'bottom',
    labels: {
        boxWidth: 10,
        fontSize: 8,
        filter: function (item, chart) {
            // Logic to remove a particular legend item goes here
            return !item.text.includes('ID');
        }
    }
}

// x-axis options
xaxesOptions = {
    display: 'auto',
    scaleLabel: {
        display: true,
        labelString: 'Time',
        fontFamily: 'Manrope',
    },
    ticks: {
        fontFamily: 'Manrope',
        fontSize: 8
    }
}

// returns date object with time rounded to the nearest hour
function roundMinutes(date) {

    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

    return date;
}

// returns date object with minutes/seconds removed
// 6:35 => 6:00
function floorMinutes(date) {

    date.setHours(date.getHours());
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

    return date;
}

// build 4 series temperature line chart with three series on 
// the left y-axis and a fourth series on the right axis
// takes an object containing all of the series data, units,
// and labels
function make4sTempChart(options) {
    let ctz = options.canvas
    let labels = [];
    let dataPoints = [];

    options.datasets.forEach(dataset => {
        labels.push(dataset.title);
        dataPoints.push(dataset.points);

    });

    const tempChart = new Chart(ctz, {
        type: 'line',
        defaults: {
            global: {
                defaultFontFamily: 'Manrope'
            }
        },
        data: {
            labels: dataPoints[0],
            datasets: [{
                label: labels[1],
                yAxisID: 'temp',
                data: dataPoints[1],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: labels[2],
                yAxisID: 'temp',
                data: dataPoints[2],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: 'rgba(255, 128, 0, 1)',
                borderColor: 'rgba(255, 128, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: labels[3],
                yAxisID: 'temp',
                data: dataPoints[3],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: 'rgba(0, 255, 0, 1)',
                borderColor: 'rgba(0, 255, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: labels[4],
                yAxisID: 'dew',
                data: dataPoints[4],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }]
        },
        options: {
            // aspectRatio: 1,
            responsive: true,
            events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
            options: chartOptions,
            scales: {
                yAxes: [{
                    id: 'temp',
                    position: 'left',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + '°';
                        },
                        // max: (Math.max.apply(Math, y_data) * 1.25),
                        // min: Math.max.apply(Math, y_data) - (Math.min.apply(Math, y_data) * 0.25),
                        fontFamily: 'Manrope',
                        // maxTicksLimit: 5,
                        beginAtZero: false,
                        fontSize: 8
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: labels[0],
                        fontFamily: 'Manrope'
                    }
                }, {
                    id: 'dew',
                    position: 'right',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + '°';
                        },
                        // max: (Math.max.apply(Math, y_data) * 1.25),
                        // min: Math.max.apply(Math, y_data) - (Math.min.apply(Math, y_data) * 0.25),
                        fontFamily: 'Manrope',
                        // maxTicksLimit: 5,
                        beginAtZero: false,
                        fontSize: 8
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: labels[4],
                        fontFamily: 'Manrope'
                    }
                }],
                xAxes: [xaxesOptions]
            },
            legend: legendOptions,
        }
    });

    return tempChart;
}

// build 3 series temperature line chart with two series on 
// the left y-axis and a third series on the right axis
// takes an object containing all of the series data, units,
// and labels
function make3sTempChart(options) {
    let ctz = options.canvas
    let labels = [];
    let dataPoints = [];

    options.datasets.forEach(dataset => {
        labels.push(dataset.title);
        dataPoints.push(dataset.points);
    });

    const tempChart = new Chart(ctz, {
        type: 'line',
        defaults: {
            global: {
                defaultFontFamily: 'Manrope'
            }
        },
        data: {
            labels: dataPoints[0],
            datasets: [{
                label: labels[1],
                yAxisID: 'temp',
                data: dataPoints[1],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: labels[2],
                yAxisID: 'temp',
                data: dataPoints[2],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: 'rgba(0, 255, 0, 1)',
                borderColor: 'rgba(0, 255, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: labels[3],
                yAxisID: 'dew',
                data: dataPoints[3],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }]
        },
        options: {
            // aspectRatio: 1,
            responsive: true,
            events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
            options: chartOptions,
            scales: {
                yAxes: [{
                    id: 'temp',
                    position: 'left',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + '°';
                        },
                        // max: (Math.max.apply(Math, y_data) * 1.25),
                        // min: Math.max.apply(Math, y_data) - (Math.min.apply(Math, y_data) * 0.25),
                        fontFamily: 'Manrope',
                        // maxTicksLimit: 5,
                        beginAtZero: false,
                        fontSize: 8
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature',
                        fontFamily: 'Manrope'
                    }
                }, {
                    id: 'dew',
                    position: 'right',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + '°';
                        },
                        // max: (Math.max.apply(Math, y_data) * 1.25),
                        // min: Math.max.apply(Math, y_data) - (Math.min.apply(Math, y_data) * 0.25),
                        fontFamily: 'Manrope',
                        // maxTicksLimit: 5,
                        beginAtZero: false,
                        fontSize: 8
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: labels[0],
                        fontFamily: 'Manrope'
                    }
                }],
                xAxes: [xaxesOptions]
            },
            legend: legendOptions,
        }
    });

    return tempChart;
}

// build generic 2 series line chart with one series on 
// the left y-axis and another series on the right axis
// takes an object containing all of the series data, units,
// labels, and colors
function make2sChart(data) {
    let ctx = data.canvas;
    let labels = [];
    let dataPoints = [];
    let units = [];
    let color = [];
    let categoryPoints = data.category;

    data.datasets.forEach(dataset => {
        labels.push(dataset.title);
        dataPoints.push(dataset.points);
        units.push(dataset.units);
        color.push(dataset.color);
    });

    const twoSeriesChart = new Chart(ctx, {
        type: 'line',
        defaults: {
            global: {
                defaultFontFamily: 'Manrope'
            }
        },
        data: {
            labels: categoryPoints,
            datasets: [{
                label: labels[0],
                yAxisID: 'rain',
                data: dataPoints[0],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: color[0],
                borderColor: color[0],
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: labels[1],
                yAxisID: 'press',
                data: dataPoints[1],
                fill: false,
                pointRadius: 0.5,
                backgroundColor: color[1],
                borderColor: color[1],
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }]
        },
        options: {
            // aspectRatio: 1,
            responsive: true,
            options: chartOptions,
            scales: {
                yAxes: [{
                    id: 'rain',
                    position: 'left',
                    ticks: {
                        // Include an inch symbol in the ticks
                        callback: function (value, index, values) {
                            return value + `${units[0]}`;
                        },
                        // max: (Math.max.apply(Math, y_data) * 1.25),
                        // min: Math.max.apply(Math, y_data) - (Math.min.apply(Math, y_data) * 0.25),
                        fontFamily: 'Manrope',
                        // maxTicksLimit: 5,
                        beginAtZero: false,
                        fontSize: 8
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: labels[0],
                        fontFamily: 'Manrope'
                    }

                }, {
                    id: 'press',
                    position: 'right',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + ` ${units[1]}`;
                        },
                        fontFamily: 'Manrope',
                        // maxTicksLimit: 5,
                        beginAtZero: false,
                        fontSize: 8
                    },
                    gridLines: {
                        drawOnChartArea: true,
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: labels[1],
                        fontFamily: 'Manrope',
                    }
                }],
                xAxes: [xaxesOptions]
            },
            legend: legendOptions
        }
    });

    ctx.onclick = function (event) {
        let timestamp;
        let titleText;
        let modalText = '';
        let chartUnits = [units[0], units[1]];
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let i = 0;

        const points = twoSeriesChart.getElementsAtEvent(event);

        if (points.length > 0) {
            points.forEach(point => {
                const dataset = twoSeriesChart.data.datasets[point._datasetIndex].label;
                if (CREATED) {
                    timestamp = new Date(CREATED[point._index]);
                    titleText = timestamp.toLocaleString('en-US');
                } else {
                    timestamp = new Date(CREATED_DT[point._index]);
                    titleText = timestamp.toLocaleDateString('en-US', options);
                }
                // console.log(CREATED[point._index]);

                const value = twoSeriesChart.data.datasets[point._datasetIndex].data[point._index];
                if (dataset != 'ID') {
                    modalText += `${dataset} ${value} ${chartUnits[i]}\n`;
                    i++;
                }
            });

            $('#chartModalLabel').text(titleText);

            $('#modal-text').text(modalText);

            if ($('#hourly-title > h1').text().toLowerCase().includes('hourly')) {
                $('#drill').attr("hidden", true);
            }

            $('#chartModal').modal('show');
        }
    }

    return twoSeriesChart;
}

// build the radial chart to display wind direction
// takes an arry with the 16 compass directions
// and a series containing histogram data for a period
function chartWind() {
    const x_data = arguments[0];
    const ctx = document.getElementById('wind');

    var radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: x_data,
            datasets: [{
                label: 'Wind Direction',
                // yAxisID: 'mph',
                data: arguments[1],
                fill: true,
                // pointRadius: 2,
                backgroundColor: 'rgba(64, 96, 128, 0.5)',
                borderColor: 'rgba(64, 96, 128, 1)',
                borderWidth: 2,
                lineTension: 0 // straight lines or curved
            }]
        },
        options: {
            legend: legendOptions
        }
    });
}