---
title: 'GWT : le futur hosted mode'
author: mkhelif
layout: post
permalink: /gwt-le-futur-hosted-mode/
tweet_this_url:
  - http://bit.ly/1htCny
categories:
  - Actualités
  - GWT
  - Java
  - RIA
tags:
  - GWT
  - Java
  - RIA
---
<p align="center">
  <em>Architecture : Out Of Process Hosted Mode (OOPHM)</em>
</p>

<p align="center">
  <a href="http://www.mkhelif.fr/wp-content/uploads/2008/12/oophm.png"><img src="http://www.mkhelif.fr/wp-content/uploads/2008/12/oophm-thumb.png" alt="oophm" width="476" height="344" /></a>
</p>

La future version 2.0 de GWT nous annonce une grande amélioration du hosted mode. Pour rappel le hosted mode permet aux développeurs d&#8217;application GWT de pouvoir débugger leur code dans un navigateur embarqué sans avoir à passer par la compilation du Java en JavaScript.

La version actuelle du hosted mode ne permet pas de sélectionner le navigateur à utiliser (par défaut : IE sur Windows, Mozilla sur Linux et WebKit sur Mac). Cette nouvelle mouture permettra donc, à l&#8217;aide de plugins, de s&#8217;intégrer dans &#8220;tous&#8221; les navigateurs.

Ces plugins communiqueront par TCP avec la JVM de GWT et comme maintenant le code JavaScript ne sera pas généré ce qui permettra de débugger le code Java.

Source : <a href="http://www.dng-consulting.com/blogs/index.php/2008/12/06/une-daeacute-mo-du-futur-mode-hostaeacut?blog=1" target="_blank">DNG Consulting</a> (regardez <a href="http://www.youtube.com/watch?v=qjdmht2Gs6Q&eurl=http://www.dng-consulting.com/blogs/index.php/2008/12/06/une-daeacute-mo-du-futur-mode-hostaeacut?blog=1" target="_blank">la vidéo</a> ça donne envie).