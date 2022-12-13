import User from "../../models/User"
import data from "../../utils/data"
import db from "../../utils/db"

const handler = async (req, res) => {
  await db.Connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await db.Disconnect()
  res.send({ message: 'seeded succesfully' })
}

export default handler