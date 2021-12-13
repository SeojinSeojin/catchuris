interface Marker {
  shape: number[][];
  catchu: ReactElement;
  key: string;
}

interface ActiveMarker extends Marker {
  positionX: number;
  positionY: number;
}
