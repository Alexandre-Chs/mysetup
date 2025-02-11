"use client";

import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./SetupCarouselDotButtons";
import { PrevButton, NextButton, usePrevNextButtons } from "./SetupCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";

import ImageTagger from "../tag/SetupMediaTagger";
import Equipment from "../equipment/SetupEquipment";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  selectedId?: string;
};

const SetupCarousel: React.FC<PropType> = (props) => {
  const { slides, options, selectedId } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  useEffect(() => {
    if (selectedId) {
      const index = slides.findIndex((slide) => slide.id === selectedId);
      if (index !== -1) {
        emblaApi?.scrollTo(index);
      }
    }
  }, [selectedId, emblaApi, slides]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="flex flex-row h-full w-full p-8 gap-4">
      <div className="flex flex-col flex-1 gap-4">
        <div className="h-5/6 flex items-center">
          <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {slides.map((slide) => (
                  <div className="embla__slide flex items-center" key={slide.id}>
                    <ImageTagger photoId={slide.id} src={slide.media.url} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="h-1/6 w-full">
          <div className="embla__controls !m-0">
            <div className="embla__buttons">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>

            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton key={index} onClick={() => onDotButtonClick(index)} className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/6 h-full">
        <Equipment equipments={slides[selectedIndex]?.photoEquipments.map((pE: any) => pE.equipment)} />
      </div>
    </div>
  );
};

export default SetupCarousel;
