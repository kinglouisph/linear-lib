"use strict";


//////linear-lib//////


//Made by Louis/Phantomderp
//Simple library for linear equations and shapes
//a point is an array with an x and y [x, y]
//lines cannot be exactly vertical

//functions
//returns a line object from 2 points
function getLineFromPoints(p1, p2) {
  var slop = (p1[1] - p2[1]) / (p1[0] - p2[0]);
  return new Line(slop, p1[1] - (p1[0] * slop));
}

//returns true if the point is in the shape
function pointInShape(point, shape) {
  var vals = shape.intercepts(new Line(0, point[1]));
  var val = 0;
  for (var i in vals) {
    if (vals[i][0] > point[0]) {val++}
  }
  return val % 2 === 1;
}


//constructors

//Line with slope and y-intercept
function Line(slope, yint) {
  this.slope = slope;
  this.yint = yint;
  this.eval = function(n) {
    return n * this.slope + this.yint;
  };
  this.intercept = function(line) {
    var val = (line.yint - this.yint) / (this.slope - line.slope);
    return [val, this.eval(val)];
  };
  
  this.shapeIntercepts = function(shape) {
    var list = [];
    var returns = [];
    for (var i = 0; i < shape.lines.length; i++) {
      var vals = this.intercepts(shape.lines[i]);
      for (var ii = 0; ii < vals.length; ii++) {
        if (vals[ii][0] > Math.min(shape.points[i][0], shape.points[i + 1][0]) && vals[ii][0] < Math.max(shape.points[i][0], shape.points[i + 1][0])) {returns.push(vals[ii])}
      }
    }
    return returns;
  };
}

//shape made of points
function Shape(points) {
  this.points = points;
  if (this.points[0] != this.points[points.length]);
  this.points.push(this.points[0]);
  this.lines = [];
  
  for (var i = 0; i < this.points.length - 1; i++) {
    this.lines.push(getLineFromPoints(this.points[i], this.points[i + 1]));
  }
  
  this.lineIntercepts = function(line) {
    var returns = [];
    for (var i in this.lines) {
      returns.push(line.intercept(this.lines[i]));
    }
    return returns;
  };
  
  this.intercepts = function(line) {
    var vals = this.lineIntercepts(line);
    var returns = [];
    for (var i = 0; i < vals.length; i++) {
      if (vals[i][0] > Math.min(this.points[i][0], this.points[i + 1][0]) && vals[i][0] < Math.max(this.points[i][0], this.points[i + 1][0])) {returns.push(vals[i])}
    }
    return returns;
  };
}


//////linear-lib//////
