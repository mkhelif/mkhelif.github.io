---
title: Chiffre de César
author: mkhelif
layout: post
permalink: /chiffre-de-cesar/
tweet_this_url:
  - http://bit.ly/hmoDK
categories:
  - Cryptographie
  - Sécurité
tags:
  - Sécurité
---
Le chiffre de César consiste simplement à décaler les lettres de l&#8217;alphabet de quelques crans vers la droite ou la gauche.Le chiffre de César (on parle aussi d&#8217;alphabet décalé) est un cas particulier d&#8217;alphabet désordonné.

<!--more-->Par exemple si nous décidons que le décalage est de 

**5** vers la droite, nous aurons pourrons chiffrer un message avec un nouvel alphabet :

<table class="inline" style="border: 1px solid #444444; height: 32px;" border="0" width="477">
  <tr>
    <th class="centeralign">
      Alphabet
    </th>
    
    <td class="centeralign">
      a
    </td>
    
    <th class="centeralign">
      b
    </th>
    
    <td class="centeralign">
      c
    </td>
    
    <th class="centeralign">
      d
    </th>
    
    <td class="centeralign">
      e
    </td>
    
    <th class="centeralign">
      f
    </th>
    
    <td class="centeralign">
      g
    </td>
    
    <th class="centeralign">
      h
    </th>
    
    <td class="centeralign">
      i
    </td>
    
    <th class="centeralign">
      j
    </th>
    
    <td class="centeralign">
      k
    </td>
    
    <th class="centeralign">
      l
    </th>
    
    <td class="centeralign">
      m
    </td>
    
    <th class="centeralign">
      n
    </th>
    
    <td class="centeralign">
      o
    </td>
    
    <th class="centeralign">
      p
    </th>
    
    <td class="centeralign">
      q
    </td>
    
    <th class="centeralign">
      r
    </th>
    
    <td class="centeralign">
      s
    </td>
    
    <th class="centeralign">
      t
    </th>
    
    <td class="centeralign">
      u
    </td>
    
    <th class="centeralign">
      v
    </th>
    
    <td class="centeralign">
      w
    </td>
    
    <th class="centeralign">
      x
    </th>
    
    <td class="centeralign">
      y
    </td>
    
    <th class="centeralign">
      z
    </th>
  </tr>
  
  <tr>
    <th class="centeralign">
      Chiffré
    </th>
    
    <td class="centeralign">
      f
    </td>
    
    <th class="centeralign">
      g
    </th>
    
    <td class="centeralign">
      h
    </td>
    
    <th class="centeralign">
      i
    </th>
    
    <td class="centeralign">
      j
    </td>
    
    <th class="centeralign">
      k
    </th>
    
    <td class="centeralign">
      l
    </td>
    
    <th class="centeralign">
      m
    </th>
    
    <td class="centeralign">
      n
    </td>
    
    <th class="centeralign">
      o
    </th>
    
    <td class="centeralign">
      p
    </td>
    
    <th class="centeralign">
      q
    </th>
    
    <td class="centeralign">
      r
    </td>
    
    <th class="centeralign">
      s
    </th>
    
    <td class="centeralign">
      t
    </td>
    
    <th class="centeralign">
      u
    </th>
    
    <td class="centeralign">
      v
    </td>
    
    <th class="centeralign">
      w
    </th>
    
    <td class="centeralign">
      x
    </td>
    
    <th class="centeralign">
      y
    </th>
    
    <td class="centeralign">
      z
    </td>
    
    <th class="centeralign">
      a
    </th>
    
    <td class="centeralign">
      b
    </td>
    
    <th class="centeralign">
      c
    </th>
    
    <td class="centeralign">
      d
    </td>
    
    <th class="centeralign">
      e
    </th>
  </tr>
</table>

On peut donc chiffrer un texte :

<pre class="code">Le mot  : chiffre de cesar
  Devient : hmnkkwj ij hjxfw</pre>

Le problème de cette méthode vient du fait que lorsque l&#8217;on chiffre un texte assez important, il est assez facile de revenir au texte clair sans avoir le <span class="curid"><span class="wikilink1">chiffre de César</span></span>.  
En effet toutes les lettres de l&#8217;alphabet ont une fréquence d&#8217;apparition. On peut donc analyser le texte est retrouver les lettres d&#8217;origines.

Image <a class="urlextern" title="http://fr.wikipedia.org/wiki/Fr%C3%A9quence_d'apparition_des_lettres_en_fran%C3%A7ais" rel="nofollow" href="http://fr.wikipedia.org/wiki/Fr%C3%A9quence_d%27apparition_des_lettres_en_fran%C3%A7ais">Wikipedia</a> de la répartition des lettres en français.

<p style="text-align: center;">
  <a href="http://www.mkhelif.fr/uploads/2008/06/frequence-lettres.png"><img class="size-full wp-image-63" title="Fréquence des lettres" src="http://www.mkhelif.fr/uploads/2008/06/frequence-lettres.png" alt="Fréquence des lettres en Français" width="500" height="194" /></a>
</p>
