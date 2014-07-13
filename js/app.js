/* jshint asi:true */
$(function() {

  var animating = true;

  $('.block-link').on('click', function() {
    console.log('block link clicked');

    if(animating) {
      $(this).addClass('open')
        .parent().addClass('pause-animation');
      animating = false;
    } else {
      $('.block-link.open').removeClass('open');
      $(this).parent().removeClass('pause-animation');
      animating = true;
    }

    return false;
  });

  /* tesselation background */
  var width = 960,
      height = 600;

  var vertices = d3.range(100).map(function(d) {
    return [Math.random() * width, Math.random() * height];
  });

  var voronoi = d3.geom.voronoi()
      //.clipExtent([[0, 0], [width, height]]);

  var svg = d3.select(".site-background").append("svg")
      .attr("width", width)
      .attr("height", height);
      //.on("mousemove", function() { vertices[0] = d3.mouse(this); redraw(); });

  var waiting = false;
  d3.select(window).on('resize', function() {
    if(waiting) { return; }
    waiting = true;
    setTimeout(function() {
      waiting = false;
      redraw();
    }, 500);
  });

  var path = svg.append("g").selectAll("path");

  redraw();

  function redraw() {
    console.log('drawing');

    var shift = (window.innerWidth - width) / 2;

    path = path
        .data(voronoi(vertices), polygon);

    path.exit().remove();

    path.enter().append("path")
        .attr("transform", function(d) {
          return "translate(" + shift + ", 0)";
        })
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
        var x = d[0] + shift;
        var y = d[1];
        return "translate(" + [x, y] + ")";
      })
      .attr("r", 1.5);
  }
});
