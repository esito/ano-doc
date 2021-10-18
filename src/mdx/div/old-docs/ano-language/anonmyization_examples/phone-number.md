# Phone number

```ano
task MyTaskName
{
    // Anonymize - Mask various fields
    update CUSTOMER Anonymize_CUSTOMER
        // Create random norwegian phone number
        mask PHONE CUSTOMER_PHONE
            format "+47 %d"
            random-integer 10001000 99909990
}
```
