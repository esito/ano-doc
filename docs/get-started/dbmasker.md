---
sidebar_position: 1
id: dbmasker-esito
---

# DBmasker

ref: <https://www.esito.no/en/dbmasker/>

The introduction of GDPR has major implications for the processing of personal and sensitive data. The DBmasker tools make it easy to create JDBC applications that provide compliance to various GDPR requirements and DBmasker can produce databases anonymized for test- and development.

DBmasker is a stateless cloud service that generates anonymization programs based on simple inputs written in the ANOnymization language ANO.

## How can DBmasker help you?

- Change data through masking and anonymization

- Create a subset of databases for test and development

- Create synthetic data that complies to your test cases

- Same masking across many tables and databases

- Protect developers from person identifiable data

&nbsp;

## How does it work?

- Write rules expressed in an intuitive and easy to understand language

- DBmasker generates the masking program

![alt text](/img/docs/dbmasker_esito.png 'DBmasker Esito')

&nbsp;

## DBmasker: Changes data through masking and anonymization

- Make data unrecognizable: you can mask, shuffle and randomize data using inputs from many sources
- Enables you to anonymize person identifiable data like names and social security numbers
- Define masking and anonymization rules using sequences, random selections, data from files and database columns
- Decide which data to mask using where clauses and parameters selection
- Get usable data for developers in test/development without possibility to identify someone
- Extend with your own algorithms for type conversion and value transformation securing correct value or syntax
- Make your own rules and add them into different tasks, each one run separately or combined

```ano
// Sample code for data masking
task Anonymize
    // Anonymize - Mask various fields
    update CUSTOMER
        // Create random norwegian phone number
        mask PHONE
            format "+47 %d"
            random integer 10001000 99909990
        // Create names from list of firstnames and lastnames,
        // two parameters format
        mask NAME
            format "%s %s"
            file src/main/resources/firstname.txt random-order
            file src/main/resources/lastname.txt random-order
        // Create random creditcard with checksum that validates
        mask CREDITCARD
            format 41428340%d
            // Ensure that the number is valid
            transform CreditCard
            random integer 10001000 99919991
```

&nbsp;

## DBmasker: Creates a subset of your database

- Reduce database size for test purposes. A production database is often big and it takes time to create copies. A reduced size database makes every day life better for developers
- Removal of data instances supports referential integrity in any depth. One simple definition may remove data from many tables dependent on each other
- You may add dependencies if foreign key definitions are missing
- Scale down and keep representative data for test

```ano
// SUB-SETTING - remove records with multiple dependencies, depth first
delete HOTEL where "ID < 1000" {
    cascade BOOKING
    parent ID
    child HOTEL_ID {
        cascade STAY
        parent ID
        child BOOKING_ID {
            cascade NIGHT
            parent SERIALNO, CUSTOMER_CUSTOMERNO
            child STAY_SERIALNO, STAY_CUSTOMER_CUSTOMERNO
        }
    }
    cascade ROOM
    parent ID
    child HOTEL_ID {
        // The NIGHTs may have been removed already
        cascade NIGHT
        parent ID
        child ROOM_ID
    }
    // There migth be STAYs without BOOKINGs
    cascade STAY
    parent ID
    child LOCATION_ID {
        cascade NIGHT
        parent SERIALNO, CUSTOMER_CUSTOMERNO
        child STAY_SERIALNO, STAY_CUSTOMER_CUSTOMERNO
    }
}
```

&nbsp;

## DBmasker: Creates synthetic data to deal with special test cases

- Get quickly started from empty database, adding data content defined by mask rules
- Create records supporting your special test cases
- Data creation supports referential integrity in any depth
- Adding children with flexible distribution of foreign keys across all tables
- Extend with your own defined algorithm for distribution of child records

```ano
// Insert new data
task "Create"
// Creating records in parent table
create HOTELCHAIN
    minimum-rows 5
    mask ID
        format %d
        sequence -1 1
    mask NAME
        format "%s's Hotels"
        file src/main/resources/hotelchain.txt random-order
// Creating records in child table HOTEL
create HOTEL
    mask ID
        format %d
        unique
        sequence -1 1
    mask NAME
        format "%s's Hotel"
        file src/main/resources/hotel.txt random-order
    // Divide Hotels per HotelChain with a deviation of 1
    distribute MinPerParent ""
        // Divide Hotels per HotelChain with a deviation of 1
        table HOTELCHAIN 2
            child CHAIN_ID
            parent ID
```

&nbsp;

## DBmasker: Same masking across many tables and databases

- Supports referential integrity over several tables in any depth
- Manual added dependencies will act as good as foreign keys
- Add integrity for logical pointers across all relevant databases using mapping and encryption
- The generated program may be used towards different RDBMSs
- Your test RDBMS may be different from your production RDBMS

```ano
task Advanced
// Export anonymization to mapping file
update HOTEL
    // Output results to an encrypted file
    shuffle NAME
        map hotelmap.txt output encrypted
// Use a Mapping file as input
update COMPANY
    // Reuse masking from another database
    mask NAME
        map company_name.txt input
```

## DBmasker: Protects developers from person identifiable data

- Developers/testers will often be exposed for data they shouldn’t see
- Use DBmasker to anonymize, mask, subset and create data for test and development databases
- DBmasker improves and speeds up development of data masking and anonymization
- GDPR changes the development processes

![alt text](/img/docs/g9maskdata.png 'g9 Mask data')

&nbsp;

## DBmasker: Rules expressed in an intuitive and easy to understand language

- DBmasker has a DSL tailored to create data masking and anonymization code
- DBmasker compiles the rules into java
- DBmasker supports JDBC database drivers
- DBmasker ANO syntax description

```ano
// Sample schema definitions
table CUSTOMER
    column integer CUSTOMERNO size 10
    column text NAME size 40
    column text CREDITCARD size 16
    column text EMAIL size 40
    column text PHONE size 20
    primary-key CUSTOMERNO
    unique NAMEINDEX NAME
  
table INVOICE
    column integer INVOICENO size 10
    column text INVOICETEXT size 100
    column decimal VALUE size 10 scale 2
    column integer CUSTOMER_CUSTOMERNO size 10
    primary-key INVOICENO
  
foreign-key
    INVOICE CUSTOMER_CUSTOMERNO
    CUSTOMER CUSTOMERNO
```

## DBmasker: Generates the masking program

- Generates a program from your masking and anonymization rules
- The program does it all, your obligation is only to run it
- No lock-in, you can maintain the generated code separately
- Supports JDBC based RDBMS like Oracle, SQL Server, Sybase, MySQL, PostgreSQL
- May be run as CLI program or be embedded in your application of choice
- Simple, repeatable, and easy to use. You may run the generated program many times
- DBmasker generator service

![alt text](/img/docs/dbmasker_console.png 'DBmasker console')
