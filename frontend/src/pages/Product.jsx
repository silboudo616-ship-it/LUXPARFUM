import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import './Product.css';

const StarRating = ({ rating }) => (
  <span className="star-rating" aria-label={`${rating} étoiles sur 5`}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= rating ? 'var(--gold)' : 'var(--grey-lt)' }}>★</span>
    ))}
  </span>
);

const getCtaLabel = (collection) => {
  if (collection === 'Standard') return 'Commander';
  if (collection === 'Master')   return 'Réserver cette Pièce';
  return 'Réserver';
};

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProduct, mockReviews } = useProducts();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [qty, setQty] = useState(1);
  const pageRef = useRef(null);

  const perfume = getProduct(id);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.reveal') || [];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  if (!perfume) {
    return (
      <div className="product-404">
        <h1 className="t-heading">Parfum introuvable.</h1>
        <p className="t-body" style={{ marginTop: '1rem', color: 'var(--grey)' }}>Ce flacon ne semble pas exister dans notre catalogue.</p>
        <Link to="/collections" className="btn" style={{ marginTop: '2.5rem' }}>Retour aux Collections</Link>
      </div>
    );
  }

  const isMaster   = perfume.collection === 'Master';
  const reviews    = mockReviews[id] || [];
  const avgRating  = reviews.length > 0 ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : null;

  const handleOrder = () => {
    for (let i = 0; i < qty; i++) addToCart(perfume);
  };

  return (
    <div className="product-page" ref={pageRef}>

      {/* BREADCRUMB */}
      <nav className="product-breadcrumb container" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <span aria-hidden>→</span>
        <Link to="/collections">Collections</Link>
        <span aria-hidden>→</span>
        <span>{perfume.name}</span>
      </nav>

      {/* MAIN GRID */}
      <div className="product-grid container">

        {/* IMAGE */}
        <div className="product-img-col reveal">
          <div className="product-img-wrap">
            <img
              src={perfume.image}
              alt={perfume.imageAlt || perfume.name}
              className="product-img"
              loading="eager"
            />
            {isMaster && (
              <div className="product-master-badge">
                <span className="t-label" style={{ color: 'var(--gold)' }}>Édition Limitée</span>
                <p className="product-master-ratio">{perfume.masterDetails?.available ?? '—'} <span>/ {perfume.masterDetails?.total ?? '—'}</span></p>
                <p className="t-label" style={{ color: 'var(--grey)' }}>Pièces disponibles</p>
              </div>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="product-info-col reveal reveal-delay-1">

          {/* META */}
          <div className="product-meta">
            <span className="t-label" style={{ color: isMaster ? 'var(--gold)' : 'var(--grey)' }}>{perfume.collection}</span>
            <span className="product-meta-sep" aria-hidden />
            <span className="t-label">{perfume.gender}</span>
          </div>

          <h1 className="product-name">{perfume.name}</h1>

          {avgRating && (
            <div className="product-rating-bar">
              <StarRating rating={avgRating} />
              <span className="t-label" style={{ marginLeft: '0.5rem' }}>({reviews.length} avis)</span>
            </div>
          )}

          <p className="product-price">{perfume.price.toLocaleString('fr-FR')} FCFA</p>
          <p className="product-availability t-label" style={{ color: perfume.availability === 'Disponible' ? '#5a7a5a' : 'var(--grey)' }}>
            {perfume.availability}
          </p>

          <p className="product-desc t-body">{perfume.description}</p>

          {/* SPECS */}
          <dl className="product-specs">
            {perfume.type && (
              <div className="product-spec">
                <dt className="t-label">Type</dt>
                <dd>{perfume.type}</dd>
              </div>
            )}
            <div className="product-spec">
              <dt className="t-label">Famille olfactive</dt>
              <dd>{perfume.olfactoryFamily}</dd>
            </div>
            <div className="product-spec">
              <dt className="t-label">Notes</dt>
              <dd>{perfume.notes}</dd>
            </div>
            {perfume.duration && (
              <div className="product-spec">
                <dt className="t-label">Tenue</dt>
                <dd>{perfume.duration}</dd>
              </div>
            )}
            <div className="product-spec">
              <dt className="t-label">Contenance</dt>
              <dd>{perfume.volume}</dd>
            </div>
            <div className="product-spec">
              <dt className="t-label">Origine</dt>
              <dd>{perfume.origin}</dd>
            </div>
          </dl>

          {/* QTY + CTA */}
          {!isMaster && (
            <div className="product-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Diminuer">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} aria-label="Augmenter">+</button>
            </div>
          )}

          <button
            className={`btn product-cta ${isMaster ? 'btn--gold' : 'btn--filled'}`}
            onClick={handleOrder}
          >
            {getCtaLabel(perfume.collection)}
          </button>

          <p className="product-note t-label">
            {perfume.collection === 'Standard'
              ? 'Livraison estimée sous 5-7 jours ouvrables.'
              : 'Notre équipe vous contactera sous 48h pour confirmer votre réservation.'}
          </p>

        </div>
      </div>

      {/* REVIEWS */}
      <section className="product-reviews container" aria-label="Avis clients">
        <div className="product-reviews-header reveal">
          <h2 className="t-heading">Ils en parlent</h2>
          {!showReviewForm && !reviewSubmitted && (
            <button className="btn" onClick={() => setShowReviewForm(true)}>Laisser un avis</button>
          )}
        </div>

        {showReviewForm && !reviewSubmitted && (
          <form
            className="review-form reveal"
            onSubmit={(e) => { e.preventDefault(); setReviewSubmitted(true); setShowReviewForm(false); }}
          >
            <h3 className="review-form__title">Votre expérience</h3>
            <div className="review-form__fields">
              <label>
                <span className="t-label">Votre nom</span>
                <input type="text" required placeholder="Ex : Marie L." />
              </label>
              <label>
                <span className="t-label">Note</span>
                <select>
                  <option value="5">★★★★★ — Exceptionnel</option>
                  <option value="4">★★★★☆ — Très bien</option>
                  <option value="3">★★★☆☆ — Bien</option>
                  <option value="2">★★☆☆☆ — Moyen</option>
                  <option value="1">★☆☆☆☆ — Décevant</option>
                </select>
              </label>
              <label className="review-form__full">
                <span className="t-label">Commentaire</span>
                <textarea required rows={5} placeholder="Décrivez votre expérience olfactive..." />
              </label>
            </div>
            <div className="review-form__actions">
              <button type="submit" className="btn btn--filled">Envoyer mon avis</button>
              <button type="button" className="btn" onClick={() => setShowReviewForm(false)}>Annuler</button>
            </div>
          </form>
        )}

        {reviewSubmitted && (
          <div className="review-success reveal">
            <p className="review-success__icon">✓</p>
            <p className="t-subheading">Merci pour votre avis.</p>
            <p className="t-body">Il sera publié après validation par notre équipe.</p>
          </div>
        )}

        <div className="review-list">
          {reviews.length === 0 && !reviewSubmitted && (
            <p className="t-body" style={{ color: 'var(--grey)', marginTop: '2rem' }}>
              Soyez le premier à partager votre expérience avec cette fragrance.
            </p>
          )}
          {reviews.map(r => (
            <article key={r.id} className="review-card reveal">
              <div className="review-card__top">
                <strong className="review-card__author">{r.author}</strong>
                <StarRating rating={r.rating} />
              </div>
              <p className="review-card__comment t-body">"{r.comment}"</p>
              <time className="review-card__date t-label">{r.date}</time>
            </article>
          ))}
        </div>
      </section>

      {/* BACK TO COLLECTIONS */}
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <Link to="/collections" className="btn" style={{ marginTop: '3rem' }}>
          ← Continuer l'exploration
        </Link>
      </div>

    </div>
  );
};

export default Product;
