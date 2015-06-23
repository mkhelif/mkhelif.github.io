---
title: 'ROME &#8211; Présentation (1/8)'
author: mkhelif
layout: post
permalink: /rome-presentation-18/
tweet_this_url:
  - http://bit.ly/4GBdhW
  - http://bit.ly/4GBdhW
categories:
  - Java
  - Tutoriel
tags:
  - Java
---
<p style="text-align: left;">
  Rome est une librairie écrite en Java qui permet de parser des flux RSS/Atom.
</p>

<!--more-->

<p class="level1">
  <a href="http://www.mkhelif.fr/uploads/2008/06/rome.png"><img class="alignnone size-medium wp-image-56" title="Rome" src="http://www.mkhelif.fr/uploads/2008/06/rome.png" alt="Rome API" width="200" height="144" /></a>
</p>

<p class="level1">
  Les flux ainsi parsés sont enregistrés dans des objets Java qui font abstraction du type de flux : <strong>Syndication Feed</strong> ou bien convertis dans l&#8217;un des différents types de flux supportés :
</p>

  * <acronym title="Rich Site Summary">RSS</acronym> 0.90
  * <acronym title="Rich Site Summary">RSS</acronym> 0.91
  * Netscape<acronym title="Rich Site Summary"></acronym>
  * <acronym title="Rich Site Summary">RSS</acronym> 0.91
  * Userland
  * <acronym title="Rich Site Summary">RSS</acronym> 0.92
  * <acronym title="Rich Site Summary">RSS</acronym> 0.93
  * <acronym title="Rich Site Summary">RSS</acronym> 0.94<acronym title="Rich Site Summary"></acronym>
  * <acronym title="Rich Site Summary">RSS</acronym> 1.0
  * <acronym title="Rich Site Summary">RSS</acronym> 2.0
  * Atom 0.3
  * Atom 1.0

Pour pouvoir parser un flux <acronym title="Extensible Markup Language">XML</acronym> cette <acronym title="Application Programming Interface">API</acronym> nécessite d&#8217;inclure la librairie <a class="urlextern" title="http://www.jdom.org/" rel="nofollow" href="http://www.jdom.org/">JDom</a> qui assure le traitement des flux/fichiers XML.

<pre class="code">Traduction de la documentation de ROME : http://wiki.java.net/bin/view/Javawsxml/Rome</pre>
