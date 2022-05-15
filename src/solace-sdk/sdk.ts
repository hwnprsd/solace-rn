import { Program } from "../@project-serum/anchor";
import { Solace } from "./solace/types";
import * as anchor from "../@project-serum/anchor";
import { findProgramAddressSync } from "../@project-serum/anchor/dist/cjs/utils/pubkey";
import { Utils } from "./utils";
import { ApiProvider } from "./api";
import { BN } from "../@project-serum/anchor/dist/cjs";

const { Keypair, LAMPORTS_PER_SOL } = anchor.web3;

interface SolaceSDKData {
  apiProvider: ApiProvider;
  program: Program<Solace>;
  owner: anchor.web3.Keypair;
}

export class SolaceSDK {
  // @ts-ignore
  wallet: anchor.web3.PublicKey;
  helper: Utils;
  apiProvider: ApiProvider;
  owner: anchor.web3.Keypair;
  program: Program<Solace>;
  // @ts-ignore
  seed: anchor.web3.PublicKey;

  static fromSeed(seed: string, data: SolaceSDKData) {
    const sdk = new this({
      ...data,
    });
    sdk.seed = new anchor.web3.PublicKey(seed);
  }

  constructor(data: SolaceSDKData) {
    this.helper = new Utils(data.program);
    this.program = data.program;
    this.owner = data.owner;
    this.apiProvider = data.apiProvider;
  }

  fetchWalletData = () => this.fetchDataForWallet(this.wallet);
  fetchDataForWallet = (wallet: anchor.web3.PublicKey) =>
    this.program.account.wallet.fetch(wallet);
  confirmTx = (tx: any) => this.program.provider.connection.confirmTransaction(tx);

  /**
   * Create a new Solace wallet
   * @param {anchor.web3.Keypair} signer
   */
  async createWalletWithName(signer: anchor.web3.Keypair, name: string) {
    const seedBase = Keypair.generate();
    const [walletAddress, walletBump] = findProgramAddressSync(
      [Buffer.from("SOLACE"), seedBase.publicKey.toBuffer()],
      this.program.programId
    );

    // await this.apiProvider.requestAirdrop(this.owner.publicKey);
    // await this.program.provider.connection.confirmTransaction(
    //   await this.program.provider.connection.requestAirdrop(
    //     this.owner.publicKey,
    //     1 * LAMPORTS_PER_SOL
    //   )
    // );

    const tx = await this.program.rpc.createWallet(
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
      }
    );
    this.wallet = walletAddress;
    this.seed = seedBase.publicKey;
    console.log(this.seed)

    await this.confirmTx(tx);
    console.log(tx, "Transaction ID")

    // await this.apiProvider.setName(walletAddress.toString(), name);
  }

  /**
   * Add a guardian to the wallet, signed by the owner
   * @param {anchor.web3.PublicKey} guardianPublicKey
   */
  async addGuardian(
    guardianPublicKey: anchor.web3.PublicKey
  ): Promise<boolean> {
    try {
      const walletData = await this.fetchWalletData();
      await this.program.rpc.addGuardians(
        [guardianPublicKey],
        walletData.approvedGuardians.length + 1,
        {
          accounts: {
            wallet: this.wallet,
            owner: this.owner.publicKey,
          },
          signers: [this.owner],
        }
      );

      const tx = await this.apiProvider.addGuardian(
        this.owner.publicKey,
        guardianPublicKey
      );
      await this.confirmTx(tx);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * FOR - User to remove a guardian
   */
  async removeGuardian(
    guardianAdress: anchor.web3.PublicKey
  ): Promise<boolean> {
    try {
      const tx = await this.program.rpc.removeGuardians({
        accounts: {
          wallet: this.wallet,
          guardian: guardianAdress,
          owner: this.owner,
        },
      });
      this.confirmTx(tx);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   * @returns
   */
  async getGuardianData() {
    return this.apiProvider.getGuardianData(this.owner.publicKey);
  }

  /**
   * Checks if the given wallet address is in recovery mode
   * @param wallet The wallet to be checked
   * @returns
   */
  async isInRecovery(wallet: anchor.web3.PublicKey): Promise<boolean> {
    return (await this.fetchDataForWallet(wallet)).recoveryMode as boolean;
  }

  /**
   * Approve recovery with a solace wallet
   * @param addressToRecover
   * @returns
   */
  async approveRecovery(addressToRecover: anchor.web3.PublicKey) {
    try {
      const walletData = await this.fetchDataForWallet(addressToRecover);
      const [recoveryAddress, bump] = findProgramAddressSync(
        [
          addressToRecover.toBuffer(),
          new BN(walletData.walletRecoverySequence).toBuffer("le", 8),
        ],
        this.program.programId
      );
      const tx = await this.program.rpc.approveRecoveryBySolace({
        accounts: {
          walletToRecover: addressToRecover,
          owner: this.owner,
          guardianWallet: this.wallet,
          recoveryAttempt: recoveryAddress,
        },
      });
      this.confirmTx(tx);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Create an account, just to recover an existing one
   * @param newOwner
   * @param addressToRecovery
   */
  async createWalletToRequestRecovery(
    newOwner: anchor.web3.Keypair,
    addressToRecover: anchor.web3.PublicKey
  ) {
    // TODO: Airdrop
    const walletData = await this.fetchDataForWallet(addressToRecover);
    const [recoveryAddress, bump] = findProgramAddressSync(
      [
        addressToRecover.toBuffer(),
        new BN(walletData.walletRecoverySequence).toBuffer("le", 8),
      ],
      this.program.programId
    );
    const tx = await this.program.rpc.initiateWalletRecovery(
      newOwner.publicKey,
      bump,
      {
        accounts: {
          wallet: addressToRecover,
          recovery: recoveryAddress,
          proposer: newOwner.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [newOwner],
      }
    );
    this.confirmTx(tx);
  }
}