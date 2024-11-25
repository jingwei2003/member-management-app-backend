import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueContactNumber1732441350983 implements MigrationInterface {
    name = 'UniqueContactNumber1732441350983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "member"
            ADD CONSTRAINT "UQ_2a358ec563b551948419c53a51e" UNIQUE ("contactNumber")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "member" DROP CONSTRAINT "UQ_2a358ec563b551948419c53a51e"
        `);
    }

}
