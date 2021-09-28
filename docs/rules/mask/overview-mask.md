---
sidebar_position: 1
sidebar_label: Overview
---

# Overview of the `mask` rules

The mask rules anonymizes the values of columns by replacing all or part of the data with generated values taken from various **input sources**.

<figure>
  <img src="/img/docs/ano-syntax/mask.png" alt="" />
  <figcaption> The Ano Structure of the mask Rules </figcaption>
</figure>

**ANO syntax for mask rules**

```ano
...
    mask <column-name> <rule-name?>     // ´?´ means optional
        format <format>
        transform? <transformation?>
        unique?
        <input-sources>
...
```

## Types of input sources

### `random-[type]`

The `random-[type]` input source is used to insert a value drawn from a random sequence as defined by the `<from>` and `<to>` properties. The `random-[type]` is one of

- `random-integer`
- `random-decimal`
- `random-time`
- `random-date`
- `random-datetime`

### `file`

The `file` input source is used to insert a string value taken from the file defined in the FILE terminal. It picks a line from the file sequentially or randomly depending on the `random-order` property. A conversion class can be selected to manipulate the string selected from the text file. See convert.

### `column`

The `column` input source is used to insert the specified column value into the masked parent column. You can only specify a column from the same table. If the column being anonymized is not a string, you can use one of the conversions defined to convert the data type. See convert.

### `sequence`

The `sequence` input source is used to insert a sequence of integers into the column starting with the first INTEGER value and incremented by the second INTEGER value. If -1 is selected, the sequence starts with the highest value stored in the column plus the increment.

## `unique`

Ensures uniqueness of values in columns.

## `transform` Transformations

Used to transform column value before being written to the database. (See ReplaceDigits.java in AnonymizerHotel example). Implements no.esito.anonymizer.ITransformation interface. May be written yourself and added to the source code of the generated project.

Built in transformations:

- Email - Translates space, hyphen and underscore resutling in a valid email address
- CreditCard - Adjust last digit for MOD10 validation

## `convert` Convertions

Defined for randomized or masked columns using a column input source.

Converts input strings into another string format or can convert string into another data type for randomized columns. Implements no.esito.anonymizer.IConversion interface. May be written yourself and added to the source code of the generated project.

Built in conversions used for converting string input to various other data types:

- ParseDigits - remove all non-digits
- String2Date - convert to java.time.LocalDate
- String2DateTime - convert to java.time.LocalDateTime
- String2Decimal - convert to Double
- String2Integer - convert to Integer
- String2Time - convert to java.time.LocalTime
