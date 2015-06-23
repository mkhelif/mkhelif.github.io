---
title: 'GWT 1.6 : quoi de neuf ?'
author: mkhelif
layout: post
permalink: /gwt-16-quoi-de-neuf/
tweet_this_url:
  - http://bit.ly/UGENZ
categories:
  - Actualités
  - Google
  - GWT
  - J2EE
  - Java
  - RIA
tags:
  - GWT
  - RIA
  - Web
---
Ça y est <a href="http://code.google.com/intl/fr/webtoolkit/makinggwtbetter.html#roadmap" target="_blank">la roadmap</a> pour la version 1.6 de GWT a été publiée sur <a href="http://googlewebtoolkit.blogspot.com/2008/12/whats-ahead-for-google-web-toolkit_10.html" target="_blank">le blog officiel de GWT</a>. Aucune date précise quand à la sortie de cette version, mais elle est annoncée pour le premier trimestre 2009.

Voilà les nouvelles fonctionnalités pour cette version :

  * Nouvelle structure de déploiement : l&#8217;objectif étant de permettre un déploiement plus simple des WARs sur un serveur d&#8217;applications. Il s&#8217;agit surtout d&#8217;une restructuration dont voici <a href="http://code.google.com/p/google-web-toolkit/wiki/WAR_Design_1_6" target="_blank">la spécification</a>.
  * Jetty sera utilisé à la place de Tomcat (j&#8217;en parlais d&#8217;en <a href="http://www.mkhelif.fr/2008/10/21/gwt-16-tomcat-ou-jetty.html" target="_blank">un billet précédent</a>). Une architecture plus modulable du hosted mode permettra de changer le serveur utilisé.
  * Uniformisation des événements : les listeners actuels seront dépréciés et les nouveaux seront uniformisés pour tous les widgets.
  * Intégration du <a href="http://code.google.com/intl/fr/docreader/#p=google-web-toolkit-incubator&s=google-web-toolkit-incubator&t=Spinner" target="_blank">DatePicker</a> et du <a href="http://code.google.com/intl/fr/docreader/#p=google-web-toolkit-incubator&s=google-web-toolkit-incubator&t=LazyPanel" target="_blank">LazyPanel</a> depuis l&#8217;incubateur GWT. Le DatePicker est comme son nom l&#8217;indique un widget permettant de sélectionner des dates (<a href="http://collectionofdemos.appspot.com/demo/com.google.gwt.demos.spinner.SpinnerDemo/SpinnerDemo.html" target="_blank">démo du DatePicker</a>). Le LazyPanel permet de charger un composant uniquement lorsqu&#8217;on en a besoin (appel à la méthode *setVisible (true)*), ça permet de gagner du temps lors de l&#8217;initialisation de l&#8217;application.
  * Optimisation des String : les StringBuilder seront optimisés pour chaque navigateurs grâce au deferred binding (optimisation à la compilation).
  * Optimisation du compilateur GWT : réduction du temps de compilation.

Et celles qui sont prévues pour la suite :

  * Découpage du code JavaScript généré en plusieurs fichiers. Le développeur pourra spécifier des points de césures qui permettront au compilateur de découper le code généré en plusieurs fichiers. Cela permettra évidemment d&#8217;éviter au client de télécharger toute l&#8217;application GWT en un seul fichier. Ceci lié au LazyPanel, les applications GWT devraient gagner en rapidité de chargement.
  * Analyse du code compilé, appelée Story Of Your Compile (SOYC)  : rapport permettant aux développeurs de savoir quelle classe génère le plus de code JavaScript.
  * <a href="http://www.mkhelif.fr/2008/12/09/gwt-le-futur-hosted-mode.html" target="_blank">Sélection du navigateur à utiliser pour le hosted mode</a>.
  * <a href="http://code.google.com/p/google-web-toolkit-incubator/wiki/UiBinder" target="_blank">Ui Binder</a> : création des composants par déclaration, permet de séparer le layouting des composants (géré dans un fichier XML) de leur lien avec le modèle (géré dans le code Java).
  * Client Bundle : généralisation du deferred binding (utilisé actuellement dans les Image Bundle) aux autres ressources statiques (css : CSSRessource, texte : TextRessource, image : ImageRessource).
  * Optimisation du protocole RPC.

EDIT: [La version 1.6 de GWT est sortie.][1]

 [1]: http://www.mkhelif.fr/2009/04/08/google-gwt-version-16-et-consorts.html
