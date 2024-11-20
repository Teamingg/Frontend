'use client'
import React, {useEffect} from 'react';
import carousel from "@/data/carousel.json";

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const totalSlides = carousel.length;

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden">
            <div className="flex w-[300vw]"
                 style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
            >
                {carousel.map((item, idx) => (
                    <div className="w-[100vw]" key={idx}>{item.data}</div>
                ))}
            </div>
        </div>

    );
};

export default Carousel;