import {MigrationInterface, QueryRunner} from "typeorm";

export class mig1648582513842 implements MigrationInterface {
    name = 'mig1648582513842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(24) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
    }

}
