<script lang="ts">
  import Checkbox from '../../../components/Checkbox.svelte';

  let validChecked = $state(true);
  let invalidChecked = $state(false);
</script>

<div class="demo-container">
  <div class="row">
    <h3>Standard Usage</h3>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Checkbox value="standard" /> Checkbox label
    </label>
  </div>

  <div class="row">
    <h3>Invalid State</h3>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Checkbox invalid={true} bind:checked={invalidChecked} /> Must agree to terms
    </label>
  </div>

  <div class="row">
    <h3>Valid State</h3>
    <label style="display: flex; gap: 0.5rem; align-items: center;">
      <Checkbox valid={true} bind:checked={validChecked} /> Verified option
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
