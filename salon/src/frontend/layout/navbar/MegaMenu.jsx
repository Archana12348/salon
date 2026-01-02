import { Link } from "react-router-dom";

export default function MegaMenu({ type }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[92vw] max-w-6xl bg-white text-black shadow-2xl  border border-gray-100 z-[999]">
      <div className="px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
        {type === "services" && (
          <>
            <MenuBlock
              title="Hair"
              items={["Hair Cut", "Hair Spa", "Hair Color"]}
            />
            <MenuBlock
              title="Skin"
              items={["Facial", "Clean Up", "Glow Therapy"]}
            />
            <MenuBlock
              title="Makeup"
              items={["Party Makeup", "Bridal Makeup", "Airbrush"]}
            />
            <MenuBlock
              title="Spa"
              items={["Body Massage", "Aroma Therapy", "Relax Spa"]}
            />
          </>
        )}

        {type === "products" && (
          <>
            <MenuBlock
              title="Hair Products"
              items={["Shampoo", "Conditioner", "Serum"]}
            />
            <MenuBlock
              title="Skin Care"
              items={["Face Wash", "Moisturizer", "Sunscreen"]}
            />
            <MenuBlock
              title="Makeup"
              items={["Foundation", "Lipstick", "Eyeshadow"]}
            />
            <MenuBlock
              title="Tools"
              items={["Hair Dryer", "Straightener", "Curler"]}
            />
          </>
        )}
      </div>
    </div>
  );
}

/* ===== Reusable Menu Column ===== */
function MenuBlock({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold mb-4 uppercase tracking-wide text-gray-800">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to="#"
              className="block transition-colors duration-200 hover:text-[#00CED1]"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
