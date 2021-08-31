---
sidebar_position: 1
id: intro
---


# Introduction

**[Esito news blog link](https://www.esito.no/en/news/)**

## What is Anonymizer?

### Anonymizer turns domain knowledge into code

The introduction of GDPR has major implications for the processing of personal and sensitive data. Read about our cloud services that support requirements imposed by GDPR.

...

...

### Anonymizer consists of 3 steps

1. Extract your database structure as code
2. Write masking and anonymization rules as code
3. Generate desired anonymization software

## How does it work?

### Steps to the process

1. Extract your RDBMS database schema structure as SQL CREATE TABLE statements, and translate this into the ANO language using DBano
2. Write Masking and anonymization rules as code in ANO language
3. Generate desired end product using DBmasker or DBerase

&nbsp;

## Verbose -  How does it Work?

1. Our DBano service can translate your RDBMS database schema into standardized ANO syntax, regardless of your database SQL dialect (Oracle, SQl Server, Postrgres, MySql, etc.). This results in an .ano file.
2. You write rules into this .ano file containing your database schema in ANO syntax. These rules then defines every masking and anonymization operations you require, including
    - creating data
    - updating data
    - deleting data
3. You then provide your .ano file to one of our services DBmasker or DBerase, generating a software as per your needs.
