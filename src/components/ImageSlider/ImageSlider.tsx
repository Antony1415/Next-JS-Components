'use client'
import React, { useEffect, useState } from 'react'
import { Beach, City, Forest, MoraineLake, Town } from './Images'
import { StaticImageData } from 'next/image'
import styles from './ImageSlide.module.css'

const dummyImages: StaticImageData[] = [Beach, City, Forest, MoraineLake, Town]

interface ImageSliderProps {
    images?: StaticImageData[],
    autoSlide?: boolean,
}

const ImageSlider = ({ images = dummyImages, autoSlide = true }: ImageSliderProps): React.JSX.Element => {
    const [currentImage, setCurrentImage] = useState<number>(0)

    const showNextImage = () => {
        setCurrentImage((index) => {
            if (index === (images.length - 1)) return 0
            return index + 1
        })
    }

    const showPrevImage = () => {
        setCurrentImage((index) => {
            if (index === 0) return (images.length - 1)
            return index - 1
        })
    }

    useEffect(() => {
        if (autoSlide) {
            const automaticSlide = setTimeout(() => {
                showNextImage()
            }, 2000)

            return () => clearTimeout(automaticSlide)
        }
    }, [currentImage])

    return (
        <div className='relative w-full h-full'>
            <button className={styles.ImageSlide_button} onClick={showPrevImage}>{'<'}</button>
            <button className={`${styles.ImageSlide_button} right-0`} onClick={showNextImage}>{'>'}</button>

            <div className='flex h-full w-full overflow-hidden'>
                {images.map((image) => {
                    return (
                        <img
                            className={styles.ImageSlide_image}
                            src={image.src}
                            style={{ translate: `${-100 * currentImage}%` }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ImageSlider