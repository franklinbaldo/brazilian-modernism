<script lang="ts">
  import Checkbox from './Checkbox.svelte';

  let { testGroup = $bindable([]) } = $props();
</script>

<Checkbox value="apple" bind:group={testGroup} aria-label="Apple" />
<Checkbox value="banana" bind:group={testGroup} aria-label="Banana" />
<Checkbox value="cherry" bind:group={testGroup} aria-label="Cherry" />
