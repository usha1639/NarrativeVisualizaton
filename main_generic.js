// var states = new Set();
// var covidData = new Object();
// const cases = new Map();
// let deaths = new Map();
// var margin = { top: 10, right: 0, bottom: 50, left: 100 },
//     width = 1000 - margin.left - margin.right,
//     height = 600 - margin.top - margin.bottom;
// myDeathsData = [];
// myCasesdata = [];
// var caseMax = 0;
// var deathMax = 0;

// // async function init() {
// //     loadData();
// // }

// function loadData() {
//     myDeathsData = [];
//     myCasesdata = [];
//     caseMax = 0;
//     deathMax = 0;
//     let a = 5;
//     let b = a;
//     a = 6;
//     console.log(a + " " + b);
//     d3.csv("us-states.csv", function(data) {
//         console.log("csv read ");
//         prevCase = 0;
//         prevDeaths = 0;
//         var temp;
//         data.forEach(d => {
//             d.cases = parseInt(d.cases);
//             d.deaths = parseInt(d.deaths);
//             // console.log(d);
//             let temp = d;
//             // console.log("caseMax " + temp);
//             if (prevCase < parseInt(d.cases)) {
//                 prevCase = d.cases;
//                 // caseMax = d;
//                 //caseMax.count = d.cases;
//             }
//             if (prevDeaths < d.deaths) {
//                 prevDeaths = d.deaths;
//                 deathMax = d;
//                 deathMax.count = d.deaths
//             }


//         });

//         //  console.log("deathMax " + deathMax);
//         covidData.year = getValue('year');
//         covidData.catagory = getValue('catagory');
//         // console.log(covidData.catagory)

//         data.filter(function(d) {
//             states.add(String(d.state));
//         });

//         states.forEach(function(ele) {

//             cases.set(String(ele), 0);
//             deaths.set(String(ele), 0);

//         });
//         data.filter(function(d) {
//             if (String(d.date.split("-")[0]) == covidData.year) {
//                 cases.set(d.state, cases.get(d.state) + parseInt(d.cases));
//                 deaths.set(d.state, deaths.get(d.state) + parseInt(d.deaths));
//             }
//         });

//         cases.forEach(function(value, key) {
//             var obj = {};
//             obj['state'] = key;
//             obj['count'] = value;

//             myCasesdata.push(obj);
//         });

//         deaths.forEach(function(value, key) {
//             var obj = {};
//             obj['state'] = key;
//             obj['count'] = value;

//             myDeathsData.push(obj);
//         });
//         // console.log(covidData.catagory);
//         if (covidData.catagory == 'cases') {
//             console.log("cases selected")
//             loadChart(myCasesdata, covidData.year, 'red', caseMax);
//         } else {
//             loadChart(myDeathsData, covidData.year, 'grey', deathMax);

//         }

//         var Tooltip = d3.select("#scene1")
//             .append("div")
//             .style("opacity", 0)
//             .attr("class", "tooltip")
//             .style("background-color", "white")
//             .style("border", "solid")
//             .style("border-width", "2px")
//             .style("border-radius", "5px")
//             .style("padding", "5px");


//         var mousemove = function(d) {
//             Tooltip
//                 .style("opacity", 1)
//             d3.select(this).transition
//                 .style("stroke", "black")
//                 .style("opacity", 1)
//         }
//         var mouseover = function(d) {
//             Tooltip
//                 .text("State:" + d.state + "Count" + d.Count + "year" + covidData.year)
//                 .style("left", (d3.mouse(this)[1]) + "px")
//                 .style("top", (d3.mouse(this)[0]) + "px")
//         }

//         var mouseleave = function(d) {
//             Tooltip
//                 .style("opacity", 0)
//             d3.select(this)
//                 .style("stroke", "none")
//                 .style("opacity", 0.8)
//         }
//         const annotations = [{
//             note: {
//                 label: dMax.state + " recorded maximum cases " + dMax.Count,
//                 title: "worst hit state",
//                 align: "left", // try right or left
//                 wrap: 200, // try something smaller to see text split in several lines
//                 padding: 10 // More = text lower
//             },
//             color: ["black"],
//             x: xScaleLabels(dMax),
//             y: yscaleLabels(dMax),
//             dy: 10,
//             dx: 100

//         }];
//         const makeAnnotations = d3.annotation()
//             .annotations(annotations);

//         d3.select("#scene1").select('svg')
//             .append("g")
//             .call(makeAnnotations);

//     });



// }

// function loadChart(data, year, colorCode, dMax) {

//     d3.select("#scene1")
//         .select("svg").remove();
//     var svg = d3.select("#scene1")
//         .append("svg");
//     svg.attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




//     var xScaleLabels = d3
//         .scaleBand()
//         .domain(data.map(d => d.state))
//         .range([0, width]);
//     var xaxis = d3
//         .axisBottom()
//         .scale(xScaleLabels)
//         .ticks(data.length).tickFormat(d => d.slice(0, 2));

//     var Tooltip = d3.select("#scene1")
//         .append("div")
//         .style("opacity", 0)
//         .attr("class", "tooltip")
//         .style("background-color", "white")
//         .style("border", "solid")
//         .style("border-width", "2px")
//         .style("border-radius", "5px")
//         .style("padding", "5px");

//     svg.append("g")
//         .call(xaxis)
//         .attr("transform", "translate(" + margin.left + "," + 550 + ")");

//     console.log(d3.max(data, d => d.count));

//     var yscaleLabels = d3.scaleLinear()
//         .domain([d3.max(data, d => d.count), 0])
//         .range([height, 0]);
//     svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//         .call(d3.axisLeft(yscaleLabels));

//     svg.selectAll('rect').data(data)
//         .enter()
//         .append('rect')
//         .attr('x', d => xScaleLabels(d.state))
//         .attr('y', d => height - yscaleLabels(d.count))
//         .attr('width', xScaleLabels.bandwidth())
//         .attr('height', function(d, i) { return yscaleLabels(d.count) }).attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//         .attr('fill', colorCode)
//         .on("mouseover", mouseover)
//         .on("mousemove", mousemove)
//         .on("mouseout", mouseleave);




//     var mousemove = function(d) {
//         console.log("inside mousemove");

//         Tooltip
//             .style("opacity", 1)
//         d3.select(this).transition().duration(200)
//             .style("stroke", "black")
//             .style("opacity", 1)
//     }
//     var mouseover = function(d) {
//         console.log("inside mouseover");
//         Tooltip.transition()
//             .duration(200)
//             .text("State:" + d.state + "Count" + d.Count + "year" + covidData.year)
//             .style("left", (d3.mouse(this)[1]) + "px")
//             .style("top", (d3.mouse(this)[0]) + "px")
//     }

//     var mouseleave = function(d) {
//         Tooltip
//             .style("opacity", 0)
//         d3.select(this).tooltip.transition()
//             .duration(500)
//             .style("opacity", 0)
//             .style("stroke", "none");

//     }

//     var text = "With " + dMax.count + " cases " + dMax.state + " is the state with heighest numbers";
//     console.log(text)
//     svg.append("text")
//         .attr("text-anchor", "end")
//         .attr("transform", "rotate(-90)")
//         .attr("y", -margin.left + 130)
//         .attr("x", -margin.top - height / 2 + 20)
//         .text(getValue("catagory"));

//     svg.append("text")
//         .attr("text-anchor", "end")
//         .attr("x", width / 2 + margin.left)
//         .attr("y", height + margin.top + 30)
//         .text("States");


// }

// function getValue(id) {
//     var select = document.getElementById(id);
//     return select.options[select.selectedIndex].value;

// }

var states = new Set();
var covidData = new Object();
const cases = new Map();
let deaths = new Map();
var margin = { top: 10, right: 0, bottom: 50, left: 100 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
let myDeathsData = [];
let mycasedata = [];
var caseMax = 0;
var deathMax = 0;

function loadData() {

    console.log("init hit");
    d3.csv('data/usStatesCasesDeaths.csv', function(data) {
        // console.log(data);
        mycasedata = [];
        myDeathsData = [];
        let prevCaseMax = 0;
        let prevDeathMax = 0;
        data.forEach(d => {
            if (d.year == getValue('year')) {
                let caseobj = {};
                caseobj.count = parseInt(d.cases);
                caseobj.state = d.state;
                if (prevCaseMax < caseobj.count) {
                    prevCaseMax = caseobj.count;
                    caseMax = caseobj;
                }
                let deathObj = {};
                deathObj.count = parseInt(d.deaths);
                deathObj.state = d.state;
                if (prevDeathMax < deathObj.count) {
                    prevDeathMax = deathObj.count;
                    deathMax = deathObj;

                }

                mycasedata.push(caseobj);
                myDeathsData.push(deathObj);


            }
        });
        console.log(mycasedata);
        console.log(myDeathsData);


        d3.select("#scene1")
            .select("svg").remove();
        var svg = d3.select("#scene1")
            .append("svg");
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




        var xScaleLabels = d3
            .scaleBand()
            .domain(data.map(d => d.state))
            .range([0, width]);
        var xaxis = d3
            .axisBottom()
            .scale(xScaleLabels)
            .ticks(data.length).tickFormat(d => d.slice(0, 2));
        var yscaleLabels = d3.scaleLinear()
            .domain([d3.max(data, d => d.cases), 0])
            .range([height, 0]);

        covidData.year = getValue('year');
        covidData.catagory = getValue('catagory');



        if (covidData.catagory == 'cases') {
            console.log("cases selected")
            loadChart(mycasedata, covidData.year, 'red', caseMax);
        } else {
            loadChart(myDeathsData, covidData.year, 'grey', deathMax);

        }


        //     var Tooltip = d3.select("#scene1")
        //         .append("div")
        //         .style("opacity", 0)
        //         .attr("class", "tooltip")
        //         .style("background-color", "white")
        //         .style("border", "solid")
        //         .style("border-width", "2px")
        //         .style("border-radius", "5px")
        //         .style("padding", "5px");


        //     var mousemove = function(d) {
        //         Tooltip
        //             .style("opacity", 1)
        //         d3.select(this).transition
        //             .style("stroke", "black")
        //             .style("opacity", 1)
        //     }
        //     var mouseover = function(d) {
        //         Tooltip
        //             .text("State:" + d.state + "Count" + d.Count + "year" + covidData.year)
        //             .style("left", (d3.mouse(this)[1]) + "px")
        //             .style("top", (d3.mouse(this)[0]) + "px")
        //     }

        //     var mouseleave = function(d) {
        //         Tooltip
        //             .style("opacity", 0)
        //         d3.select(this)
        //             .style("stroke", "none")
        //             .style("opacity", 0.8)
        //     }
        //     const annotations = [{
        //         note: {
        //             label: dMax.state + " recorded maximum cases " + dMax.Count,
        //             title: "worst hit state",
        //             align: "left", // try right or left
        //             wrap: 200, // try something smaller to see text split in several lines
        //             padding: 10 // More = text lower
        //         },
        //         color: ["black"],
        //         x: xScaleLabels(dMax.state),
        //         y: yscaleLabels(dMax.count),
        //         dy: 10,
        //         dx: 100

        //     }];
        //     const makeAnnotations = d3.annotation()
        //         .annotations(annotations);

        //     d3.select("#scene1").select('svg')
        //         .append("g")
        //         .call(makeAnnotations);

    });


}

function loadChart(data, year, colorCode, dMax) {

    d3.select("#scene1")
        .select("svg").remove();
    var svg = d3.select("#scene1")
        .append("svg");
    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




    var xScaleLabels = d3
        .scaleBand()
        .domain(data.map(d => d.state))
        .range([0, width]);
    var xaxis = d3
        .axisBottom()
        .scale(xScaleLabels)
        .ticks(data.length).tickFormat(d => d.slice(0, 2));

    var Tooltip = d3.select("#scene1")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    svg.append("g")
        .call(xaxis)
        .attr("transform", "translate(" + margin.left + "," + 550 + ")");

    //console.log(d3.max(data, d => d.count));

    var yscaleLabels = d3.scaleLinear()
        .domain([d3.max(data, d => d.count), 0])
        .range([height, 0]);
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(yscaleLabels));

    svg.selectAll('rect').data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScaleLabels(d.state))
        .attr('y', d => height - yscaleLabels(d.count))
        .attr('width', xScaleLabels.bandwidth())
        .attr('height', function(d, i) { return yscaleLabels(d.count) }).attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('fill', colorCode)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseleave);




    var mousemove = function(d) {
        // console.log("inside mousemove");

        Tooltip
            .style("opacity", 1)
        d3.select(this).transition().duration(200)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mouseover = function(d) {
        // console.log("inside mouseover");
        Tooltip.transition()
            .duration(200)
            .text("State:" + d.state + "Count" + d.Count + "year" + covidData.year)
            .style("left", (d3.mouse(this)[1]) + "px")
            .style("top", (d3.mouse(this)[0]) + "px")
    }

    var mouseleave = function(d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this).tooltip.transition()
            .duration(500)
            .style("opacity", 0)
            .style("stroke", "none");

    }

    var text = "With " + dMax.count + " cases " + dMax.state + " is the state with heighest numbers";
    console.log(text)
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 130)
        .attr("x", -margin.top - height / 2 + 20)
        .text(getValue("catagory"));

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top + 30)
        .text("States");

    const annotations = [{
        note: {
            label: text,
            title: "worst hit state",
            align: "left", // try right or left
            wrap: 200, // try something smaller to see text split in several lines
            padding: 10 // More = text lower
        },
        color: ["black"],
        x: xScaleLabels(dMax.state),
        y: yscaleLabels(dMax.count),
        dy: -30,
        dx: 100,
        type: d3.annotationCalloutElbow

    }]
    const makeAnnotations = d3.annotation()
        .annotations(annotations)
    d3.select("#scene1").select('svg')
        .append("g").attr("transform", "translate(" + margin.left + "," + -350 + ")")

    .call(makeAnnotations)
}

function getValue(id) {
    var select = document.getElementById(id);
    return select.options[select.selectedIndex].value;

}

function filterChanged(obj) {

    covidData.year = String(getValue('year'));
    covidData.catagory = getValue('catagory');
    loadData();
}

function sortdata() {
    console.log("Sort entered ");
    sortedarr = mycasedata.sort((a, b) => d3.descending(a.count, b.count));
    // d3.select("#scene1").select('svg')
    //   .selectAll("rect")
    // .sort((a, b) => d3.ascending(a.count, b.count))
    //.attr('x', d => xScaleLabels(d.state));
    color = "grey";
    if (getValue('catagory') == "cases") {
        color = "red";
    }
    loadChart(sortedarr, getValue('year'), color, sortedarr[0]);
    console.log(sortedarr);


}

var slideNo = 1;
DisplaySlide(slideNo);

function AdvanceSlide(n) {
    DisplaySlide(slideNo += n);
}

function DisplaySlide(n) {
    var i;
    var x = document.getElementsByClassName("step");
    if (n > x.length) {
        slideNo = 1
    }
    if (n < 1) {
        slideNo = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideNo - 1].style.display = "block";
}


function filterChanged(obj) {

    covidData.year = String(getValue('year'));
    covidData.catagory = getValue('catagory');
    loadData();
}

// function sortdata() {
//     console.log("Sort entered ");
//     sortedarr = myCasesdata.sort((a, b) => d3.descending(a.count, b.count));
//     // d3.select("#scene1").select('svg')
//     //   .selectAll("rect")
//     // .sort((a, b) => d3.ascending(a.count, b.count))
//     //.attr('x', d => xScaleLabels(d.state));
//     color = "grey";
//     if (getValue('catagory') == "cases") {
//         color = "red";
//     }
//     loadChart(sortedarr, getValue('year'), color, sortedarr[0]);
//     console.log(sortedarr);


// }
/***
 * Scene 2 logics 
 */