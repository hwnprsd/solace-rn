import {Solace} from './solace/types';
import * as anchor from '../@project-serum/anchor';
import {Utils} from './utils';
import {ApiProvider} from './api';
import {findProgramAddressSync} from '../@project-serum/anchor/dist/cjs/utils/pubkey';
const {Keypair, LAMPORTS_PER_SOL} = anchor.web3;
const {BN, Program} = anchor;

export class SolaceSDK {
  wallet: anchor.web3.PublicKey;
  helper: Utils;

  constructor(
    private readonly apiProvider: ApiProvider,
    private readonly program: anchor.Program<Solace>,
    private readonly owner?: anchor.web3.Keypair,
  ) {
    this.helper = new Utils(program);
  }

  fetchWalletData = (address: anchor.web3.PublicKey = this.wallet) =>
    this.program.account.wallet.fetch(address);

  /**
   * Create a new Solace wallet
   * @param {anchor.web3.Keypair} signer
   */
  async createWalletWithName(signer: anchor.web3.Keypair, name: string) {
    const seedBase = Keypair.generate();
    if (!this.owner) return;
    const [walletAddress, walletBump] = findProgramAddressSync(
      [Buffer.from('SOLACE'), seedBase.publicKey.toBuffer()],
      this.program.programId,
    );
    // await this.apiProvider.requestAirdrop(this.owner.publicKey);
    // await this.program.provider.connection.confirmTransaction(
    //   await this.program.provider.connection.requestAirdrop(
    //     this.owner.publicKey,
    //     1 * LAMPORTS_PER_SOL,
    //   ),
    // );

    console.log('Calling');
    const res = await this.program.rpc.createWallet(
      this.owner.publicKey,
      [],
      0,
      walletBump,
      {
        accounts: {
          signer: this.owner.publicKey,
          base: seedBase.publicKey,
          wallet: walletAddress,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [this.owner],
      },
    );
    console.log(`Wallet Generated`);
    console.log(walletAddress.toString());
    this.wallet = walletAddress;
    await this.program.provider.connection.confirmTransaction(res);
  }

  /**
   * Add a guardian to the wallet, signed by the owner
   * @param {anchor.web3.PublicKey} guardianPublicKey
   */
  async addGuardian(guardianPublicKey: anchor.web3.PublicKey) {
    console.log(this.wallet.toString());
    const walletData = await this.program.account.wallet.fetch(this.wallet);
    await this.program.account.wallet.fetch(this.wallet);
    if (!this.owner) return;

    console.log({
      guardianPublicKey: guardianPublicKey.toString(),
      walletAddress: this.wallet.toString(),
      owner: this.owner.publicKey.toString(),
      walletData,
    });
    const res = await this.program.rpc.addGuardians([guardianPublicKey], 1, {
      accounts: {
        wallet: this.wallet,
        owner: this.owner.publicKey,
      },
      signers: [this.owner],
    });
    await this.program.provider.connection.confirmTransaction(res);
  }

  /**
   * FOR - User to remove a guardian
   */
  async removeGuardian(guardianAddress: anchor.web3.PublicKey) {}

  /**
   * {
   *  guardians: [''], -- The guardians of the user
   *  guarding: [{address: "", isInRecovery: ""}, {...}]  -- The users, the current user is gurading
   * }
   * @returns
   */
  async getGuardianData() {
    if (!this.owner) return;
    return this.apiProvider.getGuardianData(this.owner.publicKey);
  }

  /**
   *
   * @param address
   * @returns
   */
  async isInRecovery(address: anchor.web3.PublicKey) {
    return this.fetchWalletData(address);
  }

  /**
   * Send LAMPORTS of sol
   * @param address
   * @param lamports
   */
  async sendSol(address: anchor.web3.PublicKey, lamports: number) {}

  async approveRecovery(addressToRecover: anchor.web3.PublicKey) {}

  async createWalletAndRequestRecovery(
    newOwner: anchor.web3.Keypair,
    addressToRecover: anchor.web3.PublicKey,
  ) {}

  async getAddressByName(name: string) {}

  async getNameByAddress(address: anchor.web3.PublicKey) {}
}
