---
sidebar_position: 1
id: intro
---


# Introduction

**[Esito news blog link](https://www.esito.no/en/news/)**

## What is Anonymizer?

### The problems introduced by GDPR

Your developers needs a copy of your real databases so they can properly do development and testing. But you do not want them to see any identifiable and sensitive customer data. Or you are requested by a particular customer to delete all their personally identifiable data in your systems.

### Anonymizer - Our solution for you

Anonymizer delivers to you the ANO domain specific langauge for writing anonymizing, masking, data generating, and data deleting rules so you can properly manage the de-identification of all your sensitive data fields in your RDBMS databases.

 Anonymizer provides you with code generation services:

- DBmasker generates Java source code for the tasks. Compiling this gives you an application, where all your anonymization rules are organized into tasks.
- DBerase generates Java source code for the tasks. This is then deployable as a webservice with REST Endpoints for deleting or masking data on request, based on chosen IDs.

Using the ANO language, you will be able to write cascading logic and intricate rules for handling edge cases in your database design.

&nbsp;

## Steps to the process

1. Extract your database structure as code - using our DBano service
2. Write masking and anonymization rules as code
3. Use our generators for desired anonymzation tool