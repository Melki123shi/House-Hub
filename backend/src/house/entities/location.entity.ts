import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { House } from "./house.entity"

@Entity()
export class Location {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column('decimal', { precision: 10, scale: 7, nullable: true })
    latitude: number;

    @Column('decimal', { precision: 10, scale: 7, nullable: true })
    longitude: number;

    @Column()
    city: string

    @Column()
    country: string

    @Column()
    postalCode: string

    @Column()
    address: string

    @OneToOne(() => House, (house) => house.location)
    house: House;
}