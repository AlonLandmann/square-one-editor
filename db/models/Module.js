import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema(
  {
    id: Number,
    pathName: String,
    displayName: String,
    icon: String,
    description: String,
    prerequisites: Array,
    script: Array
  }
)

export default mongoose.models.Module || mongoose.model('Module', moduleSchema)
