<script lang="ts">
  import Tabs from './Tabs.svelte';
  import TabList from './TabList.svelte';
  import Tab from './Tab.svelte';
  import TabPanel from './TabPanel.svelte';

  let active = $state('tab1');
</script>

<div data-testid="active-value">{active}</div>

<Tabs name="my-tabs" bind:active>
  <TabList ariaLabel="My Tabs">
    <Tab value="tab1">First Tab</Tab>
    <Tab value="tab2">Second Tab</Tab>
    <Tab value="tab3" disabled>Third Tab</Tab>
  </TabList>

  <TabPanel value="tab1">
    <p>Content for the first tab.</p>
  </TabPanel>
  <TabPanel value="tab2">
    <p>Content for the second tab.</p>
  </TabPanel>
  <TabPanel value="tab3">
    <p>Content for the disabled third tab.</p>
  </TabPanel>
</Tabs>
