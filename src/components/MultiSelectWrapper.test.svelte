<script lang="ts">
  import { setContext } from 'svelte';
  import MultiSelect from './MultiSelect.svelte';

  type Props = {
    invalid?: boolean;
    required?: boolean;
    id?: string;
    options: Array<{ value: string; label: string }>;
  };

  let { invalid = false, required = false, id = 'test-id', options }: Props = $props();

  setContext('cobogo-form-field', () => ({
    id,
    'aria-describedby': 'test-desc',
    invalid,
    required
  }));
</script>

<MultiSelect {options} />