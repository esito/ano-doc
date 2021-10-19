---
sidebar_label: Introduction
sidebar_position: 1
id: intro
---


# Get Started

With Anonymizer you can generate Java applications that can be automated and run whenever you like. These can perform database anonymization tasks for you, according to your logic.

## What services do Anonymizer provide?

Anonymizer provides you with the following services:

- [Anonymizer DBmasker](./services/dbmasker-product.md)
- [Anonymizer DBano](./services/dbano-product.md)
- [Anonymizer ANO DSL Language](#)

### Challenges introduced by GDPR

The main challenge Anonymizer addresses is:

- Developers and testers need copies of production data so they can properly do development and testing. The challenge then is that they shouldn't see actual customer data.
- Developers and testers need to create production-like data from scratch, since they either don't have access to production data, or they don't yet exist.

### Anonymizer - Our solution for you

Anonymizer provides you with services tailored to your database. These are services for

- Anonymization of existing data
- Synthetic data generation
- Subject Access Request

Anonymizer utilizes the ANO domain specific language (DSL) for writing masking and generating rules. Using the ANO language, you will be able to write propagating logic and advanced rules for handling edge cases in your database design. You will write an `.ano` file that will contain all your rules.

The services we provide are

- **DBano**: Generates an `.ano` file that lets you create anonymization logic.
  - The DBano service requires all your table `create` statements. It translates these from different database dialects to the the agnostic `ano` DSL language. The `.ano` file is where you will write anonymization rules.
- **DBmasker**: Generates for you an application based upon the `.ano` file, that will help you anonymize (a copy of) your entire database.
  - Generates a Java application that has been tailored according to the logic in the `.ano` file, to anonymize your database according to your logic. Whenever you copy your production database to test or development environments, you simply run this application against the database copy in test and development environments.


&nbsp;

## [Get Started with DBmasker](./get-started-with-dbmasker/dbmasker-get-started-overview.md)

### Blog

**[Esito news blog](https://www.esito.no/en/news/)**
