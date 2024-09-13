import kafka from "./kafkaInit";

const producer = kafka.producer();

const produceMessage = async (topic : string, message : object) => {
  await producer.connect();

  console.log("Producer connected successfully");
  
  try {
    const result = await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log("message sent successfully");

  } catch (error) {
    console.log("Error producing the message", error);
  } finally {
    await producer.disconnect();
  }
};

export default produceMessage;