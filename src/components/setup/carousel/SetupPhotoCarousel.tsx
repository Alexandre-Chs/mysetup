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
import { deleteSetupPhoto } from "@/actions/setup-photo/delete";
import UploadSetupPicture from "../UploadSetupPicture";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  selectedId?: string;
  readonly?: boolean;
  handleClickImage?: (id: string) => void;
};

const SetupPhotoCarousel: React.FC<PropType> = (props) => {
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

  const handleDelete = async (id: string) => {
    console.log({ id });
    await deleteSetupPhoto(id);
  };

  return (
    <div className="flex flex-row min-h-[700px] h-full w-full">
      <div className="flex flex-col flex-1 gap-4 justify-between">
        <div className="h-full flex items-center">
          <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {slides.map((slide) => (
                  <div
                    className="embla__slide flex items-center relative group"
                    key={slide.id}
                  >
                    <div
                      onClick={() => handleDelete(slide.id)}
                      className="bg-red-500 size-6 rounded-full text-white absolute right-0 top-0 hidden group-hover:flex items-center justify-center cursor-pointer"
                    >
                      X
                    </div>
                    <img
                      onClick={() =>
                        props.handleClickImage &&
                        props.handleClickImage(slide.id)
                      }
                      src={slide.media.url}
                      className="rounded-xl m-auto max-w-full max-h-[600px]"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="w-full">
          <div className="embla__controls !m-0">
            <div className="embla__buttons">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
              <UploadSetupPicture />
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default SetupPhotoCarousel;
