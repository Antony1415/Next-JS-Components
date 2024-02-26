'use client'
import React, { useEffect, useRef } from 'react'

interface InfiniteScrollProps {
    className?: string;
    data: [];
    callback?: () => void
}

const InfiniteScroll = ({ className, data, callback }: InfiniteScrollProps): React.JSX.Element => {
    const lastElementRef = useRef(null)

    useEffect(() => {
        if (lastElementRef.current) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    callback && callback()
                }
            }, {
                // threshold will trigger IntersectionObserver and make intersecting to true.
                // threshold value is between 0 to 1. example it can be 0 or 0.5 or 1.
                // threshold: 1 --> 100% element shown/visible or while entirely element visible on the screen
                // threshold: 0 --> as soon as the element shown/visible on the screen
                // threshold: 1,

                // the margin of the root/element to trigger IntersectionObserver.
                // if positive same as add more height to element, & if negative same as add padding to element
                rootMargin: '250px',

                // root is the element that effect this function. default root is Body/null
                // example root is CardContainer. And every scroll or visible children in CardContainer wiill trigger this func
                // root: null,
            })
            observer.observe((lastElementRef.current as unknown) as Element)

            return () => observer.disconnect()
        }
    }, [data])

    return (
        <div className={`${className} grid grid-cols-3 gap-x-5 gap-y-5`}>
            {data.map((product: any, index) => {
                if (data.length - 1 === index) {
                    return (
                        <div ref={lastElementRef} className='rounded-[5px] bg-slate-50 flex flex-col px-5 py-2 items-center gap-2'>
                            <img className='w-[300px] h-[250px]' src={product.images[0]} />
                            <h1>{product.title}</h1>
                            <p>{product.description}</p>
                        </div>
                    )
                }
                return (
                    <div className='rounded-[5px] bg-slate-50 flex flex-col px-5 py-2 items-center gap-2'>
                        <img className='w-[300px] h-[250px]' src={product.images[0]} />
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default InfiniteScroll