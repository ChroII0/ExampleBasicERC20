import { Schema, model } from 'mongoose';

interface IProject {
    type: string,
    website: string,
    description: string[]
}

const projectSchema = new Schema<IProject>({
    type: { type: String, require: true},
    website: { type: String},
    description: {type: [String], require: true}
});

export const Project = model<IProject>('Project', projectSchema);

