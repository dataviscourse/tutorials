class ScatterPlotWithBrush {
    constructor(height, width, plot, data, xColumn, yColumn, updateOtherViews) {
        this.plot = plot;
        this.height = height;
        this.width = width;
        this.data = data.map(d => ({
            x: d[xColumn],
            y: d[yColumn]
        }));
        this.updateOtherViews = updateOtherViews;
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

        // Difference
        const brushGroup = this.plot.append("g").classed("brush", true);

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

        let instance = this;

        const xScale = this.xScale;
        const yScale = this.yScale;

        const brush = d3
            .brush()
            .extent([[-5, -5], [this.width + 5, this.height + 5]])
            .on("brush end", function () {
                const selection = d3.brushSelection(this);
                const selectedPoints = [];
                if (selection) {
                    const [[left, top], [right, bottom]] = selection;
                    instance.data.forEach((d, i) => {
                        if (
                            d.x >= xScale.invert(left) &&
                            d.x <= xScale.invert(right) &&
                            d.y <= yScale.invert(top) &&
                            d.y >= yScale.invert(bottom)
                        ) {
                            selectedPoints.push(i);
                        }
                    });
                }
                instance.update(selectedPoints);
            });
        brushGroup.call(brush);
    }

    update(selectedPoints) {
        this.marks.classed("highlight", false);
        this.updateOtherViews(selectedPoints);
        if (selectedPoints.length > 0) {
            this.marks
                .filter((_, i) => selectedPoints.includes(i))
                .classed("highlight", true);
        }
    }
}