<!-- markdownlint-disable MD033 - makes html allowed -->

# Code Structure and Customization

ref: <https://esito-conf.inmeta.com/display/DBMAS/Code+structure+and+customization>

## Code structure

The code is organized as a Maven project into two source folders with various java packages and resources in the src/main project directory. Generated code is written to the src/main folder and it is regenerated each time the **DBmasker** service is used. Be aware of that customization might be overwritten each time it is regenerated.

The system creates java packages in the src/main/java folders based on the property **Root package** defined as parameter to the **DBmasker** service. The default package is example.anonymizer.

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

Package containing custom conversion classes. Defined for Randomized columns or for masked columns using a column input source. Converts input strings into another string format or converts string into another data type for randomized columns. (*See ParseDigits.java in AnonymizerHotel example*)

</td>
</tr>
<tr>
<td>

- \<root package\>.distributions

</td>
<td>

Package containing custom distribution classes. Defined for Dependent tables when creating data for tables. Used for determining the distribution of foreign keys between the parent and child tables. (*See MinPerParent.java in AnonymizerHotel example*)

</td>
</tr>
<tr>
<td>

- \<root package\>.transformations

</td>
<td>

Package containing custom transformations. Defined for Masked column. Used for transforming column value before being written to database. (*See ReplaceDigits.java in AnonymizerHotel example*)

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

Source folder for generated files. All files within this folder path are regenerated every time the project is built. DO NOT MODIFY. The generated source is described in the AnonymizerAPI javadoc.

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

Application code for performing anonymizations, creations, deletions and erasures. A separate package is created for each task and sub-task. Within each package are various java files for performing the various functions.

</td>
</tr>
<tr>
<td>

- no.esito.anonymizer

</td>
<td>

Contains all interfaces, ConfigUtil.java (reading/writing config.properties) and Log.java (Java logging). All interfaces and abstract classes are explained in the javadoc.

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

Built in conversions used for converting string input to various other data types. (String2Date, String2DateTime, String2Decimal, String2Integer, String2Time)

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

Built in distributions determine how foreign keys are distributed between parent and child tables

</td>
</tr>
<tr>
<td>

- - All Combinations.java

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

Parent values will be assigned evenly among the new rows, but with an additional ability to set a random deviation.

</td>
</tr>
<tr>
<td>

- - SimpleSpread.java

</td>
<td>

Foreign key columns will be randomly assigned from available values. This is the Default distribution.

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

## Conversions

Conversions are defined for randomized columns or for masked columns using a column input source or text field input source. When used for a column input source, the conversion is used for manipulating the string format and converting the column from one string format to another. When used for a text field, the conversion is used to manipulate the text file entry. When used for a randomized column, it converts the string (The column is always read as a string) into another data type.

All custom conversions must be created in the src/main/java/\<java package\>.conversions package.

<br/>

<details>
<summary><b>ParseDigits.java (Click to Expand)</b></summary>

```java
public class ParseDigits implements IConversion {
 
    public static final String LABEL = "ParseDigits - simply remove all non-digits";
 
    @Override
    public Object convert(String txt) {
        if(txt==null)
            return "0";
        char[] chars = txt.toCharArray();
        StringBuilder sb = new StringBuilder();
        for (char c : chars) {
            if(Character.isDigit(c))
                sb.append(c);
        }
        return sb.length()==0?"0":sb.toString();
    }
 
}
```

</details>

<br/>

- The custom class must implement the IConversion interface and can override the convert method.
- The convert method always assumes a string input and returns a string.
- The conversion is defined in the user defined classes section and used as defined by the convert terminal.

<br/>

### Using text files with multiple columns of data

If the input source text file contains multiple columns of data, a conversion may be created to assign the correct delimited value. For example, a text file containing a City, State and Zip Code delimited by a tab can have an associated conversion file to select the first entry as illustrated below. All columns can use the same input text file with similar conversion methods and as long as it is using sequence and repeatable random it will pick the same line from text file.

<br/>

<details>
<summary><b>TabDelim1.java (Click to Expand)</b></summary>

```java
public class TabDelim1 implements IConversion {
 
    public static final String LABEL = "TabDelim1 - Pick column 1 delimited by tab";
     
    @Override
    public Object convert(String input) throws Exception {
        return input.split("\\t")[0];
    }
 
}
```

</details>

<br/>

## Transformations

Transformations are defined for Masked columns and are used for transforming column values before being written to the database. All custom transformations must be created in the src/main/java/\<java package\>.transformations package.

<br/>

<details>
<summary><b>QuartileGeneralization.java (Click to Expand)</b></summary>

```java
/**
 * Generalization example that demonstrates using current value set in the calculation.
 * It divided current values into 4 equal size buckets where the value represents the average.
 */
public class QuartileGeneralization implements ITransformation, IPreScan {
 
    public static final String LABEL = "QuartileGeneralization - Create 4 groups and preserve the average";
     
    @Override
    public String transform(String input) {
        int in=Integer.parseInt(input);
        for (int i = 0; i < 4; i++) {
            if(in<=max[i])
                return String.valueOf(tot[i]/each);
        }
        return String.valueOf(tot[3]/each);
    }
     
    int[] max=new int[]{0,0,0,0};
    int[] tot=new int[]{0,0,0,0};
    double each;
 
    @Override
    public void scan(int col, List<String[]> rows) {
        List<Integer> list=new ArrayList<>();
        for (String[] row : rows) {
            list.add(Integer.valueOf(row[col]));
        }
        Collections.sort(list);
        each = list.size()/4.0;
        for (int i = 0; i < list.size(); i++) {
            int bucket=(int)(i/each);
            Integer x = list.get(i);
            max[bucket]=x;
            tot[bucket]+=x;
        }
    }
 
}
```

</details>

<br/>

- The custom class must implement the ITransformation interface and override the transform method
- Can also implement IPreScan and override the scan method. This provides you with the entire set of records in the scan method which you can inspect and use for the transform method
- The transformation is defined in the user defined classes section and used as defined by the transform terminal.

<br/>

## Distributions

Distributions are defined for dependent tables when creating data for tables. It is used for determining the distribution of foreign keys between the parent and child tables. All custom distributions must be created in the src/main/java/\<java package\>.distributions package.

<br/>

<details>
<summary><b>MinPerParent.java (Click to Expand)</b></summary>

```java
/**
 * Simple distribution where it ensures a minimum occurances of each parent
 * when creating new records
 */
public class MinPerParent implements IDistribution {
    public static final String LABEL =
        "MinPerParent - Ensures a minimum number of occurrences of each parent value";
    public static final String PARENT_LABEL= "Minimum #rows / parent";
    int[] min;
 
    @Override
    public int calculateNewRows(CreateParent[] parents, int numExistRows, List<String[]> existing) {
        min=new int[parents.length];
        for (int i = 0; i < parents.length; i++) {
            min[i]=Integer.valueOf(parents[i].params);
        }
        int x1 = 0;
        for (int i = 0; i < parents.length; i++) {
            CreateParent ct = parents[i];
            int dmin = 0;
            for (int j : ct.count) {
                dmin += Math.max(min[i] - j, 0);
            }
            x1 = Math.max(x1,dmin );
        }
        return x1;
    }
 
    @Override
    public void distribute(List<String> columns, CreateParent[] parents, List<String[]> rows) {
        for (int i = 0; i < parents.length; i++) {
            CreateParent parent = parents[i];
            int irow = 0;
            int[] a = parent.count;
            for (int icol = 0; icol < a.length; icol++) {
                for (int j = a[icol]; j < min[i]; j++) {
                    if (irow >= rows.size())
                        break;
                    IDistribution.assignRow(parent, columns, rows.get(irow++), icol);
                }
            }
            int icol = 0;
            int size = parent.parentRows.size();
            while (size > 0 && irow < rows.size()) {
                IDistribution.assignRow(parent, columns, rows.get(irow++), icol++);
                if (icol >= size)
                    icol = 0;
            }
        }
    }
}
```

</details>

<br/>

- The custom class must implement the IDistribution interface and override the distribute and calculateNewRows methods
- The distribution is defined in the user defined classes section and used as defined by the distribute terminal.

<br/>

## Custom code strategies

Be aware of that customization might be overwritten each time the service is regenerated. All custom code will also reside in the src/main/java or src/main/resources folders.

<br/>

## Using the application JAR from other Java programs

The JAR file can easily be included on the classpath and run from other Java programs. The build process creates a source JAR which should be attached to the development environment. Handling of database connection can be done using the Anonymizer connection mechanism or entirely from the calling Java program. Each task can be run separately and in any order and they may also be subclassed. All interfaces and abstract classes are explained in the javadoc.

Entry points:

- Anonymizer extends AbstractAnonymizer which implements IAnonymizer
  - runAll, runTasks, getTaskRoot, setEraseParam, setAutoCommit, emptyDB
- ConfigUtil
  - getConfig - returns the Properties object that can be assigned from the API instead of editing the config.properties file.
- Log - a logging facade using java.util.logging
  - setLevel, logger.addHandler - must attach loghandler to deal with log messages
- IContext - keeps additional configuration for running tasks
  - setRunType, setRunParams, setAutoCommit, setRepeatableRandom

<br/>

### ConfigUtil

ConfigUtil.getConfig() returns a Java Properties object which can be manipulated like a Map.

### Configuring values

```java
// setting the file encryption key.
ConfigUtil.getConfig().setProperty("file.encryptionkey","mykey");
```

<br/>

### IContext

IContext is a placeholder for run-time data and connection information. A ContextFactory provides methods to create three types of context. You may alternatively implement your own.

<table width="100%">
<tr>
<th width="20%">

Context

</th>
<th>

ContextFactory method
</th>
</tr>
<tr>
<td>

Anonymize

</td>
<td>

createAnonymizeContext(Connection connection)

</td>
</tr>
<tr>
<td>

Erase

</td>
<td>

createEraseContext(Connection connection, String[] params)

</td>
</tr>
<tr>
<td>

SAR

</td>
<td>

createSarContext(Connection connection, String[] params, ISarWriter sarwriter)

</td>
</tr>
</table>

The values for auto-commit and repeatable-random you may have to set additionally.

<table width="100%">
<tr>
<th>

Additional context
</th>
<th>

Values

</th>
<th>

</th>
</tr>
<tr>
<td>

setRunType(RunType run)

</td>
<td>

RUN, ERASE, SAR

</td>
<td>

Type of processing set by factory method.

</td>
</tr>
<tr>
<td>

setRunParams(String[] parameter)

</td>
<td>

Array of strings

</td>
<td>

Parameters set by factory method.

</td>
</tr>
<tr>
<td>

setRepeatableRandom(boolean repeatable)

</td>
<td>

Boolean

</td>
<td>

True - start the number generation with same seed and keep consistent results each time it's run.

</td>
</tr>
<tr>
<td>

setAutoCommit(boolean autocommit)

</td>
<td>

Boolean

</td>
<td>

</td>
</tr>
<tr>
<td>

LOG_INDENTATION, LOG_BEGIN, LOG_END

</td>
<td>

Static variables

</td>
<td>

Customize how indentation of run status is written to logs.

</td>
</tr>
</table>

<br/>

### Log

Log handler may be configured to suit your needs.

### Configure Log handler

```java
// To configure the Anonymizer's Log handler instead of Java Logging's default ConsoleHandler.
Log.configureConsoleLoghandler();
 
// To add your own handler
Log.addhandler(new MyLogHandler());
 
// To ignore Info and Warning type messages
Log.setLevel(Level.SEVERE);
```

<br/>

### Anonymizer

Anonymizer gives a practical entry point, but does not necessarily need to be included to run tasks.

``` java
// Instantiating Anonymizer will give access to IAnonymizer methods such as getTasks().
// The ContextFactory object gives factory methods based on the connection from config.properties
try {
    IAnonymizer main=new Anonymizer();
    IContext context = ContextFactory.createAnonymizeContext(Connect.createDefaultConnection());
    main.getTaskRoot().run(context);  // Runs all tasks
    main.runTasks(context, Arrays.asList("Task1,Task2".split(","))); // To run specific tasks in a list
} catch (Throwable e) {
    e.printStackTrace();
}
 
// Having your own connection, you may instead access tasks directly, without the Anonymizer class.
// The Factory methods in AbstractContext can be used if you have a connection.
IContext context = ContextFactory.createAnonymizeContext(connection);
new TaskRoot().run(context);
 
// Running Erase task
String[] params = new String[]{"1000234"};
IContext context = ContextFactory.createEraseContext(connection, params);
new MyEraseTask().run(context);
```

## Running SAR exports

Although it might be sufficient to provide the XML for a Subject Access Request, it is more appropriate that the data be exported and run through a report generator for providing a PDF or HTML output. A SAR response would most likely have to contain many other elements in addition to the information contained in the database.

SAR tasks are more appropriate to run via the JAR APIs.

### Running SAR export

```java
// Running SAR task with Json output
// Set parameter value for the task
String[] params = new String[]{"1"};
try (
    FileOutputStream fw=new FileOutputStream("MySar.json");
    ISarWriter sw = new SimpleJsonSarWriter(fw);
    Connection connection = Connect.createDefaultConnection();
){
    IContext context = ContextFactory.createSarContext(connection,params, sw);
    new MySarTask().run(context); // Runs the task named "MySarTask"
} catch (Throwable e) {
    e.printStackTrace();
}
```

<br/>

A SarWriter must implement the ISarWriter interface, but it may be easier to extend the AbstractSarWriter, which handles the hierarchy of data.

There are four generic writers provided for XML and JSON and these may be convenient to subclass for your own needs.

### Example SimpleXmlSarWriter.java

```java
public class SimpleXmlSarWriter extends AbstractSarWriter {
 
    public SimpleXmlSarWriter() {
        super("  ");
    }
 
    @Override
    public String writeColumn(String column, String label, String comment, String value) {
        return "  "+id(column)+"='"+escape(value)+"'\n";
    }
 
    @Override
    public String writeTable(String table, String label, String comment, String columns, String children) {
        if(children.isEmpty())
            return "<"+id(table)+"\n"+columns+indent+"/>\n";
        return "<"+id(table)+"\n"+columns+"  >\n"+children+"</"+id(table)+">\n";
    }
 
    @Override
    public String writeRoot(String inner) {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+inner;
    }
 
    @Override
    public String escape(char c) {
        return escapeXml(c);
    }
}
```

<br/>

## Running AnonymizerHotel tasks with embedded jar

The class code sample below may be run with the generated anonymizerhotel-0.0.1.jar file.

### Sample using API

```java
package example.anonymizer.apisample;
 
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.SQLException;
 
import example.anonymizer.Connect;
import example.anonymizer.anonymize.Anonymize_CUSTOMER;
import example.anonymizer.erase.Erase_CUSTOMER;
import example.anonymizer.sar.SAR_CUSTOMER;
import no.esito.anonymizer.ContextFactory;
import no.esito.anonymizer.IContext;
import no.esito.anonymizer.Log;
import no.esito.anonymizer.sarwriter.JsonSarWriter;
 
public class UsingAPI {
 
    public static void main(String[] args) {
        try {
            // Set console-loghandler instead of Java's logger
            Log.configureConsoleLoghandler();
 
            // Connect to the default database specified in project.properties
            Connection conn = Connect.createDefaultConnection();
 
            // Run the samples
            runSampleAnonymizeTask(conn);
            runSampleEraseTask(conn);
            runSampleSarTask(conn);
 
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
 
    private static void runSampleAnonymizeTask(Connection conn) throws Throwable {
        // Create a run-time context
        IContext context = ContextFactory.createAnonymizeContext(conn);
        context.setRepeatableRandom(true); // If you want same results consistently
    
        // Run the Anonymize_CUSTOMER task
        new Anonymize_CUSTOMER().run(context);
    }
 
    private static void runSampleEraseTask(Connection conn) throws Throwable {
        // Create a run-time context and supply the parameter, where customerno = %PARAMETER%
        IContext context = ContextFactory.createEraseContext(conn, new String[] {"1000234"});
    
        // Run the Erase_CUSTOMER task
        new Erase_CUSTOMER().run(context);
    }
 
    private static void runSampleSarTask(Connection conn) throws Throwable {
        try (
            FileOutputStream out =    new FileOutputStream("sar.json");
            JsonSarWriter writer = new JsonSarWriter(out);
        ){
            // Create a run-time context and supply the parameter, where customerno = %PARAMETER%
            IContext context = ContextFactory.createSarContext(conn, new String[] {"1000235"}, writer);
 
            // Run the SAR_CUSTOMER task
            new SAR_CUSTOMER().run(context);
        }
    }
}
```
