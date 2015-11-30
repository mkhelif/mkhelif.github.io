### Network management software

Member of the IT-CS group (Communication Systems) which is in charge of telephony (GSM, VOIP, analog), networks (from top-down: structured cabling, selection of switches/routers, installation, network engineering, network support, Wi-Fi) and central network services (DNS, DHCP, Radius, NTP, ...).

In this group, my section, IT-CS-CT (Communication Tools) is a small team (around 7 people) of young and multicultural developers and is in charge of building software to support and manage the network, telephony, and network services.

The database controlled by our section (LANDB), is the core of the network activities at CERN, and we model all needed networking and telephony concepts that will be either consumed by high-level applications that we build or by other low-level applications in other sections of the group.

#### CSDB

Admin application

New layered architecture


#### LANDB Portal

User-facing application, it is used by all the users at CERN who requires network connectivity.

The old application WebReq was in Perl and written more than 20 years ago, it has been migrated to Grails.

* ##### Grails
  The application backend is written using Grails framework. The service layer is shared between CSDB and LANDB Portal as a Maven artifact.

* ##### AngularJS
  The application frontend is using AngularJS.

* ##### Micro-services
  After evaluating different options, I proposed to replace some parts of the legacy application using _Spring Boot_ powered micro-services.  
  I chose Spring Boot as we were already heavily using Spring framework and it was at that time the more mature framework.
  It allowed us to migrate very quickly and easily legacy features to our new architecture.


#### LANDB Database

LANDB is the core network database which stored all the network configuration: topology, devices, users, connections, firewall, fibers, telephony, ...  
This database is the core of all the application developped in the section and is heavily used by other people around CERN using _SOAP_ and _REST_ API.

Since the database was the common layer of the legacies application, all the logic has been developped in PL/SQL over many years.
In order to greatly simplify the maintenance and the evolution of the codebase, I proposed to migrate this legacy code to a service oriented architecture.
The two main application now use the same service layer and 


#### Devops

I was in charge of administering all the applications used by the developers, inside the section but also used by other people in the group.

* ##### SVN repositories
  I was responsible of the _SVN_ repositories used by the whole group. The creation of the repositories and the access management was automated using the access roles provided by CSDB application.  
  In order to provide high quality source code, commit hooks were setup running _Checkstyle_ static analysis prior to any commit. This enforced the same source code format and really reduced the different development styles of each developer.

* ##### Atlassian Bamboo
  To build our applications we are using Atlassian _Bamboo_.  
  Very similar to Jenkins, I was maintaining and updating the build plans depending on the environment change: migration to Java 8, development of new applications based on different frameworks (_Grails_, _Spring Boot_, _Android_, _ANT_, _Maven_), retirement of old applications.

* ##### Atlassian Fisheye
  As part of our software development life cycle, prior to deploy any changes to the codebase, peer reviews were mandatory.
  Using Atlassian _Fisheye_ at least two other developers had to review the code. 
  This not only greatly improved the code quality, but also allowed the simplify knowledge transfer among all the developers.

* ##### Selenium Grid
  I was managing the entire _Selenium_ grid, from its setup to its maintenance using _OpenStack_ to manage the nodes of the cluster.  
  I decided to develop a simple framework that allows to drastically simplify the development of integration tests, by creating a layer between Selenium API and our own applications.
