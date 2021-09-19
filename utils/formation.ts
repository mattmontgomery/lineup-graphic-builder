export const FORMATION_POSITIONS: Record<
  Lineup.Formations,
  Lineup.PositionValues[]
> = {
  ["4-2-3-1"]: [
    "center",
    "left",
    "center-left",
    "center-right",
    "right",
    "center-left",
    "center-right",
    "center-left-3",
    "center",
    "center-right-3",
    "center",
  ],
  ["3-4-1-2"]: [
    "center",
    "center-left-3",
    "center",
    "center-right-3",
    "left",
    "center-left",
    "center-right",
    "right",
    "center",
    "center-left",
    "center-right",
  ],
  ["3-2-3-2"]: [
    "center",
    "center-left-3",
    "center",
    "center-right-3",
    "center-left",
    "center-right",
    "left",
    "center",
    "right",
    "center-left",
    "center-right",
  ],
  ["4-4-2"]: [
    "center",
    "left",
    "center-left",
    "center-right",
    "right",
    "left",
    "center-left",
    "center-right",
    "right",
    "center-left",
    "center-right",
  ],
  ["4-4-2 Diamond"]: [
    "center",
    "left",
    "center-left",
    "center-right",
    "right",
    "center",
    "center-left",
    "center-right",
    "center",
    "center-left",
    "center-right",
  ],
  "3-1-4-2": [
    "center",
    "center-left-3",
    "center",
    "center-right-3",
    "center",
    "left",
    "center-left",
    "center-right",
    "right",
    "center-left",
    "center-right",
  ],
  ["W-M"]: [
    "center",
    "center-left-3",
    "center",
    "center-right-3",
    "center-left",
    "center-right",
    "center-left",
    "center-right",
    "center-left-3",
    "center",
    "center-right-3",
  ],
};

export const FORMATION_LAYERS: Record<Lineup.Formations, [number, number][]> = {
  ["4-2-3-1"]: [
    [0, 1],
    [1, 5],
    [5, 7],
    [7, 10],
    [10, 11],
  ],
  ["3-4-1-2"]: [
    [0, 1],
    [1, 4],
    [4, 8],
    [8, 9],
    [9, 11],
  ],
  ["4-4-2"]: [
    [0, 1],
    [1, 5],
    [5, 9],
    [9, 11],
  ],
  ["4-4-2 Diamond"]: [
    [0, 1],
    [1, 5],
    [5, 6],
    [6, 8],
    [8, 9],
    [9, 11],
  ],
  ["3-1-4-2"]: [
    [0, 1],
    [1, 4],
    [4, 5],
    [5, 9],
    [9, 11],
  ],
  ["3-2-3-2"]: [
    [0, 1],
    [1, 4],
    [4, 6],
    [6, 9],
    [9, 11],
  ],
  "W-M": [
    [0, 1],
    [1, 4],
    [4, 6],
    [6, 8],
    [8, 11],
  ],
};
export const FORMATION_POSITION_NAMES: Record<Lineup.Formations, string[]> = {
  ["4-2-3-1"]: [
    "GK",
    "Left Back",
    "Center Back (L)",
    "Center Back (R)",
    "Right Back",
    "Center Midfield (L)",
    "Center Midfield (R)",
    "Left Wing",
    "Center Attacking Midfield",
    "Right Wing",
    "Forward",
  ],
  ["3-4-1-2"]: [
    "GK",
    "CB (Left)",
    "CB",
    "CB (Right)",
    "Left Wing Back",
    "Center Midfield (Left)",
    "Center Midfield (Right)",
    "Right Wing Back",
    "CAM",
    "Forward (Left)",
    "Forward (Right)",
  ],
  ["3-1-4-2"]: [
    "GK",
    "CB (Left)",
    "CB",
    "CB (Right)",
    "Defensive Midfield",
    "Left Wing",
    "AM (L)",
    "AM (R)",
    "Right Wing",
    "Forward (Left)",
    "Forward (Right)",
  ],
  ["3-2-3-2"]: [
    "GK",
    "CB (Left)",
    "CB",
    "CB (Right)",
    "Center Midfield (L)",
    "Center Midfield (R)",
    "Left Wing",
    "AMC",
    "Right Wing",
    "Forward (Left)",
    "Forward (Right)",
  ],
  ["4-4-2"]: [
    "GK",
    "Left Back",
    "Center Back (L)",
    "Center Back (R)",
    "Right Back",
    "Left Wing",
    "Center Midfield (L)",
    "Center Midfield (R)",
    "Right Wing",
    "Forward (L)",
    "Forward (R)",
  ],
  ["4-4-2 Diamond"]: [
    "GK",
    "Left Back",
    "Center Back (L)",
    "Center Back (R)",
    "Right Back",
    "DM",
    "Center Midfield (L)",
    "Center Midfield (R)",
    "CAM",
    "Forward (L)",
    "Forward (R)",
  ],
  ["W-M"]: [
    "GK",
    "Full Back (L)",
    "Full Back (C)",
    "Full Back (R)",
    "Half Back (L)",
    "Half Back (R)",
    "Inside Forward (L)",
    "Inside Forward (R)",
    "Winger (L)",
    "Center Forward",
    "Winger (R)",
  ],
};
