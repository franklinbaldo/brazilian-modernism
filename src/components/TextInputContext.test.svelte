<script lang="ts">
  import { setContext } from 'svelte';
  import TextInput from './TextInput.svelte';

  let { invalid = false, required = false } = $props();

  setContext('cobogo-form-field', () => ({
    id: 'test-id',
    'aria-describedby': 'test-desc',
    invalid,
    valid: false,
    required
  }));
</script>

<TextInput placeholder="Context Input" />
