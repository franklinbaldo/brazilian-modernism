<script lang="ts">
	/**
	 * Timeline
	 * Lista vertical de eventos com status.
	 */
	type TimelineItem = {
		date: string;
		title: string;
		description?: string;
		status?: 'done' | 'active' | 'pending';
	};

	type Props = {
		items: TimelineItem[];
	};

	let { items }: Props = $props();
</script>

<div class="timeline">
	{#each items as item}
		<div class="timeline-item status-{item.status || 'pending'}">
			<div class="timeline-indicator">
				<div class="dot"></div>
				<div class="line"></div>
			</div>
			<div class="timeline-content">
				<div class="date">{item.date}</div>
				<div class="title">{item.title}</div>
				{#if item.description}
					<div class="description">{item.description}</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline {
		display: flex;
		flex-direction: column;
	}

	.timeline-item {
		display: flex;
		gap: 1rem;
		position: relative;
		min-height: 4rem; /* Ensure minimum height for line even with short content */
	}

	/* Indicator styling (dot + line) */
	.timeline-indicator {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 12px; /* Width of the dot */
		flex-shrink: 0;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
		margin-top: 0.25rem; /* Align dot with first line of content text */
		z-index: 1; /* Keep dot above line */
	}

	.line {
		width: 2px;
		background: var(--border);
		flex-grow: 1;
		margin-top: 0.25rem;
		margin-bottom: -0.25rem; /* Connect to the next item's dot */
	}

	/* Don't show line after the last item */
	.timeline-item:last-child .line {
		display: none;
	}

	/* Status mappings for the dot */
	.status-done .dot {
		background: var(--verde);
	}

	.status-active .dot {
		background: var(--azul);
	}

	.status-pending .dot {
		background: var(--concreto-40);
	}

	/* Content styling */
	.timeline-content {
		padding-bottom: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.timeline-item:last-child .timeline-content {
		padding-bottom: 0; /* Remove padding after last item content */
	}

	.date {
		font-size: var(--t-small);
		color: var(--fg-muted);
	}

	.title {
		font-size: var(--t-body); /* Or inherit if var(--t-body) isn't defined, but spec asks for it */
		font-weight: 700;
		color: var(--fg);
	}

	.description {
		font-size: var(--t-small);
		color: var(--fg-muted);
		margin-top: 0.25rem;
		line-height: 1.5;
	}
</style>
