"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { getTranslations, detectBrowserLocale, type Locale } from "@/lib/i18n"
import { parseBoldText } from "@/lib/utils"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ProjectSlider } from "@/components/project-slider"
import { ParticleBackground } from "@/components/particle-background"
import { SkillCard } from "@/components/skill-card"

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const [locale, setLocale] = useState<Locale>(detectBrowserLocale())
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const t = getTranslations(locale)

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const navSections = ["intro", "experience", "education", "skills", "projects", "publications", "connect"]

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleBackground />

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {navSections.map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 relative z-[1]">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">{t.hero.subtitle}</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  {t.hero.name}
                  <br />
                  <span className="text-muted-foreground">{t.hero.surname}</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {parseBoldText(t.hero.description).map((part) =>
                    part.type === "bold" ? (
                      <span key={part.key} className="text-foreground">
                        {part.content}
                      </span>
                    ) : (
                      <span key={part.key}>{part.content}</span>
                    )
                  )}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {t.hero.availability}
                  </div>
                  <div>{t.hero.location}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">{t.hero.currently}</div>
                <div className="space-y-2">
                  <div className="text-foreground">{t.hero.currentRole}</div>
                  <div className="text-muted-foreground">{t.hero.currentCompany}</div>
                  <div className="text-xs text-muted-foreground">{t.hero.currentPeriod}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">{t.hero.focus}</div>
                <div className="flex flex-wrap gap-2">
                  {t.hero.focusSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="py-20 sm:py-32">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-light mb-8">{t.about.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.about.content}</p>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">{t.experience.title}</h2>
              <div className="text-sm text-muted-foreground font-mono">{t.experience.period}</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {t.experience.jobs.map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-3">
                    <div className="text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors duration-500">
                      {job.period}
                    </div>
                  </div>

                  <div className="lg:col-span-9 space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                      <div className="text-sm text-muted-foreground">{job.location}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" ref={(el) => (sectionsRef.current[2] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">{t.education.title}</h2>

            <div className="space-y-8">
              {t.education.items.map((item, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-3">
                    <div className="text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors duration-500">
                      {item.period}
                    </div>
                  </div>

                  <div className="lg:col-span-9 space-y-2">
                    <h3 className="text-lg sm:text-xl font-medium">{item.degree}</h3>
                    <div className="text-muted-foreground">{item.institution}</div>
                    <div className="text-sm text-muted-foreground">{item.location}</div>
                    {item.thesis && <p className="text-sm text-muted-foreground leading-relaxed pt-2">{item.thesis}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" ref={(el) => (sectionsRef.current[3] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">{t.skills.title}</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {t.skills.items.map((skill, index) => (
                <SkillCard key={index} name={skill.name} description={skill.description} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => (sectionsRef.current[4] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">{t.projects.title}</h2>
            <ProjectSlider projects={t.projects.items} />
          </div>
        </section>

        <section id="publications" ref={(el) => (sectionsRef.current[5] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">{t.publications.title}</h2>

            <div className="space-y-8">
              {t.publications.items.map((pub, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
                >
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground font-mono">{pub.year}</div>
                    <h3 className="text-lg sm:text-xl font-medium leading-relaxed">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground">{pub.authors}</p>
                    <p className="text-sm text-muted-foreground italic">{pub.journal}</p>
                    {pub.doi && (
                      <Link
                        href={pub.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        <span>DOI</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    )}
                    {pub.pmid && <p className="text-sm text-muted-foreground">PMID: {pub.pmid}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">{t.conferences.title}</h2>

            <div className="space-y-6">
              {t.conferences.items.map((conf, index) => (
                <div
                  key={index}
                  className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
                >
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <h3 className="text-lg font-medium">{conf.name}</h3>
                      <div className="text-sm text-muted-foreground font-mono">{conf.date}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{conf.location}</div>
                    {conf.presentation && (
                      <p className="text-sm text-muted-foreground leading-relaxed pt-2">{conf.presentation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">{t.languages.title}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.languages.items.map((lang, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <div className="text-foreground">{lang.name}</div>
                    <div className="text-sm text-muted-foreground">{lang.level}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[6] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">{t.contact.title}</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{t.contact.description}</p>

                <div className="space-y-4">
                  <Link
                    href="mailto:bgorobejko@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">bgorobejko@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-base"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">{t.contact.elsewhere}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "", url: "https://github.com/efedleikudl" },
                  { name: "ORCID", handle: "", url: "https://orcid.org/0009-0006-6531-8767" },
                  { name: "LinkedIn", handle: "", url: "https://linkedin.com/in/borys-gorobeyko-b24ab7279"},
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Borys Gorobeyko. {t.footer.rights}.</div>
              <div className="text-xs text-muted-foreground">{t.footer.builtWith}</div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
