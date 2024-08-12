Installation :
+ Node js (v14)
+ Python (v 3.x)
+ MongoDB

Pour le frontend : 
==>cd frontend 
==> npm insatall 
+ Configurez les variables d'environnement dans un fichier '.env' :
MONGO_URL=mongodb://localhost:27017/NomDuProjet
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET = votre mot de passe
GITHUB_ID= id à recupérer via githib
GITHUB_SECRET= clé à recupérer via githib

+ run le forntend avec la commande :
==> npm run dev

Pour Backend flask :

De meme pour le fichier '.env' : 
API  : ajouter le clé du api à récupérer le lien  " https://aistudio.google.com/app/apikey "

puis dans le dossier backend : 
==> python run app.py
==> stramlit run visualisation.py
