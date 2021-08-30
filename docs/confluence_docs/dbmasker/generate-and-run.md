# Generate and run

ref: <https://esito-conf.inmeta.com/display/DBMAS/Generate+and+run>

## Generate the java code

Once you have created the ANO file, you can generate the java source. A generation service is available on http://anonymizer.esito.no. Registration is required.

Select your **ANO** file as **Anonymizer model File name** input, edit the **Root package** parameter and press the **Download ZIP** button.

![alt text](/img/docs/dbmaskerweb.png "DB Masker Web")

Unpack the returned zip file into a java project folder of your choice.

### Compile and run the generated program

#### Setup your custom code and data

- Add your custom Java implementations to /src/main/java
- Add your custom data files to /src/main/resources

<br/>

#### Configure database driver settings

Modify the pom.xml: add your JDBC driver dependencies.

<br/>

#### Configure database connection settings

Open config.properties from src/main/resources and edit the file with default development database connection settings. A sample config.properties is explained here: DBmasker example project.

<br/>

#### Build using Maven

Add necessary dependencies to the generated pom.xml. To create the program and source JAR files, run:

- mvn install

<br/>

#### Run the application

To test your code, start a command shell and run the command:

- java -jar target/<program-name\>-<version\>.jar cmd

The program-name is given by your input .ano file name. The program displays the command help text and is ready for commands:

```
Commands:
trace                 - shows more messages
help                  - shows this page
config                - creates a local config.properties used for changing connection parameters
ping                  - test database connection
tasks                 - outputs list of tasks
run                   - runs all tasks except erase and sar tasks
run <tasks>           - runs a list of space delimited tasks, erase and sar actions are excluded
erase <task> <params> - runs erase actions for a specified task with a series of space delimited
                        parameters. If parameter contains a space, surround it with quotation marks
sar <task> <params>   - creates a SAR export for a specified task with a series of space delimited
                        parameters. XML and JSON files will be created in the working directory
cmd                   - takes continued input from standard input (stdin)
quit                  - quits program
>
```

Type **config**, which will create a copy of config.properties file in the current directory. The settings file will override the settings in src/main/resources/config.properties. Edit the properties with the database connection settings to the database you will mask/anonymize.

Type **quit** to exit the program.

To test the database connection, run **ping**.

You may now run the DBmasker tasks against the database. Run the **tasks** command to get a list of defined tasks and run **run \<tasks\>** to execute the defined tasks.
