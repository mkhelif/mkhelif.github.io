---
title: 'ROME &#8211; Conversion d&#8217;un format à un autre (4/8)'
author: mkhelif
layout: post
permalink: /rome-conversion-dun-format-a-un-autre-48/
tweet_this_url:
  - http://bit.ly/8emti
categories:
  - Java
  - Tutoriel
tags:
  - Java
---
Pour lire un flux il suffit d&#8217;utiliser la classe **SyndFeedInput** qui sélectionnera le parser à utiliser et qui permettra de récupérer le flux en tant que **SyndFeed**, format qui fait abstraction du format du flux.

<!--more-->

<pre lang="java">SyndFeedInput input = new SyndFeedInput ();
SyndFeed feed = input.build (new XmlReader (new URL ("http://wiki.mkhelif.fr/feed.php")));</pre>

Rome permet de générer des flux de nouvelles à partir d&#8217;instances de SyndFeed grâce à la classe SyndFeedOutput. La génération d&#8217;un flux se fait en seulement deux lignes :

<pre lang="java">SyndFeedOutput output = new SyndFeedOutput ();
output.output (feed, new PrintWriter (System.out));</pre>

La première ligne créer une instance de SyndFeedOutput qui va permettre de générer le flux. Cette classe permet de générer des flux de différents types :

  * rss_0.9
  * rss_0.91
  * rss_0.92
  * rss_0.93
  * rss_0.94
  * rss_1.0
  * rss_2.0
  * atom_0.3

L&#8217;objet SyndFeed contient un paramètre feedType permettant de spécifier le type de flux. La seconde ligne génére le flux de nouvelles et l&#8217;envoi sur la sortie passée en paramètre (ici la sortie standard).

Voici un exemple d&#8217;application permettant de convertir un flux dans un autre format :

<pre lang="java">package com.mkhelif.rome.exemples;

import java.io.PrintWriter;
import java.net.URL;

import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.SyndFeedOutput;
import com.sun.syndication.io.XmlReader;

/**
 * Convertis un flux de type RSS/Atom vers un autre type de flux RSS/Atom.
 *
 * @author Marwan KHELIF
 */
public class Converter {

    public static void main (String[] args) {
        if (args.length != 2) {
            printUsage ();
        } else {
            try {
                String outputType = args[0];
                URL feedUrl = new URL (args[1]);

                SyndFeedInput input = new SyndFeedInput ();
                SyndFeed feed = input.build (new XmlReader (feedUrl));
                feed.setFeedType (outputType);
                SyndFeedOutput output = new SyndFeedOutput ();
                output.output (feed,new PrintWriter (System.out));
            } catch (Exception ex) {
                ex.printStackTrace ();
            }
        }
    } // main ()

    private static void printUsage () {
        System.out.println ("Convertis les différents types de flux RSS/Atom.");
        System.out.println ("Usage: java Converter
&lt;format> &lt;url>");
        System.out.println ("Formats valides : rss_0.9, rss_0.91, rss_0.92, rss_0.93,");
        System.out.println ("                  rss_0.94, rss_1.0, rss_2.0, atom_0.3");
        System.out.println ();
    } // printUsage ()
} // Converter
&lt;/url>&lt;/format></pre>