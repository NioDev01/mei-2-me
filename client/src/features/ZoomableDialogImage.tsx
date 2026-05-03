import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

// Types 

type Point = { x: number; y: number };
type Transform = { zoom: number; offset: Point };

export type ZoomableDialogImageProps = {
  src: string;
  alt: string;
  /** Maximum zoom level (default: 4) */
  maxZoom?: number;
  /** Step used by the +/− buttons and keyboard shortcuts (default: 0.5) */
  zoomStep?: number;
};

// Constants 

const MIN_ZOOM = 1;
const DEFAULT_MAX_ZOOM = 4;
const DEFAULT_ZOOM_STEP = 0.5;
const PAN_STEP_PX = 30;

// Helpers 

function getCenteringOffset(container: HTMLElement, image: HTMLElement): Point {
  return {
    x: Math.max(0, (container.clientWidth - image.clientWidth) / 2),
    y: Math.max(0, (container.clientHeight - image.clientHeight) / 2),
  };
}

function clampOffset(
  x: number,
  y: number,
  zoom: number,
  container: HTMLElement,
  image: HTMLElement
): Point {
  const scaledW = image.clientWidth * zoom;
  const scaledH = image.clientHeight * zoom;
  const { x: cx, y: cy } = getCenteringOffset(container, image);

  const newX =
    scaledW <= container.clientWidth
      ? (image.clientWidth * (1 - zoom)) / 2
      : Math.min(-cx, Math.max(container.clientWidth - scaledW - cx, x));

  const newY =
    scaledH <= container.clientHeight
      ? (image.clientHeight * (1 - zoom)) / 2
      : Math.min(-cy, Math.max(container.clientHeight - scaledH - cy, y));

  return { x: newX, y: newY };
}

// Component 

export function ZoomableDialogImage({
  src,
  alt,
  maxZoom = DEFAULT_MAX_ZOOM,
  zoomStep = DEFAULT_ZOOM_STEP,
}: ZoomableDialogImageProps) {
  // DOM refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Transform state & shadow refs (avoid stale closures in event handlers) 
  const [transform, setTransform] = useState<Transform>({
    zoom: 1,
    offset: { x: 0, y: 0 },
  });
  const zoomRef = useRef(1);
  const offsetRef = useRef<Point>({ x: 0, y: 0 });

  // Interaction refs 
  const dragStartRef = useRef<Point | null>(null);
  const offsetStartRef = useRef<Point>({ x: 0, y: 0 });
  const activePointersRef = useRef<Map<number, Point>>(new Map());
  const pinchStartDistanceRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef(1);
  const pinchStartOffsetRef = useRef<Point>({ x: 0, y: 0 });

  // Interaction state (for cursor & transition rendering) 
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const isPinchingRef = useRef(false);

  // Derived 
  const zoomPercent = Math.round(transform.zoom * 100);
  const isAtMin = transform.zoom <= MIN_ZOOM;
  const isAtMax = transform.zoom >= maxZoom;

  // Core helpers 

  const getClampedOffset = useCallback(
    (x: number, y: number, zoom: number): Point => {
      const container = containerRef.current;
      const image = imageRef.current;
      if (!container || !image) return { x, y };
      return clampOffset(x, y, zoom, container, image);
    },
    []
  );

  /** Write both ref + state in a single update to avoid double re-renders. */
  const commitTransform = useCallback((nextZoom: number, nextOffset: Point) => {
    zoomRef.current = nextZoom;
    offsetRef.current = nextOffset;
    setTransform({ zoom: nextZoom, offset: nextOffset });
  }, []);

  const setDragging = useCallback((value: boolean) => {
    isDraggingRef.current = value;
    setIsDragging(value);
  }, []);

  // Public zoom actions (used by buttons & keyboard) 

  const applyZoom = useCallback(
    (nextZoom: number, screenOrigin?: Point) => {
      nextZoom = Math.min(maxZoom, Math.max(MIN_ZOOM, nextZoom));
      if (nextZoom === zoomRef.current) return;

      const container = containerRef.current;
      const image = imageRef.current;

      let nextOffset: Point;
      if (screenOrigin && container && image) {
        const { x: cx, y: cy } = getCenteringOffset(container, image);
        const imageX =
          (screenOrigin.x - (cx + offsetRef.current.x)) / zoomRef.current;
        const imageY =
          (screenOrigin.y - (cy + offsetRef.current.y)) / zoomRef.current;
        nextOffset = getClampedOffset(
          screenOrigin.x - imageX * nextZoom - cx,
          screenOrigin.y - imageY * nextZoom - cy,
          nextZoom
        );
      } else {
        nextOffset = getClampedOffset(
          offsetRef.current.x,
          offsetRef.current.y,
          nextZoom
        );
      }

      commitTransform(nextZoom, nextOffset);
    },
    [maxZoom, getClampedOffset, commitTransform]
  );

  const resetTransform = useCallback(() => {
    setDragging(false);
    dragStartRef.current = null;
    commitTransform(MIN_ZOOM, { x: 0, y: 0 });
  }, [setDragging, commitTransform]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();

      const factor = event.deltaY < 0 ? 1.12 : 0.88;
      const nextZoom = Math.min(
        maxZoom,
        Math.max(MIN_ZOOM, zoomRef.current * factor)
      );
      if (nextZoom === zoomRef.current) return;

      const rect = container.getBoundingClientRect();
      applyZoom(nextZoom, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [maxZoom, applyZoom]);

  // Double-click / double-tap

  const onDoubleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      if (zoomRef.current > MIN_ZOOM) {
        resetTransform();
      } else {
        const rect = container.getBoundingClientRect();
        applyZoom(2, {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    },
    [resetTransform, applyZoom]
  );

  // Pointer events

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      activePointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      const pointers = Array.from(activePointersRef.current.values());

      if (pointers.length === 2) {
        const [p1, p2] = pointers;
        pinchStartDistanceRef.current = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        pinchStartZoomRef.current = zoomRef.current;
        pinchStartOffsetRef.current = { ...offsetRef.current };
        dragStartRef.current = null;
        isPinchingRef.current = true;
        setDragging(false);
        return;
      }

      if (pointers.length === 1 && zoomRef.current > MIN_ZOOM) {
        event.preventDefault();
        dragStartRef.current = { x: event.clientX, y: event.clientY };
        offsetStartRef.current = { ...offsetRef.current };
        setDragging(true);
      }
    },
    [setDragging]
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (activePointersRef.current.has(event.pointerId)) {
        activePointersRef.current.set(event.pointerId, {
          x: event.clientX,
          y: event.clientY,
        });
      }

      const pointers = Array.from(activePointersRef.current.values());

      // Pinch-to-zoom 
      if (pointers.length === 2 && pinchStartDistanceRef.current) {
        event.preventDefault();
        const container = containerRef.current;
        const image = imageRef.current;
        if (!container || !image) return;

        const [p1, p2] = pointers;
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (!dist) return;

        const nextZoom = Math.min(
          maxZoom,
          Math.max(
            MIN_ZOOM,
            pinchStartZoomRef.current * (dist / pinchStartDistanceRef.current)
          )
        );

        const rect = container.getBoundingClientRect();
        // Pinch center in container space
        const pcx = (p1.x + p2.x) / 2 - rect.left;
        const pcy = (p1.y + p2.y) / 2 - rect.top;

        // Account for centering offset so the pinch pivot is correct
        const { x: cx, y: cy } = getCenteringOffset(container, image);
        const imageX =
          (pcx - (cx + pinchStartOffsetRef.current.x)) /
          pinchStartZoomRef.current;
        const imageY =
          (pcy - (cy + pinchStartOffsetRef.current.y)) /
          pinchStartZoomRef.current;

        const nextOffset = getClampedOffset(
          pcx - imageX * nextZoom - cx,
          pcy - imageY * nextZoom - cy,
          nextZoom
        );
        commitTransform(nextZoom, nextOffset);
        return;
      }

      // Drag to pan 
      if (!isDraggingRef.current || !dragStartRef.current) return;
      event.preventDefault();

      const next = getClampedOffset(
        offsetStartRef.current.x + (event.clientX - dragStartRef.current.x),
        offsetStartRef.current.y + (event.clientY - dragStartRef.current.y),
        zoomRef.current
      );
      commitTransform(zoomRef.current, next);
    },
    [maxZoom, getClampedOffset, commitTransform]
  );

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      activePointersRef.current.delete(event.pointerId);

      const pointers = Array.from(activePointersRef.current.values());

      if (pointers.length < 2) {
        pinchStartDistanceRef.current = null;
        isPinchingRef.current = false;
      }

      // Transition from 2-finger pinch to 1-finger drag seamlessly
      if (pointers.length === 1 && zoomRef.current > MIN_ZOOM) {
        const [p] = pointers;
        dragStartRef.current = { x: p.x, y: p.y };
        offsetStartRef.current = { ...offsetRef.current };
        setDragging(true);
        return;
      }

      setDragging(false);
      dragStartRef.current = null;
    },
    [setDragging]
  );

  // Keyboard 

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "+":
        case "=":
          event.preventDefault();
          applyZoom(zoomRef.current + zoomStep);
          break;
        case "-":
          event.preventDefault();
          applyZoom(zoomRef.current - zoomStep);
          break;
        case "0":
        case "Escape":
          event.preventDefault();
          resetTransform();
          break;
        case "ArrowLeft":
          if (zoomRef.current > MIN_ZOOM) {
            event.preventDefault();
            commitTransform(
              zoomRef.current,
              getClampedOffset(
                offsetRef.current.x + PAN_STEP_PX,
                offsetRef.current.y,
                zoomRef.current
              )
            );
          }
          break;
        case "ArrowRight":
          if (zoomRef.current > MIN_ZOOM) {
            event.preventDefault();
            commitTransform(
              zoomRef.current,
              getClampedOffset(
                offsetRef.current.x - PAN_STEP_PX,
                offsetRef.current.y,
                zoomRef.current
              )
            );
          }
          break;
        case "ArrowUp":
          if (zoomRef.current > MIN_ZOOM) {
            event.preventDefault();
            commitTransform(
              zoomRef.current,
              getClampedOffset(
                offsetRef.current.x,
                offsetRef.current.y + PAN_STEP_PX,
                zoomRef.current
              )
            );
          }
          break;
        case "ArrowDown":
          if (zoomRef.current > MIN_ZOOM) {
            event.preventDefault();
            commitTransform(
              zoomRef.current,
              getClampedOffset(
                offsetRef.current.x,
                offsetRef.current.y - PAN_STEP_PX,
                zoomRef.current
              )
            );
          }
          break;
      }
    },
    [applyZoom, resetTransform, commitTransform, getClampedOffset, zoomStep]
  );

  // Transition 
  const shouldTransition = !isDraggingRef.current && !isPinchingRef.current;

  // Cursor 
  const cursor =
    transform.zoom > MIN_ZOOM
      ? isDragging
        ? "cursor-grabbing"
        : "cursor-grab"
      : "cursor-zoom-in";

  // Render 

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2">
        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Diminuir zoom"
            disabled={isAtMin}
            onClick={() => applyZoom(zoomRef.current - zoomStep)}
            className="inline-flex h-7 w-7 items-center justify-center rounded border border-border bg-background text-sm font-medium transition-opacity hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          >
            −
          </button>

          <span
            aria-live="polite"
            aria-label={`Zoom em ${zoomPercent}%`}
            className="w-12 text-center text-sm tabular-nums text-muted-foreground"
          >
            {zoomPercent}%
          </span>

          <button
            type="button"
            aria-label="Aumentar zoom"
            disabled={isAtMax}
            onClick={() => applyZoom(zoomRef.current + zoomStep)}
            className="inline-flex h-7 w-7 items-center justify-center rounded border border-border bg-background text-sm font-medium transition-opacity hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          >
            +
          </button>
        </div>

        {/* Reset */}
        <button
          type="button"
          aria-label="Resetar zoom"
          disabled={isAtMin}
          onClick={resetTransform}
          className="text-xs text-muted-foreground underline-offset-2 transition-opacity hover:text-foreground hover:underline disabled:pointer-events-none disabled:opacity-0"
        >
          Resetar
        </button>
      </div>

      {/* Image container */}
      <div
        ref={containerRef}
        role="img"
        aria-label={alt}
        tabIndex={0}
        className={[
          "max-h-[70vh] touch-none overflow-hidden rounded-md border bg-muted/20",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          cursor,
        ].join(" ")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          draggable={false}
          className="block max-w-full max-h-[70vh] mx-auto origin-top-left select-none touch-none"
          style={{
            transform: `translate(${transform.offset.x}px, ${transform.offset.y}px) scale(${transform.zoom})`,
            transition: shouldTransition ? "transform 150ms ease" : "none",
          }}
        />

        {/* Hint badge — visible only when at 100% zoom */}
        {isAtMin && (
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm"
          >
            Scroll · Pinça · Duplo toque para dar zoom
          </div>
        )}
      </div>
    </div>
  );
}