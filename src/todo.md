make sure only bigNumber is send to contract values
modal with connect wallet for all actions which requires blockchain interaction, may be from the query itself[done]
useStorage doesn't refetch changed values, may be store the value in context and update when useStorage setter is called[done]
read slippage from url and save it to storage[done]
handle case when search defaults to usdc usdt and both pairs are same[done]


onError in useExecution handle it better using specific error code for transation
settings modal, value validation and input
slippage warning message for more than 5% and less than 0.5%
remove animation of header in mobile and fix banner overlap[done]
show tokens swapped in transaction success message
if token swapped is metis, reduce some amount for gas fees
if !trade.route , show message for insufficient liquidity in the selected pair
show dollar value of input tokens
read multihops
price impact high warning
loading indicator on price input fields when fetching is in progress
add metamask link in tokens