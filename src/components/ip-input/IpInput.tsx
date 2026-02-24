import { useRef } from "react";
import { useIpInputClock } from "./useIpInputClock";
import { useIpLookup } from "./useIpLookup";

interface IpInputProps {
    index: number
}

export default function IpInput(props: IpInputProps) {
    const { index } = props
    const inputRef = useRef<HTMLInputElement>(null);
    const { lookup, clearError, countryCode, timeZone, isLoading, error } = useIpLookup();
    const { time } = useIpInputClock({ utcOffset: timeZone });

    return (
        <div className="grid grid-cols-[50px_250px_40px_100px] gap-4 items-start">
            <p className="p-2 rounded-xl">{index + 1}</p>
            <div>
                <input
                    ref={inputRef}
                    type="text"
                    className={`w-full p-2 rounded-md border ${error ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter IP address"
                    onBlur={() => lookup(inputRef.current?.value ?? '')}
                    disabled={isLoading}
                    onChange={clearError}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {isLoading && (
                <div role="status" className="p-2 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                </div>
            )}

            {countryCode && !isLoading && (
                <picture>
                    <source
                        type="image/webp"
                        srcSet={`https://flagcdn.com/w20/${countryCode}.webp,
                        https://flagcdn.com/w40/${countryCode}.webp 2x`}/>
                    <source
                        type="image/png"
                        srcSet={`https://flagcdn.com/w20/${countryCode}.png,
                        https://flagcdn.com/w40/${countryCode}.png 2x`}/>
                    <img
                        src={`https://flagcdn.com/w40/${countryCode}.png`}
                        width="40"
                        alt={countryCode} />
                </picture>
            )}

            <p className="p-2 rounded-xl">{time}</p>
        </div>
    )
}
