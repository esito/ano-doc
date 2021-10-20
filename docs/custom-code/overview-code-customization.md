---
sidebar_position: 1
sidebar_label: Overview
---

# Code Structure and Customization Overview

By using our DBMasker Service, you will generate a Java 8 application
based upon the provided `.ano` file. You are invited to implement customized
 masking/anonymization logic into this Java 8 application.

:::warning Custom code strategies

Be aware that customizations might be overwritten
each time the service is regenerated.
All custom code will also reside in the src/main/java or src/main/resources folders.

:::

## Code structure

The code is organized as a Maven project into two source folders with various
java packages and resources in the src/main project directory.
Generated code is written to the src/main folder and it is regenerated each time
the **DBmasker** service is used.
Be aware of that customization might be overwritten each time it is regenerated.

The system creates java packages in the src/main/java folders
based on the property **Root package**
defined as parameter to the **DBmasker** service. The default package is example.anonymizer.

## Code packages and files

<table width="100%" >
<tr>
<th width="30%">

Code packages, files and directories

</th>
<th>

Desicrption

</th>
</tr>
<tr>
<td>

src/main/java

</td>
<td>

Source folder for customized java files

</td>
</tr>
<tr>
<td>

- \<root package\>.conversions

</td>
<td>

Package containing custom conversion classes.
Defined for Randomized columns or for masked columns using a column input source.
Converts input strings into another string format or
converts string into another data type for randomized columns.
(_See ParseDigits.java in AnonymizerHotel example_)

</td>
</tr>
<tr>
<td>

- \<root package\>.distributions

</td>
<td>

Package containing custom distribution classes.
Defined for Dependent tables when creating data for tables.
Used for determining the distribution of foreign keys between the parent and
child tables. (_See MinPerParent.java in AnonymizerHotel example_)

</td>
</tr>
<tr>
<td>

- \<root package\>.transformations

</td>
<td>

Package containing custom transformations. Defined for Masked column.
Used for transforming column value before being written to database.
(_See ReplaceDigits.java in AnonymizerHotel example_)

</td>
</tr>
<tr>
<td>

src/main/resources

</td>
<td>

Source folder containing resource text files used as input files to mask columns.

</td>
</tr>
<tr>
<td>

src/main/java

</td>
<td>

Source folder for generated files.
All files within this folder path are regenerated every time the project is built.
DO NOT MODIFY. The generated source is described in the AnonymizerAPI Javadoc.

</td>
</tr>
<tr>
<td>

- \<root package\>.Anonymizer.java

</td>
<td>

Start file containing java main method for jar file

</td>
</tr>
<tr>
<td>

- \<root package\>.Connect.java

</td>
<td>

Connection logic.

</td>
</tr>
<tr>
<td>

- \<root package\>.TaskRoot.java

</td>
<td>

Task execution tree root

</td>
</tr>
<tr>
<td>

- \<root package\>.\<task name\>

</td>
<td>

Application code for performing anonymizations, creations, deletions and erasures.
A separate package is created for each task and sub-task.
Within each package are various java files for performing the various functions.

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer

</td>
<td>

Contains all interfaces, ConfigUtil.java (reading/writing config.properties)
 and Log.java (Java logging).
 All interfaces and abstract classes are explained in the Javadoc.

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.column

</td>
<td>

(Internal) Contains multiple classes for each supported column data type

</td>
</tr>
<tr>
<td>

- o.esito.anonymizer.conversions

</td>
<td>

Built in conversions used for converting string input to various other data types.
(String2Date, String2DateTime, String2Decimal, String2Integer, String2Time)

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.core

</td>
<td>

(Internal) Contains abstract classes for various functions

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.sarwriter

</td>
<td>

The four supplied SAR writers for XML and JSON

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.distributions

</td>
<td>

Built in distributions determine how foreign keys are
distributed between parent and child tables

</td>
</tr>
<tr>
<td>

- 
  - All Combinations.java

</td>
<td>

This will add rows such that any missing combinations of foreign key values are present.

</td>
</tr>
<tr>
<td>

- - EvenWithDeviation.java

</td>
<td>

Parent values will be assigned evenly among the new rows,
but with an additional ability to set a random deviation.

</td>
</tr>
<tr>
<td>

- - SimpleSpread.java

</td>
<td>

Foreign key columns will be randomly assigned from available values.
This is the Default distribution.

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.mask

</td>
<td>

(Internal) Contains mask classes for various functions

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.noise

</td>
<td>

(Internal) Contains noise classes for various data types

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer.transformations

</td>
<td>

Built in transformations.

</td>
</tr>
<tr>
<td>
- - CreditCard.java

</td>
<td>

Replaces last digit of credit card number with calculated checksum using Luhn algorithm

</td>
</tr>
<tr>
<td>
- - Email.java

</td>
<td>

Translates various characters as space, hyphen or underscore.

</td>
</tr>
<tr>
<td>

src/main/resources/config.properties

</td>
<td>

Connection parameters for the database you will connect to.

</td>
</tr>
<tr>
<td>

pom.xml

</td>
<td>

Maven config file.

</td>
</tr>
</table>

<br/>
