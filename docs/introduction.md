---
sidebar_label: Introduction
sidebar_position: 1
id: intro
---


# Get Started

With Anonymizer you can generate Java applications that can be automated and run whenever you like. These will perform database masking tasks for you, according to your logic.

## What services do Anonymizer provide?

Anonymizer provides you with the following services:

- [Anonymizer DBmasker](./products/dbmasker-product.md)
- [Anonymizer DBerase](./products/dberase-product.md)
- [Anonymizer DBano](./products/dbano-product.md)
- [Anonymizer ANO DSL Language](#)

### Challenges introduced by GDPR

The two main challenges Anonymizer addresses are:

- Developers need copies of production data so they can properly do development and testing. The challenge then is that they shouldn't see actual customer data.
- Customers have the right to know what data about them are stored. They also have the right to require data deletion from the systems.

### Anonymizer - Our solution for you

Anonymizer provides you with services tailored to your database. These are services for

- Masking of existing data
- Synthetic data generation
- Data erasure

Anonymizer utilizes the ANO domain specific language (DSL) for writing masking, generating, and erasing rules. Using the ANO language, you will be able to write cascading logic and advanced rules for handling edge cases in your database design. You will write an `.ano` file that will contain all your rules.

The two services we provide are

- **DBmasker**: Helps you anonymize (a copy of) your entire database.
  - Provides you with an application that masks data according to your logic. Whenever you copy your production database to test or development environments, you simply run this application against the database copy in test and development environments.
- **DBerase**: Helps your customers erase personal data in production database.
  - Provides you a web service with a REST endpoint against your production database. According to your logic, you can either delete, mask or decouple customer data on request.


&nbsp;

## [Get Started with DBmasker](./get-started/get-started-with-dbmasker/process-overview.md)

### Blog

**[Esito news blog](https://www.esito.no/en/news/)**
