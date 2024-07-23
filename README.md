# Currency API for Genesis SE School

Author: Svitlana Marchenko

Language: NodeJs (using Express framework and TypeORM)

Task: https://github.com/Falko05/se_school/blob/main/gses2swagger.yaml

Exchange Rate API: https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5

## Possible alerts
- ### Rate microservice
    - ``daily_get_exchange_rate_calls`` could help to check if getting rate is available and be used. If this metric < 100 after 10am - smth might be wrong
    - ``daily_get_exchange_rate_fails`` could help to check if getting rate fails. If this metric > 10 - smth might be wrong
    - ``daily_send_email_calls`` could help to check if sending email method be used. If this metric < 10 after 12pm - smth might be wrong
    - ``daily_send_email_fails`` could help to check if sending email method fails. If this metric > 10 - smth might be wrong

## Additional Features

-   **Postman**: Includes postman request collection and tests
-   **Logger**: Includes logging info (add an email, send emails, get rate (debug only)) to file `application.log` and console
-   **Test**: Includes test `app.test.ts`

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

1. Create .env file like .env.example:
2. To run the program try to write

```
docker-compose up --build
```

in the terminal from the root catalog.

If you have any troubles with permissions, just try to write `sudo docker-compose up --build` (Linux or MacOS)
