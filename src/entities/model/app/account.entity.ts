import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PublicEntity } from '../public.entity';

@Entity('app_account')
export class AppAccountEntity extends PublicEntity {
  constructor() {
    super();
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
    nullable: false,
    length: 32,
    name: 'mobile',
    comment: '用户手机',
  })
  mobile: string;

  @Column('varchar', {
    nullable: false,
    length: 128,
    name: 'email',
    comment: '用户邮箱',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    length: 128,
    name: 'avatar',
    comment: '用户头像',
  })
  avatar: string;
}
