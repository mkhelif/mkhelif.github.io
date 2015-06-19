---
title: 'GWT 2.0 : les nouvelles fonctionnalités'
author: mkhelif
layout: post
permalink: /gwt-2-0-les-nouvelles-fonctionnalits/
tweet_this_url:
  - http://bit.ly/8VM6Mv
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
categories:
  - Google
  - GWT
  - J2EE
  - Java
  - RIA
  - Web
tags:
  - Google
  - GWT
  - J2EE
  - Java
  - RIA
  - Web
---
La version 2.0 de GWT ([Google Web Toolkit][1]) est sortie (j’ai un peu de retard à cause du boulot <img src='http://www.mkhelif.fr/wp-includes/images/smilies/icon_smile.gif' alt=':)' class='wp-smiley' /> ) et avec elle de nombreuses améliorations, principalement pour améliorer le développement des applications. Cette nouvelle version est accompagnée d’un outil d’analyse des performances des sites : *Speed Tracer*, qui donne des pistes d’amélioration de l’application.

### Development Mode

Dans les versions précédentes de GWT, pour tester une application en cours de développement, il y avait le Hosted Mode. C’est une application que l’on lançait depuis son IDE, qui démarrait un serveur Tomcat et qui permettait de tester “rapidement” sont application Web.

En GWT 2.0 le Hosted Mode est remplacé par le In-Browser Development Mode. On installe un plugin (le GWT Developer Plugin) dans son navigateur pour lui permettre de communiquer avec la JVM. Cela permet de bénéficier des différents plugins de son navigateur (Firebug, …) tout en permettant de modifier le code Java en live en rafraichissant la page Web.

### UI Binder

Un des problèmes majeurs de GWT dans ses versions précédentes est la gestion de l’interface graphique depuis le code Java. La manipulation des Widgets (composants graphiques dans GWT) depuis le code Java pour leurs appliquer des styles CSS ou gérer des événements finit par donner du code difficile à maintenir.

GWT 2.0 apporte une solution plutôt élégante avec l’UI Binder, ça permet de lier un template XML à une classe Java. Au passage, les fichiers CSS et JavaScripts (librairies externes) référençaient depuis le template sont compressées par le compilateur GWT afin d’en réduire la taille finale.

Ainsi, on sépare l’interface graphique (dans les template *.ui.xml*) et la logique de l’application dans le code Java.

### Code Splitting

Voilà une fonctionnalité attendue par beaucoup de développeurs GWT. Lorsque l’on développe une application GWT, on se rend vite compte que le fichier JavaScript généré prend vite du poids. Cette fonctionnalité découpe l’application en plusieurs fichiers JavaScript qui seront chargés uniquement lorsque c’est nécessaire en rajoutant quelques lignes de codes.

### Layout par contraintes

Beaucoup d’applications Web qui se basent sur JavaScript utilisent des widgets qui sont positionnées dans la page grâce à des calculs qui peuvent ralentir l’affichage de l’application.

À l’inverse, GWT 2.0 génère le rendu final en utilisant le CSS de la page, celui-ci est généré à la compilation et non plus pendant l’affichage de la page ce qui réduit considérablement le temps de chargement.&#160;

### ClientBundle

Je présentais dans mon billet : [Guide d’optimisation de vos applications Web][2] une méthode pour réduire le temps de chargement d’une page en utilisant des images sprites.

GWT est capable depuis la version 1.4 de faire tout cela automatiquement grâce aux ImageBundle. Toutes les images référencées sur disque étaient réunies en une seule est GWT utilisé la technique des sprites pour afficher les images convenablement. Avec GWT 1.5/1.6, un projet de l’incubateur permettait de faire la même chose avec à peu près n’importe quels fichiers.

GWT 2.0 introduit cette notion avec les ClientBundle. Par exemple, vous pouvez références tous vos fichiers CSS, GWT va alors les regrouper en un seul fichier, le minimiser et le rendre disponible pour être mis en cache. GWT gère aussi l’internationalisation ainsi vous pouvez gérer vos ClientBundle pour chaque locale.

### Speed Tracer

Cette nouvelle version sort avec une extension pour Google Chrome : Speed Tracer. Cette extension analyse l’exécution de l’application Web en cours. Plutôt que de longues explications, voilà la vidéo de présentation de Speed Tracer.

<p class="align-center">
  <em>Présentation de Speed Tracer</em>
</p>

<p class="align-center">
</p>

### Story of Your Compile

SOYC fournit de nombreux détails sur la compilation de chaque partie de l’application GWT : la taille, les dépendances, temps de compilation… Cela permet d’orienter ses efforts pour diviser le code grâce Code Splitting

### Traces dans IE 6

Internet Explorer ne fournit pas les traces lorsqu’une exception JavaScript est levée, ce qui peut être très embêtant lors d’une phase de debug sur ce navigateur…

Avec GWT 2.0 vous obtenez maintenant la trace obfusquée (ou non en fonction de la compilation choisie) JavaScript qui peut être convertie en trace Java avec nom de classe et numéro de ligne.

### Conclusion

Ce billet ne présente que les améliorations les plus importantes, mais il y à de très nombreuses évolutions : optimisation du compilateur, évaluation directe des réponses RPC (réduction du temps de déserialisation), propriété de deffered binding conditionnelles, …

GWT devient de plus en plus un framework “productif” : la plupart des problèmes qu’un développeur rencontre lors du développement d’une application Web qui utilise JavaScript, sont résolus très simplement.

Pensez-vous que cette version 2.0 de GWT va permettre au framework de gagner des parts de marché face à ses concurrents comme Flex?

 [1]: http://www.mkhelif.fr/2008/07/03/gwt-introduction-au-framework.html
 [2]: http://www.mkhelif.fr/2009/10/20/guide-doptimisation-de-vos-applications-web.html