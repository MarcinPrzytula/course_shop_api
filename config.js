module.exports = {
  port: process.env.PORT || 3001,
  database:
    process.env.DATABASE ||
    'mongodb+srv://admin:admin325@cluster0.0ywy7.mongodb.net/courseShop?retryWrites=true&w=majority',
  // 'mongodb://127.0.0.1:27017/courseShop',
};
