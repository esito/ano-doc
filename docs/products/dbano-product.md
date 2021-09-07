---
sidebar_position: 4
id: dbano-product
---
# DBano

ref: https://esito-conf.inmeta.com/display/DBMAS/DBano

## Introduction

The DBano service generates ANO files describing database structure using the ANO DSL language described in DBmasker ANO syntax.

The generated result contains tables, columns, primary-keys, unique constraints and foreign key definitions and may be extended with anonymization/masking rules. The service takes database schema sql files as input.

<br/>

## Generate the java code

Once you have created the SQL file, you can generate the ANO file. A generation service is available on http://anonymizer.esito.no. Select your **SQL** file as **Schema File name** input and press the **Download ANO file** button.

![alt text](/img/docs/dbanoweb.png 'DBano Web')

<br/>

## Sample code

### Recordshop tables

```sql
CREATE TABLE Artist (
  id integer generated always as identity NOT NULL,
  name varchar(40),
  nationality varchar(40),
  gossip varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE Author (
  id integer generated always as identity NOT NULL,
  name varchar(40),
  birth date,
  telephone varchar(14),
  PRIMARY KEY (id)
);

CREATE TABLE Customer (
  id integer generated always as identity NOT NULL,
  name varchar(30),
  address varchar(128),
  email varchar(40),
  pay integer CHECK (pay IN (1,2,3)),
  telephone varchar(14),
  information smallint,
  customerCategory integer CHECK (customerCategory IN (1,2,3)),
  PRIMARY KEY (id)
);

CREATE TABLE LineItem (
  id integer generated always as identity NOT NULL,
  serialNo integer,
  numItems integer,
  price integer,
  recordOrder_id integer NOT NULL,
  record_id integer NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Record (
  id integer generated always as identity NOT NULL,
  title varchar(100),
  coverImage varchar(100),
  description varchar(255),
  price integer,
  itemsInStock integer,
  itemsSold integer,
  releaseDate date,
  priceLevel integer CHECK (priceLevel IN (1,2,3)),
  musicCategory integer CHECK (musicCategory IN (1,2,3,4,5,6,7)),
  artist_id integer,
  PRIMARY KEY (id)
);

CREATE TABLE RecordOrder (
  id integer generated always as identity NOT NULL,
  orderNo varchar(30) NOT NULL,
  orderDate date,
  creditcard integer CHECK (creditcard IN (1,2,3)),
  customer_id integer NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Review (
  id integer generated always as identity NOT NULL,
  publication varchar(60),
  reviewDate date,
  score integer CHECK (score IN (1,2,3,4,5,6)),
  reviewDetail varchar(1024),
  author_id integer,
  record_id integer NOT NULL,
  PRIMARY KEY (id)
);

-- Artist
CREATE UNIQUE INDEX Artist_name_IX ON Artist (name);
-- LineItem
ALTER TABLE LineItem ADD CONSTRAINT LineItem_recordOrder_idF FOREIGN KEY (recordOrder_id) REFERENCES RecordOrder (id);
ALTER TABLE LineItem ADD CONSTRAINT LineItem_record_idF FOREIGN KEY (record_id) REFERENCES Record (id);
-- Record
ALTER TABLE Record ADD CONSTRAINT Record_artist_idF FOREIGN KEY (artist_id) REFERENCES Artist (id);
-- RecordOrder
ALTER TABLE RecordOrder ADD CONSTRAINT RecordOrder_customer_idF FOREIGN KEY (customer_id) REFERENCES Customer (id);
CREATE UNIQUE INDEX RecordOrder_orderNo_IX ON RecordOrder (orderNo);
-- Review
ALTER TABLE Review ADD CONSTRAINT Review_author_idF FOREIGN KEY (author_id) REFERENCES Author (id);
ALTER TABLE Review ADD CONSTRAINT Review_record_idF FOREIGN KEY (record_id) REFERENCES Record (id);
```

<br/>

### Sample generated ANO file:

```ano
table Artist
    column integer id
    column text name
    column text nationality
    column text gossip
    primary-key id
    unique name name
table Author
    column integer id
    column text name
    column date birth
    column text telephone
    primary-key id
table Customer
    column integer id
    column text name
    column text address
    column text email
    column integer pay
    column text telephone
    column integer information
    column integer customerCategory
    primary-key id
table LineItem
    column integer id
    column integer serialNo
    column integer numItems
    column integer price
    column integer record_id
    column integer recordOrder_id
    primary-key id
table Record
    column integer id
    column text title
    column text coverImage
    column text description
    column integer price
    column integer itemsInStock
    column integer itemsSold
    column date releaseDate
    column integer priceLevel
    column integer musicCategory
    column integer artist_id
    primary-key id
table RecordOrder
    column integer id
    column text orderNo
    column date orderDate
    column integer creditcard
    column integer customer_id
    primary-key id
    unique orderNo orderNo
table Review
    column integer id
    column text publication
    column date reviewDate
    column integer score
    column text reviewDetail
    column integer author_id
    column integer record_id
    primary-key id

foreign-key
    LineItem record_id
    Record id
foreign-key
    LineItem recordOrder_id
    RecordOrder id
foreign-key
    Record artist_id
    Artist id
foreign-key
    RecordOrder customer_id
    Customer id
foreign-key
    Review author_id
    Author id
foreign-key
    Review record_id
    Record id
```
