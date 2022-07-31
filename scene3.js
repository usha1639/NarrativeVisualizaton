var margin = { top: 10, right: 0, bottom: 90, left: 50, scatterLeft: 350 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
mydata = [];


function loadScene3(state) {
    mydata = [];

    console.log("loadScene3 Entered");
    var size = d3.scaleLinear()
        .domain([0, 1400000000])
        .range([7, 200]);


    var Tooltip3 = d3.select("#scene3")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

  d3.csv("https://github.com/usha1639/NarrativeVisualizaton/blob/main/usCounty2020.csv", function(data) {
        // d3.csv("usCounty2020.csv", function(data) {
        data.forEach(d => {
            d.cases = +d.cases;
            d.Deaths = +d.Deaths;
            if (d.state == state) {
                mydata.push(d);
            }


        });


        var svg = d3.select("#scene3")
            .select("svg").remove();

        var scene3svg = d3.select("#scene3")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var minx = String(d3.max(mydata, d => d.cases)).length;
        console.log("number of zeros " + minx - 1);
        var devider = 10 ** minx - 2;
        var min = (d3.min(mydata, d => d.cases)) * 32;
        if (min < 900)
            min = d3.max(mydata, d => d.cases) / 30;
        var x = min + 100020;


        var node = scene3svg.append("g")
            .selectAll("circle")
            .data(mydata)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", function(d) { return d.cases / (x) + 10 })
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", 'red')
            .style("fill-opacity", 0.8)
            .attr("stroke", "black")
            .style("stroke-width", 1)
            .on("mouseover", function(d) {
                Tooltip3
                    .style("opacity", 0)
                    .text(d.county + "\nCases:" + d.cases)
                    .attr("class", "tooltip")
                    .attr("width", "400px")
                    .attr("height", "300px")
                    .style("position", "absolute")
                    .style("background-color", "white")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
            }) // What to do when hovered
            .on("mousemove", function(d) {

                Tooltip3
                    .style("opacity", 1)
                d3.select(this).transition()
                    .style("opacity", 1)
            })
            .on("mouseleave", function(d) {
                Tooltip3
                    .style("opacity", 0);
            })

        var simulation = d3.forceSimulation(mydata)
            .force("charge", d3.forceManyBody(8).strength(300)) // Nodes are attracted one each other of value is > 0
            .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
            .force("collide", d3.forceCollide(function(d) { return d.cases / (x) + 10; }).strength(0.7));

        simulation
            .nodes(mydata)
            .on("tick", function(d) {
                node
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
            });
    });
}


loadScene3("Alabama");

function stateChanged(d) {


    loadScene3(getValue("state"));

}
