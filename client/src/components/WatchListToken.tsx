type WatchListTokenProps = {
  tokenName: string;
  balance: string;
}

export const WatchListToken = (props : WatchListTokenProps) => {
  return (
    <div>
      <div className="flex items-center gap-4 bg-[#1C1D22] px-4 min-h-[72px] py-2">
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit" ></div>
        <div className="flex flex-col justify-center">
          <p className="text-[#F9FAFA] text-base font-medium leading-normal line-clamp-1">{props.tokenName}</p>
          <p className="text-[#D5D6DD] text-sm font-normal leading-normal line-clamp-2">{props.balance}</p>
        </div>
      </div>
    </div>
  )
}
