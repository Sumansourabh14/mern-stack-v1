## Login

This code defines an Express controller function that handles a login request. The controller function uses the asyncHandler middleware to handle any errors that may occur during asynchronous operations.

The function first extracts the email and password values from the req.body object. If either of these values is missing, the function returns a 400 error with a message indicating that both fields are required.

The function then uses the findOne method of a UserModel object (presumably a Mongoose model) to look up a user with the specified email address. If a user with the specified email is found, the function uses the bcrypt.compare method to compare the provided password with the hashed password stored in the database.

If the password is correct, the function uses the jsonwebtoken library to generate a JWT access token that includes the user's first name, email, and ID. The access token is signed with a secret key that is stored in an environment variable. The token expires after one minute. The function then returns a 200 response with a JSON payload indicating that the login was successful, including the access token.

If the email or password is incorrect, the function returns a 401 error with a message indicating that the email or password was incorrect.

## ----------

In order to authorize some specific routes, we need to verify the user's access token.
For that, a middleware will be created.

To access any private route, the access token will be passed in the header section.
