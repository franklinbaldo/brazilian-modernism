import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ColumnTest from './Column.test.svelte';

describe('Column Atom', () => {
	it('should render with default span 12', () => {
		render(ColumnTest);
		const column = screen.getByTestId('column');
		expect(column).toBeInTheDocument();
		expect(column).toHaveStyle({ '--col-span': '12' });
	});

	it('should apply responsive span variables', () => {
		render(ColumnTest, { props: { span: 12, sm: 6, md: 4, lg: 3 } });
		const column = screen.getByTestId('column');
		expect(column).toHaveStyle({
			'--col-span': '12',
			'--col-sm': '6',
			'--col-md': '4',
			'--col-lg': '3'
		});
	});

	it('should apply start offset', () => {
		render(ColumnTest, { props: { span: 6, start: 3 } });
		const column = screen.getByTestId('column');
		expect(column).toHaveStyle({
			'--col-span': '6',
			'grid-column-start': '3'
		});
	});

	it('should render as a different HTML element', () => {
		render(ColumnTest, { props: { as: 'article' } });
		const column = screen.getByTestId('column');
		expect(column.tagName).toBe('ARTICLE');
	});
});
