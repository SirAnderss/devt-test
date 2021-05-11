import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema({
  fullName: { type: String, required: true },
  document: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  avatar: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
