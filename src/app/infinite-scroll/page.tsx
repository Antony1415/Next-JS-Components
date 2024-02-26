'use client'
import { InfiniteScroll } from '@/components'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [product, setProduct] = useState<any>([])
    const [pageNumber, setPageNumber] = useState(0)
    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=10&skip=${10 * pageNumber}`)
            .then(res => res.json())
            .then(data => setProduct((prev: any) => [...prev, ...data.products]));
    }, [pageNumber])

    return (
        <div className='h-fit'>
            <h1>Infinite Scroll</h1>
            <h3>Show more product/list while user/client scroll to certain.</h3>

            <div className='flex mt-5 w-full h-full px-[100px] bg-red-500'>
                <InfiniteScroll
                    className='bg-red-300 h-full w-full'
                    data={product}
                    callback={() => setPageNumber(prev => prev + 1)}
                />
            </div>
        </div>
    )
}

export default page