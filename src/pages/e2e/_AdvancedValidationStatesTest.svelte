<script>
  import MultiSelect from '../../components/MultiSelect.svelte';
  import Combobox from '../../components/Combobox.svelte';
  import DatePicker from '../../components/DatePicker.svelte';
  import FileInput from '../../components/FileInput.svelte';
  import TimePicker from '../../components/TimePicker.svelte';
  import FormField from '../../components/FormField.svelte';

  let options = [{ value: '1', label: 'One' }, { value: '2', label: 'Two' }];
</script>

<div class="test-container" style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
  <!-- Invalid States -->
  <section id="invalid-states" style="display: flex; flex-direction: column; gap: 1rem;">
    <FormField htmlFor="inv-multi" label="Invalid MultiSelect" error="Error here">
      {#snippet children(props)}
        <MultiSelect {...props} {options} />
      {/snippet}
    </FormField>

    <FormField htmlFor="inv-combo" label="Invalid Combobox" error="Error here">
      {#snippet children(props)}
        <Combobox {...props} {options} />
      {/snippet}
    </FormField>

    <FormField htmlFor="inv-date" label="Invalid DatePicker" error="Error here">
      {#snippet children(props)}
        <DatePicker {...props} />
      {/snippet}
    </FormField>

    <FormField htmlFor="inv-file" label="Invalid FileInput" error="Error here">
      {#snippet children(props)}
        <FileInput {...props} />
      {/snippet}
    </FormField>

    <FormField htmlFor="inv-time" label="Invalid TimePicker" error="Error here">
      {#snippet children(props)}
        <TimePicker {...props} />
      {/snippet}
    </FormField>
  </section>

  <!-- Valid States -->
  <section id="valid-states" style="display: flex; flex-direction: column; gap: 1rem;">
    <FormField htmlFor="val-multi" label="Valid MultiSelect" valid="Looks good!">
      {#snippet children(props)}
        <MultiSelect {...props} {options} />
      {/snippet}
    </FormField>

    <FormField htmlFor="val-combo" label="Valid Combobox" valid="Looks good!">
      {#snippet children(props)}
        <Combobox {...props} {options} />
      {/snippet}
    </FormField>

    <FormField htmlFor="val-date" label="Valid DatePicker" valid="Looks good!">
      {#snippet children(props)}
        <DatePicker {...props} />
      {/snippet}
    </FormField>

    <FormField htmlFor="val-file" label="Valid FileInput" valid="Looks good!">
      {#snippet children(props)}
        <FileInput {...props} />
      {/snippet}
    </FormField>

    <FormField htmlFor="val-time" label="Valid TimePicker" valid="Looks good!">
      {#snippet children(props)}
        <TimePicker {...props} />
      {/snippet}
    </FormField>
  </section>
</div>
