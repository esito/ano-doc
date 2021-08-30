# Mask names

This requires you to have an associated text file with names to be used for masking. Put this file in the "resources" folder.

## Mask first name and last name

```ano
task MyTaskName
{
    // Anonymize - Mask various fields
    update CUSTOMER Anonymize_CUSTOMER
        // Create random name from list of firstnames and lastnames
        mask FIRSTNAME CUSTOMER_FIRSTNAME
            format "%s"
            file src/main/resources/firstname.txt random-order
        mask LASTNAME CUSTOMER_LASTNAME
            format "%s"
            file src/main/resources/lastname.txt random-order
}
```

## Mask full name

```ano
task MyTaskName
{
    // Anonymize - Mask various fields
    update CUSTOMER Anonymize_CUSTOMER
        // Create random name from list of firstnames and lastnames
        mask FULLNAME CUSTOMER_FULLNAME
            format "%s %s"
            file src/main/resources/firstname.txt random-order
            file src/main/resources/lastname.txt random-order
}  
```

Notice the format string "%s %s" that will give the items from the two input files with a space between. For a lastname, firstname format you can re-order the file inputs and have a format "%s, %s". 

The resource files, simple list of names whereas newline is used as delimiter

### src/main/resources/lastname.txt

```txt
Kennedy
Perez
Howell
Hopkins
Saunders
Barton
Jenkins
Nicholson
Schmidt
Patton
Ellis
Gonzales
Morrison
... etc
```