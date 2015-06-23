---
title: Authentification SSH par clé privée/clé publique
author: mkhelif
layout: post
permalink: /authentification-ssh-par-cl-privecl-publique/
tweet_this_url:
  - http://bit.ly/PQu6Z
categories:
  - Cryptographie
  - Linux
  - Sécurité
  - Tutoriel
tags:
  - Linux
  - Sécurité
---
En voyant l&#8217;intérêt que les visiteurs de mon blog porte à l&#8217;installation d&#8217;un serveur de mail multi-domaines, j&#8217;ai décidé d&#8217;écrire un autre tutoriel sur la configuration d&#8217;un serveur SSH pour utiliser une connexion par clé publique/clé privée.

<!--more-->

**Fonctionnement**

L&#8217;objectif d&#8217;une authentification par clés est de supprimer l&#8217;envoi de mots de passe par le réseau. Pour cela il faut deux clés : une clé privée (seul l&#8217;utilisateur doit pouvoir y avoir accès) et une clé publique (doit être déployée sur toutes les machines où l&#8217;on souhaite se connecter).

La clé publique peut crypter les données et seule la clé privée peut les décrypter. Dans l&#8217;autre sens la clé privée **signe** les messages, la clé publique permet alors de s&#8217;assurer que le message vient bien du bon utilisateur. C&#8217;est le cryptage asymétrique.

Pour SSH, c&#8217;est exactement la même chose. Le serveur envoi un *challenge* au client : message crypté à partir de la clé publique. La connexion ne sera acceptée uniquement si le client répond correctement à ce message (c&#8217;est à dire qu&#8217;il a réussi à décrypter le message).

### Configuration du serveur SSH

Par défaut le serveur SSH n&#8217;accepte pas les connections par clés mais uniquement par mot de passe. On va donc activer cette méthode d&#8217;authentification :

> <span style="color: #333333;">Dans le fichier : <em>/etc/ssh/sshd_config</em></span>
> 
> <pre>RSAAuthentication    yes
PubkeyAuthentication yes
AuthorizedKeysFile   %h/.ssh/authorized_keys</pre>

Pour des questions de sécurité vous pouvez désactiver la connexion avec le login **root** :

> <pre>PermitRootLogin no</pre>

Il suffit de redémarrer le serveur SSH : */etc/init.d/ssh restart*

Si vous souhaitez refuser l&#8217;authentification par mot de passe (pour éviter les attaques bruteforce et ainsi que les logs se remplissent pour rien) il faut positionner l&#8217;option suivante :

> <pre>PasswordAuthentication no</pre>

### Création des clés

Il y a deux manières pour créer les clés :

  1. Sur un poste Linux : 
      1. Lancer la commande suivante : *ssh-keygen -t rsa*
      2. *Laisser les noms par défaut et entrer le mot de passe pour la clé privée.*
  2. Sur un poste Windows : 
      1. Utiliser <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html" target="_blank">PuttyGen</a> pour générer les clés.

Ensuite il faut copier la clé publique *id_rsa.pub* sur le serveur auquel on souhaite se connecter et conserver la clé privée sur le poste client.

Dans le répertoire de l&#8217;utilisateur on crée un répertoire *.ssh *(répertoire par défaut où le serveur SSH va chercher les clés publiques) et on renomme le fichier en *authorized_keys*.

Ensuite il faut **absolument** que ce fichier ai les droits suivants : *chmod 600 authorized_keys.*

À partir de ce moment toutes les personnes ayant la clé privée et le mot de passe ayant servi à la générer peuvent se connecter au serveur.

### Première connexion

Afin de se connecter avec <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html" target="_blank">Putty</a> vous devez spécifier la clé privée : *Connection / SSH / Auth*.

Si vous avez créé votre paire de clés grâce à *ssh-keygen*, vous devez convertir votre clé privée au format Putty. Pour cela vous devez utiliser <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html" target="_blank">PuttyGen</a> : menu *Conversions / Import key*, entrer alors le mot de passe de la clé, puis **Save private key**.

Lors de chaque connexion Putty vous demande le mot de passe de la clé, quel intérêt alors de se connecter en utilisant une paire de clé si on doit rentrer à chaque fois le mot de passe de la clé privée. C&#8217;est là qu&#8217;intervient <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html" target="_blank">Pageant</a>, c&#8217;est un outils de la suite Putty qui permet de stocker pour une clé privée son mot de passe. L&#8217;utilisation de ce programme est extrêmement simple, je n&#8217;en parlerai donc pas ici. Pour Linux il suffit d&#8217;installer ssh-agent qui joue exactement le même rôle.
