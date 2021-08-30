# DBeraase

# Introduction

The DBerase service supports deletion and masking of data for GDPR **forget me** functions. It allows the programmer to create multiple erase tasks, each performing different deletion, masking or anonymization actions. The process involves the following:

- Identifying sensitive data that needs to be deleted/masked/anonymized
- Writing a set of rules in a domain-specific language (ANO) that masks and deletes data and organizes them into tasks
- Generating REST API for each task in a Java Spring Boot webserver program based on your rules, using the DBerase service
- Deploying the generated Java program and performing the **forget me** functions on the target database(s)

![alt text](/img/docs/dberase.png 'DBerase')
