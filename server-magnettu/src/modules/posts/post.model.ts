import { Schema, model } from 'mongoose'

const PostSchema = new Schema(
  {
    emailOriginal: { type: String, required: true },
    linkedinPost: { type: String, required: true },
    tokensUsed: { type: Number, required: true },
  },
  { timestamps: true }
)
export const PostModel = model('Post', PostSchema)