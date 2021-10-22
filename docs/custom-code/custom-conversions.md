---
sidebar_position: 2
sidebar_label: Custom Conversions
---

# Custom Conversions

Conversions are defined for randomized columns or for masked columns using a column
input source or text field input source. When used for a column input source,
the conversion is used for manipulating the string format and converting the column
from one string format to another. When used for a text field,
the conversion is used to manipulate the text file entry.
When used for a randomized column, it converts the string
(The column is always read as a string) into another data type.

All custom conversions must be created in the 
`src/main/java/<java package>.conversions` package.

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

## Using text files with multiple columns of data

If the input source text file contains multiple columns of data,
a conversion may be created to assign the correct delimited value.
For example, a text file containing a City, State and Zip Code delimited by a tab can have an associated conversion file
to select the first entry as illustrated below.
All columns can use the same input text file with similar conversion methods and
as long as it is using sequence and repeatable random it will pick the same line from text file.

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