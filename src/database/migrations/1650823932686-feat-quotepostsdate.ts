import {MigrationInterface, QueryRunner} from "typeorm";

export class featQuotepostsdate1650823932686 implements MigrationInterface {
    name = 'featQuotepostsdate1650823932686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" ADD "posted" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" DROP COLUMN "posted"`);
    }

}
