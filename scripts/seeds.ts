const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const categorySeed = async () => {
  try {
    await database.category.createMany({
      data: [
        { name: "Software Development" },
        { name: "Web Development" },
        { name: "Mobile App Development" },
        { name: "Data Science" },
        { name: "Machine Learning" },
        { name: "Artificial Intelligence" },
        { name: "UI/UX Design" },
        { name: "Product Management" },
        { name: "Project Management" },
        { name: "Quality Assurance" },
        { name: "DevOps" },
        { name: "Cybersecurity" },
        { name: "Cloud Computing" },
        { name: "Database Administration" },
        { name: "Network Engineering" },
        { name: "Business Analysis" },
        { name: "Sales" },
        { name: "Marketing" },
        { name: "Customer Support" },
        { name: "Human Resources" },
        { name: "Finance" },
        { name: "Accounting" },
        { name: "Legal" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(`Error on seeding the database categories: ${error}`);
  }
};

// categorySeed()

const userRoleSeed = async () => {
  try {
    await database.role.createMany({
      data: [
        { name: "Academic Advisor" },
        { name: "Accountant" },
        { name: "Animator" },
        { name: "Art Director" },
        { name: "Automotive Technician" },
        { name: "Auditor" },
        { name: "Aerospace Engineer" },
        { name: "Biochemist" },
        { name: "Bookkeeper" },
        { name: "Brand Manager" },
        { name: "Carpenter" },
        { name: "Call Center Agent" },
        { name: "Chemical Engineer" },
        { name: "Chef" },
        { name: "Civil Engineer" },
        { name: "Clinical Research Coordinator" },
        { name: "Compensation and Benefits Analyst" },
        { name: "Compliance Officer" },
        { name: "Content Creator" },
        { name: "Controller" },
        { name: "Copywriter" },
        { name: "Court Reporter" },
        { name: "Customer Service Representative" },
        { name: "Customer Success Manager" },
        { name: "Data Scientist" },
        { name: "Database Administrator" },
        { name: "Dental Assistant" },
        { name: "DevOps Engineer" },
        { name: "Digital Marketing Specialist" },
        { name: "Electrical Engineer" },
        { name: "Employee Relations Manager" },
        { name: "Environmental Engineer" },
        { name: "Environmental Scientist" },
        { name: "Event Planner" },
        { name: "Financial Analyst" },
        { name: "Financial Planner" },
        { name: "Film Director" },
        { name: "Graphic Designer" },
        { name: "Help Desk Technician" },
        { name: "Hotel Manager" },
        { name: "HR Manager" },
        { name: "HR Specialist" },
        { name: "Industrial Engineer" },
        { name: "Investment Banker" },
        { name: "Inventory Analyst" },
        { name: "IT Project Manager" },
        { name: "IT Support Specialist" },
        { name: "Judge" },
        { name: "Laboratory Technician" },
        { name: "Lawyer" },
        { name: "Legal Assistant" },
        { name: "Legal Consultant" },
        { name: "Legal Secretary" },
        { name: "Librarian" },
        { name: "Logistics Manager" },
        { name: "Machine Learning Engineer" },
        { name: "Mason" },
        { name: "Mechanical Engineer" },
        { name: "Medical Assistant" },
        { name: "Medical Doctor" },
        { name: "Medical Laboratory Technician" },
        { name: "Mental Health Counselor" },
        { name: "Network Engineer" },
        { name: "Occupational Therapist" },
        { name: "Operations Manager" },
        { name: "Paralegal" },
        { name: "Payroll Specialist" },
        { name: "Pharmacist" },
        { name: "Physical Therapist" },
        { name: "Photographer" },
        { name: "Principal" },
        { name: "Procurement Specialist" },
        { name: "Public Relations Specialist" },
        { name: "QA Tester" },
        { name: "Radiologic Technologist" },
        { name: "Recruiter" },
        { name: "Registered Nurse" },
        { name: "Research Analyst" },
        { name: "Research Scientist" },
        { name: "Restaurant Manager" },
        { name: "Risk Manager" },
        { name: "School Counselor" },
        { name: "SEO Specialist" },
        { name: "Software Developer" },
        { name: "Software Engineer" },
        { name: "Special Education Teacher" },
        { name: "Structural Engineer" },
        { name: "Supply Chain Coordinator" },
        { name: "Surgeon" },
        { name: "Technical Support Specialist" },
        { name: "Teacher" },
        { name: "Tax Consultant" },
        { name: "Training and Development Manager" },
        { name: "Travel Agent" },
        { name: "Tutor" },
        { name: "UX/UI Designer" },
        { name: "Web Developer" },
        { name: "Warehouse Supervisor" },
        { name: "Welder" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(`Error on seeding the database user roles: ${error}`);
  }
};

// userRoleSeed();

const userSkillLevelSeed = async () => {
  try {
    await database.skillLevel.createMany({
      data: [
        { name: "Entry-Level" },
        { name: "Junior" },
        { name: "Mid-Level" },
        { name: "Senior" },
        { name: "Expert" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(`Error on seeding the database user skill levels: ${error}`);
  }
};

userSkillLevelSeed();
