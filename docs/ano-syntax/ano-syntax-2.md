---
sidebar_position: 3
sidebar_label: User Defined Classes
---

# The user defined classes section

Some masking parts use functions to manipulate values and add rows to the database and you may create user defined specialized classes _(All interfaces and abstract classes are explained in the javadoc)_:

<table header-style="none" width="100%" >
<tr>
<th width="15%">
Package
</th>
<th>
Description
</th>
</tr>

<tr>
<td >

conversions

</td>
<td>

Package containing custom conversion classes. Defined for randomized or masked columns using a column input source. Converts input strings into another string format or can convert string into another data type for randomized columns. Implements no.esito.anonymizer.IConversion interface.

Built in conversions used for converting string input to various other data types:

- ParseDigits - remove all non-digits
- String2Date - convert to java.time.LocalDate
- String2DateTime - convert to java.time.LocalDateTime
- String2Decimal - convert to Double
- String2Integer - convert to Integer
- String2Time - convert to java.time.LocalTime

</td>
</tr>

<tr>
<td >

distributions

</td>
<td>

Package containing custom distribution classes. Defined for dependent tables when creating data for tables. Used for determining the distribution of foreign keys between the parent and child tables. Implements no.esito.anonymizer.IDistribution interface. Distributions may have two parameter definitions:

parameter defined and connected to parent tables
parameter defined on distribution method and connected to parent groups/tables
Built in distributions:

- AllCombinations - all combinations of parents are satified at least once
- EvenWithDeviation -
- SimpleSpread - foreign key columns are randomly assigned values from possible primary key values

</td>
</tr>

<tr>
<td >

transformations

</td>
<td>

Package containing custom transformation classes. Defined for masked columns. Used to transform column value before being written to the database. (See ReplaceDigits.java in AnonymizerHotel example). Implements no.esito.anonymizer.ITransformation interface.

Built in transformations:

- Email - Translates space, hyphen and underscore resutling in a valid email address
- CreditCard - Adjust last digit for MOD10 validation

</td>
</tr>
</table>

The built-in classes have no.esito.anonymizer.conversions, no.esito.anonymizer.distributions and no.esito.anonymizer.transformations packages. All built-ins are implicitly defined.

Sample classes part:

## User Defined Classes

If you want to define your own classes and use them in masking rules, you will need to define them in the `.ano` file after the Database schema information section and the Tasks and rules section:

```ano
// - - - SECTION 1 - DATABASE SCHEMA INFORMATION - - - //
TABLE ...

// - - - SECTION 2 -USER DEFINED CLASSES - - - //
conversion example.anonymizer.conversions.ParseDigits
transformation example.anonymizer.transformations.PostCodeGeneralization
distribution example.anonymizer.distributions.MinPerParent

// - - - SECTION 3 - TASKS AND RULES - - - //
task ...
```

&nbsp;

### User defined

![alt text](/img/docs/ano-syntax/userdefined.png 'userdefined')

The CLASS represents a user defined class with full java package specification.

&nbsp;
