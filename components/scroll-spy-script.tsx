import type { PortfolioContent } from "@/lib/portfolio"

interface ScrollSpyScriptProps {
  items: PortfolioContent["navigation"]
}

export function ScrollSpyScript({ items }: ScrollSpyScriptProps) {
  const sectionIds = JSON.stringify(items.map(({ id }) => id))
  const source = `
    (() => {
      const cleanupKey = "__portfolioScrollSpyCleanup";
      window[cleanupKey]?.();

      const sectionIds = ${sectionIds};
      let frame = 0;
      let observer = null;

      const update = () => {
        frame = 0;
        const sections = sectionIds
          .map((id) => document.getElementById(id))
          .filter(Boolean);

        if (sections.length === 0) return;

        const activationLine = window.innerHeight * 0.34;
        const pageHeight = document.documentElement.scrollHeight;
        const atPageEnd =
          window.scrollY > 0 &&
          Math.ceil(window.scrollY + window.innerHeight) >= pageHeight - 2;
        let activeSection = sections[0];

        if (atPageEnd) {
          activeSection = sections[sections.length - 1];
        } else {
          for (const section of sections) {
            if (section.getBoundingClientRect().top > activationLine) break;
            activeSection = section;
          }
        }

        const activeIndex = sectionIds.indexOf(activeSection.id);
        document.querySelectorAll(
          '.side-navigation a[href^="#"], .mobile-dialog a[href^="#"]'
        ).forEach((link) => {
          if (link.getAttribute("href") === "#" + activeSection.id) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });

        const navigation = document.querySelector(".side-navigation");
        if (navigation) {
          navigation.dataset.activeSection = activeSection.id;
          navigation.style.setProperty("--active-index", String(activeIndex));
        }
      };

      const schedule = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(update);
      };

      const start = () => {
        document.addEventListener("scroll", schedule, { capture: true, passive: true });
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("wheel", schedule, { passive: true });
        window.addEventListener("touchmove", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        window.addEventListener("hashchange", schedule);
        window.addEventListener("pageshow", schedule);

        if ("IntersectionObserver" in window) {
          try {
            observer = new IntersectionObserver(schedule, {
              rootMargin: "-34% 0px -65%",
              threshold: 0,
            });
            sectionIds.forEach((id) => {
              const section = document.getElementById(id);
              if (section) observer.observe(section);
            });
          } catch {
            observer = null;
          }
        }

        schedule();
      };

      window[cleanupKey] = () => {
        if (frame) window.cancelAnimationFrame(frame);
        observer?.disconnect();
        document.removeEventListener("scroll", schedule, true);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("wheel", schedule);
        window.removeEventListener("touchmove", schedule);
        window.removeEventListener("resize", schedule);
        window.removeEventListener("hashchange", schedule);
        window.removeEventListener("pageshow", schedule);
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start, { once: true });
      } else {
        start();
      }
    })();
  `

  return <script id="portfolio-scroll-spy" dangerouslySetInnerHTML={{ __html: source }} />
}
