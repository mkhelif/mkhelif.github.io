---
title: 'GWT 1.5.3 : améliore le support d&#8217;Android'
author: mkhelif
layout: post
permalink: /gwt-153-amliore-le-support-dandroid/
tweet_this_url:
  - http://bit.ly/13t6qG
categories:
  - Actualités
  - Google
  - GWT
tags:
  - GWT
  - Java
---
Récemment la version 1.5.3 de GWT a été diffusée. Cette version améliore et corrige des problèmes avec le navigateur de Android, le système libre de Google pour les smartphones.

Voilà la liste des problèmes corrigés :

  1. Les requêtes RPC n&#8217;échouent plus sur le navigateur embarqué avec Android.
  2. Les *TreeItem* feuilles sont maintenant alignés avec les éléments frères non feuilles.
  3. Supprimer le dernier fils d&#8217;un *TreeItem* ne crée plus de marge sur la gauche.
  4. HTTPRequest n&#8217;utilise plus la méthode *POST* plutôt que *GET* sur certaines installations d&#8217;IE à cause d&#8217;une mauvaise sélection de XHR (**X**ML**H**ttp**R**equest).
  5. Le compilateur empêche l&#8217;utilisation de variables locales dans des méthodes *inline*.
  6. *getAbsoluteTop () / Left ()* ne retourne plus que des entiers.
  7. *Time.valueOf ()* n&#8217;échoue plus sur l&#8217;analyse de &#8220;08:00:00&#8243; et n&#8217;accepte plus &#8220;0xC:0xB:0xA&#8221;.
