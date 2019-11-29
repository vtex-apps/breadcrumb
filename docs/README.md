📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Breadcrumb

The VTEX BreadCrumb is a navigation scheme that shows a user's browsing history up to their current location in your store.

![img2-breadcrumb](https://user-images.githubusercontent.com/52087100/69836587-a4237380-1228-11ea-89c8-0f34cea3a96f.png)

## Configuration

1. Import the breadcrumb's app to your dependencies in the `manifest.json`, for example:

```json
  dependencies: {
    "vtex.breadcrumb": "1.x"
  }
```

2. Add the `breadcrumb` block to the Product and Search template. For example:

```
 "breadcrumb": {
    "props": {
      "showOnMobile": true
    }
  },
```

| Prop name    | Type            | Description    | Default value                                                                                                                               |
| ------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | 
| `showOnMobile`        | `Boolean`       | It determines whether Breadcrumb should also be displayed on mobile          | `false`              |
| `homeIconSize`  | `Number`        | Controls the `size` property of [`IconHome`](https://github.com/vtex-apps/store-icons#icons)                                                                                                      | `26` |
| `caretIconSize` | `Number`        | Controls the `size` property of [`IconCaret`](https://github.com/vtex-apps/store-icons#icons)                                                                                                     | `8` |

:warning: The product's categories should appear as an array in one of this two formats:

```javascript
categories = ['/Eletronics/', '/Eletronics/Computers']
```

```javascript
categories = ['eletronics', 'eletronics-computers']
```

## Customization

| CSS Handle  | Description                      |
| ----------- | -------------------------------- |
| `container` | The main container of breadcrumb |
| `link`      | Link container                   |
| `arrow`     | Arrow container                  |
| `homeLink`  | [`IconHome`](https://github.com/vtex-apps/store-icons#icons) container |
| `termArrow` | [`IconCaret`](https://github.com/vtex-apps/store-icons#icons) container  | 



