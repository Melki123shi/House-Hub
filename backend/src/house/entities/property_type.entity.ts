import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { House } from "./house.entity";

@Entity()
export class PropertyType {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true
    })
    name: string

    @OneToMany(() => House, (house) => house.propertyType)
    houses: House[];
}