import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px",
        }
      );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`h-full transform transition-all duration-700 ease-out
        ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-12 scale-[0.96] opacity-0"
        }

        ${className}
      `}
    >
      {children}
    </div>
  );
}