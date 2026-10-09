import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const getCtaLabel = (collection) => {
  if (collection === 'Standard') return 'Commander';
  if (collection === 'Master')   return 'Réserver la Pièce';
  return 'Réserver';
};

const ProductCard = ({ perfume, size = 'normal' }) => {
  const { addToCart } = useCart();
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article className={`pcard pcard--${size} reveal`} ref={cardRef}>
      <Link to={`/produit/${perfume.id}`} className="pcard__img-wrap" tabIndex={-1} aria-hidden="true">
        <img
          src={perfume.image}
          alt={perfume.imageAlt || perfume.name}
          className="pcard__img"
          loading="lazy"
        />
        {perfume.collection === 'Master' && (
          <div className="pcard__master-overlay">
            <span className="pcard__master-num">{perfume.masterDetails?.available} / {perfume.masterDetails?.total}</span>
            <span className="pcard__master-label">Pièces disponibles</span>
          </div>
        )}
      </Link>

      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="t-label">{perfume.collection}</span>
          <span className="pcard__dot" aria-hidden />
          <span className="t-label">{perfume.gender}</span>
        </div>
        <Link to={`/produit/${perfume.id}`} className="pcard__name">{perfume.name}</Link>
        <div className="pcard__footer">
          <span className="t-price">{perfume.price.toLocaleString('fr-FR')} FCFA</span>
          <Link to={`/produit/${perfume.id}`} className="pcard__cta">
            Découvrir <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
