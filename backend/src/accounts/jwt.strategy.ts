import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountService } from './accounts.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
  ) {
    super({
      // Lấy token từ thuộc tính Authorization: Bearer <TOKEN> trong Header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Từ chối nếu token hết hạn
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallbackSecretKey123',
    });
  }

  // Hàm này tự chạy sau khi Token được giải mã thành công
  async validate(payload: any) {
    // Tìm lại user trong DB xem tài khoản có còn tồn tại/hoạt động không
    const user = await this.accountService.detailAccount(payload.id);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không hợp lệ hoặc đã bị xóa');
    }
    // Trả về user để NestJS tự động đính kèm vào đối tượng request: req.user
    return user;
  }
}