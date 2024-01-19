<script lang="ts">
	import type { LineInput } from '$lib/types';
	export let lineHistory: LineInput[] = [];
</script>

<div>
	<h2>History</h2>
	<details>
		<table>
			<thead>
				<tr>
					<th>Time</th>
					<th>Line 1</th>
					<th>Line 2</th>
					<th>Line 3</th>
				</tr>
			</thead>
			<tbody>
				{#each lineHistory as line}
					<tr>
						<td>{line.formattedTime}</td>
						<td>{line.line1}</td>
						<td>{line.line2}</td>
						<td>{line.line3}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</details>
</div>

<style>
	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 0.5rem;
		border: 1px solid #ccc;
	}

	summary {
		cursor: pointer;
	}

	details[open] summary::after {
		content: '▼';
	}

	details summary::after {
		content: '►';
	}

	tr:nth-of-type(odd) {
		background-color: #e1fffe;
	}
</style>
