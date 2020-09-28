d3.csv('cities.csv', d=> {
	return {
	  ...d, // spread operator
	  eu: d.eu==='true', // convert to boolean
	  population: +d.population,
	  x: +d.x,
	  y: +d.y,
	}
  }).then(data=>{
	  Data = data
	  console.log('cities', data);
	  Data = Data.filter(Data => Data.eu == true)
	  console.log(Data.length)
	  d3.select('.city-count').text(Data.length)
	  const width = 700;
	  const height = 550;
	  const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
		.attr('height', height)
	  svg.selectAll('div')
		.data(Data)
		.enter()
		.append('circle')
		.attr('cx', (d,i)=>d.x)
		.attr('cy', (d,i)=>d.y)
		.attr('fill', 'pink')
		.attr('r', function(d) {
			if (d.population < 1000000) {
				return 4 }
			else {
				return 8
			}
		})
		svg.selectAll('div')
		.data(Data)
		.enter()
		.append('text')
		.attr('dx', (d,i)=>d.x)
		.attr('dy', (d,i)=>d.y)
		.attr('font-size', 11)
		.attr('opacity', function(d){
			if (d.population < 1000000){
				return 0
			} else {
				return 1
			}
		})
		.attr('text-anchor', 'middle')
		.text(function(d){
			return d.city
		})
})
  

d3.csv('buildings.csv', d=> {
	return {
	  ...d, // spread operator
	  completed: +d.completed,
	  floors: +d.floors,
	  height_m: +d.height_m,
	  height_ft: +d.height_ft,
	  height_px: +d.height_px
	}
  }).then(data=>{
	  buildings = data
	  console.log('buildings', data)
	  buildings.sort(function (a, b) {
		return b.height_ft - a.height_ft;
	  });
	  const width = 500
	  const height = 500
	  const svg = d3.select('.heights')
		.append('svg')
    	.attr('width', width)
		.attr('height', height)
	  svg.selectAll('.heights')
		.data(buildings)
		.enter()
		.append('rect')
		.attr('class', '.bar')
		.attr('width', function(d){
			return d.height_px
		})
		.attr('height', 30)
		.attr('x', 150)
		.attr('y', (d,i)=>(i+1)*40)
		.attr('fill', "lightblue")
		.on("click", function(d) {
			console.log("CLICK")
			//change image
			let data = d.path[0].__data__;
			d3.select('.image')
				.attr("src", (d,i) => "/img/" + data.image);
			//change building text
			d3.select(".name")
				.text(d=>data.building)
			//change height text 
			d3.select('.height')
				.text(d=>data.height_ft);
			//change city text
			d3.select('.city')
				.text(d=>data.city);
			d3.select('.country')
				.text(d=>data.country);
			d3.select('.floors')
				.text(d=>data.floors);
			d3.select('.completed')
				.text(d=>data.completed);

		})
		.on('mouseover', function (d, i) {
			d3.select(this).transition()
				 .duration('50')
				 .attr('opacity', '.5');
		})
	   .on('mouseout', function (d, i) {
			d3.select(this).transition()
				 .duration('50')
				 .attr('opacity', '1');
	   })

	  svg.selectAll('.heights')
		.data(buildings)
		.enter()
		.append('text')
		.text(function(d)
		{
			return d.building
		})
		.attr('dx', 0)
		.attr('dy', (d,i)=>(i+1)*43)
		.attr('font-size', 10)
	  svg.selectAll('.heights')
		.data(buildings)
		.enter()
		.append('text')
		.text(function(d)
		{
			return d.height_ft + " ft"
		})
		.attr('dx', (d,i)=>150 + d.height_px)
		.attr('dy', (d,i)=>(i+1)*40+15)
		.attr('font-size', 10)
		//.attr('text-anchor', 'end')
  })
