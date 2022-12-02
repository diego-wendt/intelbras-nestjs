import { MigrationInterface, QueryRunner } from "typeorm";

export class init1669931394489 implements MigrationInterface {
    name = 'init1669931394489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driver_licenses" ("id" SERIAL NOT NULL, "registry" character varying(10) NOT NULL, "category" character varying(5) NOT NULL, "block" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_73ae80fde8f6692dbdff58489e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccines" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "laboratory" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_195bc56fe32c08445078655ec5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccine-card" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4bc4543f1ff379495f335dc7c6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "persons" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, "vaccine_card_id" integer, CONSTRAINT "REL_38247cdafc33c29ff73f86c38a" UNIQUE ("driver_id"), CONSTRAINT "REL_551d8b4e3ef1a7c6b5c6e3277c" UNIQUE ("vaccine_card_id"), CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adresses" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zip" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "person_id" integer, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "code" character varying NOT NULL, "category" integer NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "active" boolean NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweets" ("id" SERIAL NOT NULL, "tweet" character varying(280) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "rua" character varying(100) NOT NULL, "bairro" character varying(20) NOT NULL, "cep" character varying(9) NOT NULL, "cidade" character varying(30) NOT NULL, "complemento" character varying(100) NOT NULL, "estado" character varying(2) NOT NULL, "pais" character varying(2) NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccinecard_vaccines" ("vaccineCardId" integer NOT NULL, "vaccinesId" integer NOT NULL, CONSTRAINT "PK_1601af30fc0d64841b8f83a560c" PRIMARY KEY ("vaccineCardId", "vaccinesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_486f884c64a0cfb123e6aaac86" ON "vaccinecard_vaccines" ("vaccineCardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e4eb24ea54151c8e0617b7445c" ON "vaccinecard_vaccines" ("vaccinesId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "nome" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "usuario" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "ativo" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "persons" ADD CONSTRAINT "FK_38247cdafc33c29ff73f86c38a4" FOREIGN KEY ("driver_id") REFERENCES "driver_licenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "persons" ADD CONSTRAINT "FK_551d8b4e3ef1a7c6b5c6e3277c0" FOREIGN KEY ("vaccine_card_id") REFERENCES "vaccine-card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_267cf5bf782e4c7ec9e123af136" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_0a23c50228c2db732e3214682b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccinecard_vaccines" ADD CONSTRAINT "FK_486f884c64a0cfb123e6aaac862" FOREIGN KEY ("vaccineCardId") REFERENCES "vaccine-card"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vaccinecard_vaccines" ADD CONSTRAINT "FK_e4eb24ea54151c8e0617b7445cf" FOREIGN KEY ("vaccinesId") REFERENCES "vaccines"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccinecard_vaccines" DROP CONSTRAINT "FK_e4eb24ea54151c8e0617b7445cf"`);
        await queryRunner.query(`ALTER TABLE "vaccinecard_vaccines" DROP CONSTRAINT "FK_486f884c64a0cfb123e6aaac862"`);
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_0a23c50228c2db732e3214682b0"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_267cf5bf782e4c7ec9e123af136"`);
        await queryRunner.query(`ALTER TABLE "persons" DROP CONSTRAINT "FK_551d8b4e3ef1a7c6b5c6e3277c0"`);
        await queryRunner.query(`ALTER TABLE "persons" DROP CONSTRAINT "FK_38247cdafc33c29ff73f86c38a4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ativo"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "usuario"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4eb24ea54151c8e0617b7445c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_486f884c64a0cfb123e6aaac86"`);
        await queryRunner.query(`DROP TABLE "vaccinecard_vaccines"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "tweets"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
        await queryRunner.query(`DROP TABLE "persons"`);
        await queryRunner.query(`DROP TABLE "vaccine-card"`);
        await queryRunner.query(`DROP TABLE "vaccines"`);
        await queryRunner.query(`DROP TABLE "driver_licenses"`);
    }

}
