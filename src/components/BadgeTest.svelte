<script lang="ts">
  import Badge from './Badge.svelte';
  let { text = 'Badge', variant, class: className } = $props();
</script>

<Badge {variant} class={className}>{text}</Badge>
