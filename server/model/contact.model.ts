import { Schema, model } from 'mongoose';

interface IContact {
    avatar: string,
    name: string,
    dob: string,
    gender: string, 
    phone: string,
    email: string,
    website: string,
    address: string
}

const contactSchema = new Schema<IContact>({
    avatar: { type: String, require: true},
    name: { type: String, require: true},
    dob: { type: String, require: true},
    gender: { type: String, require: true}, 
    phone: { type: String, require: true},
    email: { type: String, require: true},
    website: { type: String, require: true},
    address: { type: String, require: true}
});

export const Contact = model<IContact>('Contact', contactSchema);

