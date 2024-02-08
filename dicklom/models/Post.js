import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    priceWithVAT: {
      type: Number,
      required: true,
    },
    deliveryBasis: {
      type: String,
      required: true,
    },
    deliveryPlace: {
      type: String,
      required: true,
    },
    counterpartyOption: {
      type: String,
      required: true,
    },
    binIin: {
      type: String,
    },
    additionalInfo: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
