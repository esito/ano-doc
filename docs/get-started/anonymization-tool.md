---
sidebar_position: 4
id: anonymization-tool-esito
---
# Anonymization Tool

## Tools for anonymizing test data

ref: https://www.esito.no/en/products/anonymizer/

Supports GDPR Subject Access Requests and Right to erasure

&nbsp;

## Anonymizer databases

Data Anonymization is a process that deals with the protection of private and sensitive data. It involves masking or making data illegible using various techniques. These techniques convert identifiable data into an unidentifiable form that includes encryption, replacement of data with random values, or just deleting data.

GDPR requires that personal data be handled in a secure manner (§32) and that an impact assessment (§35) be performed. All use of personal data requires the data subject’s consent (§7), which makes it impractical to use personal data in a test database. Personal data must be sufficiently anonymized if a copy of a production database is used as a test database. A test database should ideally contain synthetic data, but sometimes testing requires more realistic data.

The g9 Anonymizer provides fully programmable anonymization logic. It is easy to repeat and can be performed across multiple databases. It can also delete data which is convenient when the data is too large. The database can also have data created from scratch with synthetic data or you can mix anonymization with synthetic data for special requirements.
You can perform the following on a database for testing and development:

- Mask data with random numbers, incremental number sequences, values from another column or values from a text file
- Shuffle data records creating new permutations
- Randomize numeric data by adding Gaussian noise
- Create a mapping file so that the same masking can be applied to other databases
- Delete records to reduce database size
- Create new synthetic content for an empty database

&nbsp;

## GDPR Support

The General Data Protection Regulation (GDPR) is a regulation that requires organizations to protect the consumer's data, prevent abuse, help correctness and ensure portability, including the right to delete and the right of access. It requires organizations to quickly respond to deletion or information requests. Failure to comply with these regulations may lead to sanctions.

GDPR provides data subjects with ownership of their data. This guarantees the data subjects access rights (§15) and data portability (§20), consent for use and sharing (§7), right to correction (§16) and deletion (§17), notification when data is changed, treated or has a deviation (§19). All this must also be recorded (§30). The g9 Anonymizer not only has tools for anonymizing test databases but can also create Java JDBC programs that can delete and anonymize specific data such as deleting or retrieving consent. The g9 Anonymizer can also help with the requirement of data portability and access by exporting the data into machine readable form such as JSON and XML.

The g9 Anonymizer can

- Provide support for data portability and access rights
- Support the right to delete and right to withdraw consent

&nbsp;

## How does it work?


The figure shows how g9 Anonymizer works:

- Database Copy: Create a copy of your production database.
- Fetch model: Import the data structure from a running database into g9 Anonymizer.
- g9 Anonymizer: The data structure displayed in an editor with database information and rule definitions.
- Anonymization Rules: Definition of your tasks, be it anonymization rules, inspection reports and/or deletions.
- Generates: The Java Anonymization Program application will be automatically created. You can override code.
- Anonymize: Run the program against the database that you are going to anonymize. You will get a database that can be used for testing and development purposes.
- GDPR: You may integrate the application into your GDPR support infrastructure.

![alt text](/img/docs/g9_ano_process.png "DBano Web")

&nbsp;

## Tools and Technology

The technology consists of Java, JDBC and Maven. The g9 Anonymizer comes as an Eclipse plugin where an anonymization project is created where you can easily model the rules. The generated Java / JDBC code is easy to maintain and is completely modifiable. It is built by Maven to a JAR file, which also contains Javadoc and source code. The all-inclusive JAR file can be run for anonymization of test databases or integrated into other programs for other GDPR tasks such as export for portability and access or deletion / withdrawal.

The g9 Anonymizer is a suite of plugins for Eclipse and works seamlessly with Eclipse Java projects.
- Uses JDBC against a database
- Generates a Java application
- Uses the Eclipse IDE platform

&nbsp;

## Self-documentation

The database schema and the defined rules function as documentation of the system. It controls the generation of the anonymization program and will therefore always be "up to date". This allows new project participants to get started quickly and easily make changes to the project.
