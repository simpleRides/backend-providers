# ROUTES PROVIDERS VTC

L'url pour le webservice est la suivante :
https://backend-providers-wine.vercel.app/

Pour simplifier les requêtes, 3 domaines existent : uber, heetch et bolt.
Chaque domaine correspond à une base de donnée indépendante.

Pour y accéder, ajouter le nom du VTC à la fin de l'URL avant d'inscrire la demande.

Exemple: https://backend-providers-wine.vercel.app/uber/nom_de_la_demande

------------------------------- REQUÊTES VTC -------------------------------

RECUPERER TOUTES LES COURSES :

Type: GET --- Route: / --- Exemple: https://backend-providers-wine.vercel.app/uber renverra toutes les courses de la BDD uber.

RECUPERER UNE COURSE PAR SON ID :

Type: GET --- Route: /id --- Exemple: https://backend-providers-wine.vercel.app/bolt/id renverra la course correspondant au req.body.id renseigné dans la BDD Bolt

Infos REQUISES (obligatoire) dans le body:
id = course_id de la course recherchée

RECUPERER LES COURSES PAR SETTINGS :

Type: POST --- Route: /settings --- Exemple: https://backend-providers-wine.vercel.app/bolt/settings renverra les courses correspondantes aux préferences de l'utilisateur dans la BDD Bolt

Infos possibles dans le body (si non renseignées, valeurs par défaut)

clientNoteMin = Note minimale de la course (Défaut: 0)
clientNoteMax = Note maximale de la course (Défaut: 5)
priceMin = Prix minimum de la course (Défaut: 0)
priceMax = Prix maximum de la course (Défaut: 100000)
markupMin = Markup minimum de la course (Défaut: 1)
markupMax = Markup maximum de la course (Défaut: 3)
distanceMin = Distance minimum de la course (Défaut: 0)
distanceMax = Distance maximum de la course (Défaut: 100000)
travelTimeMin = Durée de trajet minimum (Défaut: 0)
travelTimeMax = Durée de trajet maximum (Défaut: 100000)

PRENDRE UNE COURSE :

Type: PUT --- Route: /ridesTaken --- Exemple: https://backend-providers-wine.vercel.app/heetch/ridesTaken passera le status de la course avec la course_id renseignée en 'Taken', et inscrira le driver_id dans la course dans la BDD Heetch.

Infos REQUISES (obligatoire) dans le body:
course_id = course_id de la course ciblée
driver_id = id du driver prenant la course

------------------------------- REQUÊTES USERS --------------------------------

Pour accéder à la BDD users, il faut inscrire le domaine users avant d'inscrire la demande.

Exemple: https://backend-providers-wine.vercel.app/users/nom_de_la_demande

SE CONNECTER :

Type: POST --- Route: /signin --- Exemple: https://backend-providers-wine.vercel.app/users/signin renverra le token de l'utilisateur renseigné en body et un result true si celui ci figure dans la BDD users, ou un result false si celui ci est absent.

Infos REQUISES (obligatoire) dans le body:
username = nom de l'utilisateur
password = mot de passe de l'utilisateur

S'ENREGISTRER DANS LA BDD :

Type: POST --- Route: /signup --- Exemple: https://backend-providers-wine.vercel.app/users/signup enregistrera le nouvel utilisateur dans la BDD users et renverra un result true ainsi que le token associé, ou un result false si un soucis a eu lieu dans la requête.

Infos REQUISES (obligatoire) dans le body:
username = nom de l'utilisateur
password = mot de passe de l'utilisateur

------------------------------- REQUÊTES SERVER -------------------------------

Les commandes serveurs sont des commandes utilitaires pour les développeurs.
Elles ne sont pas déstinées à être appelées autrement que manuellement par un développeur averti.
Chaque requête server est précédé par le mot server-.

COTE PROVIDERS :

RAFRAICHIR LE STATUS DES COURSES EN FONCTION DE L'HEURE :

Type: PUT --- Route: /server-refresh --- Exemple: https://backend-providers-wine.vercel.app/uber/server-refresh mettra à jour tous les status des courses de la BDD uber dont l'heure est déjà passée sur 'Passed'.

GENERER DES COURSES ALEATOIRES :

Type: POST --- Route: /server-generate/:num --- Exemple: https://backend-providers-wine.vercel.app/bolt/server-generate/50 va générer 50 nouvelles courses sur la BDD bolt.

Infos REQUISES (obligatoire) : mettre un numéro en PARAMS (:num)

SUPPRIMER TOUTE LA BASE DE DONNEE :

Type: DELETE --- Route: /server-delete --- Exemple: https://backend-providers-wine.vercel.app/heetch/server-delete supprimera l'intégralité des courses présentes dans la BDD heetch.

COTE USERS :

SUPPRIMER TOUTE LA BASE DE DONNEE :

Type: DELETE --- Route: /server-delete --- Exemple: https://backend-providers-wine.vercel.app/users/server-delete supprimera l'intégralité des users présents dans la BDD users.
