const {v4: uuidv4} = require('uuid');

const { ERRORS } = require('../../constants/errors');
const {STATUS_CODES} = require('../../constants/constants');
let {boards} = require('./board.memory.repository');
let {tasks} = require('../tasks/task.memory.repository');

const getAllBoards = () => boards

const getByID = (boardId) => {
    const result = boards.find(el => el.id === boardId);
    if(result === undefined){
       return ERRORS.BOARD_NOT_FOUND;
    }
    return result;
};

const createBoard = (boardData) => {
    boardData.id = uuidv4();
    boards.push(boardData);
    return boardData;
};

const updateBoard = (newBoardData, boardId) => {
    const result = boards.findIndex(el => el.id === boardId);
    if(result == -1){
        return ERRORS.BOARD_NOT_FOUND;
    }
    boards[result].title = newBoardData.title || boards[result].title;
    boards[result].columns = newBoardData.columns || boards[result].columns;
    return boards[result];
};

const deleteBoard = (boardId) => {
    const result = boards.filter(el => el.id !== boardId);
    if(result.length === boards.length){
        return ERRORS.BOARD_NOT_FOUND
    }
    boards = result;
    tasks = tasks.filter(el => el.boardId !== boardId);
    return STATUS_CODES.NO_CONTENT;
}





module.exports = {getAllBoards, getByID, createBoard, updateBoard, deleteBoard}