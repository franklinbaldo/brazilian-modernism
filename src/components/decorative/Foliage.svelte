<script lang="ts">
  type Props = {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    color?: string;
    size?: number;
  };

  let {
    position = 'bottom-right',
    color = 'var(--verde)',
    size = 200
  }: Props = $props();

  const posClass = $derived(position);
</script>

<div class="foliage-container {posClass}" style="--f-color: {color}; width: {size}px; height: {size}px;">
  <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <!-- Monstera style leaf -->
    <path d="M 80,90 C 90,70 100,40 70,20 C 50,5 20,10 10,40 C 5,60 10,80 30,95 C 40,90 35,70 45,75 C 55,80 50,95 60,95 C 70,90 65,70 75,75 C 80,80 75,95 80,90 Z" />
    <!-- Cutouts -->
    <path d="M 75,35 C 85,35 90,45 95,45 C 90,55 80,50 75,45 C 70,40 70,35 75,35 Z" fill="var(--bg-sunken, white)"/>
    <path d="M 25,45 C 15,45 10,55 5,55 C 10,65 20,60 25,55 C 30,50 30,45 25,45 Z" fill="var(--bg-sunken, white)"/>
    <path d="M 85,60 C 95,60 95,70 100,70 C 90,80 85,75 80,70 C 75,65 75,60 85,60 Z" fill="var(--bg-sunken, white)"/>
    <!-- Stem -->
    <path d="M 50,95 C 45,95 40,100 45,110" stroke="currentColor" stroke-width="4" fill="none" />
  </svg>
</div>

<style>
  .foliage-container {
    position: absolute;
    pointer-events: none;
    color: var(--f-color);
    opacity: 0.9;
    z-index: 0;
  }

  .foliage-container svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .top-left { top: -10%; left: -10%; transform: rotate(135deg); }
  .top-right { top: -10%; right: -10%; transform: rotate(225deg); }
  .bottom-left { bottom: -10%; left: -10%; transform: rotate(45deg); }
  .bottom-right { bottom: -10%; right: -10%; transform: rotate(-45deg); }
</style>
