<script lang="ts">
  import Form from './Form.svelte';
  import Button from './Button.svelte';
  import TextInput from './TextInput.svelte';
  import FormField from './FormField.svelte';

  let {
    action,
    method,
    legend,
    error,
    onsubmit,
    mockSubmit
  } = $props();

</script>

<Form {action} {method} {legend} {error} onsubmit={mockSubmit}>
  <FormField label="First Name" htmlFor="fname">
    <TextInput id="fname" name="fname" />
  </FormField>
  <FormField label="Last Name" htmlFor="lname">
    <TextInput id="lname" name="lname" />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
