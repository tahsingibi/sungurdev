import { Fragment } from "react";
import { ArrowUpRight, BriefcaseBusiness, FileText } from "lucide-react";
import Link from "next/link";
import { PostMeta } from "@/components/custom/post-meta";
import { ProjectIcon } from "@/components/custom/project-icon";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import type { Project } from "@/types/settings";
import { PhotoGallery } from "./photo-gallery";

function ProjectBadge({ project }: { project: Project }) {
  return (
    <a className="inline-project" href={project.live || project.repo} target="_blank" rel="noreferrer">
      <ProjectIcon name={project.icon} logo={project.logo} size={13} />{project.name}
    </a>
  );
}

export default async function HomepageView() {
  const { home, projects, experience, social, routes, resume } = settings;
  const posts = (await getPosts()).slice(0, home.blog.limit);
  const github = social.find((link) => link.name === "github")!;
  const company = experience.find((job) => job.id === home.about.companyId)!;

  return (
    <div className="reference-home">
      <section id="about" className="reference-about">
        <h2>{home.about.heading}</h2>
        <p>
          {home.about.introduction}{" "}
          <Link className="inline-company" href={company.path}>
            <BriefcaseBusiness size={14} aria-hidden="true" />
            {company.name}
          </Link>.{" "}
          {home.about.projectsIntroduction}{" "}
          {home.about.projectIds.map((id, index, items) => (
            <Fragment key={id}>
              {index > 0 ? (index === items.length - 1 ? " and " : ", ") : null}
              <ProjectBadge project={projects[id]} />
            </Fragment>
          ))}. {home.about.closing}
        </p>
        <PhotoGallery photos={settings.gallery} />
        <p>{home.about.personal}</p>
      </section>

      <section id="contact" className="reference-contact" aria-label={home.contact.heading}>
        <div className="reference-socials">
          {social.map((link) => (
            <span className="reference-contact-item" key={link.id}>
              <a href={link.path} target={link.name === "mail" ? undefined : "_blank"} rel="noreferrer">{link.label}</a>
            </span>
          ))}
          {resume ? (
            <span className="reference-contact-item">
            <a className="reference-resume" href={resume} target="_blank" rel="noopener noreferrer" aria-label="View CV (PDF, opens in a new tab)">
              <FileText size={14} aria-hidden="true" />
              CV <span aria-hidden="true">·</span> PDF
            </a>
            </span>
          ) : null}
        </div>
      </section>

      <section id="experience" className="reference-experience">
        <h2>{home.experience.heading}</h2>
        <div>
          {experience.map((job) => (
            <Link className="reference-job" href={job.path} key={job.id}>
              <div><h3>{job.name}</h3><p>{job.title}</p></div>
              <span>{job.period}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="projects" className="reference-projects">
        <h2>{home.projects.heading}</h2>
        <div className="reference-project-grid">
          {home.projects.ids.map((id) => {
            const project = projects[id];
            return (
              <a className="reference-project-card" href={project.live || project.repo} key={id} target="_blank" rel="noreferrer">
                <div>
                  <span className="reference-project-icon"><ProjectIcon name={project.icon} logo={project.logo} /></span>
                  <h3>{project.name}</h3>
                  <ArrowUpRight size={14} className="project-external" aria-hidden="true" />
                </div>
                <p>{project.explain}</p>
                <span className="reference-project-tech">{project.tech.replaceAll(", ", " · ")}</span>
              </a>
            );
          })}
        </div>
        <a href={github.path} className="reference-more" target="_blank" rel="noreferrer">{home.projects.moreLabel}</a>
      </section>

      <section id="blog" className="reference-blog">
        <h2>{home.blog.heading}</h2>
        <div className="reference-posts">
          {posts.map((post) => (
            <Link className="reference-post" href={post.path} key={post.slug}>
              <h3>{post.title}</h3>
              <PostMeta date={post.publishDate} category={post.category} />
              <p>{post.description}</p>
            </Link>
          ))}
        </div>
        <Link href={routes.write} className="reference-more">{home.blog.moreLabel}</Link>
      </section>
    </div>
  );
}
