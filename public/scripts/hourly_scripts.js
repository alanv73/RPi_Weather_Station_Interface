// build the hourly rain chart
function chartTemp() {
    const x_data = arguments[0];
    const ctx = document.getElementById('temp').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        defaults: {
            global: {
                fontFamily: 'Manrope'
            }
        },
        data: {
            labels: x_data,
            datasets: [{
                label: 'Ambient Temperature °F',
                data: arguments[1],
                fill: false,
                pointRadius: 2,
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 4,
                lineTension: 0 // straight lines or curved
            }, {
                label: 'Ground Temperature °F',
                data: arguments[2],
                fill: false,
                pointRadius: 2,
                backgroundColor: 'rgba(0, 255, 0, 1)',
                borderColor: 'rgba(0, 255, 0, 1)',
                borderWidth: 4,
                lineTension: 0 // straight lines or curved
            }, {
                label: 'Dew Point °F',
                data: arguments[3],
                fill: false,
                pointRadius: 2,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                borderWidth: 4,
                lineTension: 0 // straight lines or curved
            }]
        },
        options: {
            aspectRatio: 1,
            scales: {
                yAxes: [{
                    ticks: {
                        // Include an inch symbol in the ticks
                        // callback: function (value, index, values) {
                        //     return value + '\U00B0';
                        // },
                        // max: (Math.max.apply(Math, y_data) * 1.25),
                        // min: Math.max.apply(Math, y_data) - (Math.min.apply(Math, y_data) * 0.25),
                        fontFamily: 'Manrope',
                        maxTicksLimit: 5,
                        beginAtZero: false
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: '°F',
                        fontFamily: 'Manrope'
                    }

                }],
                xAxes: [{
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: 'Timestamp',
                        fontFamily: 'Manrope'
                    },
                    ticks: {
                        fontFamily: 'Manrope'
                    }
                }]
            },
            legend: {
                display: true,
                fontFamily: 'Manrope'
            }
        }
    });
}