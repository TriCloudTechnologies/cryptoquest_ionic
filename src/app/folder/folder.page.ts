import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import * as waxjs from '@waxio/waxjs/dist';
import * as bs58 from 'bs58';
import * as solana from '@solana/web3.js';
import * as solanaWeb3 from '@solana/web3.js';
import * as Transaction from '@solana/web3.js';
import * as keypair from '@solana/web3.js';
import * as Keypair from '@solana/web3.js';
import * as SystemProgram from '@solana/web3.js';
import * as LAMPORTS_PER_SOL from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { Script } from 'vm';
//import * as splToken from '@solana/spl-token';
import { HttpClient } from '@angular/common/http';
export {};
declare global {
  interface Window {
    solana: any;
  }
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private iab: InAppBrowser,
    private httpclient: HttpClient
  ) {}
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  // wax wallet integration
  wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com',
  });

  // autoLogin();

  //checks if autologin is available
  // async autoLogin() {
  //   let isAutoLoginAvailable = await this.wax.isAutoLoginAvailable();
  //   if (isAutoLoginAvailable) {
  //     let userAccount = this.wax.userAccount;
  //     let pubKeys = this.wax.pubKeys;
  //     let str =
  //       'AutoLogin enabled for account: ' +
  //       userAccount +
  //       '<br/>Active: ' +
  //       pubKeys[0] +
  //       '<br/>Owner: ' +
  //       pubKeys[1];
  //     document.getElementById('autologin').insertAdjacentHTML('beforeend', str);
  //   } else {
  //     document
  //       .getElementById('autologin')
  //       .insertAdjacentHTML('beforeend', 'Not auto-logged in');
  //   }
  // }

  //normal login. Triggers a popup for non-whitelisted dapps
  async login() {
    try {
      const userlog = await this.wax.login();
      console.log('this is after the login:');
      console.log(userlog);

      const name = this.wax.userAccount;
      console.log('this is the account id of the user:');
      console.log(name);

      const pubkeey = this.wax.pubKeys;
      console.log('this is the public key of the user:');
      console.log(pubkeey);

      console.log('this is the account 00 of the user:');
      const user = this.wax.user;
      console.log(user);

      var workingrpc = this.wax.rpc.get_account(name);
      console.log('the api is working');
      console.log(workingrpc);
    } catch (e) {}
    console.log('function is working');
  }

  async sign() {
    if (!this.wax.api) {
      return document.getElementById('response').append('* Login first *');
    }
    try {
      const result = await this.wax.api.transact(
        {
          actions: [
            {
              account: 'eosio',
              name: 'delegatebw',
              authorization: [
                {
                  actor: this.wax.userAccount,
                  permission: 'active',
                },
              ],
              data: {
                from: this.wax.userAccount,
                receiver: this.wax.userAccount,
                stake_net_quantity: '0.00000001 WAX',
                stake_cpu_quantity: '0.00000000 WAX',
                transfer: false,
                memo: 'This is a WaxJS/Cloud Wallet Demo.',
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
      document
        .getElementById('response')
        .append(JSON.stringify(result, null, 2));
    } catch (e) {
      document.getElementById('response').append(e.message);
    }
  }

  Nft() {
    // var authUrl='http://metastashadmin.com/api/getNGOs';
    //     let browser = this.iab.create(
    //       authUrl,
    //       '_blank',
    //       'location=no'
    //     );
    // browser.on('loadstop').subscribe((ev: InAppBrowserEvent) => {
    //       if (0 === ev.url.indexOf('http://metastashadmin.com/api/getNGOs')) {
    //         browser.executeScript({code: 'requestCredentials();'})
    //           .then((credentials) => {
    //             alert(JSON.stringify(credentials[0]));
    //             this.getAuthDataFromPostMessage(credentials[0]);

    //             let pollerObserv = Observable.interval(400);

    //             let pollerSubscription = pollerObserv.subscribe(() => {
    //               if(this.userSignedIn()){
    //                 pollerSubscription.unsubscribe();
    //                 browser.close();
    //               }
    //             });

    //           })
    //       }

    //     });
    // var target = '_blank';
    //var options = 'location=yes,hidden=yes,beforeload=yes';

    //this is for inapp browser logic:

    const check = this.iab.create('https://all-access.wax.io/');
    //getting the appbrowser data:
    check.on('loadstop').subscribe((event) => {
      console.log('urlss ' + event.url);
      var urlSuccessPage = 'https://all-access.wax.io/cloud-wallet/login/';
      if(event.url == 'https://all-access.wax.io/cloud-wallet/login/') {
        console.log('login api called');
      }
      this.httpclient.get(urlSuccessPage).subscribe((data) => {
        console.log('api response data: ' + data);
      });
      if (event.url == urlSuccessPage) {
        check.close();

        //   return $HTTP({
        //     method: 'GET',
        //     url: urll,
        //   }).then(
        //     function successCallback(response) {
        //       console.log(response);
        //     },
        //     function errorCallback(response) {
        //       console.log('LoginService Failed');
        //     }
        //   );
        // }

        // //if url is specified close the inapp browser
        // if (event.url == urlSuccessPage) {
        //   check.close();
        // }
      }
    });

    check.on('loadstart').subscribe(event => { 
      alert('urlll ' + event.type + ' - ' + event.url);
    });

    // check.on('loadstart').subscribe(event=>{
    //   check.close;
    // });
    //inAppBrowserRef.executeScript('loadstart', loadStartCallBack);
    // inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
    // var gett = this.wax.rpc.get_account("1sc2k.c.wam");
    // console.log(gett);
  }

  //Phantom Functions for Solana
  async phantomlogin() {
    window.solana.connect;
    const resp = window.solana.request({ method: 'connect' });
    const keyys = resp;
    console.log(keyys);
    // try {
    //   const resp = await window.solana.request({ method: 'connect' });
    //   var key = resp.publicKey.toString();
    //   console.log(key);
    //   // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
    // } catch (err) {
    //   // { code: 4001, message: 'User rejected the request.' }
    // }
    // console.log('if condition is working popup');
    this.iab.create;
    // //for in app browser //this.iab.create('https://phantom.app/').show();
    // window.open('https://phantom.app/', '_system', 'location=yes');
    // console.log('else condition is working website');
  }

  async autologphantom() {
    try {
      const autolog = await window.solana.request({
        method: 'connect',
        params: { onlyIfTrusted: true },
      });
      autolog.publicKey.toString();
    } catch (err) {}
  }

  disconnectphantom() {
    window.solana.disconnect();
    window.solana.on('disconnect', () => console.log('disconnected!'));
  }

  async PhantomSign() {
    const network = '<NETWORK_URL>';
    const connection = new solana.Connection(network);
    const transaction = new solana.Transaction();
    const { signature } = await window.solana.request({
      method: 'signAndSendTransaction',
      params: {
        message: bs58.encode(transaction.serializeMessage()),
      },
    });
    await connection.confirmTransaction(signature);
  }

  async SignMessage() {
    const message = `To avoid digital dognappers,
    sign below to authenticate with CryptoCorgis`;
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await window.solana.request({
      method: 'signMessage',
      params: {
        message: encodedMessage,
        display: 'hex',
      },
    });
  }

  solana() {
    //console.log(solanaWeb3);
    console.log(keypair);
  }

  Transactionforsolana() {
    const {
      Keypair,
      Transaction,
      SystemProgram,
      LAMPORTS_PER_SOL,
    } = require('@solana/web3.js');

    let fromKeypair = Keypair.generate();
    let toKeypair = Keypair.generate();
    let transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL,
      })
    );
  }

  getProvider = async () => {
    if ('solana' in window) {
      // opens wallet to connect to
      let resp = await window.solana.connect();

      window.solana.on('connect', () => console.log('connected!'));
      const provider = window.solana;
      if (provider.isPhantom) {
        console.log('Is Phantom installed?  ', provider.isPhantom);
        console.log(resp);
        return provider;
      }
    } else {
      window.open('https://www.phantom.app/', '_blank');
    }
  };

  async transferSOL() {
    // Detecing and storing the phantom wallet of the user (creator in this case)
    var provider = await this.getProvider();
    console.log('Public key of the emitter: ', provider.publicKey.toString());

    // Establishing connection
    var connection = new web3.Connection(web3.clusterApiUrl('devnet'));

    // I have hardcoded my secondary wallet address here. You can take this address either from user input or your DB or wherever
    var recieverWallet = new web3.PublicKey(
      'CkiKLEa9eSEoG6CoTSuaahsF2WqNgArnvoCSbNZjJ7BQ'
    );

    // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee
    var airdropSignature = await connection.requestAirdrop(
      provider.publicKey,
      web3.LAMPORTS_PER_SOL
    );

    // Confirming that the airdrop went through
    await connection.confirmTransaction(airdropSignature);
    console.log('Airdropped');

    var transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: recieverWallet,
        lamports: web3.LAMPORTS_PER_SOL, //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
      })
    );

    // Setting the variables for the transaction
    transaction.feePayer = await provider.publicKey;
    let blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = await blockhashObj.blockhash;

    // Transaction constructor initialized successfully
    if (transaction) {
      console.log('Txn created successfully');
    }

    // Request creator to sign the transaction (allow the transaction)
    let signed = await provider.signTransaction(transaction);
    // The signature is generated
    let signature = await connection.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
    await connection.confirmTransaction(signature);

    //Signature chhap diya idhar
    console.log('Signature: ', signature);
  }
}
