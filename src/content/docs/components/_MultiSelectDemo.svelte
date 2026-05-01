<script lang="ts">
	import FormField from '../../../components/FormField.svelte';
	import MultiSelect from '../../../components/MultiSelect.svelte';

	let basicValue = $state(['rj']);
	let searchValue = $state([]);

	const states = [
		{ value: 'ac', label: 'Acre' },
		{ value: 'al', label: 'Alagoas' },
		{ value: 'ap', label: 'Amapá' },
		{ value: 'am', label: 'Amazonas' },
		{ value: 'ba', label: 'Bahia' },
		{ value: 'ce', label: 'Ceará' },
		{ value: 'df', label: 'Distrito Federal' },
		{ value: 'es', label: 'Espírito Santo' },
		{ value: 'go', label: 'Goiás' },
		{ value: 'ma', label: 'Maranhão' },
		{ value: 'mt', label: 'Mato Grosso' },
		{ value: 'ms', label: 'Mato Grosso do Sul' },
		{ value: 'mg', label: 'Minas Gerais' },
		{ value: 'pa', label: 'Pará' },
		{ value: 'pb', label: 'Paraíba' },
		{ value: 'pr', label: 'Paraná' },
		{ value: 'pe', label: 'Pernambuco' },
		{ value: 'pi', label: 'Piauí' },
		{ value: 'rj', label: 'Rio de Janeiro' },
		{ value: 'rn', label: 'Rio Grande do Norte' },
		{ value: 'rs', label: 'Rio Grande do Sul' },
		{ value: 'ro', label: 'Rondônia' },
		{ value: 'rr', label: 'Roraima' },
		{ value: 'sc', label: 'Santa Catarina' },
		{ value: 'sp', label: 'São Paulo' },
		{ value: 'se', label: 'Sergipe' },
		{ value: 'to', label: 'Tocantins' }
	];
</script>

<div class="demo-wrapper">
	<div class="demo-section">
		<h4>Basic MultiSelect</h4>
		<div class="field-container">
			<FormField id="basic-multi" label="Select Regions">
				<MultiSelect options={states} bind:value={basicValue} placeholder="Select states..." />
				{#snippet helper()}
					<p>Select the states for the new policy coverage.</p>
				{/snippet}
			</FormField>
		</div>
		<p class="mt-4 text-sm text-concreto-60">
			<strong>Current Value:</strong> {basicValue.length > 0 ? basicValue.join(', ') : 'None selected'}
		</p>
	</div>

	<div class="demo-section">
		<h4>Searchable MultiSelect</h4>
		<div class="field-container">
			<FormField id="search-multi" label="Searchable Regions">
				<MultiSelect options={states} bind:value={searchValue} searchable placeholder="Search states to add..." />
				{#snippet helper()}
					<p>Type to filter the {states.length} available states.</p>
				{/snippet}
			</FormField>
		</div>
		<p class="mt-4 text-sm text-concreto-60">
			<strong>Current Value:</strong> {searchValue.length > 0 ? searchValue.join(', ') : 'None selected'}
		</p>
	</div>

	<div class="demo-section">
		<h4>Validation State</h4>
		<div class="field-container">
			<FormField id="multi-invalid" label="Restricted Regions" invalid>
				<MultiSelect options={states} value={['sp', 'rj']} />
				{#snippet error()}
					<p>These regions cannot be selected together under current legislation.</p>
				{/snippet}
			</FormField>
		</div>
	</div>

	<div class="demo-section">
		<h4>Disabled State</h4>
		<div class="field-container">
			<FormField id="disabled-multi" label="Historical Record">
				<MultiSelect options={states} disabled value={['mg', 'ba']} />
				{#snippet helper()}
					<p>Historical selections cannot be altered.</p>
				{/snippet}
			</FormField>
		</div>
	</div>
</div>

<style>
	.demo-wrapper {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding: 2rem;
		background: var(--papel-10);
		border: 1px solid var(--border);
		border-radius: var(--r-soft);
	}

	.demo-section h4 {
		margin-top: 0;
		margin-bottom: 1rem;
		font-family: var(--font-display);
		font-size: 1.125rem;
		color: var(--fg-heading);
	}

	.field-container {
		max-width: 400px;
	}

	.mt-4 { margin-top: 1rem; }
	.text-sm { font-size: var(--t-small); }
	.text-concreto-60 { color: var(--concreto-60); }
</style>
