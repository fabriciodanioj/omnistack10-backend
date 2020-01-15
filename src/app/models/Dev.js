import { Schema, model } from 'mongoose';
import PointSchema from './utils/PointSchema';

const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    github_username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
  },
  {
    timestamps: true,
  }
);

export default model('Dev', DevSchema);
