# Contract Queries

[onetime api call](https://andromeda-explorer.metis.io/address/0x6d8534326415Ff9966b387615e576A109aC01AC1/read-contract)
  **minime contract variables**
    -- name (token name)
    -- symbol (token symbol)
    -- decimals (decimal points to divide the number to get actual value)
    -- rewardToken (token reward paid in this token, currently its metis)
    -- distributor (this contract will be used for distibution of metis shares) [current value is 0xf2c0e8b0785727726119fde77e56d6e6e3ed342e]
    -- pair (this is the LP contract)
  - minimetis-metis LP contract variables
      --- token0 (this is our token) [current value is 0x6d8534326415ff9966b387615e576a109ac01ac1]
      --- token1 (this is the other pair) [current value is 0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000]
  - metis-m.usdt LP contract variables
    -- token0 (this is m.usdt)
    -- token1 (metis)

**your minimetis balance**
  - minime contract address -> config/CONTRACT_ADDRESS
  - balanceOf(address)
  - Find price of minimetis -> get balanceOf(token0) and balanceOf(token1), pair is the LP address
    -- 1 minimetis  = balanceOf(token1)/balanceOf(token0) [1 minime = (1141/74,493,146,636,647.639) metis]
  - Find price of metis -> get balanceOf(token0) and balanceOf(token1), metis-m.usdt is the LP address 
    -- 1 metis  = balanceOf(token1)/balanceOf(token0)
  - minimetis in dollars [1 minime = (1141/74,493,146,636,647.639) * the above line value]

**your minimetis divident share percentage**
  -   textYourDividendShare = ((yourBalance/(totalShares/1000000000000000000000000000000))*100).toFixed(4).concat("%"); [get clarification on the calculation]
  - totalShares - get from the distributor contract ( method name is "totalShares")

**your claimed dividents**
  - textTotalClaimed
  - userShares - get from distributor contract (method: 'shares', args: [address])

**your unclaimed dividents**
  - textUnpaidEarning
  - userUnpaidShares - get from distributor contract (method: 'getUnpaidEarnings', args: [address])



