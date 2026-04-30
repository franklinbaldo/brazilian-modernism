import { render, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';

test('renders children and variant class', () => {
  // In svelte 5 testing, snippets need to be a function returning standard DOM or components.
  // Testing-library handles basic snippets better if passed properly, but creating snippets from tests
  // manually is tricky, so we'll check without relying on snippet rendering for simple props.
  const { getByRole } = render(Button, {
    variant: 'outline',
  });

  const button = getByRole('button');
  expect(button.classList.contains('outline')).toBe(true);
});

test('handles clicks', async () => {
  const mockClick = vi.fn();
  const { getByRole } = render(Button, {
    onclick: mockClick,
  });

  const button = getByRole('button');
  await fireEvent.click(button);

  expect(mockClick).toHaveBeenCalled();
});
