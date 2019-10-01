class ScatterPlot {
    constructor(height, width, plot, data, xColumn, yColumn) {
        this.plot = plot;
        this.height = height;
        this.width = width;
        this.data = data.map(d => ({
            x: d[xColumn],
            y: d[yColumn]
        }));
        this.draw();
    }

    draw() {
        this.xScale = d3
            .scaleLinear()
            .domain([d3.min(this.data, d => d.x), d3.max(this.data, d => d.x)])
            .range([0, this.width]);
        this.yScale = d3
            .scaleLinear()
            .domain([d3.min(this.data, d => d.y), d3.max(this.data, d => d.y)])
            .range([this.height, 0]);

        const xAxisGen = d3.axisBottom(this.xScale);
        const yAxisGen = d3.axisLeft(this.yScale);

        const xAxis = this.plot
            .append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${this.height})`);
        const yAxis = this.plot.append("g").classed("y-axis", true);

        xAxis.call(xAxisGen);
        yAxis.call(yAxisGen);

        const marksGroup = this.plot.append("g");
        this.marks = marksGroup
            .selectAll(".regular")
            .data(this.data)
            .join("circle")
            .classed("regular", true)
            .attr("cx", d => this.xScale(d.x))
            .attr("cy", d => this.yScale(d.y))
            .attr("r", 3);

        this.marks.append("title").text((_, i) => i);
    }

    update(selectedPoints) {
        this.marks.classed("highlight", false);
        if (selectedPoints.length > 0) {
            this.marks
                .filter((_, i) => selectedPoints.includes(i))
                .classed("highlight", true);
        }
    }
}
