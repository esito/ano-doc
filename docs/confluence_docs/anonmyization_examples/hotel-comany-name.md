# Hotel / Company name

This requires you to have an associated text file with names to be used for masking. Put this file in the "resources" folder.

## Mask first name and last name

```ano
task MyTaskName
{
    // Anonymize - Mask various fields
    update HOTEL Anonymize_HOTEL
        // Create random name from list of lastnames
        mask NAME HOTEL_NAME
            format "%s Hotel"
            file src/main/resources/lastname.txt random-order
}
```

## Mask first name and last name

```ano
task MyTaskName
{
    // Anonymize - Mask various fields
    update COMPANY Anonymize_COMPANY
        // Create random name from list of lastnames
        mask NAME COMPANY_NAME
            format "%s Ltd"
            file src/main/resources/lastname.txt random-order
}
```
