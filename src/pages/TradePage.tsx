import BigNumber from "bignumber.js";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";
import { Trade } from "components/Trade";

const exported = [
  {
    wallet: "0xc3A785C4edfb6c8766eaFFf2946728aC7E222EAD",
    balance: "28247953.569615190592398119",
    type: "wallet",
  },
  {
    wallet: "0xe7492018c976894fd2DFCe5D124Ac4D6E80E4E7f",
    balance: "14158820.195875714317870976",
    type: "wallet",
  },
  {
    wallet: "0x189ecEbfa5D3c5EA82d5172b1069c3305a0a149A",
    balance: "4865796.881917968241937808",
    type: "wallet",
  },
  {
    wallet: "0xB19210Ddbdc3BEd1cd2fd6F9F18DE83BdEacE8Bf",
    balance: "4261849.758294346074075129",
    type: "wallet",
  },
  {
    wallet: "0x3562E09E110488D41874dE19663fb21e98fb204a",
    balance: "3402629.497203393772785596",
    type: "wallet",
  },
  {
    wallet: "0x6BAD6014137bDe704C027C14A06886d1ffC7EAcB",
    balance: "2746684.224555475970777267",
    type: "wallet",
  },
  {
    wallet: "0xc82b4957465ff5aaCa11bD3B83A89e59590356a9",
    balance: "2612139.107358899714975519",
    type: "wallet",
  },
  {
    wallet: "0x1a85e60e43e330f4DbbECCEbeB3a27aafD558500",
    balance: "2473185.033455565273621374",
    type: "wallet",
  },
  {
    wallet: "0x2457FF8420D3752Ac1900Ce5C073677D0E4c1829",
    balance: "2441594.876133074158223228",
    type: "wallet",
  },
  {
    wallet: "0xE24D5dA3d7A49Ba52F231bb5386F1FBc8E79c122",
    balance: "2417852.841400865995564855",
    type: "wallet",
  },
  {
    wallet: "0x162ceaCc3C23736cb83DEa614866049950c2BE62",
    balance: "2300000.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x41d3bED71E3cF5330ff49C0778790c79Ad8f6B8B",
    balance: "2051573.246951334145448464",
    type: "wallet",
  },
  {
    wallet: "0xe151290609c7677D0A27859eD97Ff53298618B77",
    balance: "1778300.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x11d2932D443629136E147a47f7ff99B156b8827E",
    balance: "1623669.235068734298046803",
    type: "wallet",
  },
  {
    wallet: "0x82cE9c2019ccc27eb0fE3D6E0a42492678C284A7",
    balance: "1600000.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x29E2fD153b86676D80C3809CA1D4ca34544cd4e0",
    balance: "1600000.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x951f16c9fcAbDa6ae2781fE0F3E9ebb23BF8BA64",
    balance: "1477523.270468355551117906",
    type: "wallet",
  },
  {
    wallet: "0x6792a3B7774B2bf200D77f5050dd8392878faFE4",
    balance: "1280759.272784764530040620",
    type: "wallet",
  },
  {
    wallet: "0x2ABEef34Db660dd98F25983807A9B5f14821D103",
    balance: "1249090.483289948456404756",
    type: "wallet",
  },
  {
    wallet: "0xA01d539e7B8c25bDc97a8f243E33f55F5A6c7558",
    balance: "1056531.535363907152899416",
    type: "wallet",
  },
  {
    wallet: "0xA5722F85B958D55B2493D5E36cbf83d51B5e6461",
    balance: "985443.670000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x71Ed77D0a7AeD172652923e25B792B83aee74994",
    balance: "680861.190000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x2cFc2b78EDAEA7AE47eF7d171AA981BA785b03da",
    balance: "679680.499400266000000000",
    type: "wallet",
  },
  {
    wallet: "0x623191d0a9b5B40A223b185cf359c10aED011308",
    balance: "670898.903968761339135706",
    type: "wallet",
  },
  {
    wallet: "0xEC20749241a29c7f3752d30E14dec845442861D0",
    balance: "606321.208018195474631012",
    type: "wallet",
  },
  {
    wallet: "0x275304A611b2aBd943af6aeeDae42885E9Bd7F54",
    balance: "583462.003610712249488198",
    type: "wallet",
  },
  {
    wallet: "0x185Ef50cF35263160B24cdED5B1EA946F064D2f0",
    balance: "577955.860121715141640891",
    type: "wallet",
  },
  {
    wallet: "0x40ECdee9f24633271d2a30e7b647F5FA90389463",
    balance: "562040.869984436602742868",
    type: "wallet",
  },
  {
    wallet: "0x8D8690c80d9903C5b27324186Cc10b034B2AFbAb",
    balance: "556817.150000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xf5291B90174dEb817476773b7A566d8e8E1326A9",
    balance: "537905.297228613021606369",
    type: "wallet",
  },
  {
    wallet: "0x7ea388ffB329DDE28664921C86690FB46c80Dc54",
    balance: "517445.402564128796968115",
    type: "wallet",
  },
  {
    wallet: "0xE3b04f64c7D9FE4717cD730509Dc60048fA29F17",
    balance: "517433.034107980005007160",
    type: "wallet",
  },
  {
    wallet: "0x4314D6c3bC17A6Ca9f928AE873a0f800eBec0162",
    balance: "443192.661948007743757528",
    type: "wallet",
  },
  {
    wallet: "0xa2b85d909559491F4Fc29a196cb2a889453144C1",
    balance: "403078.389343632949317245",
    type: "wallet",
  },
  {
    wallet: "0x83E0fcd27F7D43627F7D2fd03c26dB452F0e8A6B",
    balance: "395888.510000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xAD4166C6204025cE9676c7b0c9b9Fe7eb8E946c4",
    balance: "378170.622746115322861133",
    type: "wallet",
  },
  {
    wallet: "0xAB80857d2a98AbF59c7700dF101f3C975b191a87",
    balance: "327250.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x4E2e6867950EC3342CaB1694facCC1Bd697969f1",
    balance: "302610.564657006412959272",
    type: "wallet",
  },
  {
    wallet: "0xCD76eDF65ad71d889557D1b1e52d8F835C3ECB70",
    balance: "300000.000000003012257243",
    type: "wallet",
  },
  {
    wallet: "0x9805F726B61dd9734474936DE2568ae05B43422A",
    balance: "252237.621194530085588726",
    type: "wallet",
  },
  {
    wallet: "0xB62F642d489f0ED524Dce84B35ED91021321FBbE",
    balance: "244144.320000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x26008B4Bcf67671F10C484eDF2eAA131E341a008",
    balance: "235027.543337670477424734",
    type: "wallet",
  },
  {
    wallet: "0x005AcD142Eb7F3749ddd09cC421C5261D6C43387",
    balance: "230000.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xeA89d221103029849D0c73Ba6dAaD7EEA816711C",
    balance: "227049.610000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xAB4cCEa6381e16753e878D935775F0aD9F3b59d1",
    balance: "222095.905000510000000000",
    type: "wallet",
  },
  {
    wallet: "0x905166555DF4ab6bDC06239Bf216300F7a5552fA",
    balance: "201264.961340165070922584",
    type: "wallet",
  },
  {
    wallet: "0x869A2F72dE1eD090557ca547aBd3B6804d9771A3",
    balance: "190141.258805658577968965",
    type: "wallet",
  },
  {
    wallet: "0x05DC467b8173A6C4e8fB222Df4E6b3A80B9D1673",
    balance: "187155.417672947977972877",
    type: "wallet",
  },
  {
    wallet: "0x9A24FA48dB540bEc59d4D48df5ABc77031ffC28d",
    balance: "179989.360000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x9523b5a0aFfa9caB98E460046ab9775e6E438B51",
    balance: "178300.000000100000000000",
    type: "wallet",
  },
  {
    wallet: "0x5909B05f1B9141D693d7bf5CB97F8443D8c6C05e",
    balance: "173333.540953680466287581",
    type: "wallet",
  },
  {
    wallet: "0x5Cf7a2e04522494D25bd2385b0C7D985B12530F8",
    balance: "164511.078767256577296110",
    type: "wallet",
  },
  {
    wallet: "0x5E2797db5DfCa21788E4eCB191692CC338c17ac4",
    balance: "162425.095000111375000000",
    type: "wallet",
  },
  {
    wallet: "0xbF5A63323C76FDeE2cC21D95B93970eF9b17b2a3",
    balance: "151106.350999370542378836",
    type: "wallet",
  },
  {
    wallet: "0x2810E2cBDfb45e03BC61D04F1Bd66624A5716A3e",
    balance: "143336.967263827601956400",
    type: "wallet",
  },
  {
    wallet: "0xF22828be0EDBe9dA75d0F1C23Df5472cc14b2aF6",
    balance: "136844.796133359432159342",
    type: "wallet",
  },
  {
    wallet: "0x9e138C3C1249f1627168D02359A4BA82e5f2EBd4",
    balance: "134759.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x995C2Fc66A098B74CC44e85dd9A469bbD0602157",
    balance: "126148.353309351761101539",
    type: "wallet",
  },
  {
    wallet: "0xA871A680eF8c87208BB88A7AfDa2BE83909F728F",
    balance: "122607.850000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xBcf5b55aDA4E15bA3C14d8E9C2eD0513b74197F4",
    balance: "121023.721251084610900597",
    type: "wallet",
  },
  {
    wallet: "0xc997763941826618EDEbc37469328b38b618a3f4",
    balance: "119419.467776783081929726",
    type: "wallet",
  },
  {
    wallet: "0x451a8E6191b3F9C2B885d02aD339D4Ec11f144Aa",
    balance: "118158.777328872443119969",
    type: "wallet",
  },
  {
    wallet: "0x372A6B812B287061eBA0108F157358BfA671E311",
    balance: "109222.700000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x0B65ad577c372be48196597394E05d0e3E28931D",
    balance: "108255.162281535233232794",
    type: "wallet",
  },
  {
    wallet: "0x0dc918772E8787E5C58E58457368EbCC447487aF",
    balance: "106265.174114653211016940",
    type: "wallet",
  },
  {
    wallet: "0x00fa2A077C9446a6b42406fdF1372855056337d3",
    balance: "101684.271292815520878417",
    type: "wallet",
  },
  {
    wallet: "0x0aBf7Ab993BF9879173A92A005669F548f58DeCC",
    balance: "100355.404325145324433170",
    type: "wallet",
  },
  {
    wallet: "0xfF983307058dA622633CFCD2caCE59A90532228c",
    balance: "100000.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x26851D11a9FB5CEdB413324454b1417E4DD96398",
    balance: "97616.556682224552817768",
    type: "wallet",
  },
  {
    wallet: "0xEffE60Ec0BD219760eB40E8b810c54dd2EDdC351",
    balance: "95191.887575991033875498",
    type: "wallet",
  },
  {
    wallet: "0xaB56b3eE0793a7D3b2f2926B10b07Ac3B5606189",
    balance: "88976.587871734272405776",
    type: "wallet",
  },
  {
    wallet: "0x9fD50B2E5610e274354a58B7A06fE2e514280fe2",
    balance: "84062.676852891231641201",
    type: "wallet",
  },
  {
    wallet: "0x300C51e7D1143B1A959EB6896ECb17aa936AaE87",
    balance: "75000.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x9a3B9093750f48d92ddcd1a9C37369e2922901D3",
    balance: "73918.037317473180103311",
    type: "wallet",
  },
  {
    wallet: "0x9C24D8d1d5922bcd84CfB0AC79cc67dF9d2CE918",
    balance: "72218.282233070711054486",
    type: "wallet",
  },
  {
    wallet: "0x23Ce36e5cC61c759E5ffb266D537f1B7FCe80363",
    balance: "68324.974683890548812370",
    type: "wallet",
  },
  {
    wallet: "0x3B85bf5945b705094cb6463AD409759814392A5d",
    balance: "67049.450847073952388998",
    type: "wallet",
  },
  {
    wallet: "0x0fA8e6518E2f5c2FCF5c2d09f8b2ca443BD5b853",
    balance: "62981.284063936731860077",
    type: "wallet",
  },
  {
    wallet: "0xdeEF31E7b740A8878d5e908eA86Ac0514AF59a72",
    balance: "60384.366899336161448793",
    type: "wallet",
  },
  {
    wallet: "0x2d9c446b2C683b500414711109FdaC06075aAC54",
    balance: "52455.920000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x6cC1D2178F0f5d300999D510e8c1C8350e55863c",
    balance: "50139.747135374680225639",
    type: "wallet",
  },
  {
    wallet: "0x7ac9F5788480E9099D82822d9e22c3179Ff561aD",
    balance: "45393.573773905143954363",
    type: "wallet",
  },
  {
    wallet: "0x71a7bb6D605c773af277cDfb2699460565673536",
    balance: "41359.215000085000000000",
    type: "wallet",
  },
  {
    wallet: "0x2b8c72dAC2eb17A659713E1cba9917809d476AF1",
    balance: "38606.256287195141496881",
    type: "wallet",
  },
  {
    wallet: "0xdf18a1Fba13D9b19A8e18f6F51BaA29A787f177a",
    balance: "34281.685471758170289194",
    type: "wallet",
  },
  {
    wallet: "0x83a2dB153a52A031C9eA601C28bD68B125C80600",
    balance: "33216.677864356638429227",
    type: "wallet",
  },
  {
    wallet: "0xB61058Be83E9893da0363fB39cEc3AdEcDEb88b4",
    balance: "32524.479124834999836702",
    type: "wallet",
  },
  {
    wallet: "0xa66CB18766461203b0912F65f7E9b97604bfA779",
    balance: "32376.888946634952965102",
    type: "wallet",
  },
  {
    wallet: "0x0b23F70874c68410C240d1627B455C7556382493",
    balance: "32108.280000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xE30969fb2A9531b21c54DB1ec0d04f30f7e77551",
    balance: "29060.558751880677148485",
    type: "wallet",
  },
  {
    wallet: "0xA40B82172B9FD9786b09Eb330d8b810c363A79e7",
    balance: "27161.204411263969721363",
    type: "wallet",
  },
  {
    wallet: "0x00173C4cB23E6d876fcb036bA954A2F9cfCafA19",
    balance: "26265.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xdb77B36dC774277fD1a8491A3Ff3193e2497ae76",
    balance: "25733.519203909048993531",
    type: "wallet",
  },
  {
    wallet: "0xdb1DF42bf90d738487eC536C19fC3715159636dE",
    balance: "25500.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xC8477a946314bC058984f412Ca771eB18A54f4C7",
    balance: "21544.113464554169493141",
    type: "wallet",
  },
  {
    wallet: "0x11d2F6C27dfe191Cda9f4E0d4C4E5405E3fCC904",
    balance: "17918.575200000000000000",
    type: "wallet",
  },
  {
    wallet: "0x36ab674a2DD1EB91C1257995dCcCd22646FB4541",
    balance: "17845.330675353358185896",
    type: "wallet",
  },
  {
    wallet: "0xfF60d580ef1C9940F4C8878027F16126f8E28da8",
    balance: "17374.299193531297323289",
    type: "wallet",
  },
  {
    wallet: "0x875688C0F38F887a54706a6C1b5Fa4F5E2458C92",
    balance: "16357.347778321216845342",
    type: "wallet",
  },
  {
    wallet: "0x2536fF21Fe80ac629Ef82228307E4538bebfEecb",
    balance: "15184.260000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x739f127DBB208e90e890A967fA16533d32599DeA",
    balance: "13704.777399630893110114",
    type: "wallet",
  },
  {
    wallet: "0x40391562bc8e2A614316Cf5f5F019Df1317764Bf",
    balance: "12147.293426076661916399",
    type: "wallet",
  },
  {
    wallet: "0xD427a343f5E7f1d967e0c7e7913f6946bd4516aC",
    balance: "11973.752339625078899103",
    type: "wallet",
  },
  {
    wallet: "0xA5465C8CB3DE3C94e0161Cb41618Cf1c0d0baA1c",
    balance: "10584.560000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x9b872b6bB0A34a5c85fBb540beA0f794C8F48b34",
    balance: "10000.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x38b7006B694bCcd214EeA82dA4f5906955a337eF",
    balance: "9120.048211685123786465",
    type: "wallet",
  },
  {
    wallet: "0x40C5fd17d0aFbE8db3AF41BC6B641fA04C372e2a",
    balance: "8844.600000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x5E1ec9bDbf175206B4Ea74EFCd5D0Ef8b28e5349",
    balance: "8517.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xb24d6d0b888C3f095864597CFc0d63a153AFefbC",
    balance: "7878.528596673132869021",
    type: "wallet",
  },
  {
    wallet: "0x9D635a1443165d9647B50cc8683b33E2D18c0c2b",
    balance: "7430.618311361842542588",
    type: "wallet",
  },
  {
    wallet: "0xCf5702d56146120cda2D546AAdb2a5710400d5Ca",
    balance: "7252.731776688726478501",
    type: "wallet",
  },
  {
    wallet: "0x62B716A2b3B1cB59c8D50D7fd80f22d236C4E019",
    balance: "6125.020000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xc28693Cf42969535f7e28154242f8F0f1f0497ed",
    balance: "5978.810000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x3560580BBe7411a963B859f5017320790901a4Fb",
    balance: "5877.797521785675602122",
    type: "wallet",
  },
  {
    wallet: "0x31b7713b1CDFa8deE88ffC0af0c9a1C9eCA59aCf",
    balance: "5732.660000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xD739ad6958B91c038dB39e97F25Cd8EBFC16Ce96",
    balance: "5696.372884162675205726",
    type: "wallet",
  },
  {
    wallet: "0xb985333404FFe6804ec6b8C342C463d916bbDA3A",
    balance: "5507.920870658383234582",
    type: "wallet",
  },
  {
    wallet: "0x206710759F9c6ad87490a131Ab31255b38A423EB",
    balance: "5373.330000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x74AB9aa51EBa62Fb8e1F70e5004c85C775f3dAC7",
    balance: "4652.040000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x7abFA1E1c78DfAd99A0428D9437dF05157c08FcC",
    balance: "4250.101401515895994937",
    type: "wallet",
  },
  {
    wallet: "0x56609b9003d5504b9e66D55D7AdC64Bf3EF0F977",
    balance: "4157.362579346709320908",
    type: "wallet",
  },
  {
    wallet: "0xAaA9A569c2e631B4e33e62d044020f21c114f450",
    balance: "3947.366000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x6ea622c5ea3c67306707C81F9276e6110e18FA9d",
    balance: "3596.290000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x09D125f628e6E3611923089A1972eF94f171A1e7",
    balance: "3517.524509139261367820",
    type: "wallet",
  },
  {
    wallet: "0xFEc48eF49025E3dA267675108A2f42652Bf6EEf7",
    balance: "3317.381739368759079435",
    type: "wallet",
  },
  {
    wallet: "0xb3E981b5664B509DEfa3c51A61ACC1C40321Bd15",
    balance: "3127.310560446624244447",
    type: "wallet",
  },
  {
    wallet: "0x53D092771894e5Ccdd1Fc6322Ed7128E58eb20fB",
    balance: "3107.609815238159350396",
    type: "wallet",
  },
  {
    wallet: "0x3a50ff7709B7E426266bBa2558A742dB856e793A",
    balance: "2990.665592132489658410",
    type: "wallet",
  },
  {
    wallet: "0x2b60560Fef1A87fD2C5D379216486E6E44572Fbc",
    balance: "2894.984222982132952474",
    type: "wallet",
  },
  {
    wallet: "0xAb2d8B59131EF2439e0dDA74aa3274aA8Ab3b4c4",
    balance: "2693.703037385744418276",
    type: "wallet",
  },
  {
    wallet: "0xEe01E7B9e1bBb59b5a2ccC3C5fB7Cc9DF036C3B0",
    balance: "2675.088790730993982542",
    type: "wallet",
  },
  {
    wallet: "0xc5E3e804a39919d5e3821D204Bb38356d00C162c",
    balance: "1917.640000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x931E976Ef3419b62a329341e6Ba44936026be3ef",
    balance: "1500.000000000000000000",
    type: "wallet",
  },
  {
    wallet: "0xa50a90A7C3F8c83fa1e83EbcED8B0E4DaE581Bcc",
    balance: "1471.520699169956646282",
    type: "wallet",
  },
  {
    wallet: "0xE416cCe8267E0dFcb017E55b2DF78869dAB520D1",
    balance: "1408.637914651848801963",
    type: "wallet",
  },
  {
    wallet: "0x74F3acb558017F2987e17d27b1CD101100e33095",
    balance: "1178.700000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x8DC4397696dDd4af057e748d39804b269d6f3205",
    balance: "860.599500000000000000",
    type: "wallet",
  },
  {
    wallet: "0x0E9BeE48AeC47d51C48508d20dB2EB07D6d88856",
    balance: "389.849443482097693126",
    type: "wallet",
  },
  {
    wallet: "0x67Da0DC9D6E6d163d1F9C274314d7331E9eCfC45",
    balance: "324.470000000000000000",
    type: "wallet",
  },
  {
    wallet: "0x5f785Ec419D6E3ef1F7b50923f0D000bE8C3b6Bc",
    balance: "311.108905792026111288",
    type: "wallet",
  },
  {
    wallet: "0x535926b17b9df2CD132E1Ff123CB49DbF6FF1834",
    balance: "280.200039245570638502",
    type: "wallet",
  },
  {
    wallet: "0xC7Db0D4845B55aD131d46dFBd25f76240A9652Ee",
    balance: "270.226177620240679088",
    type: "wallet",
  },
  {
    wallet: "0xfCCF84B3b483d1d8a60c298EB0F7Dd5Fe1fBca06",
    balance: "9.184836280763882878",
    type: "wallet",
  },
  {
    wallet: "0xAE2CfE8cfaB2A484EA73980cd87135DbFE3515ce",
    balance: "0.880000000000000000",
    type: "wallet",
  },
];

export const TradePage: React.FC = () => {
  const { t } = useTranslation("trade");

  // const addresses = exported.map((item) => item.wallet);

  // const balances = exported.map((item) =>
  //   BigNumber(item.balance).multipliedBy(1e18).toFixed()
  // );

  // console.log(JSON.stringify(addresses), JSON.stringify(balances));

  return (
    <Layout fullWidth padded={false}>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <Trade />
    </Layout>
  );
};
