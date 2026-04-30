import { render, fireEvent } from '@testing-library/svelte';
import Pagination from './Pagination.svelte';

test('renders pagination buttons and handles clicks', async () => {
  const onPageChange = vi.fn();

  const { getByRole, getByLabelText } = render(Pagination, {
    currentPage: 1,
    totalPages: 5,
    onPageChange
  });

  const nextBtn = getByLabelText('Next page');
  await fireEvent.click(nextBtn);

  expect(onPageChange).toHaveBeenCalledWith(2);
});

test('handles disabled states correctly', () => {
  const onPageChange = vi.fn();

  const { getByLabelText } = render(Pagination, {
    currentPage: 1,
    totalPages: 5,
    onPageChange
  });

  const prevBtn = getByLabelText('Previous page') as HTMLButtonElement;
  expect(prevBtn.disabled).toBe(true);
  expect(prevBtn.getAttribute('aria-disabled')).toBe('true');
});
