<script lang="ts">
  import Timeline from '../../../components/Timeline.svelte';

  const events = [
    {
      date: '21 Abr 1960',
      title: 'Inauguração de Brasília',
      description: 'Transferência da capital federal para o centro-oeste do país.',
      status: 'done' as const
    },
    {
      date: '07 Nov 1968',
      title: 'Inauguração do MASP',
      description: 'Lina Bo Bardi entrega o Museu de Arte de São Paulo.',
      status: 'done' as const
    },
    {
      date: 'Presente',
      title: 'Manutenção do Legado',
      description: 'Preservação contínua da arquitetura modernista.',
      status: 'active' as const
    },
    {
      date: 'Futuro',
      title: 'Novas Formas',
      description: 'Adaptação dos princípios modernistas para novas tecnologias.',
      status: 'pending' as const
    }
  ];
</script>

<div class="demo-container br-component-class">
  <Timeline items={events} />
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
