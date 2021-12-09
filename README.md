# REST service
REST service task at RS school

This app contains REST service using in-memory database underneath and operates with the following resources:
- User (with attributes):
    { id, name, login, password };
- Board (set of columns):
    { id, title, columns };
- Column (set of tasks):
    { id, title, order };
- Task:
    {
    id,
    title,
    order,
    description,
    userId, //assignee
    boardId,
    columnId
    }.
# How to use

## Prerequiremenst 
 git Clone repository, swich to development branch,  run ```npm i ``` in your terminal.
  
1. Run the comand ```npm run start``` in your terminal.

2. To checkup your requests on server recomended to use API Platform(Postman, RESTClient, etc.) If you  dont want to install separate API Platform you can install browser extension.
(for Chrome you can get it here https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo ). 

# Operations avaliable:
## for users:
- GET request with URL `http://localhost:{PORT}/users` to GET all users;

- GET request with URL `http://localhost:{PORT}/users/{userId}` to GET user with corresponding userId;

- POST request with URL `http://localhost:{PORT}/users` to add user.  
    User creates in a body of the POST request and has the object type.
    example:  
        **{   
                "name": "Ivan",  
                "login": "ivanTheTerrible",  
                "password": "qwerty123456"
                }**.  
ID will be generated automaticali with uuid.

*NOTE: all the object properties are required and their values must be of the set type 'String'.

- PUT request with URL `http://localhost:{PORT}/users/{userId}` to edit user with corresponding userId. 
    User eddings requared in the body of the PUT request and also has the object type.
    example:  
        **{ 
                "login": "ivanWhiteAndFluffy"  
                "password": "LF__PLMmpmwkjnfwjin438834nwfewiwn39nsd"
                }**.  

*NOTE: NOT all the object properties are required but their values must be of the set types (String for "name", "login", "password").

-DELETE request with URL `http://localhost:{PORT}/person/{personId}` to delete user with corresponding userID. 

## for Boards: 

- GET request with URL `http://localhost:{PORT}/boards` to GET all boards;

- GET request with URL `http://localhost:{PORT}/boards/{boardId}` to GET board with corresponding boardId;

- POST request with URL `http://localhost:{PORT}/boards` to add board.  
    Board creates in a body of the POST request and has the object type.
    example:  
        **{ "title": "example board",  
                    "columns":  
                        [{  
                            "id": "00000000-0000-0000-0000-000000000000",  
                            "title": "random column",  
                            "order": "string"  
                        }, ...]}**
                


*NOTE: all the object properties are required and their values must be of the set type (String for "title", Array for "columns")

- PUT request with URL `http://localhost:{PORT}/boards/{boardId}` to edit board with corresponding boardId. 
    Board eddings requared in the body of the PUT request and also has the object type.
    example:  
        **{ 
                "title": "New Board" 
                }**.  

*NOTE: NOT all the object properties are required but their values must be of the set types (String for "title", Array for "columns").

-DELETE request with URL `http://localhost:{PORT}/boards/{boardId}` to delete board with corresponding boardID.  
*NOTE: After deletition of the board all its Tasks will be deleted as well.

## for Tasks: 
- GET request with URL `http://localhost:{PORT}/boards/{boardId}/tasks` to GET all tasks;

- GET request with URL `http://localhost:{PORT}/boards/{boardId}/tasks/{taskId}` to GET task with corresponding taskId;

- POST request with URL `http://localhost:{PORT}/boards/tasks` to add task.  
    Task creates in a body of the POST request and has the object type.
    example:  
        **{     "title": "Random task",  
    "order": "Random order",  
    "description": "Some description",  
    "userId": null,  
    "columnId": "c8f746c3-7089-4abc-af07-d66c5548b8f0",  
    "boardId": "c8f746c3-7089-4abc-af07-d66c5548b8f0"
    }**
                


*NOTE: all the object properties are required and their values must be of the set type (String for all proprties values, userId might be Null)

- PUT request with URL `http://localhost:{PORT}/boards/{boardId}/tasks/{taskId}` to edit task with corresponding boardId. 
    Board eddings requared in the body of the PUT request and also has the object type.
    example:  
        **{      "title": "Random task",  
    "order": "Random order",  
    "description": "Some description",  
    "userId": null,  
                }**.  

*NOTE: NOT all the object properties are required but their values must be of the set types (String for all proprties values, userId might be Null).

-DELETE request with URL `http://localhost:{PORT}/boards/{boardId}` to delete task with corresponding taskID.  
*NOTE: After deletition of the board all its Tasks will be deleted as well.

#Testing
1. Run the comand ```npm run test``` in your terminal.











