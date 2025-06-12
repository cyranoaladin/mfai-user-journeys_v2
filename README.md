# Money Factory AI - User Journeys

Application Next.js pour les parcours utilisateurs de Money Factory AI, permettant aux utilisateurs de suivre des parcours d'apprentissage et d'obtenir des récompenses.

## Structure du projet

Le projet suit une architecture modulaire avec une séparation claire des préoccupations :

```
components/
├── Journey/
│   ├── Header/       → Titre, sous-titre, types
│   ├── Intro/        → Introduction du parcours
│   ├── Sidebar/      → Profil, rôle, "Why It Matters"
│   ├── Phases/       → Système de phases, navigation, feedback
│   ├── Rewards/      → Section de preuve, badges
│   ├── Zyno/         → Actions Zyno, simulateur
│   ├── SkillchainMap.tsx
│   └── XPTracker.tsx
├── Layout/
└── UI/              → badge, button, modal, progress, toast
pages/
├── index.tsx        → Page d'accueil
└── journey/
    └── [slug].tsx   → Page de détail d'un parcours
journeys/            → Contenu Markdown des parcours
types/               → Types TypeScript centralisés
utils/
├── journeyRegistry.ts → Registre des parcours et relations
├── markdownParser.ts  → Parser pour le contenu Markdown
└── types.ts          → Types utilitaires
```

## Démarrage

Pour lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

Vous pouvez commencer à éditer les pages en modifiant les fichiers dans le dossier `pages/`. Les pages se mettent à jour automatiquement lorsque vous modifiez les fichiers.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
