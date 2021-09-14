declare namespace Lineup {
  declare type Player = {
    name: string;
    playerNumber: number | string;
  };
  declare type Position = {
    position: PositionValues;
  };
  declare type PositionValues =
    | "left"
    | "right"
    | "center"
    | "center-left"
    | "center-right"
    | "center-left-3"
    | "center-right-3";
  declare type Group = (Player & Position)[];
}
