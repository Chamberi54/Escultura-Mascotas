"use client";

// Adapted from Originkit's "Tactile Button" — https://originkit.dev
import * as React from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAnimate, useReducedMotion, type Transition } from "motion/react";

const radiusFromPercent = (w: number, h: number, pct: number) =>
  (Math.min(w, h) / 2) * (Math.max(0, Math.min(100, pct)) / 100);

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const PRESS_DOWN: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.05,
};

type Colors = {
  fill?: string;
  textColor?: string;
  hoverFill?: string;
  hoverTextColor?: string;
};

type BaseConfig = {
  color?: string;
  offsetX?: number;
  offsetY?: number;
  depth?: number;
};

export interface TactileButtonProps {
  label?: string;
  font?: React.CSSProperties;
  padding?: string;
  rounded?: number;
  colors?: Colors;
  base?: BaseConfig;
  border?: React.CSSProperties;
  transition?: Transition;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function TactileButton({
  label = "Botón",
  font,
  padding = "12px 22px",
  rounded = 100,
  colors,
  base = {},
  border,
  transition = { type: "spring", mass: 1, delay: 0, damping: 60, stiffness: 800 },
  onClick,
  style,
}: TactileButtonProps) {
  const fill = colors?.fill ?? "#1F2420";
  const textColor = colors?.textColor ?? "#F7F4EE";
  const hoverFill = colors?.hoverFill ?? fill;
  const hoverTextColor = colors?.hoverTextColor ?? textColor;

  const {
    color: baseColor = "#0097B2",
    offsetX: baseOffsetX,
    offsetY: baseOffsetY,
    depth: baseDepth = 5,
  } = base;

  const [scope, animate] = useAnimate();

  const [radiusBox, setRadiusBox] = useState({ w: 0, h: 0 });
  useIsoLayoutEffect(() => {
    const el = scope.current as HTMLElement | null;
    if (!el) return;
    const read = () =>
      setRadiusBox((prev) =>
        prev.w === el.offsetWidth && prev.h === el.offsetHeight
          ? prev
          : { w: el.offsetWidth, h: el.offsetHeight },
      );
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scope]);
  const radiusPx = radiusFromPercent(radiusBox.w, radiusBox.h, rounded);

  const capRef = useRef<HTMLButtonElement>(null);
  const hovered = useRef(false);
  const pressed = useRef(false);
  const reducedMotion = useReducedMotion();

  const fontStyles = (font ?? {}) as React.CSSProperties;

  const legacyDepth = Math.max(0, Math.round(baseDepth));
  const dx = Math.round(baseOffsetX ?? legacyDepth);
  const dy = Math.round(baseOffsetY ?? legacyDepth);

  const paint = useCallback(
    (toHover: boolean, instant: boolean) => {
      const el = capRef.current;
      if (!el) return;
      const t: Transition = instant || reducedMotion ? { duration: 0 } : transition;
      animate(
        el,
        toHover
          ? { backgroundColor: hoverFill, color: hoverTextColor }
          : { backgroundColor: fill, color: textColor },
        t,
      );
    },
    [animate, transition, reducedMotion, fill, hoverFill, textColor, hoverTextColor],
  );

  const press = useCallback(
    (down: boolean, instant: boolean) => {
      const el = capRef.current;
      if (!el) return;
      const t: Transition = instant
        ? { duration: 0 }
        : reducedMotion
          ? { duration: 0 }
          : down
            ? PRESS_DOWN
            : transition;
      animate(el, { x: down ? dx : 0, y: down ? dy : 0 }, t);
    },
    [animate, transition, reducedMotion, dx, dy],
  );

  useEffect(() => {
    paint(hovered.current, true);
  }, [paint]);

  useEffect(() => {
    press(pressed.current, true);
  }, [press]);

  const onEnter = () => {
    hovered.current = true;
    paint(true, false);
  };
  const onLeave = () => {
    hovered.current = false;
    paint(false, false);
    if (pressed.current) {
      pressed.current = false;
      press(false, false);
    }
  };
  const onDown = () => {
    pressed.current = true;
    press(true, false);
  };
  const onUp = () => {
    pressed.current = false;
    press(false, false);
  };

  useEffect(() => {
    const release = () => {
      if (!pressed.current) return;
      pressed.current = false;
      press(false, false);
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, [press]);

  return (
    <div
      style={{
        display: "inline-block",
        boxSizing: "border-box",
        paddingBottom: Math.max(0, dy),
        paddingRight: Math.max(0, dx),
        ...style,
      }}
    >
      <div
        ref={scope}
        style={{ position: "relative", display: "inline-flex", width: "100%", height: "100%" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${dx}px, ${dy}px)`,
            borderRadius: radiusPx,
            ...(border ?? {}),
            backgroundColor: baseColor,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        />
        <button
          type="button"
          ref={capRef}
          onClick={onClick}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
          onPointerDown={onDown}
          onPointerUp={onUp}
          style={{
            position: "relative",
            display: "inline-block",
            width: "100%",
            padding,
            borderRadius: radiusPx,
            ...(border ?? {}),
            backgroundColor: fill,
            cursor: "pointer",
            boxSizing: "border-box",
            userSelect: "none",
            whiteSpace: "nowrap",
            textAlign: "center",
            WebkitTapHighlightColor: "transparent",
            ...fontStyles,
            color: textColor,
          }}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
