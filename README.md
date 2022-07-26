# House-Calls-BE

House Calls is an application for people who would like access to a doctor but don't want to leave the house. This is the Back end app for House Call service.



## APi Endpoints

### Local Host
- localhost:4000

## patients route 
##### localhost:4000/patients

- if you are using a read method this route will return a basica json object with a message letting you know that you have hit the correct route
- This route can be used to create a new patient with a post request and the correct request body

##### localhost:4000/patients/:id

- This route can be used to update or delete a patient in the DB when (pass patient id in req params)

## medical doctors route 

##### localhost:4000/medical-provider

- if you are using a read method this route will return a basica json object with a message letting you know that you have hit the correct route
- This route can be used to create a new doctor with a post request and the correct request body

