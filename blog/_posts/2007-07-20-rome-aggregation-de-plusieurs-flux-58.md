---
title: 'ROME &#8211; Aggrégation de plusieurs flux (5/8)'
author: mkhelif
layout: post
permalink: /rome-aggregation-de-plusieurs-flux-58/
tweet_this_url:
  - http://bit.ly/boIEB
categories:
  - Java
  - Tutoriel
tags:
  - Java
---
L&#8217;aggrégation de plusieurs flux est extrèmement simple à mettre en place. La classe **SyndFeed** représentant un flux possède des accesseurs/modifieurs qui permettent de créer le flux directement dans le code. L&#8217;exemple ci-dessous crée un flux de type <acronym title="Rich Site Summary">RSS</acronym> 1.0, lui assigne un titre, une description, un auteur et un lien.

<!--more-->

<pre lang="java">SyndFeed aggrFeed = new SyndFeedImpl ();
aggrFeed.setFeedType ("rss_1.0");
aggrFeed.setTitle("Flux aggrégé");
aggrFeed.setDescription ("Flux aggrégé");
aggrFeed.setAuthor ("Marwan KHELIF");
aggrFeed.setLink ("http://wiki.mkhelif.fr/");</pre>

Les propriétés d&#8217;un objet SyndFeed peuvent être modifiées, assignées à un autre flux, supprimer, etc… Les accesseurs modifient directement la référence de l&#8217;objet et non la valeur, ainsi modifier les entrées d&#8217;un flux auquel on a assigné les entrées d&#8217;un autre flux aura pour effet d&#8217;altérer les deux flux.

L&#8217;exemple suivant présente comment insérer les entrées d&#8217;un flux en train d&#8217;être lu, dans un flux d&#8217;un autre format :

<pre lang="java">package com.mkhelif.rome.exemples;

import java.io.PrintWriter;
import java.net.URL;

import java.util.List;
import java.util.ArrayList;

import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.feed.synd.SyndFeedImpl;
import com.sun.syndication.io.SyndFeedOutput;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;

/**
 * Aggrégateur de flux (de différents types) dans un unique flux au format spécifié.
 *
 * @author Marwan KHELIF
 */
public class Aggregator {

    public static void main (String[] args) {
        if (args.length &lt; 2) {
            printUsage ();
        } else {
            try {
                String outputType = args [0];

                SyndFeed feed = new SyndFeedImpl ();
                feed.setFeedType (outputType);

                feed.setTitle ("Flux aggrégé");
                feed.setDescription ("Flux aggrégé");
                feed.setAuthor ("Marwan KHELIF");
                feed.setLink ("http://www.mkhelif.fr/");

                List entries = new ArrayList ();
                feed.setEntries (entries);

                for (int i = 1 ; i &lt; args.length ; i++) {
                    URL inputUrl = new URL (args[i]);

                    SyndFeedInput input = new SyndFeedInput ();
                    SyndFeed inFeed = input.build (new XmlReader (inputUrl));

                    entries.addAll (inFeed.getEntries ());
                }

                SyndFeedOutput output = new SyndFeedOutput ();
                output.output (feed, new PrintWriter (System.out));
            } catch (Exception ex) {
                ex.printStackTrace ();
            }
        }
    } // main ()

    private static void printUsage () {
        System.out.println ("Aggrégateur de flux (de différents types) dans un unique flux au format spécifié.");
        System.out.println ("Usage: java Aggregator
&lt;format> &lt;url>");
        System.out.println ("Formats valides : rss_0.9, rss_0.91, rss_0.92, rss_0.93,");
        System.out.println ("                  rss_0.94, rss_1.0, rss_2.0, atom_0.3");
        System.out.println ();
    } // printUsage ()
} // Aggregator
&lt;/url>&lt;/format></pre>