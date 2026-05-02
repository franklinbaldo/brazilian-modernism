<script lang="ts">
  import MultiSelect from './MultiSelect.svelte';

  let {
    options = [],
    value = $bindable([]),
    searchable = false,
    placeholder = 'Selecione...'
  } = $props();

</script>

<MultiSelect
  options={options}
  bind:value
  searchable={searchable}
  placeholder={placeholder}
/>
