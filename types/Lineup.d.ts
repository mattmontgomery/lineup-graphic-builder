declare namespace Lineup {
  declare type Player = {
    idx: number;
    name: string;
    playerNumber: number | string;
  };
  declare type Position = {
    position: PositionValues;
  };
  declare type PositionedPlayer = Lineup.Player & Lineup.Position;
  declare type PositionValues =
    | "left"
    | "right"
    | "center"
    | "center-left"
    | "center-right"
    | "center-left-3"
    | "center-right-3";
  declare type Group = PositionedPlayer[];
  declare type Formations =
    | "4-2-3-1"
    | "3-4-1-2"
    | "4-4-2"
    | "4-4-2 Diamond"
    | "3-1-4-2"
    | "W-M";
  declare type ThemeColors = {
    fill?: string;
    stroke?: string;
  };
}
