# Partie 2
## Objectif
Réussir à atteindre la sortie du labyrinthe en utilisant le moins de déplacements possibles :
- [x] start-game
- [x] discover
- [x] move
- [x] historisation (bonus) :
  - [x] console
  - [x] fichier de log

## Technologies
- Node.js + npm
- dotenv
- TypeScript
- Jest

## Installation
Pré-requis : [Node.js](https://nodejs.org/en/download/)

1. Cloner le dépôt :
```bash
git clone git@github.com:fullstack-misc/prtm-game-2.git
```

2. Installer les dépendances :
```bash
cd prtm-game-2
npm install
```

3. Configurer les variables d'environnement :
- Copier le fichier .env.example en .env. 
- Dans le fichier .env, mettre les valeurs nécessaires. Exemple de contenu :
  ```
  API_URL=https://api.dev/
  PLAYER_NAME=Joueur1
  ```
  (s'assurer d'avoir le / à la fin de la valeur de API_URL)

4. Lancer l'application via l'une des deux commandes suivantes :
```bash
npm run start
```
ou pour le mode développement :
```bash
npm run dev
```

5. Pour lancer les tests :
- Lancement des tests unitaires :
  ```bash
  npm run test
  ```
- Lancement des tests unitaire avec couverture de code :
  ```bash
  npm run test:coverage
  ```


## Améliorations possibles
- Compléter les tests.
- Conteuniriser l'application avec Docker.
- Redéfinir `playerState`.
