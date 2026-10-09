import React from 'react';
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import './Account.css';

/* ── MOCK DATA ── */
const mockOrders = [
  {
    id: 'LP-2026-000124',
    date: '15 Octobre 2026',
    product: 'Ébène Précieux',
    qty: 1,
    total: 8500,
    status: 'Livré',
    statusColor: '#5a7a5a',
  }
];
const mockReservations = [
  {
    id: 'RES-2026-00041',
    date: '01 Octobre 2026',
    product: 'Rose Nocturne',
    collection: 'Premium',
    status: 'En cours',
    statusColor: 'var(--gold)',
  }
];

/* ── SIDEBAR LAYOUT ── */
const AccountLayout = ({ children }) => {
  return (
    <div className="account-page">
      <aside className="account-sidebar">
        <div className="account-sidebar__top">
          <div className="account-avatar">S</div>
          <div>
            <p className="account-name">Salif</p>
            <p className="account-email t-label">salif@luxparfum.com</p>
          </div>
        </div>

        <nav className="account-nav" aria-label="Navigation compte">
          <NavLink to="/compte" end className={({isActive}) => `account-nav__link ${isActive ? 'active' : ''}`}>Tableau de bord</NavLink>
          <NavLink to="/compte/commandes"    className={({isActive}) => `account-nav__link ${isActive ? 'active' : ''}`}>Mes Commandes</NavLink>
          <NavLink to="/compte/reservations" className={({isActive}) => `account-nav__link ${isActive ? 'active' : ''}`}>Mes Réservations</NavLink>
          <NavLink to="/compte/recus"        className={({isActive}) => `account-nav__link ${isActive ? 'active' : ''}`}>Mes Reçus</NavLink>
          <NavLink to="/compte/avis"         className={({isActive}) => `account-nav__link ${isActive ? 'active' : ''}`}>Mes Avis</NavLink>
        </nav>

        <button className="account-logout" onClick={() => alert('Déconnexion simulée')}>
          Déconnexion
        </button>
      </aside>

      <main className="account-main">
        {children}
      </main>
    </div>
  );
};

/* ── DASHBOARD ── */
const Dashboard = () => (
  <div className="account-section">
    <p className="t-label" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Mon Cabinet Olfactif</p>
    <h1 className="account-section__title">Bonjour, Salif.</h1>
    <p className="t-body" style={{ marginTop: '0.5rem', color: 'var(--grey)' }}>Bienvenue dans votre espace personnel Lux Parfum.</p>

    <div className="account-cards">
      <Link to="/compte/commandes" className="account-card">
        <span className="account-card__num">1</span>
        <span className="account-card__label t-label">Commande</span>
      </Link>
      <Link to="/compte/reservations" className="account-card">
        <span className="account-card__num">1</span>
        <span className="account-card__label t-label">Réservation</span>
      </Link>
      <Link to="/compte/recus" className="account-card">
        <span className="account-card__num">1</span>
        <span className="account-card__label t-label">Reçu PDF</span>
      </Link>
      <Link to="/compte/avis" className="account-card">
        <span className="account-card__num">0</span>
        <span className="account-card__label t-label">Avis publiés</span>
      </Link>
    </div>
  </div>
);

/* ── ORDERS ── */
const Orders = () => (
  <div className="account-section">
    <h2 className="account-section__title">Mes Commandes</h2>
    <div className="account-table-wrap">
      <table className="account-table">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Date</th>
            <th>Produit</th>
            <th>Total</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map(o => (
            <tr key={o.id}>
              <td><code className="order-id">{o.id}</code></td>
              <td>{o.date}</td>
              <td>{o.product} × {o.qty}</td>
              <td>{o.total.toLocaleString('fr-FR')} FCFA</td>
              <td><span className="status-badge" style={{ '--status-color': o.statusColor }}>{o.status}</span></td>
              <td>
                <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.65rem' }}
                  onClick={() => alert('Le reçu PDF sera disponible après connexion au backend.')}>
                  Reçu PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ── RESERVATIONS ── */
const Reservations = () => (
  <div className="account-section">
    <h2 className="account-section__title">Mes Réservations</h2>
    <div className="account-table-wrap">
      <table className="account-table">
        <thead>
          <tr><th>Référence</th><th>Date</th><th>Produit</th><th>Collection</th><th>Statut</th></tr>
        </thead>
        <tbody>
          {mockReservations.map(r => (
            <tr key={r.id}>
              <td><code className="order-id">{r.id}</code></td>
              <td>{r.date}</td>
              <td>{r.product}</td>
              <td>{r.collection}</td>
              <td><span className="status-badge" style={{ '--status-color': r.statusColor }}>{r.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ── RECEIPTS ── */
const Receipts = () => (
  <div className="account-section">
    <h2 className="account-section__title">Mes Reçus</h2>
    <div className="receipt-list">
      {mockOrders.map(o => (
        <div key={o.id} className="receipt-item">
          <div>
            <p className="receipt-item__id t-label">{o.id}</p>
            <p className="receipt-item__product">{o.product}</p>
            <p className="t-label" style={{ marginTop: '0.25rem' }}>{o.date}</p>
          </div>
          <div className="receipt-item__right">
            <p className="t-price">{o.total.toLocaleString('fr-FR')} FCFA</p>
            <button className="btn" style={{ marginTop: '1rem', padding: '0.6rem 1.25rem', fontSize: '0.65rem' }}
              onClick={() => alert('Téléchargement PDF disponible après connexion backend.')}>
              ↓ Télécharger
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── REVIEWS ── */
const Reviews = () => (
  <div className="account-section">
    <h2 className="account-section__title">Mes Avis</h2>
    <div className="account-empty">
      <p className="t-subheading" style={{ fontStyle: 'normal', color: 'var(--grey)' }}>Aucun avis publié.</p>
      <p className="t-body" style={{ marginTop: '0.5rem' }}>
        Après l'achat d'un parfum, vous pourrez partager votre expérience depuis sa fiche produit.
      </p>
      <Link to="/collections" className="btn" style={{ marginTop: '2rem' }}>Explorer les parfums</Link>
    </div>
  </div>
);

/* ── ROOT ── */
const Account = () => (
  <AccountLayout>
    <Routes>
      <Route path="/"             element={<Dashboard />} />
      <Route path="/commandes"    element={<Orders />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/recus"        element={<Receipts />} />
      <Route path="/avis"         element={<Reviews />} />
    </Routes>
  </AccountLayout>
);

export default Account;
