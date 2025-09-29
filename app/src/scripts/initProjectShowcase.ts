import EmblaCarousel from 'embla-carousel';
import type { EmblaOptionsType } from 'embla-carousel';

type HighlightColor = 'blue' | 'pink';

type ColorClassConfig = {
  border: string;
};

const colorClasses: Record<HighlightColor, ColorClassConfig> = {
  blue: {
    border: 'border-accent-primary-strong'
  },
  pink: {
    border: 'border-accent-secondary'
  }
};

const INACTIVE_THUMB_CLASSES = [
  'shadow-none',
  'md:shadow-[0_6px_18px_rgba(15,23,42,0.12)]',
  'translate-y-0',
  'border-[color:rgb(var(--rgb-surface-overlay)/0.6)]'
] as const;

const ACTIVE_THUMB_CLASSES = [
  'shadow-none',
  'md:shadow-[0_16px_32px_rgba(15,23,42,0.18)]',
  'translate-y-0',
  'md:-translate-y-1'
] as const;

const initShowcase = (container: HTMLElement) => {
  if (container.dataset.emblaInitialized === 'true') {
    return;
  }

  const highlightColor = (container.dataset.highlightColor as HighlightColor) ?? 'blue';
  const colors = colorClasses[highlightColor] ?? colorClasses.blue;

  const mainViewport = container.querySelector<HTMLElement>('.embla__viewport');
  const thumbsViewport = container.querySelector<HTMLElement>('.embla__thumbs__viewport');
  const prevBtn = container.querySelector<HTMLButtonElement>('.embla__prev');
  const nextBtn = container.querySelector<HTMLButtonElement>('.embla__next');

  if (!mainViewport || !thumbsViewport) {
    container.dataset.emblaInitialized = 'true';
    return;
  }

  const thumbSlides = Array.from(thumbsViewport.querySelectorAll<HTMLElement>('.embla__thumbs__slide'));
  if (!thumbSlides.length) {
    container.dataset.emblaInitialized = 'true';
    return;
  }

  const mainOptions: EmblaOptionsType = { loop: true };
  const thumbsOptions: EmblaOptionsType = {
    containScroll: 'keepSnaps',
    dragFree: true,
    slidesToScroll: 1,
    align: 'start',
    breakpoints: {
      '(min-width: 768px)': { active: false }
    }
  };

  const emblaApi = EmblaCarousel(mainViewport, mainOptions);
  const emblaThumbsApi = EmblaCarousel(thumbsViewport, thumbsOptions);

  const onThumbClick = (index: number) => {
    emblaApi.scrollTo(index);
  };

  const updateThumbs = () => {
    const selectedIndex = emblaApi.selectedScrollSnap();
    thumbSlides.forEach((slide, index) => {
      slide.classList.remove(
        colorClasses.blue.border,
        colorClasses.pink.border,
        ...ACTIVE_THUMB_CLASSES,
        ...INACTIVE_THUMB_CLASSES
      );
      slide.classList.add(...INACTIVE_THUMB_CLASSES);

      if (index === selectedIndex) {
        slide.classList.remove(...INACTIVE_THUMB_CLASSES);
        slide.classList.add(...ACTIVE_THUMB_CLASSES, colors.border);
        emblaThumbsApi.scrollTo(index);
      }
    });
  };

  thumbSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => onThumbClick(index), false);
  });

  if (prevBtn && nextBtn) {
    const handlePrev = () => emblaApi.scrollPrev();
    const handleNext = () => emblaApi.scrollNext();
    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);
  }

  const toggleButtonVisibility = () => {
    if (!prevBtn || !nextBtn) {
      return;
    }
    const shouldHide = emblaApi.slideNodes().length <= 1;
    prevBtn.classList.toggle('hidden', shouldHide);
    nextBtn.classList.toggle('hidden', shouldHide);
  };

  const updateButtonStates = () => {
    if (!prevBtn || !nextBtn) {
      return;
    }
    prevBtn.disabled = !emblaApi.canScrollPrev();
    nextBtn.disabled = !emblaApi.canScrollNext();
  };

  const syncLayoutHeights = () => {
    const descriptionWrappers = container.querySelectorAll<HTMLElement>('.description-wrapper');
    let maxHeight = 0;

    descriptionWrappers.forEach((wrapper) => {
      wrapper.style.minHeight = 'auto';
      maxHeight = Math.max(maxHeight, wrapper.offsetHeight);
    });

    descriptionWrappers.forEach((wrapper) => {
      wrapper.style.minHeight = `${maxHeight}px`;
    });
  };

  const onSelect = () => {
    updateThumbs();
    updateButtonStates();
  };

  emblaApi.on('select', onSelect);
  emblaApi.on('reInit', onSelect);

  emblaThumbsApi.on('reInit', updateThumbs);

  const onResize = () => {
    syncLayoutHeights();
    // Re-initialize to apply or remove the breakpoint config
    emblaThumbsApi.reInit();
    toggleButtonVisibility();
  };

  updateThumbs();
  updateButtonStates();
  syncLayoutHeights();
  toggleButtonVisibility();

  let resizeTimeout: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(onResize, 150);
  });

  container.dataset.emblaInitialized = 'true';
};

const initAll = () => {
  const containers = document.querySelectorAll<HTMLElement>('[data-project-showcase]');
  containers.forEach(initShowcase);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll, { once: true });
} else {
  initAll();
}
