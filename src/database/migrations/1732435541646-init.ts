import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732435541646 implements MigrationInterface {
    name = 'Init1732435541646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."member_bloodtype_enum" AS ENUM('A', 'B', 'AB', 'O')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."member_gender_enum" AS ENUM('male', 'female')
        `);
        await queryRunner.query(`
            CREATE TABLE "member" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "fullName" character varying NOT NULL,
                "contactNumber" integer NOT NULL,
                "bloodType" "public"."member_bloodtype_enum" NOT NULL,
                "gender" "public"."member_gender_enum" NOT NULL,
                "birthday" date NOT NULL,
                CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "fullName" character varying NOT NULL,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "member"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."member_gender_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."member_bloodtype_enum"
        `);
    }

}
