# Breadcrumb
Breadcrumb is a canonical component that any VTEX app can use.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [0.x]    | **Maintenance LTS** |  2018-05-29     | 2018-11-20            | March 2019  | 1.x
| [1.x]    | **Current Release** |  2018-11-20     |                       |             | 2.x


To use it in your code you should first add it as a dependencie into your app's ```manifest.json```, like:

```json
"dependencies": {
    "vtex.breadcrumb": "0.x",
}
```

## Usage
You can use it in your code through an extension point in your app.

```javascript
    <ExtensionPoint
        id="breadcrumb"
        search={query}
        categories={categories}
    />
```

And then link the component in the extensions section in the pages.json file.

```javascript
{
 "pages": {
    "store/product": {
      "path": "/:slug/p"
    }
  },
  "extensions": {
    "store/product/breadcrumb": {
      "component": "vtex.breadcrumb/Breadcrumb"
    }
  }
}
```

| Prop name          | Type           | Description                                                                 |
| ------------------ | -------------- | --------------------------------------------------------------------------- |
| `search`           | `String`       | Term used to get to that specific page on the website                       |
| `slug`             | `String`       | Product's unique identification stored on the database                      |
| `categories`       | `Array(String)`| List of categories which the product belongs to                             |

## Extra info:

The product's categories should appear as an array in one of this two formats:

- 1  

```javascript
categories = ['/Eletronics/','/Eletronics/Computers']
```

- 2

```javascript
categories = ['eletronics','eletronics-computers']
```


See an example at [Dreamstore](https://github.com/vtex-apps/dreamstore-theme/blob/master/react/components/GalleryWrapper.js) app
