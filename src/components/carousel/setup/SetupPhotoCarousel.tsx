"use client";
import React, { useCallback, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./SetupCarouselDotButtons";
import { PrevButton, NextButton, usePrevNextButtons } from "./SetupCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { IoClose } from "react-icons/io5";
import { useSetupStore } from "@/store/SetupStore";
import { toast } from "sonner";
import { deleteSetupPhoto, ifPhotoAsThumbnail } from "@/app/api/setups/media/actions";
import SetupMediaTagger from "@/components/setup/tag/SetupMediaTagger";
import SetupMediaUpload from "@/components/setup/media/SetupMediaUpload";
import SetupToggleThumbnail from "@/components/setup/thumbnail/SetupToggleThumbnail";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  selectedId?: string;
  readonly?: boolean;
  isOwner: boolean;
};

const SetupPhotoCarousel: React.FC<PropType> = (props) => {
  const { slides, options, selectedId } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const setCurrentPhotoId = useSetupStore((state) => state.setCurrentPhotoId);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    const id = slides[index]?.id;
    setCurrentPhotoId(id);
  }, [emblaApi, slides, setCurrentPhotoId]);

  // S'assurer que onSelect est attaché à l'API Embla
  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", onSelect);
      onSelect();
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

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const handleDelete = async (id: string) => {
    const ifThumbnail = await ifPhotoAsThumbnail(id);
    if (ifThumbnail[0].thumbnailId === id) {
      toast.error("You can't delete the thumbnail photo");
    } else {
      await deleteSetupPhoto(id);
    }
  };

  return (
    <div className="flex flex-row h-full w-full">
      <div className="flex flex-col flex-1 justify-between">
        <div className="h-full flex items-center">
          <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container !w-auto">
                {slides.map((slide: any) => (
                  <div className="embla__slide flex items-center relative group" key={slide.id}>
                    <SetupMediaTagger photoId={slide.id} src={slide.media.url} isOwner={props.isOwner} />
                    {props.isOwner && (
                      <div
                        onClick={() => handleDelete(slide.id)}
                        className="bg-red-500 size-6 rounded-full text-white absolute right-0 top-0 hidden group-hover:flex items-center justify-center cursor-pointer">
                        <IoClose />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="w-full">
          <div className="embla__controls !m-0 px-6 pb-2">
            <div className="embla__buttons">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
              <SetupMediaUpload isOwner={props.isOwner} />
              <SetupToggleThumbnail isOwner={props.isOwner} />
            </div>

            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton key={index} onClick={() => onDotButtonClick(index)} className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPhotoCarousel;
