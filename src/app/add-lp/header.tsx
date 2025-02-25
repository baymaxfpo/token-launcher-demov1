"use client"
import Image from 'next/image'
import React from 'react'

export default function DefaultLp() {
    const [tokenBalance, setTokenBalance] = React.useState(2.5);
    console.log(tokenBalance)
    const handleBalanceChange = (value: string) => {
        setTokenBalance(parseInt(value))
    }
    return (
        <div className="w-full h-full min-h-screen flex items-start pt-6 sm:pt-0 sm:items-center justify-center bg-secondary-200  sm:bg-secondary-300">
            <div className="flex flex-col max-w-[480px] w-full bg-secondary-200 rounded-xl p-6 gap-6">
                <div className='flex items-center justify-between'>
                    <div className='text-white text-2xl font-semibold'>
                        Add LP
                    </div>
                </div>
                
                <div className='w-full flex flex-col gap-1'>
                    <p className="text-sm text-secondary-400">
                        Amount
                    </p>
                    <div className='w-full relative'>
                        <input
                            type="number"
                            className="w-full rounded-xl text-sm bg-secondary-500 py-3 px-4 placeholder:text-secondary-700 text-white focus:ring-0 focus:border-0 focus:outline-none"
                            onChange={(e) => handleBalanceChange(e.target.value)}
                            value={tokenBalance}
                        />
                        <p className='absolute right-4 top-[10px] text-secondary-700'>$sol</p>
                    </div>
                </div>
                <button
                    className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                >
                    Add Liquidity
                </button>
            </div>
        </div>
    )
}
