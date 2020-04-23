// build the hourly rain chart
function chartTemp() {
    const x_data = arguments[0];
    const ctx = document.getElementById('temp').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        defaults: {
            global: {
                defaultFontFamily: 'Manrope'
            }
        },
        data: {
            labels: x_data,
            datasets: [{
                label: 'Ambient Temperature °F',
                yAxisID: 'temp',
                data: arguments[1],
                fill: false,
                pointRadius: 2,
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 4,
                lineTension: 0 // straight lines or curved
            }, {
                label: 'Ground Temperature °F',
                yAxisID: 'temp',
                data: arguments[2],
                fill: false,
                pointRadius: 2,
                backgroundColor: 'rgba(0, 255, 0, 1)',
                borderColor: 'rgba(0, 255, 0, 1)',
                borderWidth: 4,
                lineTension: 0 // straight lines or curved
            }, {
                label: 'Dew Point °F',
                yAxisID: 'temp',
                data: arguments[3],
                fill: false,
                pointRadius: 2,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                borderWidth: 4,
                lineTension: 0 // straight lines or curved
            }, {
                label: 'Relative Humidity %',
                yAxisID: 'RH',
                data: arguments[4],
                fill: false,
                pointRadius: 2,
                backgroundColor: 'rgba(0, 128, 128, 1)',
                borderColor: 'rgba(0, 128, 128, 1)',
                borderWidth: 4,
                lineTension: 0 // straight lines or curved
            }]
        },
        options: {
            aspectRatio: 1,
            options: {
                tooltips: {
                    mode: 'nearest'
                }
            },
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
                        beginAtZero: false
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: '°F',
                        fontFamily: 'Manrope'
                    }

                }, {
                    id: 'RH',
                    position: 'right',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + '%';
                        },
                        fontFamily: 'Manrope',
                        // maxTicksLimit: 5,
                        beginAtZero: false
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: '% Relative Humidity',
                        fontFamily: 'Manrope'
                    }
                }],
                xAxes: [{
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
                }]
            },
            legend: {
                display: true,
                fontFamily: 'Manrope',
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                    fontSize: 8,
                }
            }
        }
    });
}