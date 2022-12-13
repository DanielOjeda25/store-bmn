import mongoose from 'mongoose';

const connection = {}

async function Connect() {
  if (connection.isConnected) {
    console.log('estas conectado');
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1) {
      console.log('usa la conexion anterior');
      return
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI)
  console.log('nueva conexion')
  connection.isConnected = db.connections[0].readyState

}
async function Disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV !== 'production') {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log('No se pudo desconectar');
    }
  }
}


const db = { Connect, Disconnect }
export default db