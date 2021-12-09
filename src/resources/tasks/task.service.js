const {v4: uuidv4} = require('uuid');

const { ERRORS } = require('../../constants/errors');
const {STATUS_CODES} = require('../../constants/constants');
let {tasks} = require('./task.memory.repository');
const { getByID } = require('../boards/board.service');

const getAllTasks = (boardId) => {
    const boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    const tasksFromBoard = tasks.filter(el => el.boardId === boardId);
    return tasksFromBoard;
}

const getTaskById = (boardId, taskId) => {
    const boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    const result = tasks.find(el => el.id === taskId);
    if(result === undefined){
       return ERRORS.TASK_NOT_FOUND;
    }
    if(boardExistence.id !== result.boardId){
        return ERRORS.TASK_FROM_ANOTHER_BOARD
    }
    return result;
};

const createTask = (taskData, boardId) => {
    const boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    taskData.id = uuidv4();
    taskData.boardId = boardId;
    tasks.push(taskData);
    return taskData;
};

const updateTask = (newTaskData, boardId, taskId) => {
    const boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    const result = tasks.findIndex(el => el.id === taskId);
    if(result === -1){
        return ERRORS.TASK_NOT_FOUND;
    }
    if(boardExistence.id !== newTaskData.boardId){
        return ERRORS.TASK_FROM_ANOTHER_BOARD;
    }
    tasks[result].title = newTaskData.title || tasks[result].title;
    tasks[result].order = newTaskData.order || tasks[result].order;
    tasks[result].description = newTaskData.description || tasks[result].description;
    tasks[result].userId = newTaskData.userId || tasks[result].userId;
    tasks[result].columnId = newTaskData.columnId || tasks[result].columnId;
    tasks[result].boardId = newTaskData.boardId || tasks[result].boardId;
    return tasks[result];
};
const deleteTask = (boardId, taskId) => {
    const boardExistence = getByID(boardId);
    if(typeof boardExistence === 'string'){
        return boardExistence;
    }
    const result = tasks.filter(el => el.id !== taskId);
    if(result.length === tasks.length){
        return ERRORS.TASK_NOT_FOUND
    }
    const taskTodelete = tasks.find(el => el.id === taskId);
    if(boardExistence.id !== taskTodelete.boardId){
        return ERRORS.TASK_FROM_ANOTHER_BOARD;
    }
    tasks = result;
    return STATUS_CODES.NO_CONTENT;
}

function deleteByBoardId(boardId){
    tasks = tasks.filter(el => el.boardId !== boardId);
}

const unassignUserAfterDelete = (userId) =>{
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].userId === userId){
            tasks[i].userId  = null;
        }
    }
}



module.exports = {getAllTasks, getTaskById, createTask, updateTask, deleteTask, deleteByBoardId, unassignUserAfterDelete}