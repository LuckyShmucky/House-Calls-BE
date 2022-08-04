# House-Calls-BE


House Calls is an application for people who would like access to a doctor but don't want to leave the house. Users can login and speak to a multiple different doctors, allowing people to get multiple opinions about their health. This is the back end for the House Calls application.

# Relationship Model

![Relationship Model](https://i.postimg.cc/fLbtHZTz/House-Calls-Models.png "Optional title")

## APi Endpoints

### https://house-calls-be.herokuapp.com/
- https://house-calls-be.herokuapp.com/ 

## patients route 
##### https://house-calls-be.herokuapp.com/patients

- If you are using a read method this route will return a basic json object with a message letting you know that you have hit the correct route
- This route can be used to create a new patient with a post request and the correct request body
```

router.get('/', (req, res) => {
    res.status(200).json({
        message: "route for patients"
    })
})

// post method that creates a new patient and hashes the password during creation
router.post('/', async (req, res) => {
    // console.log(req.body)
    if (req.body === false) return;
    // here we are using object destructuring to be able to more easily target the password in order to hash in the try/catch statement
    let { pass, ...rest} = req.body
    if (await Patient.findOne({email: req.body.email})){
        res.status(400).json({
            message: 'Email already has account'
        });
        return;
    }
    try{
        
        const newPatient = await Patient.create({
            ...rest,
            pass: await bcrypt.hash(pass, 10)
        })
        // console.log(newPatient)
        res.status(200).json({
            message: `${newPatient} was created`
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occured`
        })
    }
})


```
##### https://house-calls-be.herokuapp.com/patients/:email

- This route can be used to update or delete a patient in the DB when (pass patient id in req params)

```

router.delete('/:email', async (req, res) => {
    if (req.params.email === false) return;
    
    try {
        const deletedPatient = await Patient.findById(req.params.email)
        deletedPatient.delete()
        res.status(200).json({
            message: `${deletedPatient} deleted`
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

// finds a patient by id and updates it by setting it to the request body
router.put('/:email', async (req, res) => {
    if (req.params.email === false) return;
    let { pass, ...rest} = req.body
    try {
        await Patient.updateOne({ email: req.params.email }, {$set: {
            ...rest,
            pass: await bcrypt.hash(pass, 10)
        }})
        
        res.status(200).json({
            message: `account for ${req.params.email} was updated`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

```
## medical doctors route 

##### https://house-calls-be.herokuapp.com/medical-doctors

- If you are using a get method this route will return a list of the first ten doctors in the collection from the db (needs to be updated in the future to dynamically target 10 doctors, not just the first 10)
- This route can be used to create a new doctor with a post request and the correct request body

```
// finds the first ten doctors, need to be refractored in a way that changes the limit 
router.get('/', async (req, res) => {
    const allDoctors = await Provider.find().sort({ _id: 1 }).limit(10)
    res.status(200).json(allDoctors)
})

// post method that creates a new Medical Provider and hashes the password during creation
router.post('/', async (req, res) => {
    console.log(req.body)
    if (req.body === false) return;
    let { pass, ...rest} = req.body
    try{
        const newProvider = await Provider.create({
            ...rest,
            pass : await bcrypt.hash(pass, 10)
        })
        res.status(200).json({
            message: `${newProvider} was created`
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occured`
        })
    }
})

```

## authentication route


##### https://house-calls-be.herokuapp.com/authentication/:patientEmail

- This route was created to allow patients to sign in with their existing account. Due to the structure of this route, a post method must be used since the request body needs to contain the password. 
- The patients' email must be included as the parameter in the url when querying.

```
router.post('/:email', async (req, res) => {
    // if (req.params.email === false) return;
    try {
        // this route is able to find a document in the DB by the email
        const foundPatient = await Patient.findOne({ email: req.params.email })
        // console.log(foundPatient)
        // if the patient does not exist or the hashed password being sent in the post request does not match the one in the DB deny access
        if (!foundPatient || !await bcrypt.compare(req.body.pass, foundPatient.pass)){
            res.status(404).json({
                message: 'wrong email or password'
            })
        } else {
            // if the two conditions from before are met then the server responds with the user information
            
                res.status(200).json(foundPatient)
             
            }
        } catch(err){
        res.status(404).json({
            message: `${err} occured`
        })
    }
})
```
##### https://house-calls-be.herokuapp.com/authentication/employee/:medicalDoctorEmail

- This route serves the same purpose as the authentication route for patients to sign in, but for doctors. 
- The structure for both routes are almost identical. Just like for the patient sign in, this endpoint can be queried by using a post method containing a password and a url that contains the doctor's email as the parameter.

```
router.post('/employee/:medicalDoctorEmail', async (req, res) => {
    try{
        const foundDoctor = await Doctor.findOne({ email: req.params.medicalDoctorEmail})
        if (!foundDoctor || !await bcrypt.compare(req.body.pass, foundDoctor.pass)){
            // res.status(200).json(foundDoctor)
            res.status(404).json({
                message: 'wrong email or password'
            })
        } else {
            res.status(200).json(foundDoctor)
        }
    } catch(err){
        res.status(404).json({
            message: `${err} occured`
        })
    }
})
```
## Chat route

##### https://house-calls-be.herokuapp.com/chats

- If you use a get method on this endpoint the responce will be a json object just informing you that you have hit the correct route
- You can also use this endpoint as a post method to create new chats, just pass in a doctor id and a patient id as key value pairs (Ex. doctor: someId // patient: someId)

```
//creating Chat and adding that new chat to the "chats" field on both patient and doctors users involved in the chat
// all that needs to be in the request body is the patient and doctor id
router.post('/', async (req, res) => {
    if (req.body === false) return;
    // console.log(req.body)
    
    try{
        const newChat = await Chat.create(req.body)
        // console.log(newChat.patient)
        Patient.findOneAndUpdate({_id: newChat.patient}, {$push: {chats: newChat.id}},
            function(error, success){
                if (error){
                    console.log(error)
                } else{
                    console.log(success)
                }
            })
        medicalProvider.findOneAndUpdate({_id: newChat.doctor}, {$push: {chats: newChat.id}},
            function(error, success){
                if (error){
                    console.log(error)
                } else{
                    console.log(success)
                }
            })
        res.status(200).json({
            message: `${newChat} created`
        })
    } 
    catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
    
})

```

#####  https://house-calls-be.herokuapp.com/chats/:chatId

- Using an id of chat as the request parameter, you can get the desired chat and its messages populating the chat (the messages properties such as text or timestamp will be included in the response)
- This endpoint would be most useful when trying to display all of the messages to the user

```
// finding a chat by id
router.get('/:chatId', async (req, res) => {
    if(req.params.chatId === false) return;
    try{
        await Chat.find({
            _id: req.params.chatId
        }).
        populate('content').
        exec(function (err, success){
            if (err){
                console.log(err)
            } else {
                res.json(success)
            }
        })
        // res.status(200).json(foundChat)
    } catch(err){
    res.status(400).json({
            message: `${err} occured`
        })
    }
})
```

##### https://house-calls-be.herokuapp.com/chats/messages/:chatId

- The purpose of this endpoint is to create new messages, every message should be appended to the chat that it belongs to
- To add a message to the desired chat, just pass in that chat's id 
- You can find a chat's id the response from logging in, due to user's having the chats they are involved in as a property in their schema (in the format of an array containing all the chat Ids they are in)

```
router.post('/messages/:chatId', async (req, res) => {
    try{
              
       const newMessage = await Message.create(req.body)
    //    console.log(newMessage.id)
       const foundChat = Chat.findOneAndUpdate({_id: req.params.chatId}, {$push: {content: newMessage.id}},
        function(error, success){
            if (error){
                console.log(error)
            } else{
                res.status(200).json(success)
            }
        })
      
    } catch(err){
        res.status(400).json({
            message: `${err} occured`
        })
    }
})
```
