exports.handler = (context, event, callback) => {
    console.log("Sending text...");
    callback(null, "It Begins!");
};
