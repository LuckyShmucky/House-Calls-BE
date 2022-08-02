# House-Calls-BE

House Calls is an application for people who would like access to a doctor but don't want to leave the house. This is the Back end app for House Call service.

# Relationship Model

![Relationship Model](https://postimg.cc/t1L4TKxw "Optional title")

## APi Endpoints

### Local Host
- localhost:4000

## patients route 
##### localhost:4000/patients

- If you are using a read method this route will return a basic json object with a message letting you know that you have hit the correct route
- This route can be used to create a new patient with a post request and the correct request body

##### localhost:4000/patients/:id

- This route can be used to update or delete a patient in the DB when (pass patient id in req params)

## medical doctors route 

##### localhost:4000/medical-doctors

- If you are using a get method this route will return a list of the first ten doctors in the collection from the db (needs to be updated in the future to dynamically target 10 doctors, not just the first 10)
- This route can be used to create a new doctor with a post request and the correct request body

## authentication route


##### localhost:4000/authentication/:patientEmail

- This route was created to allow patients to sign in with their existing account. Due to the structure of this route, a post method must be used since the request body needs to contain the password. 
- The patients' email must be included as the parameter in the url when querying.


##### localhost:4000/authentication/employee/:medicalDoctorEmail

- This route serves the same purpose as the authentication route for patients to sign in, but for doctors. 
- The structure for both routes are almost identical. Just like for the patient sign in, this endpoint can be queried by using a post method containing a password and a url that contains the doctor's email as the parameter.

## Chat route

##### localhost:4000/chats

- If you use a get method on this endpoint the responce will be a json object just informing you that you have hit the correct route
- You can also use this endpoint as a post method to create new chats, just pass in a doctor id and a patient id as key value pairs (Ex. doctor: someId // patient: someId)

##### localhost:4000/chats/:chatId

- Using an id of chat as the request parameter, you can get the desired chat and its messages populating the chat (the messages properties such as text or timestamp will be included in the response)
- This endpoint would be most useful when trying to display all of the messages to the user

##### localhost:4000/chats/messages/:chatId

- The purpose of this endpoint is to create new messages, every message should be appended to the chat that it belongs to
- To add a message to the desired chat, just pass in that chat's id 
- You can find a chat's id the response from logging in, due to user's having the chats they are involved in as a property in their schema (in the format of an array containing all the chat Ids they are in)