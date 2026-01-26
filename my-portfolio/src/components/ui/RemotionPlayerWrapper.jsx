import React from 'react';
import { Player } from '@remotion/player';
import { HeroAnimation } from '../../remotion/HeroAnimation';

const RemotionPlayerWrapper = ({ composition = HeroAnimation, durationInFrames = 150, fps = 30, width = 1280, height = 720 }) => {
    return (
        <div style={{ width: '100%', aspectRatio: '16/9' }}>
            <Player
                component={composition}
                durationInFrames={durationInFrames}
                fps={fps}
                compositionWidth={width}
                compositionHeight={height}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                controls
            />
        </div>
    );
};

export default RemotionPlayerWrapper;
