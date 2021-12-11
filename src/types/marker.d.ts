interface Marker {
  shape: ?number[][];
  catchu: ?ReactComponent;
}

interface ActiveMarker extends Marker {
  positionX: number;
  positionY: number;
}
