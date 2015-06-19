---
title: 'Apache2 : système de blacklist'
author: mkhelif
layout: post
permalink: /apache2-systeme-de-blacklist/
tweet_this_url:
  - http://bit.ly/BlFi5
categories:
  - Linux
  - Sécurité
  - Tutoriel
tags:
  - Linux
  - Sécurité
  - Web
---
Après avoir installé mon serveur web (Apache) et un serveur d&#8217;applications J2EE (GlassFish) je me suis vite rendu compte, après une semaine d&#8217;exécution, que les logs du serveur prennaient de plus en plus de place.

En regardant rapidement les fichiers de logs on se rend très vite compte que le serveur se fait &#8220;spammer&#8221; des URL du type : **phpmyadmin**, **admin**, **mysql**, &#8230;

J&#8217;ai décidé de mettre en place un système de blacklistage instégré à Apache.

<!--more-->

### Configuration de Apache

Pour cela il faut installer le module mod_rewrite (inclus par défaut avec Apache2).

On ajoute donc les règles dans le fichier de configuration d&#8217;apache (**/etc/apache2/sites-avaible/**)

> <pre>RewriteEngine On

RewriteMap hosts-deny txt:/etc/apache2/hosts.deny
RewriteCond ${hosts-deny:%{REMOTE_HOST}|NOT-FOUND} !=NOT-FOUND [OR]
RewriteCond ${hosts-deny:%{REMOTE_ADDR}|NOT-FOUND} !=NOT-FOUND
RewriteRule ^/.* - [F]</pre>

Ainsi les adresses IP ou nom de domaine listés dans le fichier **/etc/apache2/hosts.deny** recevront le code réponse : *403 Forbidden*.

On crée le fichier **/etc/apache2/hosts.deny** :

> <pre>adresse_ip -
nom_de_domaine -</pre>

Penser à ajouter le tiret &#8220;-&#8221; à la fin de chaque entrée dans ce fichier.

### Page d&#8217;erreur personnalisée

Si vous voulez rediriger les adresses blacklilstées vers une page personnalisée il faut modifier les règles dans le fichier de configuration de Apache :

> <pre>Remplacez :
RewriteRule ^/.* - [F]

Par :
RewriteRule ^/.* /blacklisted.html [L]</pre>

Créez alors le fichier **blacklisted.html**.

**Source :** [http://httpd.apache.org/docs/2.0/misc/rewriteguide.html][1]

 [1]: http://httpd.apache.org/docs/2.0/misc/rewriteguide.html "Apache.org"