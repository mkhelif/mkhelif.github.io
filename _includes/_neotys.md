### Development of Neoload software

As member of a small development team (around 10 people), I was developing on NeoLoad software.  

NeoLoad is a load testing solution designed for web and mobile applications to realistically simulate user activity and monitor infrastructure behavior.
Developed in _Java_, Neoload is a heavy client using _Swing_ for UI.
To generate heavy load on tested servers it generates virtual users that replay a recorded scenario.

#### Development Process

Based on _Agile_ methodologies

_SVN_ as version control system

_Bugzilla_ as backlog

_Jenkins_ as build system

_JUnit_ for unit testing and QFTest for Swing UI testing

#### Simulation (record and replay)

Theses modules are used to record the protocol traffic and display it in a user-friendly way.
This allows the user to easily understand the purpose of each request but also to modify them according to their testing scenario.

Also used to execute the requests during a load test, these modules required strict memory management and code synchronization as
they are used by more than _1500 threads_ simultaneously.

* ##### Adobe RTMP (Real Time Messaging Protocol)
  Protocol developped by Adobe to communicate between a media server and a client (mostly Flash player).
  Detect and record RTMP traffic at TCP level (using _tcpdump_/_jNetPcap_).
  This required not only to reverse-engineer the protocol but also to adapt the module to work with a variety of media server (using their own retro-engineered protocol).

* ##### Google Web Toolkit RPC
  Protocol developped by Google to ease communication between a _GWT_ client and the server. Text based protocol, it is used to serialize Java objects between client and server.
  This required to understand the protocol by understanding GWT source code and be able to simulate it.

#### Monitoring

Modules used to analyze the behavior of the environment when performing an application load test.
Each of them required to analyze how the monitored element provides statistics, retrieve them and provide usefull information to the tester.
	
* ##### Hypervisor
  _VMWare ESx_  
  Connection to hypervisor Web service and collection of provided statistics.

* ##### Applications servers
  _Oracle Application Server_, _JOnAS_, _GlassFish_  
  JMX connections to retrieve populated MBeans, statistics are different for all servers.

* ##### Databases
  _DB2_, _PostgreSQL_  
  JDBC connection established with the database and statistics are retrieved using engine specific SQL queries.

