# todoapp API
The server uses JSON.

---
### Register user
```
POST api/register
```
**Request body**<br>

***Required***

`username` - The username of the user to register.

`password` - The unhashed password of the user.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"status":"Account registered.}`<br>
    **Description:** If username is not taken, the password and username meets the requirements and the user is successfully registered in the database.

*   **Error response**

    **Code:** 400<br>
    **Content:** `{"error":"Some error message"}`<br>
    **Description:** There is something wrong with the data, for example the username could be too short or missing, see error message for details.

    **Code:** 403<br>
    **Content:** `{"error":"User already exists"}`<br>
    **Description:** User already exists.

    **Code:** 500<br>
    **Content:** `{"error":"The error message"}`<br>
    **Description:** Something went wrong when creating user, see error message.



### Login user
```
POST api/login
```
**Request body**<br>

***Required***

`username` - The username of the user to login.

`password` - The unhashed password of the user.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"authenticated": true, "user": {"id": number, "username": string, "registrationDate": number}}`<br>
    **Description:** If the username and password matches and are correct.
    **Headers:** Contains a Set-Cookie header with the session-cookie.

*   **Error response**

    **Code:** 400<br>
    **Content:** `{"error":"Some error message"}`<br>
    **Description:** No username, password (or neither) provided.

    **Code:** 404<br>
    **Content:** `{"error":"Wrong username or password"}`<br>
    **Description:** If username or password were wrong.

    **Code:** 500<br>
    **Content:** `{"error":"Internal server error"}`<br>
    **Description:** Internal server error.


### Check if authenticated
```
GET api/isAuth
```
Checks if the cookie "`session`" is valid.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"authenticated": true, "user": {"id": number, "username": string, "registrationDate": number}}`<br>
    **Description:** If the user is authenticated (valid cookie).

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"authenticated": false, "user": {"id": "", "username": "", "registrationDate": ""}}`<br>
    **Description:** If the user is not authenticated (not a valid cookie).

### Change password
Requires a valid `session`-cookie for that user.
```
POST api/login/changepassword
```
**Request body**<br>

***Required***

`password` - The unhashed, new password for the user, can't be the same as the current one.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"status":"Password changed"}`<br>
    **Description:** If the cookie is valid and the new password meets all the requirements.

*   **Error response**

    **Code:** 400<br>
    **Content:** `{"error":"No password provided."}`<br>
    **Description:** No password provided.

    **Code:** 403<br>
    **Content:** `{"error":"Error message"}`<br>
    **Description:** Invalid session cookie or password is the same as the old one, see message.

    **Code:** 404<br>
    **Content:** `{"error":"Couldn't find user"}`<br>
    **Description:** Valid cookie, but couldn't find the user associated with it in the database.

    **Code:** 500<br>
    **Content:** `{"error":"Error message"}`<br>
    **Description:** Internal server error.

### Remove account
Requires a valid `session`-cookie for that user.
```
GET api/login/removeaccount
```
*   **Success response**

    **Code:** 200<br>
    **Content:** `{"status":"Account removed along with user data"}`<br>
    **Description:** Account successfully removed.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"Session expired"}`<br>
    **Description:** Invalid session cookie.

    **Code:** 404<br>
    **Content:** `{"error":"Couldn't find user"}`<br>
    **Description:** Valid cookie, but couldn't find the user associated with it in the database. No account removed

    **Code:** 500<br>
    **Content:** `{"error":"Error message"}`<br>
    **Description:** Internal server error.


### Logout
Requires a valid `session`-cookie for that user.
```
GET api/logout
```
*   **Success response**

    **Code:** 200<br>
    **Content:** `{"status":"Account removed along with user data"}`<br>
    **Description:** If session cookie valid.
    **Headers:** Contains a Set-Cookie header which expires the session cookie.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"Session expired"}`<br>
    **Description:** Invalid session cookie.


### Get todos
Requires a valid `session`-cookie for that user.
```
GET api/todo/get
```
*   **Success response**

    **Code:** 200<br>
    **Content:** `{"todos": array}`<br>
    **Description:** If session cookie valid

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"Session expired"}`<br>
    **Description:** Invalid session cookie.

    **Code:** 500<br>
    **Content:** `{"error":"Error message"}`<br>
    **Description:** Internal server error.

### Add todo
Requires a valid `session`-cookie for that user.
```
POST api/todo/add
```
**Request body**<br>

***Required***

`title` - The title of the todo.

`description` - The description of the todo.

`dueDate` - The dueDate of the todo.

*   **Success response**

    **Code:** 201<br>
    **Content:** `{"todos": array}`<br>
    **Description:** If session cookie valid. Returns the new array of todos.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"Session expired"}`<br>
    **Description:** Invalid session cookie.

    **Code:** 500<br>
    **Content:** `{"error":"Error message"}`<br>
    **Description:** Internal server error.

### Remove todo
Requires a valid `session`-cookie for that user.
```
POST api/todo/remove
```
**Request body**<br>

***Required***

`id` - The id of the todo.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"status":"Removed todo", "todos":array}`<br>
    **Description:** If session cookie valid and todo is removed. Returns the new array of todos.

    **Code:** 202<br>
    **Content:** `{"status":"Todo not found, no todo removed", "todos":array}`<br>
    **Description:** If session cookie valid, todo is not removed. Returns the arrays of todos.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"Session expired"}`<br>
    **Description:** Invalid session cookie.

    **Code:** 500<br>
    **Content:** `{"error":"Error message"}`<br>
    **Description:** Internal server error.

### Update todo
Requires a valid `session`-cookie for that user.
```
POST api/todo/update
```
**Request body**<br>

***Required***

`id` - The id of the todo.

`title` - The title of the todo.

`description` - The description of the todo.

`dueDate` - The dueDate of the todo.

*   **Success response**

    **Code:** 200<br>
    **Content:** `{"todos": array}`<br>
    **Description:** If session cookie valid and todo is updated. Returns the updated array of todos.

*   **Error response**

    **Code:** 403<br>
    **Content:** `{"error":"Session expired"}`<br>
    **Description:** Invalid session cookie.

    **Code:** 500<br>
    **Content:** `{"error":"Error message"}`<br>
    **Description:** Internal server error.
