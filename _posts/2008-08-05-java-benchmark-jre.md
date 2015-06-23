---
title: 'Java : benchmark de la JRE'
author: mkhelif
layout: post
permalink: /java-benchmark-jre/
tweet_this_url:
  - http://bit.ly/86N6w
categories:
  - Java
tags:
  - Java
---
On voit souvent des débats concernant la vitesse de Java par rapport au C++. Les développeurs Java disent que leur langage est plus rapide (sur certains points c&#8217;est vrai, mais il n&#8217;y en a pas beaucoup) et les développeurs C++ ont souvent des préjugés (très souvent dûs au passé de Java qui n&#8217;est pas des plus glorieux).

J&#8217;ai donc décidé de comparer, non pas Java avec C++, mais l&#8217;évolution de la JRE depuis la version 1.1 à la future 1.7.

<!--more-->

**Réalisation des benchmarks**

J&#8217;ai réalisé ces benchs avec différents algorithmes et chargements agressifs de la JVM :

  1. Copie de tableau de 10Mo par la méthode : *System.arrayCopy*.
  2. Copie de tableau de 10Mo par boucle.
  3. <a href="http://fr.wikipedia.org/wiki/Nombre_de_Fibonacci" target="_blank">Suite de Fibonacci</a>.
  4. <a href="http://fr.wikipedia.org/wiki/Fonction_d%27Ackermann" target="_blank">Fonction d&#8217;Ackermann</a>.
  5. Exécution de boucles imbriquées.
  6. Concaténation de *String* dans un *StringBuffer*.
  7. Copie de matrice.
  8. Appels intensifs de méthodes.
  9. Instanciations intensives d&#8217;objets.
 10. Calculs mathématiques.

Les sources de mes benchs sont disponibles : [sources benchmarks de la JRE][1].

Voici la configuration de la machine ayant servie à exécuter les benchs : Intel Core 2 duo cadencé à 3.00 Ghz, 2Go de mémoire, Windows XP Professional SP2.

Tous les résultats sont en millisecondes, sauf pour la taille de la JRE qui elle est en kilooctets.

### Taille de la JRE

La JRE n&#8217;a cessé de grossir au fur et à mesure des versions avec sans cesse de très nombreuses améliorations de l&#8217;API (le point fort de Java).

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-size1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-size-thumb1.png" border="0" alt="JRE-Size" width="483" height="210" /></a>
</p>

<p align="left">
  <strong>Copie de tableau : <em>System.arrayCopy</em></strong>
</p>

Dans ce bench je crée un tableau (la création du tableau n&#8217;est pas inclue dans les résultats) de 10Mo et je recopie ce même tableau dans un autre tableau grâce à la méthode *System.arrayCopy*.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-arraycopy.png"></a><a href="http://www.mkhelif.fr/uploads/2008/08/jre-arraycopy1.png"></a><a href="http://www.mkhelif.fr/uploads/2008/08/jre-arraycopy1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-arraycopy-thumb.png" border="0" alt="JRE-ArrayCopy" width="483" height="211" /></a>
</p>

<p align="left">
  <strong>Copie de tableau : boucle</strong>
</p>

Ce bench est très similaire au précédent sauf que le tableau est copié byte à byte par une boucle (ce qui est déjà beaucoup plus long).

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-rougharraycopy1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-rougharraycopy-thumb.png" border="0" alt="JRE-RoughArrayCopy" width="483" height="210" /></a>
</p>

<p align="left">
  <strong>Suite de Fibonacci</strong>
</p>

La suite de Fibonacci est un algorithme récursif qui est souvent utilisé pour effectuer des benchmarks. Cela dit les résultats sont très parlant quand à l&#8217;évolution de la récursivité dans la JVM.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-fibonacci1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-fibonacci-thumb.png" border="0" alt="JRE-Fibonacci" width="483" height="210" /></a>
</p>

<p align="left">
  <strong>Fonction d&#8217;Ackermann</strong>
</p>

La fonction d&#8217;Ackermann est aussi un algorithme récursif un peu plus agressif que la suite de Fibonacci.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-ackermann1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-ackermann-thumb.png" border="0" alt="JRE-Ackermann" width="483" height="210" /></a>
</p>

<p align="left">
  <strong>Boucles imbriquées</strong>
</p>

Ce test va tout simplement exécuter plusieurs boucles imbriquées et utiliser la valeur des index des boucles.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-loops1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-loops-thumb.png" border="0" alt="JRE-Loops" width="483" height="210" /></a>
</p>

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-loops.png"></a>
</p>

<p align="left">
  Comme souvent les premières versions de la JRE (version 1.1 et 1.2) qui étaient très légères sont beaucoup plus performantes que les versions récentes, sauf pour la 1.6 et la future 1.7 dont les performances ont été grandement améliorées.
</p>

### Concaténation StringBuffer

Dans ce bench je crée un *StringBuffer *auquel je concaténe la chaîne &#8220;*azertyuiopqsdfghjklmwxcvbn0123456789*&#8221; un million de fois.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-stringbuffer1.png"><img src="http://www.mkhelif.fr/uploads/2008/08/jre-stringbuffer-thumb.png" border="0" alt="JRE-StringBuffer" width="483" height="210" /></a>
</p>

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-stringbuffer.png"></a>
</p>

<p align="left">
  Dans ce bench on voit que la gestion des <em>String</em> a été très largement améliorée depuis la première version de la JRE (presque deux fois plus rapide).
</p>

### Copie de matrice

La multiplication de matrices permet de vérifier la vitesse de calcul de la JVM. Je teste ici 10000 multiplications de deux matrices 30&#215;30.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-matrix1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-matrix-thumb.png" border="0" alt="JRE-Matrix" width="483" height="210" /></a>
</p>

<p align="left">
  <strong>Appels de méthodes</strong>
</p>

Ce bench instancie deux objets très simples (objets à deux états) et appel leurs méthodes 100 millions de fois chacuns. L&#8217;instanciation des objets n&#8217;est pas inclue dans les résultats.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-methodcall1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-methodcall-thumb.png" border="0" alt="JRE-MethodCall" width="483" height="210" /></a>
</p>

<p align="left">
  <strong>Instanciation d&#8217;objets</strong>
</p>

<p align="left">
  Ce test met en évidence que Java est un langage Objet. Depuis la version 1.1 jusqu&#8217;à la version actuelle le temps d&#8217;instanciation de 100 millions d&#8217;objets a été divisé par 16 en passant de <strong>25 313</strong>ms a <strong>1547</strong>ms.
</p>

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-instanciation1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-instanciation-thumb.png" border="0" alt="JRE-Instanciation" width="483" height="210" /></a>
</p>

<p align="left">
  <strong>Calculs mathématiques</strong>
</p>

Ce test effectue 10 millions d&#8217;opérations mathématiques (modulo, division, &#8230;) en utilisant le résultat précédent comme paramètre de la fonction.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2008/08/jre-math1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-math-thumb.png" border="0" alt="JRE-Math" width="483" height="211" /></a>
</p>

<p align="left">
  <p align="center">
    <a href="http://www.mkhelif.fr/uploads/2008/08/jre-math.png"></a>
  </p>
  
  <h3>
    Conclusion
  </h3>
  
  <p>
    Si on agrège tous ces résultats pour obtenir une approximation de la vitesse d&#8217;exécution de la JRE (attention ce résultat est à relativiser, je n&#8217;ai pas effectué tous les benchmarks possibles), on observe que ce qui joue le plus grand rôle est l&#8217;instanciation des objets, or Java se veut être <strong>LE</strong> langage objet du moment.
  </p>
  
  <p align="center">
    <a href="http://www.mkhelif.fr/uploads/2008/08/jre-conclusion1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" src="http://www.mkhelif.fr/uploads/2008/08/jre-conclusion-thumb.png" border="0" alt="JRE-Conclusion" width="483" height="210" /></a>
  </p>
  
  <p align="center">
    <a href="http://www.mkhelif.fr/uploads/2008/08/jre-conclusion.png"></a>
  </p>
  
  <p align="left">
    Si vous avez des benchs a me soumettre je les ajouterais à ce billet.
  </p>

 [1]: http://www.mkhelif.fr/uploads/2008/08/benchmark.jar "Benchmark"
