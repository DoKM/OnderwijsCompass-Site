<script lang="ts">
	import logoHZ from '$lib/static/logohz.png';
	import BarChart2 from '$lib/BarChart2.svelte';
	import History from '$lib/History.svelte';
	import io from 'socket.io-client';
	import { onMount } from 'svelte';
	import { LANGUAGE, getTextForKey } from '$lib/translation';

	import type { LineInput, KeyValueArray } from '$lib/types';
	let socket = io('http://localhost:3000');

	let showAllData = false;
	let lineHistory: LineInput[] = [];
	let lines: { [key: string]: number } = {};

	let linesArray: KeyValueArray = [];
	let slicedLinesArray: KeyValueArray = [];
	let currentLanguage: LANGUAGE = LANGUAGE.dutch;
	const sliceLength = 10;
	$: {
		linesArray = Object.entries(lines).map(([key, value]) => {
			return { key: getTextForKey(key, currentLanguage), value: value };
		});
		linesArray.sort((a, b) => b.value - a.value);
		console.log(linesArray);
	}

	$: {
		if (!showAllData) {
			slicedLinesArray = linesArray.slice(0, sliceLength);
		} else {
			slicedLinesArray = linesArray;
		}
	}

	socket.on('connect', () => {
		console.log('connected');
	});

	socket.on('all-history', (data: LineInput[]) => {
		lineHistory = data;
		// add the formatted time to each line
		lineHistory.forEach((line) => {
			line.formattedTime = new Date(line.timeStamp).toLocaleTimeString();
		});
	});

	socket.on('all-results', (data: { [key: string]: number }) => {
		lines = data;
	});

	socket.on('new-line', (data: LineInput) => {
		data.formattedTime = new Date(data.timeStamp).toLocaleTimeString();
		lineHistory = [...lineHistory, data];
		const { line1, line2, line3 } = data;
		pushLineToLines(line1);
		pushLineToLines(line2);
		pushLineToLines(line3);
	});

	function pushLineToLines(line: string) {
		if (line == undefined) return;
		if (line.trim() === '') return;
		if (lines[line] === undefined) {
			lines[line] = 1;
		} else {
			lines[line]++;
		}
	}

	function resetServerData() {
		if (confirm(getTextForKey('Reset Data', currentLanguage))) {
			socket.emit('reset-data');
		}
	}

	function saveCSV() {
		// Convert array of objects to CSV data
		let csvContent = 'subject, votes\n'; // column headers
		linesArray.forEach((item) => {
			csvContent += `${item.key},${item.value}\n`; // each line of data
		});

		// Create a Blob from the CSV string
		let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

		// Create a URL from the Blob
		let url = URL.createObjectURL(blob);

		// Create a hidden <a> element and trigger a click event to start the download
		let link = document.createElement('a');
		link.style.display = 'none';
		link.href = url;
		let currentDateTime = new Date();
		let currentDateTimeString = currentDateTime.toLocaleString('en-GB').replace(/\/|,|:/g, '-');
		link.download = `onderwijskompas - ${currentDateTimeString}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div id="header">
	<div id="header-logo">
		<!-- img element from svelte src/static/logohz.png -->
		<!-- FILEPATH: /d:/Programming/School/Jaar5/OnderwijsCompass Site/siteSvelte/src/routes/+page.svelte -->
		<!-- BEGIN: ed8c6549bwf9 -->
		<img src={logoHZ} alt="Logo" />
		<!-- END: ed8c6549bwf9 -->
	</div>
	<div id="header-title">
		<h1>{getTextForKey('OnderwijsKompas', currentLanguage)}</h1>
	</div>
</div>

<div id="controls">
	<div class="button">
		<button
			on:click={() => {
				if (currentLanguage == LANGUAGE.dutch) {
					currentLanguage = LANGUAGE.english;
				} else {
					currentLanguage = LANGUAGE.dutch;
				}
			}}>{getTextForKey('Change Language', currentLanguage)}</button
		>
	</div>
	<div class="button">
		<button on:click={resetServerData}>{getTextForKey('Reset', currentLanguage)}</button>
	</div>
	<div class="button">
		<button
			on:click={() => {
				showAllData = !showAllData;
			}}
			>{showAllData
				? getTextForKey('Hide Extra Rows', currentLanguage)
				: getTextForKey('Show All Rows', currentLanguage)}</button
		>
	</div>
	<div class="button">
		<button on:click={saveCSV}>{getTextForKey('SaveCSV', currentLanguage)}</button>
	</div>
</div>
<div>
	<h2>Results</h2>
	<!-- <BarChart data={linesArray} bind:showAllData {sliceLength} />
	 -->
	<BarChart2 chartData={slicedLinesArray} />
</div>
<History {lineHistory} />
<div class="button">
	<button on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Go to Top</button>
</div>

<style>
	#header {
		display: flex;
		align-items: center;
		justify-content: start;
		background-color: #f2f2f2;
		padding: 10px;
	}

	#header-logo {
		display: flex;
		align-items: center;
	}

	#header-logo img {
		max-width: 300px;
		height: auto;
	}

	#header > div {
		padding: 10px;
	}

	#header-title h1 {
		font-size: 24px;
		color: #333;
		margin: 0;
	}

	#controls {
		display: flex;
		align-items: center;
		justify-content: start;
	}

	div.button {
		padding: 10px;
	}

	div.button button {
		padding: 10px 20px;
		border-radius: 5px;
		background-color: #b7e8ff;
		border: #62acff solid 2px;
		color: black;
		font-size: 16px;
		cursor: pointer;
	}

	div.button button:hover {
		background-color: #0056b3;
	}

	div.button button:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
	}
</style>
