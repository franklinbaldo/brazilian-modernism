<script lang="ts">
	import Grid from './Grid.svelte';
	import Column from './Column.svelte';

	let {
		columns = 12,
		gap = '2rem',
		as = 'div'
	} = $props();
</script>

<Grid {columns} {gap} {as} data-testid="grid">
	<div data-testid="grid-child">Child</div>
</Grid>
