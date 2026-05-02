<script lang="ts">
	import FormField from '../../../components/FormField.svelte';
	import Combobox from '../../../components/Combobox.svelte';

	let stateValue = $state('');

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
		<h4>Basic Combobox</h4>
		<div class="field-container">
			<FormField id="state-select" label="Select a State">
				<Combobox options={states} bind:value={stateValue} placeholder="Type to filter..." />
				{#snippet helper()}
					<p>Start typing to filter the {states.length} available states.</p>
				{/snippet}
			</FormField>
		</div>
		<p class="mt-4 text-sm text-concreto-60">
			<strong>Current Value:</strong> {stateValue || 'None selected'}
		</p>
	</div>

	<div class="demo-section">
		<h4>Validation State</h4>
		<div class="field-container">
			<FormField id="state-select-invalid" label="Destination State" invalid>
				<Combobox options={states} placeholder="Search states..." />
				{#snippet error()}
					<p>This state is not currently serviced. Please select another.</p>
				{/snippet}
			</FormField>
		</div>
	</div>

	<div class="demo-section">
		<h4>Sizes</h4>
		<div class="sizes-container">
			<FormField id="cb-sm" label="Small Combobox">
				<Combobox size="sm" options={states} placeholder="Small..." />
			</FormField>

			<FormField id="cb-md" label="Medium Combobox">
				<Combobox size="md" options={states} placeholder="Medium..." />
			</FormField>

			<FormField id="cb-lg" label="Large Combobox">
				<Combobox size="lg" options={states} placeholder="Large..." />
			</FormField>
		</div>
	</div>

	<div class="demo-section">
		<h4>Disabled State</h4>
		<div class="field-container">
			<FormField id="disabled-cb" label="Historical Region">
				<Combobox options={states} disabled value="pe" />
				{#snippet helper()}
					<p>This selection cannot be changed.</p>
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

	.sizes-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 400px;
	}

	.mt-4 { margin-top: 1rem; }
	.text-sm { font-size: var(--t-small); }
	.text-concreto-60 { color: var(--concreto-60); }
</style>
