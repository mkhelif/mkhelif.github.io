---
title: Tests en charge d’EC2, GAE et Azure
author: mkhelif
layout: post
permalink: /tests-en-charge-dec2-gae-et-azure/
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
tweet_this_url:
  - http://bit.ly/18wCte
categories:
  - Actualités
  - Google
  - J2EE
  - Web
tags:
  - Google
  - J2EE
  - Web
---
Lorsque vous démarrez un projet d’application Web qui sera déployée dans le cloud, on peut logiquement vouloir comparer les différents prestataires sur le marché. C’est ce qu’on fait des chercheurs Australiens en effectuant des tests en charge sur les plateformes EC2 d’Amazon, Google App Engine et Azure de Microsoft.

Le test consisté à une charge de 2000 utilisateurs simultanés, selon Anna Liu, les trois plateformes ont su se redimensionner avec la charge afin de répondre à la demande : “*With a simulation of 2000 concurrent users, we watched the cloud services scale up and respond dynamically to that demand*”.

Cependant les trois plateformes ont des temps de réponses variables, pouvant aller jusqu’à un facteur vingt, en fonction des fonctionnalités qui sont déployées par les prestataires ainsi que de l’heure à laquelle les utilisateurs accèdent aux services déployés.

Selon Liu, les trois plateformes ont des objectifs divergents : GAE est fait pour des applications Web simples et qui ne nécessitent aucun traitement long (une exception est lancée lorsque le temps de traitements de la requête dépasse trente secondes); EC2 propose les bases du cloud computing et la valeur ajoutée est fourni par des solutions tierces; Azure se limite uniquement aux applications .Net ce qui limite grandement les développeurs qui préfèrent se tourner vers d’autres solutions.

Toujours selon Liu, les plateformes manquent d’outils de monitoring inclus avec leur offre.

Source : [http://www.itnews.com.au/News/153451,stress-tests-rain-on-amazons-cloud.aspx][1]

 [1]: http://www.itnews.com.au/News/153451,stress-tests-rain-on-amazons-cloud.aspx "http://www.itnews.com.au/News/153451,stress-tests-rain-on-amazons-cloud.aspx"
