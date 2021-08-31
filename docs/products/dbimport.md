---
sidebar_position: 5
id: dbimport-3
---
# DBimport 3

ref: https://esito-conf.inmeta.com/display/DBMAS/DBimport

# Introduction

The DBimport service supports reverse engineering of database schemas into Java source code with JPA annotations.

The generated domain model will contain classes, groups and associations. Database tables are mapped to domain model classes, and the table columns become attributes in the class. Foreign keys in the database schema are treated as associations. Value objects are created from indexes and primary keys in the database schema containing more than one column.

Attribute types are mapped by an internal mapping.

<br/>

# Code structure

The code is organized in a source folder given by the Root package parameter.

The service creates java packages based on the property **Root package** defined as parameter to the **DBimport** service. The default package is org.example.

<br/>

# Generate the java code

Once you have created the SQL file, you can generate the java source. A generation service is available on http://anonymizer.esito.no. Select your **SQL** file as **Schema File name** input, edit the **Root package** parameter and press the **Download ZIP** button.

![alt text](/img/docs/dbimportweb.png 'DBimport Web')

<br/>

Unpack the returned zip file into a java project folder of your choice.

# Sample code

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

## Sample generated source code (class RecordOrder)

```java
package org.example;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(indexes={@Index(name="RecordOrder_orderNo_IX", columnList="orderNo", unique=true)})
public class RecordOrder {

    /** Primary key. */
    protected static final String PK = "id";

    @Id
    @Column(unique=true, nullable=false)
    private String id;
    @Column(unique=true, nullable=false, length=30)
    private String orderNo;
    private String orderDate;
    private String creditcard;
    @OneToMany(mappedBy="recordOrder")
    private Set<LineItem> lineItem;
    @ManyToOne(optional=false)
    @JoinColumn(name="customer_id", nullable=false)
    private Customer customer;

    /** Default constructor. */
    public RecordOrder() {
        super();
    }

    /**
     * Access method for id.
     *
     * @return the current value of id
     */
    public String getId() {
        return id;
    }

    /**
     * Setter method for id.
     *
     * @param aId the new value for id
     */
    public void setId(String aId) {
        id = aId;
    }

    /**
     * Access method for orderNo.
     *
     * @return the current value of orderNo
     */
    public String getOrderNo() {
        return orderNo;
    }

    /**
     * Setter method for orderNo.
     *
     * @param aOrderNo the new value for orderNo
     */
    public void setOrderNo(String aOrderNo) {
        orderNo = aOrderNo;
    }

    /**
     * Access method for orderDate.
     *
     * @return the current value of orderDate
     */
    public String getOrderDate() {
        return orderDate;
    }

    /**
     * Setter method for orderDate.
     *
     * @param aOrderDate the new value for orderDate
     */
    public void setOrderDate(String aOrderDate) {
        orderDate = aOrderDate;
    }

    /**
     * Access method for creditcard.
     *
     * @return the current value of creditcard
     */
    public String getCreditcard() {
        return creditcard;
    }

    /**
     * Setter method for creditcard.
     *
     * @param aCreditcard the new value for creditcard
     */
    public void setCreditcard(String aCreditcard) {
        creditcard = aCreditcard;
    }

    /**
     * Access method for lineItem.
     *
     * @return the current value of lineItem
     */
    public Set<LineItem> getLineItem() {
        return lineItem;
    }

    /**
     * Setter method for lineItem.
     *
     * @param aLineItem the new value for lineItem
     */
    public void setLineItem(Set<LineItem> aLineItem) {
        lineItem = aLineItem;
    }

    /**
     * Access method for customer.
     *
     * @return the current value of customer
     */
    public Customer getCustomer() {
        return customer;
    }

    /**
     * Setter method for customer.
     *
     * @param aCustomer the new value for customer
     */
    public void setCustomer(Customer aCustomer) {
        customer = aCustomer;
    }

    /**
     * Compares the key for this instance with another RecordOrder.
     *
     * @param other The object to compare to
     * @return True if other object is instance of class RecordOrder and the key objects are equal
     */
    private boolean equalKeys(Object other) {
        if (this==other) {
            return true;
        }
        if (!(other instanceof RecordOrder)) {
            return false;
        }
        RecordOrder that = (RecordOrder) other;
        Object myId = this.getId();
        Object yourId = that.getId();
        if (myId==null ? yourId!=null : !myId.equals(yourId)) {
            return false;
        }
        return true;
    }

    /**
     * Compares this instance with another RecordOrder.
     *
     * @param other The object to compare to
     * @return True if the objects are the same
     */
    @Override
    public boolean equals(Object other) {
        if (!(other instanceof RecordOrder)) return false;
        return this.equalKeys(other) && ((RecordOrder)other).equalKeys(this);
    }

    /**
     * Returns a hash code for this instance.
     *
     * @return Hash code
     */
    @Override
    public int hashCode() {
        int i;
        int result = 17;
        if (getId() == null) {
            i = 0;
        } else {
            i = getId().hashCode();
        }
        result = 37*result + i;
        return result;
    }

    /**
     * Returns a debug-friendly String representation of this instance.
     *
     * @return String representation of this instance
     */
    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer("[RecordOrder |");
        sb.append(" id=").append(getId());
        sb.append("]");
        return sb.toString();
    }

    /**
     * Return all elements of the primary key.
     *
     * @return Map of key names to values
     */
    public Map<String, Object> getPrimaryKey() {
        Map<String, Object> ret = new LinkedHashMap<String, Object>(6);
        ret.put("id", getId());
        return ret;
    }

}
```
