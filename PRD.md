# PRD (Product Requirements Document) - LUX PARFUM

## 1. Vision du produit
Lux Parfum est une maison de parfums de luxe proposant des collections exclusives pour Hommes, Femmes et Mixte. La plateforme e-commerce doit transcender les standards de vente en ligne classiques pour offrir une véritable "expérience de maison de parfum". Chaque interaction doit transpirer le luxe, l'élégance, l'exclusivité et la rareté. Le site ne se contente pas de vendre des produits, il raconte une histoire olfactive, valorise le savoir-faire et crée un sentiment de privilège absolu.

## 2. Objectifs business
- **Image de Marque** : Imposer Lux Parfum comme une référence incontournable de la parfumerie de niche et du luxe premium.
- **Conversion & Ventes** : Faciliter les achats immédiats (Standard), encourager l'engagement via les réservations (Premium, Légende) et créer un FOMO (Fear Of Missing Out) contrôlé pour les éditions limitées (Master).
- **Fidélisation** : Construire une communauté d'esthètes et de passionnés autour de la marque grâce à un espace client exclusif.
- **Évolutivité** : Disposer d'une plateforme robuste, gérée via un Dashboard Administrateur dynamique, permettant une croissance soutenue sans refonte technique majeure.

## 3. Personas clients
- **L'Amateur Éclairé (25-40 ans)** : À la recherche de nouvelles signatures olfactives (Standard & Premium). Apprécie les belles interfaces et le storytelling.
- **Le Collectionneur Privilégié (35-60 ans)** : À la recherche d'exclusivité et de rareté (Légende & Master). Prêt à réserver et patienter pour obtenir une pièce numérotée.
- **Le Client Cadeau d'Exception** : Cherche à offrir une expérience luxueuse, de l'emballage à la réception, valorisant la rareté du produit offert.

## 4. Positionnement de marque
- **Haut de gamme / Niche** : Une identité visuelle épurée, sophistiquée, refusant les codes surchargés du e-commerce de masse.
- **Ton de voix** : Élégant, poétique, précis et respectueux. Le vocabulaire utilisé doit être celui de la haute parfumerie (notes, sillages, jus, flacons).

## 5. Architecture du site
L'architecture est scindée en deux grands univers strictement séparés :
1. **La Vitrine / Front-Office** : L'expérience client immersive publique.
2. **Le Dashboard Administrateur / Back-Office** : L'outil de pilotage centralisé pour les équipes Lux Parfum.

L'architecture technique doit être pensée comme un système CMS/e-commerce dynamique, garantissant que toute modification dans le Back-Office est automatiquement et instantanément reflétée en Front-Office sans intervention sur le code source.

## 6. Pages du site
- **Accueil (Maison Lux Parfum)** : Vidéos immersives, manifesto, mise en avant des collections.
- **Boutique (Nos Créations)** : Filtres par collections et genres.
- **Pages Collections** : Standard, Premium, Légende, Master.
- **Fiches Produits** : Détails olfactifs, storytelling, module d'achat/réservation, section "Avis Clients / Ils en parlent".
- **Espace Client (Mon Cabinet Olfactif)** : Profil, informations, commandes, réservations, précommandes, reçus PDF, avis/commentaires.
- **Pages Institutionnelles** : La Maison, Savoir-Faire, CGV, Mentions Légales.
- **Panier / Checkout** : Tunnel d'achat fluide et premium.

## 7. Parcours utilisateur
1. **Découverte** : Arrivée sur l'accueil, immersion via le design et l'identité visuelle.
2. **Exploration** : Navigation fluide entre les collections (Standard, Premium, Légende, Master).
3. **Séduction** : Lecture de la fiche produit (histoire, notes olfactives, visuels HD).
4. **Action** : 
   - Achat direct (Standard : 1k-10k FCFA).
   - Demande de réservation (Premium : 10k-50k FCFA, Légende).
   - Réservation de pièce numérotée (Master).
5. **Validation & Paiement** : Paiement validé pour la commande Standard (création d'un ID de commande).
6. **Après-Vente** : Génération et téléchargement automatique du Reçu PDF.
7. **Fidélisation** : Dépôt d'avis depuis l'espace client (uniquement sur produits achetés), gestion de ses données.

## 8. Design System
Le design s'inspire des grandes maisons de luxe mondiales. 
- Utilisation de grands visuels (Hero images), d'animations fluides, de transitions douces.
- Espaces blancs (Negative space) généreux pour faire respirer le produit.
- Minimalisme et clarté absolue.

## 9. Couleurs
- **Dominantes** : Noir Profond (#0A0A0A) et Blanc Pur (#FFFFFF).
- **Accents** : Or pâle / Champagne (#D4AF37) pour souligner le luxe de manière subtile.
- **Nuances** : Gris anthracite et teintes minérales pour structurer l'interface sans surcharger.

## 10. Typographies
- **Titres (Headings)** : Une police Serif élégante (ex: *Playfair Display* ou *Cinzel*).
- **Corps de texte (Body)** : Une police Sans-Serif épurée (ex: *Inter* ou *Montserrat*).
- Hiérarchie typographique stricte.

## 11. Composants UI
- **Boutons (Call to Action)** : Contour fin, fond transparent au repos, remplissage subtil au survol. Textes majuscules (ex: COMMANDER, RÉSERVER).
- **Cartes Produits** : Effet de survol lent dévoilant les notes olfactives.
- **Modales & Tiroirs** : Navigation et panier fluides sans rechargement.
- **Badges de Statut** : Discrets ("Rupture de stock", "Pièce 087/300").

## 12. Fonctionnalités (Catalogue & Front)
- Catalogue interactif filtrable.
- **Synchronisation en temps réel Front/Back** : Les modifications de l'admin (prix, photos, nom, description, disponibilité, stock, catégorie, collection, statut, contenance) sont directement répercutées sur la partie publique.
- Système de réservation et précommande.

## 13. Authentification
- Inscription et connexion par e-mail / mot de passe.
- Processus de récupération et vérification de compte.
- Sécurité renforcée des données.

## 14. Gestion des abonnés
- Inscription à la Newsletter.
- Double opt-in et base de données segmentable.

## 15. Newsletter
- Conception de templates d'e-mails premium pour les communications de la maison.

## 16. Notifications e-mail
- Confirmation de commande / réservation.
- Mise à disposition du reçu PDF.
- Suivi de livraison, alertes de stock, demandes d'avis.

## 17. Gestion des commandes (Standard : 1 000 à 10 000 FCFA)
- Création d'une commande enregistrée à validation du paiement.
- **Identifiant commande unique** (ex: `LP-2026-000124`).
- Détails enregistrés : Identifiant, Client, Produit, Quantité, Prix unitaire, Montant total, Date, Statut, Informations livraison, Statut paiement.

## 18. Gestion des réservations (Premium & Légende)
- Action "Réserver" au lieu de "Commander" (Produits Premium de 10k à 50k FCFA & produits Légende exclusifs).
- Suivi du statut de réservation dans l'espace client.

## 19. Gestion des précommandes
- Intégration d'un statut "Précommande" avec blocage ou enregistrement d'intérêt.

## 20. Gestion des éditions limitées (Master)
- **Produits Master** : Réservation de pièces limitées.
- **Affichage dynamique** du ratio stock disponible / stock total (ex: *87 / 300 pièces disponibles*).
- Suivi précis : Nombre total de pièces, disponibles, réservées, vendues.

## 21. Reçu de Paiement PDF
- **Génération automatique** du reçu au format PDF après validation du paiement.
- **Contenu du Reçu** : Logo Lux Parfum, Nom Lux Parfum, Numéro de commande, Date, Nom du client, Produit acheté, Quantité, Prix unitaire, Montant total, Mode de paiement, Statut du paiement, Infos de livraison.
- **Accès** : Bouton "Télécharger mon reçu" disponible directement et dans l'espace client.
- Présentation élégante cohérente avec l'identité visuelle de la marque.

## 22. Avis et Commentaires Clients
- Système d'avis et notes post-achat.
- **Restriction d'accès** : Mécanisme de vérification interdisant le dépôt d'un avis à tout utilisateur ne possédant pas une commande payée et valide pour le produit concerné.
- **Contenu de l'avis** : Note éventuelle, commentaire texte, date, nom affiché du client.
- **Modération stricte** : Statuts "En attente", "Approuvé", "Refusé". Aucun avis n'est publié automatiquement sans validation.
- **Affichage Front-Office** : Section "AVIS CLIENTS" ou "ILS EN PARLENT" sur la fiche produit affichant uniquement les avis approuvés.

## 23. Back-office : Dashboard Administrateur
Un tableau de bord complet permettant de gérer le contenu public sans modifier le code source.
**Gestion des Parfums :**
- Ajouter, modifier, archiver.
- Éditer les caractéristiques : Nom, description, prix, catégorie, genre (Homme, Femme, Mixte), collection (Standard, Premium, Légende, Master), contenance, origine, informations olfactives.
- Éditer le statut du produit.
**Gestion des Médias (Photos) :**
- Ajouter, remplacer, supprimer une photo.
- Ajouter plusieurs photos pour un même parfum.
**Gestion des Stocks (Dynamique) :**
- Suivi : Quantité disponible, vendue, réservée.
- Modification du Statut : Disponible, Stock faible, Rupture de stock, Sur réservation, Précommande, Édition limitée.
**Modération des Avis Clients :**
- Section dédiée pour voir les nouveaux avis.
- Actions : Approuver, Refuser, Masquer, Supprimer.

## 24. Rôles administrateurs & Permissions
Le Dashboard Administrateur est strictement séparé du site public. Un visiteur ne doit jamais pouvoir altérer les données (produits, prix, photos, stock, commandes, validation d'avis).
- **Super Admin** : Contrôle absolu du système.
- **Administrateur** : Gestion totale du catalogue, commandes, clients et modération.
- **Gestionnaire** : Gestion courante du catalogue (stocks) et modération des avis.
- **Commercial** : Suivi exclusif des commandes, ventes et base clients.

## 25. Structure base de données
L'architecture de données permettra de supporter toutes ces fonctionnalités. Les entités principales sont :
- `users` : Clients, administrateurs, permissions.
- `products` : Informations descriptives, prix, liaisons catégories.
- `product_images` : Gestion multi-photos.
- `categories` & `collections` : Groupement des parfums.
- `orders` & `order_items` : Commandes avec identifiants uniques, statuts, montants, et détail des lignes achetées.
- `payments` : Transactions et suivis.
- `reservations` & `preorders` : Flux alternatifs aux commandes directes.
- `master_items` : Gestion granulaire des pièces d'éditions limitées.
- `reviews` & `review_status` : Avis clients, vérification de l'achat, suivi modération.
- `receipts` : Informations relatives à la génération PDF.
- `subscribers` & `notifications` : Abonnés newsletter, envois automatiques.

## 26. Sécurité
- Cloisonnement Back-Office / Front-Office.
- Authentification et gestion fine des Rôles/Permissions.
- Validation Backend des achats pour le dépôt d'avis (la commande doit être valide et appartenir à l'utilisateur).

## 27. SEO & Performance
- SEO : URLs dynamiques et sémantiques, meta-données gérées depuis le Dashboard.
- Performance : Chargement rapide, optimisation des médias multi-images depuis le Dashboard.

## 28. Roadmap & Évolutivité
L'architecture doit être pensée comme un écosystème évolutif permettant d'ajouter facilement à l'avenir :
- Nouveaux parfums, collections, catégories et administrateurs.
- Nouveaux modes de paiement / livraison.
- Promotions, codes promo, coupons.
- Programme de fidélité, statistiques de vente avancées.

*(Note de développement : Pour le moment, seul le PRD est mis à jour en préparation. Les développements du Dashboard, de la Base de Données complète, des paiements, des reçus PDF et des avis ne sont pas encore engagés.)*

## 29. FRONT-END DESIGN & UX SPECIFICATION
- **Framework** : React via Vite, Vanilla CSS.
- **Objectif** : Créer une expérience web premium, luxueuse, élégante, et exclusive. Pas un simple catalogue, mais une véritable maison de parfumerie.
- **Identité Visuelle** : Noir profond (#0A0A0A), Ivoire (#F7F4EE), Blanc (#FFFFFF), Champagne/Or subtil (#C6A15B), Gris élégant (#8A877F). Le doré est un accent.
- **Typographie** : Combinaison Serif (pour titres, storytelling) et Sans-Serif (navigation, boutons, prix).
- **Hero Section** : Composition éditoriale avec image premium et animation fluide.
- **Motion Design** : Animations fluides (fade, slight scale, hover subtil). Respect du prefers-reduced-motion.
- **Architecture des données mockées** : Séparation claire (Hommes, Femmes, Mixte | Standard, Premium, Légende, Master) structurée pour bascule API facile.
- **Organisation du code** : Composants réutilisables, séparation stricte (components, pages, layouts, data, styles, etc.).
- **Aucun placeholder vide** : Utilisation de données mockées réalistes pour un rendu "produit fini".
