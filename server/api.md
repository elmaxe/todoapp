# todoapp API
The server uses JSON.

---
### Register user
```
POST /register
```
**Request body**<br>

***Required***

`username` - The username of the user to register.

`password` - The unhashed password of the user.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"status":"User succesfully registered"}`<br>
    **Description:** If username is not taken and the user is successfully registered in the database.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"User already exists"}`<br>
    **Description:** User already exists.

    **Code:** 500<br>
    **Content:** `{"error":"The error message"}`<br>
    **Description:** Something went wrong when creating user, see error message.



### Login user
```
POST /login
```
**Request body**<br>

***Required***

`username` - The username of the user to login.

`password` - The unhashed password of the user.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"status":"Login succesful"}`<br>
    **Description:** If the username and password matches and are correct.

*   **Error response**

    **Code:** 404<br>
    **Content:** `{"error":"Wrong username or password"}`<br>
    **Description:** If username or password were wrong.

    **Code:** 500<br>
    **Content:** `{"error":"Internal server error"}`<br>
    **Description:** Internal server error.
