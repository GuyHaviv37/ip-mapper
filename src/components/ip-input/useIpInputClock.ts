import { useState, useRef, useEffect } from "react";

function parseUtcOffset(offset: string): number | null {
    const match = offset.match(/^([+-])(\d{2}):(\d{2})$/);
    if (!match) return null;
    const sign = match[1] === "+" ? 1 : -1;
    return sign * (parseInt(match[2]) * 60 + parseInt(match[3]));
}

export const useIpInputClock = (props: { utcOffset: string | null }) => {
    const { utcOffset } = props;
    const [time, setTime] = useState<string>();
    const interval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!utcOffset) return;

        const offsetMinutes = parseUtcOffset(utcOffset);
        if (offsetMinutes == null) return;

        const offsetMs = offsetMinutes * 60_000;
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "UTC",
            timeStyle: "medium",
            hour12: false,
        });

        interval.current = setInterval(() => {
            // Date.now() returns the number of ms since the Unix epoch, in UTC time (zero offset).
            const shifted = new Date(Date.now() + offsetMs);
            setTime(formatter.format(shifted));
        }, 250);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [utcOffset]);

    return {
        time,
    };
};