"use client";
import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Equipment from "../Equipment";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  selectedId: string | undefined;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, selectedId } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  useEffect(() => {
    if (selectedId) {
      const index = slides.findIndex((slide) => slide.id === selectedId);
      if (index !== -1) {
        emblaApi?.scrollTo(index);
      }
    }
  }, [selectedId, emblaApi, slides]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="flex flex-row items-center gap-8 h-full w-full">
      <div className="bg-white rounded-full flex items-center justify-center">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      </div>
      
      <div className="flex-1 flex flex-row">
        <section className="embla !max-w-none !m-0">
          <div className="embla__viewport h-full w-full flex items-center" ref={emblaRef}>
            <div className="embla__container flex items-center">
              {slides.map((slide) => (
                <div className="embla__slide !m-0 w-fit" key={slide.id}>
                  <div className="flex flex-row w-fit">
                    <img
                      src={slide.media.url}
                      className="rounded-xl max-h-[50%] max-w-[50%]"
                      alt=""
                    />
                    <div className="">
                      <Equipment
                        equipments={slides[selectedIndex].photoEquipments.map(
                          (pE: any) => pE.equipment
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="embla__controls">
            <div className="embla__buttons"></div>

            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : ""
                  )}
                />
              ))}
            </div>
          </div>
        </section>
        {/* <div className="h-[78vh] w-full self-center">
          {slides.length > 0 && (

          )}
        </div> */}
      </div>

      <div className="bg-white flex items-center justify-center rounded-full">
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default Carousel;
