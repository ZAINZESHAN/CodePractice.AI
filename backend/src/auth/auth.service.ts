import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { CreateCompanyRootDto } from 'src/auth/dto/create-company-root.dto';
import { CreateCompanyUserDto } from 'src/auth/dto/create-company-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private generateToken(payload: {
    id: number;
    email: string;
    role: Role;
    companyId?: number | null;
  }) {
    return this.jwt.sign(
      {
        sub: payload.id,
        email: payload.email,
        role: payload.role,
        companyId: payload.companyId || null,
      },
      { expiresIn: '1d' },
    );
  }

  // Normal Student Register
  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) throw new ConflictException('User already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: Role.STUDENT,
      },
    });

    return {
      success: true,
      message: 'User registered successfully',
      token: this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId || null,
      }),
      user,
    };
  }

  // Company Root Register
  async createCompanyRoot(dto: CreateCompanyRootDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const existingCompanyRoot = await this.prisma.user.findFirst({
      where: {
        role: Role.COMPANY_ROOT,
        company: {
          name: dto.companyName,
        },
      },
      include: { company: true },
    });
    if (existingCompanyRoot) {
      throw new ConflictException(
        'Company root for this company already exists',
      );
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: Role.COMPANY_ROOT,
        company: {
          create: {
            name: dto.companyName,
            description: dto.description,
            website: dto.website,
            location: dto.location,
            status: 'PENDING',
          },
        },
      },
      include: { company: true },
    });

    return {
      success: true,
      message: 'Company root registered successfully',
      token: this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.company?.id,
      }),
      user,
    };
  }

  // Normal User Login
  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { company: true },
    });
    if (!user) throw new NotFoundException('User not found');

    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      success: true,
      message: 'User logged in successfully',
      token: this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId || null,
      }),
      user,
    };
  }

  // Admin Login
  loginAdmin({ email, password }: LoginDto) {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = this.generateToken({ id: 0, email, role: Role.ADMIN });
      return {
        message: 'Admin logged in successfully',
        token,
        user: { id: 0, email, role: Role.ADMIN, name: 'Super Admin' },
      };
    }
    throw new UnauthorizedException('Invalid admin credentials');
  }

  // Company User Register
  async createCompanyUser(dto: CreateCompanyUserDto) {
    const company = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });
    if (!company) throw new ForbiddenException('Company not found');

    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: Role.COMPANY_USER,
        companyId: dto.companyId,
      },
    });

    return {
      success: true,
      message: 'Company user registered successfully',
      token: this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId, 
      }),
      user,
    };
  }
}
