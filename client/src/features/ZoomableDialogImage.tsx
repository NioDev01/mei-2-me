import { useMemo, useRef, useState } from "react";
import type { PointerEvent, WheelEvent } from "react";

type Point = {
  x: number;
  y: number;
};

type ZoomableDialogImageProps = {
  src: string;
  alt: string;
};

export function ZoomableDialogImage({ src, alt }: ZoomableDialogImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragStartRef = useRef<Point | null>(null);
  const offsetStartRef = useRef<Point>({ x: 0, y: 0 });
  const activePointersRef = useRef<Map<number, Point>>(new Map());
  const pinchStartDistanceRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef(1);
  const pinchStartOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const offsetRef = useRef<Point>({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const zoomPercent = useMemo(() => Math.round(zoom * 100), [zoom]);

  const clampOffset = (nextX: number, nextY: number, nextZoom: number) => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) {
      return { x: nextX, y: nextY };
    }

    const scaledWidth = image.clientWidth * nextZoom;
    const scaledHeight = image.clientHeight * nextZoom;

    const minX = Math.min(0, container.clientWidth - scaledWidth);
    const minY = Math.min(0, container.clientHeight - scaledHeight);
    const maxX = 0;
    const maxY = 0;

    return {
      x: Math.min(maxX, Math.max(minX, nextX)),
      y: Math.min(maxY, Math.max(minY, nextY)),
    };
  };

  const commitTransform = (nextZoom: number, nextOffset: Point) => {
    zoomRef.current = nextZoom;
    offsetRef.current = nextOffset;
    setZoom(nextZoom);
    setOffset(nextOffset);
  };

  const applyZoom = (nextZoom: number) => {
    const nextOffset = clampOffset(offsetRef.current.x, offsetRef.current.y, nextZoom);
    commitTransform(nextZoom, nextOffset);
  };

  const resetZoom = () => applyZoom(1);

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const intensity = event.deltaY < 0 ? 1.12 : 0.88;
    const nextZoom = Math.min(4, Math.max(1, zoomRef.current * intensity));
    if (nextZoom === zoomRef.current) return;

    const rect = container.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    const imageX = (cursorX - offsetRef.current.x) / zoomRef.current;
    const imageY = (cursorY - offsetRef.current.y) / zoomRef.current;

    const nextOffsetX = cursorX - imageX * nextZoom;
    const nextOffsetY = cursorY - imageY * nextZoom;
    const nextOffset = clampOffset(nextOffsetX, nextOffsetY, nextZoom);
    commitTransform(nextZoom, nextOffset);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    const pointers = Array.from(activePointersRef.current.values());
    if (pointers.length === 2) {
      const [p1, p2] = pointers;
      pinchStartDistanceRef.current = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      pinchStartZoomRef.current = zoomRef.current;
      pinchStartOffsetRef.current = offsetRef.current;
      dragStartRef.current = null;
      setIsDragging(false);
      return;
    }

    if (pointers.length === 1 && zoomRef.current > 1) {
      event.preventDefault();
      dragStartRef.current = { x: event.clientX, y: event.clientY };
      offsetStartRef.current = offsetRef.current;
      setIsDragging(true);
    }
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointersRef.current.has(event.pointerId)) {
      activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }

    const pointers = Array.from(activePointersRef.current.values());
    if (pointers.length === 2 && pinchStartDistanceRef.current) {
      event.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const [p1, p2] = pointers;
      const currentDistance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      if (!currentDistance) return;

      const nextZoom = Math.min(
        4,
        Math.max(1, pinchStartZoomRef.current * (currentDistance / pinchStartDistanceRef.current))
      );

      const rect = container.getBoundingClientRect();
      const centerX = (p1.x + p2.x) / 2 - rect.left;
      const centerY = (p1.y + p2.y) / 2 - rect.top;

      const imageX = (centerX - pinchStartOffsetRef.current.x) / pinchStartZoomRef.current;
      const imageY = (centerY - pinchStartOffsetRef.current.y) / pinchStartZoomRef.current;

      const nextOffsetX = centerX - imageX * nextZoom;
      const nextOffsetY = centerY - imageY * nextZoom;
      const nextOffset = clampOffset(nextOffsetX, nextOffsetY, nextZoom);
      commitTransform(nextZoom, nextOffset);
      return;
    }

    if (!isDragging || !dragStartRef.current) return;
    event.preventDefault();

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;

    const next = clampOffset(
      offsetStartRef.current.x + deltaX,
      offsetStartRef.current.y + deltaY,
      zoomRef.current
    );
    commitTransform(zoomRef.current, next);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    activePointersRef.current.delete(event.pointerId);

    const pointers = Array.from(activePointersRef.current.values());
    if (pointers.length < 2) {
      pinchStartDistanceRef.current = null;
    }

    if (pointers.length === 1 && zoomRef.current > 1) {
      const [p] = pointers;
      dragStartRef.current = { x: p.x, y: p.y };
      offsetStartRef.current = offsetRef.current;
      setIsDragging(true);
      return;
    }

    setIsDragging(false);
    dragStartRef.current = null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">É possível aplicar Zoom na imagem</span>
        <span className="text-sm text-muted-foreground">{zoomPercent}%</span>
      </div>

      <div
        ref={containerRef}
        className={`max-h-[70vh] touch-none overflow-hidden rounded-md border bg-muted/20 ${
          zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onDoubleClick={resetZoom}
      >
        <img
          ref={imageRef}
          className="w-full max-w-none origin-top-left select-none touch-none"
          src={src}
          alt={alt}
          draggable={false}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transition: isDragging ? "none" : "transform 150ms ease",
          }}
        />
      </div>
    </div>
  );
}
