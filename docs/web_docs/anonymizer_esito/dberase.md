---
sidebar_position: 1
id: dberase-anonymizer-esito
---

# DBerase

> DBerase is a service that helps organizations manage the tasks
> associated with forget me functionality. Every organization need
> to support customers/clients with this. It allows the user to
> create multiple forget me tasks, each performing deletions,
> masking or anonymization actions.

> The process involves the following:

1.  Identifying customer/client data that needs to be
    deleted, masked or anonymized

2.  Writing a set of rules in the domain-specific language (ANO),
    that masks or deletes data and organizes them into tasks.
    We recomend writing ANO using the VSCode-extension - <a target='_blank' rel='noopener noreferrer' href='http://anonymizer-doc.esito.no/help/topic/no.esito.g9.doc.dbservices/DBerase.html'> ANO extension</a>

3.  Generating a Java Spring Boot Web program with all tasks
    as REST APIs based on your defined rules, using the DBerase service

4.  Deploying the generated Web program, which publishes the REST API
    that performs the forget me tasks on the target database(s)

<img src="https://www.esito.no/img/dberase.png" alt='dberase' />

- No lock-in, you can maintain the generated code separately

- Supports JDBC based RDBMS like Oracle, SQL Server, Sybase,
  MySQL, PostgreSQL and H2

### Documentation

<a
   target='_blank'
   rel='noopener noreferrer'
   href='http://anonymizer-doc.esito.no/help/topic/no.esito.g9.doc.dbservices/DBerase.html'>
Get started with DBerase
</a>
