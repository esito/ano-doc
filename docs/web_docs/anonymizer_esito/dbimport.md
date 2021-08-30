# DBimport

> The DBimport service supports reverse engineering of database
> schemas into Java source code with JPA annotations.

## How it works

- The generated domain model will contain classes, groups
  and associations.

- Database tables are mapped to domain model classes, and
  the table columns become attributes in the class.

- Foreign keys in the database schema are treated as
  associations.

- Value objects are created from indexes and primary keys in
  the database schema containing more than one column.

- Attribute types are mapped by an internal mapping.

### Code structure

- The code is organized in a source folder given by the Root
  package parameter.

- The service creates java packages based on the property Root
  package defined as parameter to the DBimport service.

- The default package is org.example.

## Documentation

<a
target='_blank'
rel='noopener noreferrer'
href='http://anonymizer-doc.esito.no/help/topic/no.esito.g9.doc.dbservices/DBimport.html'>
Get started with DBimport
</a>
