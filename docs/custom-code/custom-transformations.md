---
sidebar_position: 3
sidebar_label: Custom Transformations
--- 

# Custom Transformations

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