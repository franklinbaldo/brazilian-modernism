<script lang="ts">
	/**
	 * MetricCard
	 * Card para exibir métrica grande (KPI) com indicador de tendência.
	 */
	type Props = {
		value: string | number;
		label: string;
		delta?: string;
		deltaTrend?: 'up' | 'down' | 'neutral';
		accent?: 'azul' | 'vermelho' | 'ocre' | 'verde';
	};

	let {
		value,
		label,
		delta,
		deltaTrend = 'neutral',
		accent = 'azul'
	}: Props = $props();
</script>

<div class="metric-card" style="--accent-color: var(--{accent});">
	<div class="metric-content">
		<div class="value">{value}</div>
		<div class="label">{label}</div>
	</div>

	{#if delta}
		<div class="delta trend-{deltaTrend}">
			{#if deltaTrend === 'up'}
				<svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="12" y1="19" x2="12" y2="5"></line>
					<polyline points="5 12 12 5 19 12"></polyline>
				</svg>
			{:else if deltaTrend === 'down'}
				<svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<polyline points="19 12 12 19 5 12"></polyline>
				</svg>
			{/if}
			<span class="delta-text">{delta}</span>
		</div>
	{/if}
</div>

<style>
	.metric-card {
		padding: 2rem;
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: var(--r-soft);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.metric-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.value {
		font-size: var(--t-h2);
		font-weight: 900;
		line-height: 1;
		color: var(--accent-color);
	}

	.label {
		font-size: var(--t-small);
		text-transform: uppercase;
		color: var(--fg-muted);
		letter-spacing: 0.1em;
	}

	.delta {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: var(--t-small);
		font-weight: 700;
	}

	.trend-up {
		color: var(--verde);
	}

	.trend-down {
		color: var(--vermelho);
	}

	.trend-neutral {
		color: var(--fg-muted);
	}

	.trend-icon {
		width: 1em;
		height: 1em;
	}
</style>
