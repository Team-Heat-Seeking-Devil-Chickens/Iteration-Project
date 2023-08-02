
module.exports = {
  query: (text, params, callback) => {
    // display SQL query in console upon execution
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
