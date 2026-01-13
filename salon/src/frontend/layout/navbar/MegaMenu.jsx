import { Link } from "react-router-dom";
export default function MegaMenu({ onMouseEnter, onMouseLeave, categories }) {
  if (!categories.length) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="
        absolute left-1/2 top-full -translate-x-1/2 mt-2
        w-[95vw] max-w-7xl
        bg-white shadow-2xl
        rounded-xl z-[1000]
      "
    >
      <div
        className="
        px-10 py-8
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
        gap-x-10 gap-y-8
      "
      >
        {categories.map((cat, index) => (
          <MenuColumn
            key={cat.id}
            category={cat}
            showDivider={index !== categories.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

/* ================= COLUMN ================= */

function MenuColumn({ category }) {
  const { name, slug, sub_categories } = category;

  return (
    <div className="relative">
      {/* CATEGORY TITLE */}
      <Link
        to={`/service/${slug}`}
        className="
          block mb-4
          text-sm font-semibold uppercase tracking-wider
          text-gray-900 hover:text-[#00CED1]
        "
      >
        {name}
      </Link>

      {/* SUB CATEGORIES */}
      <ul className="space-y-2">
        {sub_categories?.length > 0 ? (
          sub_categories.map((sub) => (
            <li key={sub.id}>
              <Link
                to={`/service/${slug}?subcategory=${sub.slug}`}
                className="
                  text-sm text-gray-600 
                  transition-colors duration-200
                  hover:text-[#00CED1]
                "
              >
                {sub.name}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-xs  text-gray-400">Coming soon</li>
        )}
      </ul>
    </div>
  );
}
