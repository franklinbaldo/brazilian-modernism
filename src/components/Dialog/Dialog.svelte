<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	type Props = {
		/** Indicates whether the dialog is currently open. Bound variable controls the modal. */
		open: boolean;
		/** Role of the dialog, either 'dialog' or 'alertdialog' */
		role?: 'dialog' | 'alertdialog';
		/** Accessible name for the dialog. Required. */
		'aria-label'?: string;
		/** Accessible description for the dialog. */
		'aria-describedby'?: string;
		/** Callback fired when the dialog closes. */
		onClose?: () => void;
		/** The content of the dialog. */
		children: Snippet;
	};

	let {
		open = $bindable(false),
		role = 'dialog',
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

	function handleCancel(event: Event) {
		event.preventDefault(); // Prevent native close to manage state manually
		handleClose();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === dialogElement) {
			handleClose();
		}
	}

	// Provide context to child elements (e.g. Header close button)
	setContext('dialogClose', () => handleClose);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialogElement}
	{role}
	aria-label={ariaLabel}
	aria-describedby={ariaDescribedby}
	aria-modal="true"
	onkeydown={handleKeydown}
	oncancel={handleCancel}
	onclick={handleBackdropClick}
	class="cobogo-dialog"
>
	{#if open}
		<div
			class="cobogo-dialog-inner"
			in:fly={{ y: 20, duration: 220, opacity: 0 }}
			out:fade={{ duration: 150 }}
			onoutroend={() => {
				if (dialogElement && dialogElement.open) {
					dialogElement.close();
				}
			}}
		>
			{@render children()}
		</div>
	{/if}
</dialog>

<style>
	.cobogo-dialog {
		padding: 0;
		border: none;
		border-radius: var(--r-1);
		background-color: var(--papel-00);
		box-shadow: var(--shadow-2);
		max-width: 90vw;
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
		color: var(--concreto-80);
	}

	/* Responsive overrides */
	@media (min-width: 480px) {
		.cobogo-dialog {
			max-width: 500px;
		}
	}

	@media (min-width: 768px) {
		.cobogo-dialog {
			max-width: 600px;
		}
	}

	.cobogo-dialog::backdrop {
		background: rgba(26, 24, 20, 0.4);
		backdrop-filter: blur(2px);
	}

	.cobogo-dialog-inner {
		display: flex;
		flex-direction: column;
		max-height: inherit;
		overflow: hidden;
	}
</style>
