import { Schema, model } from 'mongoose';

interface ISocialMedia {
    github: string,
    facebook: string,
    instagram: string
}

const socialMediaSchema = new Schema<ISocialMedia>({
    github: { type: String, require: true},
    facebook: { type: String, require: true},
    instagram: { type: String, require: true}
});

export const SocialMedia = model<ISocialMedia>('SocialMedia', socialMediaSchema);

