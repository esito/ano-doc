---
sidebar_position: 2
sidebar_label: Database Schema Information
---

# The schema section of the .ano file

The schema section defines the database structure in a simplified syntax:

## Sample schema section

```ano
// - - - SECTION 1 - DATABASE SCHEMA INFORMATION - - - //
table CUSTOMER
    column integer CUSTOMERNO
    column text NAME size 40
    column text CREDITCARD
    column text EMAIL
    column text PASSWORD
    column text PHONE
    column integer CUSTODIAN
    primary-key CUSTOMERNO
    unique NAMEINDEX NAME

table INVOICE
    column integer INVOICENO
    column text INVOICETEXT
    column decimal VALUE size 20 scale 2
    column integer CUSTOMER_CUSTOMERNO
    primary-key INVOICENO

foreign-key
    INVOICE CUSTOMER_CUSTOMERNO
    CUSTOMER CUSTOMERNO
```

The schema part is simplified SQL statements. You may convert SQL schema files to the ANO form by using the DBano service, which takes SQL as input and delivers an equivalent ANO file. The syntax is described as follows:

&nbsp;

## Schema

![alt text](/img/docs/ano-syntax/schema.png 'Schema')

The **TABLE** and **COLUMN** non-terminals represent a table and a column name.

&nbsp;

### type

![alt text](/img/docs/ano-syntax/type.png 'Type')

The **TYPE** non-terminal represents some type value not covered by standard types.

&nbsp;

### size

![alt text](/img/docs/ano-syntax/size.png 'Size')

The column size is given by the **size POSINT** value and the scale on decimal numbers is given by the **scale POSINT** where **POSINT** is a positive integer.

&nbsp;

### pk - Primary Key

![alt text](/img/docs/ano-syntax/pk.png 'Primary Key')

&nbsp;

### unique

![alt text](/img/docs/ano-syntax/unique.png 'Unique')

**INDEX-NAME** is the name of the index.

&nbsp;

### fk - Foreign Key

![alt text](/img/docs/ano-syntax/fk.png 'Foreign Key')

The **setnull** terminal indicates that the association represented by the foreign key, may exist.

&nbsp;

### columns

![alt text](/img/docs/ano-syntax/columns.png 'Columns')

&nbsp;

### to/from

![alt text](/img/docs/ano-syntax/to.png 'to/from')

&nbsp;