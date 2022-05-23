## Backend

This app makes an API call to the rails which is currently being hosted on Heroku.

### Packages

- Chakra-ui (For styling purpose)
- axios (For making API request to rails backend)
- formik (For the signup/login form)
- yup (For the frontend validation)

### Features

My goal was to make this app as dynamic as possible, and I believe I have achieved that goal. 

I opted to use JWT authentication for this project. 

On signup/login, Axios sends post request along with data to API, and API responds with JWT which is then saved in local storage.

Non-sensitive user info can be fetched through API but it verifies the JWT token before sending back the data. 

### Known Issues

Some of the pages are not responsive 


### Demo
Demo of this frontend app can be seen [here](https://namelesss.netlify.app/)
