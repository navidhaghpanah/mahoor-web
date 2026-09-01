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
    <span className={className}>
      نسیم{" "}
      <bdi dir="ltr" className="phone-ltr">
        ۶۹/۱
      </bdi>
    </span>
  );
}
