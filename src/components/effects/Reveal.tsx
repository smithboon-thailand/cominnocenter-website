"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /**
   * แท็กที่จะ render — **ต้องตั้งเมื่ออยู่ในที่ที่ `<div>` ผิดโครงสร้าง**
   *
   * ลูกโดยตรงของ `<ul>`/`<ol>` ต้องเป็น `<li>` เท่านั้น ถ้าปล่อยเป็น div
   * จะได้ `<ol><div><li>` ซึ่งเครื่องอ่านหน้าจอจะไม่ประกาศว่าเป็นรายการอีกต่อไป
   * และผู้ใช้จะไม่รู้ว่ามีกี่ข้อ · ใช้ `as="section"` เมื่อแทนที่ section เดิม
   * เพื่อไม่ให้เสียโครงร่างหัวข้อของหน้าไปด้วย
   */
  as?: "div" | "li" | "section" | "article";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass =
    direction === "up"
      ? "translate-y-8"
      : direction === "down"
        ? "-translate-y-8"
        : direction === "left"
          ? "translate-x-8"
          : direction === "right"
            ? "-translate-x-8"
            : "";

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement>}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${className} ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${dirClass}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
