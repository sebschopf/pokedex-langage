import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface AdminHeaderProps {
  title: string
  description?: string
  createLink?: string
  createLabel?: string
}

export function AdminHeader({ title, description, createLink, createLabel }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {createLink && createLabel && (
        <Button asChild className="mt-4 md:mt-0">
          <Link href={createLink}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {createLabel}
          </Link>
        </Button>
      )}
    </div>
  )
}
