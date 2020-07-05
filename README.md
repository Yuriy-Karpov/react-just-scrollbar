# just-scrollbar
this is just custom native scrollbar for React


JustScroll does NOT implement a custom scroll behaviour. It keeps the native overflow: auto scroll and only replace the scrollbar visual appearance. 

The bar animation uses requestAnimationFrame which gives 60 fps


## Installation
```
npm install react-just-scrollbar --save
```

## Usage
#### React Component:
```
<div> // like native scrolling, we watching at the parent's height limit
    <JustScroll>
        <div>{content}</div>
    </JustScroll>
</div>
```

### Style css:
```
import 'react-just-scrollbar/dist/styles.css'; // base style
import 'react-just-scrollbar/dist/themes/dark.css'; // themes style
```
