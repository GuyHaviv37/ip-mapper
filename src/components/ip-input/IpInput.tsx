import { useIpInputClock } from "./useIpInputClock";

interface IpInputProps {
    index: number
}

export default function IpInput(props: IpInputProps) {
    const { index } = props
    const countryCode = 'il';
    const {time} = useIpInputClock({ timeZone: 'Asia/Jerusalem' });

    return (
        <div className="grid grid-cols-[50px_250px_40px_100px] gap-4">
            <p className="p-2 rounded-xl">{index + 1}</p>
            <input type="text" className="w-full p-2 rounded-md border border-gray-300" placeholder="Enter IP address" />
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

            <p className="p-2 rounded-xl">{time}</p>
        </div>
    )
}