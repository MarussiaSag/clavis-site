/** Подпись под названием проекта: тип объекта / город / год */
export function formatProjectMeta(project: {
  category: string;
  location: string;
  year: number;
}) {
  return `${project.category} / ${project.location} / ${project.year}`;
}
