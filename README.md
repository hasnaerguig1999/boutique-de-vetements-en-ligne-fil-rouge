# -boutique-de-vetements-en-ligne-fil-rouge
Ce projet est une boutique de vêtements en ligne développée avec React.js pour le frontend et Express.js pour le backend. L'objectif principal de cette application est de permettre aux utilisateurs de parcourir une gamme de vêtements disponibles à l'achat, de les ajouter à leur panier, et de passer une commande en ligne.
# Prérequis
Avant de commencer, assurez-vous d'avoir installé :
*Node.js
*npm (généralement installé avec Node.js)
*Mysql
# Installation
1.Clonez le dépôt :
````
git clone [https://github.com/hasnaerguig1999/-Gestion-de-Paiement-de-Cotisation-Syndicale](https://github.com/hasnaerguig1999/boutique-de-vetements-en-ligne-fil-rouge/new/master?filename=README.md)
````
2.Remplacez votre répertoire de travail par le dossier du projet
````
cd boutique-de-vetements-en-ligne-fil-rouge
````
aprés 
````
cd backend
````
3.Installez les dépendances :
````
npm install
````
# Configuration
Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement suivantes :
````
MYSQL_DATABASE=votre_db
DB_USER= root
MYSQL_PASSWORD=root
MYSQL_ROOT_PASSWORD=root
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=votre_secret_key
````
j'ai déja fait un exemple sur .env.example
Pour ignorer les dossiers node_modules et le fichier .env en utilisant un fichier .gitignore, vous devez simplement ajouter leurs noms au fichier. Voici comment vous pouvez le faire :
4.Créez un fichier .gitignore à la racine de votre projet si vous n'en avez pas déjà un.
5.Ouvrez le fichier .gitignore et ajoutez les lignes suivantes :
````
node_modules/
.env
````
# Exécution
-Pour démarrer le serveur, exécutez :
````
npm start
````

et pour la partié frontend
````
cd frontend
````
6.aprés Installez les dépendances :
````
npm install
````
# Utilisation

````
npm start
````

Pour ignorer les dossiers node_modules et le fichier .env en utilisant un fichier .gitignore, vous devez simplement ajouter leurs noms au fichier. Voici comment vous pouvez le faire :
7.Créez un fichier .gitignore à la racine de votre projet si vous n'en avez pas déjà un.
8.Ouvrez le fichier .gitignore et ajoutez les lignes suivantes :
````
node_modules/
````





