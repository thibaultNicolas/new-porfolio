# Portfolio Premium - Nicolas Thibault

Portfolio développeur premium de niveau 2026, conçu pour impressionner les clients premium, recruteurs senior et fondateurs/CTOs.

## 🚀 Stack Technique

- **Next.js 16+** avec App Router
- **TypeScript** strict mode
- **React 19+** (Server Components par défaut)
- **TailwindCSS v4** pour le styling
- **Framer Motion** + **GSAP** pour les animations premium
- **Lenis** pour le smooth scrolling
- **Zod** pour la validation runtime

## 🎨 Design System

### Couleurs Premium (Light Mode First)

- **Fond** : Blanc (#ffffff) avec accents gris subtils
- **Accent Noir** : #000000 (premium, editorial)
- **Typography** : Geist Sans (moderne, clean)
- **Spacing** : Scale éditoriale généreuse

### Animations

- Animations intentionnelles et raffinées
- Text reveal (caractère par caractère)
- Scroll-triggered animations avec GSAP
- Hover effects premium (scale, border, opacity)
- Parallax subtil

## 📁 Structure du Projet

```
src/
├── app/
│   ├── layout.tsx          # Layout racine avec Lenis
│   ├── page.tsx            # Page d'accueil avec toutes les sections
│   └── globals.css         # Design system & styles globaux
│
├── components/
│   ├── ui/                 # Composants UI réutilisables
│   │   ├── Button.tsx      # Button avec variants premium
│   │   └── index.ts
│   ├── sections/           # Sections de page
│   │   ├── Hero.tsx        # Hero avec animations premium
│   │   ├── About.tsx       # Section About avec scroll animations
│   │   ├── Experience.tsx  # Timeline verticale animée
│   │   ├── Projects.tsx     # Grid de projets avec hover effects
│   │   ├── TechStack.tsx   # Stack technique avec micro-interactions
│   │   ├── Process.tsx     # Processus de travail
│   │   └── index.ts
│   ├── layout/              # Composants de layout
│   │   ├── Header.tsx      # Navigation sticky avec menu mobile
│   │   ├── Footer.tsx       # Footer minimal avec social links
│   │   └── index.ts
│   └── providers/          # Providers React
│       └── SmoothScrollProvider.tsx
│
├── data/                   # Données du portfolio (data-driven)
│   ├── projects.ts        # Projets
│   ├── experience.ts      # Expériences professionnelles
│   └── skills.ts          # Compétences techniques
│
├── lib/
│   ├── hooks/              # Custom React Hooks
│   │   └── useScrollAnimation.ts
│   └── utils/
│       ├── animations.ts   # Variants Framer Motion
│       └── cn.ts           # Utility pour classes Tailwind
│
└── types/                  # Types TypeScript globaux
    └── index.ts
```

## ✨ Sections Implémentées

### ✅ Header / Navigation

- Sticky header avec backdrop blur
- Navigation smooth scroll
- Menu mobile animé
- Hover states premium

### ✅ Hero Section

- Animation d'entrée fluide
- Text reveal caractère par caractère
- Background dynamique avec parallax
- CTAs avec hover effects premium
- Scroll indicator animé

### ✅ About Section

- Scroll-triggered animations (GSAP)
- Grid de highlights avec hover effects
- Typography premium avec hierarchy claire

### ✅ Experience Section

- Timeline verticale animée
- Alternance gauche/droite sur desktop
- Cards avec hover effects
- Technologies et achievements

### ✅ Projects Section

- Grid de projets avec hover reveal
- Overlay animé au hover
- Metadata (role, impact, stack)
- Cards premium avec border animations

### ✅ Tech Stack Section

- Layout moderne par catégories
- Micro-interactions sur hover
- Tags animés avec stagger

### ✅ Process Section

- 4 étapes du processus de travail
- Cards avec hover effects
- Numérotation premium

### ✅ Footer

- Minimal et élégant
- Name + role
- Social links avec animations
- Copyright

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer le serveur de production
npm start

# Linter
npm run lint
```

## 📝 Personnalisation

### Modifier le Contenu

Les données sont centralisées dans `/src/data/` :

- **`projects.ts`** : Ajoutez/modifiez vos projets
- **`experience.ts`** : Mettez à jour votre expérience
- **`skills.ts`** : Personnalisez votre stack technique

### Modifier les Couleurs

Les couleurs sont définies dans `src/app/globals.css` via les variables CSS :

```css
--color-white: #ffffff;
--color-black: #000000;
--color-accent: #000000;
```

### Modifier les Animations

Les variants d'animation sont dans `src/lib/utils/animations.ts`. Personnalisez-les selon vos besoins.

## 🎯 Fonctionnalités Premium

- ✅ **Smooth Scrolling** : Lenis pour un scroll fluide
- ✅ **Animations Intentionnelles** : Framer Motion + GSAP
- ✅ **Performance** : Server Components, optimisations Next.js
- ✅ **SEO-Ready** : Metadata complète, structure sémantique
- ✅ **Accessible** : ARIA labels, focus states, navigation clavier
- ✅ **Responsive** : Mobile-first, breakpoints optimisés
- ✅ **Data-Driven** : Contenu facilement modifiable

## 💡 Philosophie

Chaque décision de design et technique renforce la crédibilité senior et la qualité premium. Le portfolio est conçu pour :

- ✅ Impressionner les clients premium
- ✅ Attirer les recruteurs senior
- ✅ Convaincre les fondateurs/CTOs
- ✅ Démontrer un niveau de compétence élevé

**Pas de template générique.** Tout est personnalisé, intentionnel et premium.

---

**Note** : Ce portfolio suit les standards 2026 pour les portfolios développeur premium. Prêt pour un niveau Awwwards.
