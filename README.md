# Minimetis frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/bf43f5f7-95d4-46a0-ad39-d123f9cbcf0e/deploy-status)](https://app.netlify.com/sites/minimetis/deploys)

Minimetis Dapp.

## Development Goal

* Do not make any unnecessary query calls
    * All Static values from contracts to be queried only once and served from cache for subsequent calls
    * Batch queries from multiple components into one using multicall automatically
