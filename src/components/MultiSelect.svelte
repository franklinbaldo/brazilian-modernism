<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import Badge from './Badge.svelte';
  import Checkbox from './Checkbox.svelte';

  /**
   * MultiSelect Component
   *
   * A form organism combining a text input (for search/filtering) and a dropdown
   * of checkboxes to allow selecting multiple options. The selected options are
   * displayed as chips inside the input area.
   */
  type Props = {
    value?: string[];
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    valid?: boolean;
    searchable?: boolean;
    id?: string;
    [key: string]: any;
  };

  let {
    value = $bindable([]),
    options,
    placeholder = 'Selecione...',
    disabled = false,
    invalid = false,
    valid = false,
    searchable = false,
    id,
    ...rest
  }: Props = $props();

  const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; valid: boolean; required: boolean }>('cobogo-form-field');
  let ctx = $derived(formFieldContext ? formFieldContext() : null);

  let finalId = $derived(id || ctx?.id || 'multiselect-' + Math.random().toString(36).slice(2, 9));
  let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
  let finalInvalid = $derived(invalid || ctx?.invalid || false);
  let finalValid = $derived((valid || ctx?.valid || false) && !finalInvalid);
  let finalRequired = $derived(rest.required || ctx?.required || false);

  let isOpen = $state(false);
  let searchQuery = $state('');
  let inputRef = $state<HTMLInputElement | null>(null);
  let wrapperRef = $state<HTMLDivElement | null>(null);

  let filteredOptions = $derived(
    searchable && searchQuery
      ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options
  );

  let selectedOptions = $derived(
    options.filter(opt => value.includes(opt.value))
  );

  function toggleDropdown() {
    if (disabled) return;
    isOpen = !isOpen;
    if (isOpen && inputRef) {
      inputRef.focus();
    }
  }

  function closeDropdown() {
    isOpen = false;
    searchQuery = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === 'Escape') {
      closeDropdown();
      if (inputRef) inputRef.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!searchable || (searchable && searchQuery === '')) {
         if (e.target === inputRef || e.target === wrapperRef) {
            e.preventDefault();
            toggleDropdown();
         }
      }
    } else if (e.key === 'ArrowDown') {
      if (!isOpen) {
        isOpen = true;
      }
    }
  }

  function removeOption(e: MouseEvent | KeyboardEvent, valToRemove: string) {
    e.stopPropagation();
    value = value.filter(v => v !== valToRemove);
  }

  onMount(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef && !wrapperRef.contains(e.target as Node)) {
        closeDropdown();
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div
  data-multiselect
  data-state={finalInvalid ? 'invalid' : finalValid ? 'valid' : undefined}
  data-disabled={disabled ? '' : undefined}
  bind:this={wrapperRef}
>
  <div
    data-multiselect-trigger
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    role="combobox"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-controls="{finalId}-listbox"
    tabindex="0"
    {...rest}
  >
    <div data-multiselect-tags>
      {#each selectedOptions as opt (opt.value)}
        <Badge intent="azul">
          {opt.label}
          <button
            type="button"
            data-intent="link"
            aria-label={`Remove ${opt.label}`}
            onclick={(e) => removeOption(e, opt.value)}
            onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') removeOption(e, opt.value); }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </Badge>
      {/each}

      {#if searchable}
        <input
          type="text"
          id={finalId}
          data-multiselect-search
          bind:this={inputRef}
          bind:value={searchQuery}
          placeholder={selectedOptions.length === 0 ? placeholder : ''}
          {disabled}
          aria-describedby={finalAriaDescribedby}
          aria-invalid={finalInvalid}
          required={finalRequired && value.length === 0}
          autocomplete="off"
        />
      {:else if selectedOptions.length === 0}
        <span data-multiselect-placeholder>{placeholder}</span>
        <input
          type="text"
          id={finalId}
          hidden
          {disabled}
          aria-describedby={finalAriaDescribedby}
          aria-invalid={finalInvalid}
          required={finalRequired && value.length === 0}
          readonly
          aria-hidden="true"
        />
      {/if}
    </div>

    <svg data-multiselect-chevron data-open={isOpen ? '' : undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
  </div>

  {#if isOpen}
    <div
      id="{finalId}-listbox"
      data-listbox
      role="listbox"
      aria-multiselectable="true"
    >
      {#if filteredOptions.length === 0}
        <p data-empty>Nenhuma opção encontrada.</p>
      {:else}
        {#each filteredOptions as opt (opt.value)}
          <label>
            <Checkbox
              value={opt.value}
              checked={value.includes(opt.value)}
              onchange={(e) => {
                if (e.target.checked) {
                  value = [...value, opt.value];
                } else {
                  value = value.filter((v) => v !== opt.value);
                }
              }}
              disabled={disabled}
              tabindex={isOpen ? 0 : -1}
            />
            <span>{opt.label}</span>
          </label>
        {/each}
      {/if}
    </div>
  {/if}
</div>

