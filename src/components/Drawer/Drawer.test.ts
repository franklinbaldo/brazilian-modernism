import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import DrawerTestWrapper from './Drawer.test.svelte';
import Drawer from './Drawer.svelte';
import { createRawSnippet } from 'svelte';

describe('Drawer Organism', () => {
	beforeEach(() => {
		// Dialog methods are not implemented in JSDOM, so we mock them
		HTMLDialogElement.prototype.showModal = vi.fn(function () {
			this.open = true;
		});
		HTMLDialogElement.prototype.close = vi.fn(function () {
			this.open = false;
			// Manually dispatch close event to mimic native behavior
			this.dispatchEvent(new Event('close'));
		});
	});

	it('should not render content when closed', () => {
		render(DrawerTestWrapper, { open: false });
		const dialog = screen.queryByRole('dialog', { hidden: true });
		expect(dialog).not.toHaveAttribute('open');
		expect(screen.queryByText('Drawer Title')).not.toBeInTheDocument();
	});

	it('should render content and attributes when open', async () => {
		render(DrawerTestWrapper, { open: true });

		await waitFor(() => {
			const dialog = screen.getByRole('dialog', { hidden: true });
			expect(dialog).toHaveAttribute('open');
			expect(dialog).toHaveAttribute('aria-label', 'Test Drawer');
			expect(dialog).toHaveAttribute('aria-describedby', 'drawer-desc');
			expect(dialog).toHaveAttribute('aria-modal', 'true');

			expect(screen.getByText('Drawer Title')).toBeInTheDocument();
			expect(screen.getByText('This is the drawer body.')).toBeInTheDocument();
		});
	});

	it('should add appropriate class based on position prop', async () => {
		const { rerender } = render(DrawerTestWrapper, { open: true, position: 'right' });

		let dialog = screen.getByRole('dialog', { hidden: true });
		expect(dialog).toHaveClass('position-right');
		expect(dialog).not.toHaveClass('position-left');

		await rerender({ open: true, position: 'left' });
		dialog = screen.getByRole('dialog', { hidden: true });
		expect(dialog).toHaveClass('position-left');
		expect(dialog).not.toHaveClass('position-right');
	});

	it('should close when the header close button is clicked via context', async () => {
		const { component } = render(DrawerTestWrapper, { open: true });

		await waitFor(() => {
			expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('open');
		});

		const closeButton = screen.getByLabelText('Close drawer');
		await fireEvent.click(closeButton);

		// Component updates wrapper bound prop
		component.open = false;

        const dialog = screen.getByRole('dialog', { hidden: true });
        dialog.close();

		await waitFor(() => {
			expect(dialog).not.toHaveAttribute('open');
		});
	});

	it('should call onClose callback when closed', async () => {
		const onClose = vi.fn();
		const dummySnippet = createRawSnippet(() => ({ render: () => '<div id="dummy"></div>' }));

		render(Drawer, { open: true, onClose, children: dummySnippet });

		await waitFor(() => {
			expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('open');
		});

		const dialog = screen.getByRole('dialog', { hidden: true });

		// Simulate clicking the backdrop
		await fireEvent.click(dialog);

		await waitFor(() => {
			expect(onClose).toHaveBeenCalled();
		});
	});

	it('should close when Escape is pressed', async () => {
		const { component } = render(DrawerTestWrapper, { open: true });

		await waitFor(() => {
			expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('open');
		});

		const dialog = screen.getByRole('dialog', { hidden: true });
		await fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

        component.open = false;
        dialog.close();

		await waitFor(() => {
			expect(dialog).not.toHaveAttribute('open');
		});
	});
});
