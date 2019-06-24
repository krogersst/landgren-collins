var treeData =
  {"name": "Sylvia Haney",
    "birth": "1936",
    "location": "Rockford, Illinois",
   "children": [
    {"name": "Erick Landgren",
     "birth": "1914",
     "location": "Rockford, Illinois",
    },
    {"name": "Roberta Collins",
     "birth": "1917",
     "location": "Rockford, Illinois",
     "children": [
       {"name": "Robert Collins",
        "birth": "1886",
        "location": "Edgerton, Rock, Wisconsin",
        "children": [
          {"name": "Frank Collins",
           "birth": "1859",
           "location": "Fulton, Rock, Wisconsin",
           "children": [
            {"name": "Milo Collins",
             "birth": "1836",
             "location": "New York"},
            {"name": "Rebecca Green",
             "birth": "1842",
             "location": "Allegany County, New York",
             "children": [
              {"name": "Edward Green",
               "birth": "1798",
               "location": "Jefferson County, New York",
               "children":[
                {"name": "Edward Greene",
                 "birth": "1760",
                 "location": "Westerly, Kings County, Rhode Island",
                 "children":[
                  {"name": "Joseph Greene",
                   "birth": "1725",
                   "location": "East Greenwich, Rhode Island",
                   "children":[
                    {"name":"John Greene",
                     "birth": "1688",
                     "location": "Quidnesset, North Kingstown, Rhode Island",
                     "children":[
                      {"name":"Benjamin Greene",
                       "birth": "1665",
                       "location": "Quidnesset, North Kingstown, Rhode Island",
                       "children":[
                        {"name":"John Greene",
                         "birth": "N/A",
                         "location": "N/A"},
                         {"name":"Joan",
                          "birth": "N/A",
                          "location": "N/A"}
                      ]},
                       {"name": "Humility Coggeshall",
                        "birth": "1671",
                        "location": "Portsmouth, Rhode Island",
                        "children": [
                          {"name": "Joshua Coggeshall",
                           "birth": "N/A",
                           "location": "N/A"},
                          {"name": "Joan West",
                           "birth": "N/A",
                           "location": "N/A"}
                        ]}
                    ]},
                    {"name":"Mary Alsworth",
                     "birth": "1688",
                     "location": "Quidnesset, North Kingstown, Rhode Island",
                     "children": [
                       {"name": "Arthur Alsworth",
                        "birth": "N/A",
                        "location": "England or Wales"},
                       {"name": "Mary Brown",
                        "birth": "N/A",
                        "location": "Providence, Rhode Island",
                        "children": [
                          {"name": "Rev. John Brown",
                           "birth": "N/A",
                           "location": "Rhode Island"},
                          {"name": "Mary Holmes",
                           "birth": "N/A",
                           "location": "Rhode Island",
                           "children": [
                             {"name": "Obediah Holmes",
                              "birth": "N/A",
                              "location": "Rhode Island"}
                           ]}
                        ]}
                     ]}
                  ]},
                  {"name": "Margaret Greenman",
                   "birth": "1725",
                   "location": "Charlestown, Rhode Island",
                   "children": [
                     {"name": "Edward Greenman",
                      "birth": "N/A",
                      "location": "N/A"},
                     {"name": "Sarah Clarke",
                      "birth": "N/A",
                      "location": "N/A"}
                   ]}
                ]},
                {"name": "Huldah Sweet",
                 "birth": "1758",
                 "location": "Alfrded, Allegany Co., New York"}
              ]},
              {"name": "Sarah Peckham",
               "birth": "1797",
               "location": "Petersburg, Rensselaer Co., New York",
               "children": [
                 {"name": "Braddock Peckham",
                  "birth": "N/A",
                  "location": "N/A"},
                 {"name": "Rebecca Peckham",
                  "birth": "N/A",
                  "location": "N/A"}
               ]}
            ]}
          ]},
          { "name": "Paulina Juhnke",
            "birth": "1860",
            "location": "Newton, Marquette, Wisconsin",
            "children": [
              {"name": "Godfried Juhnke",
               "birth": "1821",
               "location": "Poland"},
              {"name": "Dora Dräger",
               "birth": "1823",
               "location": "Friedrichswalde Parish, Pommern (Pomerania)",
                "children": [
                    {"name": "Johann Dräger",
                     "birth": "N/A",
                     "location": "N/A"},
                    {"name": "Hanna Verges",
                     "birth": "N/A",
                     "location": "N/A"}
                  ]}
            ]}
          ]},
       {"name": "May Allen",
        "birth": "1888",
        "location":  "Rockford Ward 7, Winnebago, Illinois",
        "children": [
        {"name": "William Allen",
         "birth": "1850",
         "location": "New York or Pennsylvania"},
        {"name": "Sarah Sheffield",
         "birth": "1850",
         "location": "New York",
         "children": [
          {"name": "Daniel Sheffield",
           "birth": "1831",
           "location": "New York"},
          {"name": "Mary Blakely",
           "birth": "1840",
           "location": "New York"}
        ]}
      ]}
    ]
  }
 ]};

//************************ CREATE TREE **************************

// Set the dimensions and margins of the tree
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    treeWidth = 1100 - margin.left - margin.right,
    treeHeight = 600 - margin.top - margin.bottom;

// Create Zoom
var zoom = d3.zoom()
    .scaleExtent([.5, 3])
    .on("zoom", zoomed);

// Create container to call zoom on
var svgContainer = d3.select("#large-tree").append("svg")
    .attr("width", treeWidth + margin.right + margin.left)
    .attr("height", treeHeight + margin.top + margin.bottom)
    .call(zoom)
    .on("dblclick.zoom", null);

// Create container for tree
var svgTree = svgContainer.append("g");

// Set some variables
var i = 0,
    duration = 500,
    root;

var fillbase = "#B3DCB0";
var fillhover = "#89C984";
var linkcolor = "#14530F";
var strokecolor = "#14530F";
var normXsize = 160;
var normXpos = -70;
var growXsize = 166;
var growXpos = -72;
var normYsize = 32;
var normYpos = -16;
var growYsize = 38;
var growYpos = -20;

// Declare a tree layout
var tree = d3.tree().size([treeWidth, treeHeight]);

// Set node seperation
tree.separation(function(a, b) { return a.parent === b.parent ? 1 : 1; });

// Assign parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = treeWidth / 2;
root.y0 = 0;

// Assign the x and y position for the nodes
var treePosition = tree(root);

// Compute the new tree layout
var nodes = treePosition.descendants(),
    links = treePosition.descendants().slice(1);

// Normalize for fixed-depth
nodes.forEach(function(d){ d.y = d.depth * 185});

// ****************** Create Tooltip **************************

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<p>" + d.data.name + "</p>"
         + "<p><em>Born: " + d.data.birth + "</em></p>"
         + "<p><em>Location: </em>" + d.data.location + "</p>";
  });

  svgTree.call(tip);

// ****************** Reset Button ****************************

d3.select('button')
  .on("click", reset);

// ****************** Nodes section ***************************

// Create nodes
var node = svgTree.selectAll('g.node')
              .data(nodes)
              .enter().append('g')
              .attr('class', 'node')
              .attr('transform', function(d) { return 'translate(' + d.y + "," + d.x + ')'; });


// Add rectangles to nodes
node.append('rect')
      .attr('class', 'node')
      .attr('x', normXpos)
      .attr('y', normYpos)
      .attr('width', normXsize)
      .attr('height', normYsize)
      .style('fill', fillbase)
      .on('mouseover', tip.show)
      .on('mouseout',  tip.hide)
      .on('mouseenter', enterThis)
      .on('mouseleave', leaveThis)
      .on('click', clickThis)
;

// Add names to nodes
node.append('text')
      .attr('x', -66)
      .attr('y', 6)
      .text(function(d) { return d.data.name; })
      .style('pointer-events', 'none');

// ************** Mouse Events for Nodes *********************

// mouseenter events
function enterThis(p) {

  //Grow node
    d3.select(this)
      .attr("x", growXpos)
      .attr("y", growYpos)
      .attr("width", growXsize)
      .attr("height", growYsize);

  //select node parents
    var nodes = [];
	  nodes.push(p);
	  while(p.parent) {
		  p = p.parent;
		  nodes.push(p);
    }

   //color the node parents
    node.filter(function(d) { if ( nodes.indexOf(d) !== -1) return true;} )
       .select('rect')
       .style("fill", fillhover);
}

// mouseleave events
function leaveThis(p) {

// Return node to normal size and remove styles
  if (d3.select(this).classed("isclicked") === false) {
     d3.select(this)
       .attr("x",normXpos)
       .attr("y", normYpos)
       .attr("width", normXsize)
       .attr("height", normYsize)
       .style("fill", fillbase);
  }

 //select node parents
   var nodes = [];
	   nodes.push(p);
	     while(p.parent) {
		   p = p.parent;
		   nodes.push(p);
	   }

  //revert color of nodes
   node.filter(function(d) { if ( nodes.indexOf(d) !== -1) return true;} )
       .select('rect')
       .style("fill", fillbase);

}

// on click events
function clickThis(d) {

// when a different node is clicked
  d3.selectAll('rect.node')
       .attr("x", normXpos)
       .attr("y", normYpos)
       .attr("width", normXsize)
       .attr("height", normYsize)
       .style('stroke', "none")
       .call(tip.hide)
       .classed("isclicked", false);

// when THIS node is clicked
    d3.select(this)
       .attr("x", growXpos)
       .attr("y", growYpos)
       .attr("width", growXsize)
       .attr("height", growYsize)
       .style('stroke', strokecolor)
       .style('stroke-width', "2px")
       .classed("isclicked", d3.select(this).classed("isclicked") ? false : true);

 // zoom and center on clicked node
    svgContainer.transition()
        .duration(750)
        .call(zoom.transform,
              d3.zoomIdentity
                .translate(treeWidth / 2, treeHeight / 2)
                .scale(1)
                .translate(-d.y, -d.x)
        );

function parentList(d) {
    if (d.children === undefined) {
    return "Unknown Parents";
  } else if (d.children[1] === undefined) {
    return d.children[0].data.name + " and Unknown Parent";
  } else {
    return d.children[0].data.name + " and " + d.children[1].data.name;
  }
}

function directDesc(d) {
  if (d.parent === null) {
    return "Private";
  } else {
    return d.parent.data.name;
  }
}

  // display node information in legend
    d3.select('#clickinfo')
       .html('<div class="legend-name">'
             + '<h3>' + d.data.name + '</h3>'
             + "<p><strong>Born:</strong> <em>" + d.data.birth + "</em></p>"
             + "<p><strong>Location:</strong> " + d.data.location + "</p>"
             + "<p><strong>Parents:</strong> " + parentList(d)  + "</p>"
             + "<p><strong>Direct Descendant:</strong> " + directDesc(d) + "</p>"
             + "<p>More Info . . ." + "</p>"
             + '</div>');

}

// ****************** links section ***************************

// Create link paths
function diagonal(d) {
  return "M" + d.y + "," + d.x
       + "V" + d.parent.x
       + "H" + d.parent.y;
}

// Create links
var link = svgTree.selectAll('path.link')
      .data(links, function(d) { return d.id; })
      .enter().insert('path', "g")
      .attr("class", "link")
      .style("stroke", linkcolor)
      .style("stroke-width", "2px")
      .style("fill", "none")
      .attr("d", diagonal);

//****************** Reset Function *******************************

  function reset() {

 // return zoom scale
   svgContainer.transition()
      .duration(750)
      .call(zoom.transform,
        d3.zoomIdentity
        .translate(50, 25)
        .scale(.5)
      );

 // remove node stylings
    d3.selectAll('.node')
       .attr("x", normXpos)
       .attr("y", normYpos)
       .attr("width", normXsize)
       .attr("height", normYsize)
       .style("stroke", "none");

 // clear legend information
    d3.select('#clickinfo').html("");

  }

// ************************ Zoomed Function *****************************
  function zoomed() {
      svgTree.attr("transform", d3.event.transform);
  }

  d3.select(window).on("load", svgContainer.call(zoom.transform, d3.zoomIdentity.translate(50, 25).scale(.5)));
