var margin = { top: 10, right: 0, bottom: 90, left: 50, scatterLeft: 350 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var covidData = new Object();
let mydata = [];
var maxdot = 0;
let maxObj = 0;
let annotationtexts = {
    "2020": "NewYork, New jersey, Cannecticut have seen wosrt death rate, can be seen by the big dots.",
    "2021": "Small dots show that in 2021 the death rate reduced",
    "2022": "Small dots show that in 2022 the death rate reduced"

}

function loadScene2(year) {
    d3.csv("https://raw.githubusercontent.com/usha1639/NarrativeVisualizaton/main/stateLevelScatterPlotData.csv", function(data) {
        //d3.csv("stateLevelScatterPlotData.csv", function(data) {     
        mydata = [];

        let annText1 = annotationtexts[year];
        console.log(annText1);
        var svg = d3.select("#scene2")
            .select("svg").remove();
        var scene2svg = d3.select("#scene2")
            .append("svg");

        scene2svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g");


        let dvsc = 1;
        console.log("scene2 read data looks like");
        data.forEach(d => {
            let ele = {};
            ele.cases = parseInt(d.cases);
            ele.Deaths = parseInt(d.Deaths);
            ele.state = d.state;
            ele.Year = d.Year;
            console.log("before if" + ele);
            ele.Deaths = +ele.Deaths;
            //ele.Year = String(d.Year);
            if (ele.Year == year) {
                console.log("inside if " + ele.cases);
                mydata.push(ele);
            }
            if (maxdot < (ele.Deaths * 100) / ele.cases) {
                maxdot = (ele.Deaths * 100) / ele.cases;
                maxObj = ele;
            }
        });
        console.log("maxdot.deaths");
        console.log(maxObj.Deaths);
        covidData.year = getValue('year');


        var XScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.cases)])
            .range([0, width - margin.right]);

        var xaxis = d3
            .axisBottom()
            .scale(XScale);

        scene2svg.append("g")
            .call(xaxis).attr("transform", "translate(" + 80 + "," + 550 + ")");
        console.log([0, d3.max(data, d => d.Deaths)]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.Deaths)])
            .range([height, 0]);

        var yAxis = d3.axisLeft().scale(yScale);

        scene2svg.append("g")
            .call(yAxis).attr("transform", "translate(" + 80 + "," + margin.top + ")");





        scene2svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle").attr("transform", "translate(" + 80 + "," + margin.top + ")")
            .attr("cx", function(d) { return XScale(d.cases); })
            .attr("cy", function(d) { return yScale(d.Deaths); })
            .attr("r", function(d) { return 2 + ((d.Deaths * 200) / (d.cases)); })
            .style("fill", "red")
            .on("mouseover", function(d) {
                Tooltip2
                    .style("opacity", 0)
                    .text("State:" + d.state + "\nCases:" + d.cases + "\nDeaths:" + d.Deaths + "\nYear:" + d.Year)
                    .attr("class", "tooltip")
                    .attr("width", "100 px")
                    .attr("height", "100px")
                    .style("position", "absolute")
                    .style("background-color", "white")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mousemove", function(d) {
                Tooltip2
                    .style("opacity", 1)
                d3.select(this).transition()
                    .style("opacity", 1);

            })
            .on("mouseleave", function(d) {
                Tooltip2
                    .style("opacity", 0)
                d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
            });


        scene2svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 70)
            .attr("x", -margin.top - height / 2 + 20)
            .text("Deaths");

        scene2svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width / 2 + margin.left)
            .attr("y", height + margin.top + 30)
            .text("Cases");


        var Tooltip2 = d3.select("#scene2")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        var mousemove = function(d) {
            Tooltip2
                .style("opacity", 1)
            d3.select(this).transition
                .style("opacity", 1)
        }
        var mouseover = function(d) {
            Tooltip2
                .text("State:" + d.state + "|Cases:" + d.cases + "|Deaths:" + d.deaths + "|year:" + d.year)
                .style("top", (d3.mouse(this)[1]) + "px")
                .style("right", (d3.mouse(this)[0]) + "px")
        }
        var mouseleave = function(d) {
            Tooltip2
                .style("opacity", 0)
            d3.select(this)
                .style("opacity", 0.8)
        }


        let DV_Annotation_1 = [{
                note: {
                    label: "",
                    title: annText1
                },
                subject: {
                    width: 50,
                    height: 50
                },
                x: 100,
                y: 300,
                dy: -150,
                dx: 100
            }]
            // Add annotation to the chart
        let DV_Annotation_const_1 = d3.annotation()
            .annotations(DV_Annotation_1)
        scene2svg
            .append("g").attr("transform", "translate(" + 80 + "," + -40 + ")")

        .call(DV_Annotation_const_1)


    });


}

function getValue(id) {
    var select = document.getElementById(id);
    return select.options[select.selectedIndex].value;

}

loadScene2("2020");

function update(aYear) {
    aYear = String(aYear);
    let annText = annotationtexts[aYear];

    d3.csv("https://raw.githubusercontent.com/usha1639/NarrativeVisualizaton/main/stateLevelScatterPlotData.csv", function(data) {
        //d3.csv("data/stateLevelScatterPlotData.csv", function(data) {

        var svg = d3.select("#scene2")
            .select("svg").remove();
        var scene2svg = d3.select("#scene2")
            .append("svg");

        scene2svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g");

        let filteredData = []
        maxval = 0;
        data.forEach(d => {
            console.log("d in if " + d);

            if (d.Year == aYear) {
                d.cases = +d.cases;
                d.Deaths = +d.Deaths;
                if (maxval <= ((d.Deaths * 100) / d.cases)) {
                    maxval = ((d.Deaths * 100) / d.cases);
                    maxdot = d;
                }
                filteredData.push(d);
            } else delete(d);

        });
        covidData.year = aYear;



        var XScale = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.cases)])
            .range([0, width - margin.right]);

        var xaxis = d3
            .axisBottom()
            .scale(XScale);

        scene2svg.append("g")
            .call(xaxis).attr("transform", "translate(" + 80 + "," + 550 + ")");
        // console.log([0, d3.max(filteredData, d => d.Deaths)]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.Deaths)])
            .range([height, 0]);

        var yAxis = d3.axisLeft().scale(yScale);

        scene2svg.append("g")
            .call(yAxis).attr("transform", "translate(" + 80 + "," + margin.top + ")");





        scene2svg.append('g')
            .selectAll("dot")
            .data(filteredData)
            .enter()
            .append("circle").attr("transform", "translate(" + 80 + "," + margin.top + ")")
            .attr("cx", function(d) { return XScale(d.cases); })
            .attr("cy", function(d) { return yScale(d.Deaths); })
            .attr("r", function(d) { return 2 + ((d.Deaths * 100) / (d.cases)); })
            .style("fill", "red")
            .on("mouseover", function(d) {
                Tooltip2
                    .style("opacity", 0)
                    .text("State:" + d.state + "\nCases:" + d.cases + "\nDeaths:" + d.Deaths + "\nYear:" + d.Year)
                    .attr("class", "tooltip")
                    .attr("width", "100 px")
                    .attr("height", "100px")
                    .style("position", "absolute")
                    .style("background-color", "white")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mousemove", function(d) {
                Tooltip2
                    .style("opacity", 1)
                d3.select(this).transition()
                    .style("opacity", 1);

            })
            .on("mouseleave", function(d) {
                Tooltip2
                    .style("opacity", 0)
                d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
            });


        scene2svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 70)
            .attr("x", -margin.top - height / 2 + 20)
            .text("Deaths");

        scene2svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width / 2 + margin.left)
            .attr("y", height + margin.top + 30)
            .text("Cases");


        var Tooltip2 = d3.select("#scene2")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        //console.log("maxdot" + maxdot);
        let DV_Annotation_1 = [{
                note: {
                    label: "",
                    title: annText
                },
                subject: {
                    width: 50,
                    height: 50
                },
                x: 100,
                y: 300,
                dy: -150,
                dx: 100
            }]
            // Add annotation to the chart
        let DV_Annotation_const_1 = d3.annotation()
            .annotations(DV_Annotation_1)
        scene2svg
            .append("g").attr("transform", "translate(" + 80 + "," + -40 + ")")

        .call(DV_Annotation_const_1)



    });
}
//update("2020");
