import { Schema, model } from 'mongoose';

interface IObjective {
    content: string
}

const objectiveSchema = new Schema<IObjective>({
    content: { type: String, require: true}
});

export const Objective = model<IObjective>('Objective', objectiveSchema);

