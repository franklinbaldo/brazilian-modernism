<script lang="ts">
	/**
	 * StatusBadge
	 * Badge semântico de status usando cores do design system.
	 */
	type Props = {
		status: 'active' | 'pending' | 'inactive' | 'error' | 'success';
		label?: string;
	};

	let { status, label }: Props = $props();

	let resolvedLabel = $derived(
		label || status.charAt(0).toUpperCase() + status.slice(1)
	);
</script>

<span class="status-badge status-{status}">
	<span class="dot"></span>
	{resolvedLabel}
</span>

<style>
	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.25rem 0.625rem;
		font-size: var(--t-small);
		font-weight: 700;
		border-radius: var(--r-pill);
		line-height: 1.2;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		display: inline-block;
		flex-shrink: 0;
	}

	/* Active mapping */
	.status-active {
		background: var(--verde-soft);
		color: var(--fg);
	}
	.status-active .dot {
		background: var(--verde);
	}

	/* Pending mapping */
	.status-pending {
		background: var(--ocre-soft);
		color: var(--fg);
	}
	.status-pending .dot {
		background: var(--ocre);
	}

	/* Inactive mapping */
	.status-inactive {
		background: var(--papel-20);
		color: var(--fg);
	}
	.status-inactive .dot {
		background: var(--concreto-60);
	}

	/* Error mapping */
	.status-error {
		background: var(--vermelho-soft);
		color: var(--fg);
	}
	.status-error .dot {
		background: var(--vermelho);
	}

	/* Success mapping */
	.status-success {
		background: var(--verde-soft);
		color: var(--fg);
	}
	.status-success .dot {
		background: var(--verde);
	}
</style>
