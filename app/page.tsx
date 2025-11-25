import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
// import ProjectCard from "@/components/project-card";
import ExperienceCard from "@/components/experience-card";
import SkillBadge from "@/components/skill-badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              Abhishek Garg
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Experience
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Skills
            </Link>
            <Link
              href="#education"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Education
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
            <Link
              href="https://blog.theabgarg.com"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden md:flex"
            >
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Hi, I'm <span className="text-primary">Abhishek Garg</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
                Frontend Engineer
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed md:leading-loose">
                Results-driven Frontend Engineer with over 4+ years of
                experience in architecting and optimizing high-performance web
                applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                >
                  <Link href="#contact">Get in Touch</Link>
                </Button>
                {/* <Button
                  variant="outline"
                  asChild
                  className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:bg-accent"
                >
                  <Link href="#projects">View Projects</Link>
                </Button> */}
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Avatar className="w-48 h-48 border-4 border-primary/20 shadow-lg transition-all duration-500 hover:border-primary/40 hover:shadow-xl">
                <AvatarImage
                  src="/Abhishek.png?height=192&width=192"
                  alt="Abhishek Garg"
                />
                <AvatarFallback className="text-4xl">AG</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-6">
            <Link
              href="https://github.com/theabgarg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full transition-all duration-300 hover:bg-accent hover:scale-110"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              href="https://linkedin.com/in/theabgarg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full transition-all duration-300 hover:bg-accent hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>
        </section>

        {/* About Section - Refactored */}
        <section id="about" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                About Me
              </h2>
              <div className="h-px flex-1 bg-border"></div>
            </div>

            <div className=" mx-auto bg-card rounded-xl p-6 md:p-8 shadow-sm border">
              <div className="space-y-6">
                <p className="text-xl font-medium leading-relaxed md:leading-loose">
                  I'm a passionate{" "}
                  <span className="text-primary font-semibold">
                    Frontend Engineer
                  </span>{" "}
                  with specialized expertise in React.js and Next.js ecosystems.
                </p>

                <div className="space-y-5 text-base md:text-lg leading-relaxed md:leading-loose text-card-foreground/90">
                  <p>
                    My journey in Frontend Engineering began with a curiosity
                    about how websites work, which quickly evolved into a
                    passion for building robust, user-friendly applications.
                    Over the years, I've honed my skills through hands-on
                    experience at organizations like SMC Global securities,
                    National Informatics Centre, where I've contributed to
                    various projects ranging from Trading platforms to
                    Healthcare Apps.
                  </p>

                  <p>
                    What drives me is the continuous learning process that comes
                    with web development. I thrive in environments where I can
                    explore new technologies and methodologies, constantly
                    pushing the boundaries of what I can create. My experience
                    with React.js has given me a strong foundation in building
                    scalable, maintainable applications, but I'm always eager to
                    expand my toolkit.
                  </p>

                  {/* <blockquote className="pl-4 border-l-4 border-primary/50 italic my-6 md:my-8 py-2">
                    <p className="text-lg md:text-xl font-light">
                      I believe in writing clean, maintainable code that solves
                      real problems. I value collaboration and knowledge sharing
                      within development teams.
                    </p>
                  </blockquote>

                  <p>
                    When I'm not coding, I enjoy contributing to open-source
                    projects and sharing knowledge with the developer community.
                    I approach challenges with curiosity and persistence, always
                    committed to delivering high-quality solutions that meet
                    both user needs and business objectives.
                  </p> */}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {/* <Button
                    asChild
                    size="lg"
                    className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                  >
                    <Link href="#projects" className="flex items-center gap-2">
                      <span>View My Work</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button> */}
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:bg-accent"
                  >
                    <a
                      href="https://drive.google.com/file/d/1OT9HUP44F-7CoGmz1KzFBlX0Lye4fCoS/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Download Resume
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Work Experience
              </h2>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            <div className="grid gap-6">
              <ExperienceCard
                title="MTS - II"
                company="SMC Global Securities Pvt Ltd"
                location="Delhi, India"
                type="Permanent"
                period="May 2023 - Present"
                description="SMC Global is an organization that provides one stop investment solutions in trading & investments."
                responsibilities={[
                  "Engineered a real-time trading platform from the ground up using React.js, Material UI, and WebSocket.",
                  "Architected and implemented a reusable component library that accelerated feature development and ensured UI consistency across the application.",
                  "Enhanced application state management with Redux, improving data flow predictability and simplifying debugging for a complex trading interface.",
                  "Spearheaded a comprehensive front-end performance overhaul, leveraging Webpack Bundle Analyzer to slash the main bundle size by 73% by replacing heavy libraries like Moment.js with lightweight alternatives like dayjs. This,combined with strategic lazy loading, image optimization, and main thread unblocking, cut initial load time by over 50% and reduced UI scripting time by 75%.",
                  "Established a robust testing culture using Jest and React Testing Library, leading to a 35% decrease in critical production bugs.",
                  "Also worked on deployment strategies, web security, performance optimization and implementing VAPT testing fixes. Proficient in tools like Sentry, Lighthouse, and WebVitals to monitor performance, reactive user interfaces",
                ]}
              />

              <ExperienceCard
                title="Application Developer"
                company="National Informatics Centre"
                location="Delhi, India"
                type="Contract"
                period="May 2022 - April 2023"
                description="National Informatics Center is the premier ICT Organization of Government of India."
                responsibilities={[
                  "Built a desktop app MVP similar to Google Drive or Dropbox using Electron.js and React.js, with features such as file uploading and downloading, file management, and sharing. Integrated the backend to ensure seamless synchronization between the desktop app and the cloud storage server. Secured the app with user authentication and authorization, deeplinks, and Parichay SSO for authentication.",
                  " Enhanced the Aarogya Setu app with new features such as support for multiple languages, blood donation, nearby hospitals and blood camp pages, and other improvements to user experience and accessibility. Optimized and fixed existing features.",

                  "Implemented comprehensive unit testing using Jest and React Testing Library across 4 major releases to validate application functions, reduce critical bugs by 30%, and maintain code quality in a 6-person Agile development team.",

                  "Directed implementation of Integration Testing using Jest and React Testing Library over 6-month Agile cycles, enabling comprehensive E2E coverage for 8+ critical workflows and reducing post-release defects by 30%.",

                  "Engineered and executed Integration Testing protocols using Cypress and Postman for 6+ cross-platform releases over 18 months, ensuring endto-end data integrity between Electron.js front-end and Node.js backend, increasing defect detection rate by 25%.",
                ]}
              />

              <ExperienceCard
                title="Software Developer"
                company="NamaSYS"
                location="Delhi, India (Remote)"
                type="Full-Time"
                period="April 2021 - April 2022"
                description="Namasys is a service based company in india providing software related services."
                responsibilities={[
                  "Built a scalable influencer marketing web platform from scratch using React.js, Node.js, DynamoDB, and AWS. Used React.js to develop a userfriendly and interactive web interface. Leveraged Node.js to build a robust and scalable backend API. Optimized DynamoDB for fast and efficient data storage and retrieval. Deployed the application on AWS to ensure high availability and scalability. Utilized Google OAuth to provide users with a seamless login experience.",

                  "Developed a powerful annotation app from scratch using React.js, P5.js, and Azure. Used React.js to create a responsive and intuitive user interface. Employed P5.js to leverage the canvas API for drawing and annotating images. Utilized Azure to host the application and provide robust infrastructure.",

                  "Built a responsive company website from scratch using PHP. Used PHP to develop a dynamic and SEO friendly website. Utilized CSS and JavaScript to create a visually appealing and user friendly design. Deployed the website on a reliable hosting provider to ensure high availability.",

                  "Contributed to the development of a Fleet Operational Accounting Management Software desktop application using Electron.js, React.js, Node.js, SQLite, and MongoDB. Used Electron.js to create a desktop application with a native look and feel. Leveraged React.js to develop a user-friendly and interactive UI. Employed Node.js to build a robust backend API. Used SQLite and MongoDB for data storage.",
                  "Worked on an ecommerce platform to fix and create new frontend designs and functionalities using React.js. Used React.js to develop a modern and userfriendly frontend interface. Implemented new features such as product search, checkout, and payment processing. Optimized existing designs for performance and usability.",

                  "Diagnosed and resolved over 120 frontend and backend issues using Chrome DevTools and Node.js debugging tools within a 6-month period, reducing bug-related support tickets by 35% and ensuring application stability across five active projects.",

                  "Optimized application response times by conducting Performance Tuning across React.js and Node.js layers for five active projects over 6 months, utilizing Chrome DevTools to identify and achieving a 22% increase in system throughput.",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        {/* <section id="projects" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Projects
              </h2>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard
                title="FilaTeam"
                period="August 2024"
                description="Implementation of team features based on laravel/jetstream using Filament on Laravel 11, implementing team switching features with Livewire and automatic refresh after team changes."
                technologies={["Laravel 11", "Filament", "Livewire"]}
                imageUrl="/placeholder.svg?height=300&width=600"
                githubUrl="https://github.com/holiq/filateam"
              />

              <ProjectCard
                title="Landing Page Seccodeid"
                period="April 2023"
                description="Seccodeid landing page created using TailwindCSS with responsive design and optimal SEO."
                technologies={["TailwindCSS", "HTML", "JavaScript"]}
                imageUrl="/placeholder.svg?height=300&width=600"
                liveUrl="https://seccodeid.com"
              />

              <ProjectCard
                title="CIlog"
                period="May 2024 - June 2024"
                description="A campus assignment project from the Programming course to create a blog application using CodeIgniter4 and Bootstrap, equipped with category features, post slugs, admin panel, and comments and replies."
                technologies={["CodeIgniter4", "Bootstrap", "MySQL"]}
                imageUrl="/placeholder.svg?height=300&width=600"
                githubUrl="https://github.com/holiq/cilog"
              />

              <ProjectCard
                title="Blog Laravel"
                period="August 2020 - September 2020"
                description="A simple blog created with Laravel 7, Tailwind CSS, and AlpineJS, equipped with admin panel features, roles and permissions, comments and replies on posts, as well as slugs and tags on posts."
                technologies={[
                  "Laravel 7",
                  "Tailwind CSS",
                  "AlpineJS",
                  "MySQL",
                ]}
                imageUrl="/placeholder.svg?height=300&width=600"
                githubUrl="https://github.com/holiq/blog-laravel"
              />
            </div>
          </div>
        </section> */}

        {/* Skills Section */}
        <section id="skills" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Technical Skills
              </h2>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            <Card className="shadow-sm">
              <CardContent className="p-2">
                <Tabs defaultValue="languages" className="w-full">
                  <TabsList className="flex justify-around">
                    <TabsTrigger value="languages">Languages</TabsTrigger>
                    <TabsTrigger value="frameworks">
                      Frameworks & libraries
                    </TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                  </TabsList>
                  <TabsContent value="languages" className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold">Languages</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <SkillBadge name="HTML" level="Advanced" />
                      <SkillBadge name="CSS" level="Advanced" />
                      <SkillBadge name="Javascript" level="Advanced" />
                      <SkillBadge name="Typescript" level="Advanced" />
                      <SkillBadge name="Golang" level="Beginner" />
                    </div>
                  </TabsContent>
                  <TabsContent value="frameworks" className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold">
                      Frameworks & Libraries
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <SkillBadge name="React.js" level="Advanced" />
                      <SkillBadge name="Next.js" level="Advanced" />
                      <SkillBadge name="Redux" level="Advanced" />
                      <SkillBadge name="Node.js" level="Intermediate" />
                      <SkillBadge name="Express.js" level="Advanced" />
                      <SkillBadge name="Material UI" level="Advanced" />
                      <SkillBadge name="Tailwind CSS" level="Advanced" />
                      <SkillBadge name="GraphQL" level="Advanced" />
                    </div>
                  </TabsContent>
                  <TabsContent value="tools" className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold">Tools & Others</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <SkillBadge name="Git" level="Advanced" />
                      <SkillBadge name="GitHub" level="Advanced" />
                      <SkillBadge name="Webpack" level="Advanced" />
                      <SkillBadge name="Jest" level="Advanced" />
                      <SkillBadge
                        name="React Testing Library"
                        level="Advanced"
                      />
                      <SkillBadge name="Cypress" level="Advanced" />
                      <SkillBadge name="Lighthouse" level="Advanced" />
                      <SkillBadge name="React DevTools" level="Advanced" />
                      <SkillBadge name="AWS" level="Advanced" />
                      <SkillBadge name="Jira" level="Advanced" />
                      <SkillBadge name="Confluence" level="Advanced" />
                      <SkillBadge name="Figma" level="Advanced" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Education
              </h2>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            <div className="grid gap-6">
              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        Delhi Technical Campus
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        B.tech - computer science and engineering
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">2016 - 2020</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    completed b.tech in computer science major.
                  </p>
                </CardContent>
              </Card>

              {/* <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        SMK Miftahul Jannnah
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        Teknik Komputer dan Jaringan (Computer Engineering and
                        Networking)
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">2019 - 2022</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Completed vocational education in Computer Engineering and
                    Networking, building a strong foundation in technical
                    skills.
                  </p>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Get In Touch
              </h2>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                <CardContent className="space-y-6 pt-4">
                  <div className="pt-4">
                    <p className="font-semibold text-base mb-3">
                      Social Profiles
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href="https://github.com/theabgarg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full transition-all duration-300 hover:bg-accent hover:scale-110"
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                      </Link>
                      <Link
                        href="https://linkedin.com/in/theabgarg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full transition-all duration-300 hover:bg-accent hover:scale-110"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">
                    Send Me a Message
                  </CardTitle>
                  <CardDescription className="text-base">
                    I'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <form className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          placeholder="Your name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <input
                        id="subject"
                        placeholder="Message subject"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Your message"
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Abhishek Garg. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
