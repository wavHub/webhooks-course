/* This is a multi-line comment
   that spans multiple lines
   useful for detailed explanations */
const value = 42;

const name = "idea-catcher"; // Comment at end of line

/**
 * Handles incoming SMS messages from Twilio
 * 
 * TOPICS COVERED:
 * 1. ASYNC OPERATIONS & PROMISES
 *    - client.messages.create() is async and returns a Promise
 *    - Must use .then() to handle response after message sends
 *    - Callback must be placed INSIDE .then() chain
 * 
 * 2. PROMISE CHAINING
 *    - .then() executes after the async operation completes
 *    - .catch() handles any errors that occur
 * 
 * 3. MESSAGE SID TRACKING
 *    - Each SMS gets unique SID (Session ID)
 *    - Useful for logging and debugging
 * 
 * 4. CALLBACK TIMING
 *    - Callback must fire AFTER message is successfully sent
 *    - Ensures Twilio waits for operation to complete
 * 
 * @param {Object} context - Twilio runtime context with credentials
 * @param {Object} event - Incoming SMS event data
 * @param {Function} callback - Twilio callback function
 * @returns {void}
 */
exports.handler = (context, event, callback) => {
    // Initialize Twilio client and log incoming data
    const client = context.getTwilioClient();
    console.log("Sending text...");
    //? console.log('Transcription:', event.TranscriptionText);
    
    // ASYNC OPERATION: Create and send SMS message
    // Returns a Promise that resolves when message is sent
    client.messages.create({
        to: context.USER_TW_PHONE_NUMBER,
        from: context.TWILIO_PHONE_NUMBER,
        body: `A Traveler has made contact!\n :${event.TranscriptionText}`
    })
    // SUCCESS: Message sent - log SID and call callback
    .then((message) => {
        console.log(`Message sent with SID: ${message.sid}`);
        callback(null, `Message sent! \nMessage SID is ${message.sid}`);
    })
    // ERROR: Handle any failures during message creation
    .catch((error) => {
        console.error("Error sending message:", error);
        callback(error);
    });
};
