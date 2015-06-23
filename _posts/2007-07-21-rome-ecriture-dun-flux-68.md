---
title: 'ROME &#8211; Écriture d&#8217;un flux (6/8)'
author: mkhelif
layout: post
permalink: /rome-ecriture-dun-flux-68/
tweet_this_url:
  - http://bit.ly/8fED8
categories:
  - Java
  - Tutoriel
tags:
  - Java
---
Créer un flux avec l&#8217;object **SyndFeed** est très simple, il suffit de positionner certaines propriétés (auteur, titre, les entrées du flux, …). L&#8217;exemple suivant montre comment créer un flux avec trois entrées.

On crée une instancede **SyndFeed**, on sélectionne le type de flux de sortie ainsi que les informations propres au flux (titre, lien, description).

<!--more-->

<pre lang="java">SyndFeed feed = new SyndFeedImpl();
feed.setFeedType(feedType);

feed.setTitle ("Exemple de flux (crée avec ROME)");
feed.setLink ("http://www.mkhelif.fr/");
feed.setDescription ("Ce flux a été crée avec ROME (librairie de syndication en Java)");</pre>

Ensuite il faut créer les différentes entrées, on crée une liste qui sera donner à notre object SyndFeed. Chaque entrée est créée avec un titre, un lien, une date de publication et une description. Pour la première entrée la description est du texte, et pour la troisière c&#8217;est du HTML. Chaque entrée est ensuite ajoutée à la liste.

<pre lang="java">List entries = new ArrayList ();
SyndEntry entry;
SyndContent description;

entry = new SyndEntryImpl ();
entry.setTitle ("ROME v1.0");
entry.setLink ("http://wiki.java.net/bin/view/Javawsxml/Rome01");
entry.setPublishedDate (DATE_PARSER.parse ("2004-06-08"));
description = new SyndContentImpl ();
description.setType ("text/plain");
description.setValue ("Initial release of ROME");
entry.setDescription (description);
entries.add (entry);
...
entry = new SyndEntryImpl ();
entry.setTitle ("ROME v3.0");
entry.setLink ("http://wiki.java.net/bin/view/Javawsxml/Rome03");
entry.setPublishedDate (DATE_PARSER.parse("2004-07-27"));
description = new SyndContentImpl ();
description.setType ("text/html");
description.setValue ("

More Bug fixes, mor API changes, some new features and some Unit testing

" +
                      "

For details check the <a href="http://wiki.java.net/bin/view/Javawsxml/RomeChangesLog#RomeV03%5C%22">Changes Log</a>

");
entry.setDescription (description);
entries.add (entry);</pre>
