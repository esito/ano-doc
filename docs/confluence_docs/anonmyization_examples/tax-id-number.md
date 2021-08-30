# Tax ID number

Tax ID numbers vary for each country, and thus may require different algorithms for validation. The example here is for a Norwegian Tax ID with two Modula 11 checksum numbers.

## Mask Tax ID

```ano
transformation example.anonymizer.transformations.Person_NO
 
 
task MyTaskName
{
    // Anonymize - Mask various fields
    update CUSTOMER Anonymize_CUSTOMER
        // Mask random Norwegian Tax ID
        mask TAX_ID CUSTOMER_TAX_ID
            format "%1$td%1$ty%2$s"
            transform Person_NO
            random-date 1920-01-01 2020-01-01
            random-integer 10000 99999
}
```

### Notice

- transformation "Person_NO" is custom code and location must be registered in top section
- a random date and a random 5 digit number will be used for the number
- the custom transformation "Person_NO" is used to fix the string in order to validate to Norwegian Tax ID checksum 
- String format: https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html


Norwegian Tax ID

- DDMMYY - date of birth
- XXX - Sequence number where even number identifies a female and odd a male. The first number also identifies century born in.
- CC - Modula 11 checksum numbers

Notice the skip routine, in the Norwegian Tax id a tenth of the numbers are invalid because of the Modula 11 checksum may sometimes give two digits.

## Person_NO Java code

```java
package example.anonymizer.transformations;
 
import no.esito.anonymizer.ITransformation;
import no.esito.anonymizer.transformations.CreditCard;
 
/**
 * Calculate the check-digits in a Norwegian Tax ID.
 *
 */
public class Person_NO implements ITransformation{
 
    public static final String LABEL = "Person_NO - Norwegian ID generation";
     
    @Override
    public String transform(String input) {
        if(input == null || input.isEmpty())
            return input;
        String s1 = input.substring(0, 9);
        String s2 = personCheckDigit(s1);
        if(s2.length()>2){
            // If invalid number try next
            String s3=""+(Integer.parseInt(input.substring(6, 9))+1002);
            return toPersonNO(input.substring(0, 6)+s3.substring(1, 4)+input.substring(9, 11));
        }
        return s1+s2;
    }
 
    /**
     * Fix last two digits of a Norwegian Social Security Number
     * <br\>It uses MOD-11 thus it may still create an invalid number 
     * @param value to be corrected
     * @return corrected value
     */
    public static String toPersonNO(String value) {
        String s1 = value.substring(0, 9);
        String s2 = personCheckDigit(s1);
        if(s2.length()>2){
            // If invalid number try next
            String s3=""+(Integer.parseInt(value.substring(6, 9))+1002);
            return toPersonNO(value.substring(0, 6)+s3.substring(1, 4)+value.substring(9, 11));
        }
        return s1+s2;
    }
     
    static String personCheckDigit(String value) {
        int[] d = CreditCard.getDigits(value);
        int k1 = 11 - ((3 * d[0] + 7 * d[1] + 6 * d[2] + 1 * d[3] + 8 * d[4] + 9 * d[5]
                + 4 * d[6] + 5 * d[7] + 2 * d[8]) % 11);
        int k2 = 11 - ((5 * d[0] + 4 * d[1] + 3 * d[2] + 2 * d[3] + 7 * d[4] + 6 * d[5]
                + 5 * d[6] + 4 * d[7] + 3 * d[8] + 2 * k1) % 11);
        return k1+""+k2;
    }
 
    public static void main(String[] args) {
        String pnr = "02076829716";
        System.out.println("Encode PNR number '" + pnr + "': " + toPersonNO(pnr));
         
    }
 
}
```
