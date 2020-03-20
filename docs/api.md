# API Reference

## Blog posts

### Fetch the latest blog posts from the Echo WordPress site

`GET http://echo.church/wp-json/wp/v2/posts?per_page=3&orderby=date`

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

## Instagram

### Fetch Echo's Instagram page and proceed to scrape it 😂

`GET https://www.instagram.com/echochurchlive/`

## Verse of the day

### Fetch the verse of the day

```js
{
  headers: {
    Accept: 'application/json',
    'X-YouVersion-Developer-Token': 's2ykApiBUt-_A4c3kqXkftJDKxQ',
  },
}
```

`GET https://developers.youversionapi.com/1.0/verse_of_the_day/${day}?version_id=1`

where `day` is an integer value 1 through 366, representing the day of the year
