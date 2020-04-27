
// build the cpu temp chart
function chartCPU() {
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
                label: 'CPU Temperature °F',
                yAxisID: 'temp',
                data: arguments[1],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'Ambient Temperature °F',
                yAxisID: 'temp',
                data: arguments[2],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(0, 255, 0, 1)',
                borderColor: 'rgba(0, 255, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'Humidity %',
                yAxisID: 'humid',
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
                    id: 'humid',
                    position: 'right',
                    ticks: {
                        // Include a degree symbol in the ticks
                        callback: function (value, index, values) {
                            return value + '%';
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
                        labelString: 'Relative Humidity',
                        fontFamily: 'Manrope'
                    }
                }],
                xAxes: [xaxesOptions]
            },
            legend: legendOptions
        }
    });
}