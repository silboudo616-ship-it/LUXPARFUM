export const perfumes = [
  {
    id: 'p1',
    name: 'Tom Ford Noir',
    collection: 'Master',
    gender: 'Hommes',
    price: 185000,
    volume: '50ml',
    origin: 'États-Unis',
    olfactoryFamily: 'Boisé Épicé',
    notes: 'Bergamote, Poivre Noir, Bois de Santal',
    availability: 'Disponible',
    masterDetails: {
      available: 15,
      total: 50
    },
    image: 'https://www.tomfordbeauty.com/cdn/shop/files/tf_sku_T01H01_2000x2000_1.jpg',
    imageAlt: 'Flacon Tom Ford',
    description: 'Une fragrance mystérieuse et audacieuse. Le raffinement absolu pour un homme de caractère avec des notes épicées et boisées.'
  },
  {
    id: 'p2',
    name: 'Vanilla Voyage',
    collection: 'Premium',
    gender: 'Femmes',
    price: 45000,
    volume: '100ml',
    origin: 'Dubaï (Maison Asrar)',
    olfactoryFamily: 'Oriental Vanillé',
    notes: 'Vanille, Musc, Ambre Doux',
    availability: 'Disponible',
    image: 'https://maisonasrar.com/cdn/shop/files/Vanilla_Voyage_Maison_Asrar_Perfume_White_Background_Bottle.webp',
    imageAlt: 'Flacon Vanilla Voyage',
    description: 'Une évasion sensorielle douce et élégante. La vanille s\'entrelace avec des notes orientales pour offrir un sillage gourmand et luxueux.'
  },
  {
    id: 'p3',
    name: 'Mousuf',
    collection: 'Standard',
    gender: 'Mixte',
    price: 15000,
    volume: '100ml',
    origin: 'Dubaï (Lattafa)',
    olfactoryFamily: 'Boisé Gourmand',
    notes: 'Chocolat, Oud, Musc',
    availability: 'Disponible',
    image: 'https://luxurious-fragrances.com/wp-content/uploads/2025/08/eau-de-parfum-mousuf.jpg',
    imageAlt: 'Flacon Mousuf',
    description: 'Un parfum irrésistible et unisexe. Des notes gourmandes de chocolat se marient à la profondeur de l\'oud et la pureté du musc.'
  },
  {
    id: 'p4',
    name: 'Nuit Éternelle',
    collection: 'Master',
    gender: 'Mixte',
    price: 150000,
    volume: '100ml',
    origin: 'Paris, France',
    olfactoryFamily: 'Cuir Boisé',
    notes: 'Cuir de Russie, Iris de Florence, Fève Tonka',
    availability: 'Édition limitée',
    masterDetails: {
      available: 87,
      total: 300
    },
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Flacon Nuit Éternelle — Édition Master',
    description: 'Un chef-d\'œuvre absolu. L\'édition Master représente le pinacle de notre savoir-faire, une création numérotée pour les collectionneurs les plus exigeants.'
  },
  {
    id: 'p5',
    name: 'Lumière d\'Orient',
    collection: 'Standard',
    gender: 'Femmes',
    price: 7500,
    volume: '50ml',
    origin: 'Dubaï, Émirats Arabes',
    olfactoryFamily: 'Floral Boisé',
    notes: 'Jasmin, Santal, Muscs blancs',
    availability: 'Disponible',
    image: 'https://images.unsplash.com/photo-1560963689-b5682b6440f8?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Flacon Lumière d\'Orient',
    description: 'Un hommage à l\'Orient lumineux. Le jasmin s\'épanouit sur un fond de santal chaud et de muscs soyeux.'
  },
  {
    id: 'p6',
    name: 'Bois de Cèdre',
    collection: 'Premium',
    gender: 'Hommes',
    price: 32000,
    volume: '100ml',
    origin: 'Liban',
    olfactoryFamily: 'Boisé Aromatique',
    notes: 'Cèdre du Liban, Vétiver de Haïti, Poivre noir',
    availability: 'Sur réservation',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Flacon Bois de Cèdre',
  },
  {
    id: 'p7',
    name: 'LIQUID BRUN',
    collection: 'Premium',
    gender: 'Hommes',
    price: 25000,
    volume: '100ml',
    origin: 'French Avenue et Fragrance World',
    olfactoryFamily: 'orientale, boisée et gourmande.',
    notes: 'liquid brun appartient au registre des parfums chauds, épicés, boisés et gourmands.',
    availability: 'Disponible',
    image: 'https://cdn.notinoimg.com/detail_main_lq/french_avenue/6290360375694_02-o/liquid-brun___250214.jpg',
    imageAlt: 'Flacon LIQUID BRUN',
    description: 'LIQUID BRUN- l\'élégance dans toute sa profondeur. Une fragrance chaleureuse et séduisante, pensé pour l\'homme qui apprécie les accords enveloppants et les sillages au caractère affirmé. son univers boisé et gourmand apporte une touche de sophistication, idéale pour les soirées où chaque détail compte. liquid brun appartient au registre des parfums chauds, épicés, boisés et gourmands. A PORTER: En soirée et lors des sorties. Pendant les périodes fraîches. Pour un rendez-vous ou une occasion spéciale.',
    type: 'Eau de Parfum',
    duration: '8 à 12heures'
  }
];

export const collections = ['Standard', 'Premium', 'Légende', 'Master'];
export const genders = ['Hommes', 'Femmes', 'Mixte'];

export const mockReviews = {
  p1: [
    { id: 'r1', author: 'Thierry M.', rating: 5, comment: 'Un accord boisé d\'une rare profondeur. Le sillage dure toute la journée sans jamais être oppressant. Une découverte absolue.', date: 'Septembre 2026' },
    { id: 'r2', author: 'Karim D.', rating: 5, comment: 'Élégant, masculin, moderne. C\'est exactement ce que je cherchais. La cardamome en tête de note est sublime.', date: 'Août 2026' }
  ],
  p2: [
    { id: 'r3', author: 'Éléonore G.', rating: 5, comment: 'La Rose Nocturne est tout simplement envoûtante. L\'oud apporte une profondeur orientale qui rend ce parfum totalement unique.', date: 'Octobre 2026' }
  ]
};
