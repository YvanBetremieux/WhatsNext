<script>
  import { onMount } from 'svelte';

  let vehicules = [];
  let pagination = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  };
  let loading = true;

  async function loadVehicules(page = 1) {
    loading = true;
    try {
      const response = await fetch(`/api/vehicules?page=${page}&limit=${pagination.limit}`);
      const data = await response.json();
      vehicules = data.vehicules;
      pagination = data.pagination;
    } catch (error) {
      console.error('Erreur lors du chargement des véhicules:', error);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadVehicules();
  });

  function changePage(newPage) {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      loadVehicules(newPage);
    }
  }
</script>

<div class="container">
  <header>
    <h1>WhatsNext - Gestion de Véhicules</h1>
    <p class="subtitle">Liste des véhicules disponibles</p>
  </header>

  {#if loading}
    <div class="loading">Chargement...</div>
  {:else}
    <div class="stats">
      <span>Total: {pagination.total} véhicules</span>
      <span>Page {pagination.page} sur {pagination.totalPages}</span>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Marque</th>
            <th>Modèle</th>
          </tr>
        </thead>
        <tbody>
          {#each vehicules as vehicule}
            <tr>
              <td>{vehicule.id}</td>
              <td><span class="badge badge-{vehicule.type.toLowerCase()}">{vehicule.type}</span></td>
              <td>{vehicule.marque}</td>
              <td>{vehicule.modele}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button
        on:click={() => changePage(1)}
        disabled={pagination.page === 1}
      >
        ⏮ Première
      </button>
      <button
        on:click={() => changePage(pagination.page - 1)}
        disabled={pagination.page === 1}
      >
        ← Précédent
      </button>
      <span class="page-info">
        Page {pagination.page} / {pagination.totalPages}
      </span>
      <button
        on:click={() => changePage(pagination.page + 1)}
        disabled={pagination.page === pagination.totalPages}
      >
        Suivant →
      </button>
      <button
        on:click={() => changePage(pagination.totalPages)}
        disabled={pagination.page === pagination.totalPages}
      >
        Dernière ⏭
      </button>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  header {
    text-align: center;
    color: white;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 3rem;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-top: 0.5rem;
  }

  .stats {
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-weight: 500;
    color: #333;
  }

  .loading {
    text-align: center;
    font-size: 1.5rem;
    color: white;
    padding: 3rem;
  }

  .table-container {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  tbody tr:hover {
    background: #f8f9ff;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  .badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .badge-voiture {
    background: #e3f2fd;
    color: #1976d2;
  }

  .badge-suv {
    background: #f3e5f5;
    color: #7b1fa2;
  }

  .badge-moto {
    background: #fff3e0;
    color: #e65100;
  }

  .badge-camion {
    background: #e8f5e9;
    color: #2e7d32;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  button {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }

  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .page-info {
    padding: 0 1rem;
    font-weight: 500;
    color: #333;
  }
</style>
