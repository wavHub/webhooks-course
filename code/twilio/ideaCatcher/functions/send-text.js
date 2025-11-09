exports.handler = (context, event, callback) => {
    console.log("Sending text...");
    console.log('Transcription:', event.TranscriptionText);
    callback(null, "It Begins!");
};
