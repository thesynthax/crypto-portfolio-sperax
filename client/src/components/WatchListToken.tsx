import { MouseEventHandler } from "react";

type WatchListTokenProps = {
  tokenName: string;
  tokenAddress: string;
  balance: string;
  removeToken: MouseEventHandler<HTMLButtonElement>;
}

// Each token displayed in the watchList component
export const WatchListToken = (props : WatchListTokenProps) => {
  return (
    <div>
      <div className="flex shadow-xl w-[33vw] items-center m-4 gap-4 rounded-2xl bg-gray-500 px-4 min-h-[72px] py-2">
        <div className="bg-center border bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit" ></div>
        <div className="flex flex-col justify-center">
          <p className="text-[#F9FAFA] text-base font-medium leading-normal line-clamp-1">{props.tokenName}</p>
          <p className="text-[#F9FAFA] text-base font-medium leading-normal line-clamp-1">{props.tokenAddress}</p>
          <p className="text-[#D5D6DD] text-sm font-normal leading-normal line-clamp-2">{props.balance}</p>
        </div>
        <button className="mx-auto" onClick={props.removeToken}>Remove</button>
      </div>
    </div>
  )
}
