import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { PublicEntity } from '../public.entity';
import { AdminMenuEntity } from './menu.entity';
import { AdminRoleEntity } from './role.entity';

@Entity('admin_action')
export class AdminActionEntity extends PublicEntity{
  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  sort?: number;

  @Column()
  icon: string;

  @Column({ length: 36 })
  menuId: string;

  @ManyToOne(
    type => AdminMenuEntity,
    menu => menu.actions,
    { onDelete: 'CASCADE' }
  )
  menu: AdminMenuEntity;

  @ManyToMany(
    type => AdminRoleEntity,
    role => role.actions
  )
  roles: AdminRoleEntity[];
}