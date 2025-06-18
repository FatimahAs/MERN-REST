import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Car extends Document {
  dealerId: Types.ObjectId;
  carMakeId: Types.ObjectId;
  name: string;
  price: string;
  year: string;
  color: string;
  wheelsCount: string;
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema: Schema = new Schema(
  {
    dealerId: { type: Schema.Types.ObjectId, ref: 'CarDealer', required: true },
    carMakeId: { type: Schema.Types.ObjectId, ref: 'CarMake', required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    year: { type: String, required: true },
    color: { type: String, required: true },
    wheelsCount: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Car>('Car', CarSchema);

