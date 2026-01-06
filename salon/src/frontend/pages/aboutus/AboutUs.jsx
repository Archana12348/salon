import React, { useEffect, useRef } from "react";

const AboutUs = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    const createSparkle = (x, y) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x,
          y,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 4,
          speedY: (Math.random() - 0.5) * 4,
          life: 30,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 236, 186, ${p.life / 30})`; // golden glitter
        ctx.fill();

        if (p.life <= 0) particles.splice(index, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      createSparkle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden font-[Poppins]">
      {/* Sparkle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none z-10"
      />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-5 py-24 text-center">
        <h1
          className="text-5xl  mb-6 text-[#e7a509] drop-shadow-[0_0_15px_#956D13]"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          About Our Salon
        </h1>

        <p
          className="text-lg leading-8 mb-5 text-black"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          Welcome to our luxury salon, where beauty meets elegance. We believe
          in enhancing your natural glow with expert care, premium products, and
          a touch of glamour.
        </p>

        <p
          className="text-lg leading-8 text-black"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          From stunning makeovers to relaxing spa experiences, our professional
          team ensures you feel confident, beautiful, and refreshed every time
          you visit us.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
