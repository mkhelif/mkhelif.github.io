---
title: Validation XML
author: mkhelif
layout: post
permalink: /validation-xml/
tweet_this_url:
  - http://bit.ly/6WG0B
categories:
  - XML
tags:
  - XML
---
Lors de l&#8217;utilisation du langage XML on voudrait que tous les documents que l&#8217;on va parser soit valide, c&#8217;est à dire qu&#8217;ils correspondent à un certain format. Cependant si l&#8217;utilisateur a accés à ces documents XML il faut pouvoir vérifier que le document est valide.  
On peut réaliser cette vérification pendant le parsing mais cela ajoute une tâche au développeur.

C&#8217;est pour cela qu&#8217;il existe des langages de validations, ils permettent de valider le format des documents XML selon un format qui est défini par le dévéloppeur.

La plupart des parseurs vérifient le format et renvoient une erreur si le format n&#8217;est pas respecté.

<!--more-->

## Les langages de validations

Il existe plusieurs langages de validations, mais je ne vais vous présenter que les deux les plus utilisés.

Les différents langages :

  * DTD (**D**ocument **T**ype **D**efinition) : définition du type de document. Ce langage peut être inclu directement dans le document XML.
  * XML Schema : il permet de définir la structure d&#8217;un document avec plus de précision (type de donnée, nombre d&#8217;occurence, &#8230;).
  * Relax NG (**RE**gular **LA**nguage for **X**ML **N**ext **G**eneration) : ce langage ne spécifie que la structure du document, le type de donnée est sous-traitée à la bibliothèque de types de XML Schema.
  * Schematron : contrairement aux autres langages Schematron définie un modèle d&#8217;arbre du document XML, il utilise la même conception que XPath ou XSLT.

## Doctype

Une DTD est une grammaire permettant de vérifier la validité d&#8217;un document.  
Un document XML peut avoir une DTD incluse dans son entête ou bien indiquée le fichier où elle se situe.

Une DTD définit trois objets permettant de définir la grammaire :

  * ELEMENT : représente un élément XML et permet de définir les sous-éléments ansi que leurs occurences.
  * ATTLIST : liste des attributs d&#8217;un élément.
  * ENTITY : permet de définir un &#8216;alias&#8217;.

Une DTD est définie de la façon suivante :

<pre>&lt;!DOCTYPE element-racine [
  &lt;!ELEMENT ...&gt;
  &lt;!ATTLIST ...&gt;
  &lt;!ENTITY ...&gt;
]&gt;</pre>

Voici un site permettant de valider un fichier XML avec sa DTD : <a href="http://www.stg.brown.edu/service/xmlvalid/" title="Validateur XML" target="_blank">http://www.stg.brown.edu/service/xmlvalid/</a>.

### Élément

Permet de définir un élément XML en spécifiant le nom les sous-éléments de ce dernier.  
La déclaration d&#8217;un ENTITY doit avoir la syntaxe suivante :

<pre>&lt;!ELEMENT nom (Donnees)&gt;</pre>

La définition des **Donnees** peut avoir les valeurs suivantes :

  * **(#PCDATA)** : l&#8217;élément contient des données de types textes mais ne peut pas contenir de sous-éléments.
  * **(Element1, Element2, &#8230;)** : liste des sous-éléments que contient l&#8217;élément.
  * **(Element1 | Element2 | &#8230;)** : liste des sous-éléments qui peuvent être contenus par cet élément.
  * **ANY** : cet élément peut contenir n&#8217;importe quel type de données.
  * **EMPTY** : cet élément doit être vide et ne peux contenir aucune donnée (texte ou éléments).

Dans la définition des sous-éléments on peut spécifier l&#8217;occurence de l&#8217;élément :

  * **Element1?** : l&#8217;élément peut apparaître 0 ou 1 fois.
  * **Element1+** : l&#8217;élément peut apparaître 1 ou plusieurs fois.
  * **Element1*** : l&#8217;élément peut apparaître 0, 1 ou plusieurs fois.

On peut spécifier le nombre de sous-élément en répétant l&#8217;élément enfant :

<pre>&lt;!ELEMENT element1 (element2, element2)&gt;</pre>

Ici l&#8217; &#8220;élément1&#8243; devra forcément contenir 2 éléments &#8220;element2&#8243;.

Voici un exemple de DTD d&#8217;une liste de contacts :

<pre>&lt;?xml version="1.0" encoding="UTF-8" standalone="yes" ?&gt;
&lt;!DOCTYPE contacts [
  &lt;!ELEMENT contacts (contact*)&gt;
  &lt;!ELEMENT contact (nom, adresse, mail)&gt;
  &lt;!ELEMENT nom (#PCDATA)&gt;
  &lt;!ELEMENT adresse (#PCDATA)&gt;
  &lt;!ELEMENT mail (#PCDATA)&gt;
]&gt;</pre>

<pre>&lt;contacts&gt;
  &lt;contact&gt;
    &lt;nom&gt;Marwan KHELIF&lt;/nom&gt;
      &lt;adresse&gt;...&lt;/adresse&gt;
      &lt;mail&gt;mkhelif@gmail.com&lt;/mail&gt;
    &lt;/contact&gt;
  &lt;contact&gt;
      &lt;nom&gt;My Name&lt;/nom&gt;
      &lt;adresse&gt;My address&lt;/adresse&gt;
      &lt;mail&gt;my.mail@mail.com&lt;/mail&gt;
    &lt;/contact&gt;
  &lt;/contacts&gt;
&lt;/code&gt;</pre>

### Attlist

La déclaration ATTLIST permet de définir les attributs d&#8217;un élément. On peut spécifier le type de donnée, la valeur par défaut, forcer la présence de l&#8217;élément, &#8230;

La déclaration se fait ainsi :

<pre>&lt;!ATTLIST nomElement nomAttribut Type ValeurDefaut&gt;</pre>

Le nom de l&#8217;élément doit correspondre au nom d&#8217;un élément déclaré dans la DTD.

Le type de l&#8217;attribut peut prendre les valeurs suivantes :

  * **CDATA** : l&#8217;attribut contient des données textuelles.
  * **ID** : chaqu&#8217;un des éléments définis doit avoir une valeur différente pour cet attribut.
  * **IDREF **: référence la valeur d&#8217;un attribut **ID** d&#8217;un autre élémént.
  * **IDREFS **: liste d&#8217;attributs **ID**, ses valeurs sont séparées par un espace.
  * **ENTITY **: correspond à une ENTITY déclarée dans la DTD.
  * **ENTITIES **: listes d&#8217;ENTITY déclarées dans la DTD, chaque ENTITY doit être séparées par un espace.
  * **NMTOKEN **: la valeur doit être un nom XML valide.
  * **NMTOKENS **: liste de noms XML valides.
  * **NOTATION** : nom d&#8217;une notation définie dans la DTD.

La valeur par défaut de l&#8217;attribut peut prendre les valeurs suivantes :

  * ***valeur*** : valeur par défaut de l&#8217;attribut.
  * **#REQUIRED** : l&#8217;élément doit forcément posséder cet attribut.
  * **#IMPLIED** : cet attribut n&#8217;est pas obligatoire.
  * **#FIXED *valeur*** : l&#8217;attribut doit forcément avoir la valeur *valeur*.

Voilà un exemple de DTD définissant des attributs :

<pre>&lt;?xml version="1.0" encoding="UTF-8" standalone="yes" ?&gt;
 &lt;!DOCTYPE personnes [
  &lt;!ELEMENT personnes (personne*)&gt;
  &lt;!ELEMENT personne (adresse, mail)&gt;
  &lt;!ATTLIST personne
       id ID #REQUIRED
       nom CDATA #REQUIRED
       sexe (homme | femme) "homme"&gt;</pre>

<pre>&lt;!ELEMENT adresse (#PCDATA)&gt;
  &lt;!ATTLIST adresse
       code CDATA #REQUIRED&gt;</pre>

<pre>&lt;!ELEMENT mail (#PCDATA)&gt; ]&gt;</pre>

<pre>&lt;personnes&gt;
  &lt;personne id="user0" nom="Marwan KHELIF"&gt;
    &lt;adresse code="13"&gt;...&lt;/adresse&gt;
    &lt;mail&gt;mkhelif@gmail.com&lt;/mail&gt;
  &lt;/personne&gt;
  &lt;personne id="user1" nom="MyName" sexe="femme"&gt;
    &lt;adresse code="01"&gt;...&lt;/adresse&gt;
    &lt;mail&gt;monMail@mail.com&lt;/mail&gt;
  &lt;/personne&gt;
&lt;/personnes&gt;</pre>

### Entity

La déclaration d&#8217;une ENTITY permet de créer un &#8216;alias&#8217;, elle est ensuite utilisable dans le document XML.

On la déclare de la façon suivante :

<pre>&lt;!ENTITY nomEntity "valeur"&gt;</pre>

On peut alors l&#8217;utiliser dans le document XML : *&nomEntity;*, la valeur définie sera alors positionnée à la place de cet entité.

Par exemple :

<pre>&lt;?xml version="1.0" encoding="UTF-8" standalone="yes" ?&gt;</pre>

<pre>&lt;!DOCTYPE articles [   &lt;!ENTITY auteur "Marwan KHELIF"&gt;
  &lt;!ENTITY dtd "Document Type Definition"&gt;
  &lt;!ENTITY xsd "XML Schema"&gt;</pre>

<pre>&lt;!ELEMENT articles (article*)&gt;</pre>

<pre>&lt;!ELEMENT article (#PCDATA)&gt;
  &lt;!ATTLIST article
       titre CDATA #REQUIRED
       auteur CDATA "&auteur;"
       date CDATA #REQUIRED&gt;
]&gt;</pre>

<pre>&lt;articles&gt;
  &lt;article titre="&dtd;" date="17/07/07"&gt;Presentation de &dtd; par &auteur;.&lt;/article&gt;
  &lt;article titre="&xsd;" date="17/07/07"&gt;Presentation de &xsd; par &auteur;.&lt;/article&gt;
&lt;/articles&gt;</pre>

Ce sont les entités générales du document, il y a un autre type d&#8217;entités : les entités paramètes.  
Elles sont définies de la même manière sauf qu&#8217;il faut rajouter un &#8216;*%*&#8216; devant le nom :

<pre>&lt;!ENTITY % nomEntity "valeur"&gt;</pre>

On les utilise de la façon suivante : *%nomEntity;*.  
Voilà un exemple de leur utilisation :

<pre>&lt;?xml version="1.0" encoding="UTF-8" standalone="yes" ?&gt;
&lt;!DOCTYPE articles [
  &lt;!ENTITY % article "titre, auteur, date, contenu"&gt;</pre>

<pre>&lt;!ENTITY auteur "Marwan KHELIF"&gt;
  &lt;!ENTITY dtd "Document Type Definition"&gt;
  &lt;!ENTITY xsd "XML Schema"&gt;</pre>

<pre>&lt;!ELEMENT articles (article*)&gt;
  &lt;!ELEMENT article (%article;)&gt;
  &lt;!ELEMENT titre (#PCDATA)&gt;
  &lt;!ELEMENT auteur (#PCDATA)&gt;
  &lt;!ELEMENT date (#PCDATA)&gt;
  &lt;!ELEMENT contenu (#PCDATA)&gt;
]&gt;</pre>

<pre>&lt;articles&gt;
  &lt;article&gt;
    &lt;titre&gt;&dtd;&lt;/titre&gt;
    &lt;auteur&gt;&auteur;&lt;/auteur&gt;
    &lt;date&gt;17/07/07&lt;/date&gt;
    &lt;contenu&gt;Presentation de &dtd; par &auteur;.&lt;/contenu&gt;
  &lt;/article&gt;
  &lt;article&gt;
    &lt;titre&gt;&xsd;&lt;/titre&gt;
    &lt;auteur&gt;&auteur;&lt;/auteur&gt;
    &lt;date&gt;17/07/07&lt;/date&gt;
    &lt;contenu&gt;Presentation de &xsd; par &auteur;.&lt;/contenu&gt;
  &lt;/article&gt;
&lt;/articles&gt;</pre>

Ces deux types d&#8217;entités sont internes au document XML, on peut indiquer que la cible de l&#8217;entité est un fichier externe au document :

<pre>&lt;!ENTITY doc SYSTEM "http//www.mkhelif.fr/doc.xml"&gt;
&doc;
&lt;!ENTITY % articles SYSTEM "articles.dtd"&gt;
%articles;</pre>

Lors de l&#8217;utilisation de l&#8217;entité le contenu du fichier sera chargé et remplacera l&#8217;entité.
