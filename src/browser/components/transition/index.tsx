import { motion as m, useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { AnimatedLogo } from "../animated-logo";
import sidebarImage from "./images/sidebar.svg";
import "./transition.scss";

export const SceneTransition: React.FC<{ color: string }> = ({ color }) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAnimating(true);

    const controls = animate([
      [
        scope.current,
        { clipPath: "inset(0px 100% 0px 0%)" },
        {
          at: 0,
          duration: 0,
        },
      ],
      [
        scope.current,
        { clipPath: "inset(0px 0% 0px 0%)" },
        {
          duration: 0.5,
          ease: "circOut",
        },
      ],
      [
        scope.current,
        { clipPath: "inset(0px 0% 0px 100%)" },
        {
          delay: 1,
          duration: 0.5,
          ease: "circIn",
        },
      ],
    ]);

    controls.then(() => {
      setIsAnimating(false);
    });

    return () => controls.cancel();
  }, [animate, scope, color]);

  return (
    <>
      <div className="absolute w-[1920px] h-[1080px] z-10">
        <m.div
          ref={scope}
          initial={{ clipPath: "inset(0px 100% 0px 0%)" }}
          className="absolute inset-0 bg-current flex items-center justify-center"
          animate={{ color: color }}
        >
          <AnimatedLogo isAnimating={isAnimating} color={color} />
        </m.div>

        <m.div
          className="absolute left-0 inset-y-0 w-[100px] bg-current"
          animate={{ color: color }}
          transition={{ duration: 0.3 }}
        >
          <m.div
            className="absolute inset-0 bg-current filter invert sidebar__pattern"
            animate={{ color: color }}
            transition={{ duration: 0.3 }}
            style={{ mask: `url(${sidebarImage}) center repeat-y` }}
          ></m.div>
        </m.div>
      </div>
    </>
  );
};
