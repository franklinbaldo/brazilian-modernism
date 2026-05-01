<script lang="ts">
  import OptionGroup from './OptionGroup.svelte';
  import Radio from './Radio.svelte';

  let { legend, orientation, name, error, disabled } = $props();
  let groupValue = $state('a');
</script>

<OptionGroup {legend} {orientation} {name} {error} {disabled}>
  <label style="display: flex; gap: 8px;">
    <Radio value="a" bind:group={groupValue} /> A
  </label>
  <label style="display: flex; gap: 8px;">
    <Radio value="b" bind:group={groupValue} /> B
  </label>
</OptionGroup>
