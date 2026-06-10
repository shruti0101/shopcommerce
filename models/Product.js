import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,

  price: Number,
  oldPrice: Number,

metaTitle: {
  type: String,
  default: "",
},

metaDescription: {
  type: String,
  default: "",
},

  description: String,
  features: [String],

  longdescription: {
    type: String,
    default: "",
  },

 sizes: [
  {
    size: String,

    price: {
      type: Number,
    
    },

    oldPrice: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
],


colors: [
  {
    color: String,
   colorImage: String,
    code: {
      type: String,
      default: "",
    },
  },
],


  specifications: [
    {
      key: String,
      value: String,
    }
  ], 

  images: [String],

 
    youtubeLink: {
      type: String,
      default: "",
    },


categories: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
],

  stock: {
    type: Boolean,
    default: true,
  },

  rating: {
    type: Number,
    default: 4,
  },

  reviewsCount: {
    type: Number,
    default: 10,
  },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);