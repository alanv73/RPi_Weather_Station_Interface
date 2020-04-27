// convert an angle to a compass point string
function deg2Compass(deg) {
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N", "NNE"];

    let dir = arr[Math.floor(deg / 22.5)];
    return dir;
}

// build the hourly rain chart
function chartRain(x_data, y_data) {
    const ctx = document.getElementById('rain').getContext('2d');
    const myChart = new Chart(ctx, {
        type: ys.length > 2 ? 'line' : 'bar',
        defaults: {
            global: {
                fontFamily: 'Manrope'
            }
        },
        data: {
            labels: x_data,
            datasets: [{
                label: 'Rain in Inches',
                data: y_data,
                fill: false,
                pointRadius: 1,
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderColor: 'rgba(0, 0, 255, 1)',
                borderWidth: 1,
                // lineTension: 0 // straight lines or curved
            }]
        },
        options: {
            aspectRatio: 1,
            scales: {
                yAxes: [{
                    ticks: {
                        // Include an inch symbol in the ticks
                        callback: function (value, index, values) {
                            return value + '"';
                        },
                        max: (Math.max.apply(Math, ys) * 1.25).toFixed(2),
                        min: 0,
                        fontFamily: 'Manrope',
                        maxTicksLimit: 5
                    },
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: 'inches',
                        fontFamily: 'Manrope'
                    }

                }],
                xAxes: [{
                    display: 'auto',
                    scaleLabel: {
                        display: true,
                        labelString: 'hour',
                        fontFamily: 'Manrope'
                    },
                    ticks: {
                        fontFamily: 'Manrope'
                    }
                }]
            },
            legend: {
                display: false,
                fontFamily: 'Manrope'
            }
        }
    });
}


// gauges initially don't render with the custom font
// wait until your custom font is loaded then iterate
// through the gauges and refresh each one
document.fonts.forEach(font => {
    font.loaded.then(() => {
        // using match, because in FF it contains quote marks
        if (font.family.match(/Manrope/)) {
            document.gauges.forEach(gauge => {
                gauge.update();
            });
        }
    });
});

setTimeout(function () {
    location.reload();
}, 5 * 60 * 1000); // reload page after 5 minutes