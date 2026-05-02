import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import DatePicker from './DatePicker.svelte';
import FormFieldWrapper from './FormFieldWrapper.test.svelte'; // Reuse existing wrapper if any, or test directly

describe('DatePicker', () => {
	it('renders correctly', () => {
		render(DatePicker, { value: '2026-05-01' });
		const input = document.querySelector('input[type="date"]');
		expect(input).toBeTruthy();
		expect((input as HTMLInputElement).value).toBe('2026-05-01');
	});

	it('applies invalid state via props', () => {
		render(DatePicker, { invalid: true });
		const input = document.querySelector('input[type="date"]') as HTMLInputElement;
		expect(input.classList.contains('invalid')).toBe(true);
		expect(input.getAttribute('aria-invalid')).toBe('true');
	});

	it('applies size class', () => {
		render(DatePicker, { size: 'lg' });
		const input = document.querySelector('input[type="date"]') as HTMLInputElement;
		expect(input.classList.contains('date-picker-lg')).toBe(true);
	});

	it('renders valid state class', () => {
		render(DatePicker, { valid: true });
		const input = document.querySelector('input[type="date"]') as HTMLInputElement;
		expect(input.classList.contains('valid')).toBe(true);
	});

	it('prioritizes invalid state over valid state', () => {
		render(DatePicker, { invalid: true, valid: true });
		const input = document.querySelector('input[type="date"]') as HTMLInputElement;
		expect(input.classList.contains('invalid')).toBe(true);
		expect(input.classList.contains('valid')).toBe(false);
		expect(input.getAttribute('aria-invalid')).toBe('true');
	});
});

import DatePickerContext from './DatePickerContext.test.svelte';

describe('DatePicker with FormField', () => {
	it('inherits invalid and required states from context', () => {
		render(DatePickerContext, { invalid: true, required: true });
		const input = document.querySelector('input[type="date"]') as HTMLInputElement;
		expect(input.classList.contains('invalid')).toBe(true);
		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(input.required).toBe(true);
		expect(input.id).toBe('date-input');
		expect(input.getAttribute('aria-describedby')).toBe('date-helper');
	});
});
