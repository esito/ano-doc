<!-- markdownlint-disable MD033 - makes html allowed -->

# Creating the ANO file

The DBerase service has syntax equal to a subset of the DBmasker syntax with some restrictions. The complete syntax is available here: DBmasker ANO syntax.

This is valid in the **erase** context:

- The **model**
- The **schema** section
- The **transformation** from the user defined classes section
- The **erase** task from the tasks and rules section

Terminals not defined on this page, are explained in the DBmasker ANO syntax.

## Definitions

### userdefined

![alt text](/img/docs/erase/userdefined-erase.png 'Userdefined - erase')

&nbsp;

### task

![alt text](/img/docs/erase/task-erase.png 'Task - erase')

The **TASK** represents a task name and **sql** represents SQL statements run before and after the task defined operations.

&nbsp;

### erase

![alt text](/img/docs/erase/erase.png 'Erase')

Used for erasing records in a table by anonymizing specified columns and deleting records from it's referenced tables, or masking specified columns in the referenced tables. It contains a parameterized condition bases on the selected tables primary key.

&nbsp;

### eraseTable

![alt text](/img/docs/erase/eraseTable.png 'Erase table')

&nbsp;

### simpleMask

![alt text](/img/docs/erase/simpleMask.png 'Simple mask')

&nbsp;

## Generate the java code

Once you have created the ANO file, you can generate the java source. A generation service is available on [anonymizer.esito.no](https://anonymizer.esito.no). Select your **ANO** file as **Erase model File name** input, edit the **Root package** parameter and press the **Download ZIP** button.

![alt text](/img/docs/erase/dberaseweb.png 'DBerase web')

Unpack the returned zip file into a java project folder of your choice.

&nbsp;

## The generated REST program

The code is organized as a Maven project into two source folders with various java packages and resources in the src/main project directory. Generated code is written to the src/main folder and it is regenerated each time the **DBerase** service is used. Be aware of that customization might be overwritten each time it is regenerated.

The system creates java packages in the src/main/java folders based on the property **Root package** defined as parameter to the **DBerase** service. The default package is example.eraser.

&nbsp;

## Code packages and files

<table>
<tr>
<td>

src/main/java

</td>
<td>

Source folder for customized and generated files. The generated source is described in the AnonymizerAPI javadoc.

</td>
</tr>
<tr>
<td>

- \<root package\>.transformations

</td>
<td>

Package containing custom transformations. Defined for Masked column. Used for transforming column value before being written to database.

</td>

</tr>
<tr>
<td>

- \<root package\>.Application.java

</td>
<td>

Start file containing java main method for jar file

</td>
</tr>
<tr>
<td>

- \<root package\>.EraseController.java

</td>
<td>

Spring Boot Rest Controller for the Erase end-points

</td>
</tr>
<tr>
<td>

- \<root package\>.EraseRepository.java

</td>
<td>

Spring Boot implementation code for the Erase end-points

</td>
</tr>
<tr>
<td>

- \<root package\>.SpringFoxConfig.java

</td>
<td>

Spring Boot configuration initializer, starts Swagger API doc

</td>
</tr>
<tr>
<td>

- \<root package\>.IEraseRepository.java

</td>
<td>

Spring Boot interface for the Erase end-points

</td>
</tr>
<tr>
<td>

- \<root package\>.\<task name\>

</td>
<td>

Application code for performing erasures. A separate package is created for each task and sub-task. Within each package are various java files for performing the various functions.

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer

</td>
<td>

Contains all interfaces, ConfigUtil.java (reading/writing config.properties) and Log.java (Java logging). All interfaces and abstract classes are explained in the javadoc.

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.column

</td>
<td>

(Internal) Contains multiple classes for each supported column data type

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.conversions

</td>
<td>

Built in conversions used for converting string input to various other data types. (_String2Date, String2DateTime, String2Decimal, String2Integer, String2Time_)

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.core

</td>
<td>

(Internal) Contains abstract classes for various functions

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.sarwriter

</td>
<td>

The four supplied SAR writers for XML and JSON

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.distributions

</td>
<td>

Built in distributions determine how foreign keys are distributed between parent and child tables

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.mask

</td>
<td>

(Internal) Contains mask classes for various functions

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.noise

</td>
<td>

(Internal) Contains noise classes for various data types

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.transformations

</td>
<td>

Built in transformations.

</td>
</tr>
<tr>
<td>

- - CreditCard.java

</td>
<td>

Replaces last digit of credit card number with calculated checksum using Luhn algorithm

</td>
</tr>
<tr>
<td>

- - Email.java

</td>
<td>

Translates various characters as space, hyphen or underscore.

</td>
</tr>
<tr>
<td>

src/main/resources/application.properties

</td>
<td>

Connection parameters for the database you will connect to.

</td>
</tr>
<tr>
<td>

src/main/resources/static/index.html

</td>
<td>

A generated HTML page you may use to test the REST api.

</td>
</tr>
<tr>
<td>

pom.xml

</td>
<td>

Maven config file.

</td>
</tr>
<tr>
<td>

readme.<span/>md

</td>
<td>

Short description of the content and how to use it.

</td>
</tr>
</table>

&nbsp;

## The generated Server and REST API

The generated server is a Spring Boot application, which starts a webserver containing the REST api and the erase application. The default webserver is Tomcat, but can easily be configured for other web-servers, such as Jetty or Undertow.

The REST api syntax follows the structure shown in the example URLs below, taken from the case defined in Sample code:

### Example REST api use

```
Using the specific functions:
http://localhost:8080/api/Erase_CUSTOMER?CUSTOMERNO=1000234
http://localhost:8080/api/Erase_HOTELROOMCATEGORY?FROMDATE=2005-10-15&HOTEL_ID=1&ROOMCATEGORY_ID=11

Using the general erase task, where the taskname is one of the parameters:
http://localhost:8080/api/erase/?task=forgetme.Erase_CUSTOMER&params=1000234

In the general case, with many parameters, the parameter sequence has to be equal to the sequence
defined in the erase definition where clause, defined by PARAMETERn:
    where "(*HOTEL_ID* = %PARAMETER1% AND ROOMCATEGORY_ID = %PARAMETER2% AND FROMDATE = '%PARAMETER3%')"
http://localhost:8080/api/erase?task=forgetme.Erase_HOTELROOMCATEGORY&params=1&params=12&params=2005-10-15
```

> **REST api parameter sequence**\
> If it is more than one parameter, will the sequence of parameters be equal to the parameter number sequence as in PARAMETERn, which is the n-th parameter.

&nbsp;

> **Need java package prefix**\
> The general erase function with task name as parameter, need the complete java package. In the above case will the task parameter be: **?task=forgetme.Erase_CUSTOMER**. The package name is given by the **task = ForgetMe** statement in the ANO file.

&nbsp;

The Spring Boot essential configuration can be found in "src/main/resources/application.properties". It's normal to create a profile for other environments like "application-local.properties" for testing and development purposes. Read more about this at Spring IO's documentation site.

- [Spring Boot Docs - Common Application Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html)

&nbsp;

### Setting different port for REST in Spring Boot application.properties

```properties
server.port=8081
```

> **RequestMapping**\
> The REST API URL is generated with\
> `@Configuration`\
> `@RequestMapping("/api")`\
> This may be overrided in the \<root package\>/EraseController.java. This file will be regenerated on next invocation of the service.

&nbsp;

### Sample REST calls using Swagger

The overall erase-controller and available API:

![alt text](/img/docs/erase/swaggerGET.png 'Swagger - GET')

To use a function,select /api/Erase_CUSTOMER, press the **Try it out** button and add a value to the CUSTOMERNO field.

![alt text](/img/docs/erase/swagger.png 'Swagger')

&nbsp;

## Compile and run the generated program

### Setup your custom code and data

- Add your custom Java implementations to /src/main/java
- Add your custom data files to /src/main/resources

### Configure database driver settings

- Modify the pom.xml: add your JDBC driver dependencies.

### Configure database connection settings

Open application.properties from src/main/resources and edit the file with database connection settings. Information of necessary properties are given here: [Spring Docs - Application Properties - Data Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#data-properties). A sample application.properties is explained here: Erase example project.

### Build using Maven

Add necessary dependencies to the generated pom.xml. To create the program JAR file, run:

- mvn install

### Run the generated REST server

To test the generated code, start a command shell and run:

> **java -jar target/\<servername\>-\<version\>.jar**.

It starts the Spring Boot class \<package\>.Application.

&nbsp;

## Sample code

### erase me sample

```ano
table ADDRESS
    column text HOMEADDRESS size 40
    column integer POSTALCODE size 10
    column integer ID size 10
    column integer CUSTOMER_CUSTOMERNO size 10
    primary-key ID
table CUSTOMER
    column text CREDITCARD size 16
    column integer CUSTOMERNO size 10
    column text EMAIL size 40
    column text NAME size 40
    column text PASSWORD size 40
    column text PHONE size 20
    primary-key CUSTOMERNO
table HOTELROOMCATEGORY
    column decimal ACTUALPRICE size 10  scale 2
    column date FROMDATE
    column date TODATE
    column integer HOTEL_ID size 10
    column integer ROOMCATEGORY_ID size 10
    primary-key HOTEL_ID, ROOMCATEGORY_ID, FROMDATE
foreign-key
    ADDRESS CUSTOMER_CUSTOMERNO
    CUSTOMER CUSTOMERNO

transformation PostCodeGeneralization

// Forget Me - tasks
task forgetMe
{
    // Forget Me - based on customer number
    erase CUSTOMER
        where "CUSTOMERNO = %PARAMETER%"
        mask NAME
            format "firstname lastname"
        mask EMAIL
            format post@email.com
            transform Email
        {
            // Anonymize identifiable columns
            cascade ADDRESS
                parent CUSTOMERNO
                child CUSTOMER_CUSTOMERNO
                mask HOMEADDRESS
                    format "Home address"
                mask POSTALCODE
                    transform PostCodeGeneralization
        }
    // Remove a Room Category - based on a 3 column primary key
    erase HOTELROOMCATEGORY
        where "(HOTEL_ID = %PARAMETER1% AND ROOMCATEGORY_ID = %PARAMETER2% AND FROMDATE = '%PARAMETER3%')"
}
```
