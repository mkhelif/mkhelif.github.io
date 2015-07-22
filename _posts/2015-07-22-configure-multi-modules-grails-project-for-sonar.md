---
file: 2015-07-22-configure-multi-modules-grails-project-for-sonar
title: 'Configure Sonar for multi-modules Grails project'
author: mkhelif
layout: post
permalink: /configure-sonar-multi-modules-grails/
categories:
  - Java
tags:
  - Grails
  - Sonar
  - Java
  - Groovy
  - JavaScript
---

For some times I've been strugling to configure [Sonar](http://www.sonarsource.com/) to analyze a multi-modules Grails project.
The project is composed of a main project which includes many plugins. Each plugin being a Grails plugin by its own with all the Groovy, Java and Web (GSP, js, SASS, ...) code.

## Configuration

This article describes how to run a Sonar analysis on a multi-languages Grails project (Groovy, Java and JavaScript) composed by many plugins.
It requires SonarQube 4.2 as the multi-language analysis has been introduced in this release.

Sonar offers different ways of running an analysis, the only one I used are the standalone Sonar Runner and the Maven plugin.
Since the Grails project are not mavenized, I chose to got with the standalone SonarRunner, but I put the Maven configuration for information.

### Sonar Runner

Using Sonar Runner you only need to create a _sonar-project.properties_ defining the project and the modules.
By not specifying a language, Sonar Runner will verify all possible languages (depending on the plugins installed on your SonarQube server).

Following is the content for a multi-modules / multi-languages Grails project:

```
sonar.projectKey = fr.mkhelif:Project
sonar.projectName = Project
sonar.projectVersion = 1.0
sonar.modules = application, plugin1, plugin2
sonar.sources = src/groovy, src/java, grails-app, web-app 

application.sonar.projectName = Application
application.sonar.projectBaseDir = application
application.sonar.sources = ${sonar.sources}

plugin1.sonar.projectName = Plugin1
plugin1.sonar.projectBaseDir = plugin1
plugin1.sonar.sources = ${sonar.sources}

plugin2.sonar.projectName = Plugin2
plugin2.sonar.projectBaseDir = plugin2
plugin2.sonar.sources = ${sonar.sources}
```

### Maven

If your Grails project is mavenized, then just add the following configuration (untested) to your parent pom:

```xml
<properties>
    <sonar.projectKey>fr.mkhelif:Project</sonar.projectKey>
    <sonar.projectName>Project</sonar.projectName>
    <sonar.projectVersion>${project.version}</sonar.projectVersion>
    <sonar.modules>application, plugin1, plugin2</sonar.modules>
    <sonar.sources>src/groovy, src/java, grails-app, web-app</sonar.sources>

    <application.sonar.projectName>Application</application.sonar.projectName>
    <application.sonar.projectBaseDir>application</application.sonar.projectBaseDir>
    <application.sonar.sources>src/groovy, src/java, grails-app, web-app</application.sonar.sources>

    <plugin1.sonar.projectName>Plugin1</plugin1.sonar.projectName>
    <plugin1.sonar.projectBaseDir>plugin1</plugin1.sonar.projectBaseDir>
    <plugin1.sonar.sources>src/groovy, src/java, grails-app, web-app</plugin1.sonar.sources>

    <plugin2.sonar.projectName>Plugin2</plugin2.sonar.projectName>
    <plugin2.sonar.projectBaseDir>plugin2</plugin2.sonar.projectBaseDir>
    <plugin2.sonar.sources>src/groovy, src/java, grails-app, web-app</plugin2.sonar.sources>
</properties>
```

And then run the Sonar Maven runner as usual:

```sh
mvn clean package
mvn sonar
```

## Results

The results of the analysis can be seen in Sonar in your project with the configured modules.
You can access individual modules by going to the *Components* menu in Sonar application.

![Sonar multi-modules](/uploads/{{ page.file }}/components.png "Sonar multi-modules")
