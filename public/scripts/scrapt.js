let speed = +document.getElementById('speed').innerText;
let gust = +document.getElementById('gust').innerText;
let range = gust > 45 ? 150 : 50;

var data = [
    {
        type: "indicator",
        value: speed,
        number: { suffix: 'mph' },
        gauge: {
            axis: {
                visible: true,
                range: [0, range],
                tickmode: 'linear',
                tick0: range / 10,
                dtick: range / 10,
                tickangle: 0
            },
            threshold: {
                value: gust,
                line: { color: "#F00", width: "4" }
            }
        },
        domain: { x: [0, 1], y: [0, 1] }
    }
];

var layout = {
    width: 400,
    height: 275,
    template: {
        data: {
            indicator: [
                {
                    title: { text: "Wind Speed", font: { size: 28 } },
                    mode: "number+gauge",
                }
            ]
        }
    }
};

Plotly.newPlot('myDiv', data, layout);