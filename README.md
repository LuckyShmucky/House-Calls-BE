# House-Calls-BE

House Calls is an application for people who would like access to a doctor but don't want to leave the house. This is the Back end app for House Call service.



## APi Endpoints

### Local Host
- localhost:4000

## patients route 
##### localhost:4000/patients

- if you are using a read method this route will return a basic json object with a message letting you know that you have hit the correct route
- This route can be used to create a new patient with a post request and the correct request body

##### localhost:4000/patients/:id

- This route can be used to update or delete a patient in the DB when (pass patient id in req params)

## medical doctors route 

##### localhost:4000/medical-doctors

- if you are using a read method this route will return a basic json object with a message letting you know that you have hit the correct route
- This route can be used to create a new doctor with a post request and the correct request body

## authentication route


##### localhost:4000/authentication/:patientEmail

- this route was created to allow patients to sign in with their existing account. Due to the structure of this route, a post method must be used since the request body needs to contain the password. 
- The patients' email must be included as the parameter in the url when querying.


##### localhost:4000/authentication/employee/:medicalDoctorEmail

- this route serves the same purpose as the authentication route for patients to sign in, but for doctors. 
- The structure for both routes are almost identical. Just like for the patient sign in, this endpoint can be queried by using a post method containing a password and a url that contains the doctor's email as the parameter.
