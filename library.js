"use strict";


//////linear-lib//////


//Made by Louis/Phantomderp
//Simple library for linear equations and shapes
//a point is an array with an x and y [x, y]
//lines cannot be exactly vertical (infinite slope)

//functions
//returns a line object from 2 points
export function getLineFromPoints(p1, p2) {
  //check for equal y values (infinite slope)
  if (p1[1] == p2[1]) {
    p2[1] += 0.00001;
  }
  var slop = (p1[1] - p2[1]) / (p1[0] - p2[0]);
  return new Line(slop, p1[1] - (p1[0] * slop));
}

//returns true if the point is in the shape
export function pointInShape(point, shape) {
  var vals = shape.intercepts(new Line(0, point[1]));
  var val = 0;
  for (var i in vals) {
    if (vals[i][0] > point[0]) {val++}
  }
  return val % 2 === 1;
}


//classes

//Line with slope and y-intercept
export class Line {
  constructor(slope, yint) {
    this.slope = slope;
    this.yint = yint;
  }
  
  eval(n) {
    return n * this.slope + this.yint;
  };
  
  intercept(line) {
    var val = (line.yint - this.yint) / (this.slope - line.slope);
    return [val, this.eval(val)];
  };
}

//shape made of points
export class Shape {
  constructor(points) {
    this.points = points;
    if (this.points[0] != this.points[points.length - 1]) {
      this.points.push(this.points[0]);
    }
    this.lines = [];
  
    for (var i = 0; i < this.points.length - 1; i++) {
      this.lines.push(getLineFromPoints(this.points[i], this.points[i + 1]));
    }
  }
  
  //return line intercepts with a line
  lineIntercepts(line) {
    var returns = [];
    for (var i in this.lines) {
      returns.push(line.intercept(this.lines[i]));
    }
    return returns;
  };
  
  //return line segment intercepts with a line
  intercepts(line) {
    var vals = this.lineIntercepts(line);
    var returns = [];
    for (var i = 0; i < vals.length; i++) {
      if (vals[i][0] > Math.min(this.points[i][0], this.points[i + 1][0]) && vals[i][0] < Math.max(this.points[i][0], this.points[i + 1][0])) {returns.push(vals[i])}
    }
    return returns;
  };
  
  //return intercepts with another shape
  shapeIntercepts(shape) {
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


//////linear-lib//////
