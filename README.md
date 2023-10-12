# Projet React

Avant de commencer à rentrer dans le dur, n'hésitez pas à jeter un coup d'oeil à ces quelques ressources:

* [React.dev / Learn](https://fr.react.dev/learn/your-first-component)
* [React.dev / Docs](https://fr.react.dev/reference/react)
* [React with TypeScript](https://www.totaltypescript.com/tutorials/react-with-typescript)

## Stack du starter

* [Vite](https://vitejs.dev/) - Tooling
* [SWC](https://swc.rs/) - Bundler JS
* [Turso](https://turso.tech/) - Base de donnée SQLite / LibSQL

## 🎯 Objectif
**Créer une application React permettant de créer des duels entre deux personnages Marvel.** 💥

Vous pouvez utilisez les librairies que vous voulez, composants UI ou utilitaires.

## 🧩 Fonctionnalités :

### En tant qu'utilisateur, je souhaite pouvoir voir un duel entre _deux_ personnages Marvel afin de voter pour celui que je considère comme étant le _plus fort_.

* [Mockup](https://link.excalidraw.com/l/Ar72fT3P6X3/5m0AgP5OvdE)

#### Critières d'acceptation:
- Lorsque l'utilisateur arrive sur la page d'accueil, deux personnages aléatoirement choisis lui sont proposés.
- L'utilisateur doit avoir un moyen de choisir entre l'un des deux personnages.
- Une fois un choix effectué par l'utilisateur, un autre duel lui est proposé.
- Un bouton permet de générer un nouveau duel aléatoirement

### En tant qu'utilisateur, je souhaite visualiser _tous les personnages_ afin de voir le nombres de victoires par personnages.

####  Critères d'acceptation:
- L'utilisateur doit pouvoir voir une liste de personnages triés par nombres de victoires et par ordre décroissant.
- L'utilisateur doit pouvoir voir pour chaque personnage, son nombre de victoires.

### En tant qu'utilisateur, je souhaite visualiser _tous les duels passés_, afin de voir le nombres de duels.

####  Critères d'acceptation:
- L'utilisateur doit pouvoir voir tous les duels enregistrés par tous les utilisateurs.
- L'utilisateur doit pouvoir voir pour chaque duel, qui a été désigné _vainqueur_ ou _perdant_.

## ⚙️ Configuration

### Marvel API

On utilise l'API Marvel (https://developer.marvel.com/docs) pour récupérer les personnages. Pour se connecter à cette API : 
* [Se connecter / Créer un compte](https://developer.marvel.com/signup)
* Récupérer votre clé public sur [My Developer Account](https://developer.marvel.com/account)
* Dupliquer `.env.example` et renommer la copie en `.env.local` puis assignez votre clé à la variable d'environement `VITE_MARVEL_API_KEY` dans votre fichier `.env.local`

### Base de données

* Me contacter pour avoir les credentials 🥷

ATTENTION: ⚠️ Ne surtout pas déployer le build de l'application, les tokens étant embarqués dedans 🤡

## ⚡️ API Client

Des méthodes sont déjà disponibles, permettant de vous faire gagner du temps pour récupérer des données ou alimenter la base de données.

### Utilisation

```typescript
import { useApiClient } from "@/components/ApiClient";

const Component = () => {
   const client = useApiClient();
   client.getUniqueRandomCharacters(2).then(console.log);
   // ...
}
// => [
//     {
//         "id": 1009277,
//         "name": "Domino",
//         "description": "",
//         "image_url": "http://i.annihil.us/u/prod/marvel/i/mg/f/60/526031dc10516.jpg",
//         "created_at": 1696782965448
//     },
//     {
//         "id": 1011023,
//         "name": "Defenders",
//         "description": "",
//         "image_url": "http://i.annihil.us/u/prod/marvel/i/mg/3/80/526031e9c785a.jpg",
//         "created_at": 1696782965448
//     }
// ]
```
### Méthodes

* Voir **ApiClient** : [lib/api-client/client.ts](lib/api-client/client.ts)