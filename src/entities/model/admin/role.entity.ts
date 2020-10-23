import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { PublicEntity } from '../public.entity';
import { AdminAccountEntity } from './account.entity';
import { AdminActionEntity } from './action.entity';
import { AdminOrganizationEntity } from './organization.entity';

@Entity('admin_role')
export class AdminRoleEntity extends PublicEntity {
  	@Column()
    label: string;

    @Column()
    name: string;

    @Column({ length: 36 })
    organizationId: string;

    @ManyToOne(type => AdminOrganizationEntity, organization => organization.roles, { onDelete: 'CASCADE' })
    organization: AdminOrganizationEntity;

    @ManyToMany(type => AdminAccountEntity, account => account.roles)
    @JoinTable({
        name: "admin_role",
        joinColumn: { name: 'roleId' },
        inverseJoinColumn: { name: 'accountId' }
    })
    users: AdminAccountEntity[];

    @ManyToMany(type => AdminActionEntity, action => action.roles)
    @JoinTable({
        name: "admin_action",
        joinColumn: { name: 'roleId' },
        inverseJoinColumn: { name: 'actionId' }
    })
    actions: AdminActionEntity[];
}
