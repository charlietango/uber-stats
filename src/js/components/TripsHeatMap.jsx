import React from 'react';
import moment from 'moment';

const d3 = require('d3');

export default class TripsHeatMap extends React.Component {
  componentDidMount() {
    this.data = [];

    const days = [1, 2, 3, 4, 5, 6, 7];
    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    days.forEach((day) => {
      hours.forEach((hour) => {
        this.data.push({ day, hour, value: 0 });
      });
    });

    this.props.trips.forEach((item) => {
      const day = moment.unix(item.start_time).day() + 1;
      const hour = moment.unix(item.start_time).hour();
      this.data.forEach((dataItem) => {
        if (dataItem.day === day && dataItem.hour === hour) {
          dataItem.value++;
        }
      });
    });
    heatMap(this.data);
  }

  render() {
    return (
      <div id="chart" />
    );
  }
}

function heatMap(data) {
  const margin = { top: 50, right: 30, bottom: 100, left: 30 };
  const width = document.getElementById('chart').offsetWidth;
  const height = 0.3 * width;
  const gridSize = Math.floor(width / 24);
  const legendElementWidth = gridSize * 2;
  const colors = [
    '#ffffff',
    // '#c7e9b4',
    '#7fcdbb',
    // '#41b6c4',
    '#1d91c0',
    // '#225ea8',
    '#253494',
    '#081d58',
  ];
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const times = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p',
    '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];


  const svg = d3.select('#chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const dayLabels = svg.selectAll('.dayLabel')
      .data(days)
      .enter().append('text')
        .text(d => d)
        .attr('x', 0)
        .attr('y', (d, i) => i * gridSize)
        .style('text-anchor', 'end')
        .attr('transform', 'translate(-6,' + gridSize / 1.5 + ')')
        .attr('class', (d, i) => ((i >= 1 && i <= 5) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis'));

  const timeLabels = svg.selectAll('.timeLabel')
      .data(times)
      .enter().append('text')
        .text(d => d)
        .attr('x', (d, i) => i * gridSize)
        .attr('y', 0)
        .style('text-anchor', 'middle')
        .attr('transform', 'translate(' + gridSize / 2 + ', -6)')
        .attr('class', (d, i) => ((i >= 7 && i <= 16) ? 'timeLabel mono axis axis-worktime' : 'timeLabel mono axis'));

  const colorScale = d3.scaleQuantile()
      .domain([0, d3.max(data, d => d.value)])
      .range(colors);

  const cards = svg.selectAll('.hour')
      .data(data, d => d.day + ':' + d.hour);

  cards.append('title');

  cards.enter().append('rect')
      .attr('x', d => (d.hour) * gridSize)
      .attr('y', d => (d.day - 1) * gridSize)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('class', 'hour bordered')
      .attr('width', gridSize)
      .attr('height', gridSize)
      .style('fill', colors[0])
      .transition()
      .duration(1000)
      .style('fill', d => colorScale(d.value));

  cards.select('title').text(d => d.value);

  cards.exit().remove();

  const legend = svg.selectAll('.legend')
      .data([0].concat(colorScale.quantiles()), d => d);

  legend.enter().append('g')
      .attr('class', 'legend');

  legend.enter().append('rect')
    .attr('x', (d, i) => legendElementWidth * i)
    .attr('y', height)
    .attr('width', legendElementWidth)
    .attr('height', gridSize / 2)
    .style('fill', (d, i) => colors[i]);

  legend.enter().append('text')
    .attr('class', 'mono')
    .text(d => '≥ ' + Math.round(d))
    .attr('x', (d, i) => legendElementWidth * i)
    .attr('y', height + gridSize);

  legend.exit().remove();
}
