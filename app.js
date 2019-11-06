// set the dimensions and margins of the graph
const margin = 60;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

// set the ranges
const x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
const y = d3.scaleLinear()
              .range([height, 0]);


let svg = d3.select("body").append("svg")
    .attr("width", width + margin + margin)
    .attr("height", height + margin + margin)
  .append("g")
    .attr("transform",
          "translate(" + margin + "," + margin + ")");

function getData(category){ 
  d3.csv("data.csv").then(function(data) {
  let newData = d3.nest()
      .key(function(d){
        let result = ''
        switch(category){
            case 'category':
                result = d.category
            break;
            case 'month':
                // to get the month/year format from date, we need to do some extra formatting
                // could do this once and have a new data source, doing it every time month is selected isn't very efficient
                d.date = moment(d.date).format("MM-YY")
                result = d.date
            break;
            case 'courseID':
                result = d.course_id
            break;
            case 'studentID':
                result = d.course_id
            break;
            case 'schoolID':
                result = d.course_id
            break;
        }
        return result;
      })
      .rollup(function(v){
        return d3.mean(v, function(d) {
           let dollarPrice = (d.price*0.01)
           return dollarPrice;
        }).toFixed(2);
      })
      .entries(data)
  update(newData, category);
})}

function update(newData, category){

  x.domain(newData.map((d)=>{ return d.key; }));
  y.domain([0, d3.max(newData, function(d) { return d.value; })]);
  
  //reset everything
  svg.selectAll("rect").remove()
  svg.selectAll("text").remove()
  svg.selectAll("line").remove()

  //put new info
  svg.selectAll()
    .data(newData)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.key))
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => height - y(d.value))
    .attr('width', x.bandwidth())

      //add horizontal bars
      svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft()
          .scale(y)
          .tickSize(-width, 0, 0)
          .tickFormat(''))

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + 40) + ")")
      .style("text-anchor", "middle")
      .text(category.toUpperCase());

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("MEAN COURSE PRICE");    
};