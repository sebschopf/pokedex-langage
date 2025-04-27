export interface CategoryTitleProps {
  title: string;
  description?: string; // Ajout de la prop description comme optionnelle
}

export function CategoryTitle({ title, description }: CategoryTitleProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold border-b-2 border-black pb-2">{title}</h2>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
    </div>
  );
}
