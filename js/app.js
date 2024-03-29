/* jshint asi:true */
$(function() {

  $('.block-link').on('click', function() {
    return true;
  })

  // Decode email in form action to prevent scraping
  var action = atob($('form[encoded-action]').attr('encoded-action'));
  $('form[encoded-action]').attr('action', action);

  /* tesselation background */
  var width = 960,
      height = 600,
      shift = 0,
      vertices = [];

  var voronoi = d3.geom.voronoi();

  var svg = d3.select(".site-background").append("svg")
      .attr("width", width)
      .attr("height", height);

  var waiting = false;
  d3.select(window).on('resize', function() {
    if(waiting) { return; }
    waiting = true;
    setTimeout(function() {
      waiting = false;
      makeVertices();
      redraw();
    }, 500);
  });

  var path = svg.append("g").selectAll("path");

  makeVertices();
  redraw();

  function makeVertices() {
    shift = (window.innerWidth - width) / 2;
    vertices = d3.range(100).map(function(d) {
      return [Math.random() * width + shift, Math.random() * height];
    });
  }

  function redraw() {
    console.log('drawing background');

    path = path
        .data(voronoi(vertices), polygon);

    path.exit().remove();

    path.enter().append("path")
        .attr("class", polygonClass)
        .attr("d", polygon);

    path.order();
  }

  function polygonClass(d, i) { return "q" + (i % 9) + "-9"; }

  function polygon(d) { return "M" + d.join("L") + "Z"; }

  function drawPoints() {
    svg.selectAll("circle")
      .data(vertices.slice(1))
      .enter().append("circle")
      .attr("transform", function(d) {
        return "translate(" + d + ")";
      })
      .attr("r", 1.5);
  }
});
