// lib
import { Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompressionService } from 'src/common/compression/compression.service';
import { ConfigService } from 'src/common/config/config.service';

@ApiTags('Encryption')
@Controller('/encryption-keys')
export class ControllersController {
  constructor(
    private readonly configService: ConfigService,
    private readonly compressionService: CompressionService,
  ) {}

  /**
   * @swagger
   * /controllers/app-encryption-key:
   *   post:
   *     summary: Retrieve and compress the application encryption key.
   *     description: This endpoint retrieves the application encryption key from the configuration, compresses it using the CompressionService, and returns it in a compressed format.
   *     responses:
   *       200:
   *         description: Successfully retrieved and compressed encryption key.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 encryption_key:
   *                   type: string
   *                   description: Base64-encoded compressed encryption key.
   *                   example: "eJxLTE1Vw... (truncated)"
   *       500:
   *         description: Internal server error when fetching the encryption key.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: "Failed to fetch application encryption key"
   */
  @Post('/')
  async getAppEncryptionKey() {
    try {
      const compressedEncryptionKey = await this.compressionService.compress(
        this.configService.get('APP_ENCRYPTION_KEY'),
      );

      return {
        status: 200,
        encryption_key: compressedEncryptionKey,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message || 'Failed to fetch application encryption key',
      };
    }
  }
}
