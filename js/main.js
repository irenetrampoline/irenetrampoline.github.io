

var width = 650,
    height = 380;


var projection = d3.geo.kavrayskiy7()
  .scale(100)
    .translate([width / 2, height / 2 - 35]);
  

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map-container").append("svg")
    .attr("width", width)
    // cut off Antartica
    .attr("height", height - 125);

var g = svg.append("g");

g.append( "rect" )
  .attr("width",width * 0.7)
  .attr("height",height * 0.7)
  .attr("fill","white")
  .attr("opacity",0)
  .on("mouseover",function(){
    hoverData = null;
    if ( probe ) probe.style("display","none");
  })

var map = g.append("g")
    .attr("id","map");

var probe,
    hoverData;

var dateScale, sliderScale, slider;

var format = d3.format(",");

var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    months_full = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    orderedColumns = [],
    currentFrame = 0,
    interval,
    frameLength = 300,
    isPlaying = false;

var sliderMargin = 65;

function circleSize(d){
  return Math.sqrt( .02 * Math.abs(d) );
};

var color = d3.scale.category10()

d3.json("json/world-topo-min.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features,
      neighbors = topojson.neighbors(world.objects.countries.geometries);

  // draw countries
  map.selectAll("path")
      .data(countries)
      .enter()
      .append("path")
      .attr("vector-effect","non-scaling-stroke")
      .attr("class","land")
      .attr("d", path)
      .attr("id", function(d,i) { return d.properties.name});
      // .style("fill", function(d,i) { return d.properties.color});

    probe = d3.select("#map-container").append("div")
    .attr("id","probe");

    // not sure what's going on here
    // d3.select("body")
    // .append("div")
    // .attr("id","loader")
    // .style("top",d3.select("#play").node().offsetTop + "px")
    // .style("height",d3.select("#date").node().offsetHeight + d3.select("#map-container").node().offsetHeight + "px")

    d3.csv("csv/d3_hours_worked_norm.csv",function(data){
      var first = data[0];
      // get columns
      // orderedColumns = ["Dec-14", "Jan-15", "Feb-15", "Mar-15", "Apr-15", "May-15",
      //  "Jun-15","Jul-15","Aug-15","Sep-15","Oct-15","Nov-15"];
      for ( var mug in first ){
        if ( mug != "country" ){
          orderedColumns.push(mug);
        } 
      }

      // orderedColumns.sort(sortColumns);

    percentage_obj = new Object()
    for (var i in data) {
      country = data[i].country;
      percentage_obj[country] = data[i];
    };

    // // add data to each country node

    var allCountries = map.selectAll("path.land")
      .datum(function (d) {
        country_name = d.properties.name; 
        if (country_name in percentage_obj) {
          return percentage_obj[country_name]
        }
      });

    // extraneous probe stuff
    map.selectAll("path.land")
      // .attr("vector-effect","non-scaling-stroke")
      .on("mousemove",function(d){
          if (typeof d !== "undefined") {
            hoverData = d;
            setProbeContent(d);
            probe
              .style( {
                "display" : "block",
                "top" : (d3.event.pageY - 80) + "px",
                "left" : (d3.event.pageX + 10) + "px"
              })
          }
          
        })
      .on("mouseout",function(){
          if (typeof d !== "undefined") {
            hoverData = null;
          probe.style("display","none");  
          }
          
        })
    // createLegend();

    dateScale = createDateScale(orderedColumns).range([0,400]);

    createSlider();

    drawMonth( orderedColumns[currentFrame], false ); // initial map
  
  });
});


function convertToColor(a) {
  x = (a - 2) / 7;
  r = Math.round(255 - Math.min((x * 255), 255));
  g = Math.round(255 - Math.min((x * 129), 255));
  b = Math.round(224 - Math.min((x * 26), 255));
 
  return "rgb(" + r + 
    "," + g + "," + 
    b + ")";

}

function drawMonth(m,tween){
  // console.log(m);
  var country = map.selectAll("path.land")
  if ( tween ){
    country
      .transition()
      .ease("linear")
      .duration(frameLength)
      .style("fill",function(d){
        if (typeof d !== "undefined") {
          
        new_color = convertToColor(d[m]);
        return new_color;
      }
    });
  } else {
    country.style("fill",function(d){
        if (typeof d !== "undefined") {
        new_color = convertToColor(d[m]);
        return new_color
      }
    })
  }
    //   function(d){
    //   // console.log(isNaN(d));
    //   // console.log(d[m]);
    //   if (typeof d !== "undefined") {
    //     new_color = convertToColor(d[m],d[m],d[m]);
    //     console.log("hello!");
    //     return new_color;
    //   }
      
    // });
  

  d3.select("#date p#month").html( monthLabel(m) );

  // if (hoverData){
  //   setProbeContent(hoverData);
  // }
}

function createSlider(){

  sliderScale = d3.scale.linear().domain([0,orderedColumns.length-1]);

  var val = slider ? slider.value() : 0;

  slider = d3.slider()
    .scale( sliderScale )
    .on("slide",function(event,value){
      if ( isPlaying ){
        clearInterval(interval);
      }
      currentFrame = value;
      drawMonth( orderedColumns[value], d3.event.type != "drag" );
    })
    .on("slideend",function(){
      if ( isPlaying ) animate();
      d3.select("#slider-div").on("mousemove",sliderProbe)
    })
    .on("slidestart",function(){
      d3.select("#slider-div").on("mousemove",null)
    })
    .value(val);

  d3.select("#slider-div").remove();

  d3.select("#slider-container")
    .append("div")
    .attr("id","slider-div")
    .style("width",dateScale.range()[1] + "px")
    .on("mousemove",sliderProbe)
    .on("mouseout",function(){
      d3.select("#slider-probe").style("display","none");
    })
    .call( slider );

  d3.select("#slider-div a").on("mousemove",function(){
    d3.event.stopPropagation();
  })

  var sliderAxis = d3.svg.axis()
    .scale( dateScale )
    .tickFormat(function(d, i){
      // abbreviated year for most, full month/year for the ends
      if ( d.getMonth() == 0 || i == 0 || i == orderedColumns.length-1) {
        return months[d.getMonth()] + " '" + d.getFullYear().toString().substr(2)
      }
      return months[d.getMonth()];
    })
    .tickSize(10)

  d3.select("#axis").remove();

  d3.select("#slider-container")
    .append("svg")
    .attr("id","axis")
    .attr("width",dateScale.range()[1] + sliderMargin*2)
    .attr("height",25)
    .append("g")
      .attr("transform","translate(" + (sliderMargin+1) + ",0)")
      .call(sliderAxis);

  d3.select("#axis > g g:first-child text").attr("text-anchor","end").style("text-anchor","end");
  d3.select("#axis > g g:last-of-type text").attr("text-anchor","start").style("text-anchor","start");
}

function setProbeContent(d){
  if (typeof d !== "undefined") {
      var html = "<strong>" + d.country + "</strong>";
  probe
    .html( html );
  }

}

function sliderProbe(){
  var d = dateScale.invert( ( d3.mouse(this)[0] ) );
  d3.select("#slider-probe")
    .style( "left", d3.mouse(this)[0] + sliderMargin + "px" )
    .style("display","block")
    .select("p")
    .html( months[d.getMonth()] + " " + (parseInt(d.getFullYear()))  )
}

function sortColumns(a,b){
  var dateA = a.split("-"),
      dateB = b.split("-");

  // turn year+month into a sortable number
  return ( 
    (parseInt(dateA[0]) - 2000) * 10000 + (parseInt(dateA[1]) * 100) +  (parseInt(dateA[2])) 
  - (parseInt(dateB[0]) - 2000) * 10000 + (parseInt(dateB[1]) * 100) +  (parseInt(dateB[2])) 
  ) 
}

function createDateScale( columns ){
  var start = getMonthYear( columns[0] ),
      end = getMonthYear( columns[ columns.length-1 ] );
  console.log(end);
  return d3.time.scale()
    .domain( [ new Date(start), 
      new Date(end)])
}

// modifed to produce YYYY, MM, DD
function getMonthYear(column){
  var m_y = column.split("-");
  return [ m_y[0], m_y[1], m_y[2]];
}

function monthLabel( m ){
  var m_y = getMonthYear(m);
  
  return "<span>" + months[(Math.round(m_y[1]) - 1) % 12] + "</span> " + m_y[2]
}