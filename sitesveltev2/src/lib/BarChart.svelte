<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3-scale';

	type Data = {
		name: string;
		amount: number;
	};
	export let data: Data[];
	export let showAllData: boolean = false;
	export let sliceLength = 5;
	let slicedData: Data[] = [];
	$: {
		if (showAllData) {
			slicedData = data;
		} else {
			slicedData = data.slice(0, sliceLength);
		}
	}

	const lineHeight = 60;

	export let colours = [
		'#ff0000',
		'#00ff00',
		'#0000ff',
		'#ffff00',
		'#00ffff',
		'#ff00ff',
		'#ffffff'
	];

	function getColour(index: number) {
		// get the colour from the array, if the index is out of bounds, loop back to the start
		return colours[index % colours.length];
	}
	export let baseWidth = 800;
	let height = 200;

	$: height = lineHeight * slicedData.length;
	let marginLeft = 180;
	$: marginLeft = Math.max.apply(
		null,
		slicedData.map((d: Data) => d.name.length * 8)
	);
	let width = baseWidth + marginLeft;
	$: width = baseWidth + marginLeft;

	let margin = { top: 20, right: 20, bottom: 20, left: marginLeft };
	$: margin = { top: 20, right: 20, bottom: 20, left: marginLeft };
	let innerHeight = height - margin.top - margin.bottom;
	$: innerHeight = height - margin.top - margin.bottom;
	let innerWidth = width - margin.left - margin.right;
	$: innerWidth = width - margin.left - margin.right;

	$: xDomain = slicedData.map((d: Data) => d.name);
	$: yDomain = slicedData.map((d: Data) => +d.amount);

	$: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
	$: xScale = scaleLinear()
		.domain([0, Math.max.apply(null, yDomain)])
		.range([0, innerWidth]);
</script>

<svg {width} {height}>
	<g transform={`translate(${margin.left},${margin.top})`}>
		{#each xScale.ticks() as tickValue}
			<g transform={`translate(${xScale(tickValue)},0)`}>
				<line y2={innerHeight} stroke="black" />
				<text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
					{tickValue}
				</text>
			</g>
		{/each}
		{#each slicedData as d, index}
			<text text-anchor="end" x="-3" dy=".32em" y={yScale(d.name) + yScale.bandwidth() / 2}>
				{d.name}
			</text>
			<rect
				x="0"
				y={yScale(d.name)}
				width={xScale(d.amount)}
				height={yScale.bandwidth()}
				stroke={getColour(index)}
				fill={getColour(index)}
			/>
		{/each}
	</g>
</svg>
