---
title: 'GWT : Introduction au framework'
author: mkhelif
layout: post
permalink: /gwt-introduction-au-framework/
tweet_this_url:
  - http://bit.ly/2HzclG
categories:
  - Google
  - GWT
  - Java
  - RIA
  - Tutoriel
tags:
  - GWT
  - Java
  - RIA
---
Je travaille actuellement sur un plugin pour le logiciel <a href="http://www.neotys.fr/" target="_blank">NeoLoad</a> permettant d&#8217;enregistrer des requêtes RPC effectuer par le framework GWT (<a href="http://code.google.com/webtoolkit/" target="_blank">Google Web Toolkit</a>). Je vais donc en profiter pour présenter ce framework.

<!--more-->

### Qu&#8217;est ce que GWT?

Google Web Toolkit est un framework qui permet de créer un RIA (Rich Internet Application) sans avoir à écrire des centaines de lignes de JavaScript. GWT est un compilateur qui génére à partir de code source Java des fichiers JavaScript, XML et HTML.

Pour rendre dynamique le site vous pouvez ajouter une couche client-serveur RPC (Remote Protocol Call) entre le JavaScript côté client et le Java côté serveur. Cela permet de faire transiter par HTTP des objets Java entre le client et le serveur et des objets JSON entre le serveur et le client.

Afin de simplifier les étapes de tests et de débug, GWT fourni une JRE permettant d&#8217;exécuter l&#8217;application en local : **Hosted Mode**. Ceci évite la compilation de l&#8217;application et le déploiement sur le serveur.

GWT a donc pour but principal de simplifier et d&#8217;unifier le développement d&#8217;application Web : le développeur crée les classes Java nécessaire à l&#8217;application et GWT s&#8217;occupe du reste.

### Le compilateur GWT

Dans cet objectif le compilateur GWT génère du code Javascript compatible pour la plupart des navigateurs : Firefox (version 1 à 3), IE (version 6 et 7), Safari (version 2) et Opéra (version 9).

Le code Java écrit par le développeur doit être compatible Java 1.4 minimum. GWT simule le comportement d&#8217;une JRE pour générer le Javascript, mais seulement certaines classes de l&#8217;API sont supportées : <a href="http://code.google.com/webtoolkit/documentation/jre.html" target="_blank">classes supportées par GWT</a>.

### Démarrage de l&#8217;application GWT

##### Chargement des paramètres du navigateur

Afin d&#8217;avoir une application qui fonctionne peu importe les paramètres de l&#8217;utilisateur (langue, version du navigateur, &#8230;) GWT va générer à la compilation un fichier JavaScript par type de navigateur supporté et par langue de l&#8217;application.

Lorsqu&#8217;un utilisateur accède à la page d&#8217;acceuil de l&#8217;application GWT va charger le fichier JavaScript correspondant à la configuration de l&#8217;utilisateur.

##### Page HTML

La page HTML d&#8217;entrée dans l&#8217;application ne contient qu&#8217;une frame vide qui va charger le JavaScript adéquat selon la configuration de l&#8217;utilisateur.

<pre lang="html">
	

	
		<!-- Gestion de l'historique par GWT -->
		
	

</pre>

L&#8217;application démarre en plusieurs étapes :

  1. Chargement de la page HTML par le navigateur.
  2. Chargement et exécution du JavaScript *.nocache.js*.
  3. Le code JavaScript récupère la configuration du navigateur et récupère à partir d&#8217;une table (générée par GWT) le nom du fichier HTML à utiliser.
  4. Le JavaScript crée alors une frame cachée qui est insérée à la fin du **body** de la page.
  5. Lorsque le fichier HTML est chargée l&#8217;application est démarée.

### Fichiers générés par le compilateur

##### Fichier JavaScript *.nocache.js*

Ce fichier permet de chargée une version de l&#8217;application compatible avec le navigateur du client.

Ce fichier contient une table avec en clé la configuration du client et en valeur l&#8217;URL du fichier HTML à charger. Par exemple ce fichier contiendra une entrée avec &#8216;Firefox en français&#8217;, &#8216;IE en anglais&#8217;, &#8216;Opera en allemand&#8217;, &#8230;

Chaque navigateur ayant une interprétation du JavaScript différent, cela permet de tirer parti de toutes les spécificités du navigateur.

Ce fichier *nocache* doit être re-téléchargé par le navigateur à chaque chargement de la page car il est recréé lorsque l&#8217;on recompile l&#8217;application. Cependant le nom ne change pas.

##### Fichier HTML *.cache.html*

Ces fichiers HTML (il y en à un par navigateur et par langue) contient uniquement le JavaScript compressé de l&#8217;application. Le fichier JavaScript n&#8217;est pas envoyé directement car certains navigateur ne supporte pas le JavaScript compressé. Il est donc inclus dans du HTML afin d&#8217;éviter les problèmes de compatibilité.

Chaque fichier HTML a pour nom la signature MD5 de son contenu afin d&#8217;éviter que plusieurs fichiers HTML aient le même nom. Ainsi si vous modifiez le code de votre application, les fichiers n&#8217;auront pas le même nom.

Ces fichiers étant différents à chaque compilation, ils peuvent être mis en *cache* par le navigateur. D&#8217;où leurs noms *cache.html*.

##### Fichier *.gwt.rpc*

Si votre application utilise des appels RPC vers le serveur et que les requêtes utilisent les objets Java que vous avez créé, ces objets doivent être sérialisés pour pouvoir transiter par le protocole HTTP.

Ces fichiers définissent quels objets doivent être sérialisés et leur politique de sérialisation.

### Conclusion

Voilà une première introduction au framework GWT. Ce framework est très prometteur car il permet de s&#8217;abstraire de tous les problèmes que l&#8217;on rencontre pendant le développement d&#8217;une application AJAX.