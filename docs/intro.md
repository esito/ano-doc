---
sidebar_label: Introduction
sidebar_position: 0
id: intro
---

# Introduction

:::tip Anonymizer

Anonymizer provides you with the ANO developing language to anonymize databases.

- No proprietary software installation
- No Database Service Provider lock-in
- No fuzz

Simply write your desired anonymization logic as code. Then generate a Java application using [our services](services/overview-services). Then run this application whenever you need to populate or anonymize your database tables.

::: 

## Get Started

- [Quickstart](quickstart)

- [Our Services](services/overview-services)

- [Introducing the ANO Domain Specific Language](from-sql-to-ano/overview-from-sql-to-ano.mdx)

- [ANO Tasks](tasks/overview-tasks)
  
- [ANO Rules](rules/overview-rules)

---

## Challenges introduced by GDPR

The main challenge Anonymizer addresses is:

- Developers and testers need copies of production data so they can properly do development and testing. The challenge then is that they shouldn't see actual production data.
- Developers and testers need to create production-like data from scratch, since they either don't have access to production data, or they don't yet exist.

---

## Anonymizer - Our solution for you

Anonymizer provides you with services tailored to your database. These are services for

- Anonymization of existing data
- Synthetic data generation

Anonymizer utilizes the ANO domain specific language (DSL) for writing tasks and rules for anonymization. ANO lets you write advanced rules with propagating logic to handle constraints and edge cases in your database design. Your tasks and rules will be written in an  `.ano` file.

The services we provide are

- **DBano**: Generates an `.ano` file that lets you create anonymization logic.
  - The DBano service requires all your table `create` statements. It translates these from different database dialects to the the agnostic `ano` DSL language. The `.ano` file is where you will write anonymization rules.
- **DBmasker**: Generates for you an application based upon the `.ano` file, that will help you anonymize (a copy of) your entire database.
  - Generates a Java application that has been tailored according to the logic in the `.ano` file, to anonymize your data according to your logic. Whenever you copy your production database to test or development environments, you simply run this application against the database copy in test and development environments.

