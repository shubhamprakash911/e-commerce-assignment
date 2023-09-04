# e-commerce-assignment

Based on the provided schema and controller code, I will create API documentation in Markdown format for the user routes. Below is the documentation for user registration, login, and logout routes:

## User API Documentation

## User Registration

### Register a new user

**Endpoint:** `/api/user/register`

**HTTP Method:** `POST`

**Request Parameters:**

| Parameter  | Type   | Required | Description                                                                |
| ---------- | ------ | -------- | -------------------------------------------------------------------------- |
| `username` | String | Yes      | User's username.                                                           |
| `email`    | String | Yes      | User's email.                                                              |
| `password` | String | Yes      | User's password.                                                           |
| `role`     | String | No       | User's role (default: "user"). Possible values: "user", "admin", "seller". |

**Sample Request:**

```http
POST /api/user/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "secure_password",
  "role": "user"
}
```

**Response:**

- `200 OK` if registration is successful.
- `400 Bad Request` if the provided data is invalid or missing.
- `409 Conflict` if the username or email is already registered.

**Sample Response (Success):**

```json
{
  "msg": "User registration successful",
  "data": {
    "_id": "60f3e6c73a14440015224099",
    "username": "john_doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

**Sample Response (Conflict - Username Already Exists):**

```json
{
  "error": "Username 'john_doe' is already registered"
}
```

**Sample Response (Conflict - Email Already Exists):**

```json
{
  "error": "Email 'john.doe@example.com' is already registered"
}
```

## User Login

### Authenticate a user

**Endpoint:** `/api/user/login`

**HTTP Method:** `POST`

**Request Parameters:**

| Parameter  | Type   | Required | Description      |
| ---------- | ------ | -------- | ---------------- |
| `email`    | String | Yes      | User's email.    |
| `password` | String | Yes      | User's password. |

**Sample Request:**

```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "secure_password"
}
```

**Response:**

- `200 OK` if login is successful.
- `401 Unauthorized` if the provided credentials are invalid.

**Sample Response (Success):**

```json
{
  "msg": "Login successful",
  "data": {
    "user": {
      "_id": "60f3e6c73a14440015224099",
      "username": "john_doe",
      "email": "john.doe@example.com",
      "role": "user"
    }
  }
}
```

**Sample Response (Unauthorized - Invalid Credentials):**

```json
{
  "error": "Invalid email or password"
}
```

## User Logout

### Log out a user

**Endpoint:** `/api/user/logout`

**HTTP Method:** `GET`

**Request Headers:**

| Header          | Description                    |
| --------------- | ------------------------------ |
| `Authorization` | Bearer token obtained on login |

**Sample Request:**

```http
GET /api/user/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

- `200 OK` if logout is successful.
- `401 Unauthorized` if the provided token is invalid or missing.

**Sample Response (Success):**

```json
{
  "msg": "Logout successful"
}
```

**Sample Response (Unauthorized - Invalid Token):**

```json
{
  "error": "Unauthorized. Please log in."
}
```

## Category API Documentation

This API allows you to manage categories.

## Table of Contents

- [1. Add a Category](#1-add-a-category)
- [2. Get All Categories](#2-get-all-categories)

---

## 1. Add a Category

**Endpoint:** `POST /api/category/`

Adds a new category.

### Request

- **Method:** `POST`
- **URL:** `/api/category/`
- **Authentication:** Required (Token stored in cookies)
- **Authorization:** Required (Admin role)

**Request Body:**

```json
{
  "name": "Category Name",
  "description": "Category Description (optional)"
}
```

- `name` (string, required): The name of the category (must be unique).
- `description` (string, optional): A brief description of the category.

### Response

- **Status Code:** `200 OK`
- **Response Body:**

```json
{
  "msg": "Category added successfully"
}
```

### Error Responses

- **Status Code:** `400 Bad Request`

  - If the request body is missing required fields or contains invalid data.
  - If a category with the same name already exists.

- **Status Code:** `401 Unauthorized`

  - If the user is not authenticated.
  - If the user is not authorized (not an admin).

- **Status Code:** `500 Internal Server Error`
  - If there is an internal server error.

---

## 2. Get All Categories

**Endpoint:** `GET /api/category/`

Retrieves a list of all categories.

### Request

- **Method:** `GET`
- **URL:** `/api/category/`

### Response

- **Status Code:** `200 OK`
- **Response Body:**

```json
{
  "msg": "Successfully retrieved all categories",
  "data": [
    {
      "_id": "category_id",
      "name": "Category Name",
      "description": "Category Description"
    }
  ]
}
```

### Error Responses

- **Status Code:** `500 Internal Server Error`
  - If there is an internal server error.

---

## Product API Documentation

The Product API allows you to manage products in an e-commerce system. This API provides endpoints for adding new products, retrieving a list of all products, and fetching a specific product by its ID.

## Authentication

To access the Product API, you must be authenticated. The API uses cookies to store the authentication token.

### Base URL

The base URL for all Product API endpoints is `/api/products`.

---

## Add a New Product

### `POST /`

Add a new product to the system.

#### Request

- **Endpoint:** `/api/products/`
- **Authentication:** Required (admin role)

**Request Body**

```json
{
  "title": "Product Title",
  "description": "Product Description",
  "price": 19.99,
  "categoryId": "category_id",
  "availability": true
}
```

- `title` (String, required): The title of the product.
- `description` (String): Optional product description.
- `price` (Number, required): The price of the product.
- `categoryId` (String, required): The ID of the category to which the product belongs.
- `availability` (Boolean): Indicates whether the product is available (default: true).

#### Response

- **Status Code:** 200 OK
- **Response Body**

```json
{
  "msg": "Product added successfully",
  "data": {
    "_id": "product_id",
    "title": "Product Title",
    "description": "Product Description",
    "price": 19.99,
    "category": "category_id",
    "availability": true
  }
}
```

#### Error Responses

- **Status Code:** 401 Unauthorized
  - When not authenticated or lacking admin privileges.
- **Status Code:** 500 Internal Server Error
  - If an error occurs during product creation.

---

## Get All Products

### `GET /`

Retrieve a list of all products in the system.

#### Request

- **Endpoint:** `/api/products/`
- **Authentication:** Required

#### Response

- **Status Code:** 200 OK
- **Response Body**

```json
{
  "msg": "Successfully retrieved all products",
  "data": [
    {
      "_id": "product_id",
      "title": "Product Title",
      "description": "Product Description",
      "price": 19.99,
      "category": "category_id",
      "availability": true
    }
    // ... (more products)
  ]
}
```

#### Error Responses

- **Status Code:** 401 Unauthorized
  - When not authenticated.

---

## Get a Specific Product

### `GET /:id`

Retrieve a specific product by its ID.

#### Request

- **Endpoint:** `/api/products/:id`
- **Authentication:** Required

#### Response

- **Status Code:** 200 OK
- **Response Body**

```json
{
  "msg": "Successfully retrieved the product",
  "data": {
    "_id": "product_id",
    "title": "Product Title",
    "description": "Product Description",
    "price": 19.99,
    "category": "category_id",
    "availability": true
  }
}
```

#### Error Responses

- **Status Code:** 401 Unauthorized
  - When not authenticated.
- **Status Code:** 404 Not Found
  - If the product with the specified ID does not exist.

---

# Order API Documentation

## Table of Contents

- [Place an Order](#place-an-order)
- [Get Orders by User ID](#get-orders-by-user-id)
- [Get Order Details by Order ID](#get-order-details-by-order-id)

---

## Place an Order

### Endpoint

```
POST /orders
```

### Description

Place a new order.

### Request

- **userId** (string, required): The unique identifier of the user placing the order.
- **items** (array of objects, required): An array of order items, each containing:
  - **productId** (string, required): The unique identifier of the product being ordered.
  - **quantity** (number, required): The quantity of the product being ordered.
  - **price** (number, required): The price of the product.

Example Request Body:

```json
{
  "userId": "user123",
  "items": [
    {
      "productId": "product123",
      "quantity": 2,
      "price": 10.99
    },
    {
      "productId": "product456",
      "quantity": 1,
      "price": 5.99
    }
  ],
  "totalAmount": 27.97
}
```

### Response

- **Status Code**: 201 Created
- **Body**: The newly created order object.

Example Response Body:

```json
{
  "_id": "order123",
  "userId": "user123",
  "items": [
    {
      "productId": "product123",
      "quantity": 2,
      "price": 10.99
    },
    {
      "productId": "product456",
      "quantity": 1,
      "price": 5.99
    }
  ],
  "totalAmount": 27.97,
  "createdAt": "2023-09-02T12:00:00.000Z",
  "updatedAt": "2023-09-02T12:00:00.000Z"
}
```

---

## Get Orders by User ID

### Endpoint

```
GET /orders/history/:userId
```

### Description

Get a list of orders for a specific user.

### Request

- **userId** (string, required): The unique identifier of the user.

### Response

- **Status Code**: 200 OK
- **Body**: An array of order objects.

Example Response Body:

```json
[
  {
    "_id": "order123",
    "userId": "user123",
    "items": [
      {
        "productId": "product123",
        "quantity": 2,
        "price": 10.99
      },
      {
        "productId": "product456",
        "quantity": 1,
        "price": 5.99
      }
    ],
    "totalAmount": 27.97,
    "createdAt": "2023-09-02T12:00:00.000Z",
    "updatedAt": "2023-09-02T12:00:00.000Z"
  },
  {
    "_id": "order456",
    "userId": "user123",
    "items": [
      {
        "productId": "product789",
        "quantity": 3,
        "price": 7.99
      }
    ],
    "totalAmount": 23.97,
    "createdAt": "2023-09-02T14:00:00.000Z",
    "updatedAt": "2023-09-02T14:00:00.000Z"
  }
]
```

---

## Get Order Details by Order ID

### Endpoint

```
GET /orders/detail/:orderId
```

### Description

Get detailed information about a specific order by its unique identifier.

### Request

- **orderId** (string, required): The unique identifier of the order.

### Response

- **Status Code**: 200 OK
- **Body**: The order object.

Example Response Body:

```json
{
  "_id": "order123",
  "userId": "user123",
  "items": [
    {
      "productId": "product123",
      "quantity": 2,
      "price": 10.99
    },
    {
      "productId": "product456",
      "quantity": 1,
      "price": 5.99
    }
  ],
  "totalAmount": 27.97,
  "createdAt": "2023-09-02T12:00:00.000Z",
  "updatedAt": "2023-09-02T12:00:00.000Z"
}
```

---
