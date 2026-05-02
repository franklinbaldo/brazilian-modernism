<script lang="ts">
  import FormField from '../../../components/FormField.svelte';
  import Radio from '../../../components/Radio.svelte';

  let groupNormal = $state('option1');
  let groupInvalid = $state('');
  let groupValid = $state('option2');
</script>

<div class="demo-container">
  <div class="row">
    <FormField label="Standard Radio" htmlFor="demo-radio-1" helper="Regular radio atom">
      {#snippet children(props)}
        <div class="flex gap-4">
          <label class="flex items-center gap-2">
            <Radio value="option1" bind:group={groupNormal} {...props} />
            <span>Option 1</span>
          </label>
          <label class="flex items-center gap-2">
            <Radio value="option2" bind:group={groupNormal} {...props} id="demo-radio-1-b" />
            <span>Option 2</span>
          </label>
        </div>
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Invalid State" htmlFor="demo-radio-2" error="Please select an option.">
      {#snippet children(props)}
        <div class="flex gap-4">
          <label class="flex items-center gap-2">
            <Radio value="option1" bind:group={groupInvalid} {...props} />
            <span>Option A</span>
          </label>
          <label class="flex items-center gap-2">
            <Radio value="option2" bind:group={groupInvalid} {...props} id="demo-radio-2-b" />
            <span>Option B</span>
          </label>
        </div>
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Valid State" htmlFor="demo-radio-3" valid="Looks good!">
      {#snippet children(props)}
        <div class="flex gap-4">
          <label class="flex items-center gap-2">
            <Radio value="option1" bind:group={groupValid} {...props} />
            <span>Choice X</span>
          </label>
          <label class="flex items-center gap-2">
            <Radio value="option2" bind:group={groupValid} {...props} id="demo-radio-3-b" />
            <span>Choice Y</span>
          </label>
        </div>
      {/snippet}
    </FormField>
  </div>
</div>

<style>
  .demo-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    border: 1px solid var(--concreto-30);
    border-radius: var(--r-2);
    background: var(--bg);
  }
  .row {
    width: 100%;
    max-width: 400px;
  }
  .flex {
    display: flex;
  }
  .gap-4 {
    gap: 1rem;
  }
  .gap-2 {
    gap: 0.5rem;
  }
  .items-center {
    align-items: center;
  }
</style>
