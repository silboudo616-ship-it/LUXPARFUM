import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './Admin.css';

/* ═══════════════════════════════════════════
   LOGIN SCREEN
═══════════════════════════════════════════ */
const LoginScreen = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(pin)) {
      setError('Code incorrect');
      setPin('');
    }
  };

  return (
    <div className="admin__login">
      <form className="admin__login-card" onSubmit={handleSubmit}>
        <p className="admin__login-logo">LUXE AURA</p>
        <h1 className="admin__login-title">Administration</h1>
        {error && <p className="admin__login-error">{error}</p>}
        <input
          className="admin__login-input"
          type="password"
          maxLength={6}
          placeholder="• • • •"
          value={pin}
          onChange={e => { setPin(e.target.value); setError(''); }}
          autoFocus
        />
        <button className="admin__btn admin__btn--primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
          Accéder au Dashboard
        </button>
        <p className="admin__login-hint">Code par défaut : 1234</p>
      </form>
    </div>
  );
};

/* ═══════════════════════════════════════════
   IMAGE UPLOADER
═══════════════════════════════════════════ */
const ImageUploader = ({ value, onChange }) => {
  const [useUrl, setUseUrl] = useState(!value || value.startsWith('http'));
  const [imgError, setImgError] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image trop volumineuse (max 5 Mo)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target.result);
      setImgError(false);
    };
    reader.readAsDataURL(file);
  };

  if (value && !imgError) {
    return (
      <div>
        <div className="admin__img-upload admin__img-upload--has-image">
          <div className="admin__img-preview-wrap">
            <img
              src={value}
              alt="Aperçu"
              className="admin__img-preview"
              onError={() => setImgError(true)}
            />
            <button
              type="button"
              className="admin__img-preview-remove"
              onClick={() => { onChange(''); setImgError(false); }}
              title="Supprimer l'image"
            >✕</button>
          </div>
        </div>
        <button type="button" className="admin__img-url-toggle" onClick={() => { setUseUrl(!useUrl); }}>
          {useUrl ? '📁 Importer un fichier' : '🔗 Utiliser une URL'}
        </button>
      </div>
    );
  }

  return (
    <div>
      {useUrl ? (
        <div className="admin__form-group">
          <input
            className="admin__form-input"
            placeholder="https://example.com/image.jpg"
            value={value || ''}
            onChange={e => { onChange(e.target.value); setImgError(false); }}
          />
        </div>
      ) : (
        <div className="admin__img-upload" onClick={() => fileRef.current?.click()}>
          <div className="admin__img-upload-icon">📷</div>
          <p className="admin__img-upload-text">Cliquez ou glissez une image</p>
          <p className="admin__img-upload-hint">JPG, PNG, WebP — max 5 Mo</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} />
        </div>
      )}
      <button type="button" className="admin__img-url-toggle" onClick={() => setUseUrl(!useUrl)}>
        {useUrl ? '📁 Importer un fichier' : '🔗 Utiliser une URL'}
      </button>
      {imgError && <p className="admin__form-error">Image inaccessible. Vérifiez le lien.</p>}
    </div>
  );
};

/* ═══════════════════════════════════════════
   PRODUCT FORM (full-page)
═══════════════════════════════════════════ */
const ProductForm = ({ product, onSave, onCancel, collections, genders }) => {
  const [form, setForm] = useState({
    name: '',
    collection: 'Standard',
    gender: 'Mixte',
    price: '',
    volume: '50ml',
    origin: '',
    olfactoryFamily: '',
    notes: '',
    availability: 'Disponible',
    image: '',
    imageAlt: '',
    description: '',
    duration: '',
    type: 'Eau de Parfum',
    masterAvailable: '50',
    masterTotal: '100',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        collection: product.collection || 'Standard',
        gender: product.gender || 'Mixte',
        price: product.price ? String(product.price) : '',
        volume: product.volume || '50ml',
        origin: product.origin || '',
        olfactoryFamily: product.olfactoryFamily || '',
        notes: product.notes || '',
        availability: product.availability || 'Disponible',
        image: product.image || '',
        imageAlt: product.imageAlt || '',
        description: product.description || '',
        duration: product.duration || '',
        type: product.type || 'Eau de Parfum',
        masterAvailable: product.masterDetails ? String(product.masterDetails.available) : '50',
        masterTotal: product.masterDetails ? String(product.masterDetails.total) : '100',
      });
    }
  }, [product]);

  const set = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nom obligatoire';
    if (!form.price || Number(form.price) <= 0) errs.price = 'Prix invalide';
    if (!form.image.trim()) errs.image = 'Image obligatoire';
    if (!form.description.trim()) errs.description = 'Description obligatoire';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || saving) return;
    setSaving(true);
    const data = {
      name: form.name.trim(),
      collection: form.collection,
      gender: form.gender,
      price: Number(form.price),
      volume: form.volume,
      origin: form.origin.trim(),
      olfactoryFamily: form.olfactoryFamily.trim(),
      notes: form.notes.trim(),
      availability: form.availability,
      image: form.image.trim(),
      imageAlt: form.imageAlt.trim() || `Flacon ${form.name.trim()}`,
      description: form.description.trim(),
      duration: form.duration.trim(),
      type: form.type,
    };
    if (data.collection === 'Master') {
      data.masterDetails = {
        available: Number(form.masterAvailable) || 50,
        total: Number(form.masterTotal) || 100,
      };
    }
    // Simulate slight delay for UX feedback
    setTimeout(() => {
      onSave(data);
      setSaving(false);
    }, 300);
  };

  return (
    <div className="admin__form-page">
      <form onSubmit={handleSubmit}>
        {/* ── Image ── */}
        <div className="admin__form-section">
          <h3 className="admin__form-section-title">📷 Image du produit</h3>
          <ImageUploader value={form.image} onChange={(v) => set('image', v)} />
          {errors.image && <p className="admin__form-error" style={{marginTop:'0.5rem'}}>{errors.image}</p>}
        </div>

        {/* ── Informations principales ── */}
        <div className="admin__form-section">
          <h3 className="admin__form-section-title">📝 Informations principales</h3>
          <div className="admin__form-grid">
            <div className="admin__form-group admin__form-group--full">
              <label className="admin__form-label">Nom du parfum <span className="admin__form-required">*</span></label>
              <input className={`admin__form-input ${errors.name ? 'admin__form-input--error' : ''}`}
                value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ex: Tom Ford Noir" />
              {errors.name && <p className="admin__form-error">{errors.name}</p>}
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Prix (FCFA) <span className="admin__form-required">*</span></label>
              <input className={`admin__form-input ${errors.price ? 'admin__form-input--error' : ''}`}
                type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} placeholder="Ex: 15000" />
              {errors.price && <p className="admin__form-error">{errors.price}</p>}
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Genre</label>
              <select className="admin__form-select" value={form.gender} onChange={e => set('gender', e.target.value)}>
                {genders.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Collection</label>
              <select className="admin__form-select" value={form.collection} onChange={e => set('collection', e.target.value)}>
                {collections.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Disponibilité</label>
              <select className="admin__form-select" value={form.availability} onChange={e => set('availability', e.target.value)}>
                <option value="Disponible">Disponible</option>
                <option value="Sur réservation">Sur réservation</option>
                <option value="Édition limitée">Édition limitée</option>
                <option value="Rupture de stock">Rupture de stock</option>
              </select>
            </div>

            <div className="admin__form-group admin__form-group--full">
              <label className="admin__form-label">Description <span className="admin__form-required">*</span></label>
              <textarea className={`admin__form-textarea ${errors.description ? 'admin__form-input--error' : ''}`}
                value={form.description} onChange={e => set('description', e.target.value)}
                placeholder="Décrivez ce parfum de manière élégante..." rows={4} />
              {errors.description && <p className="admin__form-error">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* ── Détails techniques ── */}
        <div className="admin__form-section">
          <h3 className="admin__form-section-title">🧪 Détails du parfum</h3>
          <div className="admin__form-grid">
            <div className="admin__form-group">
              <label className="admin__form-label">Type de parfum</label>
              <select className="admin__form-select" value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="Eau de Parfum">Eau de Parfum</option>
                <option value="Eau de Toilette">Eau de Toilette</option>
                <option value="Parfum">Parfum (Extrait)</option>
                <option value="Eau de Cologne">Eau de Cologne</option>
                <option value="Brume">Brume Corporelle</option>
              </select>
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Contenance</label>
              <select className="admin__form-select" value={form.volume} onChange={e => set('volume', e.target.value)}>
                <option value="10ml">10ml</option>
                <option value="30ml">30ml</option>
                <option value="50ml">50ml</option>
                <option value="100ml">100ml</option>
                <option value="200ml">200ml</option>
              </select>
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Famille olfactive</label>
              <input className="admin__form-input" value={form.olfactoryFamily}
                onChange={e => set('olfactoryFamily', e.target.value)} placeholder="Ex: Boisé Épicé" />
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Durée du parfum</label>
              <input className="admin__form-input" value={form.duration}
                onChange={e => set('duration', e.target.value)} placeholder="Ex: 8 à 12 heures" />
            </div>

            <div className="admin__form-group admin__form-group--full">
              <label className="admin__form-label">Notes olfactives</label>
              <input className="admin__form-input" value={form.notes}
                onChange={e => set('notes', e.target.value)} placeholder="Ex: Bergamote, Poivre Noir, Bois de Santal" />
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Origine</label>
              <input className="admin__form-input" value={form.origin}
                onChange={e => set('origin', e.target.value)} placeholder="Ex: Dubaï, Paris..." />
            </div>

            <div className="admin__form-group">
              <label className="admin__form-label">Texte alt de l'image</label>
              <input className="admin__form-input" value={form.imageAlt}
                onChange={e => set('imageAlt', e.target.value)} placeholder="Auto-généré si vide" />
            </div>
          </div>
        </div>

        {/* ── Master details (conditional) ── */}
        {form.collection === 'Master' && (
          <div className="admin__form-section">
            <h3 className="admin__form-section-title">👑 Édition Master</h3>
            <div className="admin__form-grid">
              <div className="admin__form-group">
                <label className="admin__form-label">Pièces disponibles</label>
                <input className="admin__form-input" type="number" min="0"
                  value={form.masterAvailable} onChange={e => set('masterAvailable', e.target.value)} />
              </div>
              <div className="admin__form-group">
                <label className="admin__form-label">Total produit</label>
                <input className="admin__form-input" type="number" min="1"
                  value={form.masterTotal} onChange={e => set('masterTotal', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* ── Submit ── */}
        <div className="admin__form-actions">
          <button type="button" className="admin__btn admin__btn--ghost" onClick={onCancel}>Annuler</button>
          <button type="submit" className="admin__btn admin__btn--primary" disabled={saving}>
            {saving ? '⏳ Enregistrement...' : (product ? '💾 Enregistrer les modifications' : '✨ Créer le parfum')}
          </button>
        </div>
      </form>
    </div>
  );
};

/* ═══════════════════════════════════════════
   DELETE MODAL
═══════════════════════════════════════════ */
const DeleteModal = ({ productName, onConfirm, onClose }) => (
  <div className="admin__modal-overlay" onClick={onClose}>
    <div className="admin__modal" onClick={e => e.stopPropagation()}>
      <div className="admin__confirm">
        <div className="admin__confirm-icon">🗑️</div>
        <p className="admin__confirm-text">Voulez-vous vraiment supprimer</p>
        <p className="admin__confirm-name">« {productName} » ?</p>
        <p style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.35)',marginBottom:'1.5rem'}}>Cette action est irréversible.</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button className="admin__btn admin__btn--ghost" onClick={onClose}>Annuler</button>
          <button className="admin__btn admin__btn--danger" onClick={onConfirm}>Supprimer définitivement</button>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   MAIN ADMIN COMPONENT
═══════════════════════════════════════════ */
const Admin = () => {
  const {
    products, settings, collections, genders,
    isAdminAuthenticated, loginAdmin, logoutAdmin,
    addProduct, updateProduct, deleteProduct,
    updateSettings, resetProducts, resetSettings,
  } = useProducts();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('');
  const [viewMode, setViewMode] = useState('cards');
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState(settings);

  useEffect(() => { setSettingsForm(settings); }, [settings]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Auth gate ── */
  if (!isAdminAuthenticated) {
    return <LoginScreen onLogin={loginAdmin} />;
  }

  /* ── Handlers ── */
  const handleSaveProduct = (data) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
      showToast(`✅ « ${data.name} » mis à jour`);
    } else {
      addProduct(data);
      showToast(`✅ « ${data.name} » ajouté au catalogue`);
    }
    setShowForm(false);
    setEditProduct(null);
    setActiveTab('products');
  };

  const handleDeleteConfirm = () => {
    deleteProduct(deleteTarget.id);
    showToast(`🗑️ « ${deleteTarget.name} » supprimé`);
    setDeleteTarget(null);
  };

  const handleSettingsSave = () => {
    updateSettings(settingsForm);
    showToast('✅ Paramètres sauvegardés');
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setShowForm(true);
    setActiveTab('form');
  };

  const openCreate = () => {
    setEditProduct(null);
    setShowForm(true);
    setActiveTab('form');
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditProduct(null);
    setActiveTab('products');
  };

  /* ── Filtered products ── */
  const filteredProducts = products.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.gender.toLowerCase().includes(search.toLowerCase()) ||
      p.collection.toLowerCase().includes(search.toLowerCase());
    const matchGender = !genderFilter || p.gender === genderFilter;
    const matchCollection = !collectionFilter || p.collection === collectionFilter;
    return matchSearch && matchGender && matchCollection;
  });

  /* ── Stats ── */
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const formatPrice = (v) => v.toLocaleString('fr-FR') + ' FCFA';

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <div className="admin">

      {/* ── Sidebar ── */}
      <aside className={`admin__sidebar ${sidebarOpen ? 'admin__sidebar--open' : ''}`}>
        <div className="admin__sidebar-header">
          <div className="admin__sidebar-logo">
            LUXE AURA
            <span>Administration</span>
          </div>
        </div>
        <div className="admin__sidebar-nav">
          <div className="admin__nav-section">
            <p className="admin__nav-label">Principal</p>
            <button className={`admin__nav-item ${activeTab === 'dashboard' ? 'admin__nav-item--active' : ''}`}
              onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}>
              <span className="admin__nav-icon">📊</span> Tableau de bord
            </button>
            <button className={`admin__nav-item ${activeTab === 'products' || activeTab === 'form' ? 'admin__nav-item--active' : ''}`}
              onClick={() => { setActiveTab('products'); setShowForm(false); setEditProduct(null); setSidebarOpen(false); }}>
              <span className="admin__nav-icon">🧴</span> Produits
            </button>
          </div>
          <div className="admin__nav-section">
            <p className="admin__nav-label">Configuration</p>
            <button className={`admin__nav-item ${activeTab === 'settings' ? 'admin__nav-item--active' : ''}`}
              onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}>
              <span className="admin__nav-icon">⚙️</span> Paramètres
            </button>
          </div>
        </div>
        <div className="admin__sidebar-footer">
          <Link to="/" className="admin__back-link">← Voir le site</Link>
          <button onClick={logoutAdmin} className="admin__back-link" style={{marginTop:'0.75rem',border:'none',background:'none',cursor:'pointer',padding:0,width:'100%'}}>
            🔒 Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Mobile Toggle ── */}
      <button className="admin__mobile-toggle" onClick={() => setSidebarOpen(v => !v)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* ── Main ── */}
      <main className="admin__main">
        <div className="admin__topbar">
          <div className="admin__topbar-left">
            {activeTab === 'form' && (
              <button className="admin__topbar-back" onClick={cancelForm}>← Retour</button>
            )}
            <h1 className="admin__topbar-title">
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'products' && 'Gestion des produits'}
              {activeTab === 'form' && (editProduct ? `Modifier — ${editProduct.name}` : 'Nouveau parfum')}
              {activeTab === 'settings' && 'Paramètres'}
            </h1>
          </div>
          <div className="admin__topbar-actions">
            <Link to="/" className="admin__btn admin__btn--ghost">🌍 Voir le site</Link>
            {activeTab === 'products' && (
              <button className="admin__btn admin__btn--primary" onClick={openCreate}>
                ➕ Ajouter un parfum
              </button>
            )}
          </div>
        </div>

        <div className="admin__content">

          {/* ════════════════ DASHBOARD ════════════════ */}
          {activeTab === 'dashboard' && (
            <>
              <div className="admin__stats">
                <div className="admin__stat-card">
                  <p className="admin__stat-label">Total produits</p>
                  <p className="admin__stat-value">{products.length}</p>
                  <p className="admin__stat-meta">dans le catalogue</p>
                </div>
                <div className="admin__stat-card">
                  <p className="admin__stat-label">Valeur catalogue</p>
                  <p className="admin__stat-value">{(totalValue / 1000).toFixed(0)}k</p>
                  <p className="admin__stat-meta">{formatPrice(totalValue)}</p>
                </div>
                {genders.map(g => (
                  <div className="admin__stat-card" key={g}>
                    <p className="admin__stat-label">{g}</p>
                    <p className="admin__stat-value">{products.filter(p => p.gender === g).length}</p>
                    <p className="admin__stat-meta">parfums</p>
                  </div>
                ))}
                <div className="admin__stat-card">
                  <p className="admin__stat-label">Collections</p>
                  <p className="admin__stat-value">{collections.length}</p>
                  <p className="admin__stat-meta">{collections.join(', ')}</p>
                </div>
              </div>

              <div className="admin__table-wrap">
                <div className="admin__table-header">
                  <h3 className="admin__table-title">Aperçu du catalogue</h3>
                  <button className="admin__btn admin__btn--ghost" onClick={() => setActiveTab('products')}>Gérer →</button>
                </div>
                <table className="admin__table">
                  <thead><tr><th>Image</th><th>Nom</th><th>Genre</th><th>Collection</th><th>Prix</th></tr></thead>
                  <tbody>
                    {products.slice(0, 6).map(p => (
                      <tr key={p.id} style={{cursor:'pointer'}} onClick={() => openEdit(p)}>
                        <td><img src={p.image} alt="" className="admin__table-img" onError={e => { e.target.style.background='#222'; }} /></td>
                        <td className="admin__table-name">{p.name}</td>
                        <td><span className={`admin__table-badge admin__table-badge--${p.gender.toLowerCase()}`}>{p.gender}</span></td>
                        <td><span className={`admin__table-badge admin__table-badge--${p.collection.toLowerCase()}`}>{p.collection}</span></td>
                        <td>{formatPrice(p.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ════════════════ PRODUCTS LIST ════════════════ */}
          {activeTab === 'products' && (
            <>
              {/* Filters */}
              <div className="admin__filters">
                <input className="admin__table-search" placeholder="🔍 Rechercher..." value={search} onChange={e => setSearch(e.target.value)} style={{marginRight:'0.5rem'}} />
                <button className={`admin__filter-chip ${!genderFilter ? 'admin__filter-chip--active' : ''}`}
                  onClick={() => setGenderFilter('')}>Tous</button>
                {genders.map(g => (
                  <button key={g} className={`admin__filter-chip ${genderFilter === g ? 'admin__filter-chip--active' : ''}`}
                    onClick={() => setGenderFilter(genderFilter === g ? '' : g)}>{g}</button>
                ))}
                <span style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.1)',margin:'0 0.25rem'}} />
                {collections.map(c => (
                  <button key={c} className={`admin__filter-chip ${collectionFilter === c ? 'admin__filter-chip--active' : ''}`}
                    onClick={() => setCollectionFilter(collectionFilter === c ? '' : c)}>{c}</button>
                ))}
                <div style={{marginLeft:'auto'}}>
                  <div className="admin__view-toggle">
                    <button className={`admin__view-btn ${viewMode === 'cards' ? 'admin__view-btn--active' : ''}`} onClick={() => setViewMode('cards')}>▦</button>
                    <button className={`admin__view-btn ${viewMode === 'table' ? 'admin__view-btn--active' : ''}`} onClick={() => setViewMode('table')}>☰</button>
                  </div>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="admin__empty">
                  <div className="admin__empty-icon">🧴</div>
                  <p className="admin__empty-text">Aucun produit trouvé</p>
                </div>
              ) : viewMode === 'cards' ? (
                /* ── Card View ── */
                <div className="admin__product-cards">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="admin__product-card">
                      <img src={p.image} alt="" className="admin__product-card-img" onError={e => { e.target.style.background='#222'; }} />
                      <div className="admin__product-card-body">
                        <p className="admin__product-card-name">{p.name}</p>
                        <div className="admin__product-card-meta">
                          <span className={`admin__table-badge admin__table-badge--${p.gender.toLowerCase()}`}>{p.gender}</span>
                          <span className={`admin__table-badge admin__table-badge--${p.collection.toLowerCase()}`}>{p.collection}</span>
                        </div>
                        <p className="admin__product-card-price">{formatPrice(p.price)}</p>
                        <div className="admin__product-card-actions">
                          <button className="admin__btn admin__btn--ghost" onClick={() => openEdit(p)}>✏️ Modifier</button>
                          <button className="admin__btn admin__btn--danger" onClick={() => setDeleteTarget(p)}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* ── Table View ── */
                <div className="admin__table-wrap">
                  <table className="admin__table">
                    <thead><tr><th>Image</th><th>Nom</th><th>Genre</th><th>Collection</th><th>Prix</th><th>Actions</th></tr></thead>
                    <tbody>
                      {filteredProducts.map(p => (
                        <tr key={p.id}>
                          <td><img src={p.image} alt="" className="admin__table-img" onError={e => { e.target.style.background='#222'; }} /></td>
                          <td className="admin__table-name">{p.name}</td>
                          <td><span className={`admin__table-badge admin__table-badge--${p.gender.toLowerCase()}`}>{p.gender}</span></td>
                          <td><span className={`admin__table-badge admin__table-badge--${p.collection.toLowerCase()}`}>{p.collection}</span></td>
                          <td>{formatPrice(p.price)}</td>
                          <td>
                            <div className="admin__table-actions">
                              <button className="admin__table-btn" title="Modifier" onClick={() => openEdit(p)}>✏️</button>
                              <button className="admin__table-btn admin__table-btn--delete" title="Supprimer" onClick={() => setDeleteTarget(p)}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* ════════════════ PRODUCT FORM ════════════════ */}
          {activeTab === 'form' && showForm && (
            <ProductForm
              product={editProduct}
              onSave={handleSaveProduct}
              onCancel={cancelForm}
              collections={collections}
              genders={genders}
            />
          )}

          {/* ════════════════ SETTINGS ════════════════ */}
          {activeTab === 'settings' && (
            <>
              <div className="admin__settings-section">
                <h3 className="admin__settings-title">🏪 Informations du site</h3>
                <div className="admin__form-grid">
                  <div className="admin__form-group">
                    <label className="admin__form-label">Nom du site</label>
                    <input className="admin__form-input" value={settingsForm.siteName}
                      onChange={e => setSettingsForm(p => ({ ...p, siteName: e.target.value }))} />
                  </div>
                  <div className="admin__form-group">
                    <label className="admin__form-label">Devise</label>
                    <input className="admin__form-input" value={settingsForm.currency}
                      onChange={e => setSettingsForm(p => ({ ...p, currency: e.target.value }))} />
                  </div>
                  <div className="admin__form-group">
                    <label className="admin__form-label">Email de contact</label>
                    <input className="admin__form-input" value={settingsForm.contactEmail}
                      onChange={e => setSettingsForm(p => ({ ...p, contactEmail: e.target.value }))} />
                  </div>
                  <div className="admin__form-group">
                    <label className="admin__form-label">Téléphone</label>
                    <input className="admin__form-input" value={settingsForm.contactPhone}
                      onChange={e => setSettingsForm(p => ({ ...p, contactPhone: e.target.value }))} />
                  </div>
                </div>
              </div>

              <div className="admin__settings-section">
                <h3 className="admin__settings-title">🔐 Sécurité</h3>
                <div className="admin__form-grid">
                  <div className="admin__form-group">
                    <label className="admin__form-label">Code PIN admin</label>
                    <input className="admin__form-input" value={settingsForm.adminPin}
                      onChange={e => setSettingsForm(p => ({ ...p, adminPin: e.target.value }))} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button className="admin__btn admin__btn--primary" onClick={handleSettingsSave}>💾 Sauvegarder</button>
                <button className="admin__btn admin__btn--ghost" onClick={() => { resetSettings(); showToast('🔄 Paramètres réinitialisés'); }}>Réinitialiser paramètres</button>
                <button className="admin__btn admin__btn--danger" onClick={() => { resetProducts(); showToast('🔄 Catalogue réinitialisé'); }}>Réinitialiser produits</button>
              </div>
            </>
          )}

        </div>
      </main>

      {/* ── Modals ── */}
      {deleteTarget && (
        <DeleteModal productName={deleteTarget.name} onConfirm={handleDeleteConfirm} onClose={() => setDeleteTarget(null)} />
      )}

      {/* ── Toast ── */}
      {toast && <div className="admin__toast">{toast}</div>}
    </div>
  );
};

export default Admin;
