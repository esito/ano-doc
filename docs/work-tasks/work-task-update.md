---
sidebar_position: 2
sidebar_label: Update
---

# Update
<!-- markdownlint-disable MD033 - makes html allowed -->

The **update** Work Task lets you write Rules that anonymizes (changes or replaces) the values in table columns.

A common use case is to run all **update** Work Tasks against your development database, right after production data has been copied into it.

```ano
task AllUpdateTasks {                                   // Task Group
    ...
    update CUSTOMER Anonymize_CUSTOMER                          // update Work Task
        sql-before "delete from CUSTOMER where CUSTOMER_NAME is null" selection-key CUSTOMER_NAME
        // Create random norwegian phone number
        mask PHONE CUSTOMER_PHONE
            format "+47 %d"
            random-integer 10001000 99909990
        // Create random name from list of firstnames and lastnames
        mask NAME CUSTOMER_NAME
            format "%s %s"
            file src/main/resources/firstname.txt random-order
            file src/main/resources/lastname.txt random-order
    ...
}
```

## Task Group Structure

<figure>
  <img src="/img/docs/ano-syntax/task.png" alt=""/>
 <figcaption> The Ano Structure of the Task Group </figcaption>
</figure>

A Task Group is initialized as following:

1. The keyword `task` (**Required**)
2. A user defined `Task Group Name` (**Required**)
3. SQL statements (**Optional**)
4. Followed by curly brackets `{...}` (**Required**)
   - Work Tasks are defined within these brackets.

```ano
task MyGroupTaskName
sql-before "<SQL STATEMENT>" // Optional
...
sql-after "<SQL STATEMENT>"  // Optional
...
{
    <Work Tasks>
    ...
}
```

## Work Task Structure

<figure>
  <img src="/img/docs/ano-syntax/update.png" alt=""/>
 <figcaption> The Ano Structure of the update Work Task </figcaption>
</figure>

A Work is initialized as following:

1. Work Task keyword: (**Required**)
   - `update`, `create`, `delete`, `erase`, or `sar`
2. `table name` (**Required**)
3. A user defined `Work Task Name` (**Optional**)
4. SQL statements (**Optional**)
5. SQL `WHERE` clause (**Optional**)
6. Anonymizations (**Required**)

```ano
task MyGroupTaskName
{
    update CUSTOMER MyWorkTaskName          // Defaults to update_CUSTOMER without MyWorkTaskName
        sql-before "<SQL Statement>"        // Optional
        sql-after "<SQL statement>"         // Optional
        where "<SQL statement>"             // Optional
        <Anonmyzations>               
        
    ...
}
```

## Anonymization Structure

<figure>
  <img src="/img/docs/ano-syntax/anonymization.png" alt=""/>
 <figcaption> The Ano Structure of the Anonymization Rules </figcaption>
</figure>

An anonymization is written as following:

1. Choose anonymization keyword: (**Required**)
   - `mask`: to replace existing data with new data
   - `randomize`: to add noise to existing data, to become unrecognizable
   - `shuffle`: to reorder existing data values, and ensures no record keeps its original value
2. `map` keyword for file mapping (**Optional**)
   - use map to update similar values in another database
   - output file with key/value pairs for writing data to file
   - input file with key/value pairs for masking anonymization
3. `temporary-value` keyword to set a temporary value on primary keys or unique keys (**Optional**)
4. `propagate` (**Optional**)
   - Use propagate to update foreign keys with the same value as the primary key mask

## Anonymizations Rules

According to whether you do table `update`, `create`, `delete`, `erase` or `sar`, you will create rules. A rule act on one column, but can be propagated to other tables and a column there.

There are 3 Rule types

- **`mask`**
- **`randomize`**
- **`shuffle`**

Resulting anonymizations can be in an any of the following format types:

- string
- integer
- decimal
- date (yyyy-MM-dd)
- time (HH:mm:ss)
- datetime (yyyy-MM-dd HH:mm:ss)


## `mask` - rules

<figure>
  <img src="/img/docs/ano-syntax/mask.png" alt=""/>
 <figcaption> The Ano Structure of the mask Rules </figcaption>
</figure>

The rule logic for a `mask` anonymization is written as follows:

1. The keyword `mask` (**Required**)
   1. followed by the `column` name (**Required**)
   2. and your own name for this rule (**Optional?**)
2. The keyword `format` (**Required**)
   1. followed by ouput format specification (**Required**)
3. The keyword `transform` (**Optional**)
   1. followed by a predefined string transformation method. The resulting anonymization value is processed.
4. The keyword `unique`, if that is a desired constraint (**Optional**)
5. Generated value source (**Optional**)
   1. `random-[type]`
   2. `file`
   3. `column`
   4. `sequence`

### Example: Generating random and unique emails for column `EMAIL` in table `CUSTOMER`

Its using two sources: column `NAME` of the same table and a file *email.txt*.

```ano
task ... {
    UPDATE CUSTOMER
        mask EMAIL CUSTOMER_EMAIL
            format %s@%s
            transform Email
            unique
            column NAME                                     // Column input source - first %s
            file src/main/resources/email.txt random-order  // File input source   - second %s
}
```

### Generated value sources

The `mask` function masks the values of columns by replacing all or part of the data with generated values taken from various input sources. A mask may use any of the following input sources:

<table header-style="none" width="100%">
<tr>
<td>

random-[type]

</td>
<td>

The **random-[type]** input source is used to insert a value drawn from a random sequence as defined by the **from** and **to** properties. The **random-[type]** is one of

- `random-integer`
- `random-decimal`
- `random-time`
- `random-date`
- `random-datetime`

**Example:** Create random norwegian phone numbers

```ano
task ... {
    update <table>
        // Create random norwegian phone number
        mask PHONE <rule-name>
            format "+47 %d"
            random-integer 10001000 99909990      // random integer drawn from given interval

}
```

</td>
</tr>
<tr>
<td>

file

</td>
<td>

The **file** input source is used to insert a string value taken from the file defined in the file property. It picks a line from the file sequentially or randomly depending on the **random-order** property.

**Example:** Create random names from input files of firstnames and lastnames

```ano
task ... {
    update <table>
        // Create random name from list of firstnames and lastnames
        mask NAME <rule-name>
            format "%s %s"
            file src/main/resources/firstname.txt random-order // File input source - first %s
            file src/main/resources/lastname.txt random-order  // File input source - second %s

}
```

</td>
</tr>
<tr>
<td>

column

</td>
<td>

The **column** input source is used to insert the specified column value into the masked parent column. You can only specify a column from the mask table.

**Example:** set todate = fromdate

```ano
task ... {
    update <table>
        // Set todate=fromdate
        mask TODATE <rule-name>
            format %s
            column FROMDATE         // Column input source
}
```

</td>
</tr>
<tr>
<td>

sequence

</td>
<td>

The **sequence** input source is used to insert a sequence of integers into the column records starting with the **start** property value and incremented by the **increment** property value.

**Example:** auto increment starting at the highest (which is specified as from but not inlcuding -1), with increments of 1

```ano
task ... {
    update <table>
        // The ID is auto-incremented beginning, with increments of 1 
        mask ID <rule-name>
            format %d
            unique
            sequence -1 1           // Sequence input source
            temporary-value 999999
}
```

</td>
</tr>
</table>

### `format` - Format Types

The `format` denotes the masking result and may be a combination of literal string values and format strings using java.util.Formatter. Use "" if there are spaces.

<table width="100%" >
<tr>
<th width="15%">

Format

</th>
<th width="15%">

Input

</th>
<th >

Use format with following generated value source types:

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

- `file`
- `column`

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

- `sequence`
- `random-integer`

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

- `random-decimal`

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

- `random-date`

"yyyy-MM-dd" (ISO 8601 formatted dates)

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

- `random-time`

"HH:mm:ss" (24-hour time format)

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

- `random-datetime`

"yyyy-MM-dd HH:mm:ss" (Database Timestamp format)

</td>
</tr>
</table>

Without any format specifications the value is regarded as a constant. The text constant NULL is regarded as SQL NULL.

Each format parameter must be mached with one input source. Eiher:

- `random-[type]`
- `file`
- `column`
- `sequence`

See more examples at [Java String Format Examples](https://dzone.com/articles/java-string-format-examples).

The transform **TRANSFORMATION** class is one of the classes defined in the user defined transformation classes section. The transform() method takes String as input and delivers a String object. The class must implement the ITransformation interface. See **Email** and **CreditCard** as samples below.

## `randomize` - rules

<figure>
  <img src="/img/docs/ano-syntax/randomize.png" alt=""/>
 <figcaption> The Ano Structure of the randomize Rule Logic </figcaption>
</figure>

The `randomize` function is used to **apply noise** on one of the following format types:

- integer
- decimal
- date
- time
- datetime

1. The keyword `randomize` (**Required**)
   1. followed by the `column` name (**Required**)
   2. and your own name for this rule (**Optional**)
2. The keyword `type` (**Required**)
   1. followed by the name of the format type (e.g. `integer`, `decimal`, `date`, `time`, or `datetime`)
3. The keyword `format` (**Required**)
   1. followed by `double quoted string` containing the string format (**Required**)
4. The keyword `convert` (**Required**)
   1. The input value to the anonymization is passed through the convert.
   2. Why? Input must be 'string'.
5. The keyword `transform` (**Optional**)
   1. The output value of the anonymization is passed through the transformation method.
6. The keyword `unique` if that is a desired constraint (**Optional**)

The algorithm is useful for hiding transactional data, whereby it maintains approximate values but changes it significantly to make it hard to recognize. Supported types are Integer, Decimal, Date, Time and DateTime.

### random

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


## `shuffle` Rules

## Propagate
