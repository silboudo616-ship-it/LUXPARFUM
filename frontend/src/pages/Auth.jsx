import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const [mode, setMode]       = useState('login'); // 'login' | 'register' | 'forgot'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'forgot') { setSuccess(true); return; }
      navigate('/compte');
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-visual" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&q=80&w=1200"
          alt=""
          className="auth-visual__img"
        />
        <div className="auth-visual__overlay" />
        <p className="auth-visual__quote">
          "L'élégance est la seule<br/>beauté qui ne se démode pas."
        </p>
      </div>

      <div className="auth-form-side">
        <Link to="/" className="auth-logo">LUX PARFUM</Link>

        {success ? (
          <div className="auth-success">
            <p className="t-label" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Email envoyé</p>
            <h2 className="t-heading">Vérifiez votre messagerie.</h2>
            <p className="t-body" style={{ marginTop: '1rem' }}>
              Un lien de réinitialisation vous a été transmis.
            </p>
            <button className="btn" style={{ marginTop: '2.5rem' }} onClick={() => { setMode('login'); setSuccess(false); }}>
              Retour à la connexion
            </button>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <p className="t-label" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>
                {mode === 'login' ? 'Connexion' : mode === 'register' ? 'Rejoindre la Maison' : 'Mot de passe oublié'}
              </p>
              <h1 className="auth-title">
                {mode === 'login'    ? 'Mon Cabinet Olfactif' : ''}
                {mode === 'register' ? 'Créer mon espace' : ''}
                {mode === 'forgot'   ? 'Réinitialiser' : ''}
              </h1>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {mode === 'register' && (
                <div className="auth-field">
                  <label htmlFor="auth-name" className="t-label">Nom complet</label>
                  <input id="auth-name" type="text" required placeholder="Jean Dupont" className="auth-input" />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email" className="t-label">Adresse e-mail</label>
                <input id="auth-email" type="email" required placeholder="vous@exemple.com" className="auth-input" />
              </div>

              {mode !== 'forgot' && (
                <div className="auth-field">
                  <label htmlFor="auth-pass" className="t-label">Mot de passe</label>
                  <input id="auth-pass" type="password" required placeholder="••••••••" className="auth-input" minLength={8} />
                </div>
              )}

              {mode === 'login' && (
                <button type="button" className="auth-forgot-link" onClick={() => setMode('forgot')}>
                  Mot de passe oublié ?
                </button>
              )}

              <button type="submit" className={`btn btn--filled auth-submit ${loading ? 'auth-submit--loading' : ''}`} disabled={loading}>
                {loading ? 'Chargement…' : mode === 'login' ? 'Se connecter' : mode === 'register' ? "S'inscrire" : 'Envoyer le lien'}
              </button>
            </form>

            <p className="auth-switch">
              {mode === 'login' ? "Pas encore de compte ?" : 'Déjà membre ?'}
              <button className="auth-switch-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
