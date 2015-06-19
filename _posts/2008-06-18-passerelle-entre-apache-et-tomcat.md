---
title: Passerelle entre Apache et Tomcat
author: mkhelif
layout: post
permalink: /passerelle-entre-apache-et-tomcat/
tweet_this_url:
  - http://bit.ly/ny1Uz
categories:
  - Java
  - Linux
  - Tutoriel
tags:
  - J2EE
  - Linux
  - Web
---
Dans le but de déployer mes applications J2ee j&#8217;ai installé GlassFish (avec Tomcat). Je souhaitais pouvoir utiliser ce serveur sur le port 80 tout en ayant Apache qui écoute sur ce port.

<!--more-->

Apache et Tomcat étant des produits développés par la même équipe il existe une solution très simple pour faire interagir les deux serveurs.

#### Configuration de Apache

Il faut installer le module **Jk** de Apache :

> <pre>apt-get install libapache2-mod-jk
a2enmod mod_jk</pre>

On va ensuite créer un VirtualHost dans la configuration de Apache */etc/apache2/sites-available/default* :

> <pre>&lt;VirtualHost demo.mkhelif.fr:80&gt;
    ServerName demo.mkhelif.fr
    ServerAdmin webmaster@mkhelif.fr
    JkMount / worker1
    JkMount /* worker1
&lt;/VirtualHost&gt;</pre>

On configure le module **Jk ***/etc/apache2/mods-available/jk.load* :

<pre>LoadModule jk_module /usr/lib/apache2/modules/mod_jk.so</pre>

<pre>JkWorkersFile /etc/apache2/workers.conf
JkLogFile /var/log/apache2/mod_jk.log
JkLogLevel info
JkLogStampFormat "[%a %b %d %H:%M:%S %Y] "</pre>

On crée alors le fichier */etc/apache2/workers.conf* :

> <pre>workers.java_home=/path/to/jre/
ps=/
worker.list=worker1
worker.worker1.port=8009
worker.worker1.host=localhost
worker.worker1.type=ajp13
worker.worker1.lbfactory=1</pre>

Apache est désormais configuré pour rediriger toutes les requêtes du domaine demo.mkhelif.fr vers Tomcat par AJP. Il faut configurer Tomcat pour écouter sur ce port.

#### Tomcat en standalone

Pour configurer Tomcat en version standalone (sans serveur d&#8217;applications), il suffit de modifier le fichier *server.xml* pour ajouter le connecteur AJP :

> <pre>&lt;Connector port="8009" enableLookups="false" debug="0" redirectPort="8443"
           protocol="AJP/1.3" serverAdresse="127.0.0.1" /&gt;</pre>

Il suffit alors de redémarrer Tomcat et Apache. Lorsque vous accédez à la page : http://demo.mkhelif.fr/ vous arrivez sur la page d&#8217;accueil de Tomcat.

#### Tomcat inclus dans GlassFish

Lorsque Tomcat est inclus dans un serveur d&#8217;applications (comme GlassFish) il faut ajouter certaines librairies au serveur :

> <pre>commons-logging.jar
commons-modeler.jar
commons-digester.jar</pre>

Ces librairies peuvent être téléchargées sur le site de Jakarta.

Il faut ensuite copier la librairie permettant d&#8217;activer le connecteur AJP pour Tomcat. Cette librairie est fournie avec Tomcat&#8230; il faut donc télécharger Tomcat&#8230; la version inclue avec GlassFish ne contient pas cette librairie.

<pre><span style="color: #333333;">Tomcat 5.x et antérieur :</span>
&lt;Tomcat&gt;/server/lib/tomcat-ajp.jar</pre>

<pre><span style="color: #333333;">Tomcat 6.x :</span>
&lt;Tomcat&gt;/lib/tomcat-ajp.jar</pre>

Copier toutes ces librairies dans le répertoire : *<GlassFish>/lib/*

Il faut redémarrer GlassFish et la passerelle entre Apache et GlassFish est activée.