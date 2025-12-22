import { Calendar, Globe, Diamond } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Pre Booking",
      icon: Calendar,
    },
    {
      title: "Online Booking",
      icon: Globe,
    },
    {
      title: "Luxury Service",
      icon: Diamond,
    },
  ];

  return (
    <div
      className="w-full py-12 bg-[#00CED1]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url('/bbbb.jpeg')",
      }}
    >
      <div
        className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-start md:items-center gap-3"
            >
              {/* ICON + TEXT */}
              <div className="flex items-center gap-4">
                {/* ICON */}
                <div className="w-12 h-12 rounded-full bg-[#00CED1]/20 flex items-center justify-center">
                  <Icon className="text-black" size={34} />
                </div>

                {/* TEXT */}
                <h3
                  className="text-xl sm:text-xl lg:text-2xl font-semibold text-black"
                  style={{ fontFamily: "var(--font-heading--family)" }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
