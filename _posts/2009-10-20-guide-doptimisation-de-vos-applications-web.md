---
title: Guide d’optimisation de vos applications Web
author: mkhelif
layout: post
permalink: /guide-doptimisation-de-vos-applications-web/
tt_auto_tweet:
  - 'false'
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
tweet_this_url:
  - http://bit.ly/2Y6sM3
categories:
  - Tutoriel
  - Web
tags:
  - Web
---
Bon ça fait un moment que je prépare cet article (j’en ai encore en préparation) mais je ne trouvai pas le temps pour finir de le rédiger. Cet article est une liste de conseils&#160; afin d’optimiser vos applications Web.

### Optimisation du serveur

La première chose à faire lorsque vous êtes dans une démarche d’optimisation de vos applications Web est d’optimiser au maximum le serveur qui va héberger les applications. Car vous aurez beau passer tout votre temps à optimiser vos applications, si le serveur met du temps à servir les requêtes ça n’aura servi à rien.

#### Serveur privé

Si vous développez une application Web dans un but professionnel il est nécessaire d’avoir un serveur privé avec une adresse IP dédiée et un accès SSH. Cela permet d’avoir un accès complet à l’ensemble de la configuration du serveur et d’installer de nouveaux programmes : comment faites-vous si votre hébergement mutualisé ne contient pas l’extension cURL de PHP et que votre application ne peut être exécuté sans?

Si c’est une application personnelle (un blog par exemple) il est toujours bon d’avoir un accès complet à la configuration du serveur. Aujourd’hui il existe de nombreuses solutions de serveurs dédiés pour 30€ / mois ou moins.

**Bénéfices :** configuration, sécurité et stabilité.

#### Activer la compression

Le serveur Web reçoit des requêtes et envoi en réponse des contenus (HTML, CSS, images, …). Le temps de chargement complet d’une page Web représente le temps de chargements de toutes les ressources : le client demande d’abord la page HTML puis charge au fur et à mesure toutes les ressources référencées par la page.

L’objectif est donc de diminuer le temps réseau du téléchargement des ressources en compressant les données envoyées par le serveur avec gZIP. Compresser les données textuelles (HTML, JavaScript, CSS) est extrêmement efficace : environ 50% de gain (donc deux fois moins de temps de téléchargement pour le client).

Pour Apache il faut activer le module &#8220;*deflate*&#8221; ou &#8220;*gzip*&#8221; pour les anciennes versions (jusqu’à 1.3).

**Bénéfices :** gain important sur le temps de téléchargement du client.

#### Activer le cache

Lorsqu’un utilisateur se connecte à un serveur Web il télécharge toutes les ressources associées à la page Web qu’il consulte. Cependant sur la page, très peu de ressources ne sont modifiées au cours du temps : vous ne changez pas le logo de votre site tous les quatre matins. Quel est alors l’intérêt de forcer l’utilisateur à re-télécharger ces ressources?

Pour cela le protocole HTTP propose un système de cache des ressources qui permet au navigateur d’utiliser des ressources dont la version n’a pas changé. Par défaut les serveurs Web sont configurés avec le cache activé et vous n’avez donc rien à faire, mais il vaut mieux rappeler les bons conseils.

Pour Apache, il faut activer le module “*expires*” qui utilise l’en-tête “*Expires*” pour donner une date de péremption à la réponse, le client peut dont la mettre en cache et ainsi réduire considérablement le nombre de requêtes au serveur.

Pour ajouter le mode “*expires*” :

<pre>a2enmod expires</pre>

Ensuite vous devez modifier le fichier “*expires.conf*” pour référencer les fichiers pour lesquels vous souhaitez ajouter le header.

**Bénéfices :** réduction du nombre de requêtes au serveur Web et réduction des accès disques et de temps processeur.

#### Améliorer la configuration

Tous les serveurs Web ont une configuration par défaut : nombre de Threads maximum à démarrer, durée maximum de temps de traitement, mémoire allouée à chaque Thread, …

<font color="#ff0000"><font color="#000000">Vous devez modifier la configuration afin que le serveur Web réponde au niveau de qualité souhaité. Parmi toutes les propriétés que vous pouvez configurer, voici les plus courantes :</font></font>

  * **Désactiver le *reverse DNS*** **:** lorsqu’un client se connecte à votre application Web, sa requête est enregistrée dans les logs du serveur. Le serveur va effectuer une requête DNS afin de récupérer le nom de domaine correspondant à l’adresse IP du client. En désactivant cette option vous économiserez de nombreuses requêtes inutiles. 
  * **Keep-Alive :** cette option permet au serveur Web de ne pas fermer la connexion du client lorsque la requête a été servie. Cela économise de nombreuses ouvertures de connexions au client.
    
    Au niveau de cette option il y a quelques paramètres à modifier : *KeepAliveTimeout* et *Timeout*. Le paramètre *KeepAliveTimeout* représente le temps maximum entre deux requêtes sur la même connexion. Le paramètre *Timeout* représente le temps maximum entre la connexion et la première requête. Ces deux paramètres étant à modifier en fonction de votre application.

### Optimisation des ressources

Une fois que votre serveur Web est prêt avec une configuration optimale, vous pouvez optimiser les ressources que vous utilisez dans votre application : CSS, JavaScript, images.

#### Sprite CSS

Lors du chargement d’une page HTML, le navigateur Web va récupérer l’ensemble des ressources : CSS, JavaScript et souvent beaucoup d’images. Pour récupérer toutes les ressources, le navigateur utilise par défaut deux connexions au serveur Web et va attendre que l’une des connexions soit disponible pour récupérer la ressource suivante.

Les sprites CSS permettent de regrouper toutes ou une grande partie des images en une seule image. Il y a deux intérêts à cette technique : beaucoup moins de requêtes faîtes au serveur Web et l’image sera moins volumineuse (les informations de format et de compression ne sont stoquées qu’une seule fois).

Au niveau des feuilles de style CSS, il faut mettre la grande image en arrière-plan du composant et positionner le sprite (la parcelle de l’image) souhaité grâce à l’instruction *background-position*.

Au niveau du gain de volume de l’image voilà des statistiques :

<div align="center">
  <table>
    <tr>
      <th>
        Format
      </th>
      
      <th>
        Taille six images
      </th>
      
      <th>
        Taille image sprite
      </th>
      
      <th>
        Différence
      </th>
    </tr>
    
    <tr>
      <td>
        GIF
      </td>
      
      <td>
        6046 b
      </td>
      
      <td>
        1894 b
      </td>
      
      <td>
        <font color="#1db002">-69%</font>
      </td>
    </tr>
    
    <tr>
      <td>
        JPEG
      </td>
      
      <td>
        5916 b
      </td>
      
      <td>
        2187 b
      </td>
      
      <td>
        <font color="#1db002">-63%</font>
      </td>
    </tr>
    
    <tr>
      <td>
        PNG
      </td>
      
      <td>
        4479 b
      </td>
      
      <td>
        3844 b
      </td>
      
      <td>
        <font color="#1db002">-14%</font>
      </td>
    </tr>
  </table>
</div>

#### Réduction des CSS

Les feuilles de styles sont les éléments principaux du design d’une application Web et peuvent rapidement devenir des ressources volumineuses. Le principal problème des feuilles de styles est quelles contiennent énormément de caractères inutiles : espaces, sauts de lignes, commentaires. Le navigateur Web quand il reçoit une feuille de style ignore c&#8217;est caractère, ils ne sont utilisés que par le designer afin de facilement comprendre les instructions.

Afin d’économiser de la bande passante et du temps de téléchargement d’une page Web il est possible de réduire considérablement la taille des feuilles de styles grâce à des services Web comme : [CSS Optimizer][1], [Icey’s CSS Compressor][2], [Flumpcake CSS Optimizer][3], [Clean CSS][4].

Si on regarde la différence sur certains sites avec un certain nombre de visiteurs :

<div align="center">
  <table>
    <tr>
      <th>
        Site Web
      </th>
      
      <th>
        Feuille de styles
      </th>
      
      <th>
        Feuille de styles optimisée
      </th>
      
      <th>
        Différence
      </th>
    </tr>
    
    <tr>
      <td>
        Free.fr
      </td>
      
      <td>
        35.19 Kb
      </td>
      
      <td>
        19.09 Kb
      </td>
      
      <td>
        <font color="#1db002">-46%</font>
      </td>
    </tr>
    
    <tr>
      <td>
        PC Inpact
      </td>
      
      <td>
        37.14 Kb
      </td>
      
      <td>
        27.31 Kb
      </td>
      
      <td>
        <font color="#1db002">-26%</font>
      </td>
    </tr>
    
    <tr>
      <td>
        Microsoft.com
      </td>
      
      <td>
        30.7 Kb
      </td>
      
      <td>
        22.41 Kb
      </td>
      
      <td>
        <font color="#1db002">-27%</font>
      </td>
    </tr>
  </table>
</div>

Oui Twitter n’est pas présent, leur feuille de styles est déjà optimisée <img src='http://www.mkhelif.fr/wp-includes/images/smilies/icon_smile.gif' alt=':)' class='wp-smiley' /> .

Afin d’économiser en nombre de requêtes, vous pouvez regrouper tous vos styles dans un seul fichier CSS.

#### Réduction des JavaScripts

De la même façon que pour les feuilles de styles, les fichiers JavaScript peuvent être optimisés afin de diminuer le temps de téléchargements de ces fichiers. Voici les services Web qui proposent de réduire vos JavaScripts : [Dojo Shrinksafe][5], [JavaScript Compressor][6]<font color="#000000">. Il existe de très nombreuses applications qui font le même travaille.</font>

#### Stockage des ressources

Lorsqu’un utilisateur arrive sur une page Web, il télécharge le HTML puis il récupère les ressources référencées par la page. Les ressources sont téléchargées en utilisant par défaut deux connexions par serveur. L’idée est donc de séparée le stockage des ressources statiques des données dynamiques : le HTML généré sur un serveur, les CSS et JavaScripts sur un autre serveur.

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2009/10/server.png"><img title="server" border="0" alt="server" src="http://www.mkhelif.fr/uploads/2009/10/server.png" width="504" height="281" /></a>
</p>

<font color="#000000"><strong>Bénéfices :</strong> le client va utiliser deux connexions pour récupérer uniquement des ressources statiques et ne va pas surcharger le serveur de traitement avec des requêtes “statiques”.</font>

### Optimisation de l’application

Voilà à partir d’ici vous devez avoir bien amélioré le temps de chargement de votre application. Les conseils suivants sont plus des conseils

#### Landing page

Une &#8220;landing page&#8221; est une page sur laquelle vous souhaitez que vos visiteurs arrivent depuis les moteurs de recherches et autres. L’objectif de cette page est que l’utilisateur n’arrive pas sur une page d’accueil mais directement sur l’information qu’il cherche. Il faut donc que cette page soit rapide et présente l’information de façon simple et concise.

Pour cela évitez au maximum d’effectuer de long traitement ou d’effectuer des appels à une base de données si ce n’est pas nécessaire. Préférez une version statique d’une landing page qui sera servie très rapidement.

#### Éviter les redirections

Évitez au maximum le nombre de redirections, à chaque fois que le serveur renvoie une redirection (301, 302, …), le client effectue une nouvelle requête. Si en plus vous n’avez pas activé le *Keep-Alive*, il va faire une nouvelle connexion.

Ne garder les redirections que pour du SEO afin de ne pas perdre le référencement d’une page dont vous changez l’URL.

#### Plugins WordPress

<font color="#000000">Si vous utilisez WordPress il existe de nombreux plugins qui permettent d’améliorer la vitesse de chargement de votre blog.</font>

##### WP Super Cache

<font color="#000000"><a href="http://wordpress.org/extend/plugins/wp-super-cache/">WP Super Cache</a> est un plugin qui va générer une version statique de vos pages (billets, pages, …). Ainsi votre blog servira la version statique au lieu de re-générer la page HTML pour chaque visiteur. La version statique est re-générée à chaque nouveaux commentaires, billets ou pages.</font>

##### Réduire son nombre de plugins

<font color="#000000">À chaque fois qu’un utilisateur effectue une action sur un blog wordpress, le serveur appelle les plugins nécessaires pour servir la page. Si vous avez beaucoup de plugins, cela peut ralentir radicalement votre blog.</font>

<font color="#000000">Faîtes le ménage dans vos plugins et ne garder que les essentiels.</font>

### Outils d’analyse

Afin de voir les différences de temps de chargement d’une page il faut avoir de bons outils d’analyse. Que ce soit un outils spécialisé ou un module du navigateur Web, il est nécessaire de mesurer les différences entre deux configurations.

#### Firebug

Pour les développeurs Web qui ont l’habitude de tester leurs applications avec Firefox, la plupart utilisent le plugin Firebug qui permet entre autres d’analyser en détail (et de modifier en direct) le contenu HTML, le CSS, le JavaScript et de visualiser les requêtes/réponses avec l’application Web.

De nombreux plugins ont été développés sur Firebug pour fournir des informations sur le chargement de la page.

##### Page Speed

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2009/10/pagespeed.png"><img title="pagespeed" border="0" alt="pagespeed" src="http://www.mkhelif.fr/uploads/2009/10/pagespeed.png" width="504" height="202" /></a>
</p>

[Page Speed][7] est une extension pour Firebug, réalisée par Google, qui analyse la page Web qui vient d’être chargée et vous informe des améliorations que vous pouvez apporter à votre serveur / configuration /&#160; application pour diminuer le temps de chargement de votre page.

##### YSlow

<p align="center">
  <a href="http://www.mkhelif.fr/uploads/2009/10/yslow.png"><img title="yslow" border="0" alt="yslow" src="http://www.mkhelif.fr/uploads/2009/10/yslow.png" width="504" height="221" /></a>
</p>

[YSlow][8] a été développé par Yahoo est analyse aussi les points à améliorer.

#### Tests de charge

Enfin une fois que vous avez optimisé votre application Web il est bon de savoir si elle va tenir la charge face au nombre d’utilisateurs prévus. Pour cela il existe de nombreux outils de test en charge d’application Web, mais je n’en conseillerai qu’un : [NeoLoad][9], par la société <strike>où je bosse</strike> [Neotys][10].

L’objectif est de faire simuler par le logiciel un nombre d’utilisateurs virtuels qui vont exécuter un scénario sur l’application et d’analyser les résultats (temps de réponses, erreurs, …) afin de corriger ou d’optimiser l’application. 

### Conclusion

Le secret pour avoir une application Web rapide et efficace est de tester votre configuration, d’analyser les points à améliorer et de les optimiser puis de re-tester, … et ainsi de suite jusqu’à ce que vous atteignez la qualité de service souhaitée.

Et vous comment faîtes vous pour optimiser vos applications Web? Quels outils utilisez-vous?

 [1]: http://www.cssoptimiser.com/
 [2]: http://iceyboard.no-ip.org/projects/css_compressor
 [3]: http://flumpcakes.co.uk/css/optimiser/
 [4]: http://www.cleancss.com/
 [5]: http://shrinksafe.dojotoolkit.org/
 [6]: http://javascriptcompressor.com/
 [7]: http://code.google.com/intl/fr/speed/page-speed/
 [8]: http://developer.yahoo.com/yslow/
 [9]: http://neotys.fr/test-en-charge/how-it-works.html
 [10]: http://www.neotys.fr/
