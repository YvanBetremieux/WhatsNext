import db from './db.js';

// Vérifier si la table est vide
const count = db.prepare('SELECT COUNT(*) as count FROM vehicules').get();

if (count.count === 0) {
  console.log('Ajout de données de test...');

  const insert = db.prepare('INSERT INTO vehicules (type, marque, modele) VALUES (?, ?, ?)');

  const vehicules = [
    ['Voiture', 'Renault', 'Clio'],
    ['Voiture', 'Peugeot', '208'],
    ['Voiture', 'Citroën', 'C3'],
    ['Voiture', 'Volkswagen', 'Golf'],
    ['Voiture', 'Toyota', 'Yaris'],
    ['SUV', 'Renault', 'Captur'],
    ['SUV', 'Peugeot', '3008'],
    ['SUV', 'Nissan', 'Qashqai'],
    ['SUV', 'Dacia', 'Duster'],
    ['SUV', 'Volkswagen', 'Tiguan'],
    ['Moto', 'Yamaha', 'MT-07'],
    ['Moto', 'Honda', 'CBR'],
    ['Moto', 'Kawasaki', 'Ninja'],
    ['Moto', 'Suzuki', 'GSX-R'],
    ['Moto', 'BMW', 'R1250GS'],
    ['Camion', 'Mercedes', 'Actros'],
    ['Camion', 'Volvo', 'FH16'],
    ['Camion', 'Scania', 'R500'],
    ['Camion', 'MAN', 'TGX'],
    ['Camion', 'Iveco', 'Stralis'],
    ['Voiture', 'BMW', 'Série 3'],
    ['Voiture', 'Audi', 'A4'],
    ['Voiture', 'Mercedes', 'Classe C'],
    ['SUV', 'Range Rover', 'Evoque'],
    ['SUV', 'Jeep', 'Compass']
  ];

  vehicules.forEach(([type, marque, modele]) => {
    insert.run(type, marque, modele);
  });

  console.log(`${vehicules.length} véhicules ajoutés avec succès !`);
} else {
  console.log('La base de données contient déjà des données.');
}
