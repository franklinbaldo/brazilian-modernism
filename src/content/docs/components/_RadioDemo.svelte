<script lang="ts">
  import Radio from '../../../components/Radio.svelte';

  let standardGroup = $state('option1');
  let validGroup = $state('valid1');
  let invalidGroup = $state('invalid1');
</script>

<div class="demo-container">
  <div class="row">
    <h3>Standard Usage</h3>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Radio value="option1" bind:group={standardGroup} /> Option 1
    </label>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Radio value="option2" bind:group={standardGroup} /> Option 2
    </label>
  </div>

  <div class="row">
    <h3>Invalid State</h3>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Radio invalid={true} value="invalid1" bind:group={invalidGroup} /> Option 1
    </label>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Radio invalid={true} value="invalid2" bind:group={invalidGroup} /> Option 2
    </label>
  </div>

  <div class="row">
    <h3>Valid State</h3>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Radio valid={true} value="valid1" bind:group={validGroup} /> Option 1
    </label>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Radio valid={true} value="valid2" bind:group={validGroup} /> Option 2
    </label>
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
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  h3 {
    font-size: 0.875rem;
    margin: 0;
    color: var(--concreto-60);
  }
</style>
