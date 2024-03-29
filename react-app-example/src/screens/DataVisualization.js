
import React, { useEffect, useRef, useState } from 'react';
import { Heading, Flex } from '@chakra-ui/react'
import * as d3 from 'd3';


const sample = [
        {category:'January', quantity: 40},
        {category:'February', quantity: 151},
        {category:'March', quantity: 89},
        {category:'April', quantity: 124},
		{category:'May', quantity: 40},
        {category:'June', quantity: 151},
        {category:'July', quantity: 89},
        {category:'August', quantity: 124},
		{category:'September', quantity: 40},
        {category:'October', quantity: 151},
        {category:'November', quantity: 89},
        {category:'December', quantity: 124},
]


function DataScreen () {
	const d3Chart = useRef()
	// Ref for updating dimention 
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})
	// Ref for resize event update
	const update = useRef(false)

	useEffect(()=>{

		// Listen for any resize event update
		window.addEventListener('resize', ()=>{
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			})

			// If resize, remove the previous chart
			if(update.current){
				d3.selectAll('g').remove()
			} else {update.current = true}
		})

		// Draw chart using the data and updated dimensions
		DrawChart(sample,dimensions)

	})

	const margin = {top: 40, right:5, bottom: 5, left:25}

	function DrawChart(data){

		const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
		const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom


		const svg = d3.select(d3Chart.current)
						.attr('width', chartwidth + margin.left + margin.right)
						.attr('height', chartheight + margin.top + margin.bottom)

		// x scale
		const x = d3.scaleBand()
					.domain(d3.range(data.length))
					.range([margin.left, chartwidth - margin.right])
					.padding(0.1)

		svg.append('g')
			.attr('transform', 'translate(0,'+ chartheight + ')')
			.call(d3.axisBottom(x).tickFormat(i=>data[i].category).tickSizeOuter(0))

		const max = d3.max(data, function(d){return d.quantity})

		// y scale
		const y = d3.scaleLinear()
					.domain([0, max])
					.range([chartheight, margin.top])

		svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y))

		// draw the bars
		svg.append('g')
			.attr('fill','#3e424b')
			.selectAll('rect')
			.data(data)
			.join('rect')
				.attr('x', (d, i) => x(i))
				.attr('y', d => y(d.quantity))
				.attr('height', d=>y(0)-y(d.quantity))
				.attr('width', x.bandwidth())
	}

	return (
		<Flex bg="gray.50" align="center" justify="center" h="90vh">
			<div id='d3demo'>
				<Heading pb={8}>Units Sold</Heading>
				<svg ref={d3Chart}></svg>
			</div>
		</Flex>
	)
}

export default DataScreen