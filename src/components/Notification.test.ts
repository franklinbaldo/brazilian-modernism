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

  it('does not auto-dismiss when timeout is 0 or undefined', () => {
    vi.useFakeTimers();
    const ondismiss = vi.fn();
    render(Notification, {
      props: {
        title: 'No timeout',
        timeout: 0,
        ondismiss
      }
    });

    vi.advanceTimersByTime(5000);
    expect(ondismiss).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('auto-dismisses after the specified timeout', () => {
    vi.useFakeTimers();
    const ondismiss = vi.fn();
    render(Notification, {
      props: {
        title: 'Auto dismiss',
        timeout: 2000,
        ondismiss
      }
    });

    vi.advanceTimersByTime(1000);
    expect(ondismiss).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(ondismiss).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('pauses timeout on hover and resumes on leave', async () => {
    vi.useFakeTimers();
    const ondismiss = vi.fn();
    render(Notification, {
      props: {
        title: 'Hover pause',
        timeout: 2000,
        ondismiss
      }
    });

    const notification = screen.getByRole('status');

    vi.advanceTimersByTime(1000); // 1000ms elapsed, 1000ms left

    // Hover to pause
    await fireEvent.mouseEnter(notification);
    vi.advanceTimersByTime(2000); // Wait past original timeout
    expect(ondismiss).not.toHaveBeenCalled(); // Should be paused

    // Unhover to resume
    await fireEvent.mouseLeave(notification);
    vi.advanceTimersByTime(1000); // Wait the remaining 1000ms
    expect(ondismiss).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('has tabindex 0 when auto-dismissible and -1 otherwise', () => {
    const { unmount } = render(Notification, {
      props: {
        title: 'Auto dismiss',
        timeout: 2000
      }
    });

    let notification = screen.getByRole('status');
    expect(notification).toHaveAttribute('tabindex', '0');

    unmount();

    render(Notification, {
      props: {
        title: 'Static dismiss',
        timeout: 0
      }
    });

    notification = screen.getByRole('status');
    expect(notification).toHaveAttribute('tabindex', '-1');
  });

  it('pauses timeout on focus and resumes on blur', async () => {
    vi.useFakeTimers();
    const ondismiss = vi.fn();
    render(Notification, {
      props: {
        title: 'Focus pause',
        timeout: 2000,
        ondismiss
      }
    });

    const notification = screen.getByRole('status');

    vi.advanceTimersByTime(1000); // 1000ms elapsed, 1000ms left

    // Focus to pause
    await fireEvent.focusIn(notification);
    vi.advanceTimersByTime(2000); // Wait past original timeout
    expect(ondismiss).not.toHaveBeenCalled(); // Should be paused

    // Blur to resume
    await fireEvent.focusOut(notification);
    vi.advanceTimersByTime(1000); // Wait the remaining 1000ms
    expect(ondismiss).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
