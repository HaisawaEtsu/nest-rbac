import { Entity, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { PublicEntity } from '../public.entity';
import { AdminAccountEntity } from './account.entity';
import { AdminRoleEntity } from './role.entity';

@Entity('admin_organization')
export class AdminOrganizationEntity extends PublicEntity {
  @Column()
  label: string;

  @Column()
  type: string;

  @Column()
  icon: string;

  @Column()
  sort?: number;

  @Column({ nullable: true, length: 36, name: 'parentId' })
  pid?: string;

  @Column({ nullable: true, type: 'text' })
  path?: string;

  @ManyToOne(
    () => AdminOrganizationEntity,
    organization => organization.children
  )
  parent: AdminOrganizationEntity;

  @OneToMany(
    () => AdminOrganizationEntity,
    organization => organization.parent
  )
  children: AdminOrganizationEntity[];

  @ManyToMany(
    () => AdminAccountEntity,
    account => account.organizations
  )
  accounts: AdminAccountEntity[];

  @OneToMany(
    type => AdminRoleEntity,
    role => role.organization
  )
  roles: AdminRoleEntity[];
}