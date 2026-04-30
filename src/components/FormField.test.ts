import { render } from '@testing-library/svelte';
import FormField from './FormField.svelte';
import { html } from 'svelte/internal';
import TextInput from './TextInput.svelte';

test('renders error message and aria-live properly', () => {
  const { getByText, queryByText } = render(FormField, {
    label: 'Username',
    htmlFor: 'username',
    helper: 'Enter a valid username',
    error: 'Username is already taken',
    children: () => document.createElement('div')
  });

  const errorEl = getByText('Username is already taken');
  expect(errorEl.getAttribute('aria-live')).toBe('polite');

  // Should hide helper when error is present
  expect(queryByText('Enter a valid username')).toBeNull();
});

test('renders helper when no error is present', () => {
  const { getByText } = render(FormField, {
    label: 'Email',
    htmlFor: 'email',
    helper: 'We will not share your email',
    children: () => document.createElement('div')
  });

  expect(getByText('We will not share your email')).toBeInTheDocument();
});
