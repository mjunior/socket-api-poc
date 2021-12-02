const { newProcessedLine } = require("../controllers/massive.controller");
let socketIO;

let mockStarted = false;
let interval;

function mockProcessedLines(io, room) {
  interval = setInterval(() => {
    newProcessedLine(io, room)
  }, 1000);
}

function getSocketIO() {
  return socketIO
}

function setupIO(io) {
  io.use((socket, next) => {
    console.log('AUTHENTICATING...')

    const auth = socket.handshake.auth;
    const username = `${auth.contract}#${auth.branch}#${auth.base}#${auth.user}`;
    
    console.log('Username found', username)
    if (username.startsWith('invalid')) {
      return next(new Error("authentication error"));
    }
    socket.username = username;
    next();
  });

  io.on('connection', socket => {
    const room = Object.values(socket.handshake.auth).join('#')

    if (!mockStarted) {
      mockStarted = true;
      mockProcessedLines(io, room);
    }

    socket.on('joim_room', (room) => {
      socket.join(room)
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
      mockStarted = false;
      clearInterval(interval);
    });
  })
  console.log('setting socketIO')
  socketIO = io
}

module.exports = { setupIO, getSocketIO }