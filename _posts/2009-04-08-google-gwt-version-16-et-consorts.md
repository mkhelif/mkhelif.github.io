---
title: 'Google : GWT version 1.6 et consorts'
author: mkhelif
layout: post
permalink: /google-gwt-version-16-et-consorts/
tweet_this_url:
  - http://bit.ly/2vgu32
tt_auto_tweet:
  - 'false'
aktt_notify_twitter:
  - yes
categories:
  - Actualités
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
Ça y est, la <a href="http://code.google.com/intl/fr-FR/webtoolkit/download.html" target="_blank">version 1.6 officielle de GWT</a> est enfin disponible après deux releases candidates (RC). <a href="http://www.mkhelif.fr/2008/12/11/gwt-16-quoi-de-neuf.html" target="_blank">Les nouveautés annoncées</a> sont bien présentes. Parmi les nouveautés les plus importantes :

  * Une refonte de l&#8217;architecture d&#8217;une application GWT pour qu&#8217;elle corresponde à celle d&#8217;un WAR. Cette nouvelle architecture est plus intuitive pour développer une application complète (testée avec le <a href="http://code.google.com/p/cypal-studio/" target="_blank">plugin Eclipse Cypal Studio</a>).
  * Une parallélisation du compilateur permet sur une machine multi-coeurs de diminuer sensiblement la durée de compilation. Maintenant, la compilation peut aussi être distribuée entre plusieurs machines.
  * Une nouvelle approche de la gestion de événements par *Handler*. Pour avoir testé cette nouvelle implémentation, on se rapproche beaucoup plus de la gestion des événements Swing.

En marge de GWT, Google App Engine, la plateforme de déploiement des applications Web de Google, accepte désormais les applications Java dans un environnement Java 6. Cet environnement comprend les API suivantes : [Java Data Objects][1] (JDO), [Java Persistence API][2] (JPA) et <a href="http://java.sun.com/products/javamail/" target="_blank">JavaMail API</a>.

Par ailleurs, Google a aussi développé un <a href="http://code.google.com/intl/fr-FR/eclipse/" target="_blank">plugin Eclipse</a> pour les développeurs GWT et Google App Engine. Ce plugin contient :

  * <a href="http://code.google.com/intl/fr-FR/eclipse/docs/creating_new_webapp.html" target="_blank">Un assistant de création d&#8217;applications Web</a> spécifique pour GWT ou Google App Engine.
  * <a href="http://code.google.com/intl/fr-FR/eclipse/docs/appengine_deploy.html" target="_blank">Un assistant de déploiement</a> de votre application dans le cloud de Google.
  * Une coloration syntaxique de votre code JSNI (JavaScript Native Interface). Très utile, surtout lorsqu&#8217;on à pris l&#8217;habitude de coder avec une coloration de commentaire&#8230;

Divers autres fonctionnalités sont disponibles avec ce plugin, mais je ne les ai pas encore testé.

Source : <a href="http://googlewebtoolkit.blogspot.com/2009/04/introducing-gwt-16-and-friends.html" target="_blank">Introducing GWT 1.6 and friends</a>.

 [1]: http://java.sun.com/jdo/index.jsp
 [2]: http://java.sun.com/developer/technicalArticles/J2EE/jpa/