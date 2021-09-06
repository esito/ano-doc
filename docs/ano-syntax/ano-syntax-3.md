---
sidebar_position: 4
sidebar_label: Tasks and Rules Sections
---


# The tasks and rules section

A Task is either a TaskGroup or a WorkTask. TaskGroups can have infinite child tasks of both kinds while WorkTasks only contain rules. A WorkTask is one of update, create, delete, erase or sar. Naming tasks follow these rules:

- Group tasks names must be unique while work task names must be unique within a group task
- Group tasks on the same level in the task hierarchy must have unique names
- Work tasks on the same level in the task hierarchy must have unique names
- Group tasks cannot have the same name as any of the work tasks it contains. If the work task does not have an explicit defined name it is the default name that is forbidden, i.e. the work task Delete HOTEL gets by default the name Delete_HOTEL
- The name comparison is case insensitive to prevent file name collisions on case insensitive file systems

Running TaskGroups, will run all child tasks in defined sequence. Running WorkTasks, will run all tasks with same name regardless of which TaskGroup they belong and in the sequence they are defined.

We will often use the common phrase task both for TaskGroup and WorkTask.

A TaskGroup contains tasks which can be both TaskGroups and WorkTasks. The purpose is to group tasks as an entity.

A WorkTask is one of

- update - mask and make data unrecognizable
- delete - sub setting database to reduce size
- create - create records for testing
- erase - remove obsolete data
- sar - create reports from database

A Rule defines anonymizations/masking on data and consists of

- mask - anonymize data
- randomize - add noise to numbers
- shuffle - reorder data sequence

WorkTasks are detailed by Rules.

Through out of this documentation, we will be using the phrases taskgroup and worktask, or the common task.

&nbsp;

The example below consists of two tasks: **Anonymize** (taskgroup) and **update_CUSTOMER** (worktask) and two masking rules for NAME and EMAIL.

##  Mask

```ano
// Pure Anonymizations
task Anonymize {
    // Anonymize - Mask various Customer fields
    update CUSTOMER
        // Create random name from list of firstnames and lastnames
        mask NAME
            format "%s %s"
            file src/main/resources/firstname.txt random-order
            file src/main/resources/lastname.txt random-order
        // Create email based on the newly created name
        mask EMAIL
            format %s@%s
            transform Email // Use built-in transformation class
            unique
            column NAME
            file src/main/resources/email.txt random-order
}
```

&nbsp;

##  Creating Tasks

A task is one of

<table header-style="none" width="100%" >
<tr>
<td width="15%">

task

</td>
<td>

A combination of tasks, both taskgroups and worktasks.

</td>
</tr>

<tr>
<td>

update

</td>
<td>

Updates or Anonymizations are organized by table and performed on one or more of its columns and on columns from dependent tables (i.e. foreign keys). The table anonymizations are organized by task and the table anonymization node contains separate child nodes for each column that is to be anonymized.

</td>
</tr>

<tr>
<td>

create

</td>
<td>

In test and development environments it is often necessary to work with various test data for developing and testing different scenarios. With Create data for Table, you can insert rows into database tables with sample data and also create records for child tables that are linked together by foreign keys.

It is important to define the creation of data for parent tables before defining the creation of data for the child tables and then ensure that the relation via the foreign keys are defined. You can use the masking to assign data to the columns and if you are using an external file for the data source and you don't select the random order option, the tasks can be constructed so that the database contains the exact same data each time the tasks are run.

You can also specify the distribution of foreign keys used in child records by specifying one of the various distribution algorithms supplied or you can create a customized distribution for your own purposes. If a parent table is referenced by many child foreign keys, a distribution algorithm may be defined for a group of child tables.

</td>
</tr>

<tr>
<td>

delete

</td>
<td>

When creating a test or development environment, it is often necessary to perform a full copy of the production database in order to acquire a proper data set. This may result in a data set that is too large and unmanageable, often requiring an analysis of the data content and structure to delete data in order to shrink the database size. This is often called database subsetting.

When determining the records that need to be deleted, it is important to understand the structure so that the correct table data deletion sequence is followed. However, if the database has proper foreign key definitions, dbMasker can facilitate the process of establishing all dependent tables. Start with tables that have no parent tables and decide on which data in the tables to delete. All dependent data in dependent tables following the foreign key structure, will also be automatically marked for deletion. You may remove any dependency or manually add dependencies on other tables.

</td>
</tr>

<tr>
<td>

erase

</td>
<td>

The erase task allows you to combine anonymizations (masking) and deletions. This may be used to anonymize or remove obsolete data. It may also be used to support GDPR §17 [The right to Erasure](https://gdpr-info.eu/art-17-gdpr/) or Right to be forgotten in [GDPR](https://gdpr-info.eu/) or other privacy regulations. It may also help with consent withdrawal related to [GDPR §7](https://www.privacy-regulation.eu/en/article-7-conditions-for-consent-GDPR.htm) .

</td>
</tr>

<tr>
<td>

sar

</td>
<td>

A subject access request (SAR) is a concept in GDPR that describes requests by individuals to an organization to see copies of all information that relates to them. This includes any personal data and reasons for its use.The sar task allows you to output information stored about an individual into multiple source files supporting a JavaScript Object Notation (JSON) format and XML format. These source files can be used by various readers to provide the requested information. This gives the user a way to verify data correctness and if necessary request corrections or deletions of personal information.

</td>
</tr>
</table>

&nbsp;

##  task

![alt text](/img/docs/ano-syntax/task.png 'Task')

The **TASK** represents a task name and **sql** represents SQL statements run before and after the task defined operations.

The update, create, delete, erase and sar are all worktasks and may be run as a task with the implicit name given by the task type and the TABLE name as in "update_CUSTOMER". A NAME may be given and it will override the implicit name.

> The **update**, **create**, **delete**, **erase** and **sar** are all worktasks and may be run as a task with the implicit name given by the task type and the TABLE name as in "update_CUSTOMER". A **NAME** may be given and it will override the implicit name.

&nbsp;

###  sql

![alt text](/img/docs/ano-syntax/sql.png 'Sql')

The **SQL** represents complete SQL statements. The statement must be written inside double quotes ("statement”) and any occurrences of double quotes or backslash must be escaped with a backslash: \" and \\. There will be no check of SQL syntax and a statement cannot be divided on serveral lines. Multiple SQL statements may be written divided by newline.

&nbsp;

###  update

![alt text](/img/docs/ano-syntax/update.png 'Update')

Used for anonymizing/updating one or more columns for a specified table. Additional anonymization rules based on columns of the selected table may be added. See anonymization rules.

```ano
update ARTIST sql-before "delete from ARTIST where NAME is null" selection-key NAME
```

or

```ano
update ARTIST myTaskName sql-before "delete from ARTIST where NAME is null" selection-key NAME
```

The first statement has no task name specification, giving the taskname update_ARTIST. Thesecond sample specifies a task name, giving it the task name myTaskName.

&nbsp;

###  create

![alt text](/img/docs/ano-syntax/create.png 'Create')

In test and development environments it is often necessary to work with test data for developing and testing different scenarios. With **create** TABLE, you can insert rows into database tables with sample data and also create records for child tables that are linked together by foreign keys.

It is important to define the creation of data for parent tables before defining the creation of data for child tables and then ensure that the relation via the foreign keys are defined. Additional **anonymization mask** rules to assign data to the columns can be added and if you are using an external file for the data source and you don't select the **random** order option, the tasks can be constructed so that the database contains the exact same data each time the tasks are run.

You can also specify the distribution of foreign keys used in child records by specifying one of the various distribution algorithms supplied or you can create a customized distribution for your own purposes. If a **parent** table is referenced by many **child** foreign keys, a distribution algorithm may be defined for a group of child tables.

The **minimum-rows POSINT** value ensures that the table will have at least minimum-rows records inserted.

&nbsp;

###  distribute

![alt text](/img/docs/ano-syntax/distribute.png 'Distribute')

The **DISTRIBUTION** denotes an algorithm that ensures consistency between parent and child tables via foreign keys. The class must implement the IDistribution interface.

The **DISTRIBUTION** class can be one of the built-in classes or defined in the user defined distribution classes section. The sample below uses the built-in class **AllCombinations**. It ensures that all possible combinations of ROOM rows connected to HOTEL and ROOMCATEGORY are created.

```
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

&nbsp;

###  delete

![alt text](/img/docs/ano-syntax/delete.png 'Delete')

Used for deleting a sub-set of data from a specified table and records from referenced tables. Cascading deletes of dependent tables is supported and shown in the sample code below.

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

&nbsp;

###  cascade

![alt text](/img/docs/ano-syntax/cascade.png 'Cascade')

```
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

&nbsp;

###  erase

![alt text](/img/docs/ano-syntax/erase.png 'Erase')

Used for erasing records in a table by anonymizing specified columns and deleting records from it's referenced tables, or masking specified columns in the referenced tables. It contains a parameterized condition bases on the selected tables primary key.

&nbsp;

###  eraseTable

![alt text](/img/docs/ano-syntax/eraseTable.png 'Erase table')

&nbsp;

```
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

&nbsp;

###  simpleMask

![alt text](/img/docs/ano-syntax/simpleMask.png 'Simple mask')

&nbsp;

###  sar - Subject Access Requests

![alt text](/img/docs/ano-syntax/sar.png 'Sar')

Used for creating data for Subject Access Requests reports. The exported data comes in the form of a xml or json file. It contains a parameterized condition bases on the selected tables primary key.

&nbsp;

###  sarTable

![alt text](/img/docs/ano-syntax/sarTable.png 'Sar table')

```
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

&nbsp;

###  selectionKey

![alt text](/img/docs/ano-syntax/selectionKey.png 'Selection key')

Possible selection keys are the primary key and unique indexes. The default selection key is the primary key defined for the table.

&nbsp;

###  where

![alt text](/img/docs/ano-syntax/where.png 'Where')

The **EXPRESSION** represents a logical expression. The expression must be written inside double quotes ("expression”) and any occurrences of double quotes or backslash must be escaped with a backslash: \" and \\.

The worktasks update, delete, erase and sar can all have a where clause defined to filter the data rows.

The worktasks delete, erase and sar can take values entered in a command or the API. This is defined in the where clause with the **%PARAMETERn%** notation. **Note**: You can use %PARAMETER% instead of %PARAMETER1%.

####  %PARAMETER% use

```
erase CUSTOMER
    where "CUSTOMERNO = %PARAMETER%"
        mask NAME format "firstname lastname"
        mask EMAIL format epost@email.com

Command use: erase customer 1000234
```

####  %PARAMETERn% use

```
erase COUNTRY
    where City = %PARAMETER1% AND country_id = (SELECT country_id FROM country WHERE country = %PARAMETER2%)

Command use: erase country Paris France
```

&nbsp;

###  child

![alt text](/img/docs/ano-syntax/child.png 'Child')

&nbsp;

###  parent

![alt text](/img/docs/ano-syntax/parent.png 'Parent')

&nbsp;

##  Creating masking/anonymization rules

Anonymizations are organized by table and performed on one or more of its columns and on columns from dependent tables (i.e. foreign keys). The table anonymizations are organized by worktasks and the table anonymization statement contains separate statements for each column that is to be anonymized.

An anonymization rule is one of

<table header-style="none" width="100%" >
<tr>
<td width="10%">

mask

</td>
<td>

The **mask** function masks the values of columns by replacing all or part of the data with generated values taken from various input sources. A mask may have several parameters based on one or more of the following:

<table header-style="none" width="100%">
<tr>
<td width="10%">

column

</td>
<td>

The **column** input source is used to insert the specified column value into the masked parent column. You can only specify a column from the mask table.

</td>
</tr>

<tr>
<td>

file

</td>
<td>

The **file** input source is used to insert a string value taken from the file defined in the file property. It picks a line from the file sequentially or randomly depending on the **random-order** property.

</td>
</tr>

<tr>
<td>

random-[type]

</td>
<td>

The **random-[type]** input source is used to insert a value drawn from a random sequence as defined by the **from** and **to** properties. The **type** is one of **integer**, **decimal**, **time**, **date**, **datetime** and is used as in **random-integer**.

</td>
</tr>

<tr>
<td>

sequence

</td>
<td>

The **sequence** input source is used to insert a sequence of integers into the column records starting with the **start** property value and incremented by the **increment** property value.

</td>
</tr>
</table>

</td>
</tr>

<tr>
<td >

randomize

</td>
<td>

The **randomize** function is used to apply noise on numeric and date column values. The algorithm is useful for hiding transactional data, whereby it maintains approximate values but changes it significantly so as to make it hard to recognize.

</td>
</tr>

<tr>
<td >

shuffle

</td>
<td>

The **shuffle** function reorders the column values in a random order and ensures that no record retains the original column value.

</td>
</tr>
</table>

&nbsp;

###  anonymization

![alt text](/img/docs/ano-syntax/anonymization.png 'Anonymization')

The **anonymization** may get values from a mapping file, produce mapping to a file or both. A **temporary value** may be defined for columns that are primary keys or unique columns. It allows you to define a temporary key that is used to temporarily set as the value before the system reads through all records.

&nbsp;

###  map

![alt text](/img/docs/ano-syntax/map.png 'Map')

The **map input** function uses a mapping file containing key/value pairs (Key=Value) to update columns using the mapped value. The system reads the column value and checks if the mapping file has a corresponding key. If there is a key found, the column value is replaced with the mapped value. The mapping file is typically produced from another anonymizing rule using **map output** and could have originated in another database. With this function, it is possible to store the mapping values from one database, and apply those values to similar columns in another database. This ensures that both anonymized databases contain the same values.

The **map output** function produces a mapping file containing key/value pairs (Key=Value) from the anonymization rule.

The **map input-output** function uses the mapping file and produces the mapping file with key/value pairs (Key=Value), if there a new or missing values in the map file.

**FILE** is the file name and the content may be **encrypted**.

```
// Update primary key
update COMPANY
    // Reuse masking from another database
    mask NAME map company_name.txt input
```

&nbsp;

###  propagate

![alt text](/img/docs/ano-syntax/propagate.png 'Propagate')

```
// Update primary key
update INVOICE
    //Save the real and masked values on a file with encryption
    mask INVOICENO map "invoicemask.txt" output encrypted
        format %d
        unique
        sequence -1 1
        propagate STAY.INVOICE_INVOICENO //Update foreign key also
```

Use **propagate** to update foreign keys with the same value as the primary key mask and use map to update similar values in another database.

###  mask

![alt text](/img/docs/ano-syntax/mask.png 'Mask')

The **mask** function masks the values of columns by replacing all or part of the data with generated values taken from various input sources.

The **FORMAT** denotes the masking result and may be a combination of literal string values and format strings using java.util.Formatter. Use "" if there are spaces.

<table width="100%" >
<tr>
<th width="15%">

Format

</th>
<th width="15%">

Input

</th>
<th >

Description

</th>
</tr>
<tr>
<td>

%s

</td>
<td>

String

</td>
<td>

Use with File and Column input

</td>
</tr>
<tr>
<td>

%d

</td>
<td>

Integer

</td>
<td >

Use with Sequence and Random of Integer type

</td>
</tr>
<tr>
<td>

%f

</td>
<td>

Decimal

</td>
<td >

Use with Randomization and Random of Decimal type

</td>
</tr>
<tr>
<td>

%tF

</td>
<td>

Date

</td>
<td >

ISO 8601 formatted date "yyyy-MM-dd"

</td>
</tr>
<tr>
<td>

%tT

</td>
<td>

Time

</td>
<td >

24-hour time format "HH:mm:ss"

</td>
</tr>
<tr>
<td>

%1\$tF %1\$tT

</td>
<td>

DateTime

</td>
<td >

Database Timestamp format "yyyy-MM-dd HH:mm:ss"

</td>
</tr>
</table>

&nbsp;

Without any format specifications the value is regarded as a constant. The text constant NULL is regarded as SQL NULL. Each format parameter must be mached with one of **sourceRandom**, **sourceFile**, **sourceColumn** or **sourceSequence**.

See more examples at [Java String Format Examples](https://dzone.com/articles/java-string-format-examples).

The transform **TRANSFORMATION** class is one of the classes defined in the user defined transformation classes section. The transform() method takes String as input and delivers a String object. The class must implement the ITransformation interface. See **Email** and **CreditCard** as samples below.

&nbsp;

###  sourceSequence

![alt text](/img/docs/ano-syntax/sourceSequence.png 'Source sequence')

The **sequence** input source is used to insert a sequence of integers into the column starting with the first **INTEGER** value and incremented by the second **INTEGER** value. If -1 is selected, the sequence starts with the highest value stored in the column plus the increment.

&nbsp;

###  sourceColumn

![alt text](/img/docs/ano-syntax/sourceColumn.png 'Source column')

The **column** input source is used to insert the specified column value into the masked parent column. You can only specify a column from the same table. If the column being anonymized is not a string, you can use one of the conversions defined to convert the data type. See convert.

&nbsp;

###  sourceFile

![alt text](/img/docs/ano-syntax/sourceFile.png 'Source file')

The **file** input source is used to insert a string value taken from the file defined in the **FILE** terminal. It picks a line from the file sequentially or randomly depending on the **random-order** property. A conversion class can be selected to manipulate the string selected from the text file. See convert.

&nbsp;

###  sourceRandom

![alt text](/img/docs/ano-syntax/sourceRandom.png 'Source random')

&nbsp;

###  randomInteger

![alt text](/img/docs/ano-syntax/randomInteger.png 'Random integer')

&nbsp;

###  randomDecimal

![alt text](/img/docs/ano-syntax/randomDecimal.png 'Random decimal')

&nbsp;

###  randomTime

![alt text](/img/docs/ano-syntax/randomTime.png 'Random time')

&nbsp;

###  randomDate

![alt text](/img/docs/ano-syntax/randomDate.png 'Random date')

&nbsp;

###  randomDateTime

![alt text](/img/docs/ano-syntax/randomDateTime.png 'Random datetime')

All the **random-[type]** input sources is used to insert a value drawn from a random sequence as defined by the first from value and the second to value.

The sample below shows anonymizations of a CUSTOMER table using all **mask** variants.

```
update CUSTOMER
    // Create random norwegian phone number
    mask PHONE
        format "+47 %d"
        random-integer 10001000 99909990
    // Create random name from list of firstnames and lastnames
    mask NAME
        format "%s %s"
        file src/main/resources/firstname.txt random-order
        file src/main/resources/lastname.txt random-order
    // Create email based on the newly created name
    mask EMAIL
        format %s@%s
        transform Email
        unique
        column NAME
        file src/main/resources/email.txt random-order
    // Create random creditcard with checksum that validates
    mask CREDITCARD
        format 41428340%d
        transform CreditCard //Use the creditcard transformation class
        random-integer 10001000 99919991
```

&nbsp;

###  randomize

![alt text](/img/docs/ano-syntax/randomize.png 'Randomize')

The **randomize** function is used to apply noise on numeric and date column values. The algorithm is useful for hiding transactional data, whereby it maintains approximate values but changes it significantly to make it hard to recognize. Supported types are Integer, Decimal, Date, Time and DateTime.

&nbsp;

###  random

![alt text](/img/docs/ano-syntax/random.png 'Random')

All input to the randomize function is read as a string. You must therefore specify a function to convert from the String type to the input type, defined by the type property:

<table width="100%" >
<tr>
<th width="15%">

Type

</th>
<th width="15%">

Function

</th>
<th width="15%">

Return type

</th>
<th >

Expected format on string input

</th>
</tr>
<tr>
<td>

Date

</td>
<td>

String2Date

</td>
<td>

java.time.LocalDate

</td>
<td>

yyyy-MM-dd

</td>
</tr>
<tr>
<td>

DateTime

</td>
<td>

String2DateTime

</td>
<td>

java.time.LocalDateTime

</td>
<td>

yyyy-MM-dd HH:mm:ss

</td>
</tr>
<tr>
<td>

Time

</td>
<td>

String2Time

</td>
<td>

java.time.Time

</td>
<td>

HH:mm:ss

</td>
</tr>
<tr>
<td>

Integer

</td>
<td>

String2Integer

</td>
<td>

java.lang.Integer

</td>
<td>

Decimal integer with or without sign

</td>
</tr>
<tr>
<td>

Decimal

</td>
<td>

String2Decimal

</td>
<td>

java.lang.Double

</td>
<td>

Decimal number as accepted by the valueOf method in class Double

</td>
</tr>
</table>

&nbsp;

###  Anonymization for types Integer, Decimal:

<table width="100%" >
<tr>
<td width="20%">

FORMAT

</td>
<td>

Printf format for the selected type: %d or %f

</td>
</tr>
<tr>
<td width="20%">

Noise addition

</td>
<td>

Grouping of various attributes that adds noise. [Gaussian formula](https://en.wikipedia.org/wiki/Normal_distribution):
_gaussion-distribution _ (flat-noise + column value _ percentage-noise) + offset_

</td>
</tr>
<tr>
<td width="20%">

- flat-noise

</td>
<td>

Adds a +/- Gaussian distributed noise with a deviation

</td>
</tr>
<tr>
<td width="20%">

- percentage-noise

</td>
<td>

Adds a +/- Gaussian distributed noise with the magnitude as a percentage of the original value

</td>
</tr>
<tr>
<td width="20%">

offset

</td>
<td>

Adds a fixed offset to the value.

</td>
</tr>

</table>

&nbsp;

### Anonymization for types Date, DateTime

<table width="100%" >
<tr>
<td width="20%">

FORMAT

</td>
<td>

Printf format for the selected type: %tF or '%1\$tF %1\$tT'

</td>
</tr>
<tr>
<td width="20%">

Noise addition

</td>
<td>

Grouping of various attributes that adds noise. [Gaussian formula](https://en.wikipedia.org/wiki/Normal_distribution):
_gaussian-distribution _ flat-noise + offset\*

</td>
</tr>
<tr>
<td width="20%">

- flat-noise (days)

</td>
<td>

Adds a +/- Gaussian distributed noise with a deviation

</td>
</tr>
<tr>
<td width="20%">

- offset (days)

</td>
<td>

Adds a fixed number of days to the date value

</td>
</tr>
</table>

&nbsp;

###  Anonymization for Type Time

<table width="100%" >
<tr>
<td width="20%">

FORMAT

</td>
<td>

Printf format for the selected type: %tT

</td>
</tr>
<tr>
<td width="20%">

Noise addition

</td>
<td>

Grouping of various attributes that adds noise. [Gaussian formula](https://en.wikipedia.org/wiki/Normal_distribution):
_gaussian-distribution _ flat-noise + offset\*

</td>
</tr>
<tr>
<td width="20%">

- flat-noise (seconds)

</td>
<td>

Adds a +/- Gaussian distributed noise with a deviation

</td>
</tr>
<tr>
<td width="20%">

- offset (seconds)

</td>
<td>

Adds a fixed number of days to the time value

</td>
</tr>
</table>

&nbsp;

###  convert

![alt text](/img/docs/ano-syntax/convert.png 'Convert')

The convert **CONVERSION** class is one of the built-in classes or defined in the user defined conversion classes section. The convert() method takes String as input and delivers an Object. The class must implement the IConversion interface. See **String2Decimal** sample below.

```
update ROOMCATEGORY
    // Add 1% gaussian noise to hide the value from search
    randomize INITIALPRICE decimal
        format %.2f
        convert String2Decimal
        offset 0.0
        flat-noise 0.0
        percentage-noise 1.0
```

###  shuffle

![alt text](/img/docs/ano-syntax/shuffle.png 'Shuffle')

The **shuffle** function reorders the column values in a random order and ensures that no record retains the original column value.

```
update HOTEL
    // Output results to an encrypted file
    shuffle NAME
        map hotelmap.txt output encrypted //Write the mapping to a file, use encryption
```
