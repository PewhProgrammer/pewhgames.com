/**
 * Created by Thinh-Laptop on 13.09.2017.
 */

var data =
    [
        {
            "State": "CA",
            "A": "45",
            "B": "-11",
            "C": "22",
            "D": "43",
            "E": "45",
            "F": "-11",
            "G": "22",
            "H": "43"
        },
        {
            "State": "TXDD",
            "A": "55",
            "B": "11"
        },
        {
            "State": "NY",
            "A": "45",
            "B": "11"
        },
        {
            "State": "FL",
            "A": "45",
            "B": "-5"
        },
        {
            "State": "IL",
            "A": "45",
            "B": "0"
        },
        {
            "State": "PA",
            "A": "45",
            "B": "11"
        }
    ];

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var negWidth = width * -1;
var posWidth = width * 0.5;
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#141823", "#8a89a6", "#141823", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#fatusch").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var ageNames = d3.keys(data[0]).filter(function (key) {
    return key !== "State";
});

data.forEach(function (d) {
    d.ages = ageNames.map(function (name) {
        return {name: name, value: +d[name]};
    });
});

x0.domain(data.map(function (d) {
    return d.State;
}));
x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
var d3Min =    d3.min(data, function (d) {
    return d3.min(d.ages, function (d) {
        return d.value;
    });
});
var  d3Max =  d3.max(data, function (d) {
    return d3.max(d.ages, function (d) {
        return d.value;
    });
});
y.domain([ d3Min,d3Max ]);

var xAxisTransform =  height;
if(d3Min < 0 && 0 < d3Max) {
    xAxisTransform = height * (d3Max / (d3Max -d3Min));
}


var state = svg.selectAll(".state")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function (d) {
        return "translate(" + x0(d.State) + ",0)";
    });

state.selectAll("rect")
    .data(function (d) {
        return d.ages;
    })
    .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function (d) {
        return x1(d.name);
    })
    .attr("y", function (d) {
        if(d.value < 0)
            return y(0);
        return y(d.value);
    })
    .attr("height", function (d) {
        if(d.value < 0) {
            return y(d.value+d3Max);
        }
        return height - y(d.value+d3Min);
    })
    .style("fill", function (d) {
        return color(d.name);
    });
svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0," + xAxisTransform + ")") // this line moves x-axis
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Population");

keys = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

var legend = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });
