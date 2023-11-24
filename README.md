## Mongoose Express CRUD Mastery - Assignment 2

This API is built using Node.js and Express, with TypeScript as the programming language. It provides four main operations for managing user data: creating a new user, updating user information, fetching details of a single user, and deleting a user. Additionally, the API allows you to add orders to a specific user, retrieve the orders for a particular user, and calculate the total price of the orders associated with that user. The API's are discussed below.

#### 1. Create New User

- Endpoint: **POST** **/api/users**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users
- The firstName and lastName should be in capitalized format
- Request body sample:

```
{
    "userId": 1,
    "username": "john",
    "password": "helloworld",
    "fullName": {
        "firstName": "John",
        "lastName": "Cena"
    },
    "age": 25,
    "email": "johsn@gmail.com",
    "isActive": true,
    "hobbies": [
        "reading",
        "hiking"
    ],
    "address": {
        "street": "123 Main Street",
        "city": "Anytown",
        "country": "CountryName"
    }
}
```

- Response: **Password field is not included in the response data**

```
{
    "success": true,
    "message": "User created successfully!",
    "data": {
        "userId": 1,
        "username": "john",
        "fullName": {
            "firstName": "John",
            "lastName": "Cena"
        },
        "age": 25,
        "email": "johsn@gmail.com",
        "isActive": true,
        "hobbies": [
            "reading",
            "hiking"
        ],
        "address": {
            "street": "123 Main Street",
            "city": "Anytown",
            "country": "CountryName"
        }
    }
}
```

#### 2. Retrieve a list of all users

- Endpoint: **GET** **/api/users**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users
- Response: `username`, `fullName`, `age`, `email` and `address` are only fetched.

```
{
    "success": true,
    "message": "Users fetched successfully!",
    "data": [
        {
            "username": "john",
            "fullName": {
                "firstName": "John",
                "lastName": "Cena"
            },
            "age": 25,
            "email": "johsn@gmail.com",
            "address": {
                "street": "123 Main Street",
                "city": "Anytown",
                "country": "CountryName"
            }
        },
    ]
}
```

#### 3. Retrieve a specific user by ID

- Endpoint: **GET** **/api/users/:userId**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users/1
- Static method is used to determine if the user exist or not.
- Response: **Password field is not included in the response data.**

```
{
    "success": true,
    "message": "User fetched successfully!",
    "data": {
        "userId": 1,
        "username": "john",
        "fullName": {
            "firstName": "John",
            "lastName": "Cena"
        },
        "age": 25,
        "email": "johsn@gmail.com",
        "isActive": true,
        "hobbies": [
            "reading",
            "hiking"
        ],
        "address": {
            "street": "123 Main Street",
            "city": "Anytown",
            "country": "CountryName"
        }
    }
}
```

#### 3. Update user information

- Endpoint: **PUT** **/api/users/:userId**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users/1
- Static method is used to determine if the user exist or not.
- Response: **Password field is not included in the response data.**
