import Link from "next/link";
import { CalendarDays, MessageSquareText, Sparkles } from "lucide-react";
import type { ProjectSummary } from "@/types/project";

interface ProjectCardProps {
  projects: ProjectSummary[];
}

export function ProjectCard({ projects }: ProjectCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/workspace?id=${project.id}`}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/8"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-blue-300">
              Workspace
            </span>
            <span className="text-[11px] text-white/25">
              {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-white/85">
            {project.title}
          </h3>

          {project.firstPrompt ? (
            <p className="mb-4 line-clamp-3 text-sm text-white/35">
              {project.firstPrompt}
            </p>
          ) : (
            <p className="mb-4 text-sm text-white/20">
              No prompt captured yet.
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-white/25">
            <span className="inline-flex items-center gap-1.5">
              <MessageSquareText className="h-3.5 w-3.5" />
              {project.messageCount} messages
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              AI app
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
