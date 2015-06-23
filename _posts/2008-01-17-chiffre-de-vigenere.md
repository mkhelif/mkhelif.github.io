---
title: Chiffre de Vigénère
author: mkhelif
layout: post
permalink: /chiffre-de-vigenere/
tweet_this_url:
  - http://bit.ly/Zm4NJ
categories:
  - Cryptographie
  - Sécurité
tags:
  - Sécurité
---
Le chiffre de Vigenère est une amélioration décisive du [chiffre de César][1]. Sa force réside dans l&#8217;utilisation non pas d&#8217;un, mais de 26 alphabets décalés pour chiffrer un message.

<!--more-->

On peut résumer ces décalages avec un carré de Vigenère. Ce chiffre utilise une clef qui définit le décalage pour chaque lettre du message (A: décalage de 0, B: 1, C: 2, …, Z: 25).

Voici un exemple simple :

<pre class="code">Texte en clair     : chiffre de vigenere
Clé de chiffrement : secret</pre>

On construit alors la table suivante :

<table class="inline" style="border: 1px solid #444444; height: 49px; text-align: center;" border="0" width="421">
  <tr>
    <th class="centeralign">
      Clair
    </th>
    
    <td class="centeralign">
      c
    </td>
    
    <th class="centeralign">
      h
    </th>
    
    <td class="centeralign">
      i
    </td>
    
    <th class="centeralign">
      f
    </th>
    
    <td class="centeralign">
      f
    </td>
    
    <th class="centeralign">
      r
    </th>
    
    <td class="centeralign">
      e
    </td>
    
    <th class="rightalign">
    </th>
    
    <td class="centeralign">
      d
    </td>
    
    <th class="centeralign">
      e
    </th>
    
    <td class="rightalign">
    </td>
    
    <th class="centeralign">
      v
    </th>
    
    <td class="centeralign">
      i
    </td>
    
    <th class="centeralign">
      g
    </th>
    
    <td class="centeralign">
      e
    </td>
    
    <th class="centeralign">
      n
    </th>
    
    <td class="centeralign">
      e
    </td>
    
    <th class="centeralign">
      r
    </th>
    
    <td class="centeralign">
      e
    </td>
  </tr>
  
  <tr>
    <th class="centeralign">
      Clé
    </th>
    
    <td class="centeralign">
      s
    </td>
    
    <th class="centeralign">
      e
    </th>
    
    <td class="centeralign">
      c
    </td>
    
    <th class="centeralign">
      r
    </th>
    
    <td class="centeralign">
      e
    </td>
    
    <th class="centeralign">
      t
    </th>
    
    <td class="centeralign">
      s
    </td>
    
    <th class="rightalign">
    </th>
    
    <td class="centeralign">
      e
    </td>
    
    <th class="centeralign">
      c
    </th>
    
    <td class="rightalign">
    </td>
    
    <th class="centeralign">
      r
    </th>
    
    <td class="centeralign">
      e
    </td>
    
    <th class="centeralign">
      t
    </th>
    
    <td class="centeralign">
      s
    </td>
    
    <th class="centeralign">
      e
    </th>
    
    <td class="centeralign">
      c
    </td>
    
    <th class="centeralign">
      r
    </th>
    
    <td class="centeralign">
      e
    </td>
  </tr>
  
  <tr>
    <th class="centeralign">
      Décalage
    </th>
    
    <td class="centeralign">
      17
    </td>
    
    <th class="centeralign">
      4
    </th>
    
    <td class="centeralign">
      2
    </td>
    
    <th class="centeralign">
      17
    </th>
    
    <td class="centeralign">
      4
    </td>
    
    <th class="centeralign">
      19
    </th>
    
    <td class="centeralign">
      17
    </td>
    
    <th class="rightalign">
    </th>
    
    <td class="centeralign">
      17
    </td>
    
    <th class="centeralign">
      4
    </th>
    
    <td class="rightalign">
    </td>
    
    <th class="centeralign">
      2
    </th>
    
    <td class="centeralign">
      17
    </td>
    
    <th class="centeralign">
      4
    </th>
    
    <td class="centeralign">
      19
    </td>
    
    <th class="centeralign">
      17
    </th>
    
    <td class="centeralign">
      17
    </td>
    
    <th class="centeralign">
      4
    </th>
    
    <td class="centeralign">
      2
    </td>
  </tr>
  
  <tr>
    <th class="centeralign">
      Chiffré
    </th>
    
    <td class="centeralign">
      u
    </td>
    
    <th class="centeralign">
      l
    </th>
    
    <td class="centeralign">
      k
    </td>
    
    <th class="centeralign">
      w
    </th>
    
    <td class="centeralign">
      j
    </td>
    
    <th class="centeralign">
      k
    </th>
    
    <td class="centeralign">
      w
    </td>
    
    <th class="rightalign">
    </th>
    
    <td class="centeralign">
      h
    </td>
    
    <th class="centeralign">
      g
    </th>
    
    <td class="rightalign">
    </td>
    
    <th class="centeralign">
      m
    </th>
    
    <td class="centeralign">
      m
    </td>
    
    <th class="centeralign">
      z
    </th>
    
    <td class="centeralign">
      w
    </td>
    
    <th class="centeralign">
      r
    </th>
    
    <td class="centeralign">
      g
    </td>
    
    <th class="centeralign">
      i
    </th>
    
    <td class="centeralign">
      i
    </td>
  </tr>
</table>

L&#8217;intérêt de cette méthode par rapport au [chiffre de César][1] est que chaque lettre peut être chiffré de façons différentes. Si on calcule les fréquences des lettres d&#8217;une fable de la Fontaine on obtient des résultats marquants :

Texte clair :

[<img class="alignnone size-medium wp-image-60" title="Texte clair" src="http://www.mkhelif.fr/uploads/2008/06/vigenere-clair-300x184.png" alt="" width="300" height="184" />][2]

Texte chiffré :

[<img class="alignnone size-medium wp-image-59" title="Texte chiffré" src="http://www.mkhelif.fr/uploads/2008/06/vigenere-chiffre-300x185.png" alt="" width="300" height="185" />][3]

Source des images : <a class="urlextern" title="http://www.apprendre-en-ligne.net/crypto/vigenere/index.html" rel="nofollow" href="http://www.apprendre-en-ligne.net/crypto/vigenere/index.html">Ars Cryptographica</a>

 [1]: http://wiki.mkhelif.fr/2008/01/17/chiffre-de-cesar.html
 [2]: http://www.mkhelif.fr/uploads/2008/06/vigenere-clair.png
 [3]: http://www.mkhelif.fr/uploads/2008/06/vigenere-chiffre.png
