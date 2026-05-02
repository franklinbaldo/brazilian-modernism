<script lang="ts">
  import DataTable from '../../../components/DataTable.svelte';

  const headers = [
    { key: 'name', label: 'Nome' },
    { key: 'role', label: 'Função' },
    { key: 'city', label: 'Cidade' },
    { key: 'status', label: 'Status', align: 'center' }
  ];

  const data = [
    { name: 'Lina Bo Bardi', role: 'Arquiteta', city: 'São Paulo', status: 'Ativo' },
    { name: 'Oscar Niemeyer', role: 'Arquiteto', city: 'Rio de Janeiro', status: 'Concluído' },
    { name: 'Athos Bulcão', role: 'Artista', city: 'Brasília', status: 'Pendente' },
    { name: 'Burle Marx', role: 'Paisagista', city: 'Rio de Janeiro', status: 'Cancelado' }
  ];
</script>

<div class="demo-container br-component-class">
  <DataTable {headers} {data} caption="Mestres do Modernismo Brasileiro" variant="striped" />
</div>

<style>
  .demo-container {
    padding: 2rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-soft);
    margin: 2rem 0;
  }
</style>
