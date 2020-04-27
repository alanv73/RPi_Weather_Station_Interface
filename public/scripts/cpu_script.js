
// build the cpu temp chart
function chartCPU() {
    Chart.plugins.register({
        // need to manipulate tooltip visibility before its drawn (but after update)
        beforeDraw: function (chartInstance, easing) {
            // check and see if the plugin is active (its active if the option exists)
            if (chartInstance.config.options.tooltips.onlyShowForDatasetIndex) {
                // get the plugin configuration
                var tooltipsToDisplay = chartInstance.config.options.tooltips.onlyShowForDatasetIndex;

                // get the active tooltip (if there is one)
                var active = chartInstance.tooltip._active || [];

                // only manipulate the tooltip if its just about to be drawn
                if (active.length > 0) {
                    // first check if the tooltip relates to a dataset index we don't want to show
                    if (tooltipsToDisplay.indexOf(active[0]._datasetIndex) === -1) {
                        // we don't want to show this tooltip so set it's opacity back to 0
                        // which causes the tooltip draw method to do nothing
                        chartInstance.tooltip._model.opacity = 0;
                    }
                }
            }
        }
    });

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
                label: 'CPU Temperature',
                yAxisID: 'temp',
                data: arguments[1],
                fill: false,
                pointRadius: 1,
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'Ambient Temperature',
                yAxisID: 'temp',
                data: arguments[2],
                fill: false,
                pointRadius: 1,
                backgroundColor: 'rgba(0, 255, 0, 1)',
                borderColor: 'rgba(0, 255, 0, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'Humidity',
                yAxisID: 'humid',
                data: arguments[3],
                fill: false,
                pointRadius: 1,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                // borderWidth: 4,
                lineTension: 0.4 // straight lines or curved
            }, {
                label: 'ID',
                yAxisID: 'id',
                data: arguments[4],
                fill: false,
                pointRadius: 0,
                backgroundColor: 'rgba(32, 64, 128, 0)',
                borderColor: 'rgba(32, 64, 128, 0)',
                // borderWidth: 4,
                showLine: false,
                lineTension: 0.4 // straight lines or curved
            }]
        },
        options: {
            // aspectRatio: 1,
            responsive: true,
            // options: chartOptions,
            tooltips: {
                onlyShowForDatasetIndex: [0, 1, 2]
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
                }, {
                    id: 'id',
                    position: 'right',
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    display: false,
                    scaleLabel: {
                        display: false,
                        labelString: 'ID',
                        fontFamily: 'Manrope'
                    }
                }],
                xAxes: [xaxesOptions]
            },
            legend: legendOptions,
            onClick: () => {
                let timestamp;
                let modalText = '';
                let units = ['°F', '°F', '%'];
                let i = 0;

                const pointID = tempChart.getElementsAtEvent(event)[3];
                if (pointID) {
                    const ID = tempChart.data.datasets[pointID._datasetIndex].data[pointID._index];
                    console.log(ID);
                }

                const points = tempChart.getElementsAtEvent(event);

                if (points) {
                    points.forEach(point => {
                        const dataset = tempChart.data.datasets[point._datasetIndex].label;
                        timestamp = new Date(tempChart.data.labels[point._index]);

                        const value = tempChart.data.datasets[point._datasetIndex].data[point._index];
                        if (dataset != 'ID') {
                            modalText += `${dataset} ${value}${units[i]}\n`;
                            i++;
                        }
                    });
                }

                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let titleText = `${timestamp.toLocaleDateString('en-US', options)}, ${timestamp.toLocaleTimeString('en-US')}`;
                $('#chartModalLabel').text(titleText);

                $('#modal-text').text(modalText);
                $('#chartModal').modal('show');

            }
        }
    });
}

