"use client";
import React, { useCallback, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { deleteSetupPhoto } from "@/actions/setup-photo/delete";
import UploadSetupPicture from "../UploadSetupPicture";
import ImageTagger from "../ImageTagger";
import ToggleThumbnail from "../ToggleThumbnail";
import { IoClose } from "react-icons/io5";
import { useSetupStore } from "@/store/SetupStore";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  selectedId?: string;
  readonly?: boolean;
};

const SetupPhotoCarousel: React.FC<PropType> = (props) => {
  const { slides, options, selectedId } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const setCurrentPhotoId = useSetupStore((state) => state.setCurrentPhotoId);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    const id = slides[index].id;
    setCurrentPhotoId(id);
  }, [emblaApi]);

  // S'assurer que onSelect est attaché à l'API Embla
  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", onSelect); // Attacher l'événement 'select'
      onSelect(); // Met à jour l'index dès l'initialisation
    }
  }, [emblaApi, onSelect]);

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
    <div className="flex flex-row h-full w-full">
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
                    <ImageTagger photoId={slide.id} src={slide.media.url} />
                    <div
                      onClick={() => handleDelete(slide.id)}
                      className="bg-red-500 size-6 rounded-full text-white absolute right-0 top-0 hidden group-hover:flex items-center justify-center cursor-pointer"
                    >
                      <IoClose />
                    </div>
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
              <ToggleThumbnail />
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
