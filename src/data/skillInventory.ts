import source from './portfolio-data.json';
import skillMedia from './skill-media.json';
import { assessSkill } from './skillRatings';

// User-supplied inventory. Labels describe coursework, hands-on work, or exposure;
// they do not imply professional proficiency in every subject.
export type SkillLevel = 'Coursework' | 'Hands-on' | 'Exposure';
export type SkillItem = { name: string; description: string; level: SkillLevel; image?: string; stars: number; ratingBasis: string };
export type SkillGroup = { title: string; description: string; skills: SkillItem[] };
export type SkillArea = { id: string; title: string; intro: string; groups: SkillGroup[] };

const roleImages: Record<string, string> = {
  'InAmigos Foundation Junior HR': source.media.inamigos_logo,
  'AI Geeks Chennai Marketing Lead': source.media.ai_geeks_logo,
};
const normalizeName = (name: string) => name.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g, '');
const suppliedMedia = new Map(skillMedia.map(record => [normalizeName(record.name), record]));

const items = (level: SkillLevel, rows: string[]): SkillItem[] => rows.map(row => {
  const [name, description] = row.split('|');
  const supplied = suppliedMedia.get(normalizeName(name));
  const assessment = assessSkill(name, level);
  return { name, description, level, image: roleImages[name] ?? supplied?.image, stars: assessment.stars, ratingBasis: assessment.basis };
});

export const skillAreas: SkillArea[] = [
  {
    id: 'academic', title: 'Academic', intro: 'ECE, computing, data science and research foundations studied through coursework and academic projects.', groups: [
      { title: 'Electronics & Communication Engineering', description: 'Core ECE concepts and circuit analysis.', skills: items('Coursework', [
        'Electronic Circuit Analysis|Analysing voltage, current and circuit behaviour.',
        'Analog Electronics|Understanding continuous-signal circuits and amplifiers.',
        'Digital Electronics|Working with digital components and logic systems.',
        'Digital Logic Design|Designing combinational and sequential logic.',
        'Semiconductor Devices|Studying device operation and characteristics.',
        'MOSFET and BJT Fundamentals|Understanding transistor operation and switching.',
        'Electronic Measurements|Measuring and interpreting circuit behaviour.',
        'Circuit Design & Analysis|Building and evaluating basic electronic circuits.',
        'Electronic Component Identification|Selecting and recognising common components.',
        'Signal Models and Amplifier Fundamentals|Studying signals and basic gain stages.',
        'Computer Organization & Architecture|Understanding how computer hardware is organised.',
        'Electromagnetic Theory|Studying fields and wave fundamentals.',
        'Transformers and Electrical Fundamentals|Understanding energy transfer and basic electrical systems.',
        'Boundary Value Problems|Applying mathematical models to engineering problems.',
      ]) },
      { title: 'Data & Computing Foundations', description: 'Programming and analytical concepts learned in study and practice.', skills: items('Coursework', [
        'C Programming|Writing structured programs and learning fundamentals.',
        'C++ Fundamentals|Practising algorithms and object-oriented basics.',
        'Python Programming|Writing scripts, applications and data workflows.',
        'SQL|Querying and organising structured data.',
        'NumPy and Matplotlib|Analysing arrays and visualising results.',
        'Data Analysis|Interpreting data to answer practical questions.',
        'Machine Learning Fundamentals|Learning model concepts and evaluation.',
        'Analytical Thinking|Breaking technical problems into testable parts.',
      ]) },
      { title: 'Research Methods', description: 'Methods used in academic inquiry and technical documentation.', skills: items('Coursework', [
        'Technical Research|Investigating engineering and product questions.',
        'Literature Review|Comparing prior work and technical sources.',
        'Research Documentation|Recording methods, results and limitations.',
        'Research Paper Preparation|Structuring technical findings for publication.',
        'Problem Identification|Defining the underlying issue before building.',
        'Research Gap Identification|Finding open questions in existing work.',
        'Technical Feasibility Analysis|Checking whether a proposed approach is practical.',
        'Survey Design and Data Collection|Gathering user and field observations.',
        'Solar Energy Research|Exploring photovoltaic and energy-system questions.',
      ]) },
    ],
  },
  {
    id: 'co-curricular', title: 'Co-curricular', intro: 'Applied projects, research, workshops, hackathons and technical community learning alongside coursework.', groups: [
      { title: 'Embedded Systems, IoT & Energy', description: 'Hands-on hardware work and energy-system exposure.', skills: [
        ...items('Hands-on', [
          'ESP32 Microcontroller|Building sensor-connected prototypes.',
          'Sensor Interfacing|Connecting sensors to microcontrollers and software.',
          'IoT System Fundamentals|Linking devices, data and dashboards.',
          'Hardware–Software Integration|Combining circuits, firmware and applications.',
          'Hardware Prototyping|Testing ideas with components and breadboards.',
          'Basic PCB Design using EasyEDA|Creating introductory board layouts.',
          'Solar PV Systems|Exploring solar-powered charging and protection.',
          'Battery Energy Systems|Exploring single-cell charging and protection.',
          'Energy Monitoring Concepts|Tracking energy-related system behaviour.',
        ]),
        ...items('Exposure', [
          'Arduino Fundamentals|Learning microcontroller prototyping basics.',
          'Embedded Systems Fundamentals|Learning firmware and device principles.',
        ]),
      ] },
      { title: 'Software, AI & Product Building', description: 'Tools and methods applied in prototypes and team projects.', skills: items('Hands-on', [
        'JavaScript|Building browser interactions and application logic.',
        'HTML and CSS|Structuring and styling web interfaces.',
        'React and Vite|Building component-based web applications.',
        'FastAPI|Creating Python APIs for project backends.',
        'Generative AI|Applying language and image models in prototypes.',
        'Prompt Engineering|Shaping prompts and evaluating model responses.',
        'AI API Integration|Connecting external AI services to applications.',
        'AI Agent Development|Prototyping multi-step assisted workflows.',
        'Git and GitHub|Managing code history and collaboration.',
        'Docker|Packaging applications for consistent deployment.',
        'Firebase and Supabase|Using hosted authentication and data services.',
        'Streamlit|Building quick Python interfaces and demos.',
        'n8n Automation|Connecting services in automated workflows.',
        'Ollama and Local LLM Exploration|Testing models on local hardware.',
        'Godot 4|Building and testing a 2D game prototype.',
        'Product Ideation|Turning observed needs into product concepts.',
        'Problem-Solution Mapping|Connecting user pain points to features.',
        'UI/UX Fundamentals|Designing usable flows and interface structure.',
        'Prototyping|Making ideas tangible for testing and feedback.',
        'User-Centred Design|Considering user needs during design.',
        'Application Development|Building working software prototypes.',
        'Product Thinking|Balancing user needs, scope and delivery.',
        'Design Thinking|Exploring, testing and refining possible solutions.',
        'Technical Project Planning|Scoping tasks and coordinating builds.',
        'Solution Architecture Fundamentals|Planning how system parts connect.',
        'Innovation and Ideation|Generating and evaluating new approaches.',
        'Technical Presentation|Explaining project methods and results.',
      ]) },
      { title: 'Workshops & Industry Exposure', description: 'Topics encountered through workshops, events and exploration.', skills: items('Exposure', [
        'Hybrid Electric Drive Systems|Learning about sustainable mobility research.',
        'Electric Vehicle Technology|Exploring electric mobility systems.',
        'Embedded Electronics|Exploring applied electronic systems.',
        'AI in Electronics|Exploring AI uses in ECE projects.',
        'On-Device AI Concepts|Learning about intelligence running on devices.',
        'Edge Computing Fundamentals|Exploring computation close to sensors.',
        'Semiconductor and VLSI Fundamentals|Learning chip-design concepts.',
        'AI-powered Game Development|Exploring AI-assisted game workflows.',
        'Voice AI Fundamentals|Exploring speech-first user interactions.',
        'Cybersecurity Fundamentals|Learning basic security concepts.',
        'Ethical Hacking Awareness|Learning responsible security practices.',
      ]) },
      { title: 'Technical Activities', description: 'Project and learning experiences that demonstrate these skills.', skills: items('Hands-on', [
        'RESOLVE ’26 Game Jam|Second prize for a Godot 4 game build.',
        'HackSprint at MAHE Bengaluru|Top 12 finalist after field research and prototyping.',
        'Hackathon Participation|Building and presenting under short deadlines.',
        'Undergraduate Research (UROP)|Participating in structured research work.',
        'IEEE Computer Society Membership|Engaging with a technical professional community.',
        'Electronics and Embedded-Systems Research|Exploring practical ECE problems.',
        'Technical Workshops and Developer Events|Learning from practitioners and peers.',
        'Hybrid Electric Drive Workshop|Exploring sustainable mobility research.',
        'Generative AI Workshops and Hackathons|Applying AI tools in guided builds.',
      ]) },
    ],
  },
  {
    id: 'extracurricular', title: 'Extracurricular', intro: 'Leadership, communication and community work developed through roles, teams and events.', groups: [
      { title: 'Leadership & Management', description: 'Working with people to organise projects and communities.', skills: items('Hands-on', [
        'Team Leadership|Guiding small teams toward a shared outcome.',
        'Team Coordination|Aligning responsibilities and timelines.',
        'Marketing Strategy|Planning messages and outreach for activities.',
        'Community Management|Supporting participation and engagement.',
        'Event Promotion|Helping technical events reach participants.',
        'Human Resource Coordination|Supporting people-related coordination.',
        'Publicity and Outreach|Sharing programmes with relevant audiences.',
        'Stakeholder Communication|Keeping collaborators informed.',
        'Team Collaboration|Working across disciplines and roles.',
        'Project Coordination|Tracking tasks and delivery.',
        'Event Organisation|Helping plan and run activities.',
        'Hackathon Team Management|Coordinating a build under time pressure.',
        'AI Geeks Chennai Marketing Lead|Leading marketing activity for a community.',
        'InAmigos Foundation Junior HR|Supporting HR coordination work.',
      ]) },
      { title: 'Communication & Professional Practice', description: 'Presenting ideas, learning with others and adapting to new settings.', skills: items('Hands-on', [
        'Public Speaking|Presenting ideas to groups and event audiences.',
        'Technical Communication|Making technical work understandable.',
        'Presentation Skills|Structuring and delivering project stories.',
        'Debate|Exploring and defending viewpoints.',
        'Problem-Solving|Working through constraints and trade-offs.',
        'Critical Thinking|Questioning assumptions and evidence.',
        'Creative Thinking|Finding different approaches to a challenge.',
        'Research Communication|Sharing findings and methods clearly.',
        'Networking|Building connections at community events.',
        'Time Management|Prioritising work against deadlines.',
        'Adaptability|Learning new tools and changing approach when needed.',
        'Collaboration|Building with teammates and mentors.',
        'Debate and Presentation Activities|Practising public discussion and delivery.',
      ]) },
    ],
  },
];
