📢 Use this project, [contribute](https://github.com/vtex-apps/breadcrumb) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Breadcrumb

The VTEX BreadCrumb is a navigation scheme that shows a user's browsing history up to their current location in your store.

![img2-breadcrumb](https://user-images.githubusercontent.com/52087100/69836587-a4237380-1228-11ea-89c8-0f34cea3a96f.png)

## Configuration

1. Import the breadcrumb's app to your theme's dependencies in the `manifest.json`, for example:

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

## The `breadcrumb.search` block

The `breadcrumb.search` block is specific for the Breadcrumb inside the search result page. You can add this block to the Product and Search template as the example below:

```
 "breadcrumb.search": {
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


## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization). 

| CSS Handles |
| ----------- | 
| `container` | 
| `link`      | 
| `arrow`     | 
| `homeLink`  | 
| `termArrow` |





## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!