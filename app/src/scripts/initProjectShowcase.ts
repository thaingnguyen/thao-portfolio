import EmblaCarousel from 'embla-carousel';

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

const initShowcase = (container: HTMLElement) => {
  if (container.dataset.emblaInitialized === 'true') {
    return;
  }

  const highlightColor = (container.dataset.highlightColor as HighlightColor) ?? 'blue';
  const colors = colorClasses[highlightColor] ?? colorClasses.blue;

  const viewport = container.querySelector<HTMLElement>('.embla__viewport');
  const previewNav = container.querySelector<HTMLElement>('[data-preview-nav]');
  const prevBtn = container.querySelector<HTMLButtonElement>('.embla__prev');
  const nextBtn = container.querySelector<HTMLButtonElement>('.embla__next');

  if (!viewport || !previewNav) {
    container.dataset.emblaInitialized = 'true';
    return;
  }

  const previewCards = Array.from(previewNav.querySelectorAll<HTMLElement>('.preview-card'));
  if (!previewCards.length) {
    container.dataset.emblaInitialized = 'true';
    return;
  }

  const emblaApi = EmblaCarousel(viewport, { loop: true });

  previewCards.forEach((card, index) => {
    card.addEventListener('click', () => emblaApi.scrollTo(index));
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

  const updatePreviewNav = () => {
    const selectedIndex = emblaApi.selectedScrollSnap();
    previewCards.forEach((card, index) => {
      card.classList.remove(
        'active-card',
        colorClasses.blue.border,
        colorClasses.pink.border,
        'bg-surface-overlay'
      );
      card.classList.add('bg-surface-alt/50', 'hover:bg-surface-elevated/50', 'border-transparent');

      if (index === selectedIndex) {
        card.classList.add('active-card', colors.border, 'bg-surface-overlay');
        card.classList.remove('hover:bg-surface-elevated/50');
      }
    });
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

  emblaApi.on('select', () => {
    updatePreviewNav();
    updateButtonStates();
  });

  emblaApi.on('reInit', () => {
    updatePreviewNav();
    updateButtonStates();
    syncLayoutHeights();
    toggleButtonVisibility();
  });

  updatePreviewNav();
  updateButtonStates();
  syncLayoutHeights();
  toggleButtonVisibility();

  let resizeTimeout: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(syncLayoutHeights, 150);
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
