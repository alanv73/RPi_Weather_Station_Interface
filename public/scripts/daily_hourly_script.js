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
    const ctz = document.getElementById('temp');//.getContext('2d');
    const chartOptions = {
        canvas: ctz,
        datasets: [{
            title: 'Dew Point',
            points: arguments[0]
        }, {
            title: 'Ambient Temperature',
            points: arguments[1]
        }, {
            title: 'Ground Temperature',
            points: arguments[2]
        }, {
            title: 'Dew Point',
            points: arguments[3]
        }]
    }

    const tempChart = make3sTempChart(chartOptions);

    ctz.onclick = function (event) {
        let timestamp;
        let titleText;
        let modalText = '';
        let units = ['°F', '°F', '°F'];
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let i = 0;

        const points = tempChart.getElementsAtEvent(event);

        if (points.length > 0) {
            points.forEach(point => {
                const dataset = tempChart.data.datasets[point._datasetIndex].label;

                if (CREATED) {
                    timestamp = new Date(CREATED[point._index]);
                    titleText = timestamp.toLocaleString('en-US');
                } else {
                    timestamp = new Date(CREATED_DT[point._index]);
                    titleText = timestamp.toLocaleDateString('en-US', options);
                }
                // console.log(CREATED[point._index]);

                const value = tempChart.data.datasets[point._datasetIndex].data[point._index];
                if (dataset != 'ID') {
                    modalText += `${dataset} ${value}${units[i]}\n`;
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
}

setTimeout(function () {
    location.reload();
}, 5 * 60 * 1000); // reload page after 5 minutes