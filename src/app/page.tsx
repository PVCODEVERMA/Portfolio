"use client";

import { HackathonCard } from "@/components/hackathon-card";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, Download, CheckCircle2, Briefcase, Users, Cpu } from "lucide-react";
import { motion } from "framer-motion";

import { CertificationCard } from "@/components/certification-card";

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 md:space-y-24">
      <section id="hero" className="relative pt-12 md:pt-20 pb-8 overflow-hidden">
        <div className="mx-auto w-full max-w-4xl space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Avatar className="size-32 sm:size-40 border-4 border-background shadow-2xl relative">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                <AvatarFallback className="text-4xl">{DATA.initials}</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground">
                  {DATA.name}
                </h1>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <CheckCircle2 className="size-8 sm:size-10 text-blue-500 fill-blue-500/20" />
                </motion.div>
              </div>
              <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                {(DATA as any).role} | {(DATA as any).subtitle}
              </p>
            </div>

            <div className="max-w-[800px] text-base md:text-lg text-muted-foreground font-medium leading-relaxed px-4">
              {DATA.description}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4">
              {(DATA as any).stats?.map((stat: any) => {
                const Icon = {
                  Briefcase: <Briefcase className="size-5 text-primary" />,
                  Users: <Users className="size-5 text-primary" />,
                  Cpu: <Cpu className="size-5 text-primary" />,
                }[stat.icon as string];

                return (
                  <div key={stat.label} className="flex items-center gap-2.5 group cursor-default">
                    <div className="p-2 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                      {Icon}
                    </div>
                    <span className="text-sm sm:text-base font-bold text-foreground/80">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      <section id="about" className="scroll-mt-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">About</h2>
        </div>
        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-foreground/90 dark:prose-invert leading-relaxed">
          {DATA.summary}
        </Markdown>
      </section>
      <section id="projects" className="scroll-mt-16">
        <div className="space-y-12 w-full py-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary text-primary-foreground px-3 py-1 text-sm font-medium shadow-lg shadow-primary/30">
                My Projects
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter">
                Check out my latest work
              </h2>
              <p className="text-foreground/80 text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
                I&apos;ve worked on a variety of projects, from simple
                websites to complex web applications. Here are a few of my
                favorites.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
            {DATA.projects.map((project, id) => (
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="work" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Work Experience</h2>
            <Badge variant="secondary" className="bg-primary/20 text-black dark:text-primary font-bold text-xs">
              Total Experience: 1.5+ Years
            </Badge>
          </div>
          {DATA.work.map((work, id) => (
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              badges={work.badges}
              period={`${work.start} - ${work.end ?? "Present"}`}
              description={work.description}
            />
          ))}
        </div>
      </section>
      <section id="education" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-4">
          <h2 className="text-xl font-bold">Education</h2>
          {DATA.education.map((education, id) => (
            <ResumeCard
              key={education.school}
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
              period={`${education.start} - ${education.end}`}
            />
          ))}
        </div>
      </section>
      <section id="skills" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-8 w-full py-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary text-primary-foreground px-3 py-1 text-sm font-medium shadow-lg shadow-primary/30">
                My Skills
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter">
                Technical Skills
              </h2>
              <p className="text-foreground/80 text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
                I've categorized my expertise across various domains. 
                Total of {DATA.skills ? Object.values(DATA.skills).reduce((acc: number, curr: any) => acc + (curr.length || 0), 0) : 0} skills listed below.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto w-full">
            {DATA.skills && Object.entries(DATA.skills).map(([category, skills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4 border-b border-primary/10 pb-3">
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary animate-pulse" />
                    {category}
                  </h3>
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary-foreground dark:text-primary font-bold">
                    {(skills as readonly string[]).length} Skills
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(skills as readonly string[]).map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="px-3 py-1 text-xs font-medium bg-background/50 hover:bg-primary/5 transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="scroll-mt-16">
        <div className="space-y-8 w-full py-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">
                Certifications & Workshops
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="size-4 text-green-500 fill-green-500/10" />
                  <span>{(DATA.certifications as readonly any[])?.filter((c) => c.status === "completed").length || 0} Completed</span>
                </div>
                <span>•</span>
                <span>{(DATA.certifications as readonly any[])?.filter((c) => c.status === "ongoing").length || 0} Ongoing</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DATA.certifications?.map((cert, id) => (
                <CertificationCard key={cert.title} cert={cert as any} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-16">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Contact
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-foreground/80 text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
              Interested in working together or have a question? Feel free to
              reach out via{" "}
              <a
                href="mailto:pankaj9129@gmail.com"
                className="text-primary font-bold underline underline-offset-4 hover:opacity-80"
              >
                email
              </a>{" "}
              or connect on{" "}
              <a
                href="https://www.linkedin.com/in/pankaj-verma-8a99a723a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold underline underline-offset-4 hover:opacity-80"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
