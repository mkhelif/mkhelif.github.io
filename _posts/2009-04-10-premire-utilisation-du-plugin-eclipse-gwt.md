---
title: Première utilisation du plugin Eclipse GWT
author: mkhelif
layout: post
permalink: /premire-utilisation-du-plugin-eclipse-gwt/
tweet_this_url:
  - http://bit.ly/449EeH
categories:
  - Actualités
  - Google
  - GWT
  - Java
  - RIA
  - Tutoriel
  - Web
tags:
  - Google
  - GWT
  - Java
  - RIA
---
Suite à mon premier billet qui présentait <a href="http://www.mkhelif.fr/2008/07/03/gwt-introduction-au-framework.html" target="_blank">Google Web Toolkit</a>, je vais maintenant vous présenter la nouvelle version de GWT et comment créer un premier projet en utilisant le plugin Eclipse.<!--more-->

## Mise en place de l&#8217;environnement de développement

Pour commencer à développer une application GWT et/ou GAE (Google App Engine), il faut <a href="http://www.eclipse.org/downloads/" target="_blank">télécharger la dernière version de Eclipse</a>.

Une fois Eclipse installé et démarré, il faut installer le plugin GWT/GAE de Google. Pour cela allez dans le menu &#8220;*Help / Software updates&#8230;*&#8220;. Allez dans l&#8217;onglet &#8220;*Available Software*&#8221; et ajouter un nouveau site (&#8220;*Add site&#8230;&#8221;*) et entrez l&#8217;URL : http://dl.google.com/eclipse/plugin/3.4.

Sélectionnez alors les éléments **Plugin** et **SDKs**, puis cliquez sur &#8220;*Install*&#8220;. Une fois l&#8217;installation terminée, vous devez redémarrer Eclipse. Là une nouvelle barre d&#8217;outils est apparue :

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2009/04/gwt-toolbar.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" src="http://www.mkhelif.fr/uploads/2009/04/gwt-toolbar-thumb.png" border="0" alt="gwt-toolbar" width="104" height="37" /></a>
</p>

Le premier bouton sert à créer une nouvelle application Web GWT/GAE, le second à compiler une projet GWT et le troisième à déployer une application GAE dans le cloud Google.

Voilà votre environnement de développement est prêt à être utiliser.

## Création de mon premier projet

Pour créer un nouveau projet cliquez sur le bouton [<img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" src="http://www.mkhelif.fr/uploads/2009/04/gwt-button-new-thumb.png" border="0" alt="gwt-button-new" width="16" height="16" />][1]. Cela va démarrer l&#8217;assistant de création de projet :

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2009/04/gwt-new-project.png"></a><a href="http://www.mkhelif.fr/uploads/2009/04/gwt-new-project1.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" src="http://www.mkhelif.fr/uploads/2009/04/gwt-new-project-thumb.png" border="0" alt="gwt-new-project" width="442" height="569" /></a>
</p>

Les principaux champs à renseigner sont le nom du projet : **GWTDemo**, et le package racine de l&#8217;application : **fr.mkhelif.gwt.demo**. Pour l&#8217;exemple je n&#8217;ai sélectionné que GWT, je ferais un autre billet sur GAE.

## Structure du projet

Une fois le projet créé, voilà la structure que l&#8217;on obtient :

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2009/04/gwt-structure.png"></a><a href="http://www.mkhelif.fr/uploads/2009/04/gwt-structure1.png"></a><a href="http://www.mkhelif.fr/uploads/2009/04/gwt-structure2.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" src="http://www.mkhelif.fr/uploads/2009/04/gwt-structure-thumb.png" border="0" alt="gwt-structure" width="362" height="319" /></a>
</p>

On voit donc un nouveau dossier **war**, c&#8217;est celui-ci qui représente l&#8217;archive WAR qui sera exportée/déployée. Lors de la compilation du projet, les fichiers seront créés dans un sous-dossier de celui-là. Le répertoire **lib** du **WEB-INF** contient la librairie nécessaire au fonctionnement des service GWT-RPC sur le serveur.

On peut voir que le dossier **public** du package par défaut à disparu. Maintenant, toutes les ressources (images, css, &#8230;) doivent être placées dans le répertoire war à l&#8217;instar d&#8217;une application Web classique.

Notre nouveau projet contient par défaut deux fichiers : **GWTDemo.html** et **GWTDemo.css**. Le fichier HTML sert à charger l&#8217;application GWT et le fichier css représente le style de l&#8217;application.

Au niveau du répertoire de sources **src**, on retrouve les packages **client** et **server**, et le fichier **GWTDemo.gwt.xml**. Au niveau de ce fichier, il n&#8217;y a pas de changements notables.

Le nouveau projet contient un exemple de service RPC : **GreetingService**. Voilà le code de l&#8217;interface du service :

<pre lang="java">package fr.mkhelif.gwt.demo.client;

import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.user.client.rpc.RemoteServiceRelativePath;

/**
 * The client side stub for the RPC service.
 */
@RemoteServiceRelativePath("greet")
public interface GreetingService extends RemoteService {
    String greetServer(String name);
}</pre>

On remarque que l&#8217;interface étend toujours **RemoteService**, par contre une nouvelle annotation est présente : *@RemoveServiceRelativePath(&#8220;greet&#8221;)*. Cette annotation permet de s&#8217;affranchir au niveau du code client d&#8217;enregistrer l&#8217;URL de la servlet du service :

<pre lang="java">((ServiceDefTarget) service).setServiceEntryPoint (GWT.getModuleBaseURL () + "greet");</pre>

Par contre il n&#8217;y a aucune différence au niveau de son implémentation et de son clone asynchrone.

## Compilation du projet

Voilà le projet est créé, il faut maintenant le compiler en cliquant sur le bouton [<img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" src="http://www.mkhelif.fr/uploads/2009/04/gwt-button-compile-thumb.png" border="0" alt="gwt-button-compile" width="16" height="16" />][2]. Le wizard suivant apparait :

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2009/04/gwt-compile.png"></a><a href="http://www.mkhelif.fr/uploads/2009/04/gwt-compile1.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" src="http://www.mkhelif.fr/uploads/2009/04/gwt-compile-thumb.png" border="0" alt="gwt-compile" width="442" height="536" /></a>
</p>

Il suffit de sélectionner le projet GWT, le niveau de log du compilateur et le style de sortie du JavaScript compilé. Sélectionnez ensuite les points d&#8217;entrées de votre application GWT, dans notre exemple il n&#8217;y en a qu&#8217;un.

On peut remarquer que grâce au plugin on peut spécifier des arguments de compilation. Le paramètre *localWorkers* permet de définir le nombre de workers utilisés pour compiler les permutations JavaScript. D&#8217;autres options sont disponibles mais ne concerne que les dossiers de compilation : *workDir*, *war* et *extra*.

Ayant un dual-core, je demande au compilateur d&#8217;utiliser 2 workers pour compiler. Le gain de temps est d&#8217;environ 30% : 28 secondes sans l&#8217;option et 19 secondes avec.

## Utilisation de l&#8217;application

Une fois l&#8217;application GWT compilée, il faut la tester grâce au hosted mode. Il n&#8217;y a pas de grande différence au niveau du hosted mode, sauf que maintenant il est possible de modifier le serveur utilisé par GWT pour démarrer l&#8217;application.

On remarque un nouveau bouton **Restart Server** dans la fenêtre du hosted mode. Ce bouton permet de redémarrer le serveur, et donc de redéployer le WAR, sans avoir à relancer le hosted mode.

## Conclusion

C&#8217;est un très beau coup de pub qu&#8217;à fait Google en nous servant en même temps le support de Java par Google App Engine, la version 1.6 de GWT et un plugin Eclipse pour gérer très facilement le tout. Cela va donner un coup de boost aux développeurs qui étaient encore hésitant sur la fiabilité de GWT.

 [1]: http://www.mkhelif.fr/uploads/2009/04/gwt-button-new.png
 [2]: http://www.mkhelif.fr/uploads/2009/04/gwt-button-compile.png
