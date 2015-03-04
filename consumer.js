
var kafka = require('kafka-node'),
    client = new kafka.Client("192.168.59.103:2181/", 'kafka-node-client', {});

var HighLevelConsumer = kafka.HighLevelConsumer,
    consumer = new HighLevelConsumer(
        client,
        [
            { topic: 'storm-sentence' }
        ],
        {
          fromOffset: 0
        }
    );

consumer.on('message', function (message) {
    console.log("consumer message:" + JSON.stringify(message));
});

consumer.on('error', function (err) {
  console.log("consumer error:" + err);
});
