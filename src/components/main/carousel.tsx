'use client'
import React from 'react';

const Carousel = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="flex w-[300vw]">
                <div className="w-[100vw]">Slide 1</div>
                <div className="w-[100vw]">Slide 2</div>
                <div className="w-[100vw]">Slide 3</div>
            </div>
        </div>

    );
};

export default Carousel;