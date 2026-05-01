<script lang="ts">
	import Column from './Column.svelte';

	let {
		span = 12,
		sm = undefined,
		md = undefined,
		lg = undefined,
		start = undefined,
		as = 'div'
	} = $props();
</script>

<Column {span} {sm} {md} {lg} {start} {as} data-testid="column">
	Child content
</Column>
