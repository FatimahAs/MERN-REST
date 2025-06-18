import mongoose, { Schema, Document } from 'mongoose';

export interface CarDealer extends Document {
  name: string;
  email: string;
  city: string;

}

const CarDealerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
      email: { type: String, required: true },
    city: { type: String, required: true },
  
  },
  { timestamps: true }
);

export default mongoose.model<CarDealer>('Dealer', CarDealerSchema);
