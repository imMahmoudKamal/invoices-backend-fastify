import mongoose from 'mongoose';
import { flatObject } from '../utils/index.js';

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Item Name Is Required.'] },
    qty: { type: Number, required: [true, 'Item Quantity Is Required.'] },
    price: { type: Number, required: [true, 'Item Price Is Required.'] },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: [true, 'Street Is Required.'] },
    city: { type: String, required: [true, 'City Is Required.'] },
    post: { type: Number, required: [true, 'Post Code Is Required.'] },
    country: { type: String, required: [true, 'Country Is Required.'] },
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    billFrom: {
      type: addressSchema,
      required: true,
    },
    clientDetails: {
      name: { type: String, required: [true, 'Client Name Is Required.'] },
      email: { type: String, required: [true, 'Client Email Is Required.'] },
      address: {
        type: addressSchema,
        required: true,
      },
    },
    invoiceDetails: {
      invoiceDate: { type: Date, required: [true, 'Date Is Required.'] },
      paymentDate: { type: Date, required: [true, 'Payment Due Is Required.'] },
      description: { type: String, required: [true, 'Description Is Required.'] },
      status: { type: String, default: 'Pending', enum: ['Pending', 'Paid'] },
      itemList: [itemSchema],
    },
  },
  {
    collection: 'invoice',
    timestamps: true,
  }
);

invoiceSchema.pre('save', async function (next) {
  try {
    this._id = await randomString();
  } catch (error) {
    next(error);
  }

  next();
});

invoiceSchema.pre('findOneAndUpdate', function (next) {
  this._update = flatObject(this._update);

  next();
});

const Invoice = mongoose.model('invoice', invoiceSchema);
export default Invoice;

async function randomString() {
  let result = '';
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';

  for (let i = 0; i < 2; i++) {
    result += char[Math.floor(Math.random() * char.length)];
  }

  for (let i = 0; i < 4; i++) {
    result += nums[Math.floor(Math.random() * nums.length)];
  }

  // check that DB doesn't has the same id
  const match = await isMatch(result);

  return match ? result : randomString();
}

async function isMatch(id) {
  try {
    const res = await Invoice.findById(id);

    return !res ? true : false;
  } catch (error) {
    console.log(error);
  }
}
