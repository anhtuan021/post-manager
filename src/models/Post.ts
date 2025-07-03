import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPost extends Document {
  name: string;
  description: string;
  image?: string;
}

const PostSchema: Schema = new Schema<IPost>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default (mongoose.models.Post as Model<IPost>) || mongoose.model<IPost>('Post', PostSchema);
