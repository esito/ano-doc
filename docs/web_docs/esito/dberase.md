# DBerase

ref: https://www.esito.no/en/dberase/

The introduction of GDPR has major implications for the processing of personal and sensitive data. The DBerase tools make it easy to create JDBC applications that provide compliance to various GDPR requirements and DBerase can produce REST services for GDPR Right to Erasure support.

DBerase is a stateless cloud service that generates REST services based on simple inputs written in the ANOnymization language ANO.

&nbsp;

## How can DBerase help you?

DBerase generates REST services that

- Change data through removal, masking and anonymization

- Remove data across many tables and databases

&nbsp;

## How does it work?

- Write rules expressed in an intuitive and easy to understand language

- DBerase generates the REST services that remove, mask and anonymize data

![alt text](/img/docs/dberase_esito.png 'DBerase Esito')

## DBerase: Change data through removal, masking and anonymization

- Make data unrecognizable: you can mask and anonymize
- Perform “Forget me” using a combination of removal and masking of data
- Decide which data to process using where clauses and parameters selection

```ano
// Forget Me - based on customer number
task ForgetMe {
    erase CUSTOMER
        where "CUSTOMERNO = %PARAMETER%"
        // mask name and email with text constants
            mask NAME format "firstname lastname"
            mask EMAIL format epost@email.com
                transform Email
        { // mask address and post code with constants
            cascade ADDRESS
                parent CUSTOMERNO
                child CUSTOMER_CUSTOMERNO
                mask HOMEADDRESS format "Home address"
                mask POSTALCODE
                    transform PostCodeGeneralization
        }
}
```

&nbsp;

## DBerase: Remove data across many tables and databases

- Supports referential integrity over several tables in any depth
- Manual added dependencies will act as good as foreign keys
- Add integrity for logical pointers across all relevant databases using mapping and encryption

```ano
// Remove the Customer and all dependent data
task Remove
    erase CUSTOMER Erase_CUSTOMER
        where "CUSTOMERNO = %PARAMETER%"
        {
            cascade ADDRESS
                parent CUSTOMERNO
                child CUSTOMER_CUSTOMERNO
            cascade BOOKING
                parent CUSTOMERNO
                child CUSTOMER_CUSTOMERNO
            {
                cascade STAY
                    parent ID
                    child BOOKING_ID
                {
                    cascade NIGHT
                        parent SERIALNO, CUSTOMER_CUSTOMERNO
                        child STAY_SERIALNO, STAY_CUSTOMER_CUSTOMERNO
                }
            }
        }
```

&nbsp;

## DBerase: Write rules expressed in an intuitive and easy to understand language

- DBerase has a DSL tailored to define data masking, anonymization and removal
- DBmasker compiles the rules into java
- DBmasker supports JDBC database drivers
- DBerase ANO syntax description

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

&nbsp;

## DBerase: Generates the REST services that remove, mask and anonymize data

- Generates Spring Boot REST services from your defined rules
- No lock-in, you can maintain the generated code separately
- Supports JDBC based RDBMS like Oracle, SQL Server, Sybase, MySQL, PostgreSQL
- May be run directly or be embedded in your application of choice
- DBerase generator service

Sample use of the generated services using Swagger:

![alt text](/img/docs/erase_swagger.png 'Erase swagger')
