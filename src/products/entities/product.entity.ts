import { User } from 'src/auth/entities/user.entity';
import { ProductImage } from './product-image.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  // eslint-disable-next-line prettier/prettier
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    // eslint-disable-next-line prettier/prettier
    { cascade: true, eager: true },
  )
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true }) //eager sirve para que cuando se consulten los productos cargue la relacion la tabla de users
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    } else {
      this.slug = this.title
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.title
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
