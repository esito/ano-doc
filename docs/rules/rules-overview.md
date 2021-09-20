---
sidebar_position: 1
sidebar_label: Overview
---

# Rules Overview

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

## anonymization

![alt text](/img/docs/ano-syntax/anonymization.png 'Anonymization')

The **anonymization** may get values from a mapping file, produce mapping to a file or both. A **temporary value** may be defined for columns that are primary keys or unique columns. It allows you to define a temporary key that is used to temporarily set as the value before the system reads through all records.

### map

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

### propagate

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

## mask

![alt text](/img/docs/ano-syntax/mask.png 'Mask')

The **mask** function masks the values of columns by replacing all or part of the data with generated values taken from various input sources.

### Formats

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



Without any format specifications the value is regarded as a constant. The text constant NULL is regarded as SQL NULL. Each format parameter must be mached with one of **sourceRandom**, **sourceFile**, **sourceColumn** or **sourceSequence**.

See more examples at [Java String Format Examples](https://dzone.com/articles/java-string-format-examples).

The transform **TRANSFORMATION** class is one of the classes defined in the user defined transformation classes section. The transform() method takes String as input and delivers a String object. The class must implement the ITransformation interface. See **Email** and **CreditCard** as samples below.

## Sources

### sourceSequence

![alt text](/img/docs/ano-syntax/sourceSequence.png 'Source sequence')

The **sequence** input source is used to insert a sequence of integers into the column starting with the first **INTEGER** value and incremented by the second **INTEGER** value. If -1 is selected, the sequence starts with the highest value stored in the column plus the increment.



###  sourceColumn

![alt text](/img/docs/ano-syntax/sourceColumn.png 'Source column')

The **column** input source is used to insert the specified column value into the masked parent column. You can only specify a column from the same table. If the column being anonymized is not a string, you can use one of the conversions defined to convert the data type. See convert.



###  sourceFile

![alt text](/img/docs/ano-syntax/sourceFile.png 'Source file')

The **file** input source is used to insert a string value taken from the file defined in the **FILE** terminal. It picks a line from the file sequentially or randomly depending on the **random-order** property. A conversion class can be selected to manipulate the string selected from the text file. See convert.

###  sourceRandom

![alt text](/img/docs/ano-syntax/sourceRandom.png 'Source random')

## Random

###  randomInteger

![alt text](/img/docs/ano-syntax/randomInteger.png 'Random integer')



###  randomDecimal

![alt text](/img/docs/ano-syntax/randomDecimal.png 'Random decimal')



###  randomTime

![alt text](/img/docs/ano-syntax/randomTime.png 'Random time')



###  randomDate

![alt text](/img/docs/ano-syntax/randomDate.png 'Random date')



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



###  randomize

![alt text](/img/docs/ano-syntax/randomize.png 'Randomize')

The **randomize** function is used to apply noise on numeric and date column values. The algorithm is useful for hiding transactional data, whereby it maintains approximate values but changes it significantly to make it hard to recognize. Supported types are Integer, Decimal, Date, Time and DateTime.



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

## Anonymization

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

##  shuffle

![alt text](/img/docs/ano-syntax/shuffle.png 'Shuffle')

The **shuffle** function reorders the column values in a random order and ensures that no record retains the original column value.

```
update HOTEL
    // Output results to an encrypted file
    shuffle NAME
        map hotelmap.txt output encrypted //Write the mapping to a file, use encryption
```
