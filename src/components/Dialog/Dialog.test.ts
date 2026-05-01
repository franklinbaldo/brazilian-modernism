import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import DialogTest from './Dialog.test.svelte';

describe('Dialog Organism', () => {
	beforeEach(() => {
		// jsdom does not implement HTMLDialogElement methods like showModal() or close() natively.
		// We mock them here.
		HTMLDialogElement.prototype.showModal = function () {
			this.open = true;
			this.dispatchEvent(new Event('open'));
		};
		HTMLDialogElement.prototype.close = function () {
			this.open = false;
			this.dispatchEvent(new Event('close'));
		};
	});

	afterEach(() => {
		// Clean up the mocks
		// @ts-ignore
		delete HTMLDialogElement.prototype.showModal;
		// @ts-ignore
		delete HTMLDialogElement.prototype.close;
	});

	it('should render closed by default', () => {
		render(DialogTest);
		const dialog = screen.queryByRole('dialog', { hidden: true });
		expect(dialog).not.toHaveAttribute('open');
	});

	it('should open when state changes and display header/body/footer', async () => {
		const { component } = render(DialogTest);

		component.setOpen(true);

		await waitFor(() => {
			const dialog = screen.getByRole('dialog', { hidden: true });
			expect(dialog).toHaveAttribute('open');
			expect(screen.getByText('My Dialog Title')).toBeInTheDocument();
			expect(screen.getByText('This is the dialog body.')).toBeInTheDocument();
			expect(screen.getByText('Close Custom')).toBeInTheDocument();
		});
	});

	it('should close when the default close button is clicked via context', async () => {
		const { component } = render(DialogTest);
		component.setOpen(true);

		await waitFor(() => {
			expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('open');
		});

		const closeButton = screen.getByLabelText('Close dialog');
		await fireEvent.click(closeButton);

		await waitFor(() => {
			const dialog = screen.getByRole('dialog', { hidden: true });
			expect(dialog).not.toHaveAttribute('open');
			expect(component.getOpen()).toBe(false);
		});
	});

	it('should apply WAI-ARIA attributes correctly', async () => {
		const { component } = render(DialogTest);
		component.setOpen(true);

		await waitFor(() => {
			const dialog = screen.getByRole('dialog', { hidden: true });
			expect(dialog).toHaveAttribute('aria-label', 'Test Dialog');
			expect(dialog).toHaveAttribute('aria-describedby', 'dialog-desc');
			expect(dialog).toHaveAttribute('aria-modal', 'true');
		});
	});
});
