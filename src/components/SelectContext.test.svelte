<script lang="ts">
  import { setContext } from 'svelte';
  import Select from './Select.svelte';

  let { invalid = false, required = false } = $props();

  setContext('cobogo-form-field', () => ({
    id: 'test-id',
    'aria-describedby': 'test-desc',
    invalid,
    valid: false,
    required
  }));

  const options = [{ value: '1', label: 'One' }];
</script>

<Select {options} placeholder="Context Select" />
