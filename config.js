module.exports = {
    'secret':   'test',
    HOST: 'http://localhost',
    PORT: 3000,
    MONGODBURL : process.env.MONGO_URI || 'mongodb://localhost:27017/herexamensEcoplan',
    ECOPLAN: 'https://datatank.stad.gent/4/milieuennatuur/ecoplan.json'
}