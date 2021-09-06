---
sidebar_position: 5
label: generating-software
---

# Step 3 - Generate your software and configure its database connection

:::info Goals

1. We want to generate a DBmasker project to help you run your tasks as defined in the `.ano` file against your database.

2. In order for it to properly connect to your database, you will want to do two things
   1. Add the correct database package dependency to the project `pom.xml`
   2. Add the correct database connection string to the src/
:::


## Generate DBmasker project

### Log into [Anonymizer Dashboard](https://dev.esito.no/auth/dashboard/home)

<img src="/img/docs/ano_dashboard.png" width="800" />

1. Select the DBmasker Service.
2. Upload the `<schema>.ano` file and click Download Zip File, which gives you the Java project

## Configure database connection

Open the Maven project. It runs on

- Java 1.8 (Java 8)
- Maven 3.6.1

### Edit the pom.xml

You must add the correct Maven JDBC Driver dependency.

#### Tips:

- Take a look at this [blog](https://vladmihalcea.com/jdbc-driver-maven-dependency/) which may give a hint to which provider to use
- Visit [Maven Repository](https://mvnrepository.com/search?q=jdbc) and search for your particular database provider
- If you have an existing Maven / Gradle project connected to the database, take a look at its dependency. 
- The dependency **must be Java 8 compatible**

#### Sql Server dependency example

```xml
    ...
    <dependency>
      <groupId>com.microsoft.sqlserver</groupId>
      <artifactId>mssql-jdbc</artifactId>
      <version>9.4.0.jre8</version> <!-- Note jre8, not jre11 or jre16 -->
    </dependency>
    ...
```

### Edit the config.properties

Edit the config file at `src/main/resources/config.properties`, to contain the correct database connection parameters.

#### Example: config.properties for a localhost SQL Server

```properties
# Database connection parameters
connection.host         = localhost
connection.port         = 1433
connection.db           = master
connection.schema       = ano_hotel_simple
connection.user         = sa
connection.password     = A1b2c3d4e5!
connection.driverClass  = com.microsoft.sqlserver.jdbc.SQLServerDriver
connection.url          = jdbc:sqlserver://localhost:1433;database=master
file.encryptionkey      = 
sql.wrapper             = "
```

### Build the target JAR file

In the command line, or using Maven Tools, run the command:

> mvn install

This will give your desired executable anonymization file **`target/<file-name>-0.0.1.jar`** (e.g. `target/ano_hotel_2-0.0.1.jar`)

:::tip Next Step

Having successfully obtained your **`target/<file-name>-0.0.1.jar`**, you are now ready to run it from the command line.

:::
