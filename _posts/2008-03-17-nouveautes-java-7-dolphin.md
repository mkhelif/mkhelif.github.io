---
title: 'Nouveautés Java 7 &#8211; Dolphin'
author: mkhelif
layout: post
permalink: /nouveautes-java-7-dolphin/
tweet_this_url:
  - http://bit.ly/Uzmtg
categories:
  - Actualités
  - Java
tags:
  - Java
  - XML
---
Il n&#8217;y à toujours pas de JSR officiel décrivant l&#8217;ensemble des nouvelles fonctionnalités de Java 7. Cette dernière version porte toujours le nom d&#8217;un animal : Dolphin.

Pour cette nouvelle version il devrait y avoir des évolutions dans le langages Java, un nouveau format d&#8217;archive (remplaçant du fichier jar) : Java Module System (<a href="http://jcp.org/en/jsr/detail?id=277" title="JSR 277" target="_blank">JSR 277</a>), de nouvelles API et des améliorations de la JVM (support natif de language de script : Javascript, Ruby, PHP).

<!--more-->

## Nouveautés du langage

  * **Support natif du XML :**

Un exemple vaut mieux que plusieurs lignes d&#8217;explications :

<pre lang="java">Document d = &lt;collection>&lt;/collection>;
element.appendChild ();</pre>

  * **Propriétés JavaBeans :**

Possibilité de définir un membre d&#8217;une classe en tant que propriété : les accesseurs seront alors générés à la compilation. Actuellement la syntaxe permettant d&#8217;accèder aux accesseurs n&#8217;est pas encore certaines : **.**, **=>**, **-<**, **#**.

<pre lang="java">public class MyObject {
    private property String member;
}
...
MyObject obj = new MyObject ();
obj.member = "NewValue"; // setMember
String str = obj=>member; // getMember
obj->member = "New Value"; // setMember
str = obj#member; // getMember</pre>

  * **Redéfinition des opérateurs :**

Le langage permettrait alors de redéfinir les opérateurs grâce à des annotations.

<pre lang="java">String str = "first";
switch (str) {
    case "first": doThis (); break;
    case "second": doThat (); break;
    default: throw new IllegalArgumentException ("Unknown: " + str);
}</pre>

Autre exemple avec les énumérations :

<pre lang="java">enum MyColor {
    EMPTY,
    BLACK, WHITE,
    RED, YELLOW, BLUE,
    PINK, PURPLE, ORANGE, GREY;
}

public boolean isPrimary (MyColor c) {
    return c >= MyColor.RED &#038;&#038; c &lt; = MyColor.BLUE;
}</pre>

  * **Chaînage des appels de méthodes :**

<pre lang="java">class MyObject {
     void doSomething () { ... }
     void doOther () { ... }
     boolean validate () { ... }
}

MyObjet myObject = new MyObject ();
boolean validate = myObject.doSomething ().doOther ().validate ();</pre>

  * **Amélioration des blocs *catch* :**

<pre lang="java">try {
     doSomething ();
} catch (IllegalStateException | IllegalAccessException e) {
     // Traitement de l'exception...
}

try {
    doOther (); // Lance des types différences d'exceptions
} catch (final Throwable t) {
    throw t; // Lance les mêmes types d'exceptions
}</pre>

  * **Gestion automatique des ressources :** les ressources qui sont initialisées dans un bloc sont automatiquement nettoyées à la fin du bloc. Le bloc *finally* n&#8217;est alors plus nécessaire.
  * **Simplification des templates et des List/Map :**

<pre lang="java">Map&lt;string , Object> myMap = new HashMap&lt;> ();

List&lt;/string>&lt;string> list = new ArrayList&lt;> ();
list.add[0] = "First";
list.add[1] = "Second";
&lt;/string></pre>

  * **Les *Closures* (ou méthodes anonymes) :**

<pre lang="java">// Sans Closures :
lock.lock ();
try {
    ++counter;
} finally {
    lock.unlock ();
}

// Avec Closures :
withLock (lock) {
    ++counter;
}

public static &lt;t> T withLock (Lock lock, {=> T throws E}) block) throws E {
    lock.lock ();
    try {
        // Exécution du 'bloc' de code block
        return block.invoke ();
    } finally {
        lock.unlock ();
    }
}
&lt;/t></pre>

## Modularité

  * **Gestion des Super packages.**
  * **JA**va **M**odule System : remplaçant du fichier JAR (**J**ava **AR**chive) : gestion des versions, des dépendances, &#8230;

#### Gestion du versionning

<p style="text-align: left">
  Lorsque l&#8217;on développe une application, celle ci à généralement besoins d&#8217;une ou plusieurs librairies de classes. Cependant si cette librairie ne peut être fourni avec l&#8217;application (problème de license) ou qu&#8217;une version spécifique est nécessaire, il n&#8217;y à actuellement aucun moyen simple de vérifier la librairie. Les fichiers JAM vont permettrent ceci grâce à une gestion avancée du versionning :
</p>

<pre>major[.minor[.micro[.update]]][-qualifier]</pre>

Par exemple :

<table style="border: 1px solid #444444; text-align: left" cellpadding="0" cellspacing="0">
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1+
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Version 1 ou supérieur
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1 < = x)
    </td></td>
  </tr>
  
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1.5+
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Version 1.5 ou supérieur
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1.5 < = x)
    </td></td>
  </tr>
  
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1.5.2+
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Version 1.5.2 ou supérieur
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1.5.2 < = x)
    </td></td>
  </tr>
  
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1*
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Toutes les versions de la branche 1.
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1 < = x < 2)
    </td></td>
  </tr>
  
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1.5*
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Toutes les versions de la branche 1.5.
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1.5 < = x < 1.6)
    </td></td>
  </tr>
  
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1.5.2*
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Toutes les versions de la branche 1.5.2.
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1.5.2 < = x < 1.5.3)
    </td></td>
  </tr>
  
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1.[5+]
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Version 1.5 ou supérieur dans la branche 1.
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1.5 < = x < 2)
    </td></td>
  </tr>
  
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1.5.[2+]
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Version 1.5.2 ou supérieur dans la branche 1.5.
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1.5.2 < = x < 1.6)
    </td></td>
  </tr>
  
  <tr>
    <td style="border-bottom: 1px solid #444444">
      1.[5.2+]
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      Version 1.5.2 ou supérieur dans la branche 1.
    </td>
    
    <td style="border-bottom: 1px solid #444444">
      (1.5.2 < = x < 2)
    </td></td>
  </tr>
</table>

#### Modules

<p style="text-align: left">
  Un fichier JAM est en fait une simple archive (tout comme le fichier JAR) qui peut contenir d&#8217;autres JAR (les modules), des ressources (images, &#8230;), du code natif (nouvelle gestion : <em>/META-INF/bin/</p> <platform>/<arch>/</arch></platform></em>), des métas-données : <em>MODULE-INF/METADATA.module</em> (version, classe principale, modules nécessaires, attributs, superpackages).
</p>

<p style="text-align: left">
  Chaque application aura une bibliothèque de modules (locaux ou distants) permettant la recherche, le chargement (au démarrage ou à l&#8217;exécution).
</p>

Exemple :

<pre code="java">// Déclaration du superpackage :
@Version("1.0")
superpackage com.site.pack {

    // Import de modules
    @VersionConstraint("1.0+")
    import com.site.name;
    @VersionConstraint("1.5*")
    import com.site.xml;

    // Liste des packages
    member package com.site.pack, com.site.pack.impl;

    // Types exportés
    export com.site.pack.*;
}</pre>

## Nouvelles API

<ul style="text-align: left">
  <li>
    <strong>NIO 2</strong> : gestion avancée du système de fichiers (permissions, attributs de fichier), API I/O asynchrone pour les sockets et fichiers.
  </li>
  <li>
    <strong>JSR 275</strong> (gestion des unités, ex: Km, m, cm, &#8230;) : expression d&#8217;une valeur dans plusieurs unités, conversion d&#8217;unités, parsing des unités dans une String.
  </li>
  <li>
    <strong>JSR 310</strong> (date and time API) : amélioration de l&#8217;API actuelle afin de permettre de gérer des durées, des intervalles.
  </li>
  <li>
    <strong>JSR 166y</strong> : amélioration de la concurrence.
  </li>
  <li>
    <strong>JSR 225</strong> : Xquery API for Java.
  </li>
  <li>
    <strong>JSR 284</strong> : gestion de la consommation des ressources (CPU, mémoire, connexions JDBC, &#8230;).
  </li>
  <li>
    <strong>JSR 308</strong> : annotations sur les types Java.
  </li>
  <li>
    <strong>JSR 260</strong> (amélioration de la Javadoc) : tri des méthodes et champs en fonction de leur utilité, un index sémantique, distinction des méthodes/objets <em>static</em>, <em>factory</em>, <em>deprecated</em>, distinction des méthodes de propriétés (accesseurs), ajout d&#8217;exemples d&#8217;utilisation des méthodes.
  </li>
  <li>
    <strong>JSR 296</strong> (framework pour Swing) : sauvegarde de l&#8217;état entre chaque session, gestion simplifiée des actions (arrière-plan), génération des textes dans des fichiers <em>.properties</em> (localisation).
  </li>
  <li>
    <strong>JSR 303</strong> : validation des Beans (contraintes de schéma de base de données, du niveau business/service, du niveau présentation, du côté client).
  </li>
  <li>
    <strong>JSR 295</strong> : liaison des Beans.
  </li>
</ul>

## JVM

  * **Amélioration du byte-code** (gestion dynamique) afin de supporter des langages de scripts : Javascript, PHP, Ruby.
  * **Modification du Garbage Collector** : plus de gestion d&#8217;ancienne et nouvelle génération.

Article écrit à partir de : <a href="http://blog.xebia.fr/2008/02/20/nagez-avec-les-dauphins-jdk-7-proposals-overview/" title="Xebia" target="_blank">Xebia</a>.