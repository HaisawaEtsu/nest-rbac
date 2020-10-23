import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { PublicEntity } from '../public.entity';
import { AdminActionEntity } from './action.entity';


@Entity('admin_menu')
export class AdminMenuEntity extends PublicEntity{
  @Column()
  label: string;

  @Column()
  router?: string;

  @Column()
  icon: string;

  @Column()
  sort?: number;

  @Column({ nullable: true, length: 36, name: 'parentId' })
  pid?: string;

  @Column({ nullable: true, type: 'text' })
  path?: string;

  @ManyToOne(
    type => AdminMenuEntity,
    menu => menu.children
  )
  parent: AdminMenuEntity;

  @OneToMany(
    type => AdminMenuEntity,
    menu => menu.parent
  )
  children: AdminMenuEntity[];

  @OneToMany(
    type => AdminActionEntity,
    action => action.menu
  )
  actions: AdminActionEntity[];
}