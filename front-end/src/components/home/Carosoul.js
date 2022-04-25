import {useRef,useState} from 'react'

import sliderImage1 from "../../images/slider-image-1.jpg";
import sliderImage2 from "../../images/slider-image-2.jpg";
import sliderImage3 from "../../images/slider-image-3.jpg";
import sliderImage4 from "../../images/slider-image-4.jpg";
import sliderImage5 from "../../images/slider-image-5.svg";

function Carosoul() {
    const reference = useRef('')
    const [sliderControl,setSliderControl]=useState(1);

    const handlePrevious = () =>{
        if(sliderControl === 1){ setSliderControl(()=> 5)}
        else{setSliderControl(sliderControl=>sliderControl-1)}
        console.log('slidedata ' + sliderControl);
        console.log(reference);
    }
    const  handleNext = () =>{
        if(sliderControl === 5){ setSliderControl(()=> 1)}
        else{setSliderControl(sliderControl=>sliderControl+1)}
        console.log('slidedata ' + sliderControl);
        console.log(reference);
    }
    const handleButton = (value) =>{
        setSliderControl(value)
    }

  return (
    <div id="indicators-carousel" className="relative" data-carousel="static">
        
        <div className="overflow-hidden relative h-80 sm:h-90 xl:h-80 2xl:h-96">
            {
                [sliderImage1,sliderImage2,sliderImage3,sliderImage4,sliderImage5].map((imageUrl,index)=>{
                    return(
                    <div key={index} name='sliderImage1' className={ `${sliderControl === index+1 ? '':'hidden'} duration-150 ease-in-out`} data-carousel-item="active">
                        {sliderControl === index+1 ? 
                            
                            <img src={imageUrl} className="block items-center absolute top-1/2 left-1/2 w-full  duration-400 -translate-x-1/2 -translate-y-1/2 opacity-90 " alt="..."/> 
                            :
                            setSliderControl > index+1 ?
                                <img src={imageUrl} className="block items-center absolute top-1/2 -left-1/2 w-full duration-400 -translate-x-1/2 -translate-y-1/2 opacity-90" alt="..."/> 
                                :
                                <img src={imageUrl} className="block items-center absolute top-1/2 left-1 w-full duration-400 -translate-x-1/2 -translate-y-1/2 opacity-90" alt="..."/> 
                                
                        }
                    </div>
                    )
                })
            }
        </div>
        
        <div className=" flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
            <button onClick={()=>{handleButton(1)}} type="button" className="bg-purple-700 opacity-70 w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
            <button onClick={()=>{handleButton(2)}} type="button" className="bg-purple-700 opacity-70 w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
            <button onClick={()=>{handleButton(3)}} type="button" className="bg-purple-700 opacity-70 w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
            <button onClick={()=>{handleButton(4)}} type="button" className="bg-purple-700 opacity-70 w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
            <button onClick={()=>{handleButton(5)}} type="button" className="bg-purple-700 opacity-70 w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
        </div>
        
        <button onClick={handlePrevious} type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                <span className="hidden" >Previous</span>
            </span>
        </button>
        <button onClick={handleNext} type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                <span className="hidden" >Next</span>
            </span>
        </button>
    </div>
  )
}

export default Carosoul