---
sidebar_position: 5
label: generating-application
---

# Step 3 - Generate and Configure your Application

:::info Goals

We will generate the Java source code using the DBmasker service and then configure it as follows:

   1. Configure database driver settings to the project `pom.xml`
   2. Configure database connection settings in `src/main/resources/config.properties`
   3. (Optional) Add your custom data files to /src/main/resources

*(Optional) Since you are given the Java source code, you are invited to write your own customizations in /src/main/java. Visit our [Code Customization section](../custom-code/overview-code-customization.md) for details.*
:::

## Generate DBmasker project

### Log into [Anonymizer Dashboard](https://dev.esito.no/auth/dashboard/home)

<img src="/img/docs/ano_dashboard.png" width="800" />

1. Select the DBmasker Service.
2. Upload the `<schema>.ano` file and click Download Zip File, which gives you the Java project

## 1. Configure database driver settings

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

## 2. Configure database connection settings in config.properties

Edit the config file at `src/main/resources/config.properties`, to contain the correct database connection parameters.

### Example: config.properties for a localhost SQL Server

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

## 3. (Optional) Setup your custom data

- Add your custom data files to /src/main/resources

### *(Optional) Setup your custom code*

Visit our [Code Customization Section](../custom-code/overview-code-customization.md) for details on how to write your own customizions.

:::tip Next Step

Having successfully obtained your **`target/<file-name>-0.0.1.jar`**, you are now ready to run it from the command line.

:::
