
var kafka = require('kafka-node'),
    client = new kafka.Client("192.168.59.103:2181/", 'kafka-node-client', {}),
    HighLevelProducer = kafka.HighLevelProducer,
    producer = new HighLevelProducer(client);

producer.on('ready', function () {

  console.log("producer on ready");

  var sentences = [
    "the cow jumped over the moon",
    "the man went to the store and bought some candy",
    "four score and seven years ago",
    "how many apples can you eat"
  ];

  setInterval(function() {
    var topic1 = { topic: 'storm-sentence', messages: [] };

    for (var i=0; i < 1000; i++) {
      topic1.messages.push( sentences[i % sentences.length] );
    }

    payloads = [ topic1 ];


    producer.send(payloads, function (err, data) {
        console.log("producer data:" + JSON.stringify(data));
    });

  }, 100);

});

producer.on('error', function (err) {
  console.log("producer error:" + err);
})
