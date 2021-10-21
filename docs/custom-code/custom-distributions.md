---
sidebar_position: 4
sidebar_label: Custom Distributions
--- 


# Custom Distributions

Distributions are defined for dependent tables when creating data for tables.
It is used for determining the distribution of foreign keys between the parent and child tables.
All custom distributions must be created in the src/main/java/\<java package\>.distributions package.

<br/>

<details>
<summary><b>MinPerParent.java (Click to Expand)</b></summary>

```java
/**
 * Simple distribution where it ensures a minimum occurrences of each parent
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
