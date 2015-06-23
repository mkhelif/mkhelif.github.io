---
title: 'GWT : Créer un service RPC'
author: mkhelif
layout: post
permalink: /gwt-crer-un-service-rpc/
tweet_this_url:
  - http://bit.ly/IdzNk
categories:
  - Google
  - GWT
  - Java
  - RIA
  - Tutoriel
tags:
  - GWT
  - Java
  - RIA
---
Le framework GWT permet depuis le client JavaScript de faire des appels RPC (Remote Procedure Call ou appels de procédures distantes) au serveur GWT.

L&#8217;objectif est de permettre au JavaScript client d&#8217;exécuter des méthodes sur le serveur et d&#8217;en récupérer le résultat. Tout cela de façon totalement asynchrone (**A**jax). Les échanges entre le client et le serveur sont faites de façon asynchrone car la plupart des navigateurs n&#8217;accordent qu&#8217;un seul Thread pour exécuter le JavaScript.

<!--more-->

### Infrastructure RPC

Pour permettre à JavaScript de faire des appels RPC il faut écrire le service côté serveur et la vue qu&#8217;en a le client. Le code d&#8217;un service RPC est séparé en deux packages : *fr.mkhelif.gwt.client* et *fr.mkhelif.gwt.server*.

Dans ce tutoriel nous allons créer un service **Hello** qui va tout simplement dire bonjour.

##### Package client

Le package client doit contenir les interfaces décrivant les méthodes du service.

<pre lang="java">/**
 * @author Marwan KHELIF
 */
public interface HelloService extends RemoteService {
	public String sayHello (String name);
} // HelloService</pre>

Voilà le code du service côté client qui sera utilisé pour effectuer des appels RPC en JavaScript.

On crée alors une interface qui sera utilisé par GWT pour effectuer les appels asynchrone. Cette interface est identique à celle que l&#8217;on vient d&#8217;écrire sauf que toutes les méthodes doivent retourner **void** et posséder un dernier argument en plus.

<pre lang="java">/**
 * @author Marwan KHELIF
 */
public interface HelloServiceAsync {
	public void sayHello (String name, AsyncCallback callback);
} // HelloServiceAsync</pre>

La classe AsyncCallBack contient deux méthodes qui permettent de gérer le résultat de l&#8217;appel :

<pre>public void onSuccess (Object result)
public void onFailure (Throwable ex)
</pre>

##### Package server

Le package server (peut être nommé différemment) contient le code des services définis dans le package client.

Voilà donc notre implémentation du service **Hello** :

<pre lang="java">/**
 * @author Marwan KHELIF
 */
public class HelloServiceImpl extends RemoteServiceServlet implements HelloService {
	public String sayHello (String name) {
		return "Hello " + name + "!";
	} // sayHello ()
} // HelloService</pre>

Voilà notre service est prêt à fonctionner, il faut maintenant le rendre disponible aux clients. Pour cela il faut modifier le fichier de l&#8217;application GWT : *MyApplication.gwt.xml*

<pre lang="xml">&lt;module>
	<!-- Inherit GWT -->
	&lt;inherits name="com.google.gwt.user.User" />

	

<!-- Available Services -->
	&lt;servlet path="/hello" class="fr.mkhelif.gwt.server.HelloServiceImpl" />
&lt;/module>
</pre>

Voilà notre service RPC est prêt à l&#8217;emploi.

### Échange de données

Afin d&#8217;échanger des données entre le client (JavaScript) et le serveur (Java) il faut sérialiser les données pour qu&#8217;elles puissent transiter par le protocole HTTP. La sérialisation fournie avec GWT est différente de celle de Java.

Un type d&#8217;objet peut être utilisé en paramètre ou en retour d&#8217;une méthode de Service si c&#8217;est :

  1. <div>
      un type primitif : int, char, byte, double, boolean&#8230;
    </div>

  2. <div>
      un objet de type : String, Date ou un wrapper de type primitif (Double, Long, Integer, Float, Boolean, &#8230;).
    </div>

  3. <div>
      un tableau d&#8217;objets sérialisables.
    </div>

  4. <div>
      une classe utilisateur qui implémente <a href="http://google-web-toolkit.googlecode.com/svn/javadoc/1.4/com/google/gwt/user/client/rpc/IsSerializable.html" target="_blank">com.google.gwt.user.client.rpc.IsSerialisable</a> ou <a href="http://java.sun.com/j2se/1.4.2/docs/api/java/io/Serializable.html" target="_blank">java.io.Serialisable</a>.
    </div>

<p align="justify">
  Dans notre exemple nous n&#8217;utilisons que le type String, il n&#8217;y a donc aucun problème de sérialisation.
</p>

### Appel d&#8217;un service GWT

<p align="justify">
  Une fois notre service crée, il faut effectuer des appels a sa méthode <em>sayHello</em>. Pour cela il faut demander à GWT de nous donner une référence vers ce service puis on appelle la méthode.
</p>

##### Instanciation du service

<p align="justify">
  Pour instancier le service il suffit d&#8217;appeler :
</p>

<pre lang="java">HelloServiceAsync service = (HelloServiceAsync) GWT.create (HelloService.class);</pre>

<p align="justify">
  Le cast de HelloService vers HelloServiceAsync est toujours sûr car l&#8217;objet Proxy créé implémente l&#8217;interface asynchrone.
</p>

##### Association du service à l&#8217;URL

<p align="justify">
  Une fois notre service instancié il faut le lier avec le point d&#8217;entrée du service sur le serveur : <em>/hello</em>. Pour cela on effectue l&#8217;appel suivant :
</p>

<pre>((ServiceDefTarget) service).setServiceEntryPoint (GWT.getModuleBaseURL () + "/hello");</pre>

<p align="justify">
  Voilà le service est mappé avec le serveur, on peut effectuer l&#8217;appel à la méthode.
</p>

##### Appel d&#8217;une méthode de service

<p align="justify">
  Pour appeler la méthode du service :
</p>

<pre lang="java">service.sayHello ("Marwan KHELIF", new AsyncCallBack () {
	public void onFailure (Throwable caught) {
		// Traitement en cas d'erreur
	} // onFailure ()

	public void onSuccess (Object result) {
		// Traitement en cas de succès
		Window.alert ((String) result);
	} // onFailure ()
});</pre>

<p align="justify">
  Voilà la méthode a été appelée sur le service RPC.
</p>

### Conclusion

Les services RPC est l&#8217;un des points les plus importants du framework GWT. Ils permettent d&#8217;effectuer très simplement des appels au serveur en JavaScript et ainsi mettre à jour l&#8217;interface graphique grâce aux données.
