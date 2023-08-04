import dbConnect from '@/db/dbConnect'
import Module from '@/db/models/Module'

dbConnect()

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const getCursor = await Module.rsfindOne(
          { urlId: req.query.urlId }
        )
  
        if (getCursor) {
          res.status(200).json({ success: true, data: getCursor })
        } else {
          res.status(400).json({ success: false })
        }

        break;

      case 'PUT': 
        const putCursor = await Module.rsfindOneAndUpdate(
          { urlId: req.query.urlId },
          req.body,
          { new: true, runValidators: true }
        )
  
        if (putCursor) {
          res.status(200).json({ success: true })
        } else {
          res.status(400).json({ success: false })
        }

        break;

      default:
        res.status(400).json({ success: false })
    }
  } catch (error) {
    res.status(500).json({ success: false })
  }
}
