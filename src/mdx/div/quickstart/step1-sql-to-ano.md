---
sidebar_position: 3
label: translate-database--schemastructure
---

# Step 1 - Translate Your Database Structure to ANO


:::info Goals

1. We want to export the table definitions of all tables you will anonymize, alongside their table constraints (Primary Keys, Foreign Keys, Uniqueness, Allowed Values, etc.) into a single `.sql` file.

2. We want to use the **DBano Service** to translate the database structure from this `.sql` file into an `.ano` file.
:::

## 1. Connect to your database

Using your preferred Database Management tool

## 2. Export database DDL statements from the schema level

| <img src="/img/docs/generate_sql.png" width="400" /> |
|:--:|
| *Example on how to export using the DBmasker DB tool. This may differ from other DB tools* |

- Resulting `<create_tables>.sql` file should contain `CREATE TABLE` statements for all tables that are being anonymized.
- If present in `<create_tables>.sql`, you can delete other database structures such as Views, Functions, Procedures, ...

|<img src="/img/docs/generated_sql_sample.png" width="400" />|
|:--:|
| *Example of a generated .sql file containing `CREATE TABLE` statements* |

<details><summary><b>Hotel Example</b> - create_tables.sql (SQL Server Dialect)</summary>
<p>

```sql
create schema ano_hotel;

-- CREATE TABLE statements including basic column definitions

CREATE TABLE ano_hotel.Booking (
fromDate date,
toDate date,
  bookingCreated datetime,
  earliestCheckinTime time,
  customer_customerNo integer NOT NULL,
  id int IDENTITY(1,1) NOT NULL,
  hotel_id integer NOT NULL,
  roomCategory_id integer NOT NULL,
  LOCK_FLAG integer,
CONSTRAINT pk_booking_id PRIMARY KEY (id)
);


CREATE TABLE ano_hotel.Customer (
  creditCard varchar(16),
  customerNo integer NOT NULL,
  email varchar(40),
  name varchar(40),
  password varchar(40),
  phone varchar(20),
  LOCK_FLAG integer,
  PRIMARY KEY (customerNo)
);

CREATE TABLE ano_hotel.Hotel (
  id integer NOT NULL,
  location varchar(30),
  logo varchar(40),
  name varchar(40),
  chain_id integer NOT NULL,
  LOCK_FLAG integer,
  PRIMARY KEY (id)
);

CREATE TABLE ano_hotel.HotelChain (
  name varchar(40) NOT NULL,
  id integer NOT NULL,
  LOCK_FLAG integer,
  PRIMARY KEY (id)
);

CREATE TABLE ano_hotel.HotelRoomCategory (
  actualPrice decimal(10,2),
  fromDate date NOT NULL,
  toDate date,
  hotel_id integer NOT NULL,
  roomCategory_id integer NOT NULL,
  LOCK_FLAG integer,
  CONSTRAINT HotelRoomCategory_PK PRIMARY KEY (hotel_id,roomCategory_id,fromDate)
);

CREATE TABLE ano_hotel.Address (
  homeAddress varchar(40),
  postalCode integer,
  id integer NOT NULL,
  customer_customerNo integer NOT NULL,
  LOCK_FLAG integer,
  PRIMARY KEY (id)
);

CREATE TABLE ano_hotel.Room (
  roomNo integer,
  floor integer,
  balcony smallint,
  heading integer CHECK (heading IN (1,2,3,4)),
  id integer NOT NULL,
  category_id integer NOT NULL,
  hotel_id integer NOT NULL,
  LOCK_FLAG integer,
  PRIMARY KEY (id)
);

CREATE TABLE ano_hotel.RoomCategory (
  bedType integer CHECK (bedType IN (1,2,3,4,5)),
  guests integer,
  id integer NOT NULL,
  initialPrice decimal(10,2),
  maxDiscount integer,
  roomQuality integer CHECK (roomQuality IN (1,2,3)),
  LOCK_FLAG integer,
  PRIMARY KEY (id)
);


ALTER TABLE ano_hotel.Booking ADD CONSTRAINT Booking_customer_customerNoF FOREIGN KEY (customer_customerNo) REFERENCES ano_hotel.Customer (customerNo);
ALTER TABLE ano_hotel.Booking ADD CONSTRAINT Booking_hotel_idF FOREIGN KEY (hotel_id) REFERENCES ano_hotel.Hotel (id);
ALTER TABLE ano_hotel.Booking ADD CONSTRAINT Booking_roomCategory_idF FOREIGN KEY (roomCategory_id) REFERENCES ano_hotel.RoomCategory (id);

-- Hotel
ALTER TABLE ano_hotel.Hotel ADD CONSTRAINT Hotel_chain_idF FOREIGN KEY (chain_id) REFERENCES ano_hotel.HotelChain (id);

-- HotelChain

-- HotelRoomCategory
ALTER TABLE ano_hotel.HotelRoomCategory ADD CONSTRAINT HotelRoomCategory_hotel_idF FOREIGN KEY (hotel_id) REFERENCES ano_hotel.Hotel (id);
ALTER TABLE ano_hotel.HotelRoomCategory ADD CONSTRAINT HotelRoomCatego_roomCategory_F FOREIGN KEY (roomCategory_id) REFERENCES ano_hotel.RoomCategory (id);

-- Address
ALTER TABLE ano_hotel.Address ADD CONSTRAINT Address_customer_customerNoF FOREIGN KEY (customer_customerNo) REFERENCES ano_hotel.Customer (customerNo);

-- Room
ALTER TABLE ano_hotel.Room ADD CONSTRAINT Room_category_idF FOREIGN KEY (category_id) REFERENCES ano_hotel.RoomCategory (id);
ALTER TABLE ano_hotel.Room ADD CONSTRAINT Room_hotel_idF FOREIGN KEY (hotel_id) REFERENCES ano_hotel.Hotel (id);
```

</p>
</details>

## 3. Log into [Anonymizer Dashboard](https://dev.esito.no/auth/dashboard/home)

<img src="/img/docs/ano_dashboard_dbano.png" width="800" />

1. Select the DBano Service.
2. Upload the `<create_tables>.sql` file and download ANO file

Resulting `<create_tables>.ano` file now describes your database structure in the ANO domain specific language.

:::tip Next Step

You are now ready to begin writing anonymizing, masking, data generating or data deleting rules into your `.ano` file.

<details><summary><b>Hotel Example</b> - create_tables.ano (ANO Syntax)</summary>
<p>

```ano
table Address
	column text homeAddress size 40
	column integer postalCode
	column integer id
	column integer LOCK_FLAG
	column integer customer_customerNo
	primary-key id
table Booking
	column date fromDate
	column date toDate
	column datetime bookingCreated
	column time earliestCheckinTime
	column integer id
	column integer LOCK_FLAG
	column integer customer_customerNo
	column integer hotel_id
	column integer roomCategory_id
	primary-key id
table Customer
	column text creditCard size 16
	column integer customerNo
	column text email size 40
	column text name size 40
	column text password size 40
	column text phone size 20
	column integer LOCK_FLAG
	primary-key customerNo
table Hotel
	column integer id
	column text location size 30
	column text logo size 40
	column text name size 40
	column integer LOCK_FLAG
	column integer chain_id
	primary-key id
table HotelChain
	column text name size 40
	column integer id
	column integer LOCK_FLAG
	primary-key id
table HotelRoomCategory
	column decimal actualPrice size 10  scale 2
	column date fromDate
	column date toDate
	column integer LOCK_FLAG
	column integer hotel_id
	column integer roomCategory_id
	primary-key hotel_id, roomCategory_id, fromDate
table Room
	column integer roomNo
	column integer floor
	column integer balcony
	column integer heading
	column integer id
	column integer LOCK_FLAG
	column integer category_id
	column integer hotel_id
	primary-key id
table RoomCategory
	column integer bedType
	column integer guests
	column integer id
	column decimal initialPrice size 10  scale 2
	column integer maxDiscount
	column integer roomQuality
	column integer LOCK_FLAG
	primary-key id

foreign-key
	Hotel id
	HotelRoomCategory hotel_id
foreign-key
	RoomCategory id
	HotelRoomCategory roomCategory_id
foreign-key
	Customer customerNo
	Address customer_customerNo
foreign-key
	Customer customerNo
	Booking customer_customerNo
foreign-key
	Hotel id
	Booking hotel_id
foreign-key
	RoomCategory id
	Booking roomCategory_id
foreign-key
	HotelChain id
	Hotel chain_id
foreign-key
	RoomCategory id
	Room category_id
foreign-key
	Hotel id
	Room hotel_id

/*
Here you need to add your tasks and anonymizations. example..

task MyTaskName
{
    // Anonymize - Mask various fields
    update CUSTOMER Anonymize_CUSTOMER
		// Create random name from list of firstnames and lastnames
        mask FULLNAME CUSTOMER_FULLNAME
            format "%s %s"
            file src/main/resources/firstname.txt random-order
            file src/main/resources/lastname.txt random-order
		// Create random Norwegian phone number
		mask PHONE CUSTOMER_PHONE
			format "+47 %d"
			random-integer 10001000 99909990
        // Create random creditcard with checksum that validates
        mask CREDITCARD CUSTOMER_CREDITCARD
            format "41428340%d"
            transform CreditCard    // Run the CreditCard transformation to set correct checksum digits
            random-integer 10001000 99919991
}
*/
```

</p>
</details>

:::
