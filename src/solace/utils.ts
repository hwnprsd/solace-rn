import * as anchor from '../@project-serum/anchor';
import {Solace} from './solace/types';

export class Utils {
  constructor(private readonly program: anchor.Program<Solace>) {}
}
