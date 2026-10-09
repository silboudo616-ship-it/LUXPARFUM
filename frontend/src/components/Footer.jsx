import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [sub, setSub] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSub(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer__top container">

        {/* BRAND */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">LUX PARFUM</Link>
          <p className="footer__tagline t-body">
            La haute parfumerie,<br />portée à son apogée.
          </p>
          <div className="footer__socials">
            {['Instagram', 'Facebook', 'WhatsApp'].map(s => (
              <a key={s} href="#" className="footer__social-link" aria-label={s}>{s}</a>
            ))}
          </div>
        </div>

        {/* COLLECTIONS */}
        <div className="footer__col">
          <h3 className="footer__col-title t-label">Collections</h3>
          <ul className="footer__links">
            <li><Link to="/collections?level=Standard"  className="footer__link">Standard</Link></li>
            <li><Link to="/collections?level=Premium"   className="footer__link">Premium</Link></li>
            <li><Link to="/collections?level=L%C3%A9gende" className="footer__link">Légende</Link></li>
            <li><Link to="/collections?level=Master"   className="footer__link footer__link--gold">Master Collection</Link></li>
          </ul>
        </div>

        {/* MAISON */}
        <div className="footer__col">
          <h3 className="footer__col-title t-label">La Maison</h3>
          <ul className="footer__links">
            <li><Link to="/"           className="footer__link">Notre Histoire</Link></li>
            <li><Link to="/"           className="footer__link">Savoir-Faire</Link></li>
            <li><Link to="/connexion"  className="footer__link">Mon Compte</Link></li>
            <li><Link to="/connexion"  className="footer__link">Rejoindre la Maison</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer__newsletter">
          <h3 className="footer__col-title t-label">Lettre de la Maison</h3>
          <p className="footer__newsletter-desc t-body">
            Nouvelles créations, éditions rares et événements exclusifs.
          </p>
          {sub ? (
            <p className="footer__newsletter-thanks">Merci pour votre inscription.</p>
          ) : (
            <form className="footer__newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Votre adresse e-mail"
                className="footer__newsletter-input"
                aria-label="E-mail newsletter"
              />
              <button type="submit" className="btn btn--light footer__newsletter-btn">
                S'abonner
              </button>
            </form>
          )}
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer__bottom container">
        <p className="t-label" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} Lux Parfum. Tous droits réservés.
        </p>
        <div className="footer__legal">
          <a href="#" className="footer__legal-link">Mentions Légales</a>
          <a href="#" className="footer__legal-link">Politique de Confidentialité</a>
          <a href="#" className="footer__legal-link">CGV</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
