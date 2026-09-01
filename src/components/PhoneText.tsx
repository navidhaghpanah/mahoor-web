export default function PhoneText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <bdi dir="ltr" className={`phone-ltr ${className}`.trim()}>
      {children}
    </bdi>
  );
}

export function NasimMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1 whitespace-nowrap ${className}`.trim()}>
      <span>نسیم</span>
      <span dir="ltr" className="phone-ltr inline-block">
        ۶۹/۱
      </span>
    </span>
  );
}
