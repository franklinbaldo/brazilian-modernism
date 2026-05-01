<script lang="ts">
  import Accordion from './Accordion.svelte';
  import Disclosure from './Disclosure.svelte';

  type Props = {
    name?: string;
  };

  let { name = "my-accordion" }: Props = $props();
</script>

<Accordion {name}>
  <Disclosure title="Item 1">
    <div data-testid="content-1">Content 1</div>
  </Disclosure>
  <Disclosure title="Item 2">
    <div data-testid="content-2">Content 2</div>
  </Disclosure>
  <Disclosure title="Item 3">
    <div data-testid="content-3">Content 3</div>
  </Disclosure>
</Accordion>
