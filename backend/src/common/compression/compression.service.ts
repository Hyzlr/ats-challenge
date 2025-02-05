// lib
import { Global, Injectable } from '@nestjs/common';
import { inflate, deflate } from 'zlib';

@Global()
@Injectable()
export class CompressionService {
  constructor() {}

  /**
   * Compresses a given string using deflate compression algorithm.
   * The resulting compressed string is encoded in Base64 format for easy handling.
   *
   * @param {Object | Buffer | String | Number} payload - The string to be compressed.
   * @returns {Promise<string>} A promise that resolves to the compressed string in Base64 format.
   * @throws {Error} If compression fails, the promise is rejected with an error.
   */
  async compress<T extends object | Buffer | string | number>(
    payload: T,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      deflate(JSON.stringify(payload), (error, compressedString) => {
        if (error) {
          reject(error);
        } else {
          resolve(compressedString.toString('base64'));
        }
      });
    });
  }

  /**
   * Decompresses a given Base64-encoded compressed string back to its original form.
   * The method parses the decompressed string as JSON.
   *
   * @template T
   * @param {string} compressedString - The Base64-encoded compressed string to be decompressed.
   * @returns {Promise<T>} A promise that resolves to the decompressed object or string.
   * @throws {Error} If decompression or parsing fails, the promise is rejected with an error.
   */
  async decompress<T extends string | object>(
    compressedString: string,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      inflate(
        Buffer.from(compressedString, 'base64'),
        (error, decompressedString) => {
          if (error) {
            reject(error);
          } else {
            resolve(JSON.parse(decompressedString.toString()) as T);
          }
        },
      );
    });
  }
}
