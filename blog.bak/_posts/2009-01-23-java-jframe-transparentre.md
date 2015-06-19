---
title: 'Java : JFrame transparente'
author: mkhelif
layout: post
permalink: /java-jframe-transparentre/
tweet_this_url:
  - http://bit.ly/2010dD
categories:
  - Google
  - Java
tags:
  - Java
  - Swing
---
La prochaine version du JDK (1.6.0_12) va permettre de réaliser en Java des fenêtres transparentes ainsi que de modifier la forme de ces dernières. Tout ceci grâce à la classe (privée certes) : *com.sun.awt.AWTUtilities*.

Pour avoir accès à cette classe vous devez télécharger la version en question : <a href="http://download.java.net/jdk6/6u12/promoted/latest/" target="_blank">JDK 1.6.0_12 b3</a>.

<!--more-->

Les méthodes pour modifier les fenêtres Java sont :

<pre>AWTUtilities.setWindowShape (window, shape);
AWTUtilities.setWindowOpacity (window, opacity);</pre>

Voici quelques exemples de ce que permet de faire cette classe :

### JFrame standard

<p align="center">
  <a href="/wp-content/uploads/2009/01/transluent-1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="/wp-content/uploads/2009/01/transluent-1.png" border="0" alt="transluent-1" width="380" height="314" /></a>
</p>

### JFrame avec opacité à 0.8 (entre 0 et 1)

<p align="center">
  <a href="/wp-content/uploads/2009/01/transluent-08.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="/wp-content/uploads/2009/01/transluent-08.png" border="0" alt="transluent-08" width="380" height="315" /></a>
</p>

### JFrame dont la forme est modifiée

<p align="center">
  <a href="/wp-content/uploads/2009/01/shapped.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="/wp-content/uploads/2009/01/shapped.png" border="0" alt="shapped" width="380" height="315" /></a>
</p>

### JFrame avec une forme est une opacité modifiée

<p align="center">
  <a href="/wp-content/uploads/2009/01/shapped-transluent.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="/wp-content/uploads/2009/01/shapped-transluent.png" border="0" alt="shapped-transluent" width="380" height="315" /></a>
</p>