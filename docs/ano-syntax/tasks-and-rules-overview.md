---
sidebar_position: 1
sidebar_label: Overview
---

# Tasks and Rules Overview

## Definitions - Tasks and Rules

Consider the following ANO task structure:

```ano
task <your-task-group-name> {                               // This is a Task Group
    update <database-table-name-1> <opt-your-work-task-name-1>  // This is a Work Task
        mask <column-name>          // This is a Rule
            ...                         // Rule logic
        mask <column-name>          // This is a Rule
            ...                         // Rule logic
    create <database-table-tame-2> <opt-your-work-task-name-2>  // This is a Work Task
        mask <column-name>          // This is a Rule
            ...                         // Rule logic
        mask <column-name>          // This is a Rule
            ...                         // Rule logic
}
```

* **Task Group:** can contain both Work Tasks and (optionally) nested Task Groups.
* **Work Task:** contains the Rules of anonymizations of a particular table.
* **Rule:** describes the logic of how a particular column is anonymized.

We will less formally use the term **tasks** for both Task Groups and Work Tasks.

### Naming Conventions

Names are case insensitive and should be unique.

* Task Group names must be unique
* Work Task names must be unique within its Task Group
  * **NOTE**: It is possible for Work Tasks to have the same name in different Task Groups
* Task Groups and Work Tasks must have different names
  * **NOTE**: If the Work Task does not have an explicit name defined,
    it will be given a default name. Make sure this does not conflict with the Task Group name or other Work Task names
    * **Example**: The Work Task `Delete HOTEL` gets by default the name **Delete_HOTEL** when no name is explicitly specified.

### Running Tasks

Running a Task Group will run all its tasks in defined sequence.
Running Work Tasks will run all Work Tasks with the same name,
regardless of which Task Group they belong to, and in the sequence, they are defined.

## Work Task Types

A Work Task is one of the following types

* **update:** mask and make data unrecognizable
* **delete:** to subset the database - to reduce its size
* **create:** create new data records - according to generating logic
* **erase:** remove unwanted or obsolete data
* **sar:** create reports from database. This is the only type that do not make changes to the database.

## Rule Logic

A Rule defines the logic of how your data is to be changed:

* **mask:** anonymizes data - replaces it with new data
* **randomize:** adds noise to numbers
* **shuffle:** reorders the data

## Task Structure Example

The example below consists of two tasks:

* **Anonymize** (Task Group) and
* **update_CUSTOMER** (Work Task)

The Work Task contains two masking Rules. One for the column **NAME** and one for the column **EMAIL**.

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
