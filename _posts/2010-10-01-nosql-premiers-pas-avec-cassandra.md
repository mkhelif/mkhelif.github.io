---
title: 'NoSQL : premiers pas avec Cassandra'
author: mkhelif
layout: post
permalink: /nosql-premiers-pas-avec-cassandra/
aktt_notify_twitter:
  - yes
tt_auto_tweet:
  - 'false'
tt_auto_tweet_text:
  - 'New blog post: [TITLE] [URL] '
tweet_this_url:
  - http://bit.ly/cSls3W
aktt_tweeted:
  - 1
categories:
  - Java
  - NoSQL
tags:
  - Cassandra
  - Java
  - NoSQL
  - Web
---
Je reviens après ce long silence pour vous présenter une “nouvelle” technologie qui se développe de plus en plus : les bases de données NoSQL, et principalement Cassandra, la solution de la fondation Apache.

## Introduction

Pour commencer, une base de données NoSQL qu’est-ce que c’est ?

C’est une base de données **non** relationnelle. La plupart des bases de données relationnelles (MySQL, Oracle, PostgreSQL…) utilisent le langage SQL pour fournir un accès aux données. Pour les bases de données NoSQL, il n’y a donc pas de requête SQL.

Le stockage utilise alors différentes représentations :

  * Bases orientées clé ? valeur : représentation la plus simple. Comme pour une table de hashage, chaque clé est associée à une seule valeur.
  * Bases orientées colonnes : les bases de données relationnelles structures les données en colonnes, chaque ligne comporte toutes les colonnes définies. Pour les bases orientées colonnes, c&#8217;est un peu l&#8217;inverse, les données sont structurées par lignes, identifiées par une clé, et chaque ligne comporte uniquement les colonnes qui la concernent.
  * Bases orientées documents : à chaque clé correspond un document qui a une structure particulière. Un document contient des données organisées hiérarchiquement.
  * Bases orientées graphes : permettent d’adresser des problèmes complexes grâce à une schématisation très souple. La représentation est intuitive, car elle décrit directement la réalité.

Regardez cet article pour en savoir plus sur <a href="http://blog.xebia.fr/2010/04/21/nosql-europe-tour-dhorizon-des-bases-de-donnees-nosql/" target="_blank">les différentes bases de données NoSQL</a>. N’hésitez pas à regarder les articles spécifiques à chaque famille de bases de données.

Ce type de base de données connait un succès grandissant, car des acteurs majeurs du Web ont choisi ce type de solutions : Facebook, Twitter, Digg, LinkedIn&#8230;.

Il existe de nombreuses solutions de bases de données NoSQL : <a href="http://cassandra.apache.org/" target="_blank">Cassandra</a> (de la fondation Apache), <a href="http://www.hypertable.org/" target="_blank">Hypertable</a>, <a href="http://www.mongodb.org/" target="_blank">MongoDB</a>, <a href="http://project-voldemort.com/" target="_blank">Projet Voldemort</a>…

## Présentation de Cassandra

Cassandra est la solution NoSQL d’Apache. C’est une base de données orientée colonnes <font color="#000000">qui se veut être hautement extensible. C’est-à-dire qu’il est très simple d’ajouter ou d’enlever (c’est plus rare) un nœud du cluster. D’abord développé par Facebook, le code source est devenu Open-Source et repris par la fondation Apache.</font>

### Modèle de données

Il existe quatre types de données dans Cassandra : les colonnes (*Column*), les supercolonnes (*SuperColumn*), les familles de colonnes (*ColumnFamily*) et le *KeySpace*.

#### Column

Objet de plus bas niveau, il est composé d’une clé (le nom de la colonne), d’une valeur et d’un timestamp.

Les timestamps des colonnes sont utilisés pour résoudre les conflits entre plusieurs nœuds de l’infrastructure, pour savoir si un nœud à une version plus récente. Il est donc important que tous les nœuds de l’infrastructure soient synchronisés sur la même horloge.

#### SuperColumn

Une supercolonne représente une colonne dont les valeurs sont d’autres colonnes. C’est le moyen le plus simple pour représenter une relation entre deux objets.

<p align="center">
  <a href="http://www.mkhelif.fr/wp-content/uploads/2010/10/SuperColumn.png"><img style="display: inline;" title="SuperColumn" border="0" alt="SuperColumn" src="http://www.mkhelif.fr/wp-content/uploads/2010/10/SuperColumn_thumb.png" width="299" height="234" /></a>
</p>

#### ColumnFamily

Les familles de colonnes sont similaires aux tables des bases de données relationnelles. Elles contiennent les données organisées en lignes, chaque ligne est identifiée par une clé unique (correspondant à la clé primaire pour les bases de données relationnelles). Chaque ligne contient alors un ensemble de (super-)colonnes.

À l’intérieur des ColumnFamily, les clés sont toujours triées. La façon de trier dépend de la clé utilisée : nombre, chaîne de caractère, <a href="http://fr.wikipedia.org/wiki/UUID" target="_blank">UUID</a>…

<p align="center">
  <a href="http://www.mkhelif.fr/wp-content/uploads/2010/10/ColumnFamily.png"><img style="display: inline;" title="ColumnFamily" border="0" alt="ColumnFamily" src="http://www.mkhelif.fr/wp-content/uploads/2010/10/ColumnFamily_thumb.png" width="594" height="215" /></a>
</p>

#### KeySpace

L’espace de clés est l’équivalent d’une base de données pour les systèmes relationnels. Il a un nom et contient l’ensemble des familles de colonnes (l’ensemble des tables pour un système relationnel).

<p align="center">
  <a href="http://www.mkhelif.fr/wp-content/uploads/2010/10/KeySpace.png"><img style="display: inline;" title="KeySpace" border="0" alt="KeySpace" src="http://www.mkhelif.fr/wp-content/uploads/2010/10/KeySpace_thumb.png" width="460" height="258" /></a>&#160;
</p>

### Configuration du serveur

La configuration d’un serveur Cassandra est extrêmement simple, il n’y à qu’un seul fichier de configuration : *conf/storage-conf.xml*

Ce fichier contient à la fois les paramètres du serveur (mémoire, chemins des fichiers…), les paramètres du cluster et la définition des KeySpace.

#### Paramètres du cluster

Cassandra utilise le protocole <a href="http://en.wikipedia.org/wiki/Apache_Thrift" target="_blank">Thrift</a> pour faire communiquer les différents nœuds du cluster entre eux. C’est d’ailleurs ce protocole qui est utilisé par les clients qui se connectent au serveur Cassandra.

La configuration de Thrift est assez simple, vous spécifiez un port d’écoute (*ThriftPort*) et un nom d’hôte (*ThriftAddress*) qui doit être accessible par les différents clients. Au niveau du cluster, il faut définir le nom d’hôte (*ListenAddress*) et le port (*StoragePort*) accessible par les différents nœuds du cluster.

Lors du démarrage du cluster, les nœuds qui le composent doivent se découvrir, pour cela, certains des nœuds doivent être définis comme des racines (*Seeds*). Lors du démarrage d’un nœud, il va s’enregistrer auprès des *Seeds *qui sont configurés et récupérer ainsi la liste des nœuds du cluster.

#### Configuration des KeySpaces

Le principal problème que je trouve à Cassandra c’est que les KeySpaces doivent être définis avant le démarrage du serveur afin que tous les nœuds possèdent le même schéma.

Pour définir les *KeySpaces*, c’est dans le fichier *conf/storage-conf.xml* :

<pre lang="xml">&lt;keyspaces&gt;
    &lt;keyspace name="Keyspace1"&gt;
        &lt;columnfamily name="Standard1" comparewith="BytesType" /&gt;

        &lt;columnfamily name="Standard2" comparewith="UTF8Type" keyscached="100%" /&gt;
        &lt;columnfamily name="StandardByUUID1" comparewith="TimeUUIDType" /&gt;
        &lt;columnfamily name="Super1" comparewith="BytesType" comparesubcolumnswith="BytesType" columntype="Super" /&gt;

        &lt;columnfamily name="Super2" comparewith="UTF8Type" keyscached="50%" comparesubcolumnswith="UTF8Type" columntype="Super" comment="A column family with supercolumns, whose column and subcolumn names are UTF8 strings" rowscached="10000" /&gt;
    &lt;/keyspace&gt;
&lt;/keyspaces&gt;</pre>

La définition est très simple et les paramètres des *ColumnFamily* permettent de gérer le cache de la base de données (*KeysCached* et *RowsCached*) ainsi que le tri des clés (*CompareWith* et *CompareSubcolumnsWith*).

## Conclusion

Pour avoir testé Cassandra, les performances sont impressionnantes par rapport à des bases de données comme MySQL. Par contre, ce type de bases de données n’est pas à utiliser pour tous les types d’applications.

Le seul point noir de Cassandra c’est le protocole Thrift utilisé pour la communication entre le client et le serveur. Heureusement qu’il existe quelques (mais très peu) librairies d’abstraction de cette couche.