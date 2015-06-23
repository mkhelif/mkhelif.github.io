---
title: 'ROME &#8211; Fonctionnement (2/8)'
author: mkhelif
layout: post
permalink: /rome-fonctionnement-28/
tweet_this_url:
  - http://bit.ly/cU61x
categories:
  - Java
  - Tutoriel
tags:
  - Java
---
<p class="level1">
  <!--more-->Voici ce qu&#8217;il se passe durant la lecture d&#8217;un flux de nouvelles :
</p>

<li class="level1">
  La classe permettant de parser un flux est <strong>SyndFeedInput</strong>, on crée alors une instance de cette classe : <pre class="code java">    <a href="http://www.google.com/search?hl=en&q=allinurl%3AURL+java.sun.com&bntI=I%27m%20Feeling%20Lucky"><span class="kw3">URL</span></a> feedUrl = <span class="kw2">new</span> <a href="http://www.google.com/search?hl=en&q=allinurl%3AURL+java.sun.com&bntI=I%27m%20Feeling%20Lucky"><span class="kw3">URL</span></a> <span class="br0">(</span><span class="st0">"http://wiki.mkhelif.fr/fr/feed.php"</span><span class="br0">)</span>;
    SyndFeedInput input = <span class="kw2">new</span> SyndFeedInput <span class="br0">(</span><span class="br0">)</span>;
    SyndFeed feed = input.<span class="me1">build</span> <span class="br0">(</span><span class="kw2">new</span> <a href="http://www.google.com/search?hl=en&q=allinurl%3AInputStreamReader+java.sun.com&bntI=I%27m%20Feeling%20Lucky"><span class="kw3">InputStreamReader</span></a> <span class="br0">(</span>feedUrl.<span class="me1">openStream</span> <span class="br0">(</span><span class="br0">)</span><span class="br0">)</span><span class="br0">)</span>;</pre>
</li>

<li class="level1">
  L&#8217;objet <strong>SyndFeedInput</strong> délègue alors le parsing du flux à la classe <strong>WireFeedInput</strong>.
</li>
<li class="level1">
  <strong>WireFeedInput</strong> utilise un <strong>PluginManager</strong> de <strong>FeedParsers</strong> pour sélectionner le parser à utiliser selon le type de flux.
</li>
<li class="level1">
  Le parser effectue alors le parsing du flux de nouvelles en utilisant l&#8217;<acronym title="Application Programming Interface">API</acronym> <a href="http://www.jdom.org/" class="urlextern" title="http://www.jdom.org/" rel="nofollow">JDom</a> et stoque le résultat dans un objet <strong>WireFeed</strong> héritant de <strong>WireFeedInput</strong>.
</li>
<li class="level1">
  Si le flux est de type <acronym title="Rich Site Summary">RSS</acronym>, l&#8217;objet <strong>WireFeed</strong> est de type Channel qui contient des Items, Clouds, ainsi que les autres types de données <acronym title="Rich Site Summary">RSS</acronym> contenues dans le package : <em>com.sun.syndication.feed.rss</em>.
</li>
<li class="level1">
  Si le flux est au format Atom, alors l&#8217;objet <strong>WireFeed</strong> est de type Feed du packaquage : <em>com.sun.syndication.atom</em>.
</li>
<li class="level1">
  L&#8217;objet que nous avions instancié <strong>SyndFeedInput</strong> utilise alors cet objet <strong>WireFeedInput</strong> pour créer un objet <strong>SyndFeedImpl</strong> qui fait abstraction du format du flux parsé. Cet classe implémente l&#8217;interface <strong>SyndFeed</strong> qui représente la racine de tous les formats de nouvelles.
</li>
<li class="level1">
  <strong>SyndFeedInput</strong> renvoie alors un objet <strong>SyndFeed</strong> utilisable qui représente le flux de nouvelles.
</li>
