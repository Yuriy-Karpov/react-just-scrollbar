// .justScroll-bar {
//     width: 4px;
//     z-index: 10;
//     top: 0;
//     bottom: 0;
//     position: absolute;
//     right: 0;
//     transition: width 100ms ease-in-out;
//     user-select: none;
// }
// .justScroll-bar:hover {
//     width: 8px;
// }
// .justScroll-bar:active {
//     width: 8px;
// }
// .justScroll-bar--track {
//     position: relative;
//     height: 100%;
//     overflow: hidden;
// }
// .justScroll-bar--track::before {
//     content: "";
//     position: absolute;
//     width: 100%;
//     top: 4px;
//     bottom: 4px;
//     background-color: rgba(3, 3, 3, 0.2);
//     border-radius: 6px;
//     z-index: -1;
// }

export const justScrollBar__thumb = {
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    backgroundColor: 'rgba(3, 3, 3, 0.6)',
    height: 0,
    borderRadius: '6px',
    position: 'absolute',
    top: '4px',
    right: 0,
    width: '100%',
    /* transform: translate3d(0px, 0px, 0px); */
    transform: 'translateY(0px)'
}

export const justScroll = {
    overflowY: 'hidden',
    overflowX: 'hidden',
    width: '100%',
    height: '100%',
    position: 'relative',
    flexGrow: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column'
};
export const justScrollArea = {
    height: '100%',
    marginRight: '-40px',
    marginBottom: '-40px',
    boxSizing: 'content-box',
    flex: '1 1 auto'
};
export const justScrollData = {
    position: 'relative',
    paddingRight: '40px',
    paddingBottom: '40px',
    boxSizing: 'content-box',
};
