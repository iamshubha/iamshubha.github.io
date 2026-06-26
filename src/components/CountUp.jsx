import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion, useInView } from "../lib/hooks.js";

// Splits "50%" -> {prefix:"", number:50, suffix:"%", decimals:0}
// "$5M+" -> {prefix:"$", number:5, suffix:"M+"}, "99.99%" -> decimals:2
function parseValue(raw) {
  const text = String(raw ?? "");
  const match = text.match(/^(\D*?)([\d][\d,]*(?:\.\d+)?)(.*)$/s);

  if (!match) {
    return { prefix: "", number: null, suffix: text, decimals: 0 };
  }

  const [, prefix, digits, suffix] = match;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;

  return {
    prefix,
    number: Number(digits.replace(/,/g, "")),
    suffix,
    decimals
  };
}

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({ value, duration = 1500 }) {
  const { prefix, number, suffix, decimals } = parseValue(value);
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [display, setDisplay] = useState(number === null ? null : 0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (number === null || !inView) {
      return undefined;
    }

    if (prefersReducedMotion()) {
      setDisplay(number);
      return undefined;
    }

    let start;
    const step = (timestamp) => {
      if (start === undefined) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(number * easeOutExpo(progress));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(number);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameRef.current);
  }, [number, inView, duration]);

  // Non-numeric values render as-is.
  if (number === null) {
    return <span ref={ref}>{suffix}</span>;
  }

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
