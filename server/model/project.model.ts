import { Schema, model } from 'mongoose';

interface IProject {
    type: string,
    url_website: string,
    team_size: number,
    description: string,
    responsibility: string,
    technologies_used: string,
    technical_project: object[]
}

const projectSchema = new Schema<IProject>({
    type: { type: String, require: true},
    url_website: { type: String},
    team_size: {type: Number, require: true},
    description: {type: String, require: true},
    responsibility: {type: String, require: true},
    technologies_used: {type: String, require: true},
    technical_project: {type: [Object], require: true}
});

export const Project = model<IProject>('Project', projectSchema);

