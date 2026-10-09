import React, { createContext, useContext, useState, useEffect } from 'react';
import { perfumes as defaultPerfumes, collections, genders, mockReviews } from '../data/mockData';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const STORAGE_KEY = 'luxe_aura_products';
const SETTINGS_KEY = 'luxe_aura_settings';
const AUTH_KEY = 'luxe_aura_admin_auth';

const defaultSettings = {
  siteName: 'LUX PARFUM',
  heroTitle: "L'Essence\ndu Raffinement.",
  heroSubtitle: 'Collections Automne – Hiver 2026',
  heroCta: 'Découvrir la Collection',
  currency: 'FCFA',
  contactEmail: 'contact@luxparfum.com',
  contactPhone: '+225 07 00 00 00',
  aboutText: "Fondée sur la conviction que la rareté est la plus grande des élégances, Lux Parfum sélectionne les matières premières les plus précieuses pour créer des fragrances qui transcendent le temps.",
  adminPin: '1234',
};

export const ProductProvider = ({ children }) => {
  /* ─── products state (persisted in localStorage) ─── */
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultPerfumes;
    } catch {
      return defaultPerfumes;
    }
  });

  /* ─── site settings state ─── */
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  /* ─── admin auth state ─── */
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  /* ─── persist to localStorage on change ─── */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  /* ─── admin auth ─── */
  const loginAdmin = (pin) => {
    if (pin === settings.adminPin) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  /* ─── product CRUD ─── */
  const addProduct = (product) => {
    const id = 'p' + Date.now();
    const newProduct = {
      id,
      name: product.name || '',
      collection: product.collection || 'Standard',
      gender: product.gender || 'Mixte',
      price: Number(product.price) || 0,
      volume: product.volume || '50ml',
      origin: product.origin || '',
      olfactoryFamily: product.olfactoryFamily || '',
      notes: product.notes || '',
      availability: product.availability || 'Disponible',
      image: product.image || '',
      imageAlt: product.imageAlt || `Flacon ${product.name}`,
      description: product.description || '',
      duration: product.duration || '',
      type: product.type || 'Eau de Parfum',
      ...(product.collection === 'Master' ? {
        masterDetails: product.masterDetails || { available: 50, total: 100 }
      } : {}),
    };
    setProducts(prev => [...prev, newProduct]);
    return id;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const updated = { ...p, ...updates };
      // Auto-manage masterDetails
      if (updated.collection === 'Master' && !updated.masterDetails) {
        updated.masterDetails = { available: 50, total: 100 };
      }
      if (updated.collection !== 'Master') {
        delete updated.masterDetails;
      }
      return updated;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProduct = (id) => products.find(p => p.id === id);

  /* ─── helper: get first product image for a gender category ─── */
  const getCategoryImage = (gender) => {
    const product = products.find(p => p.gender === gender && p.image);
    return product?.image || '';
  };

  /* ─── settings update ─── */
  const updateSettings = (updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  /* ─── reset to defaults ─── */
  const resetProducts = () => {
    setProducts(defaultPerfumes);
    localStorage.removeItem(STORAGE_KEY);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(SETTINGS_KEY);
  };

  return (
    <ProductContext.Provider value={{
      products,
      settings,
      collections,
      genders,
      mockReviews,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      getCategoryImage,
      updateSettings,
      resetProducts,
      resetSettings,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
