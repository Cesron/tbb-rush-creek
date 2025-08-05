import { cn } from "@/lib/cn";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

interface TitheDifferenceMessageProps {
  difference: number;
  currencyFormat: (value: number) => string;
  className?: string;
}

const messages = {
  match: {
    text: "¡El detalle de diezmos cuadra perfectamente!",
    color: "bg-green-50 text-green-900",
    icon: <CheckCircle className="inline mr-2 h-5 w-5 text-green-600" />,
  },
  missing: {
    getText: (amount: string) => `Falta en detalle de diezmos: ${amount}`,
    color: "bg-red-50 text-red-900",
    icon: <AlertCircle className="inline mr-2 h-5 w-5 text-red-600" />,
  },
  excess: {
    getText: (amount: string) => `Excedente en detalle de diezmos: ${amount}`,
    color: "bg-yellow-50 text-yellow-900",
    icon: <Info className="inline mr-2 h-5 w-5 text-yellow-600" />,
  },
};

export function TitheDifferenceMessage({
  difference,
  currencyFormat,
  className,
}: TitheDifferenceMessageProps) {
  if (Math.abs(difference) < 0.01) {
    return null;
  }

  const isMissing = difference < 0;
  const amount = currencyFormat(Math.abs(difference));
  const content = isMissing
    ? {
        ...messages.missing,
        text: messages.missing.getText(amount),
      }
    : {
        ...messages.excess,
        text: messages.excess.getText(currencyFormat(difference)),
      };

  return (
    <div
      className={cn(
        "rounded-md px-4 py-2 font-semibold text-center flex items-center justify-center gap-2",
        content.color,
        className
      )}
      role="status"
      aria-live="polite"
    >
      {content.icon}
      <span>{content.text}</span>
    </div>
  );
}
