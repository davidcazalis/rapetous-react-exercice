# Projet React

## 🎯 Objectif
**Créer une application React permettant de créer des duels entre deux personnages Marvel.** 💥

Vous pouvez utilisez les librairies que vous voulez, composants UI ou utilitaires.

## 🧩 Fonctionnalités :
### En tant qu'utilisateur, je souhaite pouvoir voir un duel entre _deux_ personnages Marvel afin de voter pour celui que je considère comme étant le _plus fort_.

#### Critières d'acceptation:
- Lorsque l'utilisateur arrive sur la page d'accueil, deux personnages aléatoirement choisis lui sont proposés.
- L'utilisateur doit avoir un moyen de choisir entre l'un des deux personnages.
- Une fois un choix effectué par l'utilisateur, un autre duel lui est proposé.

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
* Assigner votre clé à la variable d'environement `REACT_APP_MARVEL_API_KEY` dans votre fichier `.env`

### Base de données

* Me contacter pour avoir les credentials 🥷

## ⚡️ API Client

Des méthodes sont déjà disponibles, permettant de vous faire gagner du temps pour récupérer des données ou alimenter la base de données.

### Utilisation

```typescript
import { APIClient } from "./api";

const client = new APIClient();

client.getUniqueRandomCharacters(2)
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

#### constructor()
Initialise une nouvelle instance de APIClient.

#### filterCharactersCriteria(characters: MarvelApiCharacter[]): Promise<MarvelApiCharacter[]>
Filtre les personnages selon certains critères, comme leur présence dans la base de donnée ou si ce sont des personnages mineurs, avec peu d'apparitions dans des publications.

#### getCharactersFromMarvelApi(options: { id?: number; limit?: number; offset?: number; unfiltred?: boolean; }): Promise<MarvelApiCharacter[]>
Récupère des personnages depuis l'API Marvel. Si les personnes récupérés passent les critères d'acceptations, ils sont ajoutés à la base de donnée pour être réutilisés par d'autres méthodes.

#### getCharactersFromDB(): Promise<MarvelCharacter[]>
Récupère tous les personnages depuis la base de données.

#### getCharacterFromDB(id: MarvelApiCharacter["id"]): Promise<MarvelCharacter>
Récupère un personnage spécifique depuis la base de données.

#### getRandomCharactersFromAPI(count: number = 1): Promise<MarvelCharacter[]>
Récupère un certain nombre de personnages aléatoires depuis l'API Marvel.

#### getRandomCharacterFromAPI(): Promise<MarvelCharacter>
Récupère un personnage aléatoire depuis l'API Marvel.

#### getRandomCharacterFromDB(): Promise<MarvelCharacter>
Récupère un personnage aléatoire depuis la base de données.

#### getRandomCharacter(excludeIds: number[] = []): Promise<MarvelCharacter>
Récupère un personnage aléatoire, avec possibilité d'exclusion.

#### getUniqueRandomCharacters(count: number): Promise<MarvelCharacter[]>
Récupère une liste unique de personnages aléatoires.

#### addCharacters(characters: MarvelApiCharacter[]): Promise<void>
Ajoute plusieurs personnages à la base de données.

#### getCharacter(id: number): Promise<MarvelCharacter>
Récupère un personnage spécifique, soit depuis la base de données, soit depuis l'API Marvel.

#### addVote(stronger: MarvelCharacter, weaker: MarvelCharacter): Promise<void>
Ajoute un vote pour déterminer quel personnage est le plus fort.

#### getCharactersByVotes(): Promise<MarvelCharacter[]>
Récupère tous les personnages triés par leurs nombres de votes.

#### getCharactersWithoutVotes(): Promise<MarvelCharacter[]>
Récupère tous les personnages qui n'ont jamais reçu de votes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
