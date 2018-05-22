# Breadcrumb

## Description

Storecomponents is a collection of components that can be used to create/extend others vtex components.

## Continuous Integrations

### Travis CI
)


## Testing

To test your code you should run on your workspace:

```sh
vtex link
```

And add your new component on the manifest.json dependencies section of the other app, like:

```json
"dependencies": {
    "vtex.carousel": "1.x",
    "vtex.shelf": "0.x",
    "vtex.product-summary": "0.x",
    "vtex.menu": "0.x",
    "vtex.minicart": "0.x",
    "vtex.product-details": "0.x",
    "vtex.storecomponents": "0.x",
    "vtex.gallery": "0.x",
    "vtex.category-menu": "0.x"
}
```
