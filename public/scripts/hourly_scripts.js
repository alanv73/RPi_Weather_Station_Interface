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

// build the hourly ground/air temp chart
function chartTemp() {
    const cat_data = arguments[0];
    const ctz = document.getElementById('temp').getContext('2d');
    const tempChart = new Chart(ctz, {
        type: 'line',
        defaults: {
            global: {
                defaultFontFamily: 'Manrope'
            }
        },
        data: {
            labels: cat_data,
            datasets: [{
                label: 'Ambient Temperature °F',
                yAxisID: 'temp',
                data: arguments[1],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'Ground Temperature °F',
                yAxisID: 'temp',
                data: arguments[2],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(0, 255, 0, 1)',
                borderColor: 'rgba(0, 255, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'Dew Point °F',
                yAxisID: 'dew',
                data: arguments[3],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(0, 0, 255, 1)',
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
                        labelString: 'Dew Point',
                        fontFamily: 'Manrope'
                    }
                }],
                xAxes: [xaxesOptions]
            },
            legend: legendOptions
        }
    });
}

// build the hourly rain/pressure chart
function chartRain() {
    const x_data = arguments[0];
    const ctx = document.getElementById('rain');
    const rainChart = new Chart(ctx, {
        type: 'line',
        defaults: {
            global: {
                defaultFontFamily: 'Manrope'
            }
        },
        data: {
            labels: x_data,
            datasets: [{
                label: 'Rain inches',
                yAxisID: 'rain',
                data: arguments[1],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(128, 64, 0, 1)',
                borderColor: 'rgba(128, 64, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'Barometric Pressure mb',
                yAxisID: 'press',
                data: arguments[2],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(64, 128, 0, 1)',
                borderColor: 'rgba(64, 128, 0, 1)',
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
                            return value + '"';
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
                        labelString: 'Rain',
                        fontFamily: 'Manrope'
                    }

                }, {
                    id: 'press',
                    position: 'right',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + ' mb';
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
                        labelString: 'Barometric Pressure',
                        fontFamily: 'Manrope',
                    }
                }],
                xAxes: [xaxesOptions]
            },
            legend: legendOptions
        }
    });
}

// build the hourly humidity/Dew Pointchart
function chartHumid() {
    const x_data = arguments[0];
    const cty = document.getElementById('humid');
    const humidChart = new Chart(cty, {
        type: 'line',
        defaults: {
            global: {
                defaultFontFamily: 'Manrope'
            }
        },
        data: {
            labels: x_data,
            datasets: [{
                label: 'Relative Humidity %',
                yAxisID: 'RH',
                data: arguments[1],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(0, 128, 128, 1)',
                borderColor: 'rgba(0, 128, 128, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'Wind Speed mph',
                yAxisID: 'mph',
                data: arguments[2],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(128, 0, 128, 1)',
                borderColor: 'rgba(128, 0, 128, 1)',
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
                    id: 'RH',
                    position: 'left',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + '%';
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
                        labelString: 'Relative Humidity',
                        fontFamily: 'Manrope'
                    }
                }, {
                    id: 'mph',
                    position: 'right',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + ' mph';
                        },
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
                        labelString: 'Wind Speed',
                        fontFamily: 'Manrope'
                    }
                }],
                xAxes: [xaxesOptions]
            },
            legend: legendOptions
        }
    });
}

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
                fill: false,
                // pointRadius: 2,
                backgroundColor: 'rgba(64, 96, 128, 1)',
                borderColor: 'rgba(64, 96, 128, 1)',
                // borderWidth: 4,
                lineTension: 0 // straight lines or curved
            }]
        },
        options: {
            legend: legendOptions
        }
    });
}