const { REQUEST_METHODS, STATUS_CODES} = require('../../constants/constants');
const { ERRORS } = require('../../constants/errors');

const {sendResponseEnd} = require('../../helpers/response');

const {requestDataExtractor} = require('../../helpers/requestExtractor');
const {postTaskObjValidator, putTaskObjValidator} = require('../../validators/validators');
const { getAllTasks, getTaskById, createTask , updateTask, deleteTask} = require('./task.service');

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const taskIdUrlValidator = /\/boards\/.+\/tasks\/.+/;


const tasksController = (request, response) =>{ 
    if(request.method === REQUEST_METHODS.GET && request.url.endsWith('tasks')){
        const boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        const getResult = getAllTasks(boardId);
        if(typeof getResult === 'string'){
            return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, getResult);
        }
        return sendResponseEnd(response, STATUS_CODES.OK, getResult);
    }
    if(request.method === REQUEST_METHODS.GET && taskIdUrlValidator.test(request.url)){
        const boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        const taskId = request.url.split('/')[4];
        if(!uuidValidator.test(taskId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        
            const getResult = getTaskById(boardId, taskId);
            if(typeof getResult === 'string'){
                return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, getResult);
            }
            return sendResponseEnd(response, STATUS_CODES.OK, getResult);
        
    }
    if(request.method === REQUEST_METHODS.POST && request.url.endsWith('tasks')){
        const boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        return requestDataExtractor(request)
            .then(postTask => {
                let taskObj;
                try{
                    taskObj = JSON.parse(postTask);
                }
                catch (err){
                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
                };
                const validationError = postTaskObjValidator(taskObj)
                if(validationError === undefined){
                    const creationResult = createTask(taskObj, boardId);
                    if(typeof creationResult === 'string'){
                        return (response, STATUS_CODES.NOT_FOUND, creationResult)
                    }
                    return sendResponseEnd(response, STATUS_CODES.CREATED, creationResult)
                }
                sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
            });
    }
    if(request.method === REQUEST_METHODS.PUT && taskIdUrlValidator.test(request.url)){
        const boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        const taskId = request.url.split('/')[4];
        if(!uuidValidator.test(taskId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        return requestDataExtractor(request)
        .then(putTask => {
            let putTaskObj;
            try{
                putTaskObj = JSON.parse(putTask);
            }
            catch (err){ 
                return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
            }
            const validationError = putTaskObjValidator(putTaskObj);
            if(validationError == undefined){
                const updatedBoard = updateTask( putTaskObj, boardId, taskId)
                if(typeof updatedBoard === 'string'){
                    return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, updatedBoard);
                }
                return sendResponseEnd(response, STATUS_CODES.OK, updatedBoard);
            }
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
        })
    
    }
    if(request.method === REQUEST_METHODS.DELETE  && taskIdUrlValidator.test(request.url)){
        const boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        const taskId = request.url.split('/')[4];
        if(!uuidValidator.test(taskId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        const deletionResult = deleteTask(boardId, taskId);
        if(typeof deletionResult === 'string'){
            return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, deletionResult);
        }
        return sendResponseEnd(response, deletionResult);
    }
}

module.exports = {tasksController};