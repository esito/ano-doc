---
sidebar_label: FAQs
sidebar_position: 20
id: faqs
---

# FAQs - Frequently Asked Questions

## Is DBmasker standalone, or must it be integrated into my Software?

DBmasker provides a standalone application.
It does not need to be integrated into your own software or applications.
It is it meant to be run against your database only. And only when a database needs anonymization.
E.g., every time a database is copied from production to the test or development databases.

## How can DBmasker be run against my database?

You provide the database connector and the database connection string to the generated DBmasker application.
The database connector is specified inside the `pom.xml`, and the connection string is specified in the `src/main/resources/config.properties` file.

## Can I run DBmasker on a my OS?

Yes. Since DBmasker is a Java application it is operative system agnostic. It requires you to have the Java Runtime Environment installed.
