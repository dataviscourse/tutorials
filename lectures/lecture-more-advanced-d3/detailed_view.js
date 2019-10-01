class DetailedView {
  constructor(svgHeight, svgWidth, svg, data) {
    this.margin = {
      top: 430,
      right: 20,
      bottom: 30,
      left: 40
    };
    this.data = data;

    const zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [this.width, this.height]])
      .extent([[0, 0], [this.width, this.height]])
      .on("zoom", d => {});

    this.width = svgWidth - this.margin.left - this.margin.right;
    this.height = svgHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(data, d => d.data));

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(data, d => d.price)]);

    this.plot = svg
      .append("g")
      .classed("detail", true)
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    this.draw();
  }

  draw() {}

  update() {}
}
