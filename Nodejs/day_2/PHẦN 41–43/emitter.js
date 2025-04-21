const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('ping', () => {
  console.log('📢 Ping event received!');
});

emitter.emit('ping');