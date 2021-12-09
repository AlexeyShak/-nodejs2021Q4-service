
const { REQUEST_METHODS, STATUS_CODES} = require('../../constants/constants');
const { ERRORS } = require('../../constants/errors');

const {sendResponseEnd} = require('../../helpers/response');
const {getAllBoards, getByID, createBoard, updateBoard, deleteBoard} = require('./board.service')

const {requestDataExtractor} = require('../../helpers/requestExtractor');
const {postBoardObjValidator, putBoardObjValidator} = require('../../validators/validators');

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/boards\/.+/;


const boardsController = (request, response) =>{ 
    if(request.method === REQUEST_METHODS.GET && request.url === '/boards' ){
        sendResponseEnd(response, STATUS_CODES.OK, getAllBoards());
    }
    else if(request.method === REQUEST_METHODS.GET && urlValidator.test(request.url)){
        const boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        
            const getResult = getByID(boardId);
            if(typeof getResult === 'string'){
                return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, getResult);
            }
            return sendResponseEnd(response, STATUS_CODES.OK, getResult);
        
    }
    else if(request.method === REQUEST_METHODS.POST && request.url === '/boards'){
        requestDataExtractor(request)
            .then(postBoard => {
                let boardObj;
                try{
                    boardObj = JSON.parse(postBoard);
                }
                catch (err){
                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
                };
                const validationError = postBoardObjValidator(boardObj)
                if(validationError === undefined){
                    const board = createBoard(boardObj);
                    return sendResponseEnd(response, STATUS_CODES.CREATED, board)
                }
                sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
            });
    }
    else if(request.method === REQUEST_METHODS.PUT && urlValidator.test(request.url)){
        const boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        };
        return requestDataExtractor(request)
        .then(putBoard => {
            let putBoardObj;
            try{
                putBoardObj = JSON.parse(putBoard);
                console.log(putBoardObj);
            }
            catch (err){ 
                return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
            }
            const validationError = putBoardObjValidator(putBoardObj);
            if(validationError == undefined){
                const updatedBoard = updateBoard( putBoardObj, boardId)
                if(typeof updatedBoard === 'string'){
                    return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, updatedBoard);
                }
                return sendResponseEnd(response, STATUS_CODES.OK, updatedBoard);
            }
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
        })
    
    }
    else if(request.method === REQUEST_METHODS.DELETE && urlValidator.test(request.url)){
        const boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
        };
        const deletionResult = deleteBoard(boardId);
        
        if(typeof deletionResult === 'string'){
            return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, deletionResult);
        }
        return sendResponseEnd(response, deletionResult);
    }
}

module.exports = {boardsController};