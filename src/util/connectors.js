import { Connect, SimpleSigner } from 'uport-connect'

//export let uport = new Connect('TruffleBox')

export let uport = new Connect('Campaign', {
    clientId: '2ovzzqEkvY8P4iB1Jw2pEXv1ZuGR91gYvyW',
    network: 'rinkeby',
    signer: SimpleSigner('324fa9a9ce5d6987a4be360a150ed39a0c56711b1fd0b346e54a0eb30ef1b78f')
})

export const web3 = uport.getWeb3()
