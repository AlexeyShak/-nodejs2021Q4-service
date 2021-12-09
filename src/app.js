const http = require('http');

const {usersController} = require('./resources/users/user.router');
const {tasksController} = require('./resources/tasks/task.router');
const {boardsController} = require('./resources/boards/board.router');

const { sendResponseEnd } = require('./helpers/response');
const {STATUS_CODES} = require('./constants/constants');
const {ERRORS} = require('./constants/errors')

module.exports = http.createServer((request, response) => {
    try{
        const {url} = request;
        if(url.startsWith('/users')){
            return usersController(request, response);
        }
        else if(url.startsWith('/boards')){
          if(url.includes('/tasks')){
              return tasksController(request,response);
          }
          return boardsController(request, response);
      }
       
        return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.UNKNOWN_URL)
    }catch (e){
        console.log('error e:', e)
        response.end(JSON.stringify(e));
    }

})
