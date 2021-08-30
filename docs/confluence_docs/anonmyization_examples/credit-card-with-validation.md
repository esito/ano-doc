# CreditCard with validation

This uses a built-in Modula 10 validation


## Mask credit card with one that validates
```ano
task MyTaskName
{
    // Anonymize - Mask various fields
    update CUSTOMER Anonymize_CUSTOMER
        // Create random creditcard with checksum that validates
        mask CREDITCARD CUSTOMER_CREDITCARD
            format "41428340%d"
            transform CreditCard
            random-integer 10001000 99919991
 
}  
```