import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, Download, FileText } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 md:space-y-24">
      <section id="hero" className="relative pt-8 md:pt-12">
        {/* Hero gradient background */}
        <div className="absolute -top-40 left-0 right-0 h-[500px] bg-gradient-to-b from-orange-500/10 via-yellow-100/5 to-transparent dark:from-orange-500/20 dark:via-yellow-500/10 blur-3xl -z-10" />

        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between items-start">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl md:text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500 dark:from-orange-400 dark:to-yellow-400"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl text-muted-foreground"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>

            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border-4 border-orange-500/20 dark:border-orange-500/30 shadow-xl shadow-orange-500/20">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about" className="scroll-mt-16">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">About</h2>
            {/* Download Resume Button in Hero Section */}
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="gap-2 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600 shadow-lg shadow-orange-500/30">
                  <a
                    href="https://drive.google.com/file/d/18MuY03WjBz1nYPJVJhaj5_SnxhGBBitu/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </BlurFade>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="projects" className="scroll-mt-16">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 text-white px-3 py-1 text-sm font-medium shadow-lg shadow-orange-500/30">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
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
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="work" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => {
            console.log("ResumeCard Work Data:", work);

            return (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            );
          })}

        </div>
      </section>
      <section id="education" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>


      {/* Certifications Section - Fixed */}
      <section id="certifications" className="scroll-mt-16">
        <div className="space-y-8 w-full py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {DATA.certifications?.map((cert, id) => (
                  <BlurFade
                    key={cert.title}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.03}
                  >
                    <div
                      className={`border rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-card hover:bg-card/80 ${cert.badgeColor || "border-border"
                        }`}
                    >
                      {/* Certification Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-2">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {cert.issuer}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            {cert.date}
                          </Badge>
                          {cert.status === "ongoing" && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-yellow-500/20 text-yellow-800 dark:text-yellow-300"
                            >
                              In Progress
                            </Badge>
                          )}
                          {cert.type === "workshop" && (
                            <Badge variant="outline" className="text-xs">
                              Workshop
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 min-h-[60px]">
                        {cert.description}
                      </p>

                      {/* Skills */}
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

                      {/* Footer with Button - Fixed Spacing */}
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

                      {/* Progress Bar for Ongoing */}
                      {cert.status === "ongoing" && cert.progress && (
                        <div className="mt-4 pt-3 border-t">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{cert.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                              style={{ width: `${cert.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="contact" className="scroll-mt-16">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Interested in working together or have a question? Feel free to
                reach out via{" "}
                <a
                  href="mailto:pankaj9129@gmail.com"
                  className="text-orange-700 font-bold underline underline-offset-4 hover:opacity-80"
                >
                  email
                </a>{" "}
                or connect on{" "}
                <a
                  href="https://www.linkedin.com/in/pankaj-verma-8a99a723a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-700 font-bold underline underline-offset-4 hover:opacity-80"
                >
                  LinkedIn
                </a>
                .
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
