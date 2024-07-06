import { Sprite } from '../sprite.js';

const makeIceBlockSprite = () => {
    const iceBlockSprite = new Sprite ("ice-block")

    iceBlockSprite.addAnimatedVersion("break", [
        "ice-block-break/1",
        "ice-block-break/1",
        "ice-block-break/1",
        "ice-block-break/1",
        "ice-block-break/1",
        "ice-block-break/1",
        "ice-block-break/1",
        "ice-block-break/1",
        "ice-block-break/2",
        "ice-block-break/3",
        "ice-block-break/4",
        "ice-block-break/5",
        "ice-block-break/6",
        "ice-block-break/7",
        "ice-block-break/8",
        "ice-block-break/9",
        "ice-block-break/10",
        "ice-block-break/11",
        "ice-block-break/12",
        "ice-block-break/13",
        "ice-block-break/14",
        "ice-block-break/15",
        "ice-block-break/16",
        "ice-block-break/17",
        "ice-block-break/18",
        "ice-block-break/19",
        "ice-block-break/20",
        "ice-block-break/21",
        "ice-block-break/22",
        "ice-block-break/23",
        "ice-block-break/24",
    ])

    return iceBlockSprite
}

export { makeIceBlockSprite }