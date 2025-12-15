import { json } from '@sveltejs/kit';
import db from '$lib/db.js';

export function GET({ url }) {
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  // Récupérer le nombre total de véhicules
  const totalResult = db.prepare('SELECT COUNT(*) as count FROM vehicules').get();
  const total = totalResult.count;

  // Récupérer les véhicules paginés
  const vehicules = db
    .prepare('SELECT * FROM vehicules ORDER BY id DESC LIMIT ? OFFSET ?')
    .all(limit, offset);

  return json({
    vehicules,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
}
