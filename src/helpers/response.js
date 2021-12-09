const sendResponseEnd = (res, status, data) => {
    res.writeHeader(status, {
        'Content-Type': 'application/json'
      });
    res.end(JSON.stringify(data));
};


 module.exports = {sendResponseEnd};
 