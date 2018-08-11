module.exports = {
    'secret':   'test',
    HOST: 'http://localhost',
    PORT: process.env.PORT || 3000,
    MONGODBURL : process.env.MONGO_URI || 'mongodb://heroku_2m67fgcb:ketc64dibbr9jm3hd7gq1ebbur@ds119422.mlab.com:19422/heroku_2m67fgcb', //mongodb://localhost:27017/herexamensEcoplan
    ECOPLAN: 'https://datatank.stad.gent/4/milieuennatuur/ecoplan.json'
}