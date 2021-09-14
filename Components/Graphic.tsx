import { CircleConfig } from "konva/lib/shapes/Circle";
import { useContext } from "react";
import { Stage, Layer, Rect, Text, Circle, Group } from "react-konva";

function Player({
  x,
  y,
  radius = 25,
  name = "Grabavoy",
  playerNumber = "44",
}: CircleConfig & Lineup.Player): React.ReactElement {
  return (
    <Group>
      <Circle
        x={x}
        y={y}
        radius={radius}
        stroke="#00189E"
        fill="#C41F35"
        strokeWidth={radius * 0.2}
      ></Circle>
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
}: {
  players: Lineup.Group[];
  radius: number;
  matchTitle: string;
  matchDate: string;
  subTitle: string;
}): React.ReactElement {
  const fullHeight = 150 + players.length * radius * 5 - radius;
  const fullWidth = radius * 25;
  return (
    <Stage width={fullWidth} height={fullHeight}>
      <Layer>
        <Rect
          x={0}
          y={0}
          height={fullHeight}
          fill="#f0f0f0"
          width={fullWidth}
        ></Rect>
      </Layer>
      <Layer x={25} y={25}>
        <Text
          text={matchTitle}
          fontSize={radius * 0.75}
          fontStyle="bold"
          fontFamily="Helvetica Neue"
          width={fullWidth - 50}
          align="right"
        />
        <Text
          text={matchDate}
          fontSize={radius * 0.75}
          fontFamily="Helvetica Neue"
          y={radius}
          width={fullWidth - 50}
          align="right"
        />
        <Text
          text={subTitle}
          fontSize={radius * 0.75}
          fontFamily="Helvetica Neue"
          y={radius * 2}
          width={fullWidth - 50}
          align="right"
        />
        <Text
          text={`lineup-graphic-builder.vercel.app`}
          fontSize={radius * 0.5}
          fontFamily="Helvetica Neue"
          y={fullHeight - 50}
          width={fullWidth - 50}
          align="right"
        />
      </Layer>
      <Layer x={radius * 4} y={150}>
        {players.map((group, idx) => (
          <Group key={idx} y={radius * 5 * idx}>
            {group.map((player, idx) => (
              <Player
                key={idx}
                x={getPosition(player.position, radius)}
                name={player.name}
                playerNumber={player.playerNumber}
                radius={radius}
              />
            ))}
          </Group>
        ))}
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
