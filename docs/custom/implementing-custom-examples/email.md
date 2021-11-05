# Email

This example shows how you construct an email from a name field, then adding a random email domain.

## Mask Email

```ano
task MyTaskName
{
    // Anonymize - Mask various fields
    update CUSTOMER Anonymize_CUSTOMER
        // Create email based on the newly created name
        mask EMAIL CUSTOMER_EMAIL
            format %s@%s
            transform Email
            unique
            column NAME
            file src/main/resources/email.txt random-order
}
```

### Notice

- the "transform Email" makes a valid email format by replacing spaces and illegal email characters
- "unique" makes sure the generated email is unique to satisfy constraints. If it is not unique it will try again, in this case with a different suffix.

The resource files, simple list of names whereas newline is used as delimiter

### src/main/resources/email.txt

```
gmail.com
yahoo.com
msn.com
esito.no
inmeta.no
crayon.com
```
