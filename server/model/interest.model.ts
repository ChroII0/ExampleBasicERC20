import { Schema, model } from 'mongoose';

interface IInterest {
    content: string
}

const interestSchema = new Schema<IInterest>({
    content: { type: String, require: true}
});

export const Interest = model<IInterest>('Interest', interestSchema);

