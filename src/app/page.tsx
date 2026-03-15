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
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <Badge key={skill}>{skill}</Badge>
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
              <div className="text-sm text-muted-foreground">
                {DATA.certifications?.filter((c) => c.status === "completed")
                  .length || 0}{" "}
                Completed •
                {DATA.certifications?.filter((c) => c.status === "ongoing")
                  .length || 0}{" "}
                Ongoing
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DATA.certifications?.map((cert, id) => (
                <div
                  key={cert.title}
                  className={`border rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-card/40 backdrop-blur-md hover:bg-card/60 hover:border-primary/30 ${cert.badgeColor || "border-primary/10"
                    }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-2">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-foreground">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-foreground/80 line-clamp-1 font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <Badge
                        variant="outline"
                        className="text-xs font-medium border-primary/20 bg-background/50"
                      >
                        {cert.date}
                      </Badge>
                      {cert.status === "ongoing" && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-primary/20 text-primary-foreground dark:text-primary border-primary/20"
                        >
                          In Progress
                        </Badge>
                      )}
                      {cert.type === "workshop" && (
                        <Badge variant="outline" className="text-xs border-primary/20 bg-background/50">
                          Workshop
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-foreground/80 mb-4 line-clamp-3 min-h-[60px] leading-relaxed">
                    {cert.description}
                  </p>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="inline-block px-2 py-1 text-xs bg-secondary/50 rounded-md border border-border"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="inline-block px-2 py-1 text-xs text-muted-foreground">
                          +{cert.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t mt-4">
                    <div className="text-xs text-muted-foreground truncate max-w-[60%]">
                      {cert.credentialId && (
                        <span className="truncate">
                          ID: {cert.credentialId}
                        </span>
                      )}
                      {cert.duration && (
                        <span className="ml-2">• {cert.duration}</span>
                      )}
                    </div>

                    {cert.url && cert.url !== "#" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-2 px-3 text-xs shrink-0"
                        asChild
                      >
                        <Link
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span className="hidden sm:inline">Verify</span>
                          <span className="sm:hidden">View</span>
                        </Link>
                      </Button>
                    )}
                  </div>

                  {cert.status === "ongoing" && cert.progress && (
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{cert.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${cert.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
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
