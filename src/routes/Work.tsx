import CircleSatellites from '../components/Circle/CircleSatellites ';
import CircleSVG from '../components/Circle/circleSVG';
import { useCircleTransition } from '../components/Circle/CircleTransitionContext';

function Work() {
  const { circleState } = useCircleTransition();

  return (
    <div>
      {circleState?.rect && (
        <div
          style={{
            position: 'absolute',
            top: circleState.rect.top,
            left: circleState.rect.left,
            width: circleState.rect.width,
            height: circleState.rect.height,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <CircleSVG
            color={circleState.color}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      <CircleSatellites
        color={circleState?.color || '#fff'}
        count={100}
        positionY={400}
        positionX={200}
      />
    </div>
  );
}
export default Work;
