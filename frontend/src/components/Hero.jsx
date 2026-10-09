import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // Small delay so the animation feels intentional
    const t = setTimeout(() => el.classList.add('hero__content--visible'), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" aria-label="Introduction Lux Parfum">
      {/* BACKGROUND IMAGE */}
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&q=90&w=2400"
          alt=""
          aria-hidden="true"
          className="hero__bg-img"
          loading="eager"
        />
        <div className="hero__bg-overlay" />
      </div>

      {/* CONTENT — asymmetric: text left, product right */}
      <div className="hero__grid" ref={contentRef}>
        {/* LEFT TEXT COLUMN */}
        <div className="hero__text">
          <p className="hero__eyebrow t-label">Maison de Parfums · Depuis 2020</p>
          <h1 className="hero__title t-display">
            L'Art<br />
            <em>du Parfum.</em>
          </h1>
          <p className="hero__subtitle">
            L'exclusivité comme signature.
          </p>
          <p className="hero__desc">
            Des fragrances d'exception, conçues pour les esthètes en quête
            de rareté et de raffinement absolu.
          </p>
          <div className="hero__ctas">
            <Link to="/collections" className="btn btn--light">
              Découvrir la Collection
            </Link>
            <Link to="/collections?level=Master" className="hero__link-secondary">
              Explorer Master Collection <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT PRODUCT IMAGE */}
        <div className="hero__visual">
          <div className="hero__visual-frame">
            <img
              src={`${import.meta.env.BASE_URL}lux-bottle.jpg`}
              alt="Flacon Lux Parfum"
              className="hero__visual-img"
              loading="eager"
            />
          </div>
          {/* floating badge */}
          <div className="hero__badge">
            <span className="hero__badge-number">087</span>
            <span className="hero__badge-sep">/ 300</span>
            <span className="hero__badge-label">Pièces</span>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="t-label" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem' }}>Défiler</span>
      </div>
    </section>
  );
};

export default Hero;
