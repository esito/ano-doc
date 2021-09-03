---
sidebar_position: 1
label: process-overview
---

# User Process Overview

## Using Anonymizer requires you to

1. Translate all table definitions  of your database schema into ANO syntax, in an `.ano` file.
    - This is automated using our DBano Service
    - All database dialects are supported (Oracle, SQL Server, Postgres, MySql, etc. )
2. Write anonymization logic as code using the ANO language at the end of this same `.ano` file.
3. Pass the `.ano` file into one of our code generators DBmasker or DBerase. This yields a Java 8 Maven project.
    - Configure the database connection inside this project. Correct database driver dependency (in `pom.xml`) and correct database connection string (in `config.properties`).
4. Build the project. For DBmasker, run the resulting JAR-file from the command line. For DBerase deploy the webservice.

