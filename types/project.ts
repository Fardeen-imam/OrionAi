export interface ProjectSummary {
  id: string;
  title: string;
  firstPrompt: string | null;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}
