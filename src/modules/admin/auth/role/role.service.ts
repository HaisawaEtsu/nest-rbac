import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminMenuEntity } from 'src/entities/model/admin/menu.entity';
import { AdminRoleEntity } from 'src/entities/model/admin/role.entity';
import { Repository } from 'typeorm';

const mapActions: {
  [key: string]: string;
} = {
  GET: 'read',
  POST: 'create',
  PUT: 'update',
  DELETE: 'delete',
};

@Injectable()
export class AdminAuthRoleService {
  constructor(
    @InjectRepository(AdminMenuEntity)
    private readonly adminMenuRepository: Repository<AdminMenuEntity>,
    @InjectRepository(AdminRoleEntity)
    private readonly adminRoleRepository: Repository<AdminRoleEntity>,
  ) {}

  async canAccess(roles: string[], ctrl: string, method: string): Promise<any> {
    // todo
    const action = mapActions[method];
    const permissions = null;
    const count = 0;
    return count > 0;
  }
}
