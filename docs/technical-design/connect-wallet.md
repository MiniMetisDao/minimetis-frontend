# Connect wallet

The TD explains the functionalities required for Connecting wallet, showing the status text in the connect wallet button.

## Details

**Various status**

Various possible status where user can be are

- No metamask installed (so no window.ethereum)
- Connected to different network other than Metis Andromeda
- Site not connected to MetaMask wallet extensiom
- Connected to MataMask, Metis Andromeda (All good here)

Based on the above status text should be shown accordingly in our connect wallet button.

## Components design

Provide a hook `useGetWalletDetails` which should give the following

```ts
type WalletDetails = {
  address: string;
  status: WalletStatus;
  label: string;
};

type WalletStatus =
  | "NO_METAMASK"
  | "INVALID_NETWORK"
  | "WALLET_NOT_CONNECTED"
  | "CONNECTED";
```

Store this in `ReactQuery` cache so it is useful for later re-use when any component needs wallet address. 

We should have some mechanism to listen to

- When user changes the network
- When user disconnects the wallet

On these occasions our cache should be updated and we should re render the whole tree to update our site.

One possible approach is have a component mounted in `App` level or high in the tree which has the below functionality to listen to those events

```tsx
const AccountChainIdListener: React.FC = () => {
  const { refetch } = useGetWalletDetails();

  React.useEffect(() => {
    listen("accountsChanged", refetch);
    listen("chainChanged", refetch);

    return () => {
      unlisten("accountsChanged", refetch);
      unlisten("chainChanged", refetch);
    };
  }, []);

  return null;
};
```

`accountsChanged`, `chainChanged` are the events emitted by `Meta Mask`.

So this takes care of the updating part and re render's all the subscribers to this hook.

When user is in Metis Andromeda network but not conncted wallet with our site, then clicking the `Connect Wallet` should connect to MetaMask and inoke it to connect to our site.

## Questions

- How we handle the loading, error case from `useQuery`? what's the message we show to the user?
