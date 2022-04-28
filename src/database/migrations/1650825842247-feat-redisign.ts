import {MigrationInterface, QueryRunner} from "typeorm";

export class featRedisign1650825842247 implements MigrationInterface {
    name = 'featRedisign1650825842247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" ALTER COLUMN "posted" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" ALTER COLUMN "posted" DROP NOT NULL`);
    }

}
