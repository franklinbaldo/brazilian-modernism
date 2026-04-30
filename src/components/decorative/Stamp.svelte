<script lang="ts">
  type Props = {
    text?: string;
    date?: string;
    color?: string;
    rotation?: number;
  };

  let {
    text = 'RECEBIDO',
    date = '12/04/2024',
    color = 'var(--vermelho)',
    rotation = -8
  }: Props = $props();

  // SSR-stable per-instance id so multiple <Stamp/> on the same page
  // don't share a DOM id (which would confuse <textPath href> resolution),
  // and so the same id is used during server render and client hydration
  // (avoids hydration mismatch warnings). $props.id() must be assigned
  // directly to a top-level variable — can't go inside template literals.
  const stampId = $props.id();
  const curveId = `stamp-curve-${stampId}`;
</script>

<div class="stamp-container" style="--stamp-color: {color}; transform: rotate({rotation}deg);">
  <div class="stamp-outer-ring">
    <div class="stamp-inner-ring">
      <div class="stamp-date">{date}</div>
    </div>

    <svg class="stamp-text-svg" viewBox="0 0 100 100">
      <path id={curveId} d="M 20,50 A 30,30 0 0,1 80,50" fill="none" stroke="none" />
      <text class="stamp-text" fill="var(--stamp-color)">
        <textPath href={`#${curveId}`} startOffset="50%" text-anchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  </div>
</div>

<style>
  .stamp-container {
    display: inline-block;
    position: relative;
    width: 140px;
    height: 140px;
    font-family: var(--font-cordel), Impact, sans-serif;
    color: var(--stamp-color);
    opacity: 0.85; /* slight transparency for ink effect */
    mix-blend-mode: multiply; /* realistic stamping over backgrounds */
    user-select: none;
    pointer-events: none;
  }

  .stamp-outer-ring {
    position: absolute;
    inset: 0;
    border: 3px solid var(--stamp-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* simulated ink bleed/imperfection */
    mask-image: radial-gradient(circle, black 85%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle, black 85%, transparent 100%);
  }

  .stamp-inner-ring {
    position: absolute;
    inset: 6px;
    border: 1.5px solid var(--stamp-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stamp-date {
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: 0.05em;
    transform: translateY(10px);
  }

  .stamp-text-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: translateY(5px);
  }

  .stamp-text {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
</style>
