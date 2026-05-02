<script lang="ts">
  import TextInput from '../../components/TextInput.svelte';
  import Select from '../../components/Select.svelte';
  import MultiSelect from '../../components/MultiSelect.svelte';
</script>

<div style="padding: 2rem;">
  <h1>Dark Mode Forms Test</h1>

  <div style="margin-bottom: 1rem;">
    <TextInput id="test-text-input" placeholder="Type something..." />
  </div>

  <div style="margin-bottom: 1rem;">
    <Select
      id="test-select"
      options={[
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' }
      ]}
      placeholder="Choose an option..."
    />
  </div>

  <div style="margin-bottom: 1rem;" id="test-multiselect">
    <MultiSelect
      options={[
        { value: '1', label: 'Item 1' },
        { value: '2', label: 'Item 2' }
      ]}
      placeholder="Select items..."
    />
  </div>
</div>
