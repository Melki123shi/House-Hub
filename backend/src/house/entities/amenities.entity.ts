import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { House } from "./house.entity";

@Entity('amenities')
export class Amenity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string; 

    @Column({ nullable: true })
    iconName: string; 
    
    @ManyToMany(() => House, (house) => house.amenities)
    houses: House[];
}