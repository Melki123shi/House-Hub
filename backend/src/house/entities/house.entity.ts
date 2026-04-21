import { HouseStatus, HouseType } from "../enums/house.enums";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, ManyToMany } from "typeorm"
import { User } from "../../users/entities/user.entity";
import { PropertyType } from "./property_type.entity";
import { Image } from "./image.entity";
import { Location } from "./location.entity";
import { Amenity } from "./amenities.entity";

@Entity()
export class House {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Image, (image) => image.house, { cascade: true })
    images: Image[];

    @Column("decimal", { precision: 12, scale: 2 })
    price: number;

    @ManyToOne(() => User, (user) => user.houses)
    owner: User;

    @Column({
        type: "enum",
        enum: HouseType,
        default: HouseType.RENT,
    })
    type: HouseType;

    @OneToOne(() => Location, { cascade: true, eager: true })
    @JoinColumn() // This creates the locationId foreign key
    location: Location;

    @ManyToOne(() => PropertyType, (pt) => pt.houses)
    propertyType: PropertyType;

    @Column({
        type: "enum",
        enum: HouseStatus,
        default: HouseStatus.AVAILABLE,
    })
    status: HouseStatus;

    @Column()
    rooms: number;

    @Column()
    bathrooms: number;

    @Column()
    bedrooms: number;

    @Column()
    kitchen: number;

    @Column()
    area: number;

    @Column()
    yearBuilt: number;

    @ManyToMany(() => Amenity, (amenity) => amenity.houses)
    @JoinTable({ name: 'house_amenities_link' }) // This creates the "Join Table" automatically
    amenities: Amenity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}