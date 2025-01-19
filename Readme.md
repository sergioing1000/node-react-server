# Node.js Backend Application

## Overview
This Node.js application is a backend server that connects to a MongoDB database and provides an API for managing a collection of items. The server is designed to handle CRUD operations and supports CORS for cross-origin requests from the frontend hosted at `https://wish-list-apeh.vercel.app`.


<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <g fill="none">
    <rect width="256" height="256" fill="#f4f2ed" rx="60"/>
    <path fill="#81cd39" d="M119.878 31.116c4.919-2.815 11.325-2.828 16.239 0c24.722 13.97 49.452 27.917 74.17 41.895c4.65 2.619 7.759 7.793 7.712 13.15v84.045c.035 5.579-3.382 10.877-8.287 13.436c-24.641 13.893-49.27 27.802-73.907 41.695c-5.019 2.87-11.554 2.649-16.418-.457c-7.387-4.282-14.787-8.544-22.175-12.822c-1.51-.9-3.212-1.616-4.278-3.08c.943-1.27 2.628-1.428 3.997-1.983c3.083-.981 5.916-2.555 8.748-4.082c.717-.49 1.591-.302 2.278.136c6.317 3.622 12.579 7.35 18.917 10.937c1.352.781 2.721-.256 3.877-.9c24.18-13.667 48.39-27.281 72.567-40.952c.896-.431 1.391-1.382 1.318-2.363c.017-27.725.004-55.454.009-83.18c.102-1.112-.542-2.136-1.549-2.592c-24.555-13.829-49.099-27.678-73.65-41.51a2.56 2.56 0 0 0-2.892-.005c-24.552 13.837-49.09 27.7-73.642 41.527c-1.003.457-1.676 1.464-1.557 2.58c.005 27.726 0 55.455 0 83.184a2.35 2.35 0 0 0 1.336 2.334c6.551 3.715 13.111 7.404 19.667 11.107c3.694 1.987 8.228 3.169 12.298 1.646c3.59-1.288 6.107-4.953 6.039-8.765c.034-27.563-.017-55.13.025-82.69c-.09-1.223 1.071-2.234 2.261-2.118c3.148-.022 6.3-.043 9.448.008c1.314-.03 2.218 1.288 2.056 2.52c-.013 27.738.034 55.476-.021 83.213c.008 7.393-3.029 15.437-9.867 19.054c-8.423 4.363-18.835 3.438-27.157-.746c-7.204-3.596-14.08-7.84-21.156-11.692c-4.918-2.545-8.318-7.864-8.283-13.439V86.161c-.052-5.468 3.182-10.736 7.975-13.317c24.637-13.903 49.27-27.818 73.902-41.728"/>
    <path fill="#81cd39" d="M141.372 89.335c10.745-.692 22.248-.41 31.917 4.884c7.487 4.056 11.637 12.57 11.769 20.887c-.209 1.121-1.382 1.74-2.453 1.663c-3.117-.004-6.236.043-9.353-.021c-1.323.051-2.091-1.168-2.257-2.337c-.896-3.98-3.067-7.921-6.812-9.841c-5.75-2.878-12.416-2.733-18.687-2.673c-4.576.242-9.498.639-13.376 3.33c-2.977 2.039-3.881 6.155-2.819 9.47c1.002 2.38 3.749 3.148 5.997 3.856c12.95 3.387 26.672 3.049 39.373 7.506c5.26 1.817 10.404 5.35 12.204 10.856c2.355 7.38 1.323 16.2-3.928 22.124c-4.258 4.875-10.459 7.529-16.644 8.97c-8.228 1.835-16.767 1.882-25.123 1.067c-7.857-.896-16.034-2.96-22.099-8.313c-5.187-4.504-7.72-11.522-7.469-18.294c.06-1.144 1.199-1.942 2.295-1.848c3.139-.025 6.279-.034 9.418.005c1.254-.09 2.184.994 2.248 2.176c.579 3.791 2.004 7.771 5.31 10.018c6.381 4.117 14.388 3.835 21.694 3.95c6.052-.268 12.847-.349 17.787-4.35c2.606-2.282 3.378-6.1 2.674-9.384c-.763-2.773-3.664-4.065-6.155-4.91c-12.783-4.043-26.659-2.576-39.318-7.149c-5.14-1.816-10.11-5.25-12.084-10.53c-2.755-7.473-1.493-16.717 4.308-22.44c5.656-5.695 13.82-7.888 21.583-8.672"/>
  </g>
</svg>


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

