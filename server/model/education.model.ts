import { Schema, model } from 'mongoose';

interface IEducation {
    time: string,
    isCollege: boolean,
    school: string,
    academicPrograms: string[],
    GPA: string
}

const educationSchema = new Schema<IEducation>({
    time: { type: String, require: true},
    isCollege: { type: Boolean, require: true},
    school: { type: String, require: true},
    academicPrograms: { type: [String], require: true}, 
    GPA: { type: String}
});

export const Education = model<IEducation>('Education', educationSchema);

