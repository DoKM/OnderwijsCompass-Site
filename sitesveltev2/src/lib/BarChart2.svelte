<script lang="ts">
	import { Chart, registerables } from 'chart.js';
	Chart.register(...registerables);
	export let chartData: { key: string; value: number }[] = [];
	import { onMount } from 'svelte';

	let chartValues = [20, 10, 5, 2, 20, 30, 45];
	let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

	$: {
		console.log(chartData);
		chartValues = chartData.map((d) => {
			return d.value;
		});
		chartLabels = chartData.map((d) => {
			return d.key;
		});
		console.log(chartValues);
		console.log(chartLabels);
	}

	let ctx: CanvasRenderingContext2D | null;
	let chartCanvas: HTMLCanvasElement;
	let chart: any = null;
	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		chart = new Chart(chartCanvas, {
			type: 'bar',
			options: {
				indexAxis: 'y',
				plugins: {
					legend: {
						display: false,
						onClick: (e) => {}
					}
				},
				scales: {
					x: {
						beginAtZero: true,
						suggestedMin: 5,
						ticks: {
							// forces step size to be 50 units
							stepSize: 1
						}
					}
				}
			},
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Votes',

						// backgroundColor: 'rgb(255, 99, 132)',
						backgroundColor: [
							'#1f77b4',
							'#ff7f0e',
							'#2ca02c',
							'#d62728',
							'#9467bd',
							'#8c564b',
							'#e377c2',
							'#7f7f7f',
							'#bcbd22',
							'#17becf'
						],

						data: chartValues
					}
				]
			}
		});
	});

	$: {
		if (chart) {
			chart.data.labels = chartLabels;
			chart.data.datasets[0].data = chartValues;
			chart.update();
		}
	}
</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>
