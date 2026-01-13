import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const GridMotion = ({
  items = [],
  gradientColor = "white",
  className = "",
  itemClassName = "text-sky-500 opacity-25",
}) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseXRef = useRef(window.innerWidth / 2);

  const totalItems = 56;
  const defaultItems = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  );
  const combinedItems =
    items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
    >
      <section
        className="w-full h-full overflow-hidden relative flex items-center justify-center -z-10"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="gap-24 flex-none relative w-[170vw] h-[170vh] grid grid-rows-8 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
          {[...Array(8)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-32 grid-cols-6"
              style={{ willChange: "transform, filter" }}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(6)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 6 + itemIndex];
                return (
                  <div
                    key={itemIndex}
                    className="relative flex items-center justify-center"
                  >
                    <div
                      className={`relative w-full h-full flex items-center justify-center font-black text-7xl whitespace-nowrap uppercase tracking-tighter select-none ${itemClassName}`}
                    >
                      {content}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;
