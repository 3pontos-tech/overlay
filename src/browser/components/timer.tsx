import { useEffect, useState } from "react";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";

export const Timer: React.FC<{ endsAt?: number; alwaysShow?: boolean }> = ({
  endsAt,
  alwaysShow,
}) => {
  const [time, setTime] = useState<{
    seconds: number;
    minutes: number;
    hours: number;
  }>({ seconds: 0, minutes: 0, hours: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(endsAt ? endsAt - Date.now() : 0, 0);

      const time = {
        seconds: Math.floor((remaining / 1000) % 60),
        minutes: Math.floor((remaining / 1000 / 60) % 60),
        hours: Math.floor((remaining / 1000 / 60 / 60) % 24),
      };

      setTime(time);
    }, 1000);

    return () => clearTimeout(interval);
  }, [endsAt]);

  if (!endsAt && !alwaysShow) {
    return;
  }

  return (
    <NumberFlowGroup>
      {time.hours > 0 ? (
        <>
          <NumberFlow
            format={{
              minimumIntegerDigits: 2,
            }}
            value={time.hours}
            suffix=":"
          />
        </>
      ) : undefined}
      <NumberFlow
        format={{
          minimumIntegerDigits: 2,
        }}
        value={time.minutes}
        suffix=":"
      />
      <NumberFlow
        format={{
          minimumIntegerDigits: 2,
        }}
        value={time.seconds}
      />
    </NumberFlowGroup>
  );
};
