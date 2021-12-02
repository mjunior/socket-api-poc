function randomRange(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

const listLines = (socket) => {
  console.log('**** listLines controller ****')
  const vehicles = [
    { id: 1, name: 'Veiculo 01'},
    { id: 2, name: 'Veiculo 02' },
    { id: 3, name: 'Veiculo 03' },
    { id: 4, name: 'Veiculo 04' },
    { id: 5, name: 'Veiculo 05' },
  ]

  socket.emit('listLines', vehicles)
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getGender(i) {
  const gender = ['homi', 'muie'];
  return gender[i]
}

function newProcessedLine(io, room) {
  console.log('**** newProcessedLine controller ****')
  const id = randomRange(1, 9000);
  const to = room
  const data = {
    name: `${id} - ${to}`,
    age: getRandomArbitrary(17, 25),
    gender: getGender(Math.floor(Math.random() * 2)),
    address:
      '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
    city: 'Adamantina',
    state: 'SP',
  }

  
  console.log('New athlete to', to)
  io.to(to).emit('newProcessedLine', data)
}

module.exports = {
  newProcessedLine,
  listLines
}