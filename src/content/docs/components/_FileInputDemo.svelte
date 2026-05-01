<script lang="ts">
	import FormField from '../../../components/FormField.svelte';
	import FileInput from '../../../components/FileInput.svelte';
	import Button from '../../../components/Button.svelte';
</script>

<div class="demo-wrapper">
	<div class="demo-section">
		<h4>Basic File Input</h4>
		<div class="field-container">
			<FormField id="basic-file" label="Upload Resume">
				<FileInput />
				{#snippet helper()}
					<p>PDF or DOCX, max 5MB.</p>
				{/snippet}
			</FormField>
		</div>
	</div>

	<div class="demo-section">
		<h4>Validation State</h4>
		<div class="field-container">
			<FormField id="invalid-file" label="Upload Profile Picture" invalid>
				<FileInput accept="image/png, image/jpeg" />
				{#snippet error()}
					<p>The selected file is too large. Max 2MB.</p>
				{/snippet}
			</FormField>
		</div>
	</div>

    <div class="demo-section">
		<h4>Multiple Files</h4>
		<div class="field-container">
			<FormField id="multiple-file" label="Upload Documents">
				<FileInput multiple />
			</FormField>
		</div>
	</div>

	<div class="demo-section">
		<h4>Sizes</h4>
		<div class="sizes-container">
			<FormField id="file-sm" label="Small Input">
				<FileInput size="sm" />
			</FormField>

			<FormField id="file-md" label="Medium Input">
				<FileInput size="md" />
			</FormField>

			<FormField id="file-lg" label="Large Input">
				<FileInput size="lg" />
			</FormField>
		</div>
	</div>

	<div class="demo-section">
		<h4>Disabled State</h4>
		<div class="field-container">
			<FormField id="disabled-file" label="Archive Upload">
				<FileInput disabled />
				{#snippet helper()}
					<p>Uploads are currently disabled for this record.</p>
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
</style>
