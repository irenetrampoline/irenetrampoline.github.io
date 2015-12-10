

var width = 960,
    height = 600;


var projection = d3.geo.kavrayskiy7();
  

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map-container").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

g.append( "rect" )
  .attr("width",width)
  .attr("height",height)
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

// var basic = new Datamap({
//   element: document.getElementById("map")
// });


// WORKING WORLD MAP
// var projection = d3.geo.equirectangular();
    // .scale(150);

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

    d3.csv("csv/d3_hours_worked.csv",function(data){
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

    dateScale = createDateScale(orderedColumns).range([0,500]);

    createSlider();

    d3.select("#play")
      .attr("title","Play animation")
      .on("click",function(){
        if ( !isPlaying ){
          isPlaying = true;
          d3.select(this).classed("pause",true).attr("title","Pause animation");
          animate();
        } else {
          isPlaying = false;
          d3.select(this).classed("pause",false).attr("title","Play animation");
          clearInterval( interval );
        }
      });
    drawMonth( orderedColumns[currentFrame], false ); // initial map
    // window.onresize = resize;
    // resize();

    // d3.select("#loader").remove();
  
  });
});


// OLD WORKING CODE
// d3.json("json/world-topo-min.json", function(error, us) {
//   map.selectAll("path")
//       .data(topojson.feature(us, us.objects.states).features)
//       .enter()
//       .append("path")
//       .attr("vector-effect","non-scaling-stroke")
//       .attr("class","land")
//       .attr("d", path);

//    map.append("path")
//        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//        .attr("class", "state-boundary")
//        .attr("vector-effect","non-scaling-stroke")
//        .attr("d", path);

//   probe = d3.select("#map-container").append("div")
//     .attr("id","probe");

//   d3.select("body")
//     .append("div")
//     .attr("id","loader")
//     .style("top",d3.select("#play").node().offsetTop + "px")
//     .style("height",d3.select("#date").node().offsetHeight + d3.select("#map-container").node().offsetHeight + "px")

//   d3.csv("csv/jobs.csv",function(data){
//     var first = data[0];
//     // get columns
//     for ( var mug in first ){
//       if ( mug != "CITY" && mug != "LAT" && mug != "LON" ){
//         orderedColumns.push(mug);
//       }
//     }

//     orderedColumns.sort( sortColumns );

//     // draw city points 
//     for ( var i in data ){
//       var projected = projection([ parseFloat(data[i].LON), parseFloat(data[i].LAT) ])
//       map.append("circle")
//         .datum( data[i] )
//         .attr("cx",projected[0])
//         .attr("cy",projected[1])
//         .attr("r",1)
//         .attr("vector-effect","non-scaling-stroke")
//         .on("mousemove",function(d){
//           hoverData = d;
//           setProbeContent(d);
//           probe
//             .style( {
//               "display" : "block",
//               "top" : (d3.event.pageY - 80) + "px",
//               "left" : (d3.event.pageX + 10) + "px"
//             })
//         })
//         .on("mouseout",function(){
//           hoverData = null;
//           probe.style("display","none");
//         })
//     }

//     createLegend();

//     dateScale = createDateScale(orderedColumns).range([0,500]);
    
//     createSlider();

//     d3.select("#play")
//       .attr("title","Play animation")
//       .on("click",function(){
//         if ( !isPlaying ){
//           isPlaying = true;
//           d3.select(this).classed("pause",true).attr("title","Pause animation");
//           animate();
//         } else {
//           isPlaying = false;
//           d3.select(this).classed("pause",false).attr("title","Play animation");
//           clearInterval( interval );
//         }
//       });

//     drawMonth( orderedColumns[currentFrame] ); // initial map

//     window.onresize = resize;
//     resize();

//     d3.select("#loader").remove();

//   })

// });

function convertToColor(a) {
  // a = Math.min(x, 0.08);
  // b = x; // max around 0.45

  x = (a - 1.5) / 7;
  r = Math.round(255 - Math.min((x * 255), 255));
  g = Math.round(255 - Math.min((x * 129), 255));
  b = Math.round(224 - Math.min((x * 26), 255));
  
  // r = 0;
  // g = 136;
  // b = 231;

  return "rgb(" + r + 
    "," + g + "," + 
    b + ")";

// return "rgb(" + Math.random() * 255 + 
//     "," + Math.random() * 255 + "," + 
//     Math.random() * 255 + ")";
// }
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

function animate(){
  interval = setInterval( function(){
    currentFrame++;

    if ( currentFrame == orderedColumns.length ) currentFrame = 0;

    d3.select("#slider-div .d3-slider-handle")
      .style("left", 100*currentFrame/orderedColumns.length + "%" );
    slider.value(currentFrame)

    drawMonth( orderedColumns[ currentFrame ], true );

    if ( currentFrame == orderedColumns.length - 1 ){
      isPlaying = false;
      d3.select("#play").classed("pause",false).attr("title","Play animation");
      clearInterval( interval );
      return;
    }

  },frameLength);
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
    // .tickValues( dateScale.ticks(orderedColumns.length).filter(function(d,i){
    //   // ticks only for beginning of each year, plus first and last
      // return i == 0 || i == orderedColumns.length-1 
    // }))
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
    .attr("width",dateScale.range()[1] + sliderMargin*2 )
    .attr("height",25)
    .append("g")
      .attr("transform","translate(" + (sliderMargin+1) + ",0)")
      .call(sliderAxis);

  d3.select("#axis > g g:first-child text").attr("text-anchor","end").style("text-anchor","end");
  d3.select("#axis > g g:last-of-type text").attr("text-anchor","start").style("text-anchor","start");
}

function createLegend(){
  var legend = g.append("g").attr("id","legend").attr("transform","translate(560,10)");

  // legend.append("circle").attr("class","gain").attr("r",5).attr("cx",5).attr("cy",10)
  // legend.append("circle").attr("class","loss").attr("r",5).attr("cx",5).attr("cy",30)

  // legend.append("text").text("jobs gained").attr("x",15).attr("y",13);
  // legend.append("text").text("jobs lost").attr("x",15).attr("y",33);

  // var sizes = [ 10000, 100000, 250000 ];
  // for ( var i in sizes ){
  //   legend.append("circle")
  //     .attr( "r", circleSize( sizes[i] ) )
  //     .attr( "cx", 80 + circleSize( sizes[sizes.length-1] ) )
  //     .attr( "cy", 2 * circleSize( sizes[sizes.length-1] ) - circleSize( sizes[i] ) )
  //     .attr("vector-effect","non-scaling-stroke");
  //   legend.append("text")
  //     .text( (sizes[i] / 1000) + "K" + (i == sizes.length-1 ? " jobs" : "") )
  //     .attr( "text-anchor", "middle" )
  //     .attr( "x", 80 + circleSize( sizes[sizes.length-1] ) )
  //     .attr( "y", 2 * ( circleSize( sizes[sizes.length-1] ) - circleSize( sizes[i] ) ) + 5 )
  //     .attr( "dy", 13)
  // }

  // console.log(g);
  // var g = svg.select("g");
  // var legend = g.append("g").attr("id","legend").attr("transform","translate(560,10)");

  var svg = legend.append("svg")
    .attr("width", 500)
    .attr("height", 500)
  g = svg.append("g").attr("transform","translate(300,10)").classed("colorbar",true)
  cb = colorBar().color(d3.scale.linear().domain([-1, 1])
      .range(["rgb(255, 255, 255)", "#007ee5"]))
      .size(350).lineWidth(30).precision(4);

  g.call(cb);
}

function setProbeContent(d){
  if (typeof d !== "undefined") {
    // console.log(d.country);
      // var val = d[ orderedColumns[ currentFrame ] ],
      // m_y = getMonthYear( orderedColumns[ currentFrame ] ),
      // month = months_full[ months.indexOf(m_y[1]) ];
      // day = m_y[2]
      // var html = "";
      var html = "<strong>" + d.country + "</strong>";

  // console.log(html);

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

// function resize(){
//   var w = d3.select("#container").node().offsetWidth,
//       h = window.innerHeight - 80;
//   var scale = Math.max( 1, Math.min( w/width, h/height ) );
//   svg
//     .attr("width",width*scale)
//     .attr("height",height*scale);
//   g.attr("transform","scale(" + scale + "," + scale + ")");

//   d3.select("#map-container").style("width",width*scale + "px");

//   dateScale.range([0,500 + w-width]);
  
//   createSlider();
// }

function sortColumns(a,b){
  // [year, month, day]

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