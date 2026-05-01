<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		/** Whether the focus trap is active. */
		active?: boolean;
		/** Content to be trapped. */
		children: import('svelte').Snippet;
	};

	let { active = true, children }: Props = $props();

	let container: HTMLElement;

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (!active || e.key !== 'Tab' || !container) return;

			const focusableElements = container.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
			);

			if (focusableElements.length === 0) {
				e.preventDefault();
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement.focus();
					e.preventDefault();
				}
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div bind:this={container} style="display: contents;">
	{@render children()}
</div>
