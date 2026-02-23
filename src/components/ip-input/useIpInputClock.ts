import { useState, useRef, useEffect } from "react";

export const useIpInputClock = (props: { timeZone: string }) => {
    const {timeZone} = props;
    const [time, setTime] = useState<string>();
    const interval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!timeZone) return;
        
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone,
            timeStyle: "medium",
            hour12: false,
        });
        interval.current = setInterval(() => {
            setTime(formatter.format(new Date()));
        }, 250);
        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [timeZone]);

    return {
        time
    }
}