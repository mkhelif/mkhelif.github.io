---
title: 'Java : Utilisation de Protocol Buffers'
author: mkhelif
layout: post
permalink: /java-utilisation-de-protocol-buffers/
tweet_this_url:
  - http://bit.ly/2YSXwk
  - http://bit.ly/2YSXwk
categories:
  - Actualités
  - Google
  - Java
  - XML
tags:
  - Google
  - Java
---
Voici un petit tutoriel sur l&#8217;utilisation du [nouveau format de Google : Protocol Buffers][1] en Java. Ce format se veut être le remplaçant de XML, standard actuel pour le stockage et l&#8217;échange de données au format texte.  
<!--more-->

  
Dans cet exemple nous allons créer un gestionnaire de contact. Ce billet est une traduction de la documentation de Google : [Protocol Buffers Basics][2].

### Fichier de définition

Tout d&#8217;abord le fichier de définition *.proto* permettant de définir le format des données.

<pre lang="java">package fr.mkhelif.pb;

option java_package = "fr.mkhelif.pb.demo";
option java_outer_classname = "AddressBook";

message Contact {
  required string name = 1;
  required int32 id = 2;
  optional string email = 3;

  enum PhoneType {
    MOBILE = 0;
    HOME = 1;
    WORK = 2;
  }

  message PhoneNumber {
    required string number = 1;
    optional PhoneType type = 2 [default = HOME];
  }

  repeated PhoneNumber phone = 4;
}

message AddressBook {
  repeated Contact contact = 1;
}</pre>

La déclaration d&#8217;un **package** permet comme en Java d&#8217;éviter les conflits de nom. Si vous déclarez un **package** (comme dans cet exemple) le package de la classe Java sera le même. Ici on surcharge le package java avec l&#8217;option **java_package**. On définie le nom de la classe Java grâce à l&#8217;option **java\_outer\_classname**. Si vous ne définissez pas de nom de classe le compileur utilisera le nom du fichier : **adressbook.proto** donnera **AdressBook**. Ensuite on définie un bean, appelé ici **message**, Personne avec des attributs **name**, **id**, **email** et **phone**. Comme dans les langages objets, un **message** (bean) est défini par des attributs. Ici une personne possède un nom (**name**), un identifiant (**id**), une adresse email et plusieurs numéros de téléphone (**phone**). Un attribut est soit un autre **message** soit un type simple : *string*, *int32*, *boolean*, *float* ou *double*. Vous pouvez aussi définir des énumérations permettant ainsi de limiter le nombre d&#8217;élément possibles (dans l&#8217;exemple précédent un numéro de téléphone possède un type qui ne peut être que : MOBILE, HOME ou WORK. Chaque champs doit être annoté d&#8217;un des modifieurs suivants :

  1. *required* : le champs est obligatoire. Si il n&#8217;est pas initialisé l&#8217;objet est marqué comme *uninitialized*. Lors de la sérialisation d&#8217;un objet *uninitialized* une **RuntimeException** est levée. Lors de la déserialisation une **IOException** est levée.
  2. *optional* : le champs est optionnel et peut ne pas être initialisé. Un message avec un champs *optional* non initialisé utilisera une valeur par défaut : ** pour les types numériques, *false* pour les *boolean*, une chaîne vide pour les *string* et pour les messages une instance par défaut avec tous les champs avec des valeurs par défaut. Vous pouvez spécifier une valeur par défaut pour un champs : [default = *<value>*] comme pour le type de numéro de téléphone.
  3. *repeated* : le champs peut être répétés 0 ou plusieurs fois. L&#8217;ordre des valeurs est respecté lors de la (dé)sérialisation. Un champs répété agit comme un tableau dynamique.

Les marqueurs &#8220;=1&#8243;, &#8220;=2&#8243;, &#8230;permettent d&#8217;identifier le tag unique utilisé par ce champs lors de la sérialisation. Les marqueurs de 1 à 15 sont encodés sur un octet de moins que les marqueurs supérieurs à 16. Ainsi les marqueurs de 1 à 15 peuvent être utilisés par les champs souvent utilisés ou par les champs *repeated*.

### Compilation de votre ProtocolBuffers

Pour compiler le fichier **.proto** en classes il suffit d&#8217;utiliser <a href="http://code.google.com/p/protobuf/downloads/list" target="_blank">le compilateur de ProtocolBuffers</a> : *protoc*.

En exécutant la commande suivante le compilateur va générer une classe AddressBookProtos.java avec des classes internes :

protoc AddressBook.proto &#8211;java_out=<destination>

Dans le répertoire *<destination>* il va y avoir l&#8217;arborescense : *<destination>*/fr/mkhelif/pb/AddressBookProtos.java

### Utilisation des classes

##### Création d&#8217;un objet

Pour créer un object **Contact** il faut utiliser la classe : Contact.Builder qui permet d&#8217;instancier un objet valide.

<pre lang="java">Contact.Builder contact = Contact.newBuilder ();
contact.setName ("Marwan KHELIF");
contact.setEmail ("contact@mkhelif.fr");

Contact.PhoneNumber phone = Contact.PhoneNumber.newBuilder ();
phone.setNumber ("0123456789");
phone.setType (Contact.PhoneType.HOME);

contact.addPhone (phone);
contact.build ();</pre>

L&#8217;utilisation de ProtocolBuffers permet de chaîner les appels de méthodes, ainsi l&#8217;exemple précédent peut être écris :

<pre lang="java">Contact.Builder contact = Contact.newBuilder ();
contact.setName ("Marwan KHELIF")
    .setEmail ("contact@mkhelif.fr")
    .addPhone (Contact.PhoneNumber.newBuilder ()
        .setNumber ("0123456789")
        .setType (Contact.PhoneType.HOME).build ())
    .build ();</pre>

##### Sérialisation des objets

Afin de sérialiser un objet il y à deux méthodes :

  1. Récupérer directement un tableau d&#8217;octets : *toByteArray ()*.
  2. Sérialiser directement dans un flux : *writeTo (OutputStream)*.

De même pour la déserialisation :

  1. Depuis un tableau d&#8217;octets : *parseFrom (byte[])*.
  2. Depuis un flux : *parseFrom (InputStream)*.

##### Amélioration

Par défaut le compilateur de ProtocolBuffers génère des fichiers le plus petits possible. Si dans votre applications vous avez des problèmes de performances dues aux classes générées, vous pouvez ajouter l&#8217;option :

<pre lang="java">option optimize_for = SPEED;</pre>

Cette option permet de compiler des fichiers plus gros mais à l&#8217;exécution le code sera optimizé pour votre ProtocolBuffer.

### Conclusion

Ce nouveau format est très prometteur car la définition des fichiers **proto** est beaucoup plus orientée objet que XML. Cependant il reste encore des points à améliorer.

 [1]: http://www.mkhelif.fr/2008/07/10/google-lance-protocol-buffers.html
 [2]: http://code.google.com/apis/protocolbuffers/docs/javatutorial.html
