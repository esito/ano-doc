---
sidebar_position: 2
id: dbmasker-product
---

# DBmasker

Ref: https://esito-conf.inmeta.com/display/DBMAS/DBmasker

# Introduction

Data anonymization is all about protecting private and sensitive data. It involves masking or obfuscating data using various techniques. These techniques typically convert identifiable personal data into a non-identifiable form which includes encrypting data, scrambling data, replacing data with random values or simply deleting data. This removes the ability to identify individuals and ensures that sensitive data becomes anonymous.

# Why anonymize data

Rapid technological development and globalization have created new challenges with regard to protection of sensitive and private data. Data is often shared among organizational departments or even among other organizations. Given the sensitivity of personal data, especially among the financial and healthcare industries, data needs protection from external and internal misuse. Many organizations violate privacy policies when copying sensitive production data to non-production environments such as testing, development, training and analytics or sharing/publishing information to third parties. This can be avoided by using data anonymization.

In addition to protecting sensitive data, there are privacy issues that deal with personal data protection of individual citizens. Regulations such as the General Data Protection Regulation (GDPR) are forcing organizations to provide better ownership of personal data including the right of erasure and subject access request which requires organizations to promptly erase or report personal data if requested by the individual. Failure to comply with the law can result in sanctions.

# DBmasker

DBmasker is a service that helps organizations manage the tasks associated with masking data in a robust and secure manner. It allows the user to create multiple tasks, each performing different masking or anonymization actions. The process involves the following:

1. Identifying sensitive data that needs to be masked/anonymized
2. Writing a set of rules in a masking/anonymizing domain-specific language (ANO) that masks, deletes or creates data and organizes them into tasks
3. Generating a Java program from your masking and anonymization rules, using the DBmasker service
4. Deploying the generated Java program and performing the masking on the target database(s)

![alt text](/img/docs/dbmasker_graph.png 'DBmasker graph')

<br/>

DBmasker generates a java program from your masking and anonymization rules.

- The generated program does it all, your obligation is only to run it
- No lock-in, you can maintain the generated code separately
- Supports JDBC based RDBMS like Oracle, SQL Server, Sybase, MySQL, PostgreSQL
- May be run as CLI program or be embedded in your application of choice
- Simple, repeatable, and easy to use. You may run the generated program many times

The following contains:
