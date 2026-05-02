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
  let inputRef: HTMLInputElement | null = $state(null);
  let wrapperRef: HTMLDivElement | null = $state(null);

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
  class="multiselect-wrapper"
  bind:this={wrapperRef}
  class:disabled
  class:invalid={finalInvalid}
  class:valid={finalValid}
>
  <div
    class="multiselect-trigger"
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    role="combobox"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-controls="{finalId}-listbox"
    tabindex="0"
    {...rest}
  >
    <div class="selected-items">
      {#each selectedOptions as opt (opt.value)}
        <Badge variant="azul">
          {opt.label}
          <button
            type="button"
            class="remove-btn"
            aria-label="Remove {opt.label}"
            onclick={(e) => removeOption(e, opt.value)}
            onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') removeOption(e, opt.value); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </Badge>
      {/each}

      {#if searchable}
        <input
          type="text"
          id={finalId}
          class="search-input"
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
        <span class="placeholder-text">{placeholder}</span>
        <input
          type="text"
          id={finalId}
          class="sr-only-input"
          {disabled}
          aria-describedby={finalAriaDescribedby}
          aria-invalid={finalInvalid}
          required={finalRequired && value.length === 0}
          readonly
          aria-hidden="true"
        />
      {/if}
    </div>

    <svg class="chevron" class:open={isOpen} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
  </div>

  {#if isOpen}
    <div
      id="{finalId}-listbox"
      class="dropdown-menu"
      role="listbox"
      aria-multiselectable="true"
    >
      {#if filteredOptions.length === 0}
        <div class="empty-state">Nenhuma opção encontrada.</div>
      {:else}
        {#each filteredOptions as opt (opt.value)}
          <label class="dropdown-item">
            <Checkbox
              value={opt.value}
              checked={value.includes(opt.value)}
              onchange={(e) => {
                if (e.target.checked) {
                  value = [...value, opt.value];
                } else {
                  value = value.filter(v => v !== opt.value);
                }
              }}
              disabled={disabled}
              tabindex={isOpen ? 0 : -1}
            />
            <span class="item-label">{opt.label}</span>
          </label>
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .multiselect-wrapper {
    position: relative;
    width: 100%;
    font-family: var(--font-sans);
  }

  .multiselect-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 2.5rem;
    padding: 0.375rem 0.75rem;
    background-color: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: var(--r-1);
    cursor: pointer;
    transition: border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out);
  }

  .multiselect-trigger:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .invalid .multiselect-trigger {
    border-color: var(--vermelho);
    background-color: var(--vermelho-soft);
  }

  .invalid .multiselect-trigger:focus-visible {
    outline-color: var(--vermelho);
  }

  .valid .multiselect-trigger {
    border-color: var(--verde);
    background-color: var(--verde-soft);
  }

  .valid .multiselect-trigger:focus-visible {
    outline-color: var(--verde);
  }

  .disabled .multiselect-trigger {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--papel-10);
  }

  .selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    flex-grow: 1;
    align-items: center;
  }

  .remove-btn {
    background: none;
    border: none;
    padding: 0;
    margin-left: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
    opacity: 0.7;
    transition: opacity var(--dur-2) var(--ease-out);
  }

  .remove-btn:hover {
    opacity: 1;
  }

  .search-input {
    flex-grow: 1;
    min-width: 50px;
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    color: var(--fg);
    padding: 0;
    margin: 0;
  }

  .search-input:focus {
    outline: none;
  }

  .placeholder-text {
    color: var(--fg-muted);
    font-size: 1rem;
  }

  .sr-only-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .chevron {
    color: var(--concreto-60);
    margin-left: 0.5rem;
    pointer-events: none;
    transition: transform var(--dur-2) var(--ease-out);
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
    background-color: var(--papel-00);
    border: 1px solid var(--concreto-40);
    border-radius: 0;
    box-shadow: var(--shadow-2);
    z-index: 100;
    display: flex;
    flex-direction: column;
    opacity: 1;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    transition: background-color var(--dur-2) var(--ease-out);
    gap: 0.75rem;
    background-color: transparent;
  }

  .dropdown-item:hover {
    background-color: var(--papel-10);
  }

  .item-label {
    font-size: 1rem;
    color: var(--fg);
  }

  .empty-state {
    padding: 0.75rem;
    color: var(--concreto-60);
    font-size: var(--t-small);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .multiselect-trigger, .dropdown-item, .chevron, .remove-btn {
      transition: none;
    }
  }
</style>
