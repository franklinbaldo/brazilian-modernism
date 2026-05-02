<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import FocusTrap from '../../utils/FocusTrap.svelte';


	type Props = {
		/** Indicates whether the drawer is currently open. Bound variable controls the modal. */
		open: boolean;
		/** Position of the drawer. 'right' or 'left'. Default is 'right'. */
		position?: 'right' | 'left';
		/** Accessible name for the drawer. Required. */
		'aria-label'?: string;
		/** Accessible description for the drawer. */
		'aria-describedby'?: string;
		/** Callback fired when the drawer closes. */
		onClose?: () => void;
		/** The content of the drawer. */
		children: Snippet;
	};

	let {
		open = $bindable(false),
		position = 'right',
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		onClose,
		children
	}: Props = $props();

	let dialogElement: HTMLDialogElement | undefined = $state();

	// Keep DOM state in sync with open prop natively using showModal/close
	$effect(() => {
		if (dialogElement) {
			if (open && !dialogElement.open) {
				dialogElement.showModal();
			}
			// We handle closing in onoutroend to allow Svelte transitions to finish
		}
	});

	function handleClose() {
		open = false;
		if (onClose) onClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			event.preventDefault(); // Prevent native close to manage state manually
			handleClose();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === dialogElement) {
			handleClose();
		}
	}

	// Provide context to child elements (e.g. Header close button)
	setContext('dialogClose', () => handleClose);

	// Compute transform distance based on position
	const flyX = $derived(position === 'right' ? 100 : -100);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialogElement}
	aria-label={ariaLabel}
	aria-describedby={ariaDescribedby}
	aria-modal="true"
	onkeydown={handleKeydown}
	onclick={handleBackdropClick}
	class="cobogo-drawer"
	class:position-left={position === 'left'}
	class:position-right={position === 'right'}
>
	{#if open}
		<FocusTrap active={true}>
			<div
				class="cobogo-drawer-inner"
				in:fly={{ x: flyX, duration: 220, opacity: 1 }}
				out:fly={{ x: flyX, duration: 150, opacity: 1 }}
				onoutroend={() => {
					if (dialogElement && dialogElement.open) {
						dialogElement.close();
					}
				}}
			>
				{@render children()}
			</div>
		</FocusTrap>
	{/if}
</dialog>

<style>
	.cobogo-drawer {
		padding: 0;
		border: none;
		background-color: var(--papel-00);
		box-shadow: var(--shadow-2);
		width: 100%;
		max-width: 90vw;
		height: 100vh;
		max-height: 100vh;
		margin: 0;
		overflow: hidden;
		color: var(--concreto-80);
	}

	/* Responsive overrides */
	@media (min-width: 480px) {
		.cobogo-drawer {
			max-width: 400px;
		}
	}

	.cobogo-drawer.position-right {
		margin-left: auto;
		border-top-left-radius: var(--r-1);
		border-bottom-left-radius: var(--r-1);
	}

	.cobogo-drawer.position-left {
		margin-right: auto;
		border-top-right-radius: var(--r-1);
		border-bottom-right-radius: var(--r-1);
	}

	.cobogo-drawer::backdrop {
		background: rgba(26, 24, 20, 0.4);
		backdrop-filter: blur(2px);
	}

	.cobogo-drawer-inner {
		display: flex;
		flex-direction: column;
		height: 100%;
		max-height: inherit;
		overflow: hidden;
	}
</style>
