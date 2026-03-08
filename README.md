# Job Finder App - LinkedIn Clone

Une application web moderne de type LinkedIn construite avec Angular 21, HTML et CSS. L'application permet aux utilisateurs de se connecter, parcourir et postuler à des emplois, gérer leur profil, et communiquer en temps réel.

## Fonctionnalités

✅ **Authentification**
- Connexion / Inscription
- Stockage sécurisé des tokens
- Protections des routes

✅ **Gestion des Emplois**
- Liste des emplois avec recherche
- Détails complets des emplois
- Candidature aux emplois
- Suivi des candidatures
- Création d'annonces d'emploi

✅ **Chat en Temps Réel**
- Conversations entre utilisateurs
- Historique des messages
- Notifications de messages non lus
- Interface conversationnelle intuitive

✅ **Profil Utilisateur**
- Affichage du profil complet
- Expérience professionnelle
- Formations
- Compétences
- Connexions et abonnés

✅ **Dashboard**
- Vue d'ensemble des emplois recommandés
- Messages récents
- Statistiques utilisateur
- Navigation centrale

✅ **Responsive Design**
- Interface adaptée au mobile
- Design moderne et épuré
- Thème LinkedIn authentique

## Technologies

- **Frontend Framework**: Angular 21
- **Language**: TypeScript
- **Styling**: CSS moderne (Grid, Flexbox)
- **State Management**: RxJS Observables
- **Routing**: Angular Router
- **Forms**: Reactive Forms

## Structure du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── jobs/
│   │   │   ├── job-list/
│   │   │   ├── job-detail/
│   │   │   └── job-post/
│   │   ├── chat/
│   │   │   └── chat/
│   │   ├── profile/
│   │   │   └── profile/
│   │   ├── dashboard/
│   │   │   └── dashboard/
│   │   └── applications/
│   │       └── applications/
│   ├── services/
│   │   ├── auth.ts
│   │   ├── job.ts
│   │   ├── chat.ts
│   │   └── user.ts
│   ├── guards/
│   │   └── auth-guard.ts
│   ├── app.routes.ts
│   ├── app.ts
│   └── app.html
└── index.html
```

## Installation

### Prérequis
- Node.js 18+ et npm

### Étapes

1. **Cloner ou accéder au répertoire du projet**
```bash
cd job-finder-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm start
```

4. **Ouvrir dans le navigateur**
```
http://localhost:4200
```

## Utilisation

### Authentification
- Page de connexion: `/login`
- Page d'inscription: `/register`
- Identifiants de test: Vous pouvez utiliser n'importe quel email/mot de passe

### Navigation Principale
- **Dashboard**: Page d'accueil avec aperçu
- **Emplois**: Parcourir et postuler à des emplois
- **Messages**: Communiquer avec d'autres utilisateurs
- **Profil**: Afficher et éditer votre profil

### Pages Principales

#### Login (`/login`)
- Authentification utilisateur
- Validation des formulaires
- Redirection vers le dashboard

#### Register (`/register`)
- Créer un nouveau compte
- Validation des champs
- Confirmation du mot de passe

#### Dashboard (`/dashboard`)
- Vue d'ensemble des emplois recommandés
- Messages récents
- Profil utilisateur
- Statistiques

#### Emplois (`/jobs`)
- Recherche d'emplois
- Filtre par titre, entreprise, localisation
- Affichage en liste
- Candidature rapide

#### Détail Emploi (`/jobs/:id`)
- Informations complètes
- Compétences requises
- Salaire et type d'emploi
- Candidature

#### Chat (`/chat`)
- Liste des conversations
- Affichage des messages
- Envoi de messages en temps réel
- Notifications de lecture

#### Profil (`/profile/:id`)
- Expérience professionnelle
- Formations
- Compétences
- Statistiques de connexions

#### Mes Candidatures (`/applications`)
- Historique des candidatures
- Suivi du statut
- Accès rapide aux emplois

#### Créer une Annonce (`/post-job`)
- Formulaire complet
- Validation
- Publication

## Services

### Auth Service
- `login(credentials)` - Authentification
- `register(data)` - Inscription
- `logout()` - Déconnexion
- `getCurrentUser()` - Utilisateur actuel
- `isAuthenticated()` - Vérifier l'authentification

### Job Service
- `getJobs()` - Liste des emplois
- `getJobById(id)` - Détails d'un emploi
- `searchJobs(query)` - Rechercher des emplois
- `postJob(job)` - Créer une annonce
- `applyForJob(jobId, userId)` - Postuler
- `getUserApplications(userId)` - Candidatures de l'utilisateur

### Chat Service
- `getConversations()` - Liste des conversations
- `getMessages(conversationId)` - Messages d'une conversation
- `sendMessage(...)` - Envoyer un message
- `createConversation(...)` - Créer une conversation
- `markAsRead(conversationId)` - Marquer comme lu

### User Service
- `getUserProfile(userId)` - Profil utilisateur
- `updateUserProfile(userId, data)` - Mettre à jour le profil
- `getAllUsers()` - Liste de tous les utilisateurs
- `searchUsers(query)` - Rechercher des utilisateurs

## Déploiement

### Build pour Production
```bash
npm run build
```

### Déployer sur SSR
```bash
npm run serve:ssr:job-finder-app
```

## Personnalisation

### Changer les couleurs
Les couleurs primaires sont définies dans les fichiers CSS. La couleur primaire est `#0a66c2` (LinkedIn blue).

### Ajouter des données mock
Modifiez les données dans les services (`src/app/services/`) pour ajouter plus d'emplois, d'utilisateurs, etc.

## Fonctionnalités Futures

- [ ] Intégration avec une API backend
- [ ] Authentification OAuth
- [ ] Notifications en temps réel avec WebSocket
- [ ] Upload d'images de profil
- [ ] Filtre avancé d'emplois
- [ ] Recommandations basées sur IA
- [ ] Notifications email
- [ ] Système de notes

## Support

Pour toute question ou problème, contactez le support du projet.

## Licence

Ce projet est sous licence MIT.

## Auteur

Créé avec Angular 21, HTML et CSS moderne.


To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
