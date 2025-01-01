export default function handler(req, res) {
  const VERIFY_TOKEN = "test_verify_token"; // Replace with your custom token

  if (req.method === "GET") {
    // Webhook verification
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified");
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Forbidden");
    }
  } else if (req.method === "POST") {
    // Handle incoming WhatsApp messages
    const body = req.body;

    console.log("Incoming Webhook:", body);

    // Respond to WhatsApp API to acknowledge receipt
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.status(404).send("Not Found");
  }
}
