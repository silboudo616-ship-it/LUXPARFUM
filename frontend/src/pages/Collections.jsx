import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import './Collections.css';

const Collections = () => {
  const { products, collections, genders } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const genderFilter = searchParams.get('gender') || '';
  const levelFilter  = searchParams.get('level')  || '';
  const pageRef = useRef(null);

  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.reveal') || [];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  const toggle = (type, value) => {
    const p = new URLSearchParams(searchParams);
    if (type === 'gender') {
      genderFilter === value ? p.delete('gender') : p.set('gender', value);
    } else {
      levelFilter === value ? p.delete('level') : p.set('level', value);
    }
    setSearchParams(p);
  };

  const filtered = products.filter(p => {
    const g = !genderFilter || p.gender    === genderFilter;
    const l = !levelFilter  || p.collection === levelFilter;
    return g && l;
  });

  const pageTitle = genderFilter || levelFilter
    ? [genderFilter, levelFilter].filter(Boolean).join(' · ')
    : 'Toutes les Collections';

  return (
    <div ref={pageRef} className="collections-page">

      {/* HERO BANNER */}
      <div className="coll-banner">
        <div className="coll-banner__inner container">
          <p className="t-label reveal" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>LUX AURA</p>
          <h1 className="coll-banner__title reveal reveal-delay-1">{pageTitle}</h1>
          <p className="coll-banner__count reveal reveal-delay-2 t-label">
            {filtered.length} fragrance{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="coll-body container">

        {/* SIDEBAR */}
        <aside className="coll-sidebar">
          <div className="coll-filter-group">
            <h3 className="coll-filter-title t-label">Genre</h3>
            <ul className="coll-filter-list">
              {genders.map(g => (
                <li key={g}>
                  <button
                    className={`coll-filter-btn ${genderFilter === g ? 'coll-filter-btn--active' : ''}`}
                    onClick={() => toggle('gender', g)}
                  >
                    {g}
                    {genderFilter === g && <span aria-hidden className="coll-filter-check">✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="coll-filter-group">
            <h3 className="coll-filter-title t-label">Collection</h3>
            <ul className="coll-filter-list">
              {collections.map(c => (
                <li key={c}>
                  <button
                    className={`coll-filter-btn ${levelFilter === c ? 'coll-filter-btn--active' : ''} ${c === 'Master' ? 'coll-filter-btn--gold' : ''}`}
                    onClick={() => toggle('level', c)}
                  >
                    {c}
                    {levelFilter === c && <span aria-hidden className="coll-filter-check">✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {(genderFilter || levelFilter) && (
            <button className="coll-clear-btn" onClick={() => setSearchParams({})}>
              Effacer les filtres
            </button>
          )}
        </aside>

        {/* PRODUCT GRID */}
        <section className="coll-grid-section" aria-label="Parfums">
          {filtered.length === 0 ? (
            <div className="coll-empty">
              <p className="coll-empty__title">Aucune fragrance ne correspond.</p>
              <p className="coll-empty__sub t-body">Essayez d'autres filtres ou explorez toutes nos créations.</p>
              <button className="btn" style={{ marginTop: '2rem' }} onClick={() => setSearchParams({})}>
                Voir toute la collection
              </button>
            </div>
          ) : (
            <ul className="coll-grid">
              {filtered.map(p => (
                <li key={p.id} className="coll-grid__item">
                  <ProductCard perfume={p} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Collections;
