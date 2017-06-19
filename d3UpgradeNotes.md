
### Upgrades to website to upgrade from D3 v3.0 to v4.0

Changed Source file to v4.0 
 <script src="https://d3js.org/d3.v4.js"></script>   

When changing multiple attributes, we now use the independent library d3-selection-multi.js
<script src="https://d3js.org/d3-selection-multi.v0.4.min.js"></script>


### ATTRIBUTES 

v3.0  svg.attr({

v4.0  svg.attrs({

### SCALES

v3.0    var xScale = d3.scale.linear()

v4.0    var xScale = d3.scaleLinear()



v3.0 var colorScale = d3.scale.ordinal()

v4.0 var colorScale = d3.scaleOrdinal()



v3.0 var yScale = d3.scale.ordinal()
            .rangeRoundBands([0, height], .1);
v4.0 var yScale = d3.scaleBand()


### AXIS

v3.0 var xAxis = d3.svg.axis();

v4.0 var xAxis = d3.axisBottom();

* In place of d3.svg.axis and axis.orient, D3 4.0 provides four constructors for each orientation: d3.axisTop, d3.axisRight, d3.axisBottom, d3.axisLeft.  Which obliterates the need for the command xAxis.orient("bottom");



v3.0  var yScale = d3.scale.ordinal()
       .rangeRoundBands([0, height], .1);

v4.0  var yScale = d3.scaleBand()
            .range([0, height], .1);


v3.0   .attr("dy", yScale.rangeBand() / 2)

v4.0   .attr("dy", yScale.step() / 2)


* adjusted size of bars to step()/1.2 since the height provided by step() provided no gap between the bars. 

v3.0      .attr("height", yScale.rangeBand())

v4.0      .attr("height", yScale.step()/1.2)