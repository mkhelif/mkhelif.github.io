---
title: Serveur de mails multi-domaines
author: mkhelif
layout: post
permalink: /serveur-de-mails-multi-domaines/
tweet_this_url:
  - http://bit.ly/39c8rz
aktt_notify_twitter:
  - yes
categories:
  - Linux
  - MySQL
  - Tutoriel
tags:
  - Linux
  - Sécurité
  - Web
---
Ayant voulu créer un serveur de mail avec des comptes et des domaines virtuels je me suis très vite rendu compte que les différents tutoriels ne fonctionnaient pas dans ma configuration.

J&#8217;ai donc décidé de créer ce billet pour présenter le fonctionnement d&#8217;une telle infrastructure et comment la mettre en place.

<h2 name="infrastructure">
  Infrastructure du serveur
</h2>

Le serveur va se composer de quatre services : l&#8217;agent de livraison (<a href="http://www.postfix.org/" target="_blank">Postfix</a>), le serveur de mails IMAP (<a href="http://www.courier-mta.org/" target="_blank">Courier</a>) et le serveur web (<a href="http://www.apache.org/" target="_blank">Apache</a> + <a href="http://www.php.net/" target="_blank">PHP</a>) et la base de données (<a href="http://www.mysql.com/" target="_blank">MySQL</a>). Pour accéder au mails j&#8217;ai décidé d&#8217;utiliser <a title="RoundCube" href="http://www.roundcube.net/" target="_blank">RoundCube</a> et <a title="PostfixAdmin" href="http://postfixadmin.sourceforge.net/" target="_blank">PostfixAdmin</a> pour administrer les utilisateurs, les alias et les domaines.

<p style="text-align: center">
  <a href="http://www.mkhelif.fr/uploads/2008/06/infrastructure.png"><img class="alignnone size-full wp-image-61" title="infrastructure" src="http://www.mkhelif.fr/uploads/2008/06/infrastructure.png" alt="Infrastructure serveur de mails multi-domaines" width="500" height="330" /></a>
</p>

<h2 name="creation_comptes">
  Création du compte virtuel
</h2>

On va d&#8217;abord créer un utilisateur sur le serveur qui stockera les mails des utilisateurs :

<pre lang="sh">addgroup --gid 20001 virtual
adduser --uid 20001 --gid 20001 virtual</pre>

<h2 name="installation_services">
  Installation des services
</h2>

On va commencer par le plus simple : Apache et MySQL. On va tout simplement les récupérer dans les dépots :

<pre lang="sh">apt-get install apache2 mysql-server-5.0 php5 php5-mysql php5-gd</pre>

Je n&#8217;aborderai pas ici la configuration d&#8217;Apache ni de PHP (penser juste à activer l&#8217;extension pour MySQL si ce n&#8217;est pas fait).

<h3 name="database">
  Base de données
</h3>

Il faut créer la base de données que vont utiliser les autres services pour identifier les utilisateurs. Il suffit d&#8217;exécuter le script SQL suivant : [PostfixMySQL.sql][1]. Penser à modifier l&#8217;identifiant et le mot de passe pour le compte (ici : postfix / postfix).

<pre lang="sql">mysql
...
mysql>CREATE DATABASE postfix;
mysql>GRANT ALL PRIVILEGES ON postfix.* TO 'postfix'@'localhost' IDENTIFIED BY 'postfix';
mysql>. PostfixMySQL.sql</pre>

On ajoute l&#8217;administrateur de PostfixAdmin directement dans la base de données :

<pre lang="sql">mysql>INSERT INTO domain (domain, description)
      VALUES ('mkhelif.fr', 'Domaine personnel');
Query OK, 1 row affected (0.00 sec)

mysql>INSERT INTO admin (username, password, active)
      VALUES ('postmaster@mkhelif.fr', '$1$CeeAzXb...J8njWAw1', '1');
Query OK, 1 row affected (0.00 sec)

mysql>INSERT INTO domain_admins (username, domain, active)
      VALUES ('postmaster@mkhelif.fr', 'ALL', '1');
Query OK, 1 row affected (0.00 sec)

mysql>INSERT INTO mailbox (username, password, name, maildir, domain, active)
      VALUES ('postmaster@mkhelif.fr', '$1$ExhxBRG6$...qhF/unIwe0Kk1',
              'Marwan KHELIF', 'postaster@mkhelif.fr/', 'mkhelif.fr', '1');
Query OK, 1 row affected (0.00 sec)</pre>

<p style="padding-left: 30px">
  <strong>Note</strong> : le mot de passe est hashé en MD5 avec du sel. Voici un script PHP pour encoder votre mot de passe :
</p>

<pre lang="php"><?php
    echo crypt ('password');
?>
</pre>

On vérifie que l&#8217;utilisateur que l&#8217;on vient de créer a bien accès à la base de données :

<pre lang="sql">mysql postfix -u postfix -p
Enter password: postfix
...
mysql></pre>

Voilà la base de données est prête à être utilisée par les différents services.

<h3 name="postfix">
  Postfix
</h3>

On commence par installer Postfix et le module de connexion à la base de données. Attention lors de l&#8217;installation si Exim4 est installé il sera supprimé et remplacé par Postfix.

<pre lang="sh">apt-get install postfix postfix-mysql</pre>

<p style="padding-left: 30px">
  Note : pendant l&#8217;installation sélectionner <em>Site Internet</em>.
</p>

Une fois installé il faut modifier le fichier suivant : **/etc/postfix/main.cf**. Rajouter les propriétés suivantes à la fin du fichier :

<pre lang="properties">virtual_transport = maildrop
virtual_mailbox_base = /home/virtual
virtual_alias_maps = proxy:mysql:/etc/postfix/mysql_virtual_alias_maps.cf
virtual_mailbox_domains = proxy:mysql:/etc/postfix/mysql_virtual_domains_maps.cf
virtual_mailbox_maps = proxy:mysql:/etc/postfix/mysql_virtual_mailbox_maps.cf
virtual_minimum_uid = 20001
virtual_uid_maps = static:20001
virtual_gid_maps = static:20001</pre>

On crée alors les fichiers de mapping avec la base de données :

<pre lang="text">Fichier : /etc/postfix/mysql_virtual_alias_maps.cf
user = postfix
password = postfix
hosts = localhost
dbname = postfix
query = SELECT goto FROM alias WHERE address = '%s' and active = '1'</pre>

<pre lang="text">Fichier : /etc/postfix/mysql_virtual_domains_maps.cf
user = postfix
password = postfix
hosts = localhost
dbname = postfix
query = SELECT domain FROM domain WHERE domain = '%s' and active = '1'</pre>

<pre lang="text">Fichier : /etc/postfix/mysql_virtual_mailbox_maps.cf
user = postfix
password = postfix
hosts = localhost
dbname = postfix
query = SELECT maildir FROM mailbox WHERE username = '%s' and active = '1'</pre>

Modifier le fichier /etc/postfix/master.cf afin de modifier la livraison par maildrop :

<pre lang="text">Remplacer la ligne :
maildrop  unix  -       n       n       -       -       pipe
  flags=DRhu user=vmail argv=/usr/bin/maildrop -d ${recipient}

par :
maildrop  unix  -       n       n       -       -       pipe
   flags=DRhu user=virtual argv=/usr/bin/maildrop -w 90 -d ${user}@${nexthop}
   ${extension} ${recipient} ${user} ${nexthop} ${sender}</pre>

On redémarre alors le service :

<pre lang="sh">/etc/init.d/postfix restart</pre>

<h3 name="maildrop">
  Maildrop
</h3>

On va alors installer le livreur de mails : maildrop.

<pre lang="sh">apt-get install maildrop</pre>

On créer le fichier */home/virtual/.mailfilter* de livraison, si vous souhaitez spécifier certaines règles de livraisons (mailinglists, spams, &#8230;) vous devez modifier ce fichier ou en créer un dans les dossiers de vos utilisateurs :

<pre lang="text">Fichier : /home/virtual/.mailfilter
logfile "/home/virtual/.maildrop.log"
`[ -d $DEFAULT ] || (maildirmake $DEFAULT &#038;&#038; maildirmake -f Spam $DEFAULT &#038;&#038; maildirmake -f sent-mail $DEFAULT &#038;&#038; maildirmake -f SpamToLearn $DEFAULT &#038;&#038;
maildirmake -f SpamFalse $DEFAULT)`

`test -r $HOME/$DEFAULT.mailfilter`
if( $RETURNCODE == 0 )
{
    log "(==)  Including $HOME/$DEFAULT.mailfilter"
    exception {
        include $HOME/$DEFAULT.mailfilter
    }
}</pre>

Une fois ce fichier créé il faut modifier les droits à ce fichier :

<pre lang="sh">chmod 600 .mailfilter</pre>

<h3 name="courier">
  Courier
</h3>

On installe de la même façon Courier et le module de connexion à la base de données :

<pre lang="sh">apt-get install courier-imap courier-authlib-mysql</pre>

<p style="padding-left: 30px">
  <strong>Note</strong> : pendant l&#8217;installation choisissez <em>NON </em>lorsqu&#8217;il vous propose de créer les répertoires Web.
</p>

Modifier les paramètres dans les fichiers suivants :

<pre lang="properties">Fichier : /etc/courier/authdaemonrc
authmodulelist="authmysql"

Fichier : /etc/courier/authmysqlrc
MYSQL_SERVER	localhost
MYSQL_USERNAME	postfix
MYSQL_PASSWORD	postfix
MYSQL_SOCKET	/var/run/mysqld/mysqld.sock
MYSQL_PORT	3306
MYSQL_OPT	0

MYSQL_DATABASE	postfix
MYSQL_USER_TABLE	mailbox
MYSQL_CRYPT_FIELD	password
MYSQL_LOGIN_FIELD	username
MYSQL_HOME_FIELD	'/home/virtual'
MYSQL_UID_FIELD		'20001'
MYSQL_GID_FIELD		'20001'
MYSQL_NAME_FIELD	name
MYSQL_MAILDIR_FIELD	maildir
MYSQL_WHERE_CLAUSE	active='1'</pre>

<p style="padding-left: 30px;">
  <strong>Note</strong> : vérifier qu&#8217;il n&#8217;y ai que des tabulations entre le nom et la valeur d&#8217;une propriété.
</p>

Il faut donner les accès à l&#8217;utilisateur virtual :

<pre lang="sh">chown virtual /usr/lib/courier/authdaemon
chmod 750 /usr/lib/courier/authdaemon</pre>

On redémarre alors les services IMAP et AuthDaemon de Courier :

<pre lang="sh">/etc/init.d/courier-imap restart
/etc/init.d/courier-authdaemon restart</pre>

Pour vérifier que le serveur IMAP arrive bien à se connecter à la base de données on exécute un test d&#8217;authentification :

<pre lang="sh">authtest postmaster@mkhelif.fr
Authentication succeeded.

     Authenticated: postmaster@mkhelif.fr  (uid 20001, gid 20001)
    Home Directory: /home/virtual
           Maildir: postmaster@mkhelif.fr/
             Quota: 0S
Encrypted Password: $1$CeeAzXb...J8njWAw1
Cleartext Password: (none)
           Options: (none)</pre>

Maintenant tous les services sont configurés et communiquent entre eux, on peut configurer les accès Web.

<h3 name="postfixadmin_roundcube">
  PostfixAdmin et Roundcube
</h3>

Tout d&#8217;abord on récupère les archives (récupérer les dernières versions depuis <a title="RoundCube" href="http://www.roundcube.net/" target="_blank">RoundCube</a> et <a title="PostfixAdmin" href="http://postfixadmin.sourceforge.net/" target="_blank">PostfixAdmin</a>) :

<pre lang="sh">wget http://garr.dl.sourceforge.net/sourceforge/roundcubemail/roundcubemail-0.1.1.tar.gz
wget http://dfn.dl.sourceforge.net/sourceforge/postfixadmin/postfixadmin_2.2.0.tar.gz</pre>

On extrait alors les sources :

<pre lang="sh">tar -xzf roundcubemail-0.1.1.tar.gz
tar -xzf postfixadmin_2.2.0.tar.gz</pre>

<h4 name="postfixadmin_configuration">
  Configuration de PostfixAdmin
</h4>

Pour configurer PostfixAdmin il faut modifier les paramètres suivants du fichier **config.inc.php** et supprimer le fichier **setup.php** :

<pre lang="php">$CONF['configured'] = true;
$CONF['postfix_admin_url'] = 'http://www.mkhelif.fr/';
$CONF['create_default_folders'] = true;
$CONF['database_type'] = 'mysqli';
$CONF['database_host'] = 'localhost';
$CONF['database_user'] = 'postfix';
$CONF['database_password'] = 'postfix';
$CONF['database_name'] = 'postfix';</pre>

Vous pouvez modifier les autres propriétés selon vos besoins.

<h4 name="roundcube_configuration">
  Configuration de RoundCube
</h4>

On va tout d&#8217;abord créer la base de données que va utiliser RoundCube :

<pre lang="sql">mysql
...
mysql>CREATE DATABASE roundcube;
Query OK, 1 row affected (0.00 sec)

mysql>GRANT ALL PRIVILEGES ON roundcube.* TO 'roundcube'@'localhost' IDENTIFIED BY 'roundcube';
Query OK, 1 row affected (0.00 sec)</pre>

Pour configurer RoundCube il faut déplacer les fichiers :

<pre lang="sh">mv ./config/db.inc.php.dist ./config/db.inc.php
mv ./config/main.inc.php.dist ./config/main.inc.php</pre>

Et modifier les paramètres :

<pre lang="php">Fichier : config/db.inc.php
$rcmail_config['db_dsnw'] = 'mysqli://roundcube:roundcube@localhost/roundcube';

Fichier : config/main.inc.php
$rcmail_config['default_host'] = 'localhost';</pre>

## Problèmes rencontrés

> La commande *authtest* échoue

Cela signifie généralement que le serveur IMAP n&#8217;arrive pas à accéder à la base de données. Vérifier tous les paramètres du fichier **/etc/courier/authmysqlrc** et que le nom et la valeur des propriétés soient bien séparés par des tabulations et pas des espaces.

Pour activer les logs au niveau de Courier il faut modifier le fichier **/etc/courier/authdaemonrc** et positionner le paramètre *DEBUG_LOGIN* à 1.

> J&#8217;obtiens l&#8217;erreur suivante : *imapd: authentication error: Input/output error*

J&#8217;avais rencontré ce problème car IMAP n&#8217;arrivai pas à se connecter à la base de données (mauvais mot de passe). Il faut vérifier le fichier **/etc/courier/authmysqlrc**.

> RoundCube n&#8217;authentifie pas les utilisateurs

J&#8217;ai rencontré ce problème dans le cas où Apache n&#8217;a pas accès pour créer les répertoire par défaut d&#8217;un utilisateur (*Inbox*, *Sent*, *Trash*, *Spam*, *Drafts*), vérifier bien que le dossier existe et que le propriétaire est bien *virtual*. Sinon créer les répertoires grâce à la commande : *maildirmake * en vérifiant les droits : *755*.*  
*

## Conclusion

Voilà votre serveur de mails multi-domaines est prêt. Vous pouvez ajouter d&#8217;autres services : antispam (<a title="SpamAssassin" href="http://spamassassin.apache.org/" target="_blank">SpamAssassin</a>), antivirus (<a title="ClamAV" href="http://www.clamav.net/" target="_blank">ClamAV</a>), gestion de quotas, &#8230;Mais je n&#8217;aborderai pas ces points là dans ce tutoriel.

 [1]: http://www.mkhelif.fr/uploads/2008/06/postfixmysql.sql
