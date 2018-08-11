module.exports = (configURL,database) => {
    
    let options = {
        reconnectTries: 5,
        useNewUrlParser: true
    };

    let db = database.connect(configURL,options);
    database.connection.on("open",() => {console.log("Connected to mongoDb");});
    database.connection.on("error",(error) => {console.log(error)});
    database.connection.on("close",()=>{console.log("Connection to mongodb closed")});

    return database;
};