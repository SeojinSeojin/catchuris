interface Marker {
  shape: number[][];
  catchu: ReactElement;
}

interface ActiveMarker extends Marker {
  positionX: number;
  positionY: number;
}
