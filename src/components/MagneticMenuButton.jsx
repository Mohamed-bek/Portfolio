import React, { useRef, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";

const MagneticButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const strength = 0.8; // Strong magnetic effect
      let deltaX = (mouseX - centerX) * strength;
      let deltaY = (mouseY - centerY) * strength;

      // Limit the movement to a certain range (e.g., 30px)
      const maxDistance = 50;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > maxDistance) {
        deltaX = (deltaX / distance) * maxDistance;
        deltaY = (deltaY / distance) * maxDistance;
      }

      button.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = "translate(0, 0) scale(1)"; // Reset to default
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className="bg-black/5 rounded-full cursor-pointer hover:bg-secondary backdrop-blur-lg transition-all duration-300 ease-out will-change-transform p-2"
      style={{ willChange: "transform" }}
    >
      <div className="duration-200 p-2">
        <IoMdMenu className="text-[1.7rem] text-white duration-500" />
      </div>
    </div>
  );
};

export default MagneticButton;
