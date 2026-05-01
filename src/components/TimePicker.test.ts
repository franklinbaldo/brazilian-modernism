import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import TimePicker from './TimePicker.svelte';

describe('TimePicker', () => {
	it('renders correctly', () => {
		render(TimePicker, { value: '14:30' });
		const input = document.querySelector('input[type="time"]');
		expect(input).toBeTruthy();
		expect((input as HTMLInputElement).value).toBe('14:30');
	});

	it('applies invalid state via props', () => {
		render(TimePicker, { invalid: true });
		const input = document.querySelector('input[type="time"]') as HTMLInputElement;
		expect(input.classList.contains('invalid')).toBe(true);
		expect(input.getAttribute('aria-invalid')).toBe('true');
	});

	it('applies size class', () => {
		render(TimePicker, { size: 'sm' });
		const input = document.querySelector('input[type="time"]') as HTMLInputElement;
		expect(input.classList.contains('time-picker-sm')).toBe(true);
	});
});

import TimePickerContext from './TimePickerContext.test.svelte';

describe('TimePicker with FormField', () => {
	it('inherits invalid and required states from context', () => {
		render(TimePickerContext, { invalid: true, required: true });
		const input = document.querySelector('input[type="time"]') as HTMLInputElement;
		expect(input.classList.contains('invalid')).toBe(true);
		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(input.required).toBe(true);
		expect(input.id).toBe('time-input');
		expect(input.getAttribute('aria-describedby')).toBe('time-helper');
	});
});
