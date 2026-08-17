type StatProps = {
  /** ตัวเลข — แสดงตามที่ส่งมา (ใส่ comma/+ มาเองได้) */
  value: string | number;
  /** หน่วย เช่น "โครงการ", "คน", "%" */
  unit?: string;
  /** คำอธิบายใต้ตัวเลข */
  label?: string;
};

/**
 * Stat ตาม BRAND.md G5 (v1.2) — ตัวเลข Kanit 48/500 ink-900 · หน่วย 15/400 ink-500
 * ตัวเลขไม่แต่งสี · ตัวเลข+หน่วยผูกเป็นก้อนเดียว (ห้ามตกบรรทัด/แตกคำบนมือถือ)
 */
export default function Stat({ value, unit, label }: StatProps) {
  return (
    <div>
      <p className="text-5xl font-medium leading-tight text-ink-900">
        <span className="whitespace-nowrap">
          {value}
          {unit && (
            <span className="ml-2 text-[15px] font-normal leading-[1.6] text-ink-500">{unit}</span>
          )}
        </span>
      </p>
      {label && (
        <p className="mt-1 text-[15px] leading-[1.6] text-ink-500 [text-wrap:balance]">{label}</p>
      )}
    </div>
  );
}
