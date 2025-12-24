# Pages Router (Non utilisé actuellement)

Ce dossier contiendrait les routes si vous utilisiez le **Pages Router** au lieu de l'App Router.

## ⚠️ Important

**Ce projet utilise actuellement l'App Router** (`src/app/`), donc ce dossier `pages/` n'est pas utilisé.

Next.js ne peut pas utiliser les deux systèmes en même temps :

- Si `app/` existe → **App Router** est utilisé (cas actuel)
- Si seulement `pages/` existe → **Pages Router** est utilisé

## 📝 Structure Pages Router (exemple)

Si vous vouliez utiliser le Pages Router, la structure serait :

```
src/pages/
├── _app.tsx          # App wrapper (équivalent à layout.tsx)
├── _document.tsx     # Document HTML personnalisé
├── index.tsx         # Route: /
├── about.tsx         # Route: /about
├── projects/
│   └── index.tsx     # Route: /projects
└── api/
    └── hello.ts      # API Route: /api/hello
```

## 🔄 Migration

Pour migrer vers Pages Router :

1. Supprimez ou renommez `src/app/`
2. Créez vos routes dans `src/pages/`
3. Créez `_app.tsx` pour le layout global

**Recommandation :** Restez avec l'App Router (plus moderne et recommandé) !
