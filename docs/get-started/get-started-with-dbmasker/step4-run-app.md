---
sidebar_position: 6
label: run-generated-application
---

# Step 4 - Run The Generated Application

To test the generated code, start a command shell and run this command from the `src` folder:

> **java -jar** `target/<file-name>-0.0.1.jar` **cmd**

The program name `<file-name>-0.0.1.jar` is given by your input `<file-name>.ano` file name. "cmd" is a command that takes continued input from standard input. The program displays the command help text and is ready for commands.

```txt
Commands:
trace                 - shows more messages
help                  - shows this page
config                - creates a local config.properties used for changing connection parameters
ping                  - test database connection
tasks                 - outputs list of tasks
run                   - runs all tasks except erase and sar tasks
run <tasks>           - runs a list of space delimited tasks, erase and sar actions are excluded
erase <task> <params> - runs erase actions for a specified task with a series of space delimited parameters
                        if parameter contains a space, surround it with quotation marks
sar <task> <params>   - creates a SAR export for a specified task with a series of space delimited parameters
                        xml and json files will be created in working directory
cmd                   - takes continued input from standard input (stdin)
quit                  - quits program
```

Check that the database connection is ok: run the ping command:

```txt
>ping
DBMS: Microsoft SQL Server - 15.00.4063
Driver: Microsoft JDBC Driver 9.4 for SQL Server - 9.4.0.0 9.4
URL: jdbc:sqlserver://localhost:1433;...
...
Connection successful
```

Turn on verbose mode, run the **trace** command.

A set of tasks is defined, to see the list, run the **tasks** command

```txt
>tasks
Available tasks:
Anonymize
  Anonymize_CUSTOMER (Customer - creditCard phone)
...
```

Each of these tasks may be run with the **run** command:

Run a group of tasks as in **run anonymize** or run a single task as in **run fix_address**.
You may use lower case letters on all task names.
