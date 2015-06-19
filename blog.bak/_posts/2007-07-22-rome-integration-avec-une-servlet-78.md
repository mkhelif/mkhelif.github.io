---
title: 'ROME &#8211; Intégration avec une Servlet (7/8)'
author: mkhelif
layout: post
permalink: /rome-integration-avec-une-servlet-78/
tweet_this_url:
  - http://bit.ly/Mu8rP
categories:
  - Java
  - Tutoriel
tags:
  - J2EE
  - Java
---
Dans cet exemple nous créons une servlet qui renvoie un flux en réponse. Le type de flux voulu peut être passé en paramètre d&#8217;<acronym title="Uniform Resource Locator">URL</acronym> de la requête. Dans cet exemple les entrées du flux sont écrites en dur, mais il serait tout aussi simple de les générer dynamiquement (depuis une base de données par exemple).

<!--more-->

  
Le coeur de la servlet FeedServlet est ce bout de code :

<pre lang="java">public class FeedServlet extends HttpServlet {
    ...
    public void doGet (HttpServletRequest req, HttpServletResponse res) throws IOException {
            ...
            SyndFeed feed = getFeed (req);

            String feedType = req.getParameter (FEED_TYPE);
            feedType = (feedType != null) ? feedType : _defaultFeedType;
            feed.setFeedType (feedType);

            res.setContentType (MIME_TYPE);
            SyndFeedOutput output = new SyndFeedOutput ();
            output.output (feed, res.getWriter ());
            ...
    } // doGet ()

    protected SyndFeed getFeed (HttpServletRequest req) throws IOException,FeedException {
        SyndFeed feed = new SyndFeedImpl ();
        ... // Ajout des entrées et des informations sur le flux.
        return feed;
    } // getFeed ()
} // FeedServlet</pre>

La servlet renvoie le flux lors d&#8217;une requête HTTP GET avec l&#8217;appel à la méthode doGet ().

Pour commencer on récupère l&#8217;objet SyndFeed en appelant la méthode getFeed (), on passe l&#8217;objet de la requête qui pourrait contenir des informations contextuelles pour créer le flux. La création d&#8217;un flux grâce à la classe SyndFeed est expliquée en détail dans le tutorial Écriture d&#8217;un flux.

Ensuite on détermine le type de flux souhaité en regardant le paramètre de la requête, si celui-ci n&#8217;est pas précisé on choisi un type par défaut (spécifié par un paramètre d&#8217;initialisation de la servlet).

Enfin, la réponse est renvoyée avec le bon Content-Type (l&#8217;objet constant MIME_TYPE a pour valeur &#8216;application/xml; charset=UTF-8&#8242;) et le flux est écrit en utilisant la classea SyndFeedOutput.

Voici le code complet de la servlet :

<pre lang="java">package com.mkhelif.rome.exemples;

import com.sun.syndication.feed.synd.*;
import com.sun.syndication.io.FeedException;
import com.sun.syndication.io.SyndFeedOutput;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Exemple d'une Servlet qui renvoie un flux crée avec ROME.
 *
 * Le type de flux est choisi en fonction du paramètre 'type' de la requête, si le paramètre est manquant
 * on prend la valeur du paramètre d'initialisation de la servlet 'default.feed.type', si se paramètre est manquant, on choisi par
 * défaut 'atom_0.3'.
 *
 * @author Marwan KHELIF
 */
public class FeedServlet extends HttpServlet {
    private static final String DEFAULT_FEED_TYPE = "default.feed.type";
    private static final String FEED_TYPE = "type";
    private static final String MIME_TYPE = "application/xml; charset=UTF-8";
    private static final String COULD_NOT_GENERATE_FEED_ERROR = "Impossible de générer le flux";

    private static final DateFormat DATE_PARSER = new SimpleDateFormat("yyyy-MM-dd");

    private String _defaultFeedType;

    public void init () {
        _defaultFeedType = getServletConfig ().getInitParameter (DEFAULT_FEED_TYPE);
        _defaultFeedType = (_defaultFeedType != null) ? _defaultFeedType : "atom_0.3";
    } // init ()

    public void doGet (HttpServletRequest req, HttpServletResponse res) throws IOException {
        try {
            SyndFeed feed = getFeed (req);

            String feedType = req.getParameter (FEED_TYPE);
            feedType = (feedType != null) ? feedType : _defaultFeedType;
            feed.setFeedType (feedType);

            res.setContentType (MIME_TYPE);
            SyndFeedOutput output = new SyndFeedOutput ();
            output.output (feed, res.getWriter ());
        } catch (FeedException ex) {
            String msg = COULD_NOT_GENERATE_FEED_ERROR;
            log (msg, ex);
            res.sendError (HttpServletResponse.SC_INTERNAL_SERVER_ERROR, msg);
        }
    } // doGet ()

    protected SyndFeed getFeed (HttpServletRequest req) throws IOException,FeedException {
        SyndFeed feed = new SyndFeedImpl ();

        feed.setTitle ("Exemple de flux (crée avec ROME)");
        feed.setLink ("http://www.mkhelif.fr/");
        feed.setDescription ("Ce flux a été crée grâce à la librairie ROME");

        List entries = new ArrayList ();
        SyndEntry entry;
        SyndContent description;

        entry = new SyndEntryImpl ();
        entry.setTitle ("ROME v0.1");
        entry.setLink ("http://wiki.java.net/bin/view/Javawsxml/rome01");
        try {
            entry.setPublishedDate (DATE_PARSER.parse ("2004-06-08"));
        } catch (ParseException ex) {
            // Impossible dans cet exemple
        }
        description = new SyndContentImpl ();
        description.setType ("text/plain");
        description.setValue ("Initial release of ROME");
        entry.setDescription (description);
        entries.add (entry);

        entry = new SyndEntryImpl ();
        entry.setTitle ("Rome v0.2");
        entry.setLink ("http://wiki.java.net/bin/view/Javawsxml/rome02");
        try {
            entry.setPublishedDate (DATE_PARSER.parse("2004-06-16"));
        } catch (ParseException ex) {
            // Impossible dans cet exemple
        }
        description = new SyndContentImpl ();
        description.setType ("text/plain");
        description.setValue ("Bug fixes, minor API changes and some new features"+
                              "For details check the <a href="http://wiki.java.net/bin/view/Javawsxml/RomeChangesLog#Rome">Changes Log for 0.2</a>");
        entry.setDescription (description);
        entries.add (entry);

        entry = new SyndEntryImpl ();
        entry.setTitle ("ROME v0.3");
        entry.setLink ("http://wiki.java.net/bin/view/Javawsxml/rome03");
        try {
            entry.setPublishedDate (DATE_PARSER.parse("2004-07-27"));
        } catch (ParseException ex) {
            // Impossible dans cet exemple
        }
        description = new SyndContentImpl ();
        description.setType ("text/html");
        description.setValue ("Bug fixes, API changes, some new features and some Unit testing" +
                                     "For details check the <a href="http://wiki.java.net/bin/view/Javawsxml/RomeChangesLog#Rome">Changes Log for 0.3</a>");
        entry.setDescription (description);
        entries.add (entry);

        entry = new SyndEntryImpl ();
        entry.setTitle ("ROME v0.4");
        entry.setLink ("http://wiki.java.net/bin/view/Javawsxml/rome04");
        try {
            entry.setPublishedDate (DATE_PARSER.parse("2004-09-24"));
        } catch (ParseException ex) {
            // Impossible dans cet exemple
        }
        description = new SyndContentImpl ();
        description.setType ("text/html");
        description.setValue ("Bug fixes, API changes, some new features, Unit testing completed" +
                              "For details check the <a href="http://wiki.java.net/bin/view/Javawsxml/RomeChangesLog#Rome">Changes Log for 0.4</a>");
        entry.setDescription (description);
        entries.add (entry);

        feed.setEntries (entries);

        return feed;
    } // getFeed ()
} // FeedServlet</pre>

Pour utiliser cette Servlet nous devons créer une application Web pour laquelle il nous faut un fichier web.xml :

<pre lang="xml"><code>
&lt; ?xml version="1.0" encoding="UTF-8"?>

&lt; !DOCTYPE web-app PUBLIC "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN" "http://java.sun.com/dtd/web-app_2_3.dtd">
&lt;web>
    &lt;display>Exemple ROME&lt;/display>

    &lt;servlet>
        &lt;/servlet>&lt;servlet -name>FeedServlet&lt;/servlet>
        &lt;servlet -class>com.mkhelif.rome.exemples.FeedServlet&lt;/servlet>
        &lt;init -param>


        &lt;/init>

    &lt;servlet -mapping>
         &lt;/servlet>&lt;servlet -name>FeedServlet&lt;/servlet>
         &lt;url -pattern>/feed&lt;/url>

&lt;/web>
</code>
</pre>

Pour créer l&#8217;application lancer la commande suivante dans le sous-projet d&#8217;exemples : maven war.

Le fichier WAR, exemples-rome.war, va être crée dans le répertoire cible. Déployer le WAR dans un conteneur de Servlet et la FeedServlet devrait être prête.

Si vous utilisé Tomcat 4 ou Tomcat 5 et que le fichier WAR a été mis dans le répertoire *${TOMCAT}/webapps*, l&#8217;URL pour accéder à la Servlet devrais être *http://localhost:8080/exemples-rome/feed*.