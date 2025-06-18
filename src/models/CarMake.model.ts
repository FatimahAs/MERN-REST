import mongoose, { Schema, Document } from 'mongoose';

export interface CarMake extends Document {
  country: string;
  brand: string;
}

const CarMakeSchema: Schema = new Schema(
  {
    
    country: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<CarMake>('CarMake', CarMakeSchema);
