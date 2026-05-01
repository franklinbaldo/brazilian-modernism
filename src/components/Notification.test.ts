import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Notification from './Notification.svelte';

describe('Notification', () => {
  it('renders correctly with title and message', () => {
    render(Notification, {
      props: {
        title: 'Task Completed',
        message: 'Your report has been successfully generated.',
        intent: 'info'
      }
    });

    expect(screen.getByText('Task Completed')).toBeInTheDocument();
    expect(screen.getByText('Your report has been successfully generated.')).toBeInTheDocument();

    const notification = screen.getByRole('status');
    expect(notification).toBeInTheDocument();
    expect(notification.className).toContain('br-notification--info');
  });

  it('renders different intents with correct aria roles', () => {
    const { unmount } = render(Notification, {
      props: { title: 'Danger', intent: 'danger' }
    });

    let el = screen.getByRole('alert');
    expect(el).toBeInTheDocument();
    expect(el.className).toContain('br-notification--danger');
    unmount();

    render(Notification, {
      props: { title: 'Success', intent: 'tip' }
    });

    el = screen.getByRole('status');
    expect(el).toBeInTheDocument();
    expect(el.className).toContain('br-notification--tip');
  });

  it('can be dismissed when dismissible is true', async () => {
    const ondismiss = vi.fn();
    render(Notification, {
      props: {
        title: 'Dismiss me',
        dismissible: true,
        ondismiss
      }
    });

    const closeBtn = screen.getByRole('button', { name: /dismiss/i });
    expect(closeBtn).toBeInTheDocument();

    await fireEvent.click(closeBtn);

    expect(ondismiss).toHaveBeenCalledTimes(1);
  });

  it('hides the close button when dismissible is false', () => {
    render(Notification, {
      props: {
        title: 'Cannot dismiss',
        dismissible: false
      }
    });

    const closeBtn = screen.queryByRole('button', { name: /dismiss/i });
    expect(closeBtn).toBeNull();
  });
});
