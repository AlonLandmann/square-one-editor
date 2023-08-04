import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema(
  {
    id: String,
    pathName: String,
    displayName: String,
    icon: String,
    prerequisites: Array,
    script: Array
  }
)

export default mongoose.models.Module || mongoose.model('Module', moduleSchema)
