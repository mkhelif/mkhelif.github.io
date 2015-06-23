---
title: Garbage Collector ancienne génération
author: mkhelif
layout: post
permalink: /garbage-collector-ancienne-generation/
tweet_this_url:
  - http://bit.ly/vNitW
categories:
  - Java
tags:
  - Java
---
Le Garbage Collector (GC) est un outil qui permet de supprimer les objets créés par l&#8217;application Java et qui ne sont plus utilisés.

Le GC actuel (Java 6) est appelé GC générationnel du fait qu&#8217;il tri les objets en générations. La mémoire *heap* est découpée en trois générations : **Young**, **Tenured** et **Perm**.

<!--more-->

<p style="text-align: center">
  <a href="http://www.mkhelif.fr/uploads/2008/06/memory-heap.png"><img class="aligncenter size-full wp-image-64" title="memory-heap" src="http://www.mkhelif.fr/uploads/2008/06/memory-heap.png" alt="Mémoire JVM" width="420" height="170" /></a>
</p>

> ### Zone Young

Elle se décompose en quatre espaces de mémoire : **Eden**, **Survivor 1**, **Survivor 2** et **Virtual**.

#### Eden

L&#8217;espace **Eden** contient les objets qui ont été créés récemment. Lorsque cette zone est pleine (plus de mémoire disponible), le GC vérifie tous les objets de cette zone et libère ceux qui ne sont plus référencés. Ceux qui sont toujours vivants sont alors placés dans la zone **Survivor**. Alternativement les objets sont placés dans l&#8217;une des deux zones **Survivor**.

#### Survivor

Ces zones contiennent des objets ayant une durée de vie moyenne. Lorsque ces zones deviennent trop petites le GC vérifie tous les objets de ces zones pour éliminer les objets inutiles. Les survivants sont alors déplacés vers la zone **Tenured**.

#### Virtual

L&#8217;espace de mémoire Virtual représente l&#8217;espace mémoire que la JVM peut utiliser pour agrandir les zones.

> ### Zone Tenured

Cette zone contient les objets *anciens*. Lorsque cette zone devient trop petite le GC effectue alors une vérification complète de toutes les zones mémoires : *full GC*. Cette vérification est plus gourmande en ressources que la vérification simple de l&#8217;**Eden**.

Si après le *full GC* la mémoire disponible est insuffisante la JVM lève une exception du type : *java.lang.OutOfMemoryException*.

La zone **Tenured **contient aussi une zone **Virtual **permettant d&#8217;augmenter la mémoire disponible pour cette zone.

> ### Zone Perm

Cette zone contient les objets **perm**anents de la JVM comme le **byte-code** des classes chargées par le *ClassLoader*. Si cette zone devient trop importante, la JVM lance une erreur (à ne pas confondre avec une exception) : *java.lang.OutOfMemoryError: PermGen space*.

La zone **Perm** contient aussi une zone **Virtual **permettant d&#8217;augmenter la mémoire disponible pour cette zone.
