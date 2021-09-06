---
sidebar_position: 0
sidebar_label: ANO File Intro
---

# ANO syntax

ref. <https://esito-conf.inmeta.com/display/DBMAS/DBmasker+ANO+syntax>

## Creating the ANO file

The DBmasker service takes one input: the ANO file, which contains the data schema information and the rules you write. In the following is the ANO syntax described in a simplified EBNF based railroad diagrams. Three symbols are used:

<table header-style="none" width="100%" >
<tr>
<td width="25%">

![alt text](/img/docs/ano-syntax/terminal.png 'Terminal')

</td>
<td>

A terminal representing plain text written as given in the box.

</td>
</tr>

<tr>
<td >

![alt text](/img/docs/ano-syntax/definition.png 'Definition')

</td>
<td>

A box with small letters. A nonterminal representing a reference to another syntax diagam
with name as given in the box.

</td>
</tr>

<tr>
<td >

![alt text](/img/docs/ano-syntax/value.png 'Value')

</td>
<td>

A box with only capital letters. A nonterminal representing parameters/values as defined by the name.
I.E. COLUMN is a database column name.

</td>
</tr>
</table>

&nbsp;

## The model

The ANO file contains three sections:

1. database schema information
2. user defined classes
3. tasks and rules


```ano
// - - - SECTION 1 - DATABASE SCHEMA INFORMATION - - - //
table ADDRESS
	column text HOMEADDRESS size 40
	column integer ID size 10
	column integer CUSTOMER_CUSTOMERNO size 10
	primary-key ID
table CUSTOMER
	column integer CUSTOMERNO size 10
	column text NAME size 40
	column text PHONE size 20
	primary-key CUSTOMERNO

foreign-key
	CUSTOMER CUSTOMERNO
	ADDRESS CUSTOMER_CUSTOMERNO

// - - - SECTION 2 -USER DEFINED CLASSES - - - //
conversion example.anonymizer.conversions.ParseDigits
transformation example.anonymizer.transformations.PostCodeGeneralization
distribution example.anonymizer.distributions.MinPerParent

// - - - SECTION 3 - TASKS AND RULES - - - //
task Anonymize
{
	// Anonymize - Mask various fields
	update CUSTOMER Anonymize_CUSTOMER
		// Create random norwegian phone number
		mask PHONE CUSTOMER_PHONE
			format "+47 %d"
			random-integer 10001000 99909990
		// Create random name from list of firstnames and lastnames
		mask NAME CUSTOMER_NAME
			format "%s %s"
			file src/main/resources/firstname.txt random-order
			file src/main/resources/lastname.txt random-order
		// Create email based on the newly created name
}

```

&nbsp;

## Model

![alt text](/img/docs/ano-syntax/model.png 'Model')

&nbsp;