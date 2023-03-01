
### Event Loop ###
- It is a loop initialized when the application starts on Nodejs and this loop never stops waiting for a callback function
- The management callback functions it's done by Event Loop

- Registering and response is done by Event Loop. Therefore, the execution it's done by another process called Worker Pull

-> Each function that has registered a callback function is executed in a new thread on the system operacional, created by Worker Pull

-> Nodejs has an architecture event based
When registering a callback function, Nodejs starts a new thread in system operacional. Therefore, when a thread has been finished so the call function receives the result of thread

Event loop it's a Nodejs process which being waiting a callback function to be registered, waiting threads in system operacional has being finished and return a response to the callback function

