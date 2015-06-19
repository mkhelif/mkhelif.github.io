---
title: 'ROME &#8211; Lecture d&#8217;un flux (3/8)'
author: mkhelif
layout: post
permalink: /rome-lecture-dun-flux-38/
tweet_this_url:
  - http://bit.ly/1aabeE
  - http://bit.ly/1aabeE
categories:
  - Java
  - Tutoriel
tags:
  - Java
---
Lors de la lecture d&#8217;un flux de nouvelles vous n&#8217;avez pas à vous souciez de quel parser utiliser selon le format (<acronym title="Rich Site Summary">RSS</acronym> ou Atom), la classe **SyndFeedInput** choisira directement le parser correspondant à la structure du flux.

<!--more-->

Pour lire un flux il ne faut pas plus de deux lignes :

<pre lang="java">URL feedUrl = new URL ("http://wiki.mkhelif.fr/feed.php");
SyndFeedInput input = new SyndFeedInput ();
SyndFeed feed = input.build (new XmlReader (feedUrl));
</pre>

La seconde ligne permet d&#8217;instancier un lecteur de flux qui créera un objet de type **SyndFeed **(faisant abstraction du format du flux) à la troisième ligne. Un flux de type **XMLReader** est un flux de caractères qui permet de faire abstraction de l&#8217;encodage HTTP.

Par défaut la classe **SyndFeed** surcharge la méthode *toString ()*ce qui permet d&#8217;afficher le contenu du flux dans un format standard.

<pre lang="java">System.out.println (feed);</pre>

Voici un exemple de lecteur de flux de nouvelles :

<pre lang="java">package com.mkhelif.rome.exemples;

import java.net.URL;

import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;

/**
 * Lecteur de nouvelles de type RSS/Atom.
 *
 * @author Marwan KHELIF
 */

public class Lecteur {

    public static void main (String[] args) {
        if (args.length != 1) {
            printUsage ();
        } else {
            try {
                URL feedUrl = new URL (args[0]);
                SyndFeedInput input = new SyndFeedInput ();
                SyndFeed feed = input.build (new XmlReader (feedUrl));
                System.out.println (feed);
            } catch  (Exception ex) {
                ex.printStackTrace ();
            }
        }
    } // main ()

    private static void printUsage () {
        System.out.println ("Lecteur de nouvelles de type RSS/Atom.");
        System.out.println ("Usage: java Lecteur &lt;url>");
        System.out.println ();
    } // printUsage ()
} // Lecteur
&lt;/url></pre>