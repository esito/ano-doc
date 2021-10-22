---
sidebar_position: 1
sidebar_label: Overview 
---

# Work Tasks Overview

## Work Task Types - Details

A **Work Task** is organized by database table. The Work Task type defines what kind of Rules can be applied.
Each Rule in a Work Task applies to one of the columns of a table.

Work Tasks can *propagate/cascade/distribute* changes done to a table to its child (dependent) tables, using foreign keys.

<table header-style="none" width="100%" >
<tr>
<th>

Types

</th>
<th>

Details

</th>
</tr>
<tr>
<td>

update

</td>
<td>

**update** lets you write Rules that anonymizes (changes or replaces) the values in table columns.

The same changes and replacements can be applied to columns of child tables (i.e., using foreign keys).

See [update](#update) for more details.

</td>
</tr>

<tr>
<td>

create
</td>
<td>

**create** lets you write Rules to insert rows of synthetic data,
and also create rows for child tables that are linked together by foreign keys.

See [create](#create) for more details.

</td>
</tr>

<tr>
<td>

delete

</td>
<td>

**delete** lets you write Rules to delete data.
Common use case is database subsetting - to reduce the development database size.

See [delete](#delete) for more details.

</td>
</tr>

<tr>
<td>

erase

</td>
<td>

**erase** lets you write anonymizing and deletion Rules of records, using parameters provided at runtime.

The idea is that specific data records identified by column values, such as specific IDs,
names or dates, is to be anonymized or deleted upon request.

See [erase](#erase) for more details.

</td>
</tr>

<tr>
<td>

sar

</td>
<td>

**sar:** Subject Access Request

**sar** lets you extract information stored about an individual (or entity)
into multiple source files supporting JSON and XML formats.

See [sar](#sar) for more details.

</td>
</tr>
</table>

## Use Cases for Work Task Types

<table header-style="none" width="100%" >
<tr>
<th>

Types

</th>
<th>

Use Cases

</th>
</tr>
<tr>
<td>

update

</td>
<td>

This is the standard way of anonymizing the data of an entire database for testing and development purposes.

Common use strategy:

  1. Dump the whole database from production to development environment
  2. Do **update** Work Tasks to anonymize sensitive columns in development environment
  3. Grant developers and testers access to the anonymized data in the development database

</td>
</tr>

<tr>
<td>

create

</td>
<td>

If the organization does not allow production data to be copied into testing and development environments,
you may want to create synthetic (or fake) data for the testing and development databases.

With the **create** type Work Task,
you can insert rows into database tables with sample data
and also create records for child tables that are linked together by foreign keys.

</td>
</tr>

<tr>
<td>

delete

</td>
<td>

When creating a test or development environment,
it is often necessary to perform a full copy of the production database in order to acquire a proper data set.

This may result in a data set that is too large and unmanageable.
You may want to reduce its size for the testing and development environments.
This is called database subsetting, and **delete** lets you do this.

</td>
</tr>

<tr>
<td>

erase

</td>
<td>

Erase differs from create/update/delete in that it is meant to be used against a production database.
There are two main use cases:

1. Delete obsolete data - for example when data ages.
2. Delete or mask specific customer - upon user request.

This will help your organization adhere to GDPR §17 [The right to erasure](https://gdpr-info.eu/art-17-gdpr/)
(right to be forgotten) in [GDPR](https://gdpr-info.eu/) and other privacy regulations.
It may also help with consent withdrawal related to
GDPR §7 [Conditions for consent](https://www.privacy-regulation.eu/en/article-7-conditions-for-consent-GDPR.htm).

</td>
</tr>

<tr>
<td>

sar

</td>
<td>

A subject access request (SAR) is a concept in GDPR.
It describes requests by individuals to an organization to see copies of all information that relates to them.

This includes any personal data and reasons for its use.
The **sar** type Work Tasks allows you to output information stored about an individual into multiple source files
supporting JSON and XML formats.

These source files can be used by various readers to provide the requested information.
This gives the user a way to verify data correctness and if necessary, request corrections or deletions of personal information.

</td>
</tr>
</table>

## task

![alt text](/img/docs/ano-syntax/task.png 'Task')

The **TASK** represents a task name and **sql** represents SQL statements run before and after the task defined operations.

The update, create, delete, erase and sar are all Work Tasks,
and may be run as a task with the implicit name given by the task type and the TABLE name e.g., "update_CUSTOMER".
A NAME may be given and it will override the implicit name.

> The **update**, **create**, **delete**, **erase** and **sar** are all Work Tasks and,
may be run as a task with the implicit name given by the task type and the TABLE name as in "update_CUSTOMER".
A **NAME** may be given and it will override the implicit name.

### sql

![alt text](/img/docs/ano-syntax/sql.png 'Sql')

The **SQL** represents complete SQL statements. The statement must be written inside double quotes ("statement”)
and any occurrences of double quotes or backslash must be escaped with a backslash: \" and \\.
There will be no check of SQL syntax and a statement cannot be divided on several lines.
Multiple SQL statements may be written divided by newline.

### update

![alt text](/img/docs/ano-syntax/update.png 'Update')

Used for anonymizing/updating one or more columns for a specified table.
Additional anonymization rules based on columns of the selected table may be added.
See anonymization rules.

```ano
update ARTIST sql-before "delete from ARTIST where NAME is null" selection-key NAME
```

or

```ano
update ARTIST myTaskName sql-before "delete from ARTIST where NAME is null" selection-key NAME
```

The first statement has no task name specification, giving the taskname update_ARTIST.
The second sample specifies a task name, giving it the task name myTaskName.

### create

![alt text](/img/docs/ano-syntax/create.png 'Create')

In test and development environments it is often necessary to work with test data for developing and testing different scenarios.
With **create** TABLE, you can insert rows into database tables with sample data
and also create records for child tables that are linked together by foreign keys.

It is important to define the creation of data for parent tables before defining the creation of data for child tables
and then ensure that the relation via the foreign keys are defined.
Additional **anonymization mask** rules to assign data to the columns can be added
and if you are using an external file for the data source and you don't select the **random** order option,
the tasks can be constructed so that the database contains the exact same data each time the tasks are run.

You can also specify the distribution of foreign keys used in child records
by specifying one of the various distribution algorithms supplied,
or you can create a customized distribution for your own purposes.
If a **parent** table is referenced by many **child** foreign keys,
a distribution algorithm may be defined for a group of child tables.

The **minimum-rows POSINT** value ensures that the table will have at least minimum-rows records inserted.

### distribute

![alt text](/img/docs/ano-syntax/distribute.png 'Distribute')

The **DISTRIBUTION** denotes an algorithm that ensures consistency between parent and child tables via foreign keys.
The class must implement the IDistribution interface.

The **DISTRIBUTION** class can be one of the built-in classes or defined in the user defined distribution classes section.
The sample below uses the built-in class **AllCombinations**.
It ensures that all possible combinations of ROOM rows connected to HOTEL and ROOMCATEGORY are created.

``` ano
create ROOM minimum-rows 50
    mask ROOMNO
        format %d
        random-integer 101 399
    mask BALCONY
        format %d
        random-integer 0 1
    mask ID
        format %d
        unique
        sequence -1 1
    // Every hotel should have a room of each category
    distribute AllCombinations "" //Use built-in distribution class
        table ROOMCATEGORY ""
            child CATEGORY_ID
            parent ID
        table HOTEL ""
            child HOTEL_ID
            parent ID

```

### delete

![alt text](/img/docs/ano-syntax/delete.png 'Delete')

Used for deleting a subset of data from a specified table and records from referenced tables.
Cascading deletes of dependent tables is supported and shown in the sample code below.

When determining the records that need to be deleted,
it is important to understand the structure so that the correct table data deletion sequence is followed.

However, if the database has proper foreign key definitions,
DBmasker can facilitate the process of establishing all dependent tables.
Start with tables that have no parent tables and decide on which data in the tables to delete.
All dependent data in dependent tables following the foreign key structure will also be automatically marked for deletion.

If database does not have proper foreign key definitions,
you may remove any dependency or manually add dependencies on other tables.

The 3 cascading delete methods have different performance of deleting a hierarchy of records. The characteristics are:

- cascading
  - Children are deleted first, and the parent last
  - Generally works without disabling constraints
  - Slow performance (one by one)
- not-exists
  - Parent is deleted first
    - DELETE FROM parent WHERE XX
  - Thereafter all orphans are deleted using
    - DELETE FROM child WHERE NOT EXISTS (SELECT \* FROM parent WHERE parent.id = child.parent_id)
  - Fastest, but constraints must be disabled
- not-in
  - Parent is deleted first
  - Thereafter all orphans are deleted using
    - WHERE child.parent_id NOT IN (SELECT DISTINCT parent.id FROM parent)
  - Fast, but constraints must be disabled

### cascade

![alt text](/img/docs/ano-syntax/cascade.png 'Cascade')

``` ano
delete HOTELCHAIN where "ID = 0" {
    cascade HOTEL parent ID child CHAIN_ID {
        cascade BOOKING parent ID child HOTEL_ID {
            cascade STAY parent ID child BOOKING_ID {
                cascade NIGHT parent SERIALNO, CUSTOMER_CUSTOMERNO
                child STAY_SERIALNO, STAY_CUSTOMER_CUSTOMERNO
            }
        }
    }
}
```

### erase

![alt text](/img/docs/ano-syntax/erase.png 'Erase')

Used for erasing records in a table by anonymizing specified columns and deleting records from it's referenced tables,
or masking specified columns in the referenced tables.
It contains a parameterized condition bases on the selected tables primary key.

This may be used to anonymize or remove obsolete or unwanted data.
It may also be used to support GDPR §17 [The right to Erasure](https://gdpr-info.eu/art-17-gdpr/)
or Right to be forgotten in [GDPR](https://gdpr-info.eu/) or other privacy regulations.
It may also help with consent withdrawal related to
 [GDPR §7](https://www.privacy-regulation.eu/en/article-7-conditions-for-consent-GDPR.htm) .

### eraseTable

![alt text](/img/docs/ano-syntax/eraseTable.png 'Erase table')

``` ano
erase CUSTOMER
    where "CUSTOMERNO = %PARAMETER%"
        mask NAME format "firstname lastname"
        mask EMAIL format epost@email.com
    {
        // Anonymize identifiable columns
        cascade ADDRESS
            parent CUSTOMERNO
            child CUSTOMER_CUSTOMERNO
            mask HOMEADDRESS format "Home address"
            mask POSTALCODE format 1234
    }

```

### simpleMask

![alt text](/img/docs/ano-syntax/simpleMask.png 'Simple mask')

### sar

**sar** stands for Subject Access Request

![alt text](/img/docs/ano-syntax/sar.png 'Sar')

Used for creating data for Subject Access Requests reports. The exported data comes in the form of a xml or json file.
It contains a parameterized condition bases on the selected tables primary key.

These source files can be used by various readers to provide the requested information.
This gives the user a way to verify data correctness and if necessary request corrections or deletions of personal information.

NOTE that **sar** is the only Work Task type that only reads, and performs no change on the database.

A subject access request (SAR) is a concept in GDPR,
that describes requests by individuals to an organization to see copies of all information that relates to them.
This includes any personal data and reasons for its use.

### sarTable

![alt text](/img/docs/ano-syntax/sarTable.png 'Sar table')

``` ano
sar CUSTOMER
    where "CUSTOMERNO = %PARAMETER%"
        mask CREDITCARD
        mask CUSTOMERNO
        mask EMAIL
        mask NAME
    {
        cascade STAY parent CUSTOMERNO child CUSTOMER_CUSTOMERNO
            mask SERIALNO
            mask BOOKING_ID
            mask INVOICE_INVOICENO
            mask LOCATION_ID
        {
            cascade NIGHT parent SERIALNO, CUSTOMER_CUSTOMERNO
            child STAY_SERIALNO, STAY_CUSTOMER_CUSTOMERNO
                mask ID
                mask DATE
                mask PRICE
                mask ROOM_ID
        }
        cascade BOOKING parent CUSTOMERNO child CUSTOMER_CUSTOMERNO
            mask FROMDATE
            mask TODATE
            mask ID
            mask HOTEL_ID
    }

```

### selectionKey

![alt text](/img/docs/ano-syntax/selectionKey.png 'Selection key')

Possible selection keys are the primary key and unique indexes.
The default selection key is the primary key defined for the table.

### where

![alt text](/img/docs/ano-syntax/where.png 'Where')

The **EXPRESSION** represents a logical expression. The expression must be written inside double quotes ("expression”)
and any occurrences of double quotes or backslash must be escaped with a backslash: \" and \\.

The Work Tasks update, delete, erase and sar can all have a where clause defined to filter the data rows.

The Work Tasks delete, erase and sar can take values entered in a command or the API.
This is defined in the where clause with the **%PARAMETERn%** notation. **Note**: You can use %PARAMETER% instead of %PARAMETER1%.

#### %PARAMETER% use

``` ano
erase CUSTOMER
    where "CUSTOMERNO = %PARAMETER%"
        mask NAME format "firstname lastname"
        mask EMAIL format epost@email.com

Command use: erase customer 1000234
```

#### %PARAMETERn% use

``` ano
erase COUNTRY
    where City = %PARAMETER1% AND country_id = (SELECT country_id FROM country WHERE country = %PARAMETER2%)

Command use: erase country Paris France
```

### child

![alt text](/img/docs/ano-syntax/child.png 'Child')

### parent

![alt text](/img/docs/ano-syntax/parent.png 'Parent')
