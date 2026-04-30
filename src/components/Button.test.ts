import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button Component', () => {
  it('renders the button correctly with default props', () => {
    const { container } = render(Button);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button primary');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('triggers onclick when clicked', async () => {
    const onClickMock = vi.fn();
    const { container } = render(Button, { props: { onclick: onClickMock } });
    const button = container.querySelector('button') as HTMLButtonElement;
    await fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation (Enter/Space natively click buttons)', async () => {
    const onKeyDownMock = vi.fn();
    const { container } = render(Button, { props: { onkeydown: onKeyDownMock } });
    const button = container.querySelector('button') as HTMLButtonElement;
    button.focus();
    expect(button).toHaveFocus();

    // Test rest props forwarding of onkeydown
    await fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
  });

  it('spreads ...rest props such as aria-labels correctly', () => {
    const { container } = render(Button, { props: { 'aria-label': 'Custom Label' } });
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label', 'Custom Label');
  });
});
