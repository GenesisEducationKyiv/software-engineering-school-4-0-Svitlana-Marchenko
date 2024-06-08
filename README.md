# Currency API for Genesis SE School

Author: Svitlana Marchenko

Language: NodeJs (using Express framework and Sequelize ORM)

Task: https://github.com/Falko05/se_school/blob/main/gses2swagger.yaml

Exchange Rate API: https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5

## Additional Features

-   **Postman**: Includes postman request collection and tests
-   **Logger**: Includes logging info (add an email, send emails, get rate (debug only)) to file `application.log` and console
-   **Test**: Includes test `app.test.js`

## Note

-   File `.env` was added only in order to transfer the necessary settings to run the project in Docker. These variables would be changed soon. For general usage please write your own `.env` file as `.env.example`
-   File `application.log` was added only to show the example of the program`s logs written by the logger.

## API Endpoints

### Get Current Exchange Rate

-   **Endpoint**: /api/rate
-   **Method**: `GET`
-   **Description**: Get the current exchange rate of USD to UAH using PrivatBank API.
-   **Responses**:
    -   `200`: Returns the current exchange rate (type: `number`).
    -   `400`: Invalid status value.

### Subscribe Email

-   **Endpoint**: `/api/subscribe`
-   **Method**: `POST`
-   **Description**: Check if the email address is already in the database and, if not, add it to the subscription list.
-   **Parameters**:
    -   `email` (required, type: `string`): Email to subscribe.
-   **Responses**:
    -   `200`: Email added successfully.
    -   `409`: Email already exists in the database.

## Run

To run the program try to write

```
docker-compose up --build
```

in the terminal from the root catalog.

If you have any troubles with permissions, just try to write `sudo docker-compose up --build` (Linux or MacOS)
