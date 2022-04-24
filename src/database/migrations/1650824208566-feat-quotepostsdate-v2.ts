import {MigrationInterface, QueryRunner} from "typeorm";

export class featQuotepostsdateV21650824208566 implements MigrationInterface {
    name = 'featQuotepostsdateV21650824208566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" ALTER COLUMN "posted" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" ALTER COLUMN "posted" DROP NOT NULL`);
    }

}
