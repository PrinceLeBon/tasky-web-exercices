# Tasky Web : dépôt d'exercices

Dépôt compagnon de la leçon **20.5 « Exercice : relire une PR et résoudre un conflit »** du cours *Tasky Web : De Flutter au Web*.

C'est une version réduite de Tasky (la liste des tâches, sans routeur ni API), écrite selon les règles du cours : organisation par fonctionnalité, tokens de design, état global avec Zustand, stockage validé avec Zod, tests Vitest, lint oxlint sans aucun avertissement toléré.

## Démarrer

Prérequis : Node.js 22.22 ou plus récent.

```bash
npm ci
npm run dev      # http://localhost:5173
npm run check    # types + lint + tests : à lancer avant chaque commit
```

## Les branches

| Branche | Rôle |
|---|---|
| `main` | Le projet de référence. `npm run check` y passe. |
| `review/pr-42` | Partie A : la PR d'un collègue, à relire. Sa description est dans `PR-42.md`. |
| `conflit/categorie` et `conflit/en-retard` | Partie B : deux fonctionnalités développées en parallèle, qui vont entrer en conflit. |
| `correction/pr-42` | Une version corrigée de la PR. **À n'ouvrir qu'après votre revue.** |

Les consignes complètes sont dans la leçon 20.5. Ne lisez pas le code des branches avant d'y être invité : la découverte fait partie de l'exercice.

## Organisation

- `src/app` : assemblage de l'application.
- `src/features/<nom>` : une fonctionnalité complète (model, data, store, components, pages) et son API publique `index.ts`.
- `src/shared` : composants d'interface et utilitaires génériques.

Règles : `shared` ne dépend de rien ; les fonctionnalités ne se touchent que par leur `index.ts` ; `model` n'importe pas React. Le linter vérifie ces frontières.

## Versions

Versions épinglées (sans `^`), vérifiées le 29 septembre 2026 : React 19.3, Vite 8.3, TypeScript 6.0, oxlint 1.86, Tailwind CSS 4.3, Zustand 5.0, Zod 4.6, Vitest 5.0.
