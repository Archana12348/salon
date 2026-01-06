import { Instagram, Facebook, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Sophia Williams",
    role: "Creative Director",
    image: "/gallery/team.webp",
  },
  {
    name: "Emma Johnson",
    role: "Senior Hair Stylist",
    image: "/gallery/team2.webp",
  },
  {
    name: "Olivia Brown",
    role: "Makeup Artist",
    image: "/gallery/team.webp",
  },
  {
    name: "Ava Smith",
    role: "Skin Specialist",
    image: "/gallery/team2.webp",
  },
];

export default function Team() {
  return (
    <section className="bg-[#f9f9f9] py-20 px-4">
      {/* ===== Heading ===== */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2
          className="text-3xl sm:text-3xl md:text-4xl  text-center  text-black"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          Meet Our Experts
        </h2>
        <p className=" text-gray-500 text-sm md:text-base">
          A passionate team of beauty professionals dedicated to making you look
          and feel your best.
        </p>
      </div>

      {/* ===== Team Grid ===== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[340px] object-cover transform group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center gap-4 ">
                <SocialIcon Icon={Instagram} />
                <SocialIcon Icon={Facebook} />
                <SocialIcon Icon={Linkedin} />
              </div>
            </div>

            {/* Content */}
            <div className="text-center py-6">
              <h3 className="text-lg font-medium text-gray-900 tracking-wide">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===== Social Icon Component ===== */
function SocialIcon({ Icon }) {
  return (
    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#00CED1] hover:text-black transition cursor-pointer">
      <Icon size={18} />
    </div>
  );
}
