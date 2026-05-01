<script lang="ts">
  import Radio from './Radio.svelte';

  let { testGroup = $bindable('apple') } = $props();
</script>

<Radio value="apple" bind:group={testGroup} aria-label="Apple" />
<Radio value="banana" bind:group={testGroup} aria-label="Banana" />
<Radio value="cherry" bind:group={testGroup} aria-label="Cherry" />
