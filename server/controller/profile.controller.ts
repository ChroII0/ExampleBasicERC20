import { Contact } from "../model/contact.model"
import { Education } from "../model/education.model";
import { Interest } from "../model/interest.model";
import { Objective } from "../model/objective.model";
import { Project } from "../model/project.model";
import { Skill } from "../model/skill.model";
import { SocialMedia } from "../model/socialMedia.model";
import { Request, Response } from 'express';




export const getDataProfile = async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find({});
        const objectives = await Objective.find({});
        const educations = await Education.find({});
        const skills = await Skill.find({});
        const interests = await Interest.find({});
        const projects = await Project.find({});
        const SocialMedias = await SocialMedia.find({});
        const data = {
            contact: contacts,
            objective: objectives,
            education: educations,
            skill: skills,
            interest: interests,
            project: projects,
            SocialMedia: SocialMedias
        }
        res.send(data);
    }catch(err)
    {
        res.send(err);
    }
}