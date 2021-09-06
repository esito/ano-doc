---
sidebar_position: 1
sidebar_label: DBmasker Derby Example Project
---

# DBmasker example project with Derby

[GitHub Link](https://github.com/esito/dbmasker)

We have prepared a hotel booking example project consisting of

- a github project containing
  - hotelsample.ano file describing database structure and masking rules
  - user defined java classes and resources
  - database scripts to build and populate a Derby database
- use of DBmasker service
  - with the hotelsample.ano file as input
  - which generates a zip with the complete java program as output

The project uses Maven to build an executable jar file.

<br/>

## Prerequisites

The example uses Java, Maven and Derby database. It is tested with these versions:

- Java 1.8
- Maven 3.6.1
- Derby 10.14.2.0

### Derby install

Download [Derby](https://db.apache.org/derby/derby_downloads.html), unzip to a folder of your choice.

<br/>

## Download the github project

Download and unzip the dbmasker-master.zip (https://github.com/esito/dbmasker) to a java project folder or clone the dbmasker git project:
git clone https://github.com/esito/dbmasker.git.

Files which are part of the dbmasker example project:

- hotelsample\hotelsample.ano: describes masking rules, input to the DBmasker service
- hotelsample\config.properties: database connection settings
- hotelsample\src\main\java: source files which represents custom implementations
- hotelsample\src\main\resources: text files used in the masking processes
- hotelsample\database: database files
  - schema to create a derby database
  - insert statements to populate the database

<br/>

Open a command shell and go to the hotelsample/database folder. Open the database creation script create-db.cmd (Windows) or create-db.<span/>sh (Linux or Mac) and edit **DERBY_HOME** to point to your Derby installation folder containing the libs.

Run the create-db script. It will create the database/hotelsample folder, containing the Derby database populated with sample data.

<br/>

### Investigate the ANO file

From the hotelsample folder, look at the hotelsample.ano file. It contains a description written in the ANO DSL language which consists of

- description of database structure
- a lot of tasks and rules describing how to anonymize, mask, create and remove data

The syntax is described in the DBmasker ANO syntax chapter.

The simplified domain model for this sample project:

![alt text](/img/docs/hotelsample.png 'Hotel Sample')

<br/>

## Generate the anonymization/masking program code

Go to the http://anonymizer.esito.no web, register a user and subscribe to the DBmasker service.

Go to the DBmasker service on https://anonymizer.esito.no/auth/dashboard/dbmasker. Choose **SELECT A FILE** and use the hotelsample.ano file as the **Anonymizer model File name** parameter to the service. Ignore the **Root package** parameter (giving example.anonymizer package value) and press the **DOWNLOAD ZIP** button.

![alt text](/img/docs/dbmaskerweb.png 'DB Masker Web')

<br/>

The project dbmasker-master/hotelsample will look like this before unzipping the result:

```
database/*
src/main/java/example/anonymizer/conversions/ParseDigits.java
src/main/java/example/anonymizer/distributions/MinPerParent.java
src/main/java/example/anonymizer/transformations/PostCodeGeneralization.java
src/main/java/example/anonymizer/Connect.ovr
src/main/resources/email.txt
src/main/resources/firstname.txt
src/main/resources/lastname.txt
src/main/resources/logo.txt
src/main/resources/town.txt
address_map.txt
config.properties
hotelsample.ano
```

Unpack the resulting zip to the java project you downloaded or cloned from github. Unzip the structure into the hotelsample folder. The pom.xml and readme.<span/>md will be copied to the hotelsample project root. Generated code is copied to the src folder. It is regenerated each time the **DBmasker** service is used. Be aware of that customizations might be overwritten each time it is regenerated.

<br/>

## Prepare and setup

### Connect class

The **DBmasker** generator creates hotelsample\src\main\java\example\anonymizer\Connect.java, which connects to the database given by the config.properties file. In this example, we have to override the Connect.java with a user defined Connect. Replace the content in hotelsample\src\main\java\example\anonymizer\Connect.java with the code from src/main/java/example/anonymizer/Connect.ovr:

### Connect

```java
package example.anonymizer;

import java.sql.Connection;
import java.net.InetAddress;
import no.esito.anonymizer.ConfigUtil;
import no.esito.anonymizer.core.AbstractConnect;
import org.apache.derby.drda.NetworkServerControl;

public class Connect extends AbstractConnect{

    /**
     * Factory method for Connection from the config.properties
     * @return Connection
     * @throws Throwable Connection exceptions
     */
    public static Connection createDefaultConnection() throws Throwable {
        return new Connect().makeConnection("",ConfigUtil.getConfig());
    }

    public NetworkServerControl nsc;

    @Override
    protected void checkNetworkService(String host, String port) throws Throwable {
        if (nsc == null) {
            InetAddress inet = InetAddress.getByName(host);
            nsc = new NetworkServerControl(inet, Integer.parseInt(port));
            nsc.start(null);
            System.out.println("Starting Derby: "+ port);
        }
    }
}
```

<br/>

### Edit config.properties

If necessary, edit the database properties in the config.properties file:

### config.properties

```properties
# Database connection parameters
connection.host         = localhost
connection.port         = 1527
connection.db           = database/hotelsample
connection.schema       = APP
connection.user         =
connection.password     =
connection.driverClass  = org.apache.derby.jdbc.ClientDriver
connection.url          = jdbc:derby://<host>:<port>/<db>;create=false
file.encryptionkey      = passkey89012345
```

<br/>

### Using Maven, edit pom.xml

The generated source may be built using Maven. Add the Derby depedencies to the pom.xml file and change the version number and dependencies to fit your Derby installation:

```xml
  <properties>
      <derby.version>10.14.2.0</derby.version>
  </properties>

  <dependency>
      <groupId>org.apache.derby</groupId>
      <artifactId>derbyclient</artifactId>
      <version>${derby.version}</version>
  </dependency>
  <dependency>
      <groupId>org.apache.derby</groupId>
      <artifactId>derbynet</artifactId>
      <version>${derby.version}</version>
  </dependency>
  <dependency>
      <groupId>org.apache.derby</groupId>
      <artifactId>derby</artifactId>
      <version>${derby.version}</version>
  </dependency>
```

To build the hotelsample program, run mvn install, which creates the `hotelsample-0.0.1.jar` in the target folder.

<br/>

### Run the generated application

To test the generated code, start a command shell and run this command from the hotelsample folder:

> java -jar target/hotelsample-0.0.1.jar cmd

The program name **hotelsample** is given by your input hotelsample.ano file name. "cmd" is a command that takes continued input from standard input. The program displays the command help text and is ready for commands.

```
Commands:
- trace                 - shows more messages
- help                  - shows this page
- config                - creates a local config.properties used for changing connection parameters
- ping                  - test database connection
- tasks                 - outputs list of tasks
- run                   - runs all tasks except erase and sar tasks
- run <tasks>           - runs a list of space delimited tasks, erase and sar actions are excluded
- erase <task> <params> - runs erase actions for a specified task with a series of space delimited
                          parameters. If parameter contains a space, surround it with quotation marks
- sar <task> <params>   - creates a SAR export for a specified task with a series of space delimited parameters
                          parameters. XML and JSON files will be created in working directory
- cmd                   - takes continued input from standard input (stdin)
- quit                  - quits program
>
```

<br/>

Check that the database connection is ok: run the ping command:

```
>ping
Reading local config from C:\temp\hotelsample\config.properties
Starting Derby: 1527
DBMS: Apache Derby - 10.14.2.0
Driver: Apache Derby Network Client JDBC Driver - 10.14.2.0 - 10.14
URL: jdbc:derby://localhost:1527/database/hotelsample;create=false
Connection succesful
>
```

<br/>

Turn on verbose mode, run the **trace** command.

A set of tasks is defined, to see the list, run the **tasks** command

```
>tasks
Available tasks:
Anonymize
  Anonymize_CUSTOMER (CUSTOMER - CREDITCARD EMAIL NAME PHONE)
  Anonymize_ROOMCATEGORY (ROOMCATEGORY - INITIALPRICE)
  Delete_HOTELCHAIN (HOTELCHAIN)
  Fix_ADDRESS (ADDRESS - POSTALCODE)
Create
  Create_HOTELCHAIN (HOTELCHAIN)
  Create_HOTEL (HOTEL)
  Create_ROOM (ROOM)
Advanced
  Anonymize_HOTEL (HOTEL - NAME)
  Anonymize_ADDRESS (ADDRESS - HOMEADDRESS)
  Anonymize_ROOMCATEGORY2 (ROOMCATEGORY - ID)
  Anonymize_BOOKING (BOOKING -  BOOKINGCREATED EARLIESTCHECKINTIME FROMDATE ID TODATE))
  Anonymize_ROOM (ROOM - ID)
  Anonymize_HOTELROOMCATEGORY (HOTELROOMCATEGORY - ACTUALPRICE FROMDATE TODATE)
ForgetMe
  Erase_CUSTOMER (CUSTOMER)
  Erase_HOTELROOMCATEGORY (HOTELROOMCATEGORY)
SubjectAccess
  SAR_CUSTOMER (CUSTOMER)
>
```

<br/>

Each of these tasks may be run with the **run** command:

Run a group of tasks as in **run anonymize** or run a single task as in **run fix_address**.
You may use lower case letters on all task names.

Check how the mask, create and delete tasks work:

- investigate the content of the database
- check how the tasks and rules are defined
- run the tasks, one at the time
  - run anonymize
  - run create
  - run advanced
- check the database result

To run Erase and SAR tasks, use the **erase** and **sar** commands. Look at the definition of the tasks which are defined with a parameter. To run the tasks defined:

- erase erase_customer 1000234 (parameter customer id)
- erase erase_hotelroomcategory 1 11 2005-10-15 (parameters hotel id, roomcategory id and fromdate)
- sar subjectaccess 1000234 (parameter customer id)

To stop the program, run quit.

<br/>

## Embed the generated code into a java application

This chapter shows how to write program code that uses some of the generated tasks and the DBmasker interfaces. It depends on the target/hotelsample-0.0.1.jar file.

### Sample java main

```java
package apisample;

import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.SQLException;

import example.anonymizer.Connect;
import example.anonymizer.anonymize.Anonymize_CUSTOMER;
import example.anonymizer.erase.Erase_CUSTOMER;
import example.anonymizer.sar.SAR_CUSTOMER;
import no.esito.anonymizer.ContextFactory;
import no.esito.anonymizer.IContext;
import no.esito.anonymizer.Log;
import no.esito.anonymizer.sarwriter.JsonSarWriter;

public class UsingAPI {

    public static void main(String[] args) {
        try {
            // Set console-loghandler instead of Java's logger
            Log.configureConsoleLoghandler();

            // Connect to the default database specified in project.properties
            Connection conn = Connect.createDefaultConnection();

            // Run the samples
            runSampleAnonymizeTask(conn);
            runSampleEraseTask(conn);
            runSampleSarTask(conn);

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    private static void runSampleAnonymizeTask(Connection conn) throws Throwable {
        // Create a run-time context
        IContext context = ContextFactory.createAnonymizeContext(conn);
        context.setRepeatableRandom(true); // If you want same results consistently

        // Run the Anonymize_CUSTOMER task
        new Anonymize_CUSTOMER().run(context);
    }

    private static void runSampleEraseTask(Connection conn) throws Throwable {
        // Create a run-time context and supply the parameter, where customerno = %PARAMETER%
        IContext context = ContextFactory.createEraseContext(conn, new String[] {"1000234"});

        // Run the Erase_CUSTOMER task
        new Erase_CUSTOMER().run(context);
    }

    private static void runSampleSarTask(Connection conn) throws Throwable {
        try (
            FileOutputStream out =    new FileOutputStream("sar.json");
            JsonSarWriter writer = new JsonSarWriter(out);
        ){
            // Create a run-time context and supply the parameter, where customerno = %PARAMETER%
            IContext context = ContextFactory.createSarContext(conn, new String[] {"1000235"}, writer);

            // Run the SAR_CUSTOMER task
            new SAR_CUSTOMER().run(context);
        }
    }
```

<br/>

## Sample database session

To look at the Derby database content using the SQL client ij, run run-ij.cmd or run-ij<span/>.sh found in the database folder:

Note that DERBY_HOME in run-ij.cmd or run-ij<span/>.sh must point to your derby folder.

Note that only one instance may access the database at the time, so you may need to exit the running java -jar target/hotelsample-0.0.1.jar instance to run ij and look at the content in the Derby database. Otherwise you will get an error that the instance is already running.

```
>./run-ij.sh
ij version 10.14
ij> connect 'jdbc:derby:hotelsample';create=false';
ij> select * from hotel;
ID         |LOCATION                |LOGO        |NAME                              |CHAIN_ID   |LOCK_FLAG
----------------------------------------------------------------------------------------------------------
1          |Waterside meact         |Logo1       |Antique Canyon Hotel              |1          |NULL
2          |West kainnict           |Logo2       |Ivory Refuge Hotel & Spa          |1          |NULL
3          |South tasiob            |Logo3       |Historic Heritage Resort & Spa    |1          |NULL
4          |Andebu                  |Logo4       |Sunny Jungle Resort & Spa         |1          |NULL
5          |Waterside gramict       |Logo5       |Sunny Ribbon Resort               |1          |NULL
6          |Bergen                  |Logo6       |DeLuxor                           |1          |NULL
7          |Tronheim                |Logo7       |Da Hood                           |1          |NULL
8          |Nuword Garden           |Logo8       |Royal Ocean Hotel                 |1          |NULL
9          |Cunnic Center           |Logo9       |Grand Hotel                       |1          |NULL
10         |Lillehammer             |Logo10      |Prism Hotel                       |1          |NULL
11         |Sandvika                |Logo11      |The House of Dilbert              |1          |NULL
12         |Feered West             |Logo12      |Grand Resort                      |1          |NULL
13         |Oslo                    |Logo13      |Cloud Hotel                       |1          |NULL
14         |Midtown buwan           |Logo14      |Mellow Panorama Hotel             |2          |NULL
15         |Little drud             |Logo16      |Emerald Hotel                     |0          |NULL

15 rows selected
ij>
```

## The sample ano file

The example DBmasker ano file used in this project:

<details>
	<summary><b>hotelsample.ano (Click to Expand)</b></summary>

```ano
table ADDRESS
    column text HOMEADDRESS size 40
    column integer POSTALCODE size 10
    column integer ID size 10
    column integer LOCK_FLAG size 10
    column integer CUSTOMER_CUSTOMERNO size 10
    primary-key ID
table BOOKING
    column date FROMDATE
    column date TODATE
    column datetime BOOKINGCREATED
    column time EARLIESTCHECKINTIME
    column integer ID size 10
    column integer LOCK_FLAG size 10
    column integer CUSTOMER_CUSTOMERNO size 10
    column integer HOTEL_ID size 10
    column integer ROOMCATEGORY_ID size 10
    primary-key ID
table CUSTOMER
    column text CREDITCARD size 16
    column integer CUSTOMERNO size 10
    column text EMAIL size 40
    column text NAME size 40
    column text PASSWORD size 40
    column text PHONE size 20
    column integer LOCK_FLAG size 10
    primary-key CUSTOMERNO
table HOTEL
    column integer ID size 10
    column text LOCATION size 30
    column text LOGO size 40
    column text NAME size 40
    column integer LOCK_FLAG size 10
    column integer CHAIN_ID size 10
    primary-key ID
table HOTELCHAIN
    column text NAME size 40
    column integer ID size 10
    column integer LOCK_FLAG size 10
    primary-key ID
table HOTELROOMCATEGORY
    column decimal ACTUALPRICE size 10  scale 2
    column date FROMDATE
    column date TODATE
    column integer LOCK_FLAG size 10
    column integer HOTEL_ID size 10
    column integer ROOMCATEGORY_ID size 10
    primary-key HOTEL_ID, ROOMCATEGORY_ID, FROMDATE
table ROOM
    column integer ROOMNO size 10
    column integer FLOOR size 10
    column integer BALCONY size 5
    column integer HEADING size 10
    column integer ID size 10
    column integer LOCK_FLAG size 10
    column integer CATEGORY_ID size 10
    column integer HOTEL_ID size 10
    primary-key ID
table ROOMCATEGORY
    column integer BEDTYPE size 10
    column integer GUESTS size 10
    column integer ID size 10
    column decimal INITIALPRICE size 10  scale 2
    column integer MAXDISCOUNT size 10
    column integer ROOMQUALITY size 10
    column integer LOCK_FLAG size 10
    primary-key ID

foreign-key
    HOTELROOMCATEGORY HOTEL_ID
    HOTEL ID
foreign-key
    HOTELROOMCATEGORY ROOMCATEGORY_ID
    ROOMCATEGORY ID
foreign-key
    ADDRESS CUSTOMER_CUSTOMERNO
    CUSTOMER CUSTOMERNO
foreign-key
    BOOKING CUSTOMER_CUSTOMERNO
    CUSTOMER CUSTOMERNO
foreign-key
    BOOKING HOTEL_ID
    HOTEL ID
foreign-key
    BOOKING ROOMCATEGORY_ID
    ROOMCATEGORY ID
foreign-key
    HOTEL CHAIN_ID
    HOTELCHAIN ID
foreign-key
    ROOM CATEGORY_ID
    ROOMCATEGORY ID
foreign-key
    ROOM HOTEL_ID
    HOTEL ID

conversion example.anonymizer.conversions.ParseDigits
transformation example.anonymizer.transformations.PostCodeGeneralization
distribution example.anonymizer.distributions.MinPerParent

// Pure Anonymizations
task Anonymize
{
    // Anonymize - Mask various fields
    update CUSTOMER Anonymize_CUSTOMER
        // Create random norwegian phone number
        mask PHONE CUSTOMER_PHONE
            format "+47 %d"
            random-integer 10001000 99909990
        // Create random name from list of firstnames and lastnames
        mask NAME CUSTOMER_NAME
            format "%s %s"
            file src/main/resources/firstname.txt random-order
            file src/main/resources/lastname.txt random-order
        // Create email based on the newly created name
        mask EMAIL CUSTOMER_EMAIL
            format %s@%s
            transform Email
            unique
            column NAME
            file src/main/resources/email.txt random-order
        // Create random creditcard with checksum that validates
        mask CREDITCARD CUSTOMER_CREDITCARD
            format "41428340%d"
            transform CreditCard
            random-integer 10001000 99919991
    // Anonymize - Randomize
    update ROOMCATEGORY Anonymize_ROOMCATEGORY
        // Add 1% gaussian noise to hide the value from search
        randomize INITIALPRICE ROOMCATEGORY_INITIALPRICE
            type decimal
            format %.2f
            convert String2Decimal
            offset 0.0
            flat-noise 0.0
            percentage-noise 1.0
    // SUB-SETTING - removes some records including multiple dependencies
    delete HOTELCHAIN
        where "ID = 0"
        {
            cascade HOTEL
                parent ID
                child CHAIN_ID
            {
                cascade BOOKING
                    parent ID
                    child HOTEL_ID
                cascade HOTELROOMCATEGORY
                    parent ID
                    child HOTEL_ID
                cascade ROOM
                    parent ID
                    child HOTEL_ID
            }
        }
    // Simple Generalization
    update ADDRESS Fix_ADDRESS
        mask POSTALCODE ADDRESS_POSTALCODE
            format %s
            transform PostCodeGeneralization
            column POSTALCODE convert ParseDigits
}
// Inserting new random data
task "Create"
{
    // Creating records in parent table
    create HOTELCHAIN
        minimum-rows 5
        mask ID HOTELCHAIN_ID
            format %d
            sequence -1 1
        mask NAME HOTELCHAIN_NAME
            format "%s's Hotels"
            file src/main/resources/lastname.txt random-order
    // Creating records in child table
    create HOTEL
        mask ID HOTEL_ID
            format %d
            unique
            sequence -1 1
        mask NAME HOTEL_NAME
            format "%s's Hotel"
            file src/main/resources/firstname.txt random-order
        mask LOCATION HOTEL_LOCATION
            format %sstown
            file src/main/resources/town.txt random-order
        mask LOGO HOTEL_LOGO
            format %s.png
            file src/main/resources/logo.txt random-order
        // Divide Hotels per Chain with a deviation of 1
        distribute MinPerParent ""
            // Divide Hotels per Chain with a deviation of 1
            table HOTELCHAIN 2
                child CHAIN_ID
                parent ID
    create ROOM
        minimum-rows 50
        mask ROOMNO ROOM_ROOMNO
            format %d
            random-integer 101 399
        mask FLOOR ROOM_FLOOR
            format %d
            random-integer 1 4
        mask BALCONY ROOM_BALCONY
            format %d
            random-integer 0 1
        mask HEADING ROOM_HEADING
            format %d
            random-integer 1 4
        mask ID ROOM_ID
            format %d
            unique
            sequence -1 1
        // Every hotel should have a room of each category
        distribute AllCombinations ""
            table ROOMCATEGORY ""
                child CATEGORY_ID
                parent ID
            table HOTEL ""
                child HOTEL_ID
                parent ID
}
// Using mappings and anonymizing primary keys
task Advanced
{
    // Export anonymization to mapping file
    update HOTEL Anonymize_HOTEL
        // Output results to an encrypted file
        shuffle NAME HOTEL_NAME
            map hotelmap.txt output encrypted
    // Use a Mapping file as input
    update ADDRESS Anonymize_ADDRESS
        mask HOMEADDRESS ADDRESS_HOMEADDRESS
            format %s
            column HOMEADDRESS
            map address_map.txt input
    // Update primary key
    update ROOMCATEGORY Anonymize_ROOMCATEGORY_PK
        mask ID ROOMCATEGORY_ID
            format %s
            unique
            sequence -1 1
            temporary-value 999999
            propagate HOTELROOMCATEGORY.ROOMCATEGORY_ID, BOOKING.ROOMCATEGORY_ID, ROOM.CATEGORY_ID
    // Update PK with auto-generated value
    update BOOKING Anonymize_BOOKING
        // The ID is auto-incremented by Derby, but still possible to assign
        mask ID BOOKING_ID
            format %d
            unique
            sequence -1 1
            temporary-value 999999
        randomize FROMDATE BOOKING_FROMDATE
            type date
            format %tF
            convert String2Date
            offset 300.0
            flat-noise 5.0
            percentage-noise 0.0
        randomize TODATE BOOKING_TODATE
            type date
            format %tF
            convert String2Date
            offset 300.0
            flat-noise 5.0
            percentage-noise 0.0
        randomize BOOKINGCREATED BOOKING_BOOKINGCREATED
            type datetime
            format "%1$tF %1$tT"
            convert String2DateTime
            offset 10.0
            flat-noise 0.0
            percentage-noise 0.0
        randomize EARLIESTCHECKINTIME BOOKING_EARLIESTCHECKINTIME
            type time
            format %tT
            convert String2Time
            offset 10.0
            flat-noise 10.0
            percentage-noise 0.0
    // Shuffle PK - needs a temp key on the Dependencies node
    update ROOM Anonymize_ROOM
        shuffle ID ROOM_ID
            temporary-value 555
    // Multi column PK
    update HOTELROOMCATEGORY Anonymize_HOTELROOMCATEGORY
        // Update a column in multi column PK
        mask FROMDATE HOTELROOMCATEGORY_FROMDATE
            format %s
            random-date 2020-01-01 2022-12-31
            temporary-value "1900-01-01"
        mask ACTUALPRICE HOTELROOMCATEGORY_ACTUALPRICE
            format %s
            random-decimal 499.00 2599.00
        // Set todate=fromdate
        mask TODATE HOTELROOMCATEGORY_TODATE
            format %s
            column FROMDATE
        // Add a lot of days
        randomize TODATE HOTELROOMCATEGORY_TODATE_ADD
            type date
            format %tF
            convert String2Date
            offset 365.0
            flat-noise 10.0
            percentage-noise 0.0
}
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
// Subject Access Request - based on customer number
task SubjectAccess
{
    sar CUSTOMER SAR_CUSTOMER
        where "CUSTOMERNO = %PARAMETER%"
            mask CREDITCARD
            mask CUSTOMERNO
            mask EMAIL
                transform Email
            mask NAME
            mask PASSWORD
        {
            cascade ADDRESS
                parent CUSTOMERNO
                child CUSTOMER_CUSTOMERNO
                mask HOMEADDRESS
                mask POSTALCODE
                mask ID
            cascade BOOKING
                parent CUSTOMERNO
                child CUSTOMER_CUSTOMERNO
                mask FROMDATE
                mask TODATE
                mask ID
                mask HOTEL_ID
                mask ROOMCATEGORY_ID
        }
}
```

</details>
