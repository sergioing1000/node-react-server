# Node.js Backend Application

## Overview
This Node.js application is a backend server that connects to a MongoDB database and provides an API for managing a collection of items. The server is designed to handle CRUD operations and supports CORS for cross-origin requests from the frontend hosted at `https://wish-list-apeh.vercel.app`.

---

## Features

### 1. **API Endpoints**
#### Root Endpoint
- **GET /**
  - Returns an HTML response with a placeholder message.

#### Items Endpoint
- **GET /api/items**
  - Retrieves all items from the database.
  - Response:
    - `200 OK`: Returns the list of items.
    - `404 Not Found`: No items available.

- **POST /api/save**
  - Saves new items to the database.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "rows": [
        ["Description1", "Quantity1"],
        ["Description2", "Quantity2"]
      ]
    }
    ```
  - Response:
    - `201 Created`: Data updated successfully.
    - `500 Internal Server Error`: Error updating data.

### 2. **Middleware**
- **CORS**:
  - Configured to allow requests from `https://wish-list-apeh.vercel.app`.
  - Handles preflight requests for specific methods (GET, POST, PUT, DELETE, OPTIONS).

- **Body Parser**:
  - Parses incoming JSON payloads.

- **Custom CORS Headers**:
  - Adds additional headers to handle cross-origin resource sharing and credentials.

### 3. **Database Integration**
- **MongoDB**:
  - Uses the MongoDB driver to connect to a cluster.
  - Supports:
    - Reading all documents from a collection.
    - Replacing documents with new data.
  - Securely connects using credentials stored in `.env` variables:
    ```env
    MONGO_USER=<your_mongo_user>
    MONGO_PASSWORD=<your_mongo_password>
    MONGO_CLUSTER=<your_mongo_cluster>
    ```

### 4. **Server Initialization**
- Initializes data from the database at startup.
- Starts the server on `http://localhost:3000`.

---

## Dependencies

### Main Dependencies
- **dotenv**: For loading environment variables.
- **mongodb**: For connecting to and interacting with the MongoDB database.
- **express**: For setting up the web server and handling routes.
- **cors**: For enabling CORS policies.
- **body-parser**: For parsing incoming JSON requests.
- **vercel**: For deployment.

### Development Dependencies
- **nodemon**: For automatic server restart during development.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_USER=<your_mongo_user>
     MONGO_PASSWORD=<your_mongo_password>
     MONGO_CLUSTER=<your_mongo_cluster>
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

- **Access the server**:
  - Open your browser and navigate to `http://localhost:3000`.

- **Test the API**:
  - Use tools like Postman or cURL to interact with the endpoints.

---

## Deployment

The application is configured for deployment using Vercel. To deploy:
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy the project:
   ```bash
   vercel
   ```

---

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for discussion.

