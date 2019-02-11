# VTEX Breadcrumb

## Description
The VTEX BreadCrumb is a secondary navigation scheme that reveals the user location on the store and it is used by the Dreamstore product.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [0.x]    | **Maintenance LTS** |  2018-05-29     | 2018-11-20            | March 2019  | 1.x
| [1.x]    | **Current Release** |  2018-11-20     |                       |             | 2.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app, you need to add it in your `dependencies` in the `manifest.json` file.

```json
  dependencies: {
    "vtex.breadcrumb": "1.x"
  }
```

Then, add the `breadcrumb` block into our app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API
:construction: :construction: :construction:

This app has an interface that describes what rules must be implemented by a block when you want to use the breadcrumb app.

```json
{
  "breadcrumb": {
    "component": "Breadcrumb"
  }
}
```

#### Configuration 
Through the Storefront, you can change the behavior and interface of the breadcrumb. However, you also can make in your theme app, as Dreamstore does.

| Prop name          | Type           | Description                                                                 |
| ------------------ | -------------- | --------------------------------------------------------------------------- |
| `term`           | `String`       | Search term that is used to get to that specific page on the website or product slug that is the unique identification stored on the database                     |
| `categories`       | `Array(String)`| List of categories which the product belongs to                             |


:loudspeaker: **Extra information:** The product's categories should appear as an array in one of this two formats:

- 1  

```javascript
categories = ['/Eletronics/','/Eletronics/Computers']
```

- 2

```javascript
categories = ['eletronics','eletronics-computers']
```

### Styles API
:construction: :construction: :construction:

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/carousel/issues). Also feel free to [open issues](https://github.com/vtex-apps/carousel/issues/new) or contribute with pull requests.

## Tests
To execute our tests go to `react/` folder and run `yarn test`
