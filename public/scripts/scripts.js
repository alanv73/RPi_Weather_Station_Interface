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
