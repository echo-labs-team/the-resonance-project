---
id: api
title: API Reference
---

## Groups

### Fetch groups

`GET /groups/open?year={year}&month={month}&day={day}`

### Fetch categories

`GET /groups/categories`

### Contact group leader

`POST /contact`

```json
{
  "groupId": "12345678",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "body": "A question about the group"
}
```

### Join group

`POST /people/join`

```json
{
  "groupId": "12345678",
  "person": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@gmail.com",
    "memberType": "Member"
  }
}
```
