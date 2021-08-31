<!-- markdownlint-disable MD033 - makes html allowed -->

# DBerase example project

We have prepared a hotel booking example project consisting of

- a github project containing
  - eraseme.ano file describing database structure and masking rules
  - user defined java classes and resources
  - database scripts to build and populate a H2 database
- use of DBerase service
  - with the eraseme.ano file as input
  - which generates a zip with the complete Spring Boot java program as output
  - The project uses Maven to build an executable jar file.

## Prerequisites

The example uses Java, Maven and H2 database. It is tested with these versions:

- Java 1.8 and 1.13
- Maven 3.6.1
- H2 1.4.200

## Download the github project

Download and unzip the dberase.zip [GitHub - esito/dberase](https://github.com/esito/dberase) to a java project folder (dberase) or clone the dberase git project:
git clone https<span/>://github<span/>.com/esito/dberase.git.

Files which are part of the dberase example project:

- erasesample\eraseme.ano: describes erase rules, input to the DBerase service
- erasesample\application.properties: database connection settings
- erasesample\src\main\java: source files which represents custom implementations
- erasesample\src\main\resources: schema for the H2 database
  - data.sql: schema and inserts to create the H2 database

&nbsp;

### Create and populate the database

The database will be created and populated by the generated spring boot application.

&nbsp;

### Investigate the ANO file

From the erasesample folder, look at the eraseme.ano file. It contains a description written in the ANO DSL language which consists of

- description of necessary parts of the database structure
- two erase tasks and rules describing how to anonymize, mask and remove data

The syntax is described in the DBerase ANO syntax chapter.

The simplified domain model for this sample project:

![alt text](/img/docs/hotelsample.png 'Hotel Sample')

&nbsp;

## Generate the GDPR forget me program code

Go to the http://anonymizer.esito.no web, register a user and subscribe to the DBerase service.

Go to the DBerase service on https://anonymizer.esito.no/auth/dashboard/dberase. Choose **SELECT A FILE** and use the eraseme.ano file as the **Erase model File name** parameter to the service. Ignore the **Root package** parameter (giving example.eraser package value) and press the **Download ZIP** button.

![alt text](/img/docs/erase/dberaseweb.png 'Hotel Sample')

&nbsp;

The project dberase-master/erasesample will look like this before unzipping the result:

```
src/main/java/example/eraser/transformations/PostCodeGeneralization.java
src/main/resources/data.sql
application.properties
eraseme.ano
```

Unpack the resulting zip to the java erasesample project you downloaded or cloned from github. It unzips the generated source into the src folder and the pom.xml and readme.md to the erasesample project root. Generated code is written to the src/main folder and it is regenerated each time the **DBerase** service is used. Be aware of that customizations might be overwritten each time it is regenerated.

&nbsp;

## Prepare and setup

### Edit application.properties

Edit the database properties in the application.properties file:

### Database connection parameters

```properties
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.open-in-view=false
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.h2.console.settings.trace=false
spring.h2.console.settings.web-allow-others=true
```

### Using Maven, edit pom.xml

The generated source may be built using Maven. Add the H2 dependencies to the pom.xml file and change the version number and dependencies to fit your H2 installation:

```xml
  <properties>
      <h2.version>1.4.200</h2.version>
  </properties>

  <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <version>${h2.version}</version>
  </dependency>
```

To build the eraseme sample program, run mvn install, which creates the eraseme-0.0.1.jar in the target folder.

&nbsp;

## Run the generated application

To test the generated code, start a command shell and run this command from the erasesample folder:

> java -jar target/eraseme-0.0.1.jar cmd

It starts the Spring Boot program example.eraser.Application. The H2 database will be populated on start with data from data.sql.

The program name **eraseme** is given by your input eraseme.ano file name. The program displays the Spring Boot and **eraseme** program messages on startup.

To check that the database connection is ok: <http://localhost:8080/h2-console>

The first time you're using the H2 Console, you must set correct JDBC URL: jdbc:h2:mem:testdb and press the Save button.

Test the generated REST api by navigating to <http://localhost:8080/swagger-ui.html> and open the erase-controller.

A set of tasks is defined as REST endpoints:

Available erase tasks:

- /api/erase - general api that takes taskname and necessary parameters
- /api/Erase_CUSTOMER - takes customerno as parameter
- /api/Erase_HOTELROOMCATEGORY - takes hotel_id, roomcategory_id and fromdate as parameters

Each of these tasks may be run with the swagger console.

Check how the erase tasks work:

- investigate the content of the H2 database
- check how the tasks and rules are defined
- run the tasks, one at the time
  - erase_customer 1000234 (the number is one of the customer ids)
  - erase_hotelroomcategory 1 11 2005-10-15
- check the database result

## Sample database session

Inspect the H2 database by navigating to http://localhost:8080/h2-console

## The sample ano file

The example DBerase ano file used in this project:

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
