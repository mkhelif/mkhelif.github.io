---
title: 'Oracle : faille critique dans WebLogic [corrigé]'
author: mkhelif
layout: post
permalink: /oracle-faille-critique-dans-weblogic/
tweet_this_url:
  - http://bit.ly/7rXj9
categories:
  - Actualités
  - J2EE
tags:
  - J2EE
  - Sécurité
---
Une faille critique vient d&#8217;être découverte dans le module *mod_server*, permettant la connexion de Apache à WebLogic (racheté à BEA par Oracle). Elle permettrait d&#8217;avoir accès à distance aux données du serveur sans aucune authentification.

Cette faille est notée comme très élevée (1.0 sur l&#8217;échelle CVSS Common Vulnerability Scoring System) et un correctif est déjà en préparation par Oracle.

Les versions de Oracle WebLogic Server affectées par cette faille sont : *6.1*, *7.0*, *8.1*, *9.0*, *9.1*, *9.2*, *10.0*.

<a href="http://www.oracle.com/technology/deploy/security/alerts/alert_cve2008-3257.html" target="_blank">Voir le bulletin d&#8217;alerte de Oracle.</a>

Mise à jour 08/08/2008 : [Oracle a fourni un correctif à cette faille][1].

 [1]: https://support.bea.com/application_content/product_portlets/securityadvisories/2793.html