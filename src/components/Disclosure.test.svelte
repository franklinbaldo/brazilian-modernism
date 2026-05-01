<script lang="ts">
  import Disclosure from './Disclosure.svelte';

  type Props = {
    title: string;
    open?: boolean;
    disabled?: boolean;
  };

  let { title, open = false, disabled = false }: Props = $props();
</script>

<Disclosure {title} bind:open {disabled}>
  <p data-testid="disclosure-content">Hidden details about Brazilian modernism.</p>
</Disclosure>
