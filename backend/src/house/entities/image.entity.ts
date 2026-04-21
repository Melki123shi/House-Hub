import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { House } from "./house.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Image {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    url: string

    @Column({ default: false })
    isPrimary: boolean;

    @ManyToOne(() => House, (house) => house.images, { onDelete: 'CASCADE' })
    house: House;
}