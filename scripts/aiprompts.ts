import { skillsList } from "@/lib/skill-image";

export const job_description = (rollName: string, skills: string) => {
  return `Create a detailed and comprehensive long description for the job role: ${rollName}. The description should include the following sections:

1. **Job Summary**: An overview of the role and its importance within the company.
2. **Key Responsibilities**: A detailed list of primary tasks and responsibilities associated with the role.
3. **Required Skills and Qualifications**: Specific skills on ${skills}, qualifications, and experiences necessary for the role.
4. **Preferred Skills**: Additional skills and experiences that are desirable but not mandatory.
5. **Work Environment**: A brief description of the working conditions, team structure, and company culture.
6. **Impact**: How this role contributes to the company's goals and objectives.
7. **Career Growth Opportunities**: Potential career paths and growth opportunities within the company.

Don't Use any type of symbols like asterics and hashes and any type of symbol for highliting any line and ensure the description is clear, professional, and appealing to potential candidates.
Give me everytime unique results.`;
};

export const job_short_description = (prompt: string) => {
  return `Create a unique and engaging short description for the job role: ${prompt}. The description should highlight the key responsibilities, required skills, and the impact the role has within the company. Don't Use any type of symbols like asterics and hashes and any type of symbol for highliting any line. Make it concise and appealing to potential candidates. Description should be in less than 400 characters. Give me everytime unique results.
`;
};

export const job_tags = (prompt: string) => {
  return `Generate an array of top 10 keywords related to the job profession "${prompt}". These keywords should encompass various aspects of the profession, including skills, responsibilities, tools, and technologies commonly associated with it. Aim for a diverse set of keywords that accurately represent the breadth of the profession. Your output should be a list/array of keywords. Just return me the array alone. And Make sure that the keywords are relevant and specific to the profession. And also make sure that the keywords are not too generic or too specific. And also make sure that the keywords not to be repeated. Give me everytime unique results.
`;
};

export const company_overview = (rollName: string) => {
  return `Generate an overview content about ${rollName}. Include information about its history, purpose, features, user base, and impact on the industry. Focus on providing a comprehensive yet concise summary suitable for readers unfamiliar with the platform. Give me everytime unique results.`;
};

export const company_why_join_us = (rollName: string) => {
  return `Create a compelling "Why join us" content piece for ${rollName}. Highlight the unique opportunities, benefits, and experiences that ${rollName} offers to its users. Emphasize the platform's value proposition, such as access to a vast music library, personalized recommendations, exclusive content, community features, and career opportunities for musicians and creators. Tailor the content to attract potential users and illustrate why ${rollName} stands out among other music streaming platforms. Give me everytime unique results.`;
};

export const user_Bio = (role: string, userName: string) => {
  return `Generate a short biography for ${userName} as a ${role}. The biography should be a maximum of 100 words and should highlight relevant experience, skills, and achievements specific to the job title. Give me everytime unique results.`;
};

export const user_Software_Skills = (role: string) => {
  return `Generate an array of the top 15 skills for a user with the role "${role}" from the following list: "${skillsList}". These skills should be the most relevant and beneficial for the given role, considering the typical responsibilities, tools, and technologies associated with it. Ensure the skills are diverse, relevant, and specific to the role without being too generic or too niche. Avoid any repeated skills in your output. Just return the array alone. Give me everytime unique results. And Check that you give me this result before then skip these skills and give me another results.`;
};
