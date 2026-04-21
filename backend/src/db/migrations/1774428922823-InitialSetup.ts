import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1774428922823 implements MigrationInterface {
    name = 'InitialSetup1774428922823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "property_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_7eaccd6dd29d1f98656747edaa3" UNIQUE ("name"), CONSTRAINT "PK_eb483bf7f6ddf612998949edd26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "isPrimary" boolean NOT NULL DEFAULT false, "houseId" uuid, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "latitude" numeric(10,7), "longitude" numeric(10,7), "city" character varying NOT NULL, "country" character varying NOT NULL, "postalCode" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "amenities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iconName" character varying, CONSTRAINT "UQ_8c5f9c7ff7e2174b53d4be10247" UNIQUE ("name"), CONSTRAINT "PK_c0777308847b3556086f2fb233e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."house_type_enum" AS ENUM('RENT', 'SELL')`);
        await queryRunner.query(`CREATE TYPE "public"."house_status_enum" AS ENUM('AVAILABLE', 'SOLD', 'RENTED')`);
        await queryRunner.query(`CREATE TABLE "house" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(12,2) NOT NULL, "type" "public"."house_type_enum" NOT NULL DEFAULT 'RENT', "status" "public"."house_status_enum" NOT NULL DEFAULT 'AVAILABLE', "rooms" integer NOT NULL, "bathrooms" integer NOT NULL, "bedrooms" integer NOT NULL, "kitchen" integer NOT NULL, "area" integer NOT NULL, "yearBuilt" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, "locationId" uuid, "propertyTypeId" uuid, CONSTRAINT "REL_99a0920f7d4bac15ce2c9278ca" UNIQUE ("locationId"), CONSTRAINT "PK_8c9220195fd0a289745855fe908" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('owner', 'admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "profilePictureUrl" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying, "isVerified" boolean NOT NULL DEFAULT false, "roles" "public"."user_roles_enum" array NOT NULL DEFAULT '{user}', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "house_amenities_link" ("houseId" uuid NOT NULL, "amenitiesId" integer NOT NULL, CONSTRAINT "PK_d00cf2d0417fccf5cb3dd95bae7" PRIMARY KEY ("houseId", "amenitiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9fe79e7cbef46ceeb88493f6a" ON "house_amenities_link" ("houseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9c2b683a590b479e8f0f0c4d9" ON "house_amenities_link" ("amenitiesId") `);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_938fd78d8997ecc9e03922ce9ee" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "FK_351e5f043bb28867ca16bb32451" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "FK_99a0920f7d4bac15ce2c9278ca7" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "FK_a6920e8472eebb0fe538d71f3e7" FOREIGN KEY ("propertyTypeId") REFERENCES "property_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "house_amenities_link" ADD CONSTRAINT "FK_a9fe79e7cbef46ceeb88493f6ac" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "house_amenities_link" ADD CONSTRAINT "FK_b9c2b683a590b479e8f0f0c4d9a" FOREIGN KEY ("amenitiesId") REFERENCES "amenities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "house_amenities_link" DROP CONSTRAINT "FK_b9c2b683a590b479e8f0f0c4d9a"`);
        await queryRunner.query(`ALTER TABLE "house_amenities_link" DROP CONSTRAINT "FK_a9fe79e7cbef46ceeb88493f6ac"`);
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "FK_a6920e8472eebb0fe538d71f3e7"`);
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "FK_99a0920f7d4bac15ce2c9278ca7"`);
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "FK_351e5f043bb28867ca16bb32451"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_938fd78d8997ecc9e03922ce9ee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9c2b683a590b479e8f0f0c4d9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9fe79e7cbef46ceeb88493f6a"`);
        await queryRunner.query(`DROP TABLE "house_amenities_link"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
        await queryRunner.query(`DROP TABLE "house"`);
        await queryRunner.query(`DROP TYPE "public"."house_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."house_type_enum"`);
        await queryRunner.query(`DROP TABLE "amenities"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "property_type"`);
    }

}
