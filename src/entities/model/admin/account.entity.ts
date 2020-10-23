import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PublicEntity } from '../public.entity';
import NodeAuth from 'node-auth0';
import { AdminOrganizationEntity } from './organization.entity';
import { AdminRoleEntity } from './role.entity';

@Entity('admin_account')
export class AdminAccountEntity extends PublicEntity {
  @Exclude()
  private nodeAuth: NodeAuth;
  constructor() {
    super();
    this.nodeAuth = new NodeAuth();
  }

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'username',
    comment: '用户名',
  })
  username: string;

  @Exclude() // 表示排除字段不返回给前端
  @Column('varchar', {
    nullable: false,
    length: 64,
    name: 'password',
    comment: '密码',
  })
  password: string;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'nickname',
    comment: '用户昵称',
  })
  nickname: string;

  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'mobile',
    comment: '用户手机',
  })
  mobile: string;

  @Column('varchar', {
    nullable: true,
    length: 128,
    name: 'email',
    comment: '用户邮箱',
  })
  email: string;

  @Column('varchar', {
    nullable: true,
    length: 128,
    name: 'avatar',
    comment: '用户头像',
  })
  avatar: string;

  @BeforeInsert()
  makePassword() {
    this.password = this.nodeAuth.makePassword(this.password);
  }

  @ManyToMany(
    type => AdminOrganizationEntity,
    organization => organization
  )
  @JoinTable({
    name: 'admin_organization',
    joinColumn: { name: 'accountId' },
    inverseJoinColumn: { name: 'organizationId' }
  })
  organizations: AdminOrganizationEntity[];

  @ManyToMany(
    type => AdminRoleEntity,
    role => role
  )
  @JoinTable({
    name: 'admin_role',
    joinColumn: { name: 'accountId' },
    inverseJoinColumn: { name: 'roleId' }
  })
  roles: AdminRoleEntity[];
}
