## Mongoose Express CRUD Mastery - Assignment 2

This API is built using Node.js and Express, with TypeScript as the programming language. It provides four main operations for managing user data: creating a new user, updating user information, fetching details of a single user, and deleting a user. Additionally, the API allows you to add orders to a specific user, retrieve the orders for a particular user, and calculate the total price of the orders associated with that user. The API's are discussed below.

- API LINK: https://user-crud-management-assignment2.vercel.app

#### 1. Create New User

- Endpoint: **POST** **/api/users**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users
- The firstName and lastName should be in capitalized format in the body.
- The password is hashed using bcrypt and stored in database
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

#### 4. Update user information

- Endpoint: **PUT** **/api/users/:userId**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users/1
- Static method is used to determine if the user exist or not.
- Response: **Password field is not included in the response data.**

```
{
    "success": true,
    "message": "User updated successfully!",
    "data": {
        "userId": 1,
        "username": "m45ud",
        "fullName": {
            "firstName": "Abdullah Al",
            "lastName": "Masud"
        },
        "age": 24,
        "email": "abdullahmasud@gmail.com",
        "isActive": false,
        "hobbies": [
            "programming",
            "Gaming",
            "Hangout"
        ],
        "address": {
            "street": "Nasirabad",
            "city": "Chittagong",
            "country": "Bangladesh"
        }
    }
}
```

#### 5. Delete a user

- Endpoint: **DELETE** **/api/users/:userId**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users/1
- Static method is used to determine if the user exist or not.
- Response:

```
{
    "success": true,
    "message": "User deleted successfully!",
    "data": null
}
```

### Order Management:

#### 1. Add New Product in Order

- Endpoint: **PUT** **/api/users/:userId/orders**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users/1/orders
- New order is pushed into the orders array.
- Static method is used to determine if the user exist or not.
- Request body sample:

```
{
    "productName": "bike",
    "price": 2500,
    "quantity": 2
}
```

- Response:

```
{
    "success": true,
    "message": "Order created successfully!",
    "data": null
}
```

#### 2. Retrieve all orders for a specific user

- Endpoint: **GET** **/api/users/:userId/orders**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users/1/orders
- Static method is used to determine if the user exist or not.
- Response:

```
{
    "success": true,
    "message": "Order fetched successfully!",
    "data": {
        "orders": [
            {
                "productName": "bike",
                "price": 211.054,
                "quantity": 3
            },
            {
                "productName": "plane",
                "price": 300,
                "quantity": 3
            }
        ]
    }
}
```

#### 2. Calculate Total Price of Orders for a Specific User

- Endpoint: **GET** **/api/users/:userId/orders/total-price**
- Sample API: https://user-crud-management-assignment2.vercel.app/api/users/1/orders/total-price
- Static method is used to determine if the user exist or not.
- Response:

```
{
    "success": true,
    "message": "Total price calculated successfully!",
    "data": {
        "totalPrice": 1533.16
    }
}
```

#### Error Response

- If no user is found

```
{
    "success": false,
    "message": "User not found",
    "error": {
        "code": 404,
        "description": "User not found!"
    }
}
```
