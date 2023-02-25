import { Schema, model } from 'mongoose';

interface ISkill {
    name: string,
    level: string
}

const skillSchema = new Schema<ISkill>({
    name: { type: String, require: true},
    level: { type: String, require: true}
});

export const Skill = model<ISkill>('Skill', skillSchema);

