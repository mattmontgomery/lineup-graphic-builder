import { CircleConfig } from "konva/lib/shapes/Circle";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
  Group,
  Arc,
  Line,
} from "react-konva";

function Player({
  x,
  y,
  radius = 25,
  name = "",
  playerNumber = "",
  onClick,
  themeColors = {},
}: CircleConfig &
  Lineup.Player & {
    onClick: () => void;
  } & Lineup.ThemeColors): React.ReactElement {
  return (
    <Group onClick={onClick}>
      <Circle
        x={x}
        y={y}
        radius={radius}
        stroke={themeColors.stroke || "#00189E"}
        fill={themeColors.fill || "#C41F35"}
        strokeWidth={radius * 0.2}
      />
      <Text
        text={playerNumber.toString()}
        x={(x || 0) - radius}
        y={(y || 0) - radius * 0.95}
        align="center"
        verticalAlign="middle"
        width={radius * 2}
        height={radius * 2}
        fontSize={radius * 0.85}
        fontStyle="bold"
        fill="white"
      />
      <Text
        text={name}
        align="center"
        width={radius * 8}
        x={(x || 0) - radius * 4}
        y={(y || 0) + radius + 10}
        fontSize={radius * 0.75}
        fontFamily="Helvetica Neue"
        fontStyle="Bold"
      />
    </Group>
  );
}

export default function Graphic({
  players,
  radius = 25,
  matchTitle = "",
  matchDate = "",
  subTitle = "",
  onPlayerClick,
  themeColors = {},
}: {
  players: Lineup.Group[];
  radius: number;
  matchTitle: string;
  matchDate: string;
  subTitle: string;
  onPlayerClick: (idx: number) => void;
  themeColors: Lineup.ThemeColors;
}): React.ReactElement {
  const fullHeight = 150 - radius + players.length * radius * 4.5;
  const fullWidth = radius * 25;
  return (
    <Stage width={fullWidth} height={fullHeight}>
      <Layer>
        <Group>
          <Rect
            x={0}
            y={0}
            height={fullHeight}
            fill="#f0f0f0"
            width={fullWidth}
          />
        </Group>
        <Group>
          <Rect
            x={25}
            y={-25}
            width={fullWidth - 50}
            height={fullHeight - 50}
            stroke="#ddd"
            strokeWidth={8}
          />
          <Rect
            x={radius * 6}
            y={fullHeight - 200}
            width={fullWidth - radius * 12}
            height={125}
            stroke="#ddd"
            strokeWidth={8}
          />
          <Rect
            x={radius * 8}
            y={fullHeight - 150}
            width={fullWidth - radius * 16}
            height={75}
            stroke="#ddd"
            strokeWidth={8}
          />
          <Arc
            strokeWidth={8}
            stroke="#ddd"
            x={fullWidth / 2}
            y={fullHeight - 200}
            width={200}
            angle={180}
            innerRadius={1}
            outerRadius={25}
            rotationDeg={180}
          />
          <Line
            points={[25, fullHeight * 0.2, fullWidth - 25, fullHeight * 0.2]}
            stroke="#ddd"
            strokeWidth={8}
            height={20}
            width={fullWidth}
          />
          <Circle
            height={150}
            stroke="#ddd"
            strokeWidth={8}
            x={fullWidth / 2}
            y={fullHeight * 0.2}
          />
        </Group>
        <Group x={25} y={25}>
          <Text
            text={matchTitle}
            fontSize={radius * 0.75}
            fontStyle="bold"
            fontFamily="Helvetica Neue"
            width={fullWidth - 75}
            align="right"
          />
          <Text
            text={matchDate}
            fontSize={radius * 0.75}
            fontFamily="Helvetica Neue"
            y={radius}
            width={fullWidth - 75}
            align="right"
          />
          <Text
            text={subTitle}
            fontSize={radius * 0.75}
            fontFamily="Helvetica Neue"
            y={radius * 2}
            width={fullWidth - 75}
            align="right"
          />
          <Text
            text={`lineup.tools.football`}
            fontSize={radius * 0.5}
            fontFamily="Helvetica Neue"
            y={fullHeight - 90}
            width={fullWidth - 50}
            align="right"
          />
        </Group>
        <Group x={radius * 4} y={150}>
          {players.map((group, idx) => (
            <Group key={idx} y={radius * 4.5 * idx}>
              {group.map((player, idx) => (
                <Player
                  key={idx}
                  idx={player.idx}
                  x={getPosition(player.position, radius)}
                  name={player.name}
                  playerNumber={player.playerNumber}
                  radius={radius}
                  onClick={() => onPlayerClick(player.idx)}
                  themeColors={themeColors}
                />
              ))}
            </Group>
          ))}
        </Group>
      </Layer>
    </Stage>
  );
}

function getPosition(position: Lineup.PositionValues, radius: number) {
  switch (position) {
    case "center":
      return radius * 9 - radius / 2;
    case "center-left":
      return radius * 6 - radius / 2;
    case "center-right":
      return radius * 12 - radius / 2;
    case "center-left-3":
      return radius * 2 - radius / 2;
    case "center-right-3":
      return radius * 16 - radius / 2;
    case "right":
      return radius * 18 - radius / 2;
    case "left":
      return 0;
    default:
      return 0;
  }
}
