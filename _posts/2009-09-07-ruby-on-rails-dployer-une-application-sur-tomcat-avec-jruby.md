---
title: 'Ruby on Rails : déployer une application sur Tomcat avec JRuby'
author: mkhelif
layout: post
permalink: /ruby-on-rails-dployer-une-application-sur-tomcat-avec-jruby/
tt_auto_tweet:
  - 'false'
aktt_notify_twitter:
  - yes
tweet_this_url:
  - http://bit.ly/U3r3n
aktt_tweeted:
  - 1
categories:
  - J2EE
  - Java
  - Linux
  - Ruby on Rails
  - Tutoriel
  - Web
tags:
  - J2EE
  - Java
  - Linux
  - Rails
  - Web
---
[<img style="border-right-width: 0px; margin: 0px 10px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="rails" src="http://www.mkhelif.fr/uploads/2009/09/rails_thumb.png" border="0" alt="rails" width="87" height="111" align="left" />][1] Ruby on Rails est un framework qui permet de développer très rapidement des applications Web en suivant le modèle MVC.

Le problème de ce framework est qu’il se base sur le langage Ruby et qu’il embarque un serveur Web. Les applications ainsi créées ne peuvent pas être déployées comme des applications Web dans Tomcat ou autres serveurs d’applications.

Le but de ce tutoriel est de vous permettre de déployer les applications Ruby on Rails (RoR) sur un serveur Tomcat en utilisant la librairie <a href="http://jruby.org/" target="_blank">JRuby</a>.

### Installation Tomcat

On commence par <a href="http://mirror.mkhelif.fr/apache/tomcat/" target="_blank">télécharger la dernière version de Tomcat</a> (en ce moment c’est la version 6.0.20) :

<pre lang="sh">wget http://mirror.mkhelif.fr/apache/tomcat/tomcat-6/v6.0.20/bin/apache-tomcat-6.0.20.tar.gz
tar –xzf apache-tomcat-6.0.20.tar.gz</pre>

Voilà Tomcat est installé, je passerai ici la configuration du serveur. Si vous souhaitez, suivez mon [tutoriel pour connecter Apache avec Tomcat][2].

### Installation JRuby

[Télécharger JRuby][3] et placez le là où vous souhaitez :

<pre lang="sh">wget http://dist.codehaus.org/jruby/1.3.1/jruby-bin-1.3.1.tar.gz
tar –xzf jruby-bin-1.3.1.tar.gz
mv jruby-1.3.1 /usr/local/jruby</pre>

Ajouter ensuite le chemin vers JRuby dans votre environnement en éditant votre fichier *~/.profile* :

<pre lang="sh">export PATH=$PATH:/usr/local/jruby/bin</pre>

Vous pouvez vérifier l’installation de JRuby en exécutant la commande suivante :

<pre lang="sh">$ jruby -v
jruby 1.3.1 (ruby 1.8.6p287) (2009-06-15 2fd6c3d) (Java HotSpot(TM) Client VM 1.5.0_16) [i386-java]</pre>

### Installation de Ruby on Rails

À partir de là nous allons installer les gems pour : rails (le coeur de ROR), mysql et surtout warbler (qui crée un WAR à partir de l’application rails).

<pre lang="sh">$ jruby -S gem install rails
$ jruby -S gem install activerecord-jdbcmysql-adapter
$ jruby -S gem install warbler</pre>

### Déploiement de votre application

Pour déployer votre application dans Tomcat, il faut commencer par la convertir en WAR. Placez vous dans le dossier de votre application et lancez la commande suivante :

<pre lang="sh">$ warble config</pre>

Cela va créer un fichier *<application>/config/warble.rb* pour configurer votre application pour la convertir en fichier WAR, ouvrez le fichier et dé-commentez la ligne :

<pre lang="sh">config.gems += ["activerecord-jdbcmysql-adapter"]</pre>

Cela pour inclure dans votre fichiers WAR la gem MySQL (ajoutez les gems que votre application utilise ici).

Maintenant nous allons créer le fichier WAR de votre application, lancez simplement la commande :

<pre lang="sh">$ warble</pre>

Et voilà votre fichier WAR est créé, vous pouvez alors le déployer sur Tomcat (je passerai sur cette étape).

 [1]: http://www.mkhelif.fr/uploads/2009/09/rails.png
 [2]: http://www.mkhelif.fr/2008/06/18/passerelle-entre-apache-et-tomcat.html
 [3]: http://jruby.org/download
