---
title: 'Chrome : comment créer une extension ?'
author: mkhelif
layout: post
permalink: /chrome-comment-crer-une-extension/
tweet_this_url:
  - http://bit.ly/kfFkx
categories:
  - Actualités
  - Chrome
  - Google
  - Tutoriel
  - Web
tags:
  - Chrome
  - Google
  - Web
---
La version 2.0 beta du navigateur Google Chrome est disponible en téléchargement. Une des évolutions majeures de cette version est la possibilité de rajouter des extensions (attention, ne vous attendez pas à la puissance de XUL des produits Mozilla).<!--more-->

**Développement**

Pour développer une extension pour Chrome, il faut tout d&#8217;abord <a href="http://www.google.com/intl/en/landing/chrome/beta/index.html" target="_blank">télécharger la dernière version 2.0 beta</a>. Ensuite créer un répertoire qui va contenir l&#8217;arborescence de l&#8217;extension : *C:MyChromeExtension*. Dans ce répertoire on va créer deux fichiers : *manifest.json* et *MyExtension.js*.

Le fichier *manifest.json* qui décrit l&#8217;extension :

<pre lang="javascript">{
  "format_version": 1,
  "id": "00123456789ABCDEF0123456789ABCDEF0123456",
  "version": "1.0",
  "name": "My First Extension",
  "description": "The first extension that I made.",
  "content_scripts": [
    {
      "matches": ["http://www.google.fr/"],
      "js": ["MyExtension.js"]
    }
  ]
}</pre>

Voilà les différents champs :

  * *format_version* : permet de définir quelle version du format du manifest est utilisée. Pour l&#8217;instant il n&#8217;y a que la version 1 de disponible.
  * *id* : à l&#8217;instar des extensions Mozilla, c&#8217;est un identifiant qui doit être unique pour chaque extension. C&#8217;est une chaîne de 40 caractères.
  * *version* : version de l&#8217;extension. N&#8217;importe quel numéro de version peut être utilisé à condition que ce soit des nombres séparés par un point : *1.0.0.0*.
  * *name *: le nom de l&#8217;extension.
  * *description *(optionnel)* *: une description optionnelle de l&#8217;extension.
  * *content_scripts* : les scripts à exécuter lorsque l&#8217;URL de la page valide le modèle. 
      * *matches *: modèle d&#8217;URL qui permet d&#8217;appliquer le script.
      * *js *: fichier JavaScript qui sera exécuté si l&#8217;URL courante valide le modèle.

Ensuite il faut créer le fichier JavaScript qui va être exécuté au chargement de la page de Google. Modifier le fichier *MyExtension.js* :

<pre lang="javascript">alert ('Hello World!');</pre>

### Utilisation de l&#8217;extension

Pour utiliser l&#8217;extension que l&#8217;on vient de développer, il faut démarrer Chrome dans un mode permettant de charger les extensions : *chrome.exe &#8211;enable-extensions &#8211;load-extension=&#8221;C:MyChromeExtension&#8221;*.

Et naviguer sur votre moteur de recherche favoris pour voir que votre extension fonctionne bien.

### Distribution de l&#8217;extension

Pour distribuer l&#8217;extension il faut la packager au format CRX. Pour cela il faut que Python 2.6 soit installé sur votre machine et télécharger <a href="http://src.chromium.org/viewvc/chrome/trunk/src/chrome/tools/extensions/chromium_extension.py?content-type=text/plain" target="_blank">ce script</a>. Ensuite lancer la commande suivante :

<pre lang="sh">chromium_extension.py --indir="C:MyChromeExtension" --outfile="MyExtension.crx"</pre>

Pour voir les extensions qui sont installées dans Chrome, il suffit d&#8217;aller à l&#8217;URL suivante : <a href="chrome-ui://extensions/" target="_blank">chrome-ui://extensions/</a>. Cette page liste les extensions chargées et les erreurs qui on été rencontrées dans l&#8217;exécution des extensions.

### Conclusion

Même si ce n&#8217;est pas du tout du même niveau que celui des produits Mozilla cela permet de mettre en place un système d&#8217;extensions qui, je l&#8217;espère, sera amélioré dans les futures versions.

Sources : <a href="http://dev.chromium.org/developers/design-documents/extensions/howto" target="_blank">Chrome Extension HOWTO ‎(Chromium Developer Documentation)</a>.
