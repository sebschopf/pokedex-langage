interface CategoryTitleProps {
  title: string;
  count?: number;
  subtitle?: string;
}

export default function CategoryTitle({ title, count, subtitle }: CategoryTitleProps) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline">
        <h2 className="text-2xl font-bold">{title}</h2>
        {count !== undefined && (
          <span className="ml-3 text-lg font-medium text-gray-600 dark:text-gray-400">
            ({count})
          </span>
        )}
      </div>
      {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
