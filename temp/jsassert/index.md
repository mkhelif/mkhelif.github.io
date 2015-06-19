---
title: jsassert
author: mkhelif
layout: page
---
<header class="entry-header"> 

# [jsassert: JavaScript assertion framework][1] {.entry-title}</header> 

<div class="entry-content">
  <p class="align-center">
    <a href="https://github.com/mkhelif/jsassert"><br /> <img class="aligncenter size-full wp-image-631" title="jsassert" src="http://www.mkhelif.fr/wp-content/uploads/2012/08/jsassert.png" alt="jsassert" /><br /> </a>
  </p>
  
  <h3>
    Presentation
  </h3>
  
  <p>
    jsassert is a JavaScript unit tests framework which make uses of fluent assertions.
  </p>
  
  <p>
    Just like <a href="http://www.junit.org/">JUnit</a> for Java, jsassert lets you define test suites and test cases. In your test cases you can use fluent assertions. Such assertions make your tests very simple to read and understand.
  </p>
  
  <h3>
    Test Suites
  </h3>
  
  <p>
    To create a test suite you simply need the following code:
  </p>
  
  <pre>JSAssert.addTestSuite("MyTestSuite", {
    testCase1: function() {},
    testCase2: function() {}
});</pre>
</div>

### Assertions

The goal of the framework is to provide human-readable assertions. Thus you can simply write something like this:

<pre>// As it said, it checks the non-nullity of my object
assertThat(myObject).isNotNull();

// Verifies the equality between the two objects
assertThat(myObject).equals(otherObject);

// Ensure that my object has the property named "property" with a non-null value
assertThat(myObject).has("property");</pre>

The entry point of all the assertions is the method *assertThat*, using the object passed in parameter the method returns all the available assertions for this type of object. Take a look at the [README][2] file on [GitHub][3] for a complete list of assertions.

 [1]: https://github.com/mkhelif/jsassert
 [2]: https://github.com/mkhelif/jsassert/blob/master/README.md
 [3]: https://github.com/mkhelif