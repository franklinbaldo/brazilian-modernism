import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import FileInput from './FileInput.svelte';
import FileInputContextTest from './FileInputContext.test.svelte';

describe('FileInput Component', () => {
	it('renders correctly as a file input', () => {
		render(FileInput, { props: { id: 'test-file' } });
		const inputs = document.querySelectorAll('input[type="file"]');
		expect(inputs.length).toBe(1);
		expect(inputs[0].id).toBe('test-file');
	});

	it('applies accept and multiple properties correctly', () => {
		render(FileInput, { props: { accept: 'image/*', multiple: true } });
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		expect(input).not.toBeNull();
		expect(input.accept).toBe('image/*');
		expect(input.multiple).toBe(true);
	});

	it('applies the disabled state', () => {
		render(FileInput, { props: { disabled: true } });
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		expect(input.disabled).toBe(true);
	});

	it('applies the invalid state directly', () => {
		render(FileInput, { props: { invalid: true } });
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(input.classList.contains('invalid')).toBe(true);
	});

	it('applies size classes correctly', () => {
		render(FileInput, { props: { size: 'lg' } });
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		expect(input.classList.contains('file-input-lg')).toBe(true);
	});

	it('renders valid state class', () => {
		render(FileInput, { props: { valid: true } });
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		expect(input.classList.contains('valid')).toBe(true);
	});

	it('prioritizes invalid state over valid state', () => {
		render(FileInput, { props: { invalid: true, valid: true } });
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		expect(input.classList.contains('invalid')).toBe(true);
		expect(input.classList.contains('valid')).toBe(false);
		expect(input.getAttribute('aria-invalid')).toBe('true');
	});

	it('inherits properties from cobogo-form-field context', () => {
		render(FileInputContextTest);
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;

		expect(input.id).toBe('ctx-id');
		expect(input.getAttribute('aria-describedby')).toBe('ctx-desc');
		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(input.required).toBe(true);
		expect(input.classList.contains('invalid')).toBe(true);
	});
});
