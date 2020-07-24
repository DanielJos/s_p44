myData = [1,2,3,4,5,6];

xScale = d3.scaleBand().domain(myData.map((dataPoint)=> dataPoint.region)).rangeRound([0, 404]).padding(0.1);
yScale = d3.scaleLinear().domain([0, 10]).range([368, 0]).padding(0.1);

const container = d3.select("svg")
    .classed("container", true)
;
const bars = container
    .selectAll(".bar")
    .data(myData)
    .enter()        // get all of the missing elements compared to each data point
    .append("rect")
    .classed("bar", true)     // will append an element for each missing element previously speified
    .attr("width", xScale.bandwidth())
    .attr("height", data => yScale(data.value))
;