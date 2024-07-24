"use client";
import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './CarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import Equipment from '../Equipment';

type PropType = {
  slides: any[]
  options?: EmblaOptionsType
  selectedId: string | undefined
}

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, selectedId } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  useEffect(() => {
    if (selectedId) {
      const index = slides.findIndex((slide) => slide.id === selectedId)
      if (index !== -1) {
        emblaApi?.scrollTo(index)
      }
    }
  }, [selectedId, emblaApi, slides])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div className='flex flex-row items-center gap-8 h-full'>
      <div className='bg-white rounded-full flex items-center justify-center'>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      </div>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide) => (
              <div className="embla__slide m-auto" key={slide.id}>
                <img src={slide.media.url} className='m-auto rounded-xl' alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(
                  index === selectedIndex ? ' embla__dot--selected' : ''
                )}
              />
            ))}
          </div>
        </div>
      </section>
      <div className='h-full w-full'>
        <Equipment equipments={slides[selectedIndex].photoEquipments.map((pE: any) => pE.equipment)} />
      </div>
      <div className='bg-white flex items-center justify-center rounded-full'>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}

export default Carousel
