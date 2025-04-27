'use client';

import { ToolCard } from '@/components/tool-card';
import type { Library } from '@/types/models/library';

interface ToolWithLanguages extends Library {
  languages?: Array<{
    id: number;
    name: string;
    slug: string;
    isPrimary: boolean;
    logo_path?: string | null;
  }>;
}

interface ToolGridProps {
  tools: ToolWithLanguages[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
